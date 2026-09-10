import fs from "node:fs";
import assert from "node:assert/strict";

const source=fs.readFileSync("index-grupal.html","utf8");
const digital=source.match(/function openFinalDigitalCard\(\)\{([\s\S]*?)\n\}/)?.[1]||"";
const fresh=source.match(/function openNewRoundDraft\(\)\{([\s\S]*?)\n\}/)?.[1]||"";
const stableford=source.match(/function openFreshStablefordSetup\(\)\{([\s\S]*?)\n\}/)?.[1]||"";

assert.match(digital,/if\(round\.configured\)\{persist\(\);archiveRoundSnapshot\(round\)\}/,"TARJETA DIGITAL debe guardar primero la ronda en Historial");
for(const [name,body] of [["NUEVA RONDA",fresh],["NUEVA RONDA STABLEFORD",stableford]]){
  assert.match(body,/if\(round\.configured\)\{persist\(\);archiveRoundSnapshot\(round\)\}/,`${name} debe guardar primero la ronda en Historial`);
  assert.match(body,/localStorage\.removeItem\(key\)/,`${name} debe borrar almacenamiento de la ronda activa`);
  assert.match(body,/clearDraftState\(\)/,`${name} debe limpiar el registro anterior`);
}

console.log("PASS V407 R30 · Tarjeta Digital archiva y Nueva Ronda archiva antes de limpiar registros");
