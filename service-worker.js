"use strict";
// R140: iOS PWA network-first. Cache is fallback only; never pin an older application shell.
const RELEASE="LABORATORIO-20260925-R140";
const CACHE_NAME="gscg-mobile-v138-r140";
const OFFLINE_ENTRY="/index-grupal.html";
const SHELL=[
  OFFLINE_ENTRY,"/live-hub.html","/manifest.webmanifest","/gsc-design-system.css","/score-entry-contract.js",
  "/player-registry.js","/round-closure.js","/device-closures.js","/card-artifacts.js",
  "/card-file-export.js","/card-library.js","/historical-analytics.js","/sync-queue.js",
  "/master-data-sync.js","/account-backup.js","/live-control.js","/match-play.js",
  "/four-ball.js","/stableford.js","/universales.js","/skins.js","/wolf.js","/vegas.js",
  "/dots.js","/round-navigation.js","/golf-rules-offline.js","/timer-inactivity.js","/shortcuts-ui.js","/auth-gate.js","/live-hub.html","/live-hub.js","/shortcuts-ui.js"
];
async function cacheFreshShell(){
  const cache=await caches.open(CACHE_NAME);
  await Promise.all(SHELL.map(async path=>{try{const response=await fetch(path,{cache:"no-store"});if(response.ok)await cache.put(path,response.clone())}catch{}}));
}
self.addEventListener("install",event=>event.waitUntil(cacheFreshShell().then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith("gscg-mobile-")&&key!==CACHE_NAME)await caches.delete(key);
  await self.clients.claim();
  for(const client of await self.clients.matchAll({type:"window",includeUncontrolled:true})){
    try{const url=new URL(client.url);if(url.origin===self.location.origin)await client.navigate(url.href)}catch{}
  }
})()));
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});
async function networkFirst(request,fallbackPath=""){
  try{
    const response=await fetch(request,{cache:"no-store"});
    if(response.ok){
      const cache=await caches.open(CACHE_NAME);
      const url=new URL(request.url);
      if(SHELL.includes(url.pathname))await cache.put(url.pathname,response.clone());
    }
    return response;
  }catch{
    const cache=await caches.open(CACHE_NAME);
    return await cache.match(request)||await cache.match(new URL(request.url).pathname)||(fallbackPath?await cache.match(fallbackPath):null)||Response.error();
  }
}
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;
  if(request.mode==="navigate"){
    event.respondWith(networkFirst(request,["/","/index.html","/inicio",OFFLINE_ENTRY].includes(url.pathname)?OFFLINE_ENTRY:""));
    return;
  }
  if(SHELL.includes(url.pathname))event.respondWith(networkFirst(request,url.pathname));
});
