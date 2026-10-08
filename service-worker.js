"use strict";

const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry-v371-r196-whatsapp-card-caption-v374-r200-stableford-gross-points-r199-tournament-join-v395-r223-negative-handicap-campeonato-a";
// Preserves the approved v407-r18-live-points-header behavior in this successor cache.
const ACTIVE_CACHE_NAME=`${CACHE_NAME}-active-r148-entry-inspection`;
const APPROVED_CACHE_NAME=`${CACHE_NAME}-approved-r148-entry-inspection`;
const RELEASE_FALLBACK="20261008-R223";
let RELEASE=RELEASE_FALLBACK;
const UPDATE_DIAGNOSTICS={stage:"boot",resources:{}};
async function fetchPublishedRelease(){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
  try{
    const response=await fetch("/release.json?sw_release_check="+Date.now(),{cache:"no-store",signal:controller.signal});
    if(response.ok){
      const data=await response.json();
      if(data?.release)RELEASE=String(data.release);
    }
  }catch{}finally{clearTimeout(timeout)}
  return RELEASE;
}
const OFFLINE_ENTRY="/index-grupal.html";
const SHELL=[
  "/score-entry-contract.js",
  OFFLINE_ENTRY,
  "/manifest.webmanifest",
  "/gsc-design-system.css",
  "/manual.html",
  "/stableford-torneo.html",
  "/live.html",
  "/manual-torneos.html",
  "/manual.webmanifest",
  "/manual-search.js",
  "/device-closures.js",
  "/golf-rules-offline.js",
  "/timer-inactivity.js",
  "/docs/manual/v311/manual-pages-17-35.json",
  "/7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg",
  "/assets/official-logos/golf-score-card-gt-pwa-v345-192.png",
  "/assets/official-logos/golf-score-card-gt-horizontal-original.webp",
  "/assets/official-logos/golf-score-card-gt-pwa-v345-512.png",
  "/assets/official-logos/golf-score-card-gt-apple-touch-v345-180.png",
  "/docs/manual/v311/manual-scg-pwa-v345-192.png",
  "/docs/manual/v311/manual-scg-pwa-v345-512.png",
  "/docs/manual/v311/manual-scg-apple-touch-v345-180.png",
  "/player-registry.js",
  "/round-closure.js",
  "/card-artifacts.js",
  "/card-file-export.js",
  "/card-library.js",
  "/historical-analytics.js",
  "/sync-queue.js",
  "/master-data-sync.js",
  "/account-backup.js",
  "/live-control.js",
  "/private-rounds.js",
  "/scores-ui.js",
  "/live-share.js",
  "/whatsapp-invitations.js",
  "/personal-events.js",
  "/scores-ui.css",
  "/live-hub.html",
  "/live-hub.js",
  "/shortcuts-ui.js",
  "/auth-gate.js",
  "/match-play.js",
  "/four-ball.js",
  "/stableford.js",
  "/universales.js",
  "/skins.js",
  "/wolf.js",
  "/vegas.js",
  "/dots.js",
  "/round-navigation.js"
];

async function refreshShell(){
  UPDATE_DIAGNOSTICS.stage="release-check";
  await fetchPublishedRelease();
  UPDATE_DIAGNOSTICS.stage="shell-fetch";
  const staged=await Promise.all(SHELL.map(async url=>{const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);try{UPDATE_DIAGNOSTICS.resources[url]="fetching";const shellUrl=url===OFFLINE_ENTRY?url+"?inicio=1&__gscg_build_check=1":url;const response=await fetch(shellUrl,{cache:"reload",signal:controller.signal});UPDATE_DIAGNOSTICS.resources[url]=response.status;if(!response.ok)return null;const body=await response.arrayBuffer();const headers=new Headers(response.headers);headers.delete("content-length");headers.delete("content-encoding");return {url,response:new Response(body,{status:response.status,statusText:response.statusText,headers})}}catch(error){UPDATE_DIAGNOSTICS.resources[url]=error.message;return null}finally{clearTimeout(timeout)}}));
  if(staged.some(item=>!item)){UPDATE_DIAGNOSTICS.stage="shell-incomplete";return false}
  const entry=staged.find(item=>item.url===OFFLINE_ENTRY);
  UPDATE_DIAGNOSTICS.stage="entry-body";
  const html=await entry.response.clone().text();
  const build=html.match(/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i)?.[1];
  if(build!==RELEASE)return false;
  UPDATE_DIAGNOSTICS.stage="cache-write";
  const cache=await caches.open(ACTIVE_CACHE_NAME);
  await Promise.all(staged.map(async({url,response})=>{await cache.put(url,response);UPDATE_DIAGNOSTICS.resources[url]="cached"}));
  UPDATE_DIAGNOSTICS.stage="shell-ready";
  return true;
}

async function copyCache(sourceName,targetName){
  const source=await caches.open(sourceName),target=await caches.open(targetName);
  for(const request of await source.keys()){
    const response=await source.match(request);
    if(response)await target.put(request,response);
  }
}

async function ensureApprovedShell(){
  const approved=await caches.open(APPROVED_CACHE_NAME);
  if(await approved.match(OFFLINE_ENTRY))return;
  const keys=await caches.keys();
  const previous=[...keys.filter(key=>key.startsWith(`${CACHE_NAME}-approved-`)&&key!==APPROVED_CACHE_NAME).reverse(),...keys.filter(key=>key.startsWith(`${CACHE_NAME}-production-`)&&key!==ACTIVE_CACHE_NAME).reverse()];
  for(const name of previous){if(await caches.match(OFFLINE_ENTRY,{cacheName:name})){await copyCache(name,APPROVED_CACHE_NAME);return}}
  await copyCache(ACTIVE_CACHE_NAME,APPROVED_CACHE_NAME);
}

async function promoteCandidate(){
  await copyCache(ACTIVE_CACHE_NAME,APPROVED_CACHE_NAME);
}

self.addEventListener("install",event=>event.waitUntil((async()=>{
  // Adopt the delivery controller independently of downloading the next app.
  // Existing approved cards stay intact; their new shell is fetched only on ACTUALIZAR.
  await ensureApprovedShell();
  const approved=await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME});
  if(!approved){await refreshShell();await ensureApprovedShell()}
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{await ensureApprovedShell();await self.clients.claim()})()));
self.addEventListener("message",event=>{
  if(event.data?.type==="GET_UPDATE_DIAGNOSTICS")event.ports?.[0]?.postMessage(UPDATE_DIAGNOSTICS);
  if(event.data?.type==="SKIP_WAITING")self.skipWaiting();
  if(event.data?.type==="GET_APPROVED_RELEASE")event.waitUntil((async()=>{await ensureApprovedShell();const entry=await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME});const html=entry?await entry.text():'';const release=html.match(/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i)?.[1]||'';event.ports?.[0]?.postMessage({release})})());
});

async function networkFirst(request,allowCardFallback=true){
  const cache=await caches.open(ACTIVE_CACHE_NAME);
  try{
    const response=await fetch(request);
    if(response.ok&&response.type==="basic")await cache.put(request,response.clone());
    return response;
  }catch{
    return await cache.match(request)||(allowCardFallback?await cache.match(OFFLINE_ENTRY):null)||Response.error();
  }
}

async function approvedNavigationWithManualUpdate(request){
  await fetchPublishedRelease();
  const approved=await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME});
  if(!approved)return networkFirst(request);
  const html=removeHostingToolbar(await approved.text());
  const approvedRelease=html.match(/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i)?.[1]||"";
  const stale=approvedRelease!==RELEASE;
  if(!stale)return new Response(html,{status:approved.status,headers:approved.headers});
  const recoveryStyle='<style id="gsc-update-recovery">body.gsc-setup-open:has(#setupOverlay.visible) .mandatory-update{display:none!important}body.gsc-setup-open:has(#setupOverlay.visible) .mandatory-update.available{display:block!important}#mandatoryUpdate{position:fixed!important;top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 16px)!important;right:16px!important;left:auto!important;transform:none!important;z-index:2147483647!important;width:max-content!important}#mandatoryUpdateButton{position:relative!important;min-height:44px!important;pointer-events:auto!important}</style>';
  let servedHtml=html.includes('id="gsc-update-recovery"')?html:html.replace("</head>",`${recoveryStyle}</head>`);
  if(stale){
    // Always inject a SW-owned rescue control. Old R128 HTML already contains mandatoryUpdateButton,
    // but its stale JavaScript is exactly what failed to discover the new build.
    if(!servedHtml.includes('id="gscFallbackUpdateButton"')){
    const fallback='<style id="gsc-fallback-update-style">#gscFallbackUpdateButton{position:fixed;right:14px;bottom:max(14px,env(safe-area-inset-bottom));z-index:2147483647;height:44px;padding:0 18px;border:2px solid #31ff00;border-radius:22px;background:#000;color:#31ff00;font:900 14px Arial,sans-serif;box-shadow:0 0 14px rgba(49,255,0,.28)}</style><button id="gscFallbackUpdateButton" type="button">ACTUALIZAR</button><script id="gsc-fallback-update-script">(function(){var b=document.getElementById("gscFallbackUpdateButton");if(!b)return;b.onclick=function(){b.disabled=true;b.textContent="ACTUALIZANDO…";var u=new URL(location.href);u.searchParams.set("__gscg_build_check","1");u.searchParams.set("app_version",'+JSON.stringify(RELEASE)+');u.searchParams.set("update_check",String(Date.now()));location.replace(u.toString())}})();</script>';
    servedHtml=servedHtml.replace("</body>",fallback+"</body>");
    }
  }
  const headers=new Headers(approved.headers);headers.set("content-type","text/html; charset=utf-8");headers.delete("content-length");headers.set("cache-control","no-store");
  return new Response(servedHtml,{status:approved.status,statusText:approved.statusText,headers});
}
// Hosting injects this script after the build. Older approved shells may retain it
// even when the project setting is Off. Strip only the known vendor injection.
function removeHostingToolbar(html){
  return html.replace(/<script\b[^>]*\bsrc\s*=\s*["'](?:https?:)?\/\/vercel\.live\/[^"']*["'][^>]*>[\s\S]*?<\/script\s*>/gi,'');
}
async function manualAppNavigation(request){
  const url=new URL(request.url);
  await fetchPublishedRelease();
  if(url.searchParams.has("update_check")&&url.searchParams.get("app_version")===RELEASE){
    if(!await refreshShell())return approvedNavigationWithManualUpdate(request);
    await promoteCandidate();
    const returnTo=url.searchParams.get("update_return");
    if(returnTo){try{const destination=new URL(returnTo,url.origin);if(destination.origin===url.origin&&destination.pathname==="/event-administration.html")return Response.redirect(destination.href,303)}catch{}}
    return await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME})||networkFirst(request);
  }
  await ensureApprovedShell();
  return approvedNavigationWithManualUpdate(request);
}

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.hostname==='vercel.live'){event.respondWith(new Response('',{headers:{'content-type':'application/javascript','cache-control':'no-store'}}));return}
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;
  // Personal scorecards load the app shell first; private data stays protected by
  // the read/publish APIs so a transient cookie miss never becomes a raw 403 page.
  if(request.mode==='navigate'&&(url.searchParams.has('personalEvent')||url.searchParams.has('personalAccount'))){event.respondWith(url.pathname===OFFLINE_ENTRY?manualAppNavigation(request):fetch(request,{cache:'no-store'}));return}
  if(request.mode==="navigate"&&(url.pathname==="/access.html"||url.pathname==="/code-entry.html"||url.pathname==="/pwa-launch.html"||url.pathname.startsWith("/invite/"))){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(request.mode==="navigate"&&(url.pathname==="/manual.pdf"||url.pathname==="/manual.html")){event.respondWith(fetch("/manual.html?__gscg_build_check=1",{cache:"no-store"}));return}
  if(url.pathname==="/release.json"){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if((url.searchParams.has("__gscg_build_check")||url.searchParams.has("update_check"))&&!(request.mode==="navigate"&&url.searchParams.has("app_version"))){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(request.mode==="navigate"&&!["/","/index.html","/inicio",OFFLINE_ENTRY].includes(url.pathname)){event.respondWith(networkFirst(request,false));return}
  if(request.mode==="navigate"){
    event.respondWith(manualAppNavigation(request));
    return;
  }
  if(SHELL.includes(url.pathname))event.respondWith((async()=>{await ensureApprovedShell();const response=await caches.match(url.pathname,{cacheName:APPROVED_CACHE_NAME})||await networkFirst(request);if(url.pathname!=="/shortcuts-ui.js"||!response.ok)return response;const headers=new Headers(response.headers);headers.delete('content-length');headers.set('content-type','application/javascript');return new Response((await response.text())+'\nimport("/app-update.js").catch(()=>{});',{status:response.status,headers})})());
});

