import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const speechApi=fs.readFileSync("api/voice-speech.js","utf8");
const approval=JSON.parse(fs.readFileSync("Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json","utf8"));
const confirmation=fs.readFileSync("Intocables/CONFIRMACION_ESCRITA_V378.md","utf8");

const chunking=html.slice(html.indexOf("function approvedVoiceChunks"),html.indexOf("function stopAiUniversalOutput"));
assert.match(chunking,/chunks\.length\?240:80/);
assert.match(chunking,/chunks\.length\?100:25/);
assert.match(chunking,/const pending=new Map\(\),prefetch=3/);
assert.match(chunking,/fetchApprovedVoiceAudio\(chunks\[index\]\)/);
assert.match(chunking,/for\(let index=0;index<Math\.min\(prefetch,chunks\.length\);index\+\+\)prepare\(index\)/);
assert.match(chunking,/const prepared=await prepare\(index\);if\(prepared\.error\)throw prepared\.error;prepare\(index\+prefetch\)/);
assert.match(chunking,/reportVoiceHealth\("browser_fallback_speech_started",\{elapsedMs:/);
assert.match(html,/if\(Number\.isFinite\(Number\(detail\?\.elapsedMs\)\)\)payload\.elapsedMs=/);
assert.doesNotMatch(chunking,/speakAiUniversalMaleBrowserFallback/);
assert.match(speechApi,/characters:text\.length,elapsedMs:Date\.now\(\)-speechStartedAt/);
assert.match(worker,/v379-fast-chunked-r7-speech/);

assert.equal(approval.policy.status,"INTOCABLE_REGISTRO_Y_SCORES");
assert.match(approval.evidence.timer,/22 segundos.*rechazada/);
assert.equal(approval.scopes.length,6);
assert.match(confirmation,/Registro de Jugadores por micrófono/);
assert.match(confirmation,/Registro de Scores por micrófono, tanto individual como múltiple/);
assert.match(confirmation,/22 segundos de Comunicación Universal está rechazado/);

console.log("PASS V379 · Registro/Scores V378 sellados y Comunicación Universal inicia TTS R7 por bloques prefetched");
