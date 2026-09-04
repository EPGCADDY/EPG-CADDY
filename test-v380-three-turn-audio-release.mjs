import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const release=html.slice(html.indexOf("function releaseAiUniversalPlaybackForListening"),html.indexOf("function resetAiUniversalAudioSessionFromGesture"));
const prime=html.slice(html.indexOf("function primeAiUniversalSpeechFromGesture"),html.indexOf("function releaseAiUniversalPlaybackForListening"));
const gesture=html.slice(html.indexOf("function fireMicActivation"),html.indexOf("function bindMicActivation"));

assert.match(release,/player\.pause\(\);player\.currentTime=0/);
assert.match(release,/player\.removeAttribute\("src"\);player\.load\?\.\(\)/);
assert.match(release,/aiUniversalTtsObjectUrl="";aiUniversalTtsAudio=player/);
assert.doesNotMatch(release,/aiUniversalTtsAudio=null/);
assert.match(prime,/typeof Audio==="function"&&!aiUniversalTtsAudio/);
assert.ok(gesture.indexOf("releaseAiUniversalPlaybackForListening()")<gesture.indexOf("primeAiUniversalSpeechFromGesture()"));
assert.match(worker,/v380-three-turn-audio-release/);

console.log("PASS V380 · audio R7 queda descargado pero autorizado; turnos 2 y 3 no reabren un primer silencioso sobre el micrófono");
