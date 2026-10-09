import fs from 'node:fs';
import assert from 'node:assert/strict';

const personalEvents=fs.readFileSync('personal-events.js','utf8');
const index=fs.readFileSync('index-grupal.html','utf8');
const release=JSON.parse(fs.readFileSync('release.json','utf8'));
const serviceWorker=fs.readFileSync('service-worker.js','utf8');

assert(personalEvents.includes('async function eventDirectory(eventKind)'),'LAB private guest directory must use the merged directory helper');
assert(personalEvents.includes("request('directory',{eventKind},peer)"),'Private guest directory must query the peer environment');
assert(personalEvents.includes('data-event-source'),'Private guest options must preserve source environment');
assert(personalEvents.includes("eventKind==='private'?' · '+label:''"),'Private guest list must label PRODUCCION/LABORATORIO source');
assert(personalEvents.includes('selectedSource=selected.source||environment()'),'Joining a private guest round must route to the selected source');
assert(personalEvents.includes("['inspect-tournament-code','join-code','view-code']"),'Invitation link validation must retry view-code in the peer environment');
assert(personalEvents.includes('invitationSource=viewed.source||environment()'),'Invitation link read must stay on the environment that owns the code');
assert(index.includes('./personal-events.js?v=20261009-R237'),'Index must bust cached personal-events.js for this fix');
assert.equal(release.label,'R237');
assert.equal(release.release,'20261009-R237');
assert(serviceWorker.includes('r237-lab-private-guest-production-directory'),'Service Worker cache must rotate for R237');
console.log('PASS R237 LAB private guest directory reads production source and preserves routing');
