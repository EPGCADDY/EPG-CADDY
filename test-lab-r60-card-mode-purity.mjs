import fs from 'node:fs';
import assert from 'node:assert/strict';
const c=fs.readFileSync('card-artifacts.js','utf8');

assert.match(c,/const modeTotals=\["match_play","four_ball"\]\.includes\(snapshot\.mode\)\?"":approvedRoundTotals\(snapshot,summaryPlayers\)/,'Match Play/Four Ball no deben heredar resumen genérico');

assert.match(c,/Tarjeta Global Match Play[\s\S]*G\/N/,'Match Play debe mostrar Gross/Neto por hoyo');
assert.match(c,/NETO RIVAL/,'Match Play personal debe comparar neto rival');
assert.match(c,/Tarjeta Global Four Ball[\s\S]*★ MEJOR/,'Four Ball debe identificar mejor bola');
assert.match(c,/NETO COMPAÑERO/,'Four Ball personal debe mostrar compañero');
assert.match(c,/MEJOR NETO RIVAL/,'Four Ball personal debe mostrar rival');

assert.match(c,/Tarjeta Global Stableford[\s\S]*PUNTOS/,'Stableford debe mostrar puntos');
assert.match(c,/G\/P = Gross \/ Puntos Stableford/,'Stableford debe explicar G/P');
assert.match(c,/Tarjeta Global Universales[\s\S]*G\/N\/P/,'Universales debe mostrar Gross/Neto/Puntos');
assert.match(c,/Cada hoyo reparte exactamente 12 puntos/,'Universales debe conservar regla de 12 puntos');

assert(c.includes('Tarjeta Global",snapshot')&&c.includes('<th>GROSS</th>')&&c.includes('<th>NETO</th>')&&c.includes('<th>+/-</th>'),'Medal debe conservar Gross/Neto/+/-');
console.log('PASS R60 card mode purity: cada modalidad contiene su lógica y evita resumen ajeno');
