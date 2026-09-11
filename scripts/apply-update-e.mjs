import {readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const gate=(mode)=>{
  const result=spawnSync(process.execPath,['scripts/update-intocable-gate.mjs',mode],{stdio:'inherit'});
  if(result.status!==0)throw new Error(`ACTUALIZADOR_INTOCABLE_GATE_${mode.toUpperCase()}_FAIL`);
};

gate('source');

const htmlPath='index-grupal.html';
const shellPath='app-current-shell.html';
const candidatePath='candidate-index-grupal.html';
const updaterPath='update-client-e.js';
const swPath='service-worker.js';
const release='V407-R49-CANONICAL-NAVIGATION-20260911';
let html=readFileSync(candidatePath,'utf8');
const updater=readFileSync(updaterPath,'utf8');
const originalSw=readFileSync(swPath,'utf8');

function replaceExactlyOnce(source,pattern,replacement,label){
  const matches=[...source.matchAll(pattern)];
  if(matches.length!==1)throw new Error(`${label}_COUNT_${matches.length}`);
  return source.replace(pattern,replacement);
}

if(!html.includes('V407-R33-ROOT-VOICE-UPDATE-20260910'))throw new Error('CANDIDATE_NOT_REAL_R33');
if(!originalSw.includes('gscg-mobile-v363-recorded-mobile-behavior'))throw new Error('SOURCE_SW_NOT_R33');

html=replaceExactlyOnce(html,/<meta\s+name=["']gscg-release["']\s+content=["'][^"']+["']\s*\/?>/gi,`<meta name="gscg-release" content="${release}">`,'RELEASE_META');
html=html.replace(/V407\s*·\s*R33/g,'V407 · R48');

const swRegistration='if(!window.GSC_NATIVE_PLATFORM&&"serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/service-worker.js",{scope:"/"}).catch(error=>console.warn("PWA_SERVICE_WORKER",error?.message||error)),{once:true});';
const swCount=html.split(swRegistration).length-1;
if(swCount!==1)throw new Error(`SW_REGISTRATION_COUNT_${swCount}`);
html=html.replace(swRegistration,'window.__GSC_PINNED_UPDATE_NO_SERVICE_WORKER__=true;');

const closingMatches=html.match(/<\/body>/gi)||[];
if(closingMatches.length!==1)throw new Error(`BODY_CLOSE_COUNT_${closingMatches.length}`);
const inlineUpdater=`<script>\n${updater.replace(/<\/script/gi,'<\\/script')}\n<\/script>\n</body>`;
html=html.replace(/<\/body>/i,inlineUpdater);

if(!html.includes(`content="${release}"`))throw new Error('RELEASE_META_VERIFY_FAIL');
if(!html.includes('GSCUpdatePinned'))throw new Error('PINNED_UPDATER_INJECTION_FAIL');
if(html.includes(swRegistration))throw new Error('SW_REGISTRATION_STILL_PRESENT');
if(Buffer.byteLength(html,'utf8')>3000000)throw new Error('PINNED_SHELL_TOO_LARGE');

const loader=`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Golf Score Card Guatemala</title></head><body style="margin:0;background:#000;color:#fff">
<script>
(()=>{
 const HTML_KEY="gscg_installed_shell_html_v1";
 const RELEASE_KEY="gscg_active_release_v1";
 const ENDPOINT="/app-current-shell.html";
 const getRelease=html=>html.match(/<meta\\s+name=["']gscg-release["']\\s+content=["']([^"']+)["']/i)?.[1]||"";
 async function fetchCurrent(){
   const url=new URL(ENDPOINT,location.origin);url.searchParams.set("bootstrap",String(Date.now()));
   const response=await fetch(url.toString(),{cache:"no-store",headers:{"Cache-Control":"no-cache","Pragma":"no-cache"}});
   if(!response.ok)throw new Error("BOOTSTRAP_HTTP_"+response.status);
   const html=await response.text();
   const release=getRelease(html);
   if(html.length<300000||!release)throw new Error("BOOTSTRAP_SHELL_INVALID");
   localStorage.setItem(HTML_KEY,html);localStorage.setItem(RELEASE_KEY,release);
   if(localStorage.getItem(RELEASE_KEY)!==release)throw new Error("BOOTSTRAP_STORAGE_VERIFY_FAIL");
   return html;
 }
 async function boot(){
   let html="",release="";
   try{html=localStorage.getItem(HTML_KEY)||"";release=localStorage.getItem(RELEASE_KEY)||""}catch(error){throw new Error("BOOTSTRAP_STORAGE_UNAVAILABLE")}
   if(!html||!release||getRelease(html)!==release)html=await fetchCurrent();
   document.open();document.write(html);document.close();
 }
 boot().catch(error=>{document.body.innerHTML='<div style="font-family:system-ui;padding:24px">ERROR DE CARGA LOCAL · '+String(error?.message||error)+'</div>';console.error("PINNED_BOOTSTRAP",error)});
})();
<\/script></body></html>`;

const retirementSw=`"use strict";\nconst LEGACY_CACHE_PREFIX="gscg-mobile-";\nself.addEventListener("install",event=>event.waitUntil(self.skipWaiting()));\nself.addEventListener("activate",event=>event.waitUntil((async()=>{\n const names=await caches.keys();\n await Promise.all(names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX)).map(name=>caches.delete(name)));\n await self.registration.unregister();\n})()));\n`;

writeFileSync(shellPath,html);
writeFileSync(htmlPath,loader);
writeFileSync(swPath,retirementSw);
console.log(`PINNED_UPDATE_BUILD PASS release=${release} shell=${shellPath} loader=${htmlPath} bytes=${Buffer.byteLength(html,'utf8')} sw=retirement-only`);

gate('built');
