import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.doesNotMatch(html,/round\.players=\["Jaime","Junior","Fito","Henry"\]/);
assert.doesNotMatch(stable,/const names=\["Jaime","Junior","Fito","Henry"\]/);
assert.match(html,/if\(sfEmergencyClean\)\{localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\);round=blankRound\(\)\}/);
assert.match(html,/round\.players=\[\];localStorage\.setItem\(STORAGE_KEY/);
assert.match(html,/return startStablefordRoundMode\(true\)/);
assert.match(html,/function stablefordManualPlayerRows\(selectedHole\)/);
assert.match(html,/Array\.from\(\{length:6\},\(_,i\)=>/);
assert.match(html,/placeholder="JUGADOR \$\{i\+1\}"/);
assert.match(html,/function registerStablefordRoster\(manual\)/);
assert.match(html,/INGRESA AL MENOS UN JUGADOR/);
assert.match(html,/MÁXIMO 6 JUGADORES/);
assert.match(html,/NO REPITAS EL MISMO JUGADOR/);
assert.match(html,/id="sfTournamentName"/);
assert.match(html,/data-sf-card-category="senior"/);
assert.match(html,/data-sf-card-category="super_senior"/);
for(const field of ["courseKey:round.courseKey","course:round.course","tournament:round.tournament","playedAt:round.createdAt","officiallyClosedAt:closedAt","players:JSON.parse(JSON.stringify(round.players))"]){
  assert.ok(html.includes(field),`Falta historial Stableford: ${field}`);
}
assert.match(html,/snapshot\.sha256=await window\.GSCRoundClosure\.sha256\(snapshot\)/);
assert.match(html,/archiveRoundSnapshot\(round\)/);

console.log("PASS Stableford limpio: 1–6 jugadores y snapshot histórico completo");
