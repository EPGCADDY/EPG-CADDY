import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V199-STABLEFORD-INTEGRATED-20260820"/);
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
assert.match(html,/names\.slice\(0,4\)/);
assert.match(html,/handicap:0,tee:cfg\.tee/);
assert.match(html,/stablefordTeeLabel\(cfg\)/);
assert.match(html,/row\("gross","GROSS",true\).*row\("points","PUNTOS",false\)/s);
assert.match(html,/Array\.from\(\{length:4\}/);
assert.match(html,/GSCStableford\.pointsFor\(v\.gross,PAR\[v\.hole-1\]\)/);
assert.match(html,/\["x","equis","levanta","levantar","levantada"\]/);
assert.match(html,/CLASIFICACIÓN ACUMULADA · MEJORES 3 DE 4/);
assert.match(html,/RESULTADO OFICIAL STABLEFORD/);
assert.match(html,/stablefordRoundNumber:roundNumber/);

console.log("Stableford UI: STABLE bajo los campos, categorías, cuatro jugadores, Gross/Puntos y clasificación verificados.");
