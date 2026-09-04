import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const reset=html.slice(html.indexOf("function resetAiUniversalAudioSessionFromGesture"),html.indexOf("function preferredMaleBrowserVoice"));
const gesture=html.slice(html.indexOf("function fireMicActivation"),html.indexOf("function bindMicActivation"));
const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));

assert.match(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalInputResetRequired=true/);
assert.match(reset,/previous\.removeAttribute\("src"\);previous\.load\?\.\(\)/);
assert.match(reset,/aiUniversalTtsAudio=null;aiUniversalSpeechPrimer=null/);
assert.doesNotMatch(reset,/primer\.onplay|new Audio|\.play\(\)/);
assert.match(reset,/reset_ready[^}]*resolve\(true\)[^}]*\},300\)/);
assert.match(gesture,/if\(aiUniversalInputResetRequired\)\{setMicConnecting\(context,true\);void resetAiUniversalAudioSessionFromGesture\(\)\.then\(\(\)=>toggleVoice\(context\)\);return true\}/);
assert.ok(gesture.indexOf("resetAiUniversalAudioSessionFromGesture()")<gesture.indexOf("toggleVoice(context)"));
assert.match(worker,/v381-serial-audio-input-reset/);

console.log("PASS V381 RETIRADA · el cebado silencioso rechazado ya no puede reaparecer entre preguntas");
