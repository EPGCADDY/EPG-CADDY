import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync("server-voice-capture.js","utf8"),html=fs.readFileSync("index-grupal.html","utf8"),worker=fs.readFileSync("service-worker.js","utf8");
assert.match(source,/requestUniversalOnly&&typeof MediaRecorder==="function"/);
assert.match(source,/recorder\.start\(250\)/);
assert.match(source,/UNIVERSAL_RECORDER_MS=6000/);
assert.match(source,/UNIVERSAL_SPEECH_THRESHOLD=SETUP_SPEECH_THRESHOLD/);
assert.match(source,/requestUniversalOnly\?UNIVERSAL_SPEECH_THRESHOLD/);
assert.match(html,/transport\.start\(\{context,players,universalOnly\}\)/);
assert.match(worker,/v392-universal-mediarecorder/);

let activeRecorder=null,fetchCount=0;
class FakeAudioContext{constructor(){this.sampleRate=48000}async resume(){}createMediaStreamSource(){return{connect(){},disconnect(){}}}createAnalyser(){return{fftSize:2048,connect(){},disconnect(){},getFloatTimeDomainData(values){values.fill(0)}}}close(){}}
class FakeMediaRecorder{
  static isTypeSupported(type){return type==="audio/mp4"}
  constructor(_stream,settings){this.mimeType=settings.mimeType;this.state="inactive";activeRecorder=this}
  start(){this.state="recording"}
  requestData(){this.ondataavailable?.({data:new Blob([new Uint8Array([1,2,3,4])],{type:this.mimeType})})}
  stop(){this.state="inactive";this.onstop?.()}
}
const sandbox={window:{AudioContext:FakeAudioContext},navigator:{mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop(){}}]})}},MediaRecorder:FakeMediaRecorder,Blob,performance:{now:()=>1},requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},btoa:value=>Buffer.from(value,"binary").toString("base64"),fetch:async(_url,options)=>{const body=JSON.parse(options.body);assert.equal(body.mimeType,"audio/mp4");fetchCount++;return{ok:true,json:async()=>({transcript:`Pregunta ${fetchCount}`})}},console,setTimeout:()=>1,clearTimeout:()=>{},Uint8Array,Int16Array,Float32Array,ArrayBuffer,DataView,Math,Object,String,Number,Promise};
vm.createContext(sandbox);vm.runInContext(source,sandbox);
const received=[];sandbox.window.GSCServerVoiceCapture.configure({transcript:value=>received.push(value),error:error=>{throw error}});
for(let turn=0;turn<3;turn++){
  assert.equal(await sandbox.window.GSCServerVoiceCapture.start({context:"setup",universalOnly:true}),true);
  assert.equal(activeRecorder.state,"recording");
  assert.equal(sandbox.window.GSCServerVoiceCapture.stop(true),true);
  await new Promise(resolve=>setTimeout(resolve,0));
}
assert.equal(fetchCount,3);assert.deepEqual(received,["Pregunta 1","Pregunta 2","Pregunta 3"]);
console.log("PASS V392 · tres turnos Universal usan MediaRecorder directo sin depender de señal Web Audio");
