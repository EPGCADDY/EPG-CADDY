import {readFileSync,writeFileSync} from 'node:fs';

const path='index-grupal.html';
const release='V407-E1-IOS-FIRST';
let html=readFileSync(path,'utf8');

function replaceExactlyOnce(source,pattern,replacement,label){
  const matches=[...source.matchAll(pattern)];
  if(matches.length!==1)throw new Error(`${label}_COUNT_${matches.length}`);
  return source.replace(pattern,replacement);
}

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

writeFileSync(path,html);
console.log(`UPDATE_E_BUILD_PATCH PASS release=${release}`);
