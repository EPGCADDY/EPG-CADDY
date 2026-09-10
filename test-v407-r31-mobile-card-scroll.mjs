import fs from "node:fs";
import assert from "node:assert/strict";

const source=fs.readFileSync("index-grupal.html","utf8");

assert.match(source,/gscg-green-outline-homogeneity-v407-r32/);
assert.match(source,/html,body,\.app,\.card-shell\{background:#000!important\}/);
assert.match(source,/\.card-shell\{[\s\S]*overflow-x:scroll!important;[\s\S]*-webkit-overflow-scrolling:touch!important;[\s\S]*touch-action:pan-x pan-y!important;/);
assert.match(source,/\.card-shell>\.scorecard\{display:table!important;max-width:none!important\}/);
assert.match(source,/meta name="gscg-release" content="V407-R32-MANUAL-CANDIDATE-TWO-COLUMNS-20260910"/);

console.log("PASS V407 R31 · Score Card móvil conserva fondo negro y desplazamiento horizontal táctil");
