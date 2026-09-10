import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("candidate-index-grupal.html","utf8");
assert.match(html,/V407-R32-MANUAL-CANDIDATE-TWO-COLUMNS-20260910/);
assert.match(html,/@media\(max-width:800px\)[\s\S]*?\.game-mode-columns\{grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)\}/);
assert.doesNotMatch(html,/\.game-mode-columns\{grid-template-columns:1fr\}/);
for(const id of ["normalRoundButton","matchPlayRoundButton","fourBallRoundButton","stablefordModeOption","skinsRoundButton","wolfRoundButton","vegasRoundButton","universalesRoundButton","provisionalScorecardButton","tournamentLiveHome"]){
  assert.match(html,new RegExp(`id=["']${id}["']`),`falta modalidad o función ${id}`);
}
assert.match(html,/\.game-mode-column>div,\.game-mode-column \.course-option\{width:100%;min-width:0\}/);
console.log("PASS V407 R32 · modalidades y funciones se conservan en dos columnas móviles");
