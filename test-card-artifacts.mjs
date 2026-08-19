import assert from 'node:assert/strict';
import artifacts from './card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const out=artifacts.build(snapshot);assert.equal(out.personal.length,1);assert.equal(out.all.length,2);assert.match(out.global.html,/Tarjeta Global/);assert.match(out.personal[0].html,/Comportamiento Neto contra Par/);assert.match(out.personal[0].html,/Águilas/);assert.match(out.personal[0].html,/SHA-256/);assert.throws(()=>artifacts.build({...snapshot,status:'active'}));console.log('PASS archivos Global/personal desde snapshot oficial');
