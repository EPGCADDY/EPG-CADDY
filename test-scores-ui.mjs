import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const ui=createRequire(import.meta.url)('./scores-ui.js');
assert.equal(ui.holeValues({}) .length,18);assert.ok(ui.holeValues({}).every(x=>x==='—'));
const holes=ui.holeValues({holes:[{hole:1,gross:0,net:0},{hole:2,gross:5},{hole:3,explicitX:true},{hole:19,gross:8},{hole:1,gross:4,net:3}]});
assert.equal(holes[0],'4/3');assert.equal(holes[1],'5/—');assert.equal(holes[2],'X/—');assert.equal(holes[17],'—');
const grid=ui.grid({});assert.equal((grid.match(/<td>/g)||[]).length,18);assert.equal((grid.match(/<table/g)||[]).length,2);assert.ok(grid.indexOf('<th>9</th>')<grid.indexOf('<th>10</th>'));
assert.doesNotMatch(ui.header('<script>','Campo','Fecha'),/<script>/);assert.match(ui.header('Evento','Campo','Fecha'),/horizontal-original.webp/);
console.log('PASS shared Scores: 18 positions, two nines, missing values, X, last correction wins, escaped data and official logo');

// Desktop double click and mobile double tap open a closable 18-hole detail.
const controls={'[data-scores-close]':{focus(){}}};let removed=false;let created;
globalThis.document={activeElement:{focus(){}},createElement(){created={className:'',innerHTML:'',setAttribute(){},querySelector:s=>controls[s],remove(){removed=true}};return created},body:{appendChild(){}},addEventListener(){},removeEventListener(){}};
const row={dataset:{scorePlayer:'0'}},target={querySelectorAll:()=>[row]};
ui.bindRows(target,[{player:{name:'Becky',holes:[{hole:1,gross:4,net:3}]},snapshot:{course:'El Pulté',playedAt:'2026-09-30'},eventName:'Friends'}]);
const event={target:{closest:()=>null},preventDefault(){}};
row.ondblclick(event);assert.equal((created.innerHTML.match(/<td>/g)||[]).length,18);assert.match(created.innerHTML,/data-scores-close/);assert.match(created.innerHTML,/Becky/);controls['[data-scores-close]'].onclick();assert.equal(removed,true);
removed=false;row.onclick(event);row.onclick(event);assert.match(created.innerHTML,/18|HOYO/);controls['[data-scores-close]'].onclick();assert.equal(removed,true);
console.log('PASS R147.2: double click, mobile double tap, 18 scores, X closes only the player detail');
