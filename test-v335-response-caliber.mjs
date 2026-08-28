import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{formatLocalGolfStrategyAnswer,isDirectWeatherQuery,isGolfStrategyQuery,requestUniversalResponse,universalResponseProfile} from "./api/universal-ai.js";
import assistant from "./voice-assistant.js";

const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const normalizeSpeech=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const guardSource=html.slice(html.indexOf("function aiUniversalCommandShouldRemainLocal"),html.indexOf("\nfunction routeAiUniversalAppText"));
const commandShouldRemainLocal=new Function("normalizeSpeech",`${guardSource};return aiUniversalCommandShouldRemainLocal`)(normalizeSpeech);

assert.deepEqual(universalResponseProfile("Gracias"),{reasoningEffort:"low",maxOutputTokens:700,depth:"brief"});
assert.deepEqual(universalResponseProfile("¿Qué ventajas tiene caminar el campo?"),{reasoningEffort:"medium",maxOutputTokens:2400,depth:"standard"});
assert.deepEqual(universalResponseProfile("Analiza a fondo las opciones, riesgos y alternativas antes de recomendarme una decisión."),{reasoningEffort:"medium",maxOutputTokens:3200,depth:"deep"});
const complexGolfQuestion="Analiza cómo el viento cruzado, la humedad y la elevación afectan la selección de palo para un golpe de 140 yardas. Compara riesgos y dame una recomendación.";
assert.equal(isDirectWeatherQuery(complexGolfQuestion),false,"Una consulta estratégica con viento debe llegar al modelo, no al pronóstico");
assert.equal(assistant.parse(complexGolfQuestion).id,"course_info","La prueba debe reproducir el secuestro anterior por la palabra yardas");
assert.equal(commandShouldRemainLocal(complexGolfQuestion,assistant.parse(complexGolfQuestion)),false,"Una consulta analítica debe llegar al modelo aunque contenga yardas");
assert.equal(commandShouldRemainLocal("¿Cómo puedo ver las yardas del campo?",assistant.parse("¿Cómo puedo ver las yardas del campo?")),true,"Una consulta corta y explícita de la aplicación debe seguir local");
assert.equal(commandShouldRemainLocal("Abre el manual de funciones",assistant.parse("Abre el manual de funciones")),true,"Una orden ejecutable debe seguir local");
for(const contract of [
  "No uses tono infantil",
  "explica causas o mecanismo",
  "separa hechos de estimaciones",
  "supuestos, riesgos y alternativas",
  "recomendación o siguiente paso accionable",
  "menciona fecha o momento de consulta"
])assert.ok(api.includes(contract),`Falta contrato de calibre: ${contract}`);

const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
let providerPayload;
globalThis.fetch=async(_url,options)=>{
  providerPayload=JSON.parse(options.body);
  return{ok:true,json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"Conclusión, evidencia, límite y recomendación."}]}]})};
};
process.env.OPENAI_API_KEY="test-key";
const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"Analiza el efecto del viento, la humedad y mi dispersión; compara opciones, riesgos y dame una recomendación accionable.",history:[]}};
const res={headers:{},statusCode:0,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
try{await handler(req,res)}finally{globalThis.fetch=originalFetch;if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey}
assert.equal(res.statusCode,200);
assert.equal(providerPayload.reasoning.effort,"medium");
assert.equal(providerPayload.max_output_tokens,3200);
assert.match(providerPayload.instructions,/Profundidad solicitada para esta respuesta: deep/);
assert.match(providerPayload.instructions,/fuentes que la aplicación mostrará por separado/);

const retryCalls=[];
const recovered=await requestUniversalResponse({model:"gpt-5.6",input:[{role:"user",content:"Consulta estratégica"}]},{
  apiKey:"test-key",gatewayToken:null,deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async(_url,options)=>{
    const body=JSON.parse(options.body);retryCalls.push(body.model);
    if(retryCalls.length<3)return{ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"rate_limit_exceeded"}})};
    return{ok:true,status:200,headers:{get:()=>null},json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"Respuesta recuperada con calibre completo."}]}]})};
  }
});
assert.equal(recovered.ok,true,"Dos límites 429 deben recuperarse automáticamente");
assert.deepEqual(retryCalls,["gpt-5.6","gpt-5.4","gpt-5.6"],"La recuperación debe alternar el modelo antes del último reintento");

const exhausted=await requestUniversalResponse({model:"gpt-5.6",input:[{role:"user",content:"Consulta estratégica"}]},{
  apiKey:"test-key",gatewayToken:null,deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async()=>({ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"rate_limit_exceeded"}})})
});
assert.equal(exhausted.ok,false);
assert.equal(exhausted.retryable,true);
assert.equal(exhausted.status,429);

const gatewayUrls=[],gatewayBodies=[];
const gatewayRecovered=await requestUniversalResponse({model:"gpt-5.6",input:[{role:"user",content:"Consulta profunda"}],tools:[]},{
  apiKey:"",gatewayToken:"vercel-oidc",deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async(url,options)=>{
    gatewayUrls.push(String(url));gatewayBodies.push(JSON.parse(options.body));
    if(String(url).includes("api.openai.com"))return{ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"credit_balance_exhausted"}})};
    return{ok:true,status:200,headers:{get:()=>null},json:async()=>({model:"anthropic/claude-opus-5",output:[{type:"message",content:[{type:"output_text",text:"Respuesta del Gateway."}]}]})};
  }
});
assert.equal(gatewayRecovered.ok,true,"OIDC debe permitir Gateway aun sin una clave directa configurada");
assert.equal(gatewayRecovered.gateway,true);
assert.equal(gatewayUrls.filter(url=>url.includes("api.openai.com")).length,0,"Con OIDC el Gateway debe responder antes de gastar intentos directos");
assert.equal(gatewayUrls[0],"https://ai-gateway.vercel.sh/v1/responses");
assert.deepEqual(gatewayBodies[0].providerOptions.gateway.models,["openai/gpt-5.6-sol","anthropic/claude-opus-5","google/gemini-3.1-pro-preview"]);

const failoverUrls=[];
const directAfterGateway=await requestUniversalResponse({model:"gpt-5.6",input:[{role:"user",content:"Consulta profunda"}]},{
  apiKey:"direct-key",gatewayToken:"vercel-oidc",deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async(url)=>{
    failoverUrls.push(String(url));
    if(String(url).includes("ai-gateway"))return{ok:false,status:503,headers:{get:()=>null},json:async()=>({error:{code:"gateway_unavailable"}})};
    return{ok:true,status:200,headers:{get:()=>null},json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"Respuesta directa recuperada."}]}]})};
  }
});
assert.equal(directAfterGateway.ok,true,"Una falla del Gateway debe conservar el proveedor directo como recuperación");
assert.deepEqual(failoverUrls,["https://ai-gateway.vercel.sh/v1/responses","https://api.openai.com/v1/responses"]);

const exactStrategicQuestion="Analiza si conviene atacar una bandera a 140 yardas con viento de frente, agua corta y lie húmedo. Dame conclusión, mecanismo, riesgos, límites, alternativa y acciones concretas.";
assert.equal(isGolfStrategyQuery(exactStrategicQuestion),true);
const localStrategy=formatLocalGolfStrategyAnswer(exactStrategicQuestion);
for(const section of ["Conclusión","Mecanismo","Riesgos","Límites","Alternativa segura","Acciones concretas"]){
  assert.match(localStrategy,new RegExp(`\\*\\*${section}`),`Falta ${section} en la recuperación local`);
}
assert.match(localStrategy,/140 yardas/);
assert.match(localStrategy,/8–10 yardas de margen/);

const previousGatewayKey=process.env.AI_GATEWAY_API_KEY,previousOidc=process.env.VERCEL_OIDC_TOKEN;
delete process.env.AI_GATEWAY_API_KEY;delete process.env.VERCEL_OIDC_TOKEN;process.env.OPENAI_API_KEY="empty-credit";
const localReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:exactStrategicQuestion,history:[]}};
const localRes={headers:{},statusCode:0,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
globalThis.fetch=async()=>({ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"credit_balance_exhausted"}})});
try{await handler(localReq,localRes)}finally{
  globalThis.fetch=originalFetch;
  if(previousGatewayKey===undefined)delete process.env.AI_GATEWAY_API_KEY;else process.env.AI_GATEWAY_API_KEY=previousGatewayKey;
  if(previousOidc===undefined)delete process.env.VERCEL_OIDC_TOKEN;else process.env.VERCEL_OIDC_TOKEN=previousOidc;
  if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey;
}
assert.equal(localRes.statusCode,200,"La estrategia de golf no debe quedar muda por saldo externo");
assert.equal(localRes.body.mode,"LOCAL_GOLF_STRATEGY");
assert.match(localRes.body.answer,/Conclusión/);

for(const recoveryToken of ["OPENAI_ATTEMPTS","GATEWAY_MODELS","LOCAL_GOLF_STRATEGY","UNIVERSAL_AI_RATE_LIMITED","RECUPERANDO CONEXIÓN CON AI UNIVERSAL ∞"]){
  assert.ok(api.includes(recoveryToken)||html.includes(recoveryToken),`Falta control permanente de recuperación: ${recoveryToken}`);
}
assert.match(api,/getVercelOidcToken/,"La función runtime debe recuperar el OIDC desde el contexto de Vercel");
assert.match(api,/universal weather followup"\}\)/);
assert.match(api,/\{apiKey,gatewayToken,deadlineMs,label:"universal traffic followup"\}/);

console.log("PASS V335 · calibre adaptable: directo, sustantivo, no infantil, con límites, acciones y fuentes");
