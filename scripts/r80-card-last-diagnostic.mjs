import assert from 'node:assert/strict';
import artifacts from '../card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const which=process.argv[2];
if(which==='baseline'){
 const out=artifacts.build(snapshot);assert.equal(out.personal.length,1);assert.equal(out.all.length,2);assert.throws(()=>artifacts.build({...snapshot,status:'active'}));
}
if(which==='personal-matrix'){
 const players=[{...snapshot.players[0],id:'with-category',name:'CON CATEGORÍA',tournamentCategory:'championship'},{...snapshot.players[0],id:'without-category',name:'SIN REGISTRO',tournamentCategory:''}];
 for(const mode of ['general','stableford','match_play','four_ball','universales']){
  const s={...snapshot,mode,players,stablefordCategory:'',matchPlay:{},fourBall:{}},cards=artifacts.build(s);
  assert.match(cards.personal[0].html,/CAMPEONATO[\s\S]*CON CATEGORÍA[\s\S]*HCP 14/);
  assert.doesNotMatch(cards.personal[1].html,/SIN CATEGORÍA/);
 }
}
if(which==='stableford-hash'){
 const players=Array.from({length:6},(_,p)=>({id:'sf'+(p+1),name:'JUGADOR '+(p+1),handicap:0,tee:'Blanco',holes:Object.fromEntries(Array.from({length:18},(_,i)=>{const hole=i+1,par=i%3===0?3:i%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2}]}))}));
 const s={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players};
 const out=artifacts.build(s);
 assert.doesNotMatch(out.global.html,/>Tarjeta Global Stableford/);
 assert.doesNotMatch(out.global.html,/ID OFICIAL · SHA-256/);
 assert.doesNotMatch(out.global.html,/ID OFICIAL · SHA-256/);
}
console.log('PASS last',which);
