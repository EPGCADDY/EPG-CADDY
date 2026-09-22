import assert from 'node:assert/strict';
import fs from 'node:fs';
const index=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const stable=fs.readFileSync(new URL('./stableford-torneo.html',import.meta.url),'utf8');
const contract=fs.readFileSync(new URL('./score-entry-contract.js',import.meta.url),'utf8');

assert.match(contract,/key==="X".*action:"delete"/s);
assert.match(contract,/key==="0".*action:"omit".*status:"x"/s);
assert.match(contract,/\/\^\[1-9\]\$\//);
assert.match(index,/const rowCount=Math\.max\(round\.players\.length,inlineScoreRows\.length\)/);
assert.match(index,/GSCScoreEntryContract/);
assert.match(stable,/score-entry-contract\.js/);
assert.match(stable,/parsed\?\.action==="delete"/);
assert.match(stable,/parsed\?\.action==="omit"/);
assert.match(index,/if\(result\.closure\)void speakClosure\(result\.closure\)/);

console.log('PASS R44: un contrato 1-9/0/X para todas las Score Cards y teclado independiente del número de jugadores');
