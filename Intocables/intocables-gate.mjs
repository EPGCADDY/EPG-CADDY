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

assert.equal(rules.logic,"all");
assert.deepEqual(rules.rules.map(rule=>rule.id),["INT-01","INT-02","INT-03","INT-04","INT-05"]);
assert.ok(rules.rules.every(rule=>rule.mandatory===true));
assert.equal(microphoneLock.schema,"gscg-microphone-lock/v1");
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
assert.match(html,/const canonical=readStoredRound\(ACTIVE_ROUND_KEY\)[\s\S]*?if\(isRecoverableStoredRound\(canonical\)&&storedRoundMode\(canonical\)!=="stableford"\)return canonical/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)&&storedRoundMode\(round\)!=="stableford"\)localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
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
assert.match(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1-hd"/);
assert.match(speech,/GATEWAY_VOICE="onyx"/);
assert.doesNotMatch(speech,/openai\/gpt-4o-mini-tts/);
assert.match(html,/function sealBrowserVoiceProgress\([\s\S]*?consumeLiveRoundClosures\(\)/);
assert.match(html,/if\(progressive\.closure\)void speakClosure\(progressive\.closure\)/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=18000/);
assert.match(html,/async function answerBrowserVoiceQuery\(context,clean\)[\s\S]*?browser_fallback_general_in_place[\s\S]*?submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
const voiceInPlace=html.slice(html.indexOf("async function answerBrowserVoiceQuery"),html.indexOf("function scheduleBrowserVoiceTransportRetry"));
assert.doesNotMatch(voiceInPlace,/openAiUniversalPanel|classList\.add\("visible"\)/);

assert.match(audit,/Intocables\/intocables-gate\.mjs/);
assert.match(audit,/test-v366-principal-entry-recovery\.mjs/);
assert.match(audit,/test-v367-universal-voice-in-place\.mjs/);
assert.match(worker,/gscg-mobile-v363-/);
console.log("INTOCABLES PASS INT-01…INT-05 · MICRÓFONO REGISTRO/SCORE/MULTIHOYO SELLADO");
