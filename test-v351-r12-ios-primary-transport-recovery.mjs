import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/gscg-ios-voice-tail" content="V351-R12-IOS-PRIMARY-TRANSPORT-RECOVERY-20260828"/);

const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const from=html.indexOf("function mergeBrowserVoiceSegments"),to=html.indexOf("\nfunction clearBrowserVoiceSilenceTimer",from);
assert.ok(from>=0&&to>from,"No se encontró el selector Safari R12");
const selectorSource=html.slice(from,to);
const parseRoundScoreTranscript=text=>{
  const clean=normalizeSpeech(text);
  if(!clean.includes("hoyo tres"))return{ok:false};
  const jaimeGross=clean.includes("jaime seis")?6:5;
  return{ok:true,entries:[{player:"Jaime",hole:3,gross:jaimeGross},{player:"Gustavo",hole:3,gross:5}]};
};
const selectBrowserVoiceCandidate=new Function(
  "normalizeSpeech","parseSetupTranscript","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","isGeneralConversationIntent","canonicalPlayerNameKey",
  `${selectorSource};return selectBrowserVoiceCandidate`
)(normalizeSpeech,()=>({ok:false}),text=>/\bhoyo\b/.test(normalizeSpeech(text)),parseRoundScoreTranscript,text=>/^(?:como|que|cuando|donde|cual|quien|por que)\b/.test(normalizeSpeech(text)),normalizeSpeech);

const primary="hoyo tres Jaime cinco Gustavo cinco";
const conflictingAlternative="hoyo tres Jaime seis Gustavo cinco";
assert.deepEqual(
  selectBrowserVoiceCandidate("round",[conflictingAlternative],primary),
  {transcript:normalizeSpeech(primary),ambiguous:false,source:"primary"},
  "Una alternativa secundaria de Safari no puede vetar la hipótesis principal completa"
);
assert.equal(
  selectBrowserVoiceCandidate("round",[primary,conflictingAlternative]).ambiguous,
  true,
  "Sin hipótesis principal identificada, dos órdenes completas discrepantes siguen bloqueadas"
);

for(const event of ["browser_fallback_requested","browser_fallback_restarted","browser_fallback_error","browser_fallback_retry_scheduled","browser_fallback_retry_started","browser_fallback_retry_failed"]){
  assert.ok(html.includes(`"${event}"`),`${event} debe existir en el cliente`);
  const sanitized=sanitizeVoiceHealth({event,build:"V351-R12",transportFailure:"audio_capture",transcript:"privada",player:"privado",score:"privado",location:"privada"});
  assert.deepEqual(sanitized,{event,build:"V351-R12",context:"round",turn:0,elapsedMs:0,transportFailure:"audio_capture"},`${event} debe llegar sin texto ni datos privados`);
}
assert.match(html,/scheduleBrowserVoiceTransportRetry\(recognition,context,event\)/);
assert.match(html,/beginBrowserVoiceRecognition\(context,"transport"\)/);
assert.match(html,/detachBrowserVoiceRecognition\(recognition\)/);
assert.match(html,/BROWSER_VOICE_MAX_TRANSPORT_RETRIES=2/);

console.log("PASS V351-R12 · principal autoritativa · contradicción segura · audio-capture recuperable · telemetría privada completa");
