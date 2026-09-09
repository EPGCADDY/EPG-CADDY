import { next } from "@vercel/functions";
import { resolveAppAccess } from "./api/_lib/app-access.js";

const PUBLIC_PATHS=new Set(["/access.html","/api/app-access","/favicon.ico"]);
const PRIVATE_GUEST_PREFIXES=["/api/account-backup","/api/commerce","/api/sync","/api/master-data"];

export default async function accessGate(request){
  const url=new URL(request.url),path=url.pathname;
  const guestMode=(request.headers.get("cookie")||"").split(";").some(value=>value.trim()==="gsc_guest_mode=1");
  if(path==="/api/account"&&guestMode)return new Response(JSON.stringify({ok:false,code:"OWNER_DATA_FORBIDDEN"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}});
  if(path==="/api/account")return next();
  if(PUBLIC_PATHS.has(path)||path.startsWith("/assets/official-logos/"))return next();
  const access=await resolveAppAccess(request);
  if(access.ok){
    if(access.role==="guest"&&PRIVATE_GUEST_PREFIXES.some(prefix=>path.startsWith(prefix)))return new Response(JSON.stringify({ok:false,code:"OWNER_DATA_FORBIDDEN"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}});
    return next({headers:{"x-gsc-access-role":access.role}});
  }
  if(path.startsWith("/api/"))return new Response(JSON.stringify({ok:false,code:access.code||"ACCESS_REQUIRED"}),{status:401,headers:{"content-type":"application/json","cache-control":"no-store"}});
  const target=new URL("/access.html",request.url);return Response.redirect(target,307);
}

export const config={runtime:"nodejs",matcher:["/((?!access\.html$|api/app-access$|favicon\.ico$).*)"]};
