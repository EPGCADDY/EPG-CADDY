import assert from "node:assert/strict";
import fs from "node:fs";
import {createHash} from "node:crypto";

const html=fs.readFileSync(new URL("../index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("../service-worker.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("../api/voice-speech.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("../audit-project.mjs",import.meta.url),"utf8");
const rules=JSON.parse(fs.readFileSync(new URL("./REGLAS_INTOCABLES.json",import.meta.url),"utf8"));
const physicalApproval=JSON.parse(fs.readFileSync(new URL("./APROBACION_FISICA_REGISTRO_SCORES_V378.json",import.meta.url),"utf8"));
const writtenConfirmation=fs.readFileSync(new URL("./CONFIRMACION_ESCRITA_V378.md",import.meta.url),"utf8");

assert.equal(rules.logic,"all");
assert.deepEqual(rules.rules.map(rule=>rule.id),["INT-01","INT-02","INT-03","INT-04","INT-05","INT-06","INT-07","INT-08"]);
assert.ok(rules.rules.every(rule=>rule.mandatory===true));
assert.equal(physicalApproval.approvedVersion,"V378");
assert.equal(physicalApproval.schema,"gscg-physical-approval-lock/v3");
assert.equal(physicalApproval.scopes.length,7);
assert.equal(physicalApproval.approvedBy,"Jaime Kirste");
assert.equal(physicalApproval.policy.status,"INTOCABLE_REGISTRO_Y_SCORES");
assert.equal(physicalApproval.policy.changeWithoutNewExplicitOwnerOrder,"PROHIBITED");
assert.equal(physicalApproval.policy.failureEffect,"BLOCK_AUDIT_PREVIEW_AND_PRODUCTION");
for(const text of ["Registro de Jugadores por micrófono","Registro de Scores por micrófono","22 segundos de Comunicación Universal está rechazado","sin una nueva orden expresa de Jaime Kirste"])assert.ok(writtenConfirmation.includes(text),`Falta confirmación escrita: ${text}`);
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
assert.match(worker,/gscg-mobile-v363-/);
console.log("INTOCABLES PASS INT-01…INT-08 · 7 regiones de Registro/Scores y voz/velocidad V378 selladas por SHA-256");
