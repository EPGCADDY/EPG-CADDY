import assert from "node:assert/strict";
import fs from "node:fs";
import speechHandler,{cedarGatewayPayload,cedarSpeechPayload,sanitizeSpeechRequest} from "./api/voice-speech.js";
import {formatStructuredTrafficAnswer,formatStructuredWeatherAnswer,universalResponseProfile} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./candidate-index-grupal.html",import.meta.url),"utf8");
const universal=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const speech=fs.readFileSync(new URL("./api/voice-speech.js",import.meta.url),"utf8");

assert.match(html,/V363-RECORDED-MOBILE-BEHAVIOR-20260828/);
assert.match(html,/FISH-AUDIO-S2\.1-PRO-FREE-ES-419-0\.90/);

for(const contract of [
  'aiUniversalRemember("user",transcript,[],{visible:false})',
  'aiUniversalRemember("assistant",finishedConversationText,aiUniversalPendingSources,{visible:false})',
  'submitAiUniversalText(clean,{voiceOnly:true})',
  'aiUniversalHistory.filter(item=>item.visible!==false)',
  'responseMode:voiceOnly?"voice":"text"'
])assert.ok(html.includes(contract),`Falta contrato voz sin texto: ${contract}`);
assert.match(html,/function preferredApprovedFemaleVoice/);
assert.match(html,/function waitForPreferredApprovedFemaleVoice\(timeoutMs=4000\)/);
assert.match(html,/const AI_UNIVERSAL_VOICE_SPEED=1\.15/);
assert.match(html,/if\(!voice\)return false/);

assert.deepEqual(sanitizeSpeechRequest({text:"  Hola\n mundo  ",language:"es-GT<script>"}),{text:"Hola mundo",language:"es-GTscript"});
const direct=cedarSpeechPayload("Respuesta confiable.","es-GT");
assert.equal(direct.model,"gpt-4o-mini-tts");
assert.equal(direct.voice,"onyx");
assert.equal(direct.speed,.9);
assert.match(direct.instructions,/Locutor masculino adulto/);
const gateway=cedarGatewayPayload("Respuesta confiable.","es-GT");
assert.equal(gateway.language,"es-419");
assert.equal(gateway.speed,.9);
assert.equal(Object.hasOwn(gateway,"voice"),false);
assert.match(gateway.instructions,/español latinoamericano es-419/);
assert.match(speech,/ai-model-id":GATEWAY_SPEECH_MODEL/);
assert.match(speech,/fish-audio\/s2\.1-pro-free/);
assert.match(speech,/sin ceceo español/);
assert.match(speech,/Nunca uses acento de España/);
assert.match(html,/if\(await speakAiUniversalApprovedFemaleVoice\(clean,\{resumeConversation\}\)\)return true/);
assert.doesNotMatch(speech,/openai\/tts-1-hd|GATEWAY_VOICE="echo"/);

function responseRecorder(){return{statusCode:0,headers:{},body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},send(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousOpenAI=process.env.OPENAI_API_KEY,previousGateway=process.env.AI_GATEWAY_API_KEY;
const calls=[];
process.env.OPENAI_API_KEY="direct-test";process.env.AI_GATEWAY_API_KEY="gateway-test";
globalThis.fetch=async(url,options)=>{
  calls.push({url:String(url),options});
  return{ok:true,status:200,json:async()=>({audio:Buffer.from("cedar-audio").toString("base64"),warnings:[]})};
};
try{
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{text:"Respuesta confiable.",language:"es-GT"}},res=responseRecorder();
  await speechHandler(req,res);
  assert.equal(res.statusCode,200);
  assert.equal(res.headers["Content-Type"],"audio/mpeg");
  assert.equal(Buffer.isBuffer(res.body),true);
  assert.equal(res.body.toString(),"cedar-audio");
  assert.equal(calls.length,1);
  assert.equal(calls[0].url,"https://ai-gateway.vercel.sh/v4/ai/speech-model");
  assert.equal(calls[0].options.headers["ai-model-id"],"fish-audio/s2.1-pro-free");
  assert.equal(JSON.parse(calls[0].options.body).language,"es-419");
  assert.equal(Object.hasOwn(JSON.parse(calls[0].options.body),"voice"),false);
  assert.equal(res.headers["X-GSCG-Voice"],"s2.1-es-419");
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
assert.match(universal,/con la misma profundidad que tendría por texto/);
assert.match(universal,/const UNIVERSAL_TIMEOUT_MS=6_875/);
assert.match(universal,/const responseProfile=baseResponseProfile/);
assert.doesNotMatch(universal,/Math\.ceil\(baseResponseProfile\.maxOutputTokens\/2\)/);
assert.match(speech,/controller\.abort\(\),22_500/);
assert.deepEqual(universalResponseProfile("Analiza a fondo causas, riesgos, alternativas y dame una recomendación accionable."),{reasoningEffort:"medium",maxOutputTokens:3200,depth:"deep"});
assert.deepEqual(universalResponseProfile("¿Cuál es la capital de Italia?"),{reasoningEffort:"low",maxOutputTokens:700,depth:"brief"});

console.log("PASS V356/V407-R33 · voz V378 preservada; profundidad de AI Universal equivalente en voz y texto");
