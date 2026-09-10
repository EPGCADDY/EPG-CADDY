import { next } from "@vercel/functions";

const PUBLIC_PATHS=new Set([
  "/access.html","/live.html","/live-view.js","/match-play.js","/favicon.ico",
  "/service-worker.js","/manifest.webmanifest","/manual.webmanifest"
]);
const PRIVATE_GUEST_PREFIXES=["/api/account-backup","/api/commerce","/api/sync","/api/master-data"];

export default async function accessGate(request){
  const url=new URL(request.url),path=url.pathname;
  const guestMode=(request.headers.get("cookie")||"").split(";").some(value=>value.trim()==="gsc_guest_mode=1");
  if(path==="/api/account"&&guestMode)return new Response(JSON.stringify({ok:false,code:"OWNER_DATA_FORBIDDEN"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}});
  if(path==="/api/account")return next();
  if(PUBLIC_PATHS.has(path)||path.startsWith("/invite/")||path.startsWith("/assets/official-logos/"))return next();
  if(path==="/api/live"&&request.method==="POST"){
    try{const body=await request.clone().json();if(String(body?.action||"").toLowerCase()==="read")return next()}catch{}
  }
  let access={ok:false,role:"none",code:"ACCESS_REQUIRED"};
  try{
    const statusUrl=new URL("/api/app-access?action=status",request.url);
    const response=await fetch(statusUrl,{headers:{cookie:request.headers.get("cookie")||""},cache:"no-store"});
    const data=await response.json();
    access={ok:response.ok&&data.ok===true,role:data.role||"none",code:data.code||null};
  }catch{}
  if(access.ok){
    if(access.role==="guest"&&PRIVATE_GUEST_PREFIXES.some(prefix=>path.startsWith(prefix)))return new Response(JSON.stringify({ok:false,code:"OWNER_DATA_FORBIDDEN"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}});
    return next({headers:{"x-gsc-access-role":access.role}});
  }
  if(path.startsWith("/api/"))return new Response(JSON.stringify({ok:false,code:access.code||"ACCESS_REQUIRED"}),{status:401,headers:{"content-type":"application/json","cache-control":"no-store"}});
  const target=new URL("/access.html",request.url);return Response.redirect(target,307);
}

export const config={runtime:"nodejs",matcher:["/((?!access\.html$|api/app-access$|favicon\.ico$).*)"]};
