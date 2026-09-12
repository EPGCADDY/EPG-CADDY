"use strict";

const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry";
// Preserves the approved v407-r18-live-points-header behavior in this successor cache.
const ACTIVE_CACHE_NAME=`${CACHE_NAME}-v407-r33-root-voice-update`;
const APPROVED_CACHE_NAME=`${CACHE_NAME}-approved`;
const UPDATE_META_CACHE_NAME=`${CACHE_NAME}-update-meta`;
const PROMOTION_MARKER="/__gscg_promoted_release__";
const RELEASE="V407-R33-ROOT-VOICE-UPDATE-20260910";
const PROMOTED_CACHE_NAME=`${CACHE_NAME}-promoted-v407-r33-root-voice-update-20260910`;
const OFFLINE_ENTRY="/index-grupal.html";
const CANDIDATE_ENTRY="/candidate-index-grupal.html";
const SHELL=[
  CANDIDATE_ENTRY,
  "/approved-voice.js",
  "/manifest.webmanifest",
  "/gsc-design-system.css",
  "/manual.html",
  "/manual.webmanifest",
  "/manual-search.js",
  "/voice-assistant.js",
  "/golf-rules-offline.js",
  "/timer-inactivity.js",
  "/docs/manual/v311/manual-pages-17-35.json",
  "/7B1C43A7-EB8A-43CB-B03E-0CAE9273F2A2.jpeg",
  "/assets/official-logos/golf-score-card-gt-pwa-v345-192.png",
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
  "/live-hub.html",
  "/live-hub.js",
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
  const cache=await caches.open(ACTIVE_CACHE_NAME);
  await Promise.all(SHELL.map(async url=>{const response=await fetch(url,{cache:"reload"});if(!response.ok)throw new Error(`SHELL_FETCH_${response.status}_${url}`);await cache.put(url,response)}));
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
  const active=await caches.open(ACTIVE_CACHE_NAME);
  for(const request of await active.keys()){
    if(new URL(request.url).pathname===CANDIDATE_ENTRY)continue;
    const response=await active.match(request);if(response)await approved.put(request,response);
  }
  const baseline=await fetch(OFFLINE_ENTRY,{cache:"no-store"});
  if(baseline.ok)await approved.put(OFFLINE_ENTRY,baseline);
}

async function promotedRelease(){
  const meta=await caches.open(UPDATE_META_CACHE_NAME),marker=await meta.match(PROMOTION_MARKER);
  return marker?String(await marker.text()):"";
}

async function selectedApprovedCacheName(){return await promotedRelease()===RELEASE?PROMOTED_CACHE_NAME:APPROVED_CACHE_NAME}

async function promoteCandidate(){
  const active=await caches.open(ACTIVE_CACHE_NAME);
  const candidate=await active.match(CANDIDATE_ENTRY)||await fetch(CANDIDATE_ENTRY,{cache:"no-store"});
  if(!candidate?.ok)throw new Error("CANDIDATE_UNAVAILABLE");
  const html=await candidate.clone().text();
  if(!html.includes(`<meta name="gscg-release" content="${RELEASE}">`))throw new Error("CANDIDATE_RELEASE_MISMATCH");
  await caches.delete(PROMOTED_CACHE_NAME);
  const promoted=await caches.open(PROMOTED_CACHE_NAME);
  for(const request of await active.keys()){
    if(new URL(request.url).pathname===CANDIDATE_ENTRY)continue;
    const response=await active.match(request);if(response)await promoted.put(request,response);
  }
  await promoted.put(OFFLINE_ENTRY,candidate);
  const stored=await promoted.match(OFFLINE_ENTRY),storedHtml=stored?await stored.text():"";
  if(!storedHtml.includes(`<meta name="gscg-release" content="${RELEASE}">`))throw new Error("PROMOTED_RELEASE_MISMATCH");
  const meta=await caches.open(UPDATE_META_CACHE_NAME);
  await meta.put(PROMOTION_MARKER,new Response(RELEASE,{headers:{"content-type":"text/plain","cache-control":"no-store"}}));
  return{release:RELEASE,cache:PROMOTED_CACHE_NAME};
}

self.addEventListener("install",event=>event.waitUntil(refreshShell().then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(ensureApprovedShell().then(()=>self.clients.claim())));
self.addEventListener("message",event=>{
  if(event.data?.type==="SKIP_WAITING")self.skipWaiting();
  if(event.data?.type==="PROMOTE_BUILD"){
    const port=event.ports?.[0],nonce=String(event.data?.nonce||"");
    event.waitUntil((async()=>{
      try{
        if(event.data?.build!==RELEASE)throw new Error("BUILD_MISMATCH");
        await promoteCandidate();
        port?.postMessage({type:"PROMOTION_READY",ok:true,build:RELEASE,nonce});
      }catch(error){port?.postMessage({type:"PROMOTION_FAILED",ok:false,build:RELEASE,nonce,error:String(error?.message||"PROMOTION_FAILED")})}
    })());
  }
});

async function networkFirst(request){
  const cache=await caches.open(ACTIVE_CACHE_NAME);
  try{
    const response=await fetch(request);
    if(response.ok&&response.type==="basic")await cache.put(request,response.clone());
    return response;
  }catch{
    return await cache.match(request)||await cache.match(OFFLINE_ENTRY)||Response.error();
  }
}

async function approvedNavigationWithManualUpdate(request){
  const cacheName=await selectedApprovedCacheName();
  const approved=await caches.match(OFFLINE_ENTRY,{cacheName});
  if(!approved)return networkFirst(request);
  const html=await approved.text();
  const recoveryStyle='<style id="gsc-update-recovery">body.gsc-setup-open:has(#setupOverlay.visible) .mandatory-update{display:block!important}body.gsc-setup-open:has(#setupOverlay.visible) #setupOverlay{padding-top:max(82px,calc(env(safe-area-inset-top) + 70px))}</style>';
  const headers=new Headers(approved.headers);headers.set("content-type","text/html; charset=utf-8");headers.delete("content-length");
  return new Response(html.includes('id="gsc-update-recovery"')?html:html.replace("</head>",`${recoveryStyle}</head>`),{status:approved.status,statusText:approved.statusText,headers});
}

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;
  if(request.mode==="navigate"&&url.pathname==="/access.html"){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(request.mode==="navigate"&&(url.pathname==="/manual.pdf"||url.pathname==="/manual.html")){event.respondWith(fetch("/manual.html?__gscg_build_check=1",{cache:"no-store"}));return}
  if(url.searchParams.has("__gscg_build_check")){event.respondWith((async()=>{const cache=await caches.open(ACTIVE_CACHE_NAME);return await cache.match(CANDIDATE_ENTRY)||fetch(CANDIDATE_ENTRY,{cache:"no-store"})})());return}
  if(request.mode==="navigate"){
    event.respondWith((async()=>{
      if(url.searchParams.get("app_version")===RELEASE){await promoteCandidate();return await caches.match(OFFLINE_ENTRY,{cacheName:PROMOTED_CACHE_NAME})||networkFirst(request)}
      await ensureApprovedShell();
      return await approvedNavigationWithManualUpdate(request);
    })());
    return;
  }
  if(SHELL.includes(url.pathname))event.respondWith((async()=>{await ensureApprovedShell();const cacheName=await selectedApprovedCacheName();return await caches.match(url.pathname,{cacheName})||networkFirst(request)})());
});
