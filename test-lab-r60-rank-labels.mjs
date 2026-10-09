import fs from 'node:fs';
import assert from 'node:assert/strict';

const hub=fs.readFileSync('live-hub.js','utf8');

assert.match(hub,/rows\.map\(item=>'<tr><td>'\+escapeHtml\(item\.rankLabel\|\|"—"\)/,'Detalle por hoyo debe usar rankLabel oficial');
assert.doesNotMatch(hub,/rows\.map\(\(item,index\)=>'<tr><td>'\+\(index\+1\)/,'Detalle por hoyo no debe inventar posición con index+1');

const rankAssignments=[...hub.matchAll(/rankByPlayer\.set\(item\.streamId\+"\:"\+item\.playerId,item\.(\w+)\)/g)].map(m=>m[1]);
assert(rankAssignments.length>=2,'Debe asignar posición a favoritos desde rankings');
assert(rankAssignments.every(value=>value==='rankLabel'),'Favoritos debe conservar T# y posición oficial');

console.log('PASS R60 posiciones: monitor detalle + favoritos usan rankLabel oficial, incluidos empates T#');
