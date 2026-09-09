import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const live=fs.readFileSync("live-control.js","utf8");

assert.match(html,/V407-R19-SUPPORT-MANUAL-20260908/);
assert.match(html,/body\{-webkit-user-select:none;user-select:none\}/,"los correlativos y textos fijos no se seleccionan");
assert.match(html,/input,textarea,select,\[contenteditable="true"\]\{-webkit-user-select:text;user-select:text\}/,"nombre, score y datos editables conservan selección");
assert.match(html,/<\/header>\s*<nav class="round-utility-bar" id="roundUtilityBar"/);
assert.match(html,/\.round-utility-bar\{position:static/);
assert.match(live,/getElementById\("roundUtilityBar"\);if\(toolbar\)toolbar\.prepend\(launch\)/);
assert.doesNotMatch(live,/\.gsc-live-launch\{position:fixed/);
assert.match(html,/>CATEGORÍA<\/option>/);
assert.match(html,/>MARCAS<\/option>/);
assert.match(html,/<div class="round-secondary-actions" id="roundSecondaryActions">[\s\S]*ATRÁS[\s\S]*BORRAR TODO[\s\S]*\+ JUGADOR[\s\S]*<\/div>/);
assert.doesNotMatch(html,/insertAdjacentElement\("afterend",clearButton\)/);

console.log("PASS V406-R4 · barra sin traslape, selectores explícitos y acciones inferiores homogéneas");
