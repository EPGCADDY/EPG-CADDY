import fs from "node:fs";
import assert from "node:assert/strict";

const path="CONTROL_PROYECTO_SCIRE/COORDINACION_V407_R6_UNIVERSALES.md";
const source=fs.readFileSync(path,"utf8");
for(const token of ["GOLF SCORE CARD GT","lab/v407-r6-universales","APP-22","APP-23","CARD-09","CARD-10","pointsPoolPerHole: 12","reemplazo del motor `dots.js` por `universales.js`","prueba negativa de cero DOTS activo"]){
  assert.ok(source.includes(token),`falta contrato cruzado: ${token}`);
}
assert.doesNotMatch(source,/\| APP-4[3-5] \|/,"Universales debe reemplazar DOTS, no crear otra ranura APP");
assert.match(source,/Producción \| `main` \| `4009f79f50987f8bf105189bce9c5e90b2857363`/);
console.log("PASS V407-R6 · Universales reemplaza DOTS y conserva separación motor/diseño/Producción");
