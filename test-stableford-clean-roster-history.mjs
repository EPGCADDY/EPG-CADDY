import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.doesNotMatch(html,/round\.players=\["Jaime","Junior","Fito","Henry"\]/);
assert.doesNotMatch(stable,/const names=\["Jaime","Junior","Fito","Henry"\]/);
assert.doesNotMatch(html,/sfEmergencyClean/);
assert.match(html,/let round=sfEmergency\?\(latestStoredRound\("stableford"\)\|\|blankRound\(\)\):loadRound\(\)/);
assert.match(html,/let sfRestoredActive=!!\(sfEmergency&&round\.configured&&round\.mode==="stableford"\)/);
assert.match(html,/function openFreshStablefordSetup\(\)/);
assert.match(html,/localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ROUND_ARCHIVE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_SERIES_KEY\)/);
assert.match(html,/function roundManualPlayerRows\(selectedHole\)/);
assert.match(html,/Array\.from\(\{length:6\},\(_,i\)=>/);
assert.equal((html.match(/<input[^>]+data-stableford-name="[0-5]"/g)||[]).length,6);
assert.match(html,/function updateStablefordSetupValidity/);
assert.match(html,/REGISTRA DE 1 A 6 JUGADORES/);
assert.match(html,/DE 1 A 6 JUGADORES/);
assert.match(html,/ESTÁ REPETIDO EN JUGADOR/);
assert.match(stable,/id="stablefordTournamentName"/);
assert.match(html,/const detailTwo=stable\?\{label:"CATEGORÍA"/);
assert.doesNotMatch(html,/function registerStablefordRoster\(manual\)/,"Los nombres sólo se modifican en el registro, nunca desde score manual");
for(const field of ["courseKey:round.courseKey","course:round.course","tournament:round.tournament","playedAt:round.createdAt","officiallyClosedAt:closedAt","players:JSON.parse(JSON.stringify(round.players))"]){
  assert.ok(html.includes(field),`Falta historial Stableford: ${field}`);
}
assert.match(html,/snapshot\.sha256=await window\.GSCRoundClosure\.sha256\(snapshot\)/);
assert.match(html,/archiveRoundSnapshot\(round\)/);

console.log("PASS Stableford limpio: 1–6 jugadores y snapshot histórico completo");
