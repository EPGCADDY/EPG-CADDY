import assert from "node:assert/strict";
import fs from "node:fs";
import researchHandler from "./api/research.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const researchApi=fs.readFileSync(new URL("./api/research.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V\d{3}[^"]*"/);
assert.match(html,/const CONVERSATION_INACTIVITY_CLOSE_MS=30\*60\*1000/);
assert.doesNotMatch(html,/CONVERSATION_IDLE_CLOSE_MS=3000/);
assert.match(html,/if\(on\)scheduleConversationIdleClose\(\)/);
assert.match(html,/if\(listening\)scheduleConversationIdleClose\(\)/);
assert.match(html,/if\(!realtimeReusableFor\(context\)\)[\s\S]*?await ensureSession\(\)/);
assert.doesNotMatch(html,/Cada nueva activación usa transporte Realtime fresco/);
assert.match(html,/processedTranscriptItems\.clear\(\);processedConversationToolCalls\.clear\(\)/);
assert.match(html,/NO PUDE COMPLETAR ESA RESPUESTA · PUEDES CONTINUAR/);
assert.match(html,/setupTranscriptionWatchdog=setTimeout/);
assert.match(html,/roundTranscriptionWatchdog=setTimeout/);
assert.match(html,/setupMicWrap"\)\.classList\.add\("active"\)/);
assert.match(html,/headerMicWrap"\)\.classList\.add\("active"\)/);
assert.match(researchApi,/SEARCH_TIMEOUT_MS = 40_000/);
assert.match(researchApi,/RESEARCH_TIMEOUT/);
assert.match(researchApi,/return res\.status\(200\)\.json\(unavailableResearch/);
assert.match(html,/CLIENT_RESEARCH_TIMEOUT_MS=45\*1000/);
assert.match(html,/signal:controller\.signal/);
assert.match(html,/nunca guardes silencio ni inventes/);

const idleSource=html.slice(html.indexOf("function clearConversationIdleCloseTimer"),html.indexOf("\nfunction resumeConversationListening"));
const idleHarness=new Function(`
  let conversationIdleCloseTimer=null,listening=true,authorizedSpeech=null,stopMonitorActive=false,phase="listening",setupSpeechActive=false,roundSpeechActive=false;
  const setupPendingItems=new Set(),roundPendingItems=new Set();
  const CONVERSATION_INACTIVITY_CLOSE_MS=30*60*1000;
  let callback=null,delay=null,closed=0,status={textContent:""};
  const setTimeout=(fn,ms)=>{callback=fn;delay=ms;return 1};
  const clearTimeout=()=>{callback=null};
  const setVoice=on=>{listening=on;if(!on)closed++};
  const conversationStatusTarget=()=>status;
  const aiUniversalSetState=()=>{};
  ${idleSource}
  return {scheduleConversationIdleClose,fire:()=>callback?.(),delay:()=>delay,closed:()=>closed,status:()=>status.textContent};
`)();
assert.equal(idleHarness.scheduleConversationIdleClose(),true);
assert.equal(idleHarness.delay(),30*60*1000);
idleHarness.fire();
assert.equal(idleHarness.closed(),1);
assert.match(idleHarness.status(),/MICRÓFONO CERRADO/);

const resumeSource=html.slice(html.indexOf("function resumeConversationListening"),html.indexOf("\nfunction handleRealtime"));
const resumeHarness=new Function(`
  let listening=true,phase="idle",voiceContext="round",scheduled=0;
  const micTrack={readyState:"live",enabled:false};
  const elements={status:{textContent:""},setupStatus:{textContent:"",classList:{add(){}}}};
  const $=id=>elements[id];
  const setVoice=on=>{listening=on};
  const scheduleConversationIdleClose=()=>{scheduled++;return true};
  const renderCourseWeather=()=>{};
  const renderSetupWeather=()=>{};
  ${resumeSource}
  return {turn:()=>resumeConversationListening(),state:()=>({listening,phase,enabled:micTrack.enabled,scheduled,status:elements.status.textContent})};
`)();
for(let turn=1;turn<=24;turn++){
  assert.equal(resumeHarness.turn(),true,`El turno ${turn} debe volver a escuchar`);
  const state=resumeHarness.state();
  assert.deepEqual({listening:state.listening,phase:state.phase,enabled:state.enabled},{listening:true,phase:"listening",enabled:true});
  assert.equal(state.scheduled,turn);
}

function responseRecorder(){
  return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},end(){return this}};
}
const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"Pregunta vigente de prueba"}};
const originalFetch=globalThis.fetch;
const previousKey=process.env.OPENAI_API_KEY;
process.env.OPENAI_API_KEY="test-key";
try{
  globalThis.fetch=async()=>({ok:true,status:200,json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"Respuesta verificada.",annotations:[]}]}]})});
  let res=responseRecorder();await researchHandler(req,res);
  assert.equal(res.statusCode,200);assert.equal(res.body.ok,true);

  globalThis.fetch=async()=>({ok:false,status:503,json:async()=>({})});
  res=responseRecorder();await researchHandler(req,res);
  assert.equal(res.statusCode,200);assert.equal(res.body.ok,false);assert.equal(res.body.error,"RESEARCH_UPSTREAM_UNAVAILABLE");assert.match(res.body.message,/Puedes continuar/);

  globalThis.fetch=async()=>{const error=new Error("aborted");error.name="AbortError";throw error};
  res=responseRecorder();await researchHandler(req,res);
  assert.equal(res.statusCode,200);assert.equal(res.body.ok,false);assert.equal(res.body.error,"RESEARCH_TIMEOUT");assert.match(res.body.message,/Puedes continuar/);
}finally{
  globalThis.fetch=originalFetch;
  if(previousKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousKey;
}

console.log("PASS V322 · 24 turnos consecutivos, reapertura sana y fallos web recuperables");
