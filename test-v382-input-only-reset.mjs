import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const gesture=html.slice(html.indexOf("function fireMicActivation"),html.indexOf("function bindMicActivation"));
const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));

assert.doesNotMatch(html,/function resetAiUniversalAudioSessionFromGesture|aiUniversalInputResetRequired/);
assert.match(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalSpeechPrimer=null;aiUniversalSpeechPrimed=true/);
assert.doesNotMatch(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalTtsAudio=null/);
assert.match(gesture,/lastMicGestureAt=now;\s*releaseAiUniversalPlaybackForListening\(\);\s*primeAiUniversalSpeechFromGesture\(\);/);
assert.match(worker,/v382-input-only-reset/);

console.log("PASS V382 RETIRADA · salida Universal descargada al terminar y activación compartida V378 intacta");
