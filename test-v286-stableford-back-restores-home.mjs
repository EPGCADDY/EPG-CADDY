import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/function renderCourseDraft\(\)[\s\S]*?courseOptions[\s\S]*?stablefordModeOption/);
assert.match(html,/function openSetup\(mode="new"\)[\s\S]*?renderDraft\(\)[\s\S]*?showStep1\(\)[\s\S]*?setupOverlay[\s\S]*?classList\.add\("visible"\)/);
assert.match(html,/function backFromStablefordSetup\(\)[\s\S]*?window\.history\.replaceState\(null,"",window\.location\.pathname\)[\s\S]*?dateSetup\(\);openSetup\("new"\)/);
assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

console.log("PASS V286 · ATRÁS reconstruye campos, modalidades y registro principal");
