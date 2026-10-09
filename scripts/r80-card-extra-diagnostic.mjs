import assert from 'node:assert/strict';
import artifacts from '../card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const which=process.argv[2];
if(which==='stableford'){
 const players=Array.from({length:6},(_,playerIndex)=>({id:'sf'+(playerIndex+1),name:'JUGADOR '+(playerIndex+1),handicap:0,tee:'Blanco',holes:Object.fromEntries(Array.from({length:18},(_,i)=>{const hole=i+1,par=i%3===0?3:i%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2}]}))}));
 const s={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players};
 const out=artifacts.build(s);
 assert.equal(out.personal.length,6);
 assert.equal(out.all.length,7);
 assert.equal(out.global.mode,'stableford');
 assert.match(out.global.html,/G\/P = Gross \/ Puntos Stableford/);
 assert.doesNotMatch(out.global.html,/<th>NETO<\/th>/);
 assert.match(out.global.html,/global-clean-meta[\s\S]*?grid-template-columns:1fr!important/);
 assert.match(out.personal[0].html,/Puntos Stableford por hoyo/);
 assert.match(out.personal[0].html,/Fecha clasificatoria/);
 assert.equal(out.personal[0].stats.points,36);
 assert.equal(out.personal[0].stats.front.points,18);
 assert.equal(out.personal[0].stats.back.points,18);
}
if(which==='universales'){
 const players=[{...snapshot.players[0],id:'with-category',name:'CON CATEGORÍA',tournamentCategory:'championship'},{...snapshot.players[0],id:'without-category',name:'SIN REGISTRO',tournamentCategory:''}];
 const out=artifacts.build({...snapshot,mode:'universales',players});
 assert.match(out.global.html,/color:#ff3030[\s\S]*PUNTOS/);
 assert.match(out.personal[0].html,/<th style="color:#ff3030">PUNTOS<\/th>[\s\S]*color:#ff3030/);
}
if(which==='legacy'){
 const legacy=JSON.parse(JSON.stringify(snapshot));legacy.mode='general';legacy.universalesPoints=12;
 for(const player of legacy.players){player.universalesPoints=12;for(const h of Object.values(player.holes)){h.universalesPoints=12;h.stablefordPoints=2;}}
 for(const card of artifacts.build(legacy).all)assert.doesNotMatch(card.html,/PUNTOS UNIVERSALES|PUNTOS IN|PUNTOS OUT|G\/N\/P/);
}
console.log('PASS extra',which);
