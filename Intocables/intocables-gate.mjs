import assert from "node:assert/strict";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const html=fs.readFileSync(new URL("../index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("../service-worker.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("../api/voice-speech.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("../audit-project.mjs",import.meta.url),"utf8");
const rules=JSON.parse(fs.readFileSync(new URL("./REGLAS_INTOCABLES.json",import.meta.url),"utf8"));
const microphoneLock=JSON.parse(fs.readFileSync(new URL("./MICROFONO_APROBADO.lock.json",import.meta.url),"utf8"));
const physicalApproval=JSON.parse(fs.readFileSync(new URL("./APROBACION_FISICA_REGISTRO_SCORES_V378.json",import.meta.url),"utf8"));
const writtenConfirmation=fs.readFileSync(new URL("./CONFIRMACION_ESCRITA_V378.md",import.meta.url),"utf8");

assert.equal(rules.logic,"all");
assert.deepEqual(rules.rules.map(rule=>rule.id),["INT-01","INT-02","INT-03","INT-04","INT-05"]);
assert.ok(rules.rules.every(rule=>rule.mandatory===true));
assert.equal(microphoneLock.schema,"gscg-microphone-lock/v1");
assert.equal(physicalApproval.approvedVersion,"V378");
assert.equal(physicalApproval.approvedBy,"Jaime Kirste");
assert.equal(physicalApproval.policy.status,"INTOCABLE_REGISTRO_Y_SCORES");
for(const text of ["Registro de Jugadores por micrófono","Registro de Scores por micrófono","22 segundos de Comunicación Universal está rechazado","sin una nueva orden expresa de Jaime Kirste"])assert.ok(writtenConfirmation.includes(text),`Falta confirmación escrita V378: ${text}`);
for(const scope of physicalApproval.scopes){
  const start=html.indexOf(scope.start),end=html.indexOf(scope.end,start);
  assert.ok(start>=0&&end>start,`No se localizó región V378: ${scope.id}`);
  assert.equal(crypto.createHash("sha256").update(html.slice(start,end)).digest("hex"),scope.sha256,`INTOCABLE V378 modificado: ${scope.id}`);
}
for(const approved of physicalApproval.approvedFiles){
  const bytes=fs.readFileSync(new URL(`../${approved.path}`,import.meta.url));
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"),approved.sha256,`INTOCABLE V378 modificado: ${approved.id}`);
}
for(const [file,expected] of Object.entries(microphoneLock.sha256)){
  const bytes=fs.readFileSync(new URL(`../${file}`,import.meta.url)),actual=crypto.createHash("sha256").update(bytes).digest("hex");
  assert.equal(actual,expected,`MICRÓFONO INTOCABLE: cambió ${file}`);
}
for(const test of microphoneLock.tests){
  assert.match(audit,new RegExp(test.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),`auditoría debe conservar ${test}`);
  const result=spawnSync(process.execPath,[test],{cwd:new URL("..",import.meta.url),encoding:"utf8"});
  assert.equal(result.status,0,`MICRÓFONO INTOCABLE FAIL ${test}\n${result.stdout||""}${result.stderr||""}`);
}

assert.match(html,/const ACTIVE_ROUND_KEY="golf-score-card-guatemala-active-round-v1"/);
assert.match(html,/function isRecoverableStoredRound\(value,modeHint=null\)[\s\S]*?value\.players\.length>=1&&value\.players\.length<=6/);
assert.match(html,/const canonical=readStoredRound\(ACTIVE_ROUND_KEY\)[\s\S]*?if\(isRecoverableStoredRound\(canonical\)\)return canonical/);
assert.doesNotMatch(html,/storedRoundMode\(canonical\)!=="stableford"/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)\)\{localStorage\.removeItem\(PRINCIPAL_RESET_KEY\);localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)\}/);
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
assert.match(speech,/const SPEED=\.9/);
assert.match(speech,/language:"es-419"/);
assert.match(speech,/Nunca uses acento de España, acento anglosajón, Spanglish/);
assert.match(speech,/sin ceceo español/);
assert.doesNotMatch(speech,/openai\/tts-1-hd|const GATEWAY_VOICE="onyx"/);
assert.doesNotMatch(speech,/openai\/gpt-4o-mini-tts/);
assert.match(html,/function sealBrowserVoiceProgress\([\s\S]*?consumeLiveRoundClosures\(\)/);
assert.match(html,/if\(progressive\.closure\)void speakClosure\(progressive\.closure\)/);
assert.match(html,/BROWSER_VOICE_SILENCE_MS=1200/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=8000/);
assert.match(html,/async function answerBrowserVoiceQuery\(context,clean\)[\s\S]*?browser_fallback_general_realtime_handoff[\s\S]*?await ensureSession\(\)[\s\S]*?setRealtimeTurnProfile\(REALTIME_TURN_PROFILE_CONVERSATION\)[\s\S]*?speakConversation\(clean\)/);
const voiceInPlace=html.slice(html.indexOf("async function answerBrowserVoiceQuery"),html.indexOf("function scheduleBrowserVoiceTransportRetry"));
assert.doesNotMatch(voiceInPlace,/openAiUniversalPanel|classList\.add\("visible"\)/);

assert.match(audit,/Intocables\/intocables-gate\.mjs/);
assert.match(audit,/test-v366-principal-entry-recovery\.mjs/);
assert.match(audit,/test-v367-universal-voice-in-place\.mjs/);
assert.match(worker,/gscg-mobile-v363-/);
console.log("INTOCABLES PASS INT-01…INT-05 · REGISTRO/SCORE/MULTIHOYO Y VOZ V378 SELLADOS");
