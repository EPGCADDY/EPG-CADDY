import fs from 'node:fs';
import assert from 'node:assert/strict';
import {personalAccessEnabled} from './api/_lib/personal-access-activation.js';
import {liveShareDeploymentReady} from './api/live-share.js';

const liveHub=fs.readFileSync('live-hub.js','utf8');
const personalAccess=fs.readFileSync('api/_lib/personal-access-activation.js','utf8');
const liveShareApi=fs.readFileSync('api/live-share.js','utf8');
const database=fs.readFileSync('api/_lib/database.js','utf8');
const release=JSON.parse(fs.readFileSync('release.json','utf8'));
const app=fs.readFileSync('index-grupal.html','utf8');
const serviceWorker=fs.readFileSync('service-worker.js','utf8');
const parity=JSON.parse(fs.readFileSync('CONTROL_PROYECTO_SCIRE/ARQUITECTURA_PARIDAD_LAB_PRODUCCION.json','utf8'));

const lab={
  GSC_ENVIRONMENT:'lab',
  VERCEL_PROJECT_ID:'prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp',
  GSC_PERSONAL_ACCESS_LAB_READY:'1',
  GSC_LIVE_SHARE_LAB_READY:'1',
  GSC_LAB_DATABASE_URL:'postgres://lab',
  DATABASE_URL:'postgres://production'
};
const production={
  GSC_ENVIRONMENT:'production',
  VERCEL_PROJECT_ID:'prj_d0fwQinspgOKpVKoKjmsJOaR2qr1',
  GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1',
  DATABASE_URL:'postgres://production'
};

assert.equal(personalAccessEnabled({...lab,VERCEL_ENV:'preview'}),true,'LAB and preview alias must activate through its declared LAB environment');
assert.equal(personalAccessEnabled({...production,VERCEL_ENV:'preview'}),true,'Production and preview alias must activate through its declared production environment');
assert.equal(personalAccessEnabled({...production,GSC_PERSONAL_ACCESS_LAB_READY:'1',GSC_PERSONAL_ACCESS_PRODUCTION_READY:undefined,VERCEL_ENV:'preview'}),false,'Production cannot be activated by LAB flag');
assert.equal(personalAccessEnabled({...lab,GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1',GSC_PERSONAL_ACCESS_LAB_READY:undefined,VERCEL_ENV:'preview'}),false,'LAB cannot be activated by Production flag');
assert.equal(liveShareDeploymentReady(lab),true,'LAB Live Share requires explicit LAB readiness on LAB project');
assert.equal(liveShareDeploymentReady({...lab,GSC_LIVE_SHARE_LAB_READY:undefined}),false,'LAB Live Share must fail closed without its readiness flag');

assert.equal(parity.schema,'gscg-lab-production-architecture-parity/v1');
assert.equal(parity.environments.lab.domain,'golf-sc-gt-lab.vercel.app');
assert.equal(parity.environments.production.domain,'epg-caddy.vercel.app');
for(const item of ['sameGitTreeForPublishedRelease','sameReleaseJsonMetaBadgeAndServiceWorkerFallback','samePublicEntryPolicy','sameScoreCardWritersAndPersistenceContracts','samePersonalAccessContractWithEnvironmentDeclared','sameLiveDirectoryAndScoresContracts','samePublicDirectoryShareContract','sameOneUseCodeContractForPrivatePersonalEvents','samePwaCacheUpdateContract','sameRoadmapInventoryAndQualityGates']){
  assert.ok(parity.requiredParity.includes(item),`Missing 360 parity item: ${item}`);
}
for(const drift of ['Un ambiente activa acceso con la bandera del otro','Un evento de directorio publico exige cookie privada de otro ambiente','Release visible, release.json, meta HTML o service worker no coinciden','LAB usa base de Produccion sin GSC_LAB_DATABASE_URL aislado']){
  assert.ok(parity.blockingDrift.includes(drift),`Missing blocking drift: ${drift}`);
}
assert.equal((app.match(/name="gscg-release" content="([^"]+)"/)||[])[1],release.release,'HTML meta release must equal release.json');
assert.ok(app.includes(`VERSIÓN ${release.label}`),'Visible badge must equal release label');
assert.ok(serviceWorker.includes(`const RELEASE_FALLBACK="${release.release}"`),'Service Worker fallback must equal release.json');
assert.ok(serviceWorker.includes('fetchPublishedRelease()'),'PWA update must fetch release metadata dynamically');

assert.match(personalAccess,/declared==='production'[\s\S]*GSC_PERSONAL_ACCESS_PRODUCTION_READY/,'Production access must be environment-declared, not guessed');
assert.match(personalAccess,/declared\)[\s\S]*GSC_PERSONAL_ACCESS_LAB_READY/,'LAB access must be environment-declared, not guessed');
assert.match(database,/GSC_LAB_DATABASE_URL/,'LAB must keep isolated database configuration');
assert.match(database,/LAB_DATABASE_ENDPOINT_INVALID/,'LAB must reject unsafe database reuse');
assert.match(liveShareApi,/GSC_LIVE_SHARE_LAB_READY/,'Live Share readiness must remain explicit for LAB');

assert.match(liveHub,/if\(shareEvent\?\.directory\)\{const url=tournamentHubShareUrl/,'Directory Scores sharing must use public Live URL path before private code sharing');
assert.match(liveHub,/shareEvent\.source==='lab'\?'https:\/\/golf-sc-gt-lab\.vercel\.app':'https:\/\/epg-caddy\.vercel\.app'/,'Directory Scores sharing must route to the event owner domain');
assert.ok(liveHub.indexOf('if(shareEvent?.directory){const url=tournamentHubShareUrl')<liveHub.indexOf('root.GSCOneUseLive?.share(kind,eventId,general?.name,shareEvent)'),'Directory sharing must bypass private share-code validation');

console.log('PASS R221 LAB/Production architecture parity: declared environments, isolated data, identical public directory sharing behavior.');
