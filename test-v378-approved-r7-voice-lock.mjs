import assert from "node:assert/strict";
import fs from "node:fs";
import speechHandler,{cedarGatewayPayload} from "./api/voice-speech.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

const handler=speech.slice(speech.indexOf("export default async function handler"));
assert.match(handler,/upstream=await requestGatewaySpeech\(gatewayToken,text,language,controller\.signal\)/);
assert.doesNotMatch(handler,/requestDirectSpeech|cedarSpeechPayload|api\.openai\.com|fromGateway/);
assert.match(handler,/"X-GSCG-Voice",GATEWAY_VOICE/);
assert.match(worker,/v378-approved-r7-voice-lock/);

const spoken=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("\nfunction stopAiUniversalOutput"));
assert.match(spoken,/VOZ R7 APROBADA NO DISPONIBLE/);
assert.doesNotMatch(spoken,/speakAiUniversalMaleBrowserFallback/);

const payload=cedarGatewayPayload("Hoy Jaime cuatro.");
assert.deepEqual({speed:payload.speed,language:payload.language,outputFormat:payload.outputFormat},{speed:.9,language:"es-419",outputFormat:"mp3"});
assert.match(payload.instructions,/masculino adulto mexicano/);
assert.match(payload.instructions,/nunca uses acento anglosajón, Spanglish/);

function responseRecorder(){return{statusCode:0,headers:{},body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},send(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousGateway=process.env.AI_GATEWAY_API_KEY,previousOpenAI=process.env.OPENAI_API_KEY;
const calls=[];
process.env.AI_GATEWAY_API_KEY="gateway-test";
process.env.OPENAI_API_KEY="must-not-be-used";
globalThis.fetch=async(url,options)=>{calls.push({url:String(url),options});return{ok:true,status:200,json:async()=>({audio:Buffer.from("r7-audio").toString("base64")})}};
try{
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{text:"Hoy Jaime cuatro.",language:"es-MX"}},res=responseRecorder();
  await speechHandler(req,res);
  assert.equal(res.statusCode,200);
  assert.equal(calls.length,1);
  assert.equal(calls[0].url,"https://ai-gateway.vercel.sh/v4/ai/speech-model");
  assert.equal(calls[0].options.headers["ai-model-id"],"fish-audio/s2.1-pro-free");
  assert.equal(res.headers["X-GSCG-Voice"],"s2.1-es-419");
  assert.equal(res.body.toString(),"r7-audio");
}finally{
  globalThis.fetch=previousFetch;
  if(previousGateway===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGateway;
  if(previousOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousOpenAI;
}

console.log("PASS V378 · voz R7 aprobada bloqueada como única salida audible, sin Onyx ni voz local");
