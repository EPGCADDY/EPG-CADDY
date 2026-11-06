import {normalizeBackupSnapshot} from './_lib/backup-snapshot.js';
import {relayPersonalCloud} from './_lib/personal-cloud.js';
import { getDatabase } from "./_lib/database.js";
import { requireAccountSession } from "./_lib/account-auth.js";
import { handleAppPreflight } from "./_lib/cors.js";
import { noStore } from "./_lib/http.js";

function mergeProfiles(rows){
  const byKey=new Map();
  for(const row of rows||[])for(const profile of Array.isArray(row?.profiles)?row.profiles:[]){
    const key=String(profile?.identityKey||profile?.registrationCode||profile?.fullName||"").trim().toLowerCase();
    if(!key)continue;
    const current=byKey.get(key),currentAt=Date.parse(current?.occurredAt||0)||0,nextAt=Date.parse(profile?.occurredAt||0)||0;
    if(!current||nextAt>=currentAt)byKey.set(key,profile);
  }
  return[...byKey.values()];
}

export async function readAccountBackup(sql,account){
    const rounds=await sql`
      SELECT r.raw_snapshot AS snapshot
      FROM rounds r
      JOIN installations i ON i.id=r.installation_id
      WHERE i.metadata->>'authUserId'=${account.id}
      ORDER BY r.played_at ASC, r.updated_at ASC
      LIMIT 120
    `;
    const profileRows=await sql`
      SELECT sm.payload->'profiles' AS profiles
      FROM sync_mutations sm
      JOIN installations i ON i.installation_key=sm.installation_id
      WHERE i.metadata->>'authUserId'=${account.id}
        AND jsonb_array_length(coalesce(sm.payload->'profiles','[]'::jsonb))>0
      ORDER BY sm.processed_at ASC
      LIMIT 500
    `;
    return {ok:true,account:{id:account.id,email:account.email,name:account.name},profiles:mergeProfiles(profileRows),rounds:await Promise.all(rounds.map(row=>row.snapshot).filter(Boolean).map(snapshot=>normalizeBackupSnapshot(snapshot))),serverAt:new Date().toISOString()};
}
export function mergeAccountBackups(primary,secondary){
  if(primary.account.id!==secondary.account?.id)throw Object.assign(Error('PERSONAL_CLOUD_IDENTITY_MISMATCH'),{code:'PERSONAL_CLOUD_IDENTITY_MISMATCH'});
  const byId=new Map();
  const stamp=r=>Date.parse(r.officialSnapshot?.correctedAt||r.officiallyClosedAt||r.endedAt||r.playedAt||0)||0;
  for(const r of [...(secondary.rounds||[]),...(primary.rounds||[])]){if(!r?.clientRoundId)continue;const p=byId.get(r.clientRoundId);if(!p||Number(r.version)>Number(p.version)||Number(r.version)===Number(p.version)&&stamp(r)>=stamp(p))byId.set(r.clientRoundId,r)}
  return{...primary,rounds:[...byId.values()],profiles:mergeProfiles([{profiles:secondary.profiles},{profiles:primary.profiles}])};
}
export default async function handler(req,res){
  noStore(res);if(handleAppPreflight(req,res))return;
  if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"})}
  try{
    const account=await requireAccountSession(req,{ownerOnly:true});
    if(req.query?.legacy!=='1'&&await relayPersonalCloud(req,res,account))return;
    let result=await readAccountBackup(getDatabase(),account);
    const legacy=process.env.GSC_MEMBERS_EDITION==='1'?null:process.env.GSC_PERSONAL_CLOUD_LEGACY_ORIGIN;
    if(req.query?.legacy!=='1'&&legacy){
      if(legacy!=='https://golf-sc-gt-lab.vercel.app')throw Object.assign(Error('PERSONAL_CLOUD_INVALID'),{code:'PERSONAL_CLOUD_INVALID'});
      const response=await fetch(legacy+'/api/backup?legacy=1',{headers:{cookie:req.headers.cookie||'',accept:'application/json'},cache:'no-store',redirect:'error',signal:AbortSignal.timeout(20000)});
      if(!response.ok)throw Object.assign(Error('PERSONAL_CLOUD_SOURCE_UNAVAILABLE'),{code:'PERSONAL_CLOUD_SOURCE_UNAVAILABLE'});
      result=mergeAccountBackups(result,await response.json());
    }
    return res.status(200).json(result);
  }catch(error){
    const code=String(error?.code||"BACKUP_RECOVERY_FAILED"),status=code==="ACCOUNT_UNAUTHORIZED"?401:code==="DATABASE_NOT_CONFIGURED"||code==="ACCOUNT_AUTH_UNAVAILABLE"||code.startsWith('PERSONAL_CLOUD_')?503:400;
    if(status>=500)console.error("backup",code);
    return res.status(status).json({ok:false,code});
  }
}
