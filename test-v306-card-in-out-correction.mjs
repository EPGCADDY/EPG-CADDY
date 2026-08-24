import assert from "node:assert/strict";
import fs from "node:fs";

const main=fs.readFileSync("index-grupal.html","utf8");
const individual=fs.readFileSync("index.html","utf8");
const legacy=fs.readFileSync("stableford-torneo.html","utf8");
const artifacts=fs.readFileSync("card-artifacts.js","utf8");

const mainHeader='<th class="summary-player">JUGADOR</th><th>GROSS IN</th><th>PUNTOS IN</th><th>GROSS OUT</th><th>PUNTOS OUT</th><th>GROSS TOTAL</th><th>PUNTOS TOTAL</th>';
assert.ok(main.includes(mainHeader),"Stableford principal debe agrupar IN, luego OUT y finalmente TOTAL");
assert.match(main,/return`<tr><td class="summary-player">\$\{escapeHtml\(p\.name\)\}<\/td><td>\$\{f\.grossCount\?f\.gross:""\}<\/td><td>\$\{f\.count\?f\.points:""\}<\/td><td>\$\{b\.grossCount\?b\.gross:""\}<\/td><td>\$\{b\.count\?b\.points:""\}<\/td><td>\$\{t\.grossCount\?t\.gross:""\}<\/td>/,"El cuerpo Stableford debe respetar el mismo orden que el encabezado");
assert.match(main,/<th class="sum-col">IN<\/th>[\s\S]{0,250}<th class="sum-col">OUT<\/th><th class="sum-col">TOTAL<\/th>/,"La tarjeta principal debe cerrar hoyos 1–9 con IN y 10–18 con OUT");
assert.match(main,/\$\{metric\} IN[\s\S]{0,180}\$\{metric\} OUT[\s\S]{0,180}\$\{metric\} TOTAL/,"El control manual debe mostrar IN, OUT y TOTAL");

assert.match(individual,/<div class="sum-head"><\/div><div class="sum-head">IN<\/div><div class="sum-head">OUT<\/div><div class="sum-head">TOTAL<\/div>/,"La tarjeta individual debe ordenar IN, OUT y TOTAL");
assert.match(individual,/renderNineScorecard\(FRONT[\s\S]{0,180},"IN"\);renderNineScorecard\(BACK[\s\S]{0,180},"OUT"\)/,"Los datos individuales deben asociar FRONT con IN y BACK con OUT");
assert.match(individual,/\$\{tableFor\(FRONT,"IN"\)\}[\s\S]{0,100}\$\{tableFor\(BACK,"OUT"\)\}/,"La tarjeta digital individual debe presentar IN antes de OUT");
assert.match(individual,/<strong>IN<\/strong><span>Gross \$\{f\.gross\}[\s\S]{0,180}<strong>OUT<\/strong><span>Gross \$\{b\.gross\}/,"El resumen matemático debe mostrar primero IN y después OUT");
assert.doesNotMatch(individual,/<div class="sum-head">OUT<\/div><div class="sum-head">IN<\/div>|<strong>OUT<\/strong>[\s\S]{0,180}<strong>IN<\/strong>/,"No puede sobrevivir una variante visible OUT → IN");

assert.match(legacy,/GROSS IN<\/th><th>PTS IN<\/th><th>GROSS OUT<\/th><th>PTS OUT<\/th><th>GROSS TOTAL<\/th><th>PTS TOTAL/,"La tarjeta Stableford heredada debe agrupar cada segmento");
assert.match(artifacts,/"Gross IN"[\s\S]*"Puntos IN"[\s\S]*"Gross OUT"[\s\S]*"Puntos OUT"/,"Las tarjetas personales exportadas deben conservar IN antes de OUT");

console.log("PASS corrección transversal de tarjetas · IN → OUT → TOTAL");
