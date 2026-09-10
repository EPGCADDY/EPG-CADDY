import fs from "node:fs";
import assert from "node:assert/strict";

const source=fs.readFileSync("index-grupal.html","utf8");

assert.match(source,/gscg-green-outline-homogeneity-v407-r30/);
assert.match(source,/button\.gsc-green-outline-control\{[\s\S]*background:#050505!important;[\s\S]*color:var\(--lime\)!important;/);
assert.match(source,/textContent\|\|""\)\.trim\(\)\.toUpperCase\(\)==="OK"\)continue/);
assert.match(source,/background==="rgb\(49,255,0\)"\|\|background==="rgb\(53,255,0\)"/);
assert.match(source,/attributeFilter:\["class","aria-pressed"\]/);

console.log("PASS V407 R30 · controles verdes homologados a contorno y OK conserva relleno");
