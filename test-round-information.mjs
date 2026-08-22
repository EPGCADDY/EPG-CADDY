import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.doesNotMatch(html,/TOTALES GROSS PROVISIONALES|RESULTADOS STABLEFORD|RESULTADOS TOTALES/);
assert.match(html,/\.provisional-mode \.summary-title\{color:var\(--lime\)\}/);
assert.match(html,/\.summary th\{font-size:11\.4px!important\}/);
assert.match(html,/\$\("summaryTitle"\)\.textContent="INFORMACIÓN DE RONDA"/);
assert.ok((html.match(/<div class="summary-title"(?: id="summaryTitle")?>INFORMACIÓN DE RONDA<\/div>/g)||[]).length===2,"La tarjeta activa y la digital deben usar el título autorizado");

for(const label of [
  "GROSS PRIMERA VUELTA",
  "GROSS SEGUNDA VUELTA",
  "GROSS TOTAL",
  "PUNTOS PRIMERA VUELTA",
  "PUNTOS SEGUNDA VUELTA",
  "PUNTOS TOTAL",
  "NETO TOTAL",
  "+/- NETO",
])assert.ok(html.includes(label),`Falta ${label}`);

assert.match(html,/const f=totals\(p,FRONT\),b=totals\(p,BACK\),t=totals\(p,ALL\)/);
assert.match(html,/const f=stablefordTotals\(p,FRONT\),b=stablefordTotals\(p,BACK\),t=stablefordTotals\(p,ALL\)/);

console.log("PASS Información de ronda: grupal, provisional, Stableford y tarjeta digital");
