import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const gesture=html.slice(html.indexOf("function fireMicActivation"),html.indexOf("function bindMicActivation"));
const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));

assert.match(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalSpeechPrimer=null;aiUniversalSpeechPrimed=true/);
assert.doesNotMatch(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalTtsAudio=null/);
assert.doesNotMatch(html,/function resetAiUniversalAudioSessionFromGesture|aiUniversalInputResetRequired/);
assert.match(gesture,/releaseAiUniversalPlaybackForListening\(\);\s*primeAiUniversalSpeechFromGesture\(\);\s*setMicConnecting\(context,true\);\s*toggleVoice\(context\)/);
assert.match(worker,/v381-serial-audio-input-reset/);

console.log("PASS V381 RETIRADA · activación V378 intacta y reproductor Universal descargado pero conservado");
