import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{universalResponseProfile} from "./api/universal-ai.js";

const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");

assert.deepEqual(universalResponseProfile("Gracias"),{reasoningEffort:"low",maxOutputTokens:700,depth:"brief"});
assert.deepEqual(universalResponseProfile("¿Qué ventajas tiene caminar el campo?"),{reasoningEffort:"medium",maxOutputTokens:2400,depth:"standard"});
assert.deepEqual(universalResponseProfile("Analiza a fondo las opciones, riesgos y alternativas antes de recomendarme una decisión."),{reasoningEffort:"medium",maxOutputTokens:3200,depth:"deep"});
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

console.log("PASS V335 · calibre adaptable: directo, sustantivo, no infantil, con límites, acciones y fuentes");
