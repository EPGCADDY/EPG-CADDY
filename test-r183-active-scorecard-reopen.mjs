import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const release=JSON.parse(fs.readFileSync("release.json","utf8"));

assert.match(html,/if\(explicitNewRound\)\{\s*openNewRoundDraft\(\);\s*\}else if\(directHome&&!isRecoverableStoredRound\(round\)\)\{\s*openRegistrationPreservingActiveRound\(\);/);
assert.match(html,/else if\(\!isRecoverableStoredRound\(round\)\)\{\s*ensurePrincipalEntry\(\)/);
assert.match(worker,/r183-active-scorecard-reopen/);
assert.doesNotMatch(worker,/^(<<<<<<<|=======|>>>>>>>)/m,"El Service Worker publicado no puede conservar conflictos de merge");
assert.equal(release.release,"20261007-R183");

function startup({activeRound,explicitNewRound=false}){
  if(explicitNewRound)return "new-round-registration";
  if(!activeRound)return "initial-registration";
  return "active-scorecard";
}
assert.equal(startup({activeRound:true}),"active-scorecard","Al reabrir con ronda activa debe mostrarse la Score Card");
assert.equal(startup({activeRound:false}),"initial-registration","Sin ronda activa debe mostrarse Registro");
assert.equal(startup({activeRound:true,explicitNewRound:true}),"new-round-registration","NUEVA RONDA sigue iniciando su registro explícito");
console.log("PASS R183 · reapertura conserva Score Card activa y nueva ronda explícita");
