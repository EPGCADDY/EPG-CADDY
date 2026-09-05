import assert from "node:assert/strict";
import fs from "node:fs";
import {createHash} from "node:crypto";

const html=fs.readFileSync("index-grupal.html","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const health=fs.readFileSync("api/voice-health.js","utf8");
const lock=JSON.parse(fs.readFileSync("Intocables/BASE_TECNICA_INTEGRADA_V391.json","utf8"));
assert.equal(lock.schema,"gscg-integrated-baseline-lock/v1");
assert.equal(lock.version,"V391");
assert.equal(lock.policy.changeWithoutNewExplicitOwnerOrder,"PROHIBITED");
for(const file of lock.files){
  const actual=createHash("sha256").update(fs.readFileSync(file.path)).digest("hex");
  assert.equal(actual,file.sha256,`BASE V391 modificada: ${file.id}`);
}
for(const scope of lock.scopes){
  const start=html.indexOf(scope.start),end=html.indexOf(scope.end,start);
  assert.ok(start>=0&&end>start,`No se localizó el alcance V391: ${scope.id}`);
  assert.equal(createHash("sha256").update(html.slice(start,end)).digest("hex"),scope.sha256,`BASE V391 modificada: ${scope.id}`);
}
assert.match(html,/function isRecoverableStoredRound[\s\S]*?storedRoundHasAnyScore\(value\)/);
assert.match(html,/function archiveRoundSnapshot\(value\)\{if\(!storedRoundIsComplete\(value\)\)return false/);
assert.match(html,/function recoverStablefordRoundSeptember4[\s\S]*?closeSync\(recovered[\s\S]*?archiveRoundSnapshot\(result\.round\)/);
assert.doesNotMatch(html.slice(html.indexOf("function recoverStablefordRoundSeptember4"),html.indexOf("function matrixFor")),/location\.hostname|\.then\(/);
assert.match(html,/async function openFinalDigitalCard[\s\S]*?officiallyCloseRound[\s\S]*?sendFinalCardsToRegisteredWhatsApp[\s\S]*?if\(!delivery\.ok\)return false[\s\S]*?blinkDigitalCardSentSuccess[\s\S]*?clearActiveRoundAfterDelivery/);
assert.match(html,/function clearActiveRoundAfterDelivery[\s\S]*?archiveRoundSnapshot\(round\)[\s\S]*?DELIVERED_ROUND_CLEAR_KEY/);
assert.match(worker,/v391-integrated-technical-lock/);
assert.match(audit,/test-v391-integrated-technical-lock\.mjs/);
for(const event of ["server_capture_started","server_capture_transcript_ready","server_capture_failed"])assert.match(health,new RegExp(event),`telemetría faltante: ${event}`);
assert.match(html,/if\(universalOnly&&code==="NO_SPEECH"&&universalServerCaptureRetryCount<1\)[\s\S]*?startServerVoiceCapture\(context,\{universalOnly:true\}\)/);
assert.match(html,/if\(aiUniversalDirectCaptureAfterSpeech&&serverVoiceCapturePreferred\(\)\)[\s\S]*?await new Promise\(resolve=>setTimeout\(resolve,250\)\)[\s\S]*?startServerVoiceCapture\(context,\{universalOnly:true\}\)/);
console.log("PASS V391 · Historial, Tarjeta Digital/WhatsApp y voz V378 0.90 sellados técnicamente");
