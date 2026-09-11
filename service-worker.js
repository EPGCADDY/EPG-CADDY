"use strict";

const MIGRATION_RELEASE="V407-E1-IOS-FIRST";
const LEGACY_CACHE_PREFIX="gscg-mobile-";

self.addEventListener("install",event=>{
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    const legacy=names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX));
    await Promise.all(legacy.map(name=>caches.delete(name)));
    await self.clients.claim();
    await self.registration.unregister();
    const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    await Promise.all(clients.map(async client=>{
      try{
        const url=new URL(client.url);
        url.searchParams.delete("__gscg_build_check");
        url.searchParams.delete("app_version");
        url.searchParams.set("e_migrated",MIGRATION_RELEASE);
        url.searchParams.set("e_reload",String(Date.now()));
        await client.navigate(url.toString());
      }catch{}
    }));
  })());
});
