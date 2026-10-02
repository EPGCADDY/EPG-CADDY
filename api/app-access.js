import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {createHash} from 'node:crypto';
import {getDatabase} from './_lib/database.js';
import {CODE_COOKIE,codeAccessEnabled,issueEntryCode,redeemEntryCode,revokeEntryCode,readCodeSession,codeSessionCookie} from './_lib/code-access.js';
import {ensurePersonalAccess,limitPersonalAccess} from './_lib/personal-event-access.js';
import { createGrant, accessCookie, guestModeCookie, clearAccessCookies, requireOwner, resolveAppAccess, revokeGrant, redeemGuestToken, recordGuestFeedback, ownerFeedback, purgeExpiredAccess } from "./_lib/app-access.js";
import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";
import { inviteOrigin } from "./_lib/invite-origin.js";

function fail(res,error){
  const raw=String(error?.code||"ACCESS_FAILED");
  const code=/^[A-Z0-9_]{1,64}$/.test(raw)?raw:"ACCESS_FAILED";
  const status=Number(error?.status)||({ACCOUNT_UNAUTHORIZED:401,OWNER_REQUIRED:403,OWNER_NOT_CONFIGURED:503,DATABASE_NOT_CONFIGURED:503,ACCOUNT_AUTH_UNAVAILABLE:503}[code]||500);
  console.error("APP_ACCESS_FAILURE",JSON.stringify({code,status}));
  return res.status(status).json({ok:false,code});
}

export async function redeemCodeResponse(req,res,sql){
      const body=await readJson(req,2000);await ensurePersonalAccess(sql);
      const address=String(req.headers?.['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
      await limitPersonalAccess(sql,{id:'code-entry:'+createHash('sha256').update(address).digest('hex')},'redeem-code');
      const grant=await redeemEntryCode(sql,body.code),seconds=Math.max(1,Math.floor((new Date(grant.expires_at)-Date.now())/1000));
      res.setHeader('Set-Cookie',[codeSessionCookie(grant.token,seconds),...clearAccessCookies(),'gsc_personal_context=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0']);
      const destination=grant.role==='player'?'/index-grupal.html?inicio=1&personalAccount='+encodeURIComponent(grant.accountId):'/live-hub.html?personalEvent='+encodeURIComponent(grant.event_id)+'&personalKind='+grant.event_kind;
      return res.status(200).json({ok:true,role:grant.role,destination});
}

export default async function handler(req,res){
  noStore(res);if(handleAppPreflight(req,res))return;
  const action=String(req.query?.action||"status").toLowerCase();
  try{
    if(action==='cleanup'&&['GET','POST'].includes(req.method)){
      const expected=String(process.env.CRON_SECRET||'');
      if(!expected||String(req.headers.authorization||'')!==`Bearer ${expected}`)return res.status(401).json({ok:false,code:'CRON_UNAUTHORIZED'});
      await ensurePersonalAccess(getDatabase());await refreshEventLifecycles(getDatabase());await purgeExpiredAccess();return res.status(200).json({ok:true});
    }
    if(action==="redeem"&&req.method==="POST"){
      if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,code:"ORIGIN_NOT_ALLOWED"});
      const token=String(req.query?.token||""),grant=await redeemGuestToken(token);
      if(!grant)return res.status(401).send("ENLACE INVÁLIDO, VENCIDO O YA UTILIZADO");
      const seconds=Math.max(1,Math.floor((new Date(grant.expiresAt).getTime()-Date.now())/1000));
      res.setHeader("Set-Cookie",[accessCookie(token,seconds),guestModeCookie(seconds)]);
      res.setHeader("Location","/index-grupal.html?source=guest24h");return res.status(302).end();
    }
    if(action==='redeem-code'&&req.method==='POST'){
      codeAccessEnabled();if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,code:'ORIGIN_NOT_ALLOWED'});
      return redeemCodeResponse(req,res,getDatabase());
    }
    if(action==="status"&&req.method==="GET"){
      const coded=await readCodeSession(req);
      if(coded)return res.status(200).json({ok:true,role:coded.entryRole,canShare:false,expiresAt:coded.expiresAt,codeAccess:true,accountCode:coded.id,eventId:coded.eventId,eventKind:coded.eventKind});
      const access=await resolveAppAccess(req);
      if(access.ok&&access.role==="owner"&&String(req.headers.cookie||"").split(";").some(value=>value.trim()==="gsc_guest_mode=1"))res.setHeader("Set-Cookie",clearAccessCookies());
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
    if(action==='revoke-code'){
      codeAccessEnabled();const owner=await requireOwner(req),body=await readJson(req,2000);
      const revoked=await revokeEntryCode(getDatabase(),body.id,owner.id);
      return res.status(revoked?200:404).json({ok:revoked,code:revoked?null:'GRANT_NOT_FOUND'});
    }
    if(action==='create-code'){
      codeAccessEnabled();const owner=await requireOwner(req),body=await readJson(req,2000);
      if(body.role!=='player'||body.eventId)return res.status(400).json({ok:false,code:'CODE_ASSIGNMENT_INVALID'});
      const grant=await issueEntryCode(getDatabase(),{issuerId:owner.id,role:'player',displayName:body.displayName});
      return res.status(201).json({ok:true,...grant,url:inviteOrigin()+'/index-grupal.html?inicio=1'});
    }
    if(action==="create"){
      const owner=await requireOwner(req);
      try{
        const origin=inviteOrigin(),grant=await createGrant(owner);
        return res.status(201).json({ok:true,id:grant.id,expiresAt:grant.expiresAt,url:`${origin}/invite/${encodeURIComponent(grant.token)}`});
      }catch(error){
        if(error?.code!=="DATABASE_NOT_CONFIGURED"||process.env.VERCEL_ENV!=="preview")throw error;
        const productionOrigin=String(process.env.APP_PUBLIC_ORIGIN||"https://golf-sc-gt-lab.vercel.app").replace(/\/$/,"");
        const forwarded=await fetch(`${productionOrigin}/api/app-access?action=create`,{
          method:"POST",
          headers:{Accept:"application/json",Cookie:String(req.headers.cookie||"")},
          redirect:"manual",
          cache:"no-store"
        });
        const data=await forwarded.json().catch(()=>({}));
        if(!forwarded.ok||!data?.url){
          const code=String(data?.code||`HTTP_${forwarded.status}`);
          throw Object.assign(new Error(code),{code,status:forwarded.status||503});
        }
        return res.status(201).json(data);
      }
    }
    if(action==="revoke"){
      const owner=await requireOwner(req),body=await readJson(req,8_000),revoked=await revokeGrant(body?.id,owner);
      return res.status(revoked?200:404).json({ok:revoked,code:revoked?null:"GRANT_NOT_FOUND"});
    }
    if(action==="exit"){
      res.setHeader("Set-Cookie",[...clearAccessCookies(),`${CODE_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`]);return res.status(200).json({ok:true});
    }
    return res.status(404).json({ok:false,code:"ACTION_NOT_FOUND"});
  }catch(error){return fail(res,error)}
}
