import assert from "node:assert/strict";
import fs from "node:fs";
import speechHandler,{onyxSpeechPayload} from "./api/voice-speech.js";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/V365-DIRECT-ONYX-GATEWAY-LOCAL-MALE-20260828/);
assert.match(worker,/v365-universal-voice-recovery/);
assert.ok(audit.includes("test-v365-universal-male-voice-recovery.mjs"));
assert.match(speech,/DIRECT_FALLBACK_MODEL="tts-1"/);
assert.match(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1"/);
assert.deepEqual(onyxSpeechPayload("Respuesta"),{model:"tts-1",voice:"onyx",speed:1.15,response_format:"mp3",input:"Respuesta"});

function responseRecorder(){return{statusCode:0,headers:{},body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},send(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousOpenAI=process.env.OPENAI_API_KEY,previousGateway=process.env.AI_GATEWAY_API_KEY,previousOidc=process.env.VERCEL_OIDC_TOKEN;
let calls=0;
process.env.OPENAI_API_KEY="direct-test";delete process.env.AI_GATEWAY_API_KEY;delete process.env.VERCEL_OIDC_TOKEN;
globalThis.fetch=async(url,options)=>{
  calls+=1;
  const payload=JSON.parse(options.body);
  if(calls===1){assert.equal(payload.model,"gpt-4o-mini-tts");assert.equal(payload.voice,"cedar");return{ok:false,status:429}}
  assert.equal(String(url),"https://api.openai.com/v1/audio/speech");assert.equal(payload.model,"tts-1");assert.equal(payload.voice,"onyx");
  return{ok:true,status:200,arrayBuffer:async()=>Buffer.from("direct-onyx-audio")};
};
try{
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{text:"Respuesta confiable.",language:"es-GT"}},res=responseRecorder();
  await speechHandler(req,res);
  assert.equal(res.statusCode,200);assert.equal(res.headers["X-GSCG-Voice"],"onyx");assert.equal(res.body.toString(),"direct-onyx-audio");assert.equal(calls,2);
}finally{
  globalThis.fetch=previousFetch;
  if(previousOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousOpenAI;
  if(previousGateway===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGateway;
  if(previousOidc===undefined)delete process.env.VERCEL_OIDC_TOKEN;else process.env.VERCEL_OIDC_TOKEN=previousOidc;
}

const selectorStart=html.indexOf("function refreshAiUniversalBrowserVoices");
const selectorEnd=html.indexOf("\nfunction waitForPreferredMaleBrowserVoice",selectorStart);
assert.ok(selectorStart>0&&selectorEnd>selectorStart);
let voices=[{name:"Mónica",lang:"es-ES",voiceURI:"com.apple.voice.Monica"},{name:"Reed",lang:"en-US",voiceURI:"com.apple.voice.Reed",localService:true}];
const preferred=new Function("window",`${html.slice(selectorStart,selectorEnd)};let aiUniversalBrowserVoices=[];return preferredMaleBrowserVoice`)({speechSynthesis:{getVoices:()=>voices}});
assert.equal(preferred("es-GT")?.name,"Reed","Un locutor masculino local debe recuperar la respuesta aunque Safari no publique uno español");
voices=[{name:"Mónica",lang:"es-ES",voiceURI:"com.apple.voice.Monica"},{name:"Samantha",lang:"en-US",voiceURI:"com.apple.voice.Samantha"}];
assert.equal(preferred("es-GT"),null,"Una voz femenina no puede aprobarse como locutor masculino");

assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_local_voice_selected",build:"V365",entryCount:14,voiceName:"PRIVADO"}),{event:"browser_fallback_local_voice_selected",build:"V365",context:"round",turn:0,elapsedMs:0,entryCount:14});
console.log("PASS V365 · Cedar 429 → Onyx directo → Gateway oficial → locutor masculino local Safari");
