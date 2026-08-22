import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V201-STABLEFORD-CLEAN-SIX-PLAYER-20260822"/);
for(const id of [
  "stablefordSetupOverlay","stablefordResultOverlay","stablefordSeriesSection",
  "stablefordSeniorTab","stablefordSuperSeniorTab","openStablefordResult"
])assert.match(html,new RegExp(`id="${id}"`),`Falta ${id}`);

assert.match(html,/data-stableford-category="senior">SENIOR/);
assert.match(html,/data-stableford-category="super_senior">S\. SENIOR/);
assert.match(html,/id="stableCourseOption"[^>]*>[\s\S]*?<span>STABLE<\/span>/);
assert.match(html,/Object\.entries\(COURSE_CATALOG\)[\s\S]*?\.join\(""\)\+stableOption/);
assert.doesNotMatch(html,/class="stableford-entry"/);
assert.match(html,/openStablefordSetup\("senior"\)/);
assert.match(html,/names\.slice\(0,6\)/);
assert.match(html,/handicap:0,tee:cfg\.tee/);
assert.match(html,/stablefordTeeLabel\(cfg\)/);
assert.match(html,/row\("gross","GROSS",true\).*row\("points","PUNTOS",false\)/s);
assert.match(html,/Array\.from\(\{length:6\}/);
assert.match(html,/GSCStableford\.pointsFor\(v\.gross,PAR\[v\.hole-1\]\)/);
assert.match(html,/\["x","equis","levanta","levantar","levantada"\]/);
assert.match(html,/CLASIFICACIÓN ACUMULADA · MEJORES 3 DE 4/);
assert.match(html,/RESULTADO OFICIAL STABLEFORD/);
assert.match(html,/stablefordRoundNumber:roundNumber/);
assert.match(html,/bindMicActivation\("headerMic","round"\)/,"El micrófono de scores debe seguir enlazado al motor oficial");
assert.match(stable,/stablefordTournamentName/,"Falta nombre de torneo en el inicio Stableford");
assert.match(stable,/stablefordSetupMic/,"Falta micrófono de registro Stableford");
assert.match(stable,/fireMicActivation\("setup",e\)/,"El micrófono Stableford debe reutilizar el motor oficial de registro");
assert.match(stable,/round\.tournament=value\?\{name:value\}:null/,"El nombre del torneo debe persistir en la ronda Stableford");
assert.match(stable,/HCP 0 · MÁXIMO 6 JUGADORES/);

console.log("Stableford UI: tarjeta limpia, torneo, micrófonos, categorías, seis jugadores, Gross/Puntos y clasificación verificados.");
