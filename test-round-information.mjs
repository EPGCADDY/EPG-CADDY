import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.doesNotMatch(html,/TOTALES GROSS PROVISIONALES|RESULTADOS STABLEFORD|RESULTADOS TOTALES/);
assert.match(html,/\.provisional-mode \.summary-title\{color:var\(--lime\)\}/);
assert.match(html,/\.summary th\{font-size:11\.4px!important\}/);
assert.match(html,/\$\("summaryTitle"\)\.textContent="INFORMACIÓN DE RONDA"/);
assert.match(html,/<div class="summary-title" id="summaryTitle">INFORMACIÓN DE RONDA<\/div>/);
assert.match(html,/<div class="summary-title" id="finalSummaryTitle">INFORMACIÓN DE RONDA<\/div>/);
assert.match(html,/\$\("summaryTitle"\)\.textContent="PUNTOS"/);
assert.match(html,/\$\("finalSummaryTitle"\)\.textContent=isStablefordRound\(\)\?"PUNTOS":"INFORMACIÓN DE RONDA"/);

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

console.log("PASS títulos: INFORMACIÓN DE RONDA en General y PUNTOS en Stableford");
