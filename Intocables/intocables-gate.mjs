import assert from "node:assert/strict";
import fs from "node:fs";
import {createHash} from "node:crypto";

const html=fs.readFileSync(new URL("../index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("../service-worker.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("../api/voice-speech.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("../audit-project.mjs",import.meta.url),"utf8");
const capture=fs.readFileSync(new URL("../server-voice-capture.js",import.meta.url),"utf8");
const artifacts=fs.readFileSync(new URL("../card-artifacts.js",import.meta.url),"utf8");
const stablefordStandalone=fs.readFileSync(new URL("../stableford-torneo.html",import.meta.url),"utf8");
const liveView=fs.readFileSync(new URL("../live-view.js",import.meta.url),"utf8");
const individualCard=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
const rules=JSON.parse(fs.readFileSync(new URL("./REGLAS_INTOCABLES.json",import.meta.url),"utf8"));
const physicalApproval=JSON.parse(fs.readFileSync(new URL("./APROBACION_FISICA_REGISTRO_SCORES_V378.json",import.meta.url),"utf8"));
const integratedLock=JSON.parse(fs.readFileSync(new URL("./BASE_TECNICA_INTEGRADA_V391.json",import.meta.url),"utf8"));
const writtenConfirmation=fs.readFileSync(new URL("./CONFIRMACION_ESCRITA_V378.md",import.meta.url),"utf8");

assert.equal(rules.logic,"all");
assert.deepEqual(rules.rules.map(rule=>rule.id),["INT-01","INT-02","INT-03","INT-04","INT-05","INT-06","INT-07","INT-08","INT-09","INT-10","INT-11","INT-12","INT-13","INT-14","INT-15"]);
assert.ok(rules.rules.every(rule=>rule.mandatory===true));
assert.equal(physicalApproval.approvedVersion,"V378");
assert.equal(physicalApproval.schema,"gscg-physical-approval-lock/v3");
assert.equal(physicalApproval.scopes.length,7);
assert.equal(physicalApproval.approvedBy,"Jaime Kirste");
assert.equal(physicalApproval.policy.status,"INTOCABLE_REGISTRO_Y_SCORES");
assert.equal(physicalApproval.policy.changeWithoutNewExplicitOwnerOrder,"PROHIBITED");
assert.equal(physicalApproval.policy.failureEffect,"BLOCK_AUDIT_PREVIEW_AND_PRODUCTION");
for(const text of ["Registro de Jugadores por micrófono","Registro de Scores por micrófono","Voz aprobada en V378 y su velocidad exacta `0.90`","Historial de tarjetas oficiales","JAIME, FITO, CALIX y BRUNI","una ronda activa con scores se conserva","una ronda configurada sin ningún score se descarta","22 segundos de Comunicación Universal está rechazado","sin una nueva orden expresa de Jaime Kirste"])assert.ok(writtenConfirmation.includes(text),`Falta confirmación escrita: ${text}`);
for(const scope of physicalApproval.scopes){
  const start=html.indexOf(scope.start),end=html.indexOf(scope.end,start);
  assert.ok(start>=0&&end>start,`INT-05/06/07 no pudo localizar ${scope.id}`);
  const actual=createHash("sha256").update(html.slice(start,end)).digest("hex");
  assert.equal(actual,scope.sha256,`INTOCABLE V378 modificado: ${scope.id}`);
}
for(const approved of physicalApproval.approvedFiles||[]){
  const actual=createHash("sha256").update(fs.readFileSync(new URL(`../${approved.path}`,import.meta.url))).digest("hex");
  assert.equal(actual,approved.sha256,`INTOCABLE V378 modificado: ${approved.id}`);
}
assert.equal(integratedLock.schema,"gscg-integrated-baseline-lock/v1");
assert.equal(integratedLock.version,"V391");
assert.equal(integratedLock.policy.changeWithoutNewExplicitOwnerOrder,"PROHIBITED");
for(const approved of integratedLock.files){
  const actual=createHash("sha256").update(fs.readFileSync(new URL(`../${approved.path}`,import.meta.url))).digest("hex");
  assert.equal(actual,approved.sha256,`BASE V391 modificada: ${approved.id}`);
}
for(const scope of integratedLock.scopes){
  const start=html.indexOf(scope.start),end=html.indexOf(scope.end,start);
  assert.ok(start>=0&&end>start,`INT-09/10/11 no pudo localizar ${scope.id}`);
  assert.equal(createHash("sha256").update(html.slice(start,end)).digest("hex"),scope.sha256,`BASE V391 modificada: ${scope.id}`);
}
const activationScope=physicalApproval.scopes.find(scope=>scope.id==="activacion_compartida");
assert.ok(activationScope,"Falta el blindaje de la activación compartida");
const activation=html.slice(html.indexOf(activationScope.start),html.indexOf(activationScope.end,html.indexOf(activationScope.start)));
for(const fragment of ["releaseAiUniversalPlaybackForListening();","primeAiUniversalSpeechFromGesture();","setMicConnecting(context,true);","toggleVoice(context);"])assert.ok(activation.includes(fragment),`Activación compartida incompleta: ${fragment}`);
assert.ok(activation.indexOf("releaseAiUniversalPlaybackForListening();")<activation.indexOf("toggleVoice(context);"),"La entrada debe abrir después de liberar la salida");
assert.doesNotMatch(activation,/await|\.then\(|resetAiUniversalAudioSessionFromGesture|aiUniversalInputResetRequired/);
for(const [name,value] of Object.entries(physicalApproval.approvedCaptureParameters))assert.match(html,new RegExp(`const ${name}=${String(value).replace(".","\\.")};`),`INTOCABLE V378 modificado: ${name}`);

assert.match(html,/const ACTIVE_ROUND_KEY="golf-score-card-guatemala-active-round-v1"/);
assert.match(html,/function isRecoverableStoredRound\(value,modeHint=null\)[\s\S]*?value\.players\.length>=1&&value\.players\.length<=6/);
assert.match(html,/const canonical=readStoredRound\(ACTIVE_ROUND_KEY\)[\s\S]*?if\(isRecoverableStoredRound\(canonical\)\)return canonical/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)\)localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ACTIVE_ROUND_KEY\)/);
assert.match(html,/ÚNICO punto autorizado para sustituir la última ronda persistida por una nueva:[\s\S]*?INICIAR RONDA/);
assert.match(html,/function ensurePrincipalEntry\(\)[\s\S]*?isRecoverableStoredRound\(round\)[\s\S]*?openNewRoundDraft\(\)[\s\S]*?classList\.add\("visible"\)/);
for(const event of ["visibilitychange","pageshow","focus"]){
  const start=html.indexOf(`addEventListener("${event}"`);
  assert.ok(start>0&&html.slice(start,start+1500).includes("ensurePrincipalEntry();"),`${event} debe imponer Inicio sin ronda operativa`);
}

assert.match(html,/function teamMatchSegmentReport\(title,holes\)[\s\S]*?fourBallSegment\(index,holes\)\.position[\s\S]*?matchPlaySegment\(index,holes\)\.position/);
assert.match(html,/return status\?`\$\{player\.name\}, \$\{status\}`:""/);
assert.match(html,/if\(!isTeamMatchRound\(\)\)return baseClosureSpeechIfDue\(\)/);
assert.match(html,/segmentSpeech\("Primera vuelta\.",FRONT\)/);
assert.equal(`Primera vuelta. ${["JAIME, 7 arriba","GUSTAVO, 7 abajo"].join(". ")}.`,"Primera vuelta. JAIME, 7 arriba. GUSTAVO, 7 abajo.");

assert.match(speech,/model:"gpt-4o-mini-tts"/);
assert.match(speech,/GATEWAY_SPEECH_MODEL="fish-audio\/s2\.1-pro-free"/);
assert.match(speech,/GATEWAY_VOICE="s2\.1-es-419"/);
assert.match(speech,/language:"es-419"/);
assert.match(speech,/nunca uses acento anglosajón, Spanglish/);
assert.doesNotMatch(speech,/openai\/tts-1-hd|GATEWAY_VOICE="echo"/);
assert.doesNotMatch(speech,/openai\/gpt-4o-mini-tts/);
assert.match(html,/function sealBrowserVoiceProgress\([\s\S]*?consumeLiveRoundClosures\(\)/);
assert.match(html,/if\(progressive\.closure\)void speakClosure\(progressive\.closure\)/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=8000/);
assert.match(html,/async function answerBrowserVoiceQuery\(context,clean\)[\s\S]*?browser_fallback_general_in_place[\s\S]*?submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
const voiceInPlace=html.slice(html.indexOf("async function answerBrowserVoiceQuery"),html.indexOf("function scheduleBrowserVoiceTransportRetry"));
assert.doesNotMatch(voiceInPlace,/openAiUniversalPanel|classList\.add\("visible"\)/);

assert.match(audit,/Intocables\/intocables-gate\.mjs/);
assert.match(audit,/test-v366-principal-entry-recovery\.mjs/);
assert.match(audit,/test-v367-universal-voice-in-place\.mjs/);
assert.match(audit,/test-v392-universal-mediarecorder\.mjs/);
assert.match(audit,/test-v392-all-scorecards-in-first\.mjs/);
assert.match(audit,/test-v393-manual-hole-start\.mjs/);
assert.match(audit,/test-v393-universal-response-continuity\.mjs/);
assert.match(capture,/SETUP_SPEECH_THRESHOLD=\.009,ROUND_SPEECH_THRESHOLD=\.0045,UNIVERSAL_SPEECH_THRESHOLD=SETUP_SPEECH_THRESHOLD/);
assert.match(capture,/requestUniversalOnly&&typeof MediaRecorder==="function"/);
assert.match(capture,/recorder\.start\(\)/);
assert.doesNotMatch(capture,/recorder\.requestData/);
assert.doesNotMatch(capture,/UNIVERSAL_RECORDER_MS|setTimeout\(\(\)=>stop\(true\),6000\)/);
assert.match(capture,/MAX_CAPTURE_MS=30000/);
assert.match(html,/<th class="sum-col">IN<\/th>\$\{BACK\.map[\s\S]*?<th class="sum-col">OUT<\/th>/);
assert.match(html,/<th>GROSS IN<\/th><th>GROSS OUT<\/th>/);
assert.match(artifacts,/IN_HOLES\.map[\s\S]*?<th>IN<\/th>\$\{OUT_HOLES\.map[\s\S]*?<th>OUT<\/th>/);
assert.match(stablefordStandalone,/<th class="sum">IN<\/th>'\+backCells[\s\S]*?<th class="sum">OUT<\/th>/);
assert.match(liveView,/inside\.map[\s\S]*?<th>IN<\/th>\$\{out\.map[\s\S]*?<th>OUT<\/th>/);
assert.match(individualCard,/renderNineScorecard\(FRONT[\s\S]*?,"IN"\);renderNineScorecard\(BACK[\s\S]*?,"OUT"\)/);
assert.match(worker,/gscg-mobile-v363-/);
assert.match(worker,/v393-manual-hole-universal-response/);
assert.match(worker,/v394-ios-recorder-final-blob/);
assert.match(worker,/v395-no-fixed-six-second-cutoff/);
assert.match(html,/function syncRoundManualHole\(manual,maxHole=18\)/);
console.log("INTOCABLES PASS INT-01…INT-15 · base V391, tarjetas V392 y cierre iOS V395 sellados");
