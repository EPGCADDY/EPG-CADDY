import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/\.new-round-card input\[data-draft-name\]\{text-transform:none!important\}/,
  "El Registro no debe transformar a mayúsculas el control nativo de texto iOS");
assert.match(html,/\.stableford-player-grid input\[data-stableford-name\]\{text-transform:none!important\}/,
  "Stableford no debe transformar a mayúsculas el control nativo de texto iOS");
assert.match(html,/\.new-round-card button,\.new-round-card input,\.new-round-card select\{[^}]*text-transform:uppercase\}/,
  "Los controles restantes conservan su formato visual autorizado");
assert.match(html,/\.stableford-player-grid input,\.stableford-result-card input,\.stableford-result-card select\{[^}]*text-transform:uppercase\}/,
  "Los campos ajenos al nombre conservan su formato visual autorizado");
console.log("PASS R194 QuickType: text-transform uppercase no se aplica a nombres; los campos restantes conservan formato");
