import assert from "node:assert/strict";
import fs from "node:fs";
import speechHandler from "./api/voice-speech.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/V365-MULTIPROVIDER-MALE-VOICE-20260828/);
assert.match(html,/V365-ONYX-REX-TRAFFIC-LIVE-20260828/);
assert.match(html,/RESPONDIENDO EN VOZ · REX 1\.15 · RESPALDO/);
assert.match(worker,/gscg-mobile-v365-multiprovider-male-voice/);
assert.match(speech,/model:"openai\/tts-1",voice:"onyx"/);
assert.match(speech,/model:"spacexai\/grok-tts",voice:"Rex",deliveredVoice:"rex"/);
assert.match(speech,/"ai-speech-model-specification-version":"4"/);
assert.match(speech,/for\(const candidate of GATEWAY_SPEECH_MODELS\)/);
assert.match(speech,/"X-GSCG-Voice",fromGateway\?gatewayVoice:VOICE/);
assert.ok(audit.includes("test-v365-multiprovider-male-voice.mjs"));

function responseRecorder(){return{statusCode:0,headers:{},body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},send(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousOpenAI=process.env.OPENAI_API_KEY,previousGateway=process.env.AI_GATEWAY_API_KEY,calls=[];
process.env.OPENAI_API_KEY="direct-test";process.env.AI_GATEWAY_API_KEY="gateway-test";
globalThis.fetch=async(url,options)=>{
  calls.push({url:String(url),model:options?.headers?.["ai-model-id"],protocol:options?.headers?.["ai-speech-model-specification-version"],body:options?.body?JSON.parse(options.body):null});
  if(String(url).includes("api.openai.com"))return{ok:false,status:429};
  if(options?.headers?.["ai-model-id"]==="openai/tts-1")return{ok:false,status:400,clone(){return this},json:async()=>({error:{code:"provider_unavailable"}})};
  return{ok:true,status:200,json:async()=>({audio:Buffer.from("rex-audio").toString("base64"),warnings:[]})};
};
try{
  const res=responseRecorder();
  await speechHandler({method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{text:"Respuesta masculina",language:"es-GT"}},res);
  assert.equal(res.statusCode,200);
  assert.equal(res.headers["X-GSCG-Voice"],"rex");
  assert.equal(res.body.toString(),"rex-audio");
  assert.deepEqual(calls.map(call=>call.model),[undefined,"openai/tts-1","spacexai/grok-tts"]);
  assert.deepEqual(calls.slice(1).map(call=>call.protocol),["4","4"]);
  assert.equal(calls[2].body.voice,"Rex");
}finally{
  globalThis.fetch=previousFetch;
  if(previousOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousOpenAI;
  if(previousGateway===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGateway;
}

console.log("PASS V365 · Cedar → Onyx → Rex masculino con proveedor alterno real");
