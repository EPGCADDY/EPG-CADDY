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

/* Keep a tiny registration bootstrap in the NEW shell. This is deliberate:
   an installed R32/R33 client can only escape its legacy controlling worker if
   the migration worker is actually registered. The migration worker then
   deletes only gscg-mobile-* caches, unregisters itself, and reloads from network. */
const swRegistration='if(!window.GSC_NATIVE_PLATFORM&&"serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/service-worker.js",{scope:"/"}).catch(error=>console.warn("PWA_SERVICE_WORKER",error?.message||error)),{once:true});';
if(!html.includes(swRegistration))throw new Error('SW_REGISTRATION_MISSING');

const closingMatches=html.match(/<\/body>/gi)||[];
if(closingMatches.length!==1)throw new Error(`BODY_CLOSE_COUNT_${closingMatches.length}`);
const clientTag=`<script src="/update-client-e.js?v=${encodeURIComponent(release)}"></script>\n</body>`;
html=html.replace(/<\/body>/i,clientTag);

if(!html.includes(`content="${release}"`))throw new Error('RELEASE_META_VERIFY_FAIL');
if(!html.includes('/update-client-e.js'))throw new Error('UPDATE_CLIENT_INJECTION_FAIL');

const migrationSw=`"use strict";\nconst MIGRATION_RELEASE="${release}";\nconst LEGACY_CACHE_PREFIX="gscg-mobile-";\nself.addEventListener("install",event=>{event.waitUntil(self.skipWaiting())});\nself.addEventListener("activate",event=>{event.waitUntil((async()=>{\n const names=await caches.keys();\n await Promise.all(names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX)).map(name=>caches.delete(name)));\n await self.clients.claim();\n await self.registration.unregister();\n const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true});\n await Promise.all(clients.map(async client=>{try{const url=new URL(client.url);url.searchParams.delete("__gscg_build_check");url.searchParams.delete("app_version");url.searchParams.set("e_migrated",MIGRATION_RELEASE);url.searchParams.set("e_reload",String(Date.now()));await client.navigate(url.toString())}catch{}}));\n})())});\n`;

writeFileSync(htmlPath,html);
writeFileSync(swPath,migrationSw);
console.log(`UPDATE_E_BUILD_PATCH PASS release=${release} source=real-r33-candidate bootstrap=migration html=patched sw=migration`);
