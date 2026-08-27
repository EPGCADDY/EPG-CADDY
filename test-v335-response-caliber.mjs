import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{isDirectWeatherQuery,requestUniversalResponse,universalResponseProfile} from "./api/universal-ai.js";
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
  apiKey:"test-key",deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async(_url,options)=>{
    const body=JSON.parse(options.body);retryCalls.push(body.model);
    if(retryCalls.length<3)return{ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"rate_limit_exceeded"}})};
    return{ok:true,status:200,headers:{get:()=>null},json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"Respuesta recuperada con calibre completo."}]}]})};
  }
});
assert.equal(recovered.ok,true,"Dos límites 429 deben recuperarse automáticamente");
assert.deepEqual(retryCalls,["gpt-5.6","gpt-5.4","gpt-5.6"],"La recuperación debe alternar el modelo antes del último reintento");

const exhausted=await requestUniversalResponse({model:"gpt-5.6",input:[{role:"user",content:"Consulta estratégica"}]},{
  apiKey:"test-key",deadlineMs:Date.now()+5_000,sleepImpl:async()=>{},fetchImpl:async()=>({ok:false,status:429,headers:{get:name=>name.toLowerCase()==="retry-after"?"0":null},json:async()=>({error:{code:"rate_limit_exceeded"}})})
});
assert.equal(exhausted.ok,false);
assert.equal(exhausted.retryable,true);
assert.equal(exhausted.status,429);

for(const recoveryToken of ["OPENAI_ATTEMPTS","UNIVERSAL_AI_RATE_LIMITED","RECUPERANDO CONEXIÓN CON AI UNIVERSAL ∞"]){
  assert.ok(api.includes(recoveryToken)||html.includes(recoveryToken),`Falta control permanente de recuperación: ${recoveryToken}`);
}

console.log("PASS V335 · calibre adaptable: directo, sustantivo, no infantil, con límites, acciones y fuentes");
