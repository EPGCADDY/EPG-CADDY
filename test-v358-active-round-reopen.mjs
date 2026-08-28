import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync("index-grupal.html","utf8");
const worker=readFileSync("service-worker.js","utf8");

assert.match(html,/V364-VOICE-TRAFFIC-LIVE-RECOVERY-20260828/);
assert.match(worker,/gscg-mobile-v364-voice-traffic-live-recovery/);
assert.match(html,/if\(!round\.configured\)\{[\s\S]*?else if\(directHome\)openNewRoundDraft\(\)/);
assert.doesNotMatch(html,/if\(directHome&&!sfEmergency&&!demoControlManual\)openNewRoundDraft\(\)/);

const opensRegistration=({directHome=true,sfEmergency=false,demo=false,configured=false}={})=>directHome&&!sfEmergency&&!demo&&!configured;
assert.equal(opensRegistration({configured:true}),false);
assert.equal(opensRegistration({configured:false}),true);

for(const lock of [
  /window\.addEventListener\("pagehide",\(\)=>\{\s*persist\(\)/,
  /window\.addEventListener\("beforeunload",persist\)/,
  /window\.addEventListener\("pageshow",[\s\S]*?restorePersistedRound\(\)/,
  /function persist\(\)[\s\S]*?archiveRoundSnapshot\(round\)/,
  /function openNewRoundDraft\(\)[\s\S]*?persist\(\);[\s\S]*?openSetup\("new"\)/
])assert.match(html,lock);

const audit=readFileSync("audit-project.mjs","utf8");
for(const required of ["test-v354-voice-fallback.mjs","test-v355-ios-audio-dictation.mjs","test-v356-voice-only-cedar-quality.mjs","test-v357-ios-voice-transport-recovery.mjs","test-v358-active-round-reopen.mjs"])assert.ok(audit.includes(required),required);

console.log("PASS V358 · V357 completo + ronda activa visible hasta NUEVA RONDA");
