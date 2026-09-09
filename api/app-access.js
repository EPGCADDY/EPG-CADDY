import { createGrant, accessCookie, guestModeCookie, clearAccessCookies, requireOwner, resolveAppAccess, revokeGrant, redeemGuestToken, recordGuestFeedback, ownerFeedback, purgeExpiredAccess } from "./_lib/app-access.js";
import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";

function fail(res,error){const code=String(error?.code||"ACCESS_FAILED"),status=Number(error?.status)||({ACCOUNT_UNAUTHORIZED:401,OWNER_REQUIRED:403,OWNER_NOT_CONFIGURED:503}[code]||400);return res.status(status).json({ok:false,code})}

export default async function handler(req,res){
  noStore(res);if(handleAppPreflight(req,res))return;
  const action=String(req.query?.action||"status").toLowerCase();
  try{
    if(action==="redeem"&&req.method==="GET"){
      const token=String(req.query?.token||""),grant=await redeemGuestToken(token);
      if(!grant)return res.status(401).send("ENLACE INVÁLIDO, VENCIDO O YA UTILIZADO");
      const seconds=Math.max(1,Math.floor((new Date(grant.expiresAt).getTime()-Date.now())/1000));
      res.setHeader("Set-Cookie",[accessCookie(token,seconds),guestModeCookie(seconds)]);
      res.setHeader("Location","/index-grupal.html?source=guest24h");return res.status(302).end();
    }
    if(action==="status"&&req.method==="GET"){
      const access=await resolveAppAccess(req);
      return res.status(access.ok?200:401).json({ok:access.ok,role:access.role,canShare:access.canShare,expiresAt:access.grant?.expiresAt||null,code:access.code||null});
    }
    if(req.method!=="POST")return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"});
    if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,code:"ORIGIN_NOT_ALLOWED"});
    if(action==="feedback"){
      const access=await resolveAppAccess(req);if(!access.ok||access.role!=="guest")return res.status(403).json({ok:false,code:"GUEST_REQUIRED"});
      const body=await readJson(req,2_000),saved=await recordGuestFeedback(String(req.headers.cookie||"").split(";").map(v=>v.trim()).find(v=>v.startsWith("gscg_app_access="))?.slice("gscg_app_access=".length)||"",body);
      return res.status(saved?200:401).json({ok:saved,code:saved?null:"ACCESS_EXPIRED"});
    }
    if(action==="report"){
      const owner=await requireOwner(req),items=await ownerFeedback(owner);return res.status(200).json({ok:true,items});
    }
    if(action==="cleanup"){
      const expected=String(process.env.CRON_SECRET||""),supplied=String(req.headers.authorization||"");
      if(!expected||supplied!==`Bearer ${expected}`)return res.status(401).json({ok:false,code:"CRON_UNAUTHORIZED"});
      await purgeExpiredAccess();return res.status(200).json({ok:true});
    }
    if(action==="create"){
      const owner=await requireOwner(req),grant=await createGrant(owner),origin=String(process.env.APP_PUBLIC_ORIGIN||"https://golf-sc-gt-lab.vercel.app").replace(/\/$/,"");
      return res.status(201).json({ok:true,id:grant.id,expiresAt:grant.expiresAt,url:`${origin}/api/app-access?action=redeem&token=${encodeURIComponent(grant.token)}`});
    }
    if(action==="revoke"){
      const owner=await requireOwner(req),body=await readJson(req,8_000),revoked=await revokeGrant(body?.id,owner);
      return res.status(revoked?200:404).json({ok:revoked,code:revoked?null:"GRANT_NOT_FOUND"});
    }
    if(action==="exit"){
      res.setHeader("Set-Cookie",clearAccessCookies());return res.status(200).json({ok:true});
    }
    return res.status(404).json({ok:false,code:"ACTION_NOT_FOUND"});
  }catch(error){return fail(res,error)}
}
