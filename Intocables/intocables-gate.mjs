import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("../index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("../service-worker.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("../api/voice-speech.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("../audit-project.mjs",import.meta.url),"utf8");
const rules=JSON.parse(fs.readFileSync(new URL("./REGLAS_INTOCABLES.json",import.meta.url),"utf8"));

assert.equal(rules.logic,"all");
assert.deepEqual(rules.rules.map(rule=>rule.id),["INT-01","INT-02","INT-03","INT-04"]);
assert.ok(rules.rules.every(rule=>rule.mandatory===true));

assert.match(html,/const ACTIVE_ROUND_KEY="golf-score-card-guatemala-active-round-v1"/);
assert.match(html,/const canonical=readStoredRound\(ACTIVE_ROUND_KEY\)[\s\S]*?if\(canonical\?\.configured&&canonical\.mode!=="stableford"&&canonical\.players\?\.length\)return canonical/);
assert.match(html,/if\(round\.configured&&round\.mode!=="stableford"&&round\.players\?\.length\)localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ACTIVE_ROUND_KEY\)/);
assert.match(html,/ÚNICO punto autorizado para sustituir la última ronda persistida por una nueva:[\s\S]*?INICIAR RONDA/);

assert.match(html,/function teamMatchSegmentReport\(title,holes\)[\s\S]*?fourBallSegment\(index,holes\)\.position[\s\S]*?matchPlaySegment\(index,holes\)\.position/);
assert.match(html,/return status\?`\$\{player\.name\}, \$\{status\}`:""/);
assert.match(html,/if\(!isTeamMatchRound\(\)\)return baseClosureSpeechIfDue\(\)/);
assert.match(html,/segmentSpeech\("Primera vuelta\.",FRONT\)/);
assert.equal(`Primera vuelta. ${["JAIME, 7 arriba","GUSTAVO, 7 abajo"].join(". ")}.`,"Primera vuelta. JAIME, 7 arriba. GUSTAVO, 7 abajo.");

assert.match(speech,/model:"gpt-4o-mini-tts"/);
assert.match(speech,/DIRECT_FALLBACK_MODEL="tts-1"/);
assert.match(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1"/);
assert.match(speech,/GATEWAY_VOICE="onyx"/);
assert.doesNotMatch(speech,/openai\/gpt-4o-mini-tts/);
assert.match(html,/function sealBrowserVoiceProgress\([\s\S]*?consumeLiveRoundClosures\(\)/);
assert.match(html,/if\(progressive\.closure\)void speakClosure\(progressive\.closure\)/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=18000/);

assert.match(audit,/Intocables\/intocables-gate\.mjs/);
assert.match(worker,/gscg-mobile-v363-/);
console.log("INTOCABLES PASS INT-01…INT-04");
