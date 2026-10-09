import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V367-UNIVERSAL-VOICE-IN-PLACE-20260828/);
assert.match(worker,/v367-universal-voice-in-place/);

const answerStart=html.indexOf("async function answerBrowserVoiceQuery");
const answerEnd=html.indexOf("\nfunction scheduleBrowserVoiceTransportRetry",answerStart);
const answer=html.slice(answerStart,answerEnd);
assert.ok(answerStart>0&&answerEnd>answerStart);
assert.doesNotMatch(answer,/openAiUniversalPanel|classList\.add\("visible"\)/);
assert.match(answer,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.match(answer,/browser_fallback_general_in_place/);

const oneTouchStart=html.indexOf("let lastAiUniversalGestureAt=0");
const oneTouchEnd=html.indexOf('\n$("openGolfRules")',oneTouchStart);
const oneTouch=html.slice(oneTouchStart,oneTouchEnd);
assert.ok(oneTouchStart>0&&oneTouchEnd>oneTouchStart);
assert.doesNotMatch(oneTouch,/openAiUniversalPanel|classList\.add\("visible"\)/);
assert.ok(oneTouch.indexOf("primeAiUniversalSpeechFromGesture()")<oneTouch.indexOf("startAiUniversalListening()"));

const listeningStart=html.indexOf("async function startAiUniversalListening");
const listeningEnd=html.indexOf("\nfunction aiUniversalLooksLikeSetupOrder",listeningStart);
const listening=html.slice(listeningStart,listeningEnd);
assert.match(listening,/setupVisible\|\|!round\.configured\?"setup":"round"/);

const event=sanitizeVoiceHealth({event:"browser_fallback_general_in_place",context:"setup",transcript:"PROHIBIDO"});
assert.equal(event.event,"browser_fallback_general_in_place");
assert.equal(event.context,"setup");
assert.equal("transcript" in event,false);

console.log("PASS V367 · comunicación universal audible en Inicio, Registro y tarjeta sin cambiar de pantalla");
