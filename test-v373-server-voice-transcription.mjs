import assert from "node:assert/strict";
import fs from "node:fs";
import handler from "./api/voice-transcribe.js";

const index=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const capture=fs.readFileSync(new URL("./server-voice-capture.js",import.meta.url),"utf8");
const serviceWorker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const packageJson=JSON.parse(fs.readFileSync(new URL("./package.json",import.meta.url),"utf8"));

assert.match(index,/server-voice-capture\.js/);
assert.match(index,/serverVoiceCapturePreferred\(\)/);
assert.match(index,/processBrowserVoiceTranscript\(context,transcript\)/);
assert.match(capture,/SILENCE_MS=1000/);
assert.match(capture,/getUserMedia\(\{audio:/);
assert.match(capture,/track=>track\.stop\(\)/);
assert.match(capture,/\/api\/voice-transcribe/);
assert.match(capture,/ai-gateway-transcription\.v1/);
assert.match(capture,/transcription-stream\.start/);
assert.match(capture,/transcription-stream\.audio-done/);
assert.match(capture,/TARGET_RATE=24000/);
assert.doesNotMatch(capture,/new MediaRecorder/);
assert.match(serviceWorker,/server-voice-capture\.js/);
assert.equal(packageJson.dependencies.ai,"7.0.92");
assert.equal(packageJson.dependencies["@ai-sdk/gateway"],"4.0.74");

function response(){
  return{statusCode:200,headers:{},payload:null,setHeader(key,value){this.headers[key]=value},status(code){this.statusCode=code;return this},json(value){this.payload=value;return this},send(value){this.payload=value;return this}};
}

const previousGatewayKey=process.env.AI_GATEWAY_API_KEY,previousFetch=globalThis.fetch;
process.env.AI_GATEWAY_API_KEY="test-gateway-key";
try{
  let tokenBody=null;
  globalThis.fetch=async(url,options)=>{
    tokenBody=JSON.parse(options.body);
    return new Response(JSON.stringify({token:"vcst_test",expiresAt:1234567890}),{status:200,headers:{"Content-Type":"application/json"}});
  };
  const token=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{action:"stream-token"}},token);
  assert.equal(token.statusCode,200);
  assert.equal(token.payload.model,"openai/gpt-realtime-whisper");
  assert.equal(token.payload.token,"vcst_test");
  assert.match(token.payload.url,/transcription-model/);
  assert.deepEqual(tokenBody,{model:"openai/gpt-realtime-whisper",routeKind:"transcription",expiresIn:300});

  const attempts=[];
  globalThis.fetch=async(url,options)=>{
    const body=JSON.parse(options.body);attempts.push(body.model);
    if(body.model==="openai/gpt-realtime-whisper")return new Response(JSON.stringify({error:{message:"forbidden"}}),{status:403,headers:{"Content-Type":"application/json"}});
    return new Response(JSON.stringify({token:"vcst_google",expiresAt:1234567890}),{status:200,headers:{"Content-Type":"application/json"}});
  };
  const fallback=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{action:"stream-token"}},fallback);
  assert.equal(fallback.statusCode,200);
  assert.equal(fallback.payload.model,"google/gemini-3.5-transcribe-live");
  assert.deepEqual(attempts,["openai/gpt-realtime-whisper","google/gemini-3.5-transcribe-live"]);

  const invalid=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{}},invalid);
  assert.equal(invalid.statusCode,422);
  assert.equal(invalid.payload.error,"AUDIO_REQUIRED");

  let receivedAuthorization="",receivedModel="",receivedLanguage="",receivedUrl="";
  globalThis.fetch=async(url,options)=>{
    receivedUrl=String(url);
    receivedAuthorization=options.headers.authorization||options.headers.Authorization;
    receivedModel=options.headers["ai-model-id"];
    receivedLanguage=JSON.parse(options.body).providerOptions.openai.language;
    return new Response(JSON.stringify({text:"Hoyo cuatro, cuatro. Hoyo ocho, tres. Hoyo nueve, cuatro.",language:"es"}),{status:200,headers:{"Content-Type":"application/json"}});
  };
  const ok=response();
  await handler({method:"POST",headers:{origin:"https://epg-caddy.vercel.app",host:"epg-caddy.vercel.app"},body:{audioBase64:Buffer.from("test-audio").toString("base64"),mimeType:"audio/mp4",context:"round",players:"Jaime"}},ok);
  assert.equal(ok.statusCode,200);
  assert.equal(ok.payload.transcript,"Hoyo cuatro, cuatro. Hoyo ocho, tres. Hoyo nueve, cuatro.");
  assert.match(receivedUrl,/ai-gateway\.vercel\.sh\/v4\/ai\/transcription-model/);
  assert.equal(receivedAuthorization,"Bearer test-gateway-key");
  assert.equal(receivedModel,"openai/gpt-4o-mini-transcribe");
  assert.equal(receivedLanguage,"es");
}finally{
  globalThis.fetch=previousFetch;
  if(previousGatewayKey===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGatewayKey;
}

console.log("V373_SERVER_VOICE_TRANSCRIPTION PASS");
