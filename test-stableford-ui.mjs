import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V(?:252-STABLEFORD-PERSISTENCE-CATEGORY-COURSE|253-LIVE-PREVIOUS-ROUND|254-REMOVE-REGISTRATION-GUIDE|255-PLAYER-REGISTRATION-BOXES-CODES|256-MASTER-DATA-PLATFORM|257-STABLEFORD-COURSE-SELECTOR-TITLE|258-STABLEFORD-READONLY-MANUAL-PLAN-B|259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS)-20260822"/);
for(const id of [
  "stablefordSetupOverlay","stablefordResultOverlay","stablefordSeriesSection",
  "stablefordSeniorTab","stablefordSuperSeniorTab","openStablefordResult"
])assert.match(html,new RegExp(`id="${id}"`),`Falta ${id}`);

assert.match(html,/data-stableford-category="senior">SENIOR · BLANCAS/);
assert.match(html,/data-stableford-category="super_senior">SÚPER SENIOR · AMARILLAS/);
assert.match(html,/STABLEFORD_OFFICIAL_HOSTING_URL="https:\/\/epg-caddy-git-stableford-tournament-final-epgcaddys-projects\.vercel\.app\/index-grupal\.html\?stableford_emergency=countryclub&emergency_clean=1&v=259"/);
assert.match(html,/id="stableCourseOption" href="\$\{STABLEFORD_OFFICIAL_HOSTING_URL\}"[^>]*>[\s\S]*?<span>STABLEFORD<\/span>/);
assert.doesNotMatch(html,/closest\("#stableCourseOption"\)[\s\S]{0,180}openFreshStablefordSetup/);
assert.match(html,/Object\.entries\(COURSE_CATALOG\)[\s\S]*?\.join\(""\)\+stableOption/);
assert.doesNotMatch(html,/class="stableford-entry"/);
assert.match(html,/function selectStablefordSetupCategory\(category\)/);
assert.match(html,/function selectStablefordSetupCourse\(courseKey\)/);
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
