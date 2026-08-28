import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/V366-UNIVERSAL-AUDIO-ONLY-CONTEXT-20260828/);
assert.match(worker,/v366-universal-audio-only-context/);

const queryStart=html.indexOf("async function answerBrowserVoiceQuery");
const queryEnd=html.indexOf("\nfunction scheduleBrowserVoiceTransportRetry",queryStart);
assert.ok(queryStart>0&&queryEnd>queryStart,"Falta la ruta de conversación por voz");
const querySource=html.slice(queryStart,queryEnd);
assert.doesNotMatch(querySource,/openAiUniversalPanel\(/,"Una pregunta hablada no puede abrir AI UNIVERSAL");
assert.ok(querySource.indexOf("closeAiUniversalPanel()")<querySource.indexOf("submitAiUniversalText(clean,{voiceOnly:true})"),"La pantalla adicional debe permanecer cerrada antes de responder");
assert.match(querySource,/browser_fallback_general_audio_only/);

const oneTouchStart=html.indexOf("let lastAiUniversalGestureAt=0");
const oneTouchEnd=html.indexOf("\n$(\"openGolfRules\")",oneTouchStart);
assert.ok(oneTouchStart>0&&oneTouchEnd>oneTouchStart,"Falta el gesto AI ∞");
const oneTouchSource=html.slice(oneTouchStart,oneTouchEnd);
assert.doesNotMatch(oneTouchSource,/openAiUniversalPanel\(/,"AI ∞ por voz no puede sustituir la tarjeta visible");
assert.ok(oneTouchSource.indexOf("closeAiUniversalPanel()")<oneTouchSource.indexOf("startAiUniversalListening()"),"AI ∞ debe cerrar cualquier panel y escuchar sobre la pantalla actual");

assert.match(html,/aiUniversalRemember\("user",query,\[\],\{visible:!voiceOnly\}\)/);
assert.match(html,/aiUniversalRemember\("assistant",result\.answer,result\.sources,\{visible:!voiceOnly\}\)/);
assert.match(html,/if\(voiceOnly\)await speakAiUniversalText\(result\.answer\)/);
assert.match(html,/\$\("openGolfRules"\)\.addEventListener\("click",\(\)=>openAiUniversalPanel\(true\)\)/,"Reglas conserva su panel explícito");

assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_general_audio_only",build:"V366",context:"round",transcript:"PROHIBIDO",answer:"PROHIBIDO"}),{
  event:"browser_fallback_general_audio_only",build:"V366",context:"round",turn:0,elapsedMs:0
});

console.log("PASS V366 · AI UNIVERSAL habla sobre la pantalla actual sin abrir otra pantalla");
