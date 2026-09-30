import { next } from "@vercel/functions";

const PUBLIC_PATHS=new Set([
  "/live-hub.html","/live-hub.js","/live-control.js","/live-share.js","/scores-ui.js","/scores-ui.css","/private-rounds.js","/gsc-design-system.css","/shortcuts-ui.js","/personal-events.js","/auth-gate.js",
  "/access.html","/live.html","/live-view.js","/match-play.js","/favicon.ico",
  "/service-worker.js","/release.json","/manifest.webmanifest","/manual.webmanifest","/audio-touch-test.html"
]);
const PRIVATE_GUEST_PREFIXES=["/api/account-backup","/api/backup","/api/commerce","/api/sync","/api/master-data"];
const SCORECARD_ASSETS=new Set(['/score-entry-contract.js','/guest-access.js','/player-registry.js','/round-closure.js','/device-closures.js','/card-artifacts.js','/card-file-export.js','/card-library.js','/historical-analytics.js','/sync-queue.js','/master-data-sync.js','/account-backup.js','/four-ball.js','/stableford.js','/universales.js','/skins.js','/wolf.js','/vegas.js','/dots.js','/round-navigation.js','/golf-rules-offline.js','/timer-inactivity.js']);

export default async function accessGate(request){
  const url=new URL(request.url),path=url.pathname;
  const guestMode=(request.headers.get("cookie")||"").split(";").some(value=>value.trim()==="gsc_guest_mode=1");
  if(path==="/api/account"&&guestMode&&!(request.method==="POST"&&["signin","signup"].includes(url.searchParams.get("action"))))return new Response(JSON.stringify({ok:false,code:"OWNER_DATA_FORBIDDEN"}),{status:403,headers:{"content-type":"application/json","cache-control":"no-store"}});
  if(path==="/api/account")return next();
  if(path==='/api/backup'||path==='/api/sync'){
    if(guestMode)return new Response(JSON.stringify({ok:false,code:'OWNER_DATA_FORBIDDEN'}),{status:403,headers:{'content-type':'application/json','cache-control':'no-store'}});
    try{
      const response=await fetch(new URL('/api/personal-events',request.url),{method:'POST',headers:{cookie:request.headers.get('cookie')||'','content-type':'application/json'},body:JSON.stringify({action:'list'}),cache:'no-store'}),data=await response.json();
      if(response.ok&&data.events?.some(event=>['organizer','player','scorer'].includes(event.role)&&(path==='/api/backup'||event.status==='active')))return next();
    }catch{}
  }
  if(path==="/api/traffic"&&request.method==="GET"&&url.searchParams.get("action")==="status")return next();
  if(PUBLIC_PATHS.has(path)||SCORECARD_ASSETS.has(path)||path.startsWith("/invite/")||path.startsWith("/assets/official-logos/"))return next();
  // LIVE is token/secret-authorized inside api/live itself. Keep it independent from app-access
  // so installed/PWA clients can create, publish, read and revoke a private LIVE stream.
  if((path==="/api/live"||path==="/api/live-share"||path==="/api/personal-events")&&request.method==="POST")return next();
  if(path==='/index-grupal.html'){
    let context=null;
    if(url.searchParams.get('personalEvent'))context={eventId:url.searchParams.get('personalEvent'),eventKind:url.searchParams.get('personalKind')||'tournament',accountId:url.searchParams.get('personalAccount')};
    else try{const raw=(request.headers.get('cookie')||'').split(';').map(value=>value.trim()).find(value=>value.startsWith('gsc_personal_context='));if(raw)context=JSON.parse(decodeURIComponent(raw.slice('gsc_personal_context='.length)))}catch{}
    if(context){
      try{
        const response=await fetch(new URL('/api/personal-events',request.url),{method:'POST',headers:{cookie:request.headers.get('cookie')||'','content-type':'application/json'},body:JSON.stringify({action:'read',eventId:context.eventId,eventKind:context.eventKind}),cache:'no-store'}),data=await response.json();
        if(response.ok&&data.accountCode===context.accountId){
          const writer=['organizer','player','scorer'].includes(data.membership?.role)&&data.membership.players?.length&&data.tournament?.status!=='closed';
          if(url.searchParams.get('personalEvent')){if(writer)return next()}
          else{const target=new URL(writer?'/index-grupal.html':'/live-hub.html',request.url);target.searchParams.set('personalEvent',context.eventId);target.searchParams.set('personalKind',context.eventKind);if(writer){target.searchParams.set('personalAccount',data.accountCode);target.searchParams.set('manual_action',url.searchParams.get('manual_action')||'personal-scorecard')}return Response.redirect(target,307)}
        }
      }catch{}
      if(url.searchParams.get('personalEvent'))return new Response('Acceso personal no autorizado',{status:403,headers:{'cache-control':'no-store'}});
    }
  }
  // The application shell and all non-API routes are public. Keep identity
  // checks at API boundaries and on explicitly addressed personal scorecards.
  if(!path.startsWith('/api/'))return next();
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
  return new Response(JSON.stringify({ok:false,code:access.code||"ACCESS_REQUIRED"}),{status:401,headers:{"content-type":"application/json","cache-control":"no-store"}});
}

export const config={runtime:"nodejs",matcher:["/((?!access\.html$|api/app-access$|favicon\.ico$).*)"]};
