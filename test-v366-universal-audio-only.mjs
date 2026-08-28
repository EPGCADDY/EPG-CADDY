import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-universal-audio-only" content="V366-NO-SCREEN-CHANGE-AUDIBLE-COMPLETION-20260828"/);
const start=html.indexOf("function openAiUniversalAndListen(event)");
const end=html.indexOf('\nif(window.PointerEvent)',start);
const launch=html.slice(start,end);
assert.ok(start>0&&end>start);
assert.doesNotMatch(launch,/openAiUniversalPanel\(/);
assert.match(launch,/primeAiUniversalSpeechFromGesture\(\)/);
assert.match(launch,/startAiUniversalListening\(\)/);

const answerStart=html.indexOf("async function answerBrowserVoiceQuery(context,clean)");
const answerEnd=html.indexOf("\nfunction scheduleBrowserVoiceTransportRetry",answerStart);
const answer=html.slice(answerStart,answerEnd);
assert.doesNotMatch(answer,/openAiUniversalPanel\(/);
assert.doesNotMatch(answer,/browser_fallback_general_visible/);
assert.match(answer,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.match(answer,/setPrimaryVoiceMatrix\("idle",context,"LISTO"\)/);
assert.match(worker,/v365-iphone-playback-v366-universal-audio-only/);

console.log("PASS V366 · AI UNIVERSAL responde audible sin cambiar pantalla y vuelve a LISTO");
