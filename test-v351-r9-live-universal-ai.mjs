import assert from "node:assert/strict";
import {requestUniversalResponse} from "./api/universal-ai.js";

const apiKey=process.env.OPENAI_API_KEY||"";
const gatewayToken=process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN||"";

if(!apiKey&&!gatewayToken){
  console.log("DEFER V351-R9 · prueba viva AI Universal sin credenciales en entorno local");
  process.exit(0);
}

const result=await requestUniversalResponse({
  model:"gpt-5.6",
  reasoning:{effort:"low"},
  store:false,
  tools:[],
  tool_choice:"none",
  max_output_tokens:40,
  instructions:"Responde exactamente GATEWAY R9 OK, sin puntuación ni texto adicional.",
  input:[{role:"user",content:"Confirma la ruta viva de AI Universal R9."}]
},{apiKey,gatewayToken,deadlineMs:Date.now()+30_000,label:"universal ai r9 live"});

assert.equal(result.ok,true,`AI Universal viva no disponible: ${result.providerCode||result.status||result.error||"UNKNOWN"}`);
const answer=(result.payload?.output||[]).flatMap(item=>item?.content||[]).filter(item=>item?.type==="output_text").map(item=>item.text||"").join(" ").trim();
assert.match(answer,/GATEWAY R9 OK/i,"La ruta viva respondió, pero no devolvió el texto de control");
console.log(`PASS V351-R9 LIVE · AI Universal 200 · ruta ${result.gateway?"Gateway":"directa"}`);
