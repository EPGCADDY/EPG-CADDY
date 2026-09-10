import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
assert.match(html,/\.mandatory-update:not\(\.available\)\{position:absolute\}/);
assert.match(html,/\.mandatory-update\.available \.mandatory-update-card button/);
console.log("PASS aislamiento al desplazarse: ACTUALIZADO no flota sobre Control Manual y ACTUALIZAR disponible conserva su aviso");
