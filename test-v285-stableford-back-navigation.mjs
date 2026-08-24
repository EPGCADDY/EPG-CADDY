import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/<div class="screen-back-row"><button class="screen-back-button" type="button" id="backStablefordSetup">ATRÁS<\/button><\/div>/);
assert.doesNotMatch(html,/<button[^>]*id="backStablefordSetup"[^>]*\bhidden\b/);
assert.match(html,/function backFromStablefordSetup\(\)[\s\S]*?stablefordSetupOverlay[\s\S]*?classList\.remove\("visible"\)[\s\S]*?history\.replaceState[\s\S]*?dateSetup\(\);openSetup\("new"\)/);
assert.match(html,/\$\("backStablefordSetup"\)\.addEventListener\("click",backFromStablefordSetup\)/);
assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

console.log("PASS V285 · ATRÁS vuelve de Stableford a la pantalla principal");
