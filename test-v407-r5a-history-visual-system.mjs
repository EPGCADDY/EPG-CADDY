import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

for(const id of ["cardLibraryOverlay","cardLibraryDeleteOverlay","historyInsightsOverlay"]){
  assert.match(html,new RegExp(`id="${id}"`),`Falta ${id}`);
}
assert.match(html,/#cardLibraryOverlay,#historyInsightsOverlay\{padding:max\(18px,calc\(env\(safe-area-inset-top\) \+ 18px\)\)/,"Historial sin área segura canónica");
assert.match(html,/\.card-library-round\{grid-template-columns:122px minmax\(0,1fr\) minmax\(126px,auto\)/,"Lista de historial sin retícula amplia canónica");
assert.match(html,/grid-template-areas:"date mode" "main main"/,"Lista móvil de historial sin retícula de dos filas");
assert.match(html,/\.card-library-delete-actions\{grid-template-columns:1fr;gap:9px\}/,"Confirmación móvil sin acciones apiladas seguras");
assert.match(html,/\.history-insights-quick button:last-child\{grid-column:1\/-1\}/,"Quinta consulta rápida sin cierre simétrico");
assert.match(html,/\.history-insights-result\{min-height:120px;padding:16px 14px;font-size:13px;line-height:1\.5\}/,"Resultado móvil sin densidad canónica");
assert.doesNotMatch(html,/\.card-library-round\{[^}]*overflow-x:/,"La tarjeta de historial no debe crear scroll horizontal propio");

console.log("PASS V407-R5A: Historial y Estadísticas usan retícula premium contenida en escritorio e iPhone.");
