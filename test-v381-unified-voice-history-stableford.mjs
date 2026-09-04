import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.doesNotMatch(html,/^(<<<<<<<|=======|>>>>>>>)/m);
assert.match(html,/function releaseAiUniversalPlaybackForListening\(\)[\s\S]*?aiUniversalTtsAudio=player/);
assert.match(html,/async function openNewRoundWithAutomaticHistory\(\)[\s\S]*?isRoundComplete\(\)[\s\S]*?officiallyCloseRound/);
assert.match(html,/location\.hostname\.startsWith\("epg-caddy-git-v381-unified-"\)/);
assert.match(html,/async function sendFinalCardsToRegisteredWhatsApp\(\)/);
assert.match(html,/data-stableford-whatsapp-country=/);
assert.match(worker,/v380-three-turn-audio-release/);
assert.match(worker,/v376-stableford-continuity-r1-installed-recovery/);
for(const test of ["test-v376-stableford-continuity-recovery.mjs","test-v380-three-turn-audio-release.mjs","test-v381-unified-voice-history-stableford.mjs"]){
  assert.ok(audit.includes(test),test);
}

console.log("PASS V381 · voz V380 e Historial/Stableford/WhatsApp V376 conviven en una sola rama");
