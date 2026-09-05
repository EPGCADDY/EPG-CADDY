import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync("server-voice-capture.js","utf8"),html=fs.readFileSync("index-grupal.html","utf8"),worker=fs.readFileSync("service-worker.js","utf8");
assert.match(source,/requestUniversalOnly&&typeof MediaRecorder==="function"/);
assert.match(source,/recorder\.start\(\)/);
assert.doesNotMatch(source,/recorder\.requestData/);
assert.doesNotMatch(source,/UNIVERSAL_RECORDER_MS|setTimeout\(\(\)=>stop\(true\),6000\)/);
assert.match(source,/MAX_CAPTURE_MS=30000/);
assert.match(source,/UNIVERSAL_SPEECH_THRESHOLD=SETUP_SPEECH_THRESHOLD/);
assert.match(source,/requestUniversalOnly\?UNIVERSAL_SPEECH_THRESHOLD/);
assert.match(html,/transport\.start\(\{context,players,universalOnly\}\)/);
assert.match(worker,/v392-universal-mediarecorder/);

let activeRecorder=null,fetchCount=0,clock=100,rafCallback=null,trackStops=0,contextCloses=0,loud=true;
class FakeAudioContext{constructor(){this.sampleRate=48000}async resume(){}createMediaStreamSource(){return{connect(){},disconnect(){}}}createAnalyser(){return{fftSize:2048,connect(){},disconnect(){},getFloatTimeDomainData(values){values.fill(loud?.02:0)}}}close(){contextCloses++}}
class FakeMediaRecorder{
  static isTypeSupported(type){return type==="audio/mp4"}
  constructor(_stream,settings){this.mimeType=settings.mimeType;this.state="inactive";activeRecorder=this}
  start(){this.state="recording"}
  stop(){this.state="inactive";this.ondataavailable?.({data:new Blob([new Uint8Array([1,2,3,4])],{type:this.mimeType})});this.onstop?.()}
}
const sandbox={window:{AudioContext:FakeAudioContext},navigator:{mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop(){trackStops++}}]})}},MediaRecorder:FakeMediaRecorder,Blob,performance:{now:()=>clock},requestAnimationFrame:callback=>(rafCallback=callback,1),cancelAnimationFrame:()=>{rafCallback=null},btoa:value=>Buffer.from(value,"binary").toString("base64"),fetch:async(url,options)=>{assert.equal(url,"/api/voice-transcribe");const body=JSON.parse(options.body);assert.equal(body.mimeType,"audio/mp4");assert.equal(body.context,"setup");assert.ok(Buffer.from(body.audioBase64,"base64").length>0,"cada solicitud lleva audio no vacío");fetchCount++;return{ok:true,json:async()=>({transcript:`Pregunta ${fetchCount}`})}},console,setTimeout:()=>{throw new Error("Universal no debe depender de un temporizador fijo")},clearTimeout:()=>{},Uint8Array,Int16Array,Float32Array,ArrayBuffer,DataView,Math,Object,String,Number,Promise};
vm.createContext(sandbox);vm.runInContext(source,sandbox);
const received=[],states=[],errors=[];sandbox.window.GSCServerVoiceCapture.configure({state:value=>states.push(value),transcript:value=>received.push(value),error:error=>errors.push(error)});
for(let turn=0;turn<3;turn++){
  loud=true;clock+=100;
  assert.equal(await sandbox.window.GSCServerVoiceCapture.start({context:"setup",universalOnly:true}),true);
  assert.equal(activeRecorder.state,"recording");
  assert.equal(sandbox.window.GSCServerVoiceCapture.active,true);
  clock+=250;rafCallback?.();
  loud=false;clock+=1100;rafCallback?.();
  for(let flush=0;flush<4;flush++)await new Promise(resolve=>globalThis.setTimeout(resolve,0));
  assert.equal(activeRecorder.state,"inactive","el silencio detiene cada grabación");
  assert.equal(sandbox.window.GSCServerVoiceCapture.active,false,"la sesión anterior queda liberada");
  assert.equal(sandbox.window.GSCServerVoiceCapture.stopping,false,"el micrófono queda rearmado");
}
assert.equal(fetchCount,3);assert.deepEqual(received,["Pregunta 1","Pregunta 2","Pregunta 3"]);
assert.deepEqual(errors,[]);assert.equal(trackStops,3);assert.equal(contextCloses,3);
assert.deepEqual(states,["listening","transcribing","idle","listening","transcribing","idle","listening","transcribing","idle"]);
console.log("PASS V396 · 3/3 turnos: audio no vacío, cierre por silencio, transcripción, limpieza y rearme; sin corte de 6 s");
