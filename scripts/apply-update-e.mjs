import {readFileSync,writeFileSync} from 'node:fs';

const htmlPath='index-grupal.html';
const candidatePath='candidate-index-grupal.html';
const swPath='service-worker.js';
const release='V407-E1-IOS-FIRST';
let html=readFileSync(candidatePath,'utf8');
const originalSw=readFileSync(swPath,'utf8');

function replaceExactlyOnce(source,pattern,replacement,label){
  const matches=[...source.matchAll(pattern)];
  if(matches.length!==1)throw new Error(`${label}_COUNT_${matches.length}`);
  return source.replace(pattern,replacement);
}

if(!html.includes('V407-R33-ROOT-VOICE-UPDATE-20260910'))throw new Error('CANDIDATE_NOT_REAL_R33');
if(!originalSw.includes('gscg-mobile-v363-recorded-mobile-behavior'))throw new Error('SOURCE_SW_NOT_R33');

html=replaceExactlyOnce(html,/<meta\s+name=["']gscg-release["']\s+content=["'][^"']+["']\s*\/?>/gi,`<meta name="gscg-release" content="${release}">`,'RELEASE_META');

/* R32 must first register /service-worker.js so the bridge can take control.
   The NEW E1 shell must not register that one-time bridge again after migration. */
const swRegistration='if(!window.GSC_NATIVE_PLATFORM&&"serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/service-worker.js",{scope:"/"}).catch(error=>console.warn("PWA_SERVICE_WORKER",error?.message||error)),{once:true});';
const swCount=html.split(swRegistration).length-1;
if(swCount!==1)throw new Error(`SW_REGISTRATION_COUNT_${swCount}`);
html=html.replace(swRegistration,'window.__GSC_E_SERVICE_WORKER_MIGRATED__=true;');

const closingMatches=html.match(/<\/body>/gi)||[];
if(closingMatches.length!==1)throw new Error(`BODY_CLOSE_COUNT_${closingMatches.length}`);
const clientTag=`<script src="/update-client-e.js?v=${encodeURIComponent(release)}"></script>\n</body>`;
html=html.replace(/<\/body>/i,clientTag);

if(!html.includes(`content="${release}"`))throw new Error('RELEASE_META_VERIFY_FAIL');
if(!html.includes('/update-client-e.js'))throw new Error('UPDATE_CLIENT_INJECTION_FAIL');
if(html.includes(swRegistration))throw new Error('BRIDGE_REGISTRATION_STILL_PRESENT_IN_NEW_SHELL');

const migrationSw=`"use strict";\nconst MIGRATION_RELEASE="${release}";\nconst LEGACY_CACHE_PREFIX="gscg-mobile-";\nconst NETWORK_SHELL="/index-grupal.html";\nasync function freshShell(){return fetch(NETWORK_SHELL+"?e_bridge_network="+Date.now(),{cache:"no-store",headers:{"Cache-Control":"no-cache"}})}\nasync function clearLegacy(){const names=await caches.keys();await Promise.all(names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX)).map(name=>caches.delete(name)))}\nself.addEventListener("install",event=>{event.waitUntil(self.skipWaiting())});\nself.addEventListener("activate",event=>{event.waitUntil(self.clients.claim())});\nself.addEventListener("fetch",event=>{\n const request=event.request;if(request.method!=="GET")return;\n const url=new URL(request.url);if(url.origin!==self.location.origin)return;\n if(url.searchParams.has("__gscg_build_check")){event.respondWith(freshShell());return}\n if(request.mode==="navigate"&&url.searchParams.get("app_version")===MIGRATION_RELEASE){\n   const responsePromise=freshShell();\n   event.respondWith(responsePromise);\n   event.waitUntil(responsePromise.then(async response=>{if(response.ok){await clearLegacy();await self.registration.unregister()}}).catch(()=>{}));\n }\n});\nself.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});\n`;

writeFileSync(htmlPath,html);
writeFileSync(swPath,migrationSw);
console.log(`UPDATE_E_BUILD_PATCH PASS release=${release} source=real-r33-candidate bridge=r32-manual-one-touch html=patched sw=manual-bridge`);
