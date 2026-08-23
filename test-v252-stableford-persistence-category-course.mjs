import assert from "node:assert/strict";
import fs from "node:fs";
import stableford from "./stableford.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V280-LOCAL-HISTORY-INSIGHTS-20260823/);
assert.doesNotMatch(html,/sfEmergencyClean/);
assert.doesNotMatch(html,/round\.players=\["Jaime","Junior","Fito","Henry"\]/);
assert.match(html,/let stablefordSetupCategory=null,stablefordSetupCourseKey=null/);
assert.match(html,/let round=sfEmergency\?\(latestStoredRound\("stableford"\)\|\|blankRound\(\)\):demoControlManual\?\(readStoredRound\(DEMO_CONTROL_MANUAL_KEY\)\|\|blankRound\(\)\):loadRound\(\)/);
assert.match(html,/let sfRestoredActive=!!\(sfEmergency&&round\.configured&&round\.mode==="stableford"\)/);
assert.match(html,/if\(round\.mode==="stableford"\)localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,payload\);/);
assert.match(html,/else\{\s*localStorage\.setItem\(STORAGE_KEY,payload\);\s*localStorage\.setItem\(STORAGE_BACKUP_KEY,payload\);\s*\}/);

for(const course of ["pulte","country_club","san_isidro","mayan_golf"]){
  assert.match(html,new RegExp(`data-stableford-course="${course}"`),`Falta campo ${course}`);
}
assert.match(html,/data-stableford-category="senior">SENIOR · BLANCAS/);
assert.match(html,/data-stableford-category="super_senior">SÚPER SENIOR · AMARILLAS/);
assert.deepEqual(stableford.categoryConfig("senior"),{key:"senior",label:"SENIOR",handicap:0,tee:"Blanco",rankingPlaces:5,captainChoices:3});
assert.equal(stableford.categoryConfig("super_senior").tee,"Amarillo");
for(const course of Object.values(stableford.TOURNAMENT_COURSES)){
  assert.equal(course.tees.Blanco.yds.length,18);
  assert.equal(course.tees.Amarillo.yds.length,18);
  assert.notDeepEqual(course.tees.Blanco.yds,course.tees.Amarillo.yds);
}

assert.match(html,/function openFreshStablefordSetup\(\)/);
assert.match(html,/try\{localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)\}catch\{\}/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\);localStorage\.removeItem\(STORAGE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ROUND_ARCHIVE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_SERIES_KEY\)/);
assert.match(html,/\$\("newRoundButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\|\|sfEmergency\?openFreshStablefordSetup\(\):openNewRoundDraft\(\)\)/);
assert.match(html,/if\(!round\.configured\)\{\s*if\(sfEmergency\)window\.addEventListener\("DOMContentLoaded",openFreshStablefordSetup,\{once:true\}\)/);
assert.match(html,/if\(!GSCStableford\.isAllowedCourse\(stablefordSetupCourseKey\)\)return fail\("SELECCIONA EL CAMPO"\)/);
assert.match(html,/if\(!cfg\)return fail\("SELECCIONA SENIOR O SÚPER SENIOR"\)/);
assert.match(html,/if\(!names\.length\)return fail\("INGRESA AL MENOS UN JUGADOR"\)/);
assert.match(html,/names\.slice\(0,6\)/);
assert.match(html,/tee:cfg\.tee/);

console.log("PASS V252 · persistencia normal, NUEVA RONDA limpia, 4 campos y categorías por tee");
