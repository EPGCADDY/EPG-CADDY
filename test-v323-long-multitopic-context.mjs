import assert from "node:assert/strict";
import fs from "node:fs";
import universalAiHandler,{sanitizeUniversalHistory} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const serviceWorker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V330-R2-SINGLE-MODE-SELECTION-20260826"/);
assert.match(serviceWorker,/gscg-mobile-v330-side-games-r2/);
assert.match(api,/const MAX_HISTORY_TURNS=80/);
assert.match(html,/const AI_UNIVERSAL_HISTORY_LIMIT=80/);
assert.match(html,/\.slice\(-AI_UNIVERSAL_HISTORY_LIMIT\)/);
assert.match(html,/aiUniversalHistory\.length>AI_UNIVERSAL_HISTORY_LIMIT/);

const topics=[
  "lluvia", "espasmo dorsal", "viaje a Ciudad de México", "tramadol y golf",
  "zapatos impermeables", "computación cuántica", "cena guatemalteca", "esperanza",
  "neurociencia", "realidad aumentada", "traducción al francés", "historia romana",
  "fotografía", "jardinería", "finanzas personales", "astronomía", "arquitectura",
  "música", "nutrición", "reglas de golf", "cine", "geología", "programación",
  "literatura", "viajes", "matemáticas", "biología", "arte", "idiomas", "cocina"
];
const longConversation=[{role:"user",content:"Recuerda durante toda esta conversación la clave ORQUÍDEA 47."},{role:"assistant",content:"Entendido: recordaré ORQUÍDEA 47."}];
for(const topic of topics){
  longConversation.push({role:"user",content:`Cambiemos de tema y conversemos sobre ${topic}.`});
  longConversation.push({role:"assistant",content:`Respuesta breve y contextual sobre ${topic}.`});
}
longConversation.push({role:"user",content:"¿Cuál fue la clave del principio?"});

const sanitized=sanitizeUniversalHistory(longConversation);
assert.equal(sanitized.length,longConversation.length);
assert.match(sanitized[0].content,/ORQUÍDEA 47/);
assert.match(sanitized.at(-1).content,/clave del principio/);

function responseRecorder(){
  return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},end(){return this}};
}
const originalFetch=globalThis.fetch;
const previousKey=process.env.OPENAI_API_KEY;
let upstreamRequest=null;
process.env.OPENAI_API_KEY="test-key";
try{
  globalThis.fetch=async(url,options)=>{
    upstreamRequest={url,options};
    return{ok:true,status:200,json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"La clave inicial fue ORQUÍDEA 47.",annotations:[]}]}]})};
  };
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:longConversation.at(-1).content,history:longConversation.slice(0,-1)}};
  const res=responseRecorder();
  await universalAiHandler(req,res);
  assert.equal(res.statusCode,200);
  assert.match(res.body.answer,/ORQUÍDEA 47/);
  const providerPayload=JSON.parse(upstreamRequest.options.body);
  assert.equal(providerPayload.input.length,63,"La API debe enviar los 62 mensajes previos más la pregunta vigente");
  assert.match(providerPayload.input[0].content,/ORQUÍDEA 47/);
  assert.match(providerPayload.input.at(-1).content,/clave del principio/);
  assert.equal(providerPayload.store,false);
}finally{
  globalThis.fetch=originalFetch;
  if(previousKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousKey;
}

const contextStart=html.indexOf("function aiUniversalContextForPrompt");
const contextEnd=html.indexOf("\nfunction conversationInstructions",contextStart);
assert.ok(contextStart>0&&contextEnd>contextStart);
const contextSource=html.slice(contextStart,contextEnd);
const voiceContext=new Function("history",`
  const AI_UNIVERSAL_HISTORY_LIMIT=80;
  let aiUniversalHistory=history,authorizedSpeech={text:"¿Cuál fue la clave del principio?"};
  const normalizeSpeech=value=>String(value||"").toLowerCase();
  ${contextSource}
  return aiUniversalContextForPrompt();
`)(longConversation);
assert.match(voiceContext,/ORQUÍDEA 47/);
assert.match(voiceContext,/realidad aumentada/);
assert.doesNotMatch(voiceContext,/¿Cuál fue la clave del principio\?/);

const overflow=[{role:"user",content:"Este turno ya debe salir."},...Array.from({length:80},(_,index)=>({role:index%2?"assistant":"user",content:`turno vigente ${index+1}`}))];
const limited=sanitizeUniversalHistory(overflow);
assert.equal(limited.length,80);
assert.doesNotMatch(limited[0].content,/debe salir/);
assert.equal(limited.at(-1).content,"turno vigente 80");

assert.match(html,/const CONVERSATION_INACTIVITY_CLOSE_MS=30\*60\*1000/);
assert.doesNotMatch(html,/CONVERSATION_IDLE_CLOSE_MS=3000/);
assert.match(html,/conversationBargeInArmedAt=Date\.now\(\)\+250/);
assert.match(html,/if\(micTrack\)micTrack\.enabled=listening/);
assert.match(html,/else if\(finishedReason==="conversation"\)\{if\(resumeConversationListening\(\)\)/);

const timingStart=html.indexOf("function clearConversationIdleCloseTimer");
const timingEnd=html.indexOf("\nfunction handleRealtime",timingStart);
assert.ok(timingStart>0&&timingEnd>timingStart);
const timingSource=html.slice(timingStart,timingEnd);
const timingHarness=new Function(`
  let conversationIdleCloseTimer=null,listening=true,authorizedSpeech=null,stopMonitorActive=false,phase="listening",setupSpeechActive=false,roundSpeechActive=false;
  const setupPendingItems=new Set(),roundPendingItems=new Set();
  const CONVERSATION_INACTIVITY_CLOSE_MS=30*60*1000;
  let timerSeq=0,scheduled=new Map(),closed=0;
  const setTimeout=(fn,ms)=>{const id=++timerSeq;scheduled.set(id,{fn,ms});return id};
  const clearTimeout=id=>scheduled.delete(id);
  const micTrack={readyState:"live",enabled:true};
  const element={textContent:"",classList:{add(){},toggle(){}}};
  const $=()=>element,renderCourseWeather=()=>{},renderSetupWeather=()=>{};
  const conversationStatusTarget=()=>element,aiUniversalSetState=()=>{};
  let voiceContext="round";
  const setVoice=on=>{listening=on;micTrack.enabled=on;if(!on)closed++};
  ${timingSource}
  return {
    nextTurn:()=>resumeConversationListening(),
    state:()=>({listening,enabled:micTrack.enabled,phase,closed,delays:[...scheduled.values()].map(item=>item.ms)}),
    expire:()=>{const item=[...scheduled.values()].at(-1);item?.fn()}
  };
`)();
for(let turn=1;turn<=30;turn++){
  assert.equal(timingHarness.nextTurn(),true,`Turno bilateral ${turn} no reabrió la escucha`);
  const state=timingHarness.state();
  assert.deepEqual({listening:state.listening,enabled:state.enabled,phase:state.phase,closed:state.closed},{listening:true,enabled:true,phase:"listening",closed:0});
  assert.deepEqual(state.delays,[30*60*1000]);
}
timingHarness.expire();
assert.equal(timingHarness.state().closed,1,"Sólo la inactividad real de 30 minutos debe cerrar el micrófono");

console.log("PASS V323 · 30 temas, 63 mensajes, 30 turnos bilaterales y memoria inicial en texto/voz");
