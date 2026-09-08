import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/V407-R2-PREMIUM-SCORECARD-ACTIONS-20260908/);
assert.match(html,/--premium-control:52px/);
assert.match(html,/\.round-utility-bar\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(html,/\.round-actions\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(html,/\.round-actions #newRoundButton\{grid-column:1\/-1\}/);
assert.match(html,/\.round-secondary-actions\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(html,/class="scorecard-stage-title"><span>TARJETA DE PUNTUACIÓN<\/span><small>DESLIZA PARA VER TODOS LOS HOYOS<\/small>/);
assert.match(html,/\.scorecard-stage-title\{display:flex;align-items:center;justify-content:space-between/);
assert.match(html,/\.card-shell\{border:1px solid var\(--premium-line\);border-radius:0 0 var\(--premium-radius\) var\(--premium-radius\)/);
assert.match(html,/\.card-shell::-webkit-scrollbar-thumb\{[^}]*background:var\(--lime\)/);
assert.match(html,/\.scorecard th\{background:#080a0a;color:#fff\}\.scorecard td\{background:#020303\}/);
assert.match(html,/@media\(max-width:800px\)[\s\S]*\.round-utility-bar\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(html,/\.new-round-card\{padding:18px 14px;margin:8px auto;border-radius:18px\}/);
assert.match(html,/#roundManualEntry\{margin:18px 0!important;padding:22px!important;border:1px solid #4b4f50!important/);
assert.match(html,/#roundGridNavigation\{grid-template-columns:minmax\(0,1fr\) 118px minmax\(0,1fr\)!important/);
assert.match(html,/\.round-manual-detail\{display:grid!important;grid-template-columns:118px minmax\(0,1fr\)!important/);
assert.match(html,/\.round-player-grid\{display:grid!important;grid-template-columns:minmax\(116px,1\.3fr\) 72px minmax\(88px,1fr\) repeat\(3,minmax\(76px,\.8fr\)\)!important/);
assert.match(html,/#roundGridEnter\{min-height:64px!important/);
assert.match(html,/#roundGridEnter\{[^}]*background:var\(--lime\)!important;color:#000!important/);
assert.doesNotMatch(html,/#roundManualEntry\{[^}]*background:(?:linear-gradient|radial-gradient)/);
assert.doesNotMatch(html,/\.round-actions\{[^}]*display:flex[^}]*\}\s*\/\* V407-R1/);

console.log("PASS V407-R2 · retícula premium, tarjeta y controles homogéneos");
