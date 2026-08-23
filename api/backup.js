import { getDatabase } from "./_lib/database.js";
import { requireAccountSession } from "./_lib/account-auth.js";
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

export default async function handler(req,res){
  noStore(res);
  if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"})}
  try{
    const account=await requireAccountSession(req),sql=getDatabase();
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
    return res.status(200).json({ok:true,account:{email:account.email,name:account.name},profiles:mergeProfiles(profileRows),rounds:rounds.map(row=>row.snapshot).filter(Boolean),serverAt:new Date().toISOString()});
  }catch(error){
    const code=String(error?.code||"BACKUP_RECOVERY_FAILED"),status=code==="ACCOUNT_UNAUTHORIZED"?401:code==="DATABASE_NOT_CONFIGURED"||code==="ACCOUNT_AUTH_UNAVAILABLE"?503:400;
    if(status>=500)console.error("backup",code);
    return res.status(status).json({ok:false,code});
  }
}
