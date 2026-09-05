import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync("server-voice-capture.js","utf8");
assert.match(source,/audioBase64:base64\(wavBytes\(chunks\)\)/);
assert.match(source,/mimeType:"audio\/wav"/);
assert.doesNotMatch(source,/action:"stream-token"/);
assert.doesNotMatch(source,/new WebSocket/);

let now=100,rafCallback=null,processor=null,fetchCount=0;
const transcripts=["Primera pregunta","Segunda pregunta","Tercera pregunta"];
class FakeAudioContext{
  constructor(){this.sampleRate=48000;this.destination={}}
  async resume(){}
  createMediaStreamSource(){return{connect(){},disconnect(){}}}
  createAnalyser(){return{fftSize:2048,quiet:false,connect(){},disconnect(){},getFloatTimeDomainData(values){values.fill(this.quiet?0:.02)}}}
  createScriptProcessor(){processor={connect(){},disconnect(){},onaudioprocess:null};return processor}
  close(){}
}
const sandbox={window:{AudioContext:FakeAudioContext},navigator:{mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop(){}}]})}},performance:{now:()=>now},requestAnimationFrame:callback=>(rafCallback=callback,1),cancelAnimationFrame:()=>{},btoa:value=>Buffer.from(value,"binary").toString("base64"),fetch:async(_url,options)=>{const body=JSON.parse(options.body);assert.equal(body.mimeType,"audio/wav");assert.ok(body.audioBase64.length>60);return{ok:true,json:async()=>({transcript:transcripts[fetchCount++]})}},console,setTimeout,clearTimeout,Uint8Array,Int16Array,Float32Array,ArrayBuffer,DataView,Math,Object,String,Number,Promise};
vm.createContext(sandbox);vm.runInContext(source,sandbox);
const received=[];sandbox.window.GSCServerVoiceCapture.configure({transcript:value=>received.push(value),error:error=>{throw error}});
for(let turn=0;turn<3;turn++){
  assert.equal(await sandbox.window.GSCServerVoiceCapture.start({context:"round",players:"JAIME"}),true);
  processor.onaudioprocess({inputBuffer:{getChannelData:()=>new Float32Array(2048).fill(.02)}});
  now+=300;rafCallback();
  const analyser=sandbox.window.GSCServerVoiceCapture.active;
  now+=1100;
  // El segundo frame silencioso completa el VAD y dispara transcripción batch.
  sandbox.window.GSCServerVoiceCapture.stop(true);
  await new Promise(resolve=>setTimeout(resolve,0));
}
assert.equal(fetchCount,3);
assert.deepEqual(received,transcripts);
console.log("PASS V388 · tres capturas directas consecutivas independientes en el mismo ciclo de aplicación");
