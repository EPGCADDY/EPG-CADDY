import assert from 'node:assert/strict';
import artifacts from './card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const out=artifacts.build(snapshot);assert.equal(out.personal.length,1);assert.equal(out.all.length,2);assert.match(out.global.html,/Tarjeta Global/);assert.match(out.personal[0].html,/Comportamiento Neto contra Par/);assert.match(out.personal[0].html,/Águilas/);assert.match(out.personal[0].html,/SHA-256/);assert.throws(()=>artifacts.build({...snapshot,status:'active'}));console.log('PASS archivos Global/personal desde snapshot oficial');

const stablefordPlayers=Array.from({length:6},(_,playerIndex)=>({
  id:`sf${playerIndex+1}`,
  name:`JUGADOR ${playerIndex+1}`,
  handicap:0,
  tee:'Blanco',
  holes:Object.fromEntries(Array.from({length:18},(_,i)=>{
    const hole=i+1,par=i%3===0?3:i%3===1?4:5;
    return[hole,{hole,par,gross:par,status:null,points:2}];
  }))
}));
const stablefordSnapshot={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players:stablefordPlayers};
const stablefordOut=artifacts.build(stablefordSnapshot);
assert.equal(stablefordOut.personal.length,6);
assert.equal(stablefordOut.all.length,7);
assert.equal(stablefordOut.global.mode,'stableford');
assert.match(stablefordOut.global.html,/Tarjeta Global Stableford · SENIOR/);
assert.match(stablefordOut.global.html,/TORNEO · Copa Oficial/);
assert.match(stablefordOut.global.html,/CATEGORÍA · SENIOR/);
assert.match(stablefordOut.global.html,/G\/P = Gross \/ Puntos Stableford/);
assert.doesNotMatch(stablefordOut.global.html,/<th>NETO<\/th>/);
assert.match(stablefordOut.personal[0].html,/Puntos Stableford por hoyo/);
assert.match(stablefordOut.personal[0].html,/Fecha clasificatoria/);
assert.equal(stablefordOut.personal[0].stats.points,36);
assert.equal(stablefordOut.personal[0].stats.front.points,18);
assert.equal(stablefordOut.personal[0].stats.back.points,18);
console.log('PASS matriz oficial Stableford: Global y seis personales con Gross/Puntos');
