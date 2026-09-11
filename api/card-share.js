import { getDatabase } from "./_lib/database.js";
import { requireAccountSession } from "./_lib/account-auth.js";
import { handleAppPreflight } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ROUND=/^[A-Za-z0-9._:-]{1,180}$/;
const clean=value=>String(value??"").trim();

export default async function handler(req,res){
  noStore(res);
  if(handleAppPreflight(req,res))return;
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"});}
  try{
    const body=await readJson(req,200_000),action=clean(body?.action).toLowerCase(),sql=getDatabase();
    if(action==="read"){
      const token=clean(body?.token);
      if(!UUID.test(token))return res.status(400).json({ok:false,code:"INVALID_CARD_TOKEN"});
      const rows=await sql`
        SELECT r.raw_snapshot->'officialSnapshot' AS snapshot,c.version,c.content_hash
        FROM card_records c JOIN rounds r ON r.id=c.round_id
        WHERE c.id=${token}::uuid AND c.type='global'::card_type LIMIT 1
      `;
      const snapshot=rows[0]?.snapshot;
      if(!snapshot||!["officially_closed","corrected"].includes(snapshot.status))return res.status(404).json({ok:false,code:"CARD_NOT_FOUND"});
      return res.status(200).json({ok:true,snapshot,version:rows[0].version,contentHash:rows[0].content_hash});
    }
    if(action==="create"){
      const account=await requireAccountSession(req),roundId=clean(body?.roundId);
      if(!ROUND.test(roundId))return res.status(400).json({ok:false,code:"INVALID_ROUND_ID"});
      const rows=await sql`
        SELECT c.id FROM rounds r
        JOIN installations i ON i.id=r.installation_id
        JOIN card_records c ON c.round_id=r.id AND c.type='global'::card_type
        WHERE r.client_round_id=${roundId} AND r.officially_closed_at IS NOT NULL
          AND i.metadata->>'authUserId'=${account.id}
        ORDER BY c.version DESC,c.created_at DESC LIMIT 1
      `;
      const token=rows[0]?.id;
      if(!token)return res.status(404).json({ok:false,code:"CARD_NOT_READY"});
      const proto=String(req.headers["x-forwarded-proto"]||"https").split(",")[0],host=String(req.headers["x-forwarded-host"]||req.headers.host||"").split(",")[0];
      return res.status(200).json({ok:true,token:String(token),url:`${proto}://${host}/card-share.html#card=${token}`});
    }
    return res.status(400).json({ok:false,code:"INVALID_ACTION"});
  }catch(error){
    const code=error?.code||"CARD_SHARE_FAILED",status=code==="ACCOUNT_UNAUTHORIZED"?401:code==="DATABASE_NOT_CONFIGURED"||code==="ACCOUNT_AUTH_UNAVAILABLE"?503:400;
    if(status>=500)console.error("card-share",code);
    return res.status(status).json({ok:false,code});
  }
}
