import fs from "node:fs";
import assert from "node:assert/strict";
const app=fs.readFileSync("index-grupal.html","utf8");
assert(app.includes("function roundHasRecordedScores"),"Falta detector de scores para cambio de modalidad");
assert(app.includes("function canChangeConfiguredRoundMode"),"Falta guard de cambio de modalidad");
assert(!app.includes("function selectGeneralRoundMode(mode){\n  if(rosterEditMode)return false;"),"No debe bloquear cambio de modalidad sólo por editar ronda");
assert(app.includes('const previousMode=round.mode,previousCourse=round.courseKey||courseKeyForName(round.course);')&&app.includes('round.mode=draftRoundMode;if(previousMode!==round.mode||previousCourse!==draftCourse){round.officiallyClosedAt=null;round.officialSnapshot=null;round.officialVersions=[];round.snapshotHash="";round.status="active";resetFinalCardShare()}round.tournament=draftTournament;round.sideGames=draftSideGames();'),"Editar ronda debe guardar modalidad/campo y reiniciar el cierre oficial si cualquiera cambia");
assert(app.includes('$("setupStatus").textContent="CAMPO Y MODALIDAD EDITABLES · GROSS EXISTENTE CONSERVADO";'),"Falta confirmación de cambio de campo y modalidad con gross conservado");
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

assert(!app.includes('${rosterEditMode?"disabled":""}'),"Los campos no deben quedar bloqueados al editar una ronda");
assert(app.includes('activateCourse(draftCourse);round.courseKey=draftCourse;round.course=selectedCourse.name;'),"Al confirmar el registro se persiste el campo seleccionado en la ronda activa");
assert(app.includes('previousCourse!==draftCourse'),"Cambiar el campo reinicia el cierre oficial para regenerarlo con el nuevo campo");
assert(app.includes('$("courseOptions").addEventListener("change",e=>{if(!e.target.matches(\'input[name="registrationCourse"]\'))return;const key=String(e.target.value||"pulte");draftCourse=COURSE_CATALOG[key]?key:"pulte";activateCourse(draftCourse);'),"La selección de campo desde Registro se aplica y persiste junto con la modalidad");
console.log("PASS registration field change with active-round persistence and official-result refresh");
