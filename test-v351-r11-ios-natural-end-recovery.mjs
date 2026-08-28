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
  static last=null;
  constructor(){FakeSpeechRecognition.last=this;this.startCount=0;this.stopCount=0}
  start(){this.startCount++;this.onstart?.()}
  stop(){this.stopCount++;this.onend?.()}
  abort(){this.onend?.()}
  result(text,{final=true}={}){const result=Object.assign([{transcript:text}],{isFinal:final});this.onresult?.({resultIndex:0,results:[result]})}
  naturalEnd(){this.onend?.()}
}

const health=[],submitted=[];
const harness=new Function(
  "window","normalizeSpeech","setTimeout","clearTimeout","$","reportVoiceHealth","setPrimaryVoiceMatrix","parseSetupTranscript","applySetupChanges","renderDraft","resetSetupCapture","routeAiUniversalAppText","aiUniversalRemember","aiUniversalSetState","speakAiUniversalText","openAiUniversalPanel","submitAiUniversalText","primaryVoiceStatusTarget","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","isGeneralConversationIntent","canonicalPlayerNameKey","voiceActivationErrorMessage","console",
  `let browserVoiceRecognition=null,browserVoiceContext=null,browserVoiceActive=false,browserVoiceRequested=false,browserVoiceTranscript="",browserVoiceInterim="",browserVoiceCandidates=[],browserVoiceErrored=false,browserVoiceStopping=false,browserVoiceSilenceTimer=null,browserVoiceRestartCount=0,listening=false,phase="idle",voiceContext="round";
   const BROWSER_VOICE_SILENCE_MS=3000,BROWSER_VOICE_MAX_RESTARTS=12;
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
assert.equal(recognition.startCount,2,"El onend natural de Safari debe reiniciar sin cerrar la orden");
assert.equal(harness.state().browserVoiceTranscript,"como esta el trafico para ir de pulte","El primer bloque debe quedar comprometido");
recognition.result("a pradera concepcion");
runLatestTimer();
await new Promise(resolve=>setImmediate(resolve));

assert.equal(recognition.stopCount,1,"El silencio, no el primer onend, debe cerrar la captura");
assert.deepEqual(submitted,["como esta el trafico para ir de pulte a pradera concepcion"],"El Caddy debe recibir la pregunta completa después del reinicio natural");
assert.ok(health.includes("browser_fallback_restarted"),"La recuperación debe quedar observable sin texto privado");
assert.ok(health.includes("browser_fallback_transcript_ready"));
assert.ok(health.includes("browser_fallback_query_answered"));
assert.equal(harness.state().browserVoiceRecognition,null);

console.log("PASS V351-R11 · onend natural Safari reinicia · fragmentos conservados · pregunta completa enviada una vez");
