import fs from "node:fs";
import assert from "node:assert/strict";

const inventoryPath="CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/INVENTARIO_PANTALLAS_ESTADOS_V407_R5.md";
const matrixPath="CONTROL_PROYECTO_SCIRE/AUDITORIA_VISUAL_V407/MATRIZ_AUDITORIA_VISUAL_V407_R5.md";
const inventory=fs.readFileSync(inventoryPath,"utf8");
const matrix=fs.readFileSync(matrixPath,"utf8");
const ids=[...inventory.matchAll(/^\| ((?:APP|LIVE|CARD|DOC|SAFE)-\d+) \|/gm)].map(match=>match[1]);

assert.equal(ids.length,67,"el inventario debe contener exactamente 67 estados visuales");
assert.equal(new Set(ids).size,67,"cada estado visual debe tener ID único");
for(const prefix of ["APP","LIVE","CARD","DOC","SAFE"]){
  assert.ok(ids.some(id=>id.startsWith(prefix+"-")),`falta la familia ${prefix}`);
}
for(const criterion of ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10"]){
  assert.match(matrix,new RegExp(`\\| ${criterion} \\|`),`falta criterio ${criterion}`);
}
assert.match(matrix,/PASS CÓDIGO[^\n]+nunca sustituyen la inspección renderizada/);
assert.match(matrix,/\| Inventariados \| 67 \|/);
assert.match(matrix,/\| PASS físico \| 0 \|/);
assert.match(matrix,/\| FAIL físico \| 9 \|/);
assert.match(matrix,/\| Pendientes de evidencia R5 \| 58 \|/);

console.log("PASS inventario visual V407-R5: 67 estados únicos, 10 criterios y conteos reconciliados");
