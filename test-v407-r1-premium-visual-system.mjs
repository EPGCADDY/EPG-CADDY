import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/V407-R1-PREMIUM-VISUAL-SYSTEM-20260908/);
assert.match(html,/--premium-control:52px/);
assert.match(html,/\.round-utility-bar\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(html,/\.round-actions\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(html,/\.round-actions #newRoundButton\{grid-column:1\/-1\}/);
assert.match(html,/\.round-secondary-actions\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(html,/@media\(max-width:800px\)[\s\S]*\.round-utility-bar\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(html,/\.new-round-card\{padding:18px 14px;margin:8px auto;border-radius:18px\}/);
assert.match(html,/#roundManualEntry\{margin:18px 0!important;padding:20px!important;border:1px solid var\(--premium-line-bright\)!important/);
assert.match(html,/#roundGridNavigation\{grid-template-columns:minmax\(0,1fr\) 118px minmax\(0,1fr\)!important/);
assert.match(html,/#roundGridEnter\{min-height:56px!important/);
assert.doesNotMatch(html,/\.round-actions\{[^}]*display:flex[^}]*\}\s*\/\* V407-R1/);

console.log("PASS V407-R1 · retícula premium, simetría y controles homogéneos");
