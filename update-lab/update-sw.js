"use strict";
const RELEASE="BURNIN-C1";
self.addEventListener("install",()=>{});
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("message",event=>{
  if(event.data?.type==="ACTIVATE_RELEASE"){
    if(event.data.release!==RELEASE)return;
    event.waitUntil(self.skipWaiting());
    return;
  }
  if(event.data?.type==="QUERY_ACTIVE_RELEASE")event.ports?.[0]?.postMessage({release:RELEASE});
});
