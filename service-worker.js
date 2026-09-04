"use strict";

const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry-v369-voice-090-one-turn-gps-traffic-v371-r8-ios-audio-session-release";
const OFFLINE_ENTRY="/index-grupal.html";
const SHELL=[
  OFFLINE_ENTRY,
  "/manifest.webmanifest",
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
  "/skins.js",
  "/wolf.js",
  "/vegas.js",
  "/dots.js",
  "/round-navigation.js"
];

async function refreshShell(){
  const cache=await caches.open(CACHE_NAME);
  await Promise.all(SHELL.map(async url=>{try{const response=await fetch(url,{cache:"reload"});if(response.ok)await cache.put(url,response)}catch{}}));
}

self.addEventListener("install",event=>event.waitUntil(refreshShell().then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("gscg-mobile-")&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});

async function networkFirst(request){
  const cache=await caches.open(CACHE_NAME);
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
  if(request.mode==="navigate"||SHELL.includes(url.pathname))event.respondWith(networkFirst(request));
});
