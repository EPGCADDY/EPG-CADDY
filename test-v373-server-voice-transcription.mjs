import assert from "node:assert/strict";
import fs from "node:fs";
import handler from "./api/voice-transcribe.js";

const index=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const capture=fs.readFileSync(new URL("./server-voice-capture.js",import.meta.url),"utf8");
const serviceWorker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(index,/server-voice-capture\.js/);
assert.match(index,/serverVoiceCapturePreferred\(\)/);
assert.match(index,/processBrowserVoiceTranscript\(context,transcript\)/);
assert.match(capture,/SILENCE_MS=1000/);
assert.match(capture,/getUserMedia\(\{audio:/);
assert.match(capture,/track=>track\.stop\(\)/);
assert.match(capture,/\/api\/voice-transcribe/);
assert.match(serviceWorker,/server-voice-capture\.js/);

function response(){
  return{statusCode:200,headers:{},payload:null,setHeader(key,value){this.headers[key]=value},status(code){this.statusCode=code;return this},json(value){this.payload=value;return this},send(value){this.payload=value;return this}};
}

const previousKey=process.env.OPENAI_API_KEY,previousFetch=globalThis.fetch;
process.env.OPENAI_API_KEY="test-key";
try{
  const invalid=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{}},invalid);
  assert.equal(invalid.statusCode,422);
  assert.equal(invalid.payload.error,"AUDIO_REQUIRED");

  let receivedAuthorization="",receivedModel="",receivedLanguage="";
  globalThis.fetch=async(_url,options)=>{
    receivedAuthorization=options.headers.Authorization;
    receivedModel=String(options.body.get("model"));
    receivedLanguage=String(options.body.get("language"));
    return new Response(JSON.stringify({text:"Hoyo cuatro, cuatro. Hoyo ocho, tres. Hoyo nueve, cuatro."}),{status:200,headers:{"Content-Type":"application/json"}});
  };
  const ok=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{audioBase64:Buffer.from("test-audio").toString("base64"),mimeType:"audio/mp4",context:"round",players:"Jaime"}},ok);
  assert.equal(ok.statusCode,200);
  assert.equal(ok.payload.transcript,"Hoyo cuatro, cuatro. Hoyo ocho, tres. Hoyo nueve, cuatro.");
  assert.equal(receivedAuthorization,"Bearer test-key");
  assert.equal(receivedModel,"gpt-4o-mini-transcribe");
  assert.equal(receivedLanguage,"es");
}finally{
  globalThis.fetch=previousFetch;
  if(previousKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousKey;
}

console.log("V373_SERVER_VOICE_TRANSCRIPTION PASS");
