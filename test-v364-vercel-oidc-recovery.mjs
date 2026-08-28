import assert from "node:assert/strict";
import fs from "node:fs";
import {resolveGatewayToken} from "./api/_lib/vercel-gateway-auth.js";
import {requestUniversalResponse} from "./api/universal-ai.js";

const universal=fs.readFileSync("api/universal-ai.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");

assert.match(universal,/await resolveGatewayToken\(gatewayToken\)/);
assert.match(speech,/gatewayToken=await resolveGatewayToken\(\)/);
assert.match(speech,/"ai-speech-model-specification-version":"4"/);
assert.match(speech,/"ai-gateway-protocol-version":"0\.0\.1"/);
assert.match(speech,/"ai-gateway-auth-method":authMethod/);
assert.equal(await resolveGatewayToken(undefined,{env:{AI_GATEWAY_API_KEY:" managed-key "},oidcGetter:()=>{throw new Error("must not run")}}),"managed-key");
assert.equal(await resolveGatewayToken(undefined,{env:{},oidcGetter:()=>"oidc-token"}),"oidc-token");
assert.equal(await resolveGatewayToken("",{env:{AI_GATEWAY_API_KEY:"ignored"},oidcGetter:()=>"ignored"}),"");

const calls=[];
const fetchImpl=async(url,options)=>{
  calls.push({url,options});
  if(url.includes("api.openai.com"))return{
    ok:false,status:429,
    headers:{get:()=>null},
    json:async()=>({error:{code:"credit_balance_exhausted"}})
  };
  return{
    ok:true,status:200,
    headers:{get:()=>null},
    json:async()=>({model:"gateway-test",output:[{type:"message",content:[{type:"output_text",text:"Respuesta recuperada."}]}]})
  };
};
const result=await requestUniversalResponse({input:[{role:"user",content:"Prueba"}]},{
  apiKey:"direct-key",
  gatewayToken:"oidc-token",
  deadlineMs:Date.now()+10_000,
  fetchImpl,
  sleepImpl:async()=>{}
});
assert.equal(result.ok,true);
assert.equal(result.gateway,true);
assert.equal(calls.filter(call=>call.url.includes("api.openai.com")).length,3);
assert.equal(calls.filter(call=>call.url.includes("ai-gateway.vercel.sh")).length,1);
assert.equal(calls.at(-1).options.headers.Authorization,"Bearer oidc-token");

console.log("PASS V364 · OIDC dinámico recupera AI UNIVERSAL y voz sin exponer claves");
