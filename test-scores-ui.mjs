import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const ui=createRequire(import.meta.url)('./scores-ui.js');
assert.equal(ui.holeValues({}) .length,18);assert.ok(ui.holeValues({}).every(x=>x==='—'));
const holes=ui.holeValues({holes:[{hole:1,gross:0,net:0},{hole:2,gross:5},{hole:3,explicitX:true},{hole:19,gross:8},{hole:1,gross:4,net:3}]});
assert.equal(holes[0],'4/3');assert.equal(holes[1],'5/—');assert.equal(holes[2],'X/—');assert.equal(holes[17],'—');
const grid=ui.grid({});assert.equal((grid.match(/<td>/g)||[]).length,18);assert.equal((grid.match(/<table/g)||[]).length,2);assert.ok(grid.indexOf('<th>9</th>')<grid.indexOf('<th>10</th>'));
assert.doesNotMatch(ui.header('<script>','Campo','Fecha'),/<script>/);assert.match(ui.header('Evento','Campo','Fecha'),/horizontal-original.webp/);
console.log('PASS shared Scores: 18 positions, two nines, missing values, X, last correction wins, escaped data and official logo');
