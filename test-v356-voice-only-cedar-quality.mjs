import assert from "node:assert/strict";
import fs from "node:fs";
import speechHandler,{cedarGatewayPayload,cedarSpeechPayload,sanitizeSpeechRequest} from "./api/voice-speech.js";
import {formatStructuredTrafficAnswer,formatStructuredWeatherAnswer,universalResponseProfile} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const universal=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("./api/voice-speech.js",import.meta.url),"utf8");

assert.match(html,/V365-MULTIPROVIDER-MALE-VOICE-20260828/);
assert.match(html,/CEDAR-1\.15-MALE-INTERNATIONAL-SPANISH/);
assert.match(worker,/gscg-mobile-v365-multiprovider-male-voice/);

for(const contract of [
  'aiUniversalRemember("user",transcript,[],{visible:false})',
  'aiUniversalRemember("assistant",finishedConversationText,aiUniversalPendingSources,{visible:false})',
  'submitAiUniversalText(clean,{voiceOnly:true})',
  'aiUniversalHistory.filter(item=>item.visible!==false)',
  'responseMode:voiceOnly?"voice":"text"'
])assert.ok(html.includes(contract),`Falta contrato voz sin texto: ${contract}`);
assert.match(html,/function preferredMaleBrowserVoice/);
assert.match(html,/if\(!voice\)return false/);
assert.doesNotMatch(html,/voices\.find\(voice=>String\(voice\.lang\|\|""\).*\|\|voices\.find/,"No se permite seleccionar cualquier voz española porque puede ser femenina");

assert.deepEqual(sanitizeSpeechRequest({text:"  Hola\n mundo  ",language:"es-GT<script>"}),{text:"Hola mundo",language:"es-GTscript"});
const direct=cedarSpeechPayload("Respuesta confiable.","es-GT");
assert.equal(direct.model,"gpt-4o-mini-tts");
assert.equal(direct.voice,"cedar");
assert.equal(direct.speed,1.15);
assert.match(direct.instructions,/Locutor masculino adulto/);
const gateway=cedarGatewayPayload("Respuesta confiable.","onyx");
assert.equal(gateway.voice,"onyx");
assert.equal(gateway.outputFormat,"mp3");
assert.equal(gateway.speed,undefined);
assert.match(html,/player\.playbackRate=VOICE_POLICY\.speed/);
assert.match(speech,/"ai-model-id":model/);
assert.match(speech,/model:"openai\/tts-1",voice:"onyx"/);

function responseRecorder(){return{statusCode:0,headers:{},body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},send(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousOpenAI=process.env.OPENAI_API_KEY,previousGateway=process.env.AI_GATEWAY_API_KEY;
const calls=[];
process.env.OPENAI_API_KEY="direct-test";process.env.AI_GATEWAY_API_KEY="gateway-test";
globalThis.fetch=async(url,options)=>{
  calls.push({url:String(url),options});
  if(String(url).includes("api.openai.com"))return{ok:false,status:429};
  return{ok:true,status:200,json:async()=>({audio:Buffer.from("cedar-audio").toString("base64"),warnings:[]})};
};
try{
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{text:"Respuesta confiable.",language:"es-GT"}},res=responseRecorder();
  await speechHandler(req,res);
  assert.equal(res.statusCode,200);
  assert.equal(res.headers["Content-Type"],"audio/mpeg");
  assert.equal(Buffer.isBuffer(res.body),true);
  assert.equal(res.body.toString(),"cedar-audio");
  assert.equal(calls.length,2);
  assert.equal(calls[1].url,"https://ai-gateway.vercel.sh/v4/ai/speech-model");
  assert.equal(calls[1].options.headers["ai-model-id"],"openai/tts-1");
  assert.equal(JSON.parse(calls[1].options.body).voice,"onyx");
  assert.equal(res.headers["X-GSCG-Voice"],"onyx");
}finally{
  globalThis.fetch=previousFetch;
  if(previousOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousOpenAI;
  if(previousGateway===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGateway;
}

const weather={ok:true,forecastType:"daily",forecastStartDate:"2026-08-28",location:"El Pulté Golf, Guatemala",condition:"llovizna ligera",temperatureMinC:17,temperatureMaxC:28.3,feelsLikeMinC:18.3,feelsLikeMaxC:28.9,windKmh:19.3,precipitationMm:1.6,maxRainProbability:76,rainTiming:{peakProbability:76,peakTime:"18:00"},hourlyForecast:Array.from({length:24},(_,hour)=>({time:`${String(hour).padStart(2,"0")}:00`,rainProbability:hour}))};
const detailedWeather=formatStructuredWeatherAnswer(weather),spokenWeather=formatStructuredWeatherAnswer(weather,{concise:true});
assert.match(detailedWeather,/Probabilidad por hora/);
assert.doesNotMatch(spokenWeather,/Probabilidad por hora|\*\*/);
assert.match(spokenWeather,/Open-Meteo/);
assert.match(spokenWeather,/76% a las 18:00/);
assert.ok(spokenWeather.length<detailedWeather.length/2,"La voz debe ser sustantiva y mucho más concisa que la ficha escrita");

const traffic=formatStructuredTrafficAnswer({ok:true,origin:"El Pulté Golf",destination:"Pradera Concepción",durationMinutes:30,delayMinutes:5,distanceKm:16.1,trafficLevel:"moderado",calculatedAt:"2026-08-28T16:00:00.000Z"});
for(const datum of ["ETA","Demora por tráfico","Distancia","Hora de cálculo","Google Maps Routes","TRAFFIC_AWARE_OPTIMAL"])assert.match(traffic,new RegExp(datum));
assert.match(universal,/responseMode==="voice"/);
assert.match(universal,/tres a seis oraciones concisas pero sustantivas/);
assert.deepEqual(universalResponseProfile("Analiza a fondo causas, riesgos, alternativas y dame una recomendación accionable."),{reasoningEffort:"medium",maxOutputTokens:3200,depth:"deep"});

console.log("PASS V356 · voz hablada sin transcripción, Cedar masculino 1.15, tráfico/clima estructurados y respuesta universal sustantiva");
