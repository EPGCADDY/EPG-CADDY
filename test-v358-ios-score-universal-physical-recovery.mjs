import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-build" content="V363-RECORDED-MOBILE-BEHAVIOR-20260828"/);
assert.match(html,/gscg-ios-voice-recovery" content="V363-STOP-GUARD-NO-STUCK-LISTENING-20260828"/);
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior/);
assert.match(html,/build:"V363"/);

const oneTouchStart=html.indexOf("let lastAiUniversalGestureAt=0");
const oneTouchEnd=html.indexOf("\n$(\"openGolfRules\")",oneTouchStart);
assert.ok(oneTouchStart>0&&oneTouchEnd>oneTouchStart,"Falta AI UNIVERSAL de un toque");
const oneTouchSource=html.slice(oneTouchStart,oneTouchEnd);
assert.doesNotMatch(oneTouchSource,/openAiUniversalPanel\(false/);
assert.match(oneTouchSource,/pointerdown/);
assert.match(oneTouchSource,/primeAiUniversalSpeechFromGesture\(\)/);

const order=[],listeners={};
const openAndListen=new Function("$","window","primeAiUniversalSpeechFromGesture","startAiUniversalListening",`${oneTouchSource};return openAiUniversalAndListen`)(
  ()=>({addEventListener:(type,handler)=>{listeners[type]=handler}}),{PointerEvent:function PointerEvent(){}},
  ()=>order.push("prime"),()=>order.push("listen")
);
assert.equal(typeof listeners.pointerdown,"function");
openAndListen({cancelable:true,preventDefault(){},stopPropagation(){}});
assert.deepEqual(order,["prime","listen"],"AI ∞ debe escuchar en el mismo toque sin cambiar de pantalla");

assert.match(html,/function parseScoreSequenceTranscript/);
assert.match(html,/"golpe","golpes","tiro","tiros"/);
assert.match(html,/while\(\["numero","no"\]\.includes\(tokens\[holeAt\]\)\)holeAt\+\+/);
assert.match(html,/function operationalDefaultVoicePlayer/);
assert.match(html,/function parseRoundScoreTranscript/);

const sanitized=sanitizeVoiceHealth({event:"browser_fallback_score_rejected",build:"V363",context:"round",scoreFailure:"missing_player",transcript:"PROHIBIDO",name:"JAIME",latitude:14.6});
assert.equal(sanitized.scoreFailure,"missing_player");
for(const forbidden of ["transcript","name","latitude"])assert.equal(forbidden in sanitized,false);

console.log("PASS V358 preservado · score natural iPhone + AI UNIVERSAL de un toque + privacidad");
