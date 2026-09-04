import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const reset=html.slice(html.indexOf("function resetAiUniversalAudioSessionFromGesture"),html.indexOf("function preferredMaleBrowserVoice"));
const gesture=html.slice(html.indexOf("function fireMicActivation"),html.indexOf("function bindMicActivation"));

assert.match(reset,/previous\.pause\(\);previous\.currentTime=0/);
assert.match(reset,/aiUniversalTtsAudio=null;aiUniversalSpeechPrimer=null/);
assert.match(reset,/setTimeout\(\(\)=>\{/);
assert.match(reset,/browser_fallback_audio_session_reset_ready/);
assert.match(reset,/resolve\(true\)\},300\)/);
assert.doesNotMatch(reset,/new Audio|\.play\(\)|data:audio\/wav|primer/);
assert.ok(gesture.indexOf("resetAiUniversalAudioSessionFromGesture()")<gesture.indexOf("toggleVoice(context)"));
assert.match(worker,/v382-input-only-reset/);

console.log("PASS V382 · entre respuestas se destruye salida y se abre sólo entrada, sin audio silencioso sobre SpeechRecognition");
