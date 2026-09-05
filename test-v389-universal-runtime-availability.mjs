import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{requestUniversalResponse} from "./api/universal-ai.js";

const api=fs.readFileSync("api/universal-ai.js","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

function response(){return{headers:{},statusCode:0,body:null,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}}}
function request(query,appContext={}){return{method:"POST",headers:{host:"epg-caddy-lab-v363-recovery.vercel.app"},body:{query,responseMode:"voice",history:[],appContext}}}

const gatewayCalls=[];
const gatewayOnly=await requestUniversalResponse({input:[{role:"user",content:"¿Cuál es la capital de Francia?"}]},{
  apiKey:"",gatewayToken:"oidc-preview-token",preferGateway:true,deadlineMs:Date.now()+5_000,
  fetchImpl:async(url,options)=>{gatewayCalls.push({url:String(url),options});return{ok:true,status:200,headers:{get:()=>null},json:async()=>({model:"gateway-test",output:[{type:"message",content:[{type:"output_text",text:"París es la capital de Francia."}]}]})}}
});
assert.equal(gatewayOnly.ok,true);
assert.equal(gatewayOnly.gateway,true);
assert.deepEqual(gatewayCalls.map(call=>call.url),["https://ai-gateway.vercel.sh/v1/responses"]);

const originalFetch=globalThis.fetch;
const originalOpenAI=process.env.OPENAI_API_KEY,originalGateway=process.env.AI_GATEWAY_API_KEY,originalOidc=process.env.VERCEL_OIDC_TOKEN;
try{
  delete process.env.OPENAI_API_KEY;delete process.env.AI_GATEWAY_API_KEY;process.env.VERCEL_OIDC_TOKEN="oidc-preview-token";
  globalThis.fetch=async(url,options)=>{
    if(String(url).includes("open-meteo.com"))throw new Error("Weather upstream 500");
    assert.match(String(url),/ai-gateway\.vercel\.sh/);
    return{ok:true,status:200,headers:{get:()=>null},json:async()=>({model:"gateway-test",output:[{type:"message",content:[{type:"output_text",text:"París es la capital de Francia."}]}]})};
  };
  const weatherRes=response();
  await handler(request("¿Cómo está el clima ahora?",{course:"El Pulté",mode:"general",weather:{location:"El Pulté",condition:"nublado",observedAt:"23:45",temperatureC:18.2,feelsLikeC:20.3,rainProbability:0,windKmh:4.5},weatherOrigin:{location:"El Pulté",latitude:14.5,longitude:-90.5}}),weatherRes);
  assert.equal(weatherRes.statusCode,200,"Una caída transitoria de Open-Meteo no debe romper la conversación");
  assert.equal(weatherRes.body.ok,true);assert.equal(weatherRes.body.degraded,true);
  assert.match(weatherRes.body.answer,/Último clima disponible/);assert.match(weatherRes.body.answer,/no respondió/i);

  const generalRes=response();
  await handler(request("¿Cuál es la capital de Francia?",{course:"El Pulté",mode:"general"}),generalRes);
  assert.equal(generalRes.statusCode,200,"Preview sin OPENAI_API_KEY debe responder mediante OIDC Gateway");
  assert.equal(generalRes.body.ok,true);assert.match(generalRes.body.answer,/París/);
}finally{
  globalThis.fetch=originalFetch;
  if(originalOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalOpenAI;
  if(originalGateway===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=originalGateway;
  if(originalOidc===undefined)delete process.env.VERCEL_OIDC_TOKEN;else process.env.VERCEL_OIDC_TOKEN=originalOidc;
}

assert.doesNotMatch(api,/if\(!apiKey\)return res\.status\(500\)/);
assert.match(api,/for\(let index=0;apiKey&&index<OPENAI_ATTEMPTS\.length;index\+\+\)/);
assert.match(api,/formatCachedWeatherFallback/);
assert.match(worker,/v389-universal-runtime-availability/);
console.log("PASS V389 · Gateway OIDC sin clave directa y clima degradado conservan respuesta de voz");
