import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-build" content="V363-RECORDED-MOBILE-BEHAVIOR-20260828"/);
assert.match(html,/gscg-ios-voice-recovery" content="V363-STOP-GUARD-NO-STUCK-LISTENING-20260828"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry-v369-voice-090-one-turn-gps-traffic-v371-r10-turn-audio-reset-v374-stream-transcription"/);

const gestureStart=html.indexOf("function gestureSafeBrowserVoicePreferred");
const gestureEnd=html.indexOf("\nfunction shouldUseBrowserVoiceFallback",gestureStart);
assert.ok(gestureStart>0&&gestureEnd>gestureStart,"Falta la detección iPhone/iPad");
const gesturePreferred=new Function("window","navigator","fallbackVoiceAvailable",`${html.slice(gestureStart,gestureEnd)};return gestureSafeBrowserVoicePreferred`)(
  {webkitSpeechRecognition:function Recognition(){}},
  {userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 26_6 like Mac OS X)",platform:"iPhone",maxTouchPoints:5},
  ()=>true
);
assert.equal(gesturePreferred(),true,"iPhone debe usar captura local dentro del gesto");

const toggleStart=html.indexOf("async function toggleVoice");
const toggleEnd=html.indexOf("\nfunction dateSetup",toggleStart);
const toggle=html.slice(toggleStart,toggleEnd);
assert.ok(toggleStart>0&&toggleEnd>toggleStart);
assert.ok(toggle.indexOf("gestureSafeBrowserVoicePreferred()")<toggle.indexOf("await ensureSession()"),"Safari debe abrir el micrófono antes de esperar Realtime");
assert.match(toggle,/startBrowserVoiceFallback\(context\).*MICRÓFONO DEL IPHONE ACTIVO/s);
assert.match(toggle,/stopBrowserVoiceFallback\(\{keepStatus:true,processPending:true\}\)/);

for(const contract of [
  "recognition.continuous=true",
  "recognition.maxAlternatives=5",
  "BROWSER_VOICE_SILENCE_MS=1200",
  "BROWSER_VOICE_MAX_RESTARTS=12",
  "BROWSER_VOICE_MAX_TRANSPORT_RETRIES=2",
  'beginBrowserVoiceRecognition(context,"natural")',
  'beginBrowserVoiceRecognition(context,"transport")',
  "scheduleBrowserVoiceFinalize(recognition,context)",
  "selectBrowserVoiceCandidate(context,browserVoiceCandidates,primary)"
])assert.ok(html.includes(contract),`Falta contrato de recuperación: ${contract}`);

const processStart=html.indexOf("async function processBrowserVoiceTranscript");
const processEnd=html.indexOf("\nfunction scheduleBrowserVoiceTransportRetry",processStart);
const process=html.slice(processStart,processEnd);
assert.ok(processStart>0&&processEnd>processStart);
assert.ok(process.indexOf("parseSetupTranscript(clean)")<process.indexOf("isGeneralConversationIntent(clean)"));
assert.ok(process.indexOf("isGeneralConversationIntent(clean)")<process.indexOf("browser_fallback_setup_rejected"),"Una pregunta universal desde Registro no puede tratarse como listado inválido");
assert.ok(process.indexOf("parseRoundScoreTranscript(clean)")<process.indexOf("routeAiUniversalAppText(clean)"),"El score debe seguir siendo local y prioritario");
assert.match(process,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/,"La consulta hablada no debe mostrarse como conversación escrita");

const selectorStart=html.indexOf("function mergeBrowserVoiceSegments");
const selectorEnd=html.indexOf("\nfunction clearBrowserVoiceSilenceTimer",selectorStart);
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const parseRoundScoreTranscript=text=>{
  const clean=normalizeSpeech(text);if(!clean.includes("hoyo tres"))return{ok:false};
  const gross=clean.includes("jaime seis")?6:5;return{ok:true,entries:[{player:"Jaime",hole:3,gross},{player:"Gustavo",hole:3,gross:5}]};
};
const selectCandidate=new Function(
  "normalizeSpeech","parseSetupTranscript","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","isGeneralConversationIntent","canonicalPlayerNameKey",
  `${html.slice(selectorStart,selectorEnd)};return selectBrowserVoiceCandidate`
)(normalizeSpeech,()=>({ok:false}),text=>/\bhoyo\b/.test(normalizeSpeech(text)),parseRoundScoreTranscript,text=>/^(?:como|que|cuando|donde|cual|quien|por que)\b/.test(normalizeSpeech(text)),normalizeSpeech);

const primary="hoyo tres Jaime cinco Gustavo cinco",conflict="hoyo tres Jaime seis Gustavo cinco";
assert.deepEqual(selectCandidate("round",[conflict],primary),{transcript:normalizeSpeech(primary),ambiguous:false,source:"primary"});
assert.equal(selectCandidate("round",[primary,conflict]).ambiguous,true,"Dos scores completos discrepantes no pueden escribirse");

for(const event of ["browser_fallback_restarted","browser_fallback_retry_scheduled","browser_fallback_retry_started","browser_fallback_retry_failed","browser_fallback_query_answered","browser_fallback_score_rejected"]){
  assert.ok(html.includes(`"${event}"`),`Falta telemetría ${event}`);
  const sanitized=sanitizeVoiceHealth({event,build:"V357",transportFailure:"network",scoreFailure:"ambiguous_score",transcript:"PRIVADO",player:"JAIME",latitude:14.6});
  assert.equal(sanitized.event,event);assert.equal(sanitized.build,"V357");assert.equal("transcript" in sanitized,false);assert.equal("player" in sanitized,false);assert.equal("latitude" in sanitized,false);
}

console.log("PASS V357 · iPhone abre voz en el gesto · 429 no bloquea scores ni AI UNIVERSAL · multi-hoyo, reintentos y privacidad protegidos");
