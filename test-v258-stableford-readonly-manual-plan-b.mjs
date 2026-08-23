import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stableford=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.match(html,/V272-DEFINITIVE-OFFICIAL-CARD-20260823/);

// Registro: aquí sí se seleccionan torneo y categoría antes de iniciar la ronda.
assert.match(stableford,/id="stablefordTournamentName"/);
assert.match(html,/data-stableford-category="senior"/);
assert.match(html,/data-stableford-category="super_senior"/);
assert.match(html,/stablefordCategory:stablefordSetupCategory/);
assert.match(html,/tournament:tournamentName\?\{name:tournamentName\}:null/);

// Tarjeta: los metadatos llegan desde la ronda y son indicadores, nunca controles editables.
assert.match(html,/const detailOne=stable\?\{label:"TORNEO",value:round\.tournament\?\.name\|\|STABLEFORD_DEFAULT_TOURNAMENT\}/);
assert.match(html,/const detailTwo=stable\?\{label:"CATEGORÍA",value:`\$\{cfg\.label\} · \$\{stablefordTeeLabel\(cfg\)\}`\}/);
assert.match(html,/aria-readonly="true"/);
assert.doesNotMatch(html,/data-sf-card-category=/);
assert.doesNotMatch(html,/changeStablefordCardCategory/);

// Captura manual: un solo control para General/Stableford y el mismo escritor que voz.
assert.match(html,/id="roundManualEntry"/);
assert.match(html,/CONTROL MANUAL · \$\{stable\?"STABLEFORD":"GENERAL"\}/);
assert.match(html,/id="roundGridHole"/);
assert.match(html,/class="round-grid-gross"/);
assert.match(html,/id="roundGridEnter"/);
assert.match(html,/manual\.querySelector\("#roundGridEnter"\)\.onclick=saveManualHole/);
assert.match(html,/const result=applyLiteralScores\(\{matched:true,ok:true,entries\}\)/);
assert.match(html,/renderRoundManualEntry\(\);bindRoundManualCells\(\)/);
assert.doesNotMatch(html,/class="sfGridName"/);

console.log("PASS V258/V267 · metadatos bloqueados y control manual operacional único");
