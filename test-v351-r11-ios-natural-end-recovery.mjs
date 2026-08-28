import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const from=html.indexOf("function fallbackVoiceConstructor"),to=html.indexOf("\nfunction setMicConnecting",from);
assert.ok(from>=0&&to>from,"No se encontró el transporte Safari del micrófono");
const browserSource=html.slice(from,to);

const timers=new Map();let timerSequence=0;
const fakeSetTimeout=callback=>{const id=++timerSequence;timers.set(id,callback);return id};
const fakeClearTimeout=id=>{timers.delete(id)};
const runLatestTimer=()=>{const entry=[...timers.entries()].at(-1);assert.ok(entry,"Debe existir el cierre por silencio");timers.delete(entry[0]);entry[1]()};
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();

class FakeSpeechRecognition{
  static last=null;static instances=[];
  constructor(){FakeSpeechRecognition.last=this;FakeSpeechRecognition.instances.push(this);this.startCount=0;this.stopCount=0}
  start(){this.startCount++;this.onstart?.()}
  stop(){this.stopCount++;this.onend?.()}
  abort(){this.onend?.()}
  result(text,{final=true}={}){const result=Object.assign([{transcript:text}],{isFinal:final});this.onresult?.({resultIndex:0,results:[result]})}
  error(code){this.onerror?.({error:code})}
  naturalEnd(){this.onend?.()}
}

const health=[],submitted=[];
const harness=new Function(
  "window","normalizeSpeech","setTimeout","clearTimeout","$","reportVoiceHealth","setPrimaryVoiceMatrix","parseSetupTranscript","applySetupChanges","renderDraft","resetSetupCapture","routeAiUniversalAppText","aiUniversalRemember","aiUniversalSetState","speakAiUniversalText","openAiUniversalPanel","submitAiUniversalText","primaryVoiceStatusTarget","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","isGeneralConversationIntent","canonicalPlayerNameKey","voiceActivationErrorMessage","console",
  `let browserVoiceRecognition=null,browserVoiceContext=null,browserVoiceActive=false,browserVoiceRequested=false,browserVoiceTranscript="",browserVoiceInterim="",browserVoiceCandidates=[],browserVoiceErrored=false,browserVoiceStopping=false,browserVoiceSilenceTimer=null,browserVoiceRetryTimer=null,browserVoiceRestartCount=0,browserVoiceTransportRetryCount=0,listening=false,phase="idle",voiceContext="round";
   const BROWSER_VOICE_SILENCE_MS=3000,BROWSER_VOICE_MAX_RESTARTS=12,BROWSER_VOICE_MAX_TRANSPORT_RETRIES=2,BROWSER_VOICE_TRANSPORT_RETRY_MS=350;
   ${browserSource}
   return{startBrowserVoiceFallback,state:()=>({browserVoiceRecognition,browserVoiceTranscript,browserVoiceInterim,browserVoiceRestartCount,listening,phase})}`
)(
  {SpeechRecognition:FakeSpeechRecognition},normalizeSpeech,fakeSetTimeout,fakeClearTimeout,()=>({textContent:"",classList:{remove(){},add(){},toggle(){}}}),
  event=>{health.push(event);return true},()=>true,()=>({ok:false}),()=>({ok:false}),()=>{},()=>{},()=>({handled:false}),()=>{},()=>{},()=>false,()=>{},async query=>{submitted.push(query);return true},()=>({textContent:""}),()=>false,()=>({ok:false}),text=>/^(?:que|como|cuando|donde|cual|quien|por que|para que|puedes|podrias|sabes|ayudame)\b/.test(normalizeSpeech(text)),normalizeSpeech,error=>String(error?.message||error),{error(){}
  }
);

assert.equal(harness.startBrowserVoiceFallback("round"),true);
const recognition=FakeSpeechRecognition.last;
assert.equal(recognition.startCount,1,"El toque debe abrir la primera captura");
recognition.result("como esta el trafico para ir de pulte");
recognition.naturalEnd();
const restartedRecognition=FakeSpeechRecognition.last;
assert.notEqual(restartedRecognition,recognition,"El onend natural debe liberar la instancia anterior de Safari");
assert.equal(restartedRecognition.startCount,1,"El onend natural debe abrir una captura nueva sin cerrar la orden");
assert.equal(harness.state().browserVoiceTranscript,"como esta el trafico para ir de pulte","El primer bloque debe quedar comprometido");
restartedRecognition.result("a pradera concepcion");
runLatestTimer();
await new Promise(resolve=>setImmediate(resolve));

assert.equal(restartedRecognition.stopCount,1,"El silencio, no el primer onend, debe cerrar la captura nueva");
assert.deepEqual(submitted,["como esta el trafico para ir de pulte a pradera concepcion"],"El Caddy debe recibir la pregunta completa después del reinicio natural");
assert.ok(health.includes("browser_fallback_restarted"),"La recuperación debe quedar observable sin texto privado");
assert.ok(health.includes("browser_fallback_transcript_ready"));
assert.ok(health.includes("browser_fallback_query_answered"));
assert.equal(harness.state().browserVoiceRecognition,null);

assert.equal(harness.startBrowserVoiceFallback("round"),true);
const failedCapture=FakeSpeechRecognition.last;
failedCapture.error("audio-capture");
assert.ok(health.includes("browser_fallback_error"),"El error físico debe salir en telemetría cerrada");
assert.ok(health.includes("browser_fallback_retry_scheduled"),"audio-capture debe programar recuperación automática");
runLatestTimer();
const recoveredCapture=FakeSpeechRecognition.last;
assert.notEqual(recoveredCapture,failedCapture,"La recuperación debe usar una instancia nueva y liberar la fallida");
assert.ok(health.includes("browser_fallback_retry_started"));
recoveredCapture.result("como esta el clima hoy");
runLatestTimer();
await new Promise(resolve=>setImmediate(resolve));
assert.deepEqual(submitted,["como esta el trafico para ir de pulte a pradera concepcion","como esta el clima hoy"],"La consulta general debe sobrevivir a audio-capture y enviarse una sola vez");
assert.equal(harness.state().browserVoiceRecognition,null);

console.log("PASS V351-R12 · captura nueva por onend y audio-capture · preguntas completas enviadas una vez");
