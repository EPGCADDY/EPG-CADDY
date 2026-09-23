import fs from "node:fs";
import assert from "node:assert/strict";
const app=fs.readFileSync("index-grupal.html","utf8");
assert(app.includes("function roundHasRecordedScores"),"Falta detector de scores para cambio de modalidad");
assert(app.includes("function canChangeConfiguredRoundMode"),"Falta guard de cambio de modalidad");
assert(!app.includes("function selectGeneralRoundMode(mode){\n  if(rosterEditMode)return false;"),"No debe bloquear cambio de modalidad sólo por editar ronda");
assert(app.includes('round.mode=draftRoundMode;round.tournament=draftTournament;round.sideGames=draftSideGames();'),"Editar ronda debe persistir la nueva modalidad");
assert(app.includes('$("setupStatus").textContent="MODALIDAD EDITABLE · LOS SCORES EXISTENTES SE CONSERVAN";'),"Falta confirmación de conservación de scores al cambiar modalidad");
assert(!app.includes("PARA CAMBIAR MODALIDAD DESPUÉS DE REGISTRAR SCORES, INICIA UNA NUEVA RONDA"),"No debe bloquear modalidad cuando ya existen scores");
console.log("PASS LAB modality change with recorded scores preserved");

// A previous Stableford entry URL must not override the current round mode.
const newRoundRoute=app.match(/\$\("newRoundButton"\)\.addEventListener\("click",\(\)=>((?:isStablefordRound)[^;]+)\);/);
assert(newRoundRoute,"Missing new-round control");
for(const activeStableford of [false,true])for(const emergencyEntry of [false,true]){
  const route=new Function("isStablefordRound","sfEmergency","openFreshStablefordSetup","openNewRoundDraft",`return ${newRoundRoute[1]}`);
  assert.equal(route(()=>activeStableford,emergencyEntry,()=>"stableford",()=>"general"),activeStableford?"stableford":"general");
}
console.log("PASS new round follows active mode, independent of old Stableford entry URL");
