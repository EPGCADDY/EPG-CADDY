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

html=replaceExactlyOnce(
  html,
  /<meta\s+name=["']gscg-release["']\s+content=["'][^"']+["']\s*\/?>/gi,
  `<meta name="gscg-release" content="${release}">`,
  'RELEASE_META'
);

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
if(html.includes(swRegistration))throw new Error('OLD_SW_REGISTRATION_STILL_PRESENT');

const migrationSw=`"use strict";\n\nconst MIGRATION_RELEASE="${release}";\nconst LEGACY_CACHE_PREFIX="gscg-mobile-";\n\nself.addEventListener("install",event=>{event.waitUntil(self.skipWaiting())});\nself.addEventListener("activate",event=>{\n  event.waitUntil((async()=>{\n    const names=await caches.keys();\n    const legacy=names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX));\n    await Promise.all(legacy.map(name=>caches.delete(name)));\n    await self.clients.claim();\n    await self.registration.unregister();\n    const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true});\n    await Promise.all(clients.map(async client=>{\n      try{\n        const url=new URL(client.url);\n        url.searchParams.delete("__gscg_build_check");\n        url.searchParams.delete("app_version");\n        url.searchParams.set("e_migrated",MIGRATION_RELEASE);\n        url.searchParams.set("e_reload",String(Date.now()));\n        await client.navigate(url.toString());\n      }catch{}\n    }));\n  })());\n});\n`;

writeFileSync(htmlPath,html);
writeFileSync(swPath,migrationSw);
console.log(`UPDATE_E_BUILD_PATCH PASS release=${release} source=real-r33-candidate html=patched sw=migration`);
