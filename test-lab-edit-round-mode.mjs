import fs from "node:fs";
import assert from "node:assert/strict";
const app=fs.readFileSync("index-grupal.html","utf8");
assert(app.includes("function roundHasRecordedScores"),"Falta detector de scores para cambio de modalidad");
assert(app.includes("function canChangeConfiguredRoundMode"),"Falta guard seguro de cambio de modalidad");
assert(!app.includes("function selectGeneralRoundMode(mode){\n  if(rosterEditMode)return false;"),"No debe bloquear cambio de modalidad sólo por editar ronda");
assert(app.includes('round.mode=draftRoundMode;round.tournament=draftTournament;round.sideGames=draftSideGames();'),"Editar ronda debe persistir la nueva modalidad");
assert(app.includes("PARA CAMBIAR MODALIDAD DESPUÉS DE REGISTRAR SCORES, INICIA UNA NUEVA RONDA"),"Falta aviso cuando ya hay scores");
console.log("PASS LAB pre-score modality change from registration");
