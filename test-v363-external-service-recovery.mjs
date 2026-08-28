import assert from "node:assert/strict";
import fs from "node:fs";
import {resolveGatewayToken} from "./api/_lib/vercel-gateway-auth.js";
import {computeTrafficRoute,trafficProviderFailure} from "./api/_lib/traffic.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/V363-EXTERNAL-SERVICE-RECOVERY-20260828/);
assert.match(html,/V363-OIDC-TRAFFIC-DIAGNOSTICS-20260828/);
assert.match(worker,/gscg-mobile-v363-external-service-recovery/);
assert.ok(audit.includes("test-v363-external-service-recovery.mjs"));
assert.match(universal,/await resolveGatewayToken\(gatewayToken\)/);
assert.match(speech,/gatewayToken=await resolveGatewayToken\(\)/);

assert.equal(await resolveGatewayToken(undefined,{env:{AI_GATEWAY_API_KEY:" managed-key "},oidcGetter:()=>{throw new Error("must not run")}}),"managed-key");
assert.equal(await resolveGatewayToken(undefined,{env:{},oidcGetter:()=>"oidc-token"}),"oidc-token");
assert.equal(await resolveGatewayToken("",{env:{AI_GATEWAY_API_KEY:"ignored"},oidcGetter:()=>"ignored"}),"");

assert.deepEqual(trafficProviderFailure({status:403},{error:{code:403,status:"PERMISSION_DENIED",message:"private provider detail"}}),{status:403,providerStatus:"PERMISSION_DENIED",providerCode:403});
const warnings=[],originalWarn=console.warn;
console.warn=(...parts)=>warnings.push(parts.join(" "));
try{
  const result=await computeTrafficRoute({origin:"SECRET ORIGIN",destination:"SECRET DESTINATION"},{apiKey:"SECRET KEY",fetchImpl:async()=>({ok:false,status:403,json:async()=>({error:{code:403,status:"PERMISSION_DENIED",message:"API key SECRET KEY"}})})});
  assert.equal(result.error,"TRAFFIC_UPSTREAM_UNAVAILABLE");
}finally{console.warn=originalWarn}
assert.match(warnings.join("\n"),/PERMISSION_DENIED/);
assert.doesNotMatch(warnings.join("\n"),/SECRET|ORIGIN|DESTINATION|API key/);

console.log("PASS V363 · OIDC dinámico + diagnóstico privado de Google Routes");
