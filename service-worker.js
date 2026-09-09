"use strict";

const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry";
const ACTIVE_CACHE_NAME=`${CACHE_NAME}-v407-r19-support-manual`;
const APPROVED_CACHE_NAME=`${CACHE_NAME}-approved`;
const RELEASE="V407-R19-SUPPORT-MANUAL-20260908";
const OFFLINE_ENTRY="/index-grupal.html";
const SHELL=[
  OFFLINE_ENTRY,
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
  await Promise.all(SHELL.map(async url=>{try{const response=await fetch(url,{cache:"reload"});if(response.ok)await cache.put(url,response)}catch{}}));
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
  const previous=keys.filter(key=>key.startsWith(`${CACHE_NAME}-v406-`)&&key!==ACTIVE_CACHE_NAME).pop();
  if(previous)await copyCache(previous,APPROVED_CACHE_NAME);
  else await copyCache(ACTIVE_CACHE_NAME,APPROVED_CACHE_NAME);
}

async function promoteCandidate(){
  await copyCache(ACTIVE_CACHE_NAME,APPROVED_CACHE_NAME);
}

self.addEventListener("install",event=>event.waitUntil(refreshShell().then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(ensureApprovedShell().then(()=>self.clients.claim())));
self.addEventListener("message",event=>{
  if(event.data?.type==="SKIP_WAITING")self.skipWaiting();
  if(event.data?.type==="PROMOTE_BUILD"&&event.data?.build===RELEASE)event.waitUntil(promoteCandidate());
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

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;
  if(url.searchParams.has("__gscg_build_check")){event.respondWith(fetch(request,{cache:"no-store"}));return}
  if(request.mode==="navigate"){
    event.respondWith((async()=>{
      if(url.searchParams.get("app_version")===RELEASE){await promoteCandidate();return await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME})||networkFirst(request)}
      await ensureApprovedShell();
      return await caches.match(OFFLINE_ENTRY,{cacheName:APPROVED_CACHE_NAME})||networkFirst(request);
    })());
    return;
  }
  if(SHELL.includes(url.pathname))event.respondWith((async()=>{await ensureApprovedShell();return await caches.match(url.pathname,{cacheName:APPROVED_CACHE_NAME})||networkFirst(request)})());
});
