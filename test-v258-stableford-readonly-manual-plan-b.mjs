import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stableford=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

assert.match(html,/V(?:258-STABLEFORD-READONLY-MANUAL-PLAN-B|259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS|260-STABLEFORD-ROUND-POINTS-PLAYER-RETURN)-20260822/);

// Registro: aquí sí se seleccionan torneo y categoría antes de iniciar la ronda.
assert.match(stableford,/id="stablefordTournamentName"/);
assert.match(html,/data-stableford-category="senior"/);
assert.match(html,/data-stableford-category="super_senior"/);
assert.match(html,/stablefordCategory:stablefordSetupCategory/);
assert.match(html,/tournament:tournamentName\?\{name:tournamentName\}:null/);

// Tarjeta: ambos datos llegan desde la ronda y son indicadores, nunca controles editables.
assert.match(html,/id="sfTournamentName" aria-readonly="true"/);
assert.match(html,/id="sfCategoryIndicator" aria-readonly="true"/);
assert.doesNotMatch(html,/<input id="sfTournamentName"/);
assert.doesNotMatch(html,/data-sf-card-category=/);
assert.doesNotMatch(html,/changeStablefordCardCategory/);
assert.match(html,/const cfg=stablefordConfig\(\),tournamentName=round\.tournament\?\.name\|\|STABLEFORD_DEFAULT_TOURNAMENT/);
assert.match(html,/\$\{escapeHtml\(`\$\{cfg\.label\} · \$\{stablefordTeeLabel\(cfg\)\}`\)\}/);

// Captura manual: identificación visible y ruta completa HOYO -> GROSS -> ENTER -> guardado.
assert.match(html,/id="stablefordManualEntry"/);
assert.match(html,/aria-label","Puntos de ronda"/);
assert.match(html,/id="stablefordRoundPointsTitle"[^>]*>PUNTOS DE RONDA</);
assert.match(html,/id="sfGridHole"/);
assert.match(html,/class="sfGridGross"/);
assert.match(html,/id="sfGridEnter"/);
assert.match(html,/manual\.querySelector\("#sfGridEnter"\)\.onclick=saveManualHole/);
assert.match(html,/saveEntry\(\{player:p\.name,hole:selectedHole,gross\}\)/);
assert.doesNotMatch(html,/\.sfGridGross,\.sfGridName,#sfTournamentName/);

console.log("PASS V258/V260 · torneo y categoría bloqueados; PUNTOS DE RONDA operativo");
