import { getDatabase } from "./_lib/database.js";
import { requireAccountSession } from "./_lib/account-auth.js";
import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";

const KINDS=new Set(["scorecard","tournament","board","display"]);
const KEY_PATTERN=/^[A-Za-z0-9._:-]{1,180}$/;

function clean(value,max=140){return String(value??"").trim().replace(/\s+/g," ").slice(0,max)}
function validKind(value){const kind=clean(value,24).toLowerCase();if(!KINDS.has(kind))throw Object.assign(new Error("SHORTCUT_KIND_INVALID"),{code:"SHORTCUT_KIND_INVALID"});return kind}
function validKey(value){const key=clean(value,180);if(!KEY_PATTERN.test(key))throw Object.assign(new Error("SHORTCUT_KEY_INVALID"),{code:"SHORTCUT_KEY_INVALID"});return key}
function expiresAt(value){
  if(value==null||value==="")return null;
  const date=new Date(value);if(!Number.isFinite(date.getTime()))throw Object.assign(new Error("SHORTCUT_EXPIRY_INVALID"),{code:"SHORTCUT_EXPIRY_INVALID"});
  return date.toISOString();
}
function publicRow(row){return{
  id:row.id,
  kind:row.kind,
  resourceKey:row.resource_key,
  title:row.title,
  subtitle:row.subtitle,
  tournamentId:row.tournament_id,
  streamId:row.stream_id,
  metadata:row.metadata||{},
  status:row.status,
  expiresAt:row.expires_at,
  createdAt:row.created_at,
  updatedAt:row.updated_at
}}

export default async function handler(req,res){
  noStore(res);
  if(handleAppPreflight(req,res))return;
  try{
    const account=await requireAccountSession(req),sql=getDatabase();

    if(req.method==="GET"){
      await sql`DELETE FROM user_shortcuts WHERE auth_user_id=${account.id} AND expires_at IS NOT NULL AND expires_at<=now()`;
      const rows=await sql`
        SELECT id,kind,resource_key,title,subtitle,tournament_id,stream_id,metadata,status,expires_at,created_at,updated_at
        FROM user_shortcuts
        WHERE auth_user_id=${account.id} AND status='active' AND (expires_at IS NULL OR expires_at>now())
        ORDER BY
          CASE kind WHEN 'scorecard' THEN 1 WHEN 'board' THEN 2 WHEN 'tournament' THEN 3 ELSE 4 END,
          updated_at DESC
        LIMIT 100
      `;
      return res.status(200).json({ok:true,userId:account.id,items:rows.map(publicRow),serverAt:new Date().toISOString()});
    }

    if(req.method!=="POST"){res.setHeader("Allow","GET, POST");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"})}
    if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,code:"ORIGIN_NOT_ALLOWED"});
    const body=await readJson(req,32_000),action=clean(body?.action||"upsert",24).toLowerCase();

    if(action==="upsert"){
      const kind=validKind(body.kind),resourceKey=validKey(body.resourceKey),title=clean(body.title,120)||"ATAJO",subtitle=clean(body.subtitle,180),expiry=expiresAt(body.expiresAt);
      const tournamentId=body.tournamentId?clean(body.tournamentId,80):null,streamId=body.streamId?clean(body.streamId,80):null,metadata=body.metadata&&typeof body.metadata==="object"&&!Array.isArray(body.metadata)?body.metadata:{};
      const rows=await sql`
        INSERT INTO user_shortcuts(auth_user_id,kind,resource_key,title,subtitle,tournament_id,stream_id,metadata,status,expires_at,updated_at)
        VALUES(${account.id},${kind},${resourceKey},${title},${subtitle},${tournamentId},${streamId},${JSON.stringify(metadata)}::jsonb,'active',${expiry}::timestamptz,now())
        ON CONFLICT(auth_user_id,kind,resource_key) DO UPDATE SET
          title=excluded.title,
          subtitle=excluded.subtitle,
          tournament_id=excluded.tournament_id,
          stream_id=excluded.stream_id,
          metadata=excluded.metadata,
          status='active',
          expires_at=excluded.expires_at,
          updated_at=now()
        RETURNING id,kind,resource_key,title,subtitle,tournament_id,stream_id,metadata,status,expires_at,created_at,updated_at
      `;
      return res.status(200).json({ok:true,item:publicRow(rows[0])});
    }

    if(action==="remove"){
      const kind=validKind(body.kind),resourceKey=validKey(body.resourceKey);
      const rows=await sql`
        UPDATE user_shortcuts SET status='removed',updated_at=now()
        WHERE auth_user_id=${account.id} AND kind=${kind} AND resource_key=${resourceKey} AND status='active'
        RETURNING id
      `;
      return res.status(200).json({ok:true,removed:rows.length>0});
    }

    if(action==="cleanup"){
      const rows=await sql`
        DELETE FROM user_shortcuts
        WHERE auth_user_id=${account.id} AND (status<>'active' OR (expires_at IS NOT NULL AND expires_at<=now()))
        RETURNING id
      `;
      return res.status(200).json({ok:true,removed:rows.length});
    }

    return res.status(404).json({ok:false,code:"ACTION_NOT_FOUND"});
  }catch(error){
    const code=String(error?.code||"SHORTCUTS_FAILED");
    const status=code==="ACCOUNT_UNAUTHORIZED"?401:["SHORTCUT_KIND_INVALID","SHORTCUT_KEY_INVALID","SHORTCUT_EXPIRY_INVALID","EMPTY_BODY","INVALID_JSON"].includes(code)?400:503;
    if(status>=500)console.error("shortcuts",code);
    return res.status(status).json({ok:false,code});
  }
}