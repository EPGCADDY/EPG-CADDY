import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const helper=html.slice(html.indexOf("function setAiUniversalAudioSessionType"),html.indexOf("function primeAiUniversalSpeechFromGesture"));
const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
const toggle=html.slice(html.indexOf("async function toggleVoice"),html.indexOf("function fireMicActivation"));
assert.match(helper,/navigator\.audioSession\.type=type/);
assert.match(speech,/setAiUniversalAudioSessionType\("transient-solo"\)/);
assert.match(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalSpeechPrimer=null;[\s\S]*setAiUniversalAudioSessionType\("play-and-record"\)/);
assert.doesNotMatch(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalTtsAudio=null/);
assert.match(toggle,/releaseAiUniversalPlaybackForListening\(\);\s*setAiUniversalAudioSessionType\("play-and-record"\)/);
assert.match(worker,/v385-ios-audio-session/);
console.log("PASS V385 · Safari cambia salida transient-solo a entrada play-and-record antes de cada reconocimiento");
