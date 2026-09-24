import assert from 'node:assert/strict';
import artifacts from '../card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const which=process.argv[2];
if(which==='general'){
 const out=artifacts.build(snapshot);
 assert.doesNotMatch(out.global.html,/>Tarjeta Global</);
 assert.match(out.global.html,/golf-score-card-gt-horizontal-original\.webp/);
 assert.match(out.global.html,/CAMPO · El Pulté Golf/);
 assert.match(out.global.html,/MODALIDAD · MEDAL PLAY NORMAL/);
 assert.match(out.global.html,/FECHA ·/);
 assert.doesNotMatch(out.global.html,/VERSIÓN ·|ID OFICIAL · SHA-256/);
}
if(which==='stableford'){
 const players=Array.from({length:6},(_,p)=>({id:'sf'+(p+1),name:'JUGADOR '+(p+1),handicap:0,tee:'Blanco',holes:Object.fromEntries(Array.from({length:18},(_,i)=>{const hole=i+1,par=i%3===0?3:i%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2}]}))}));
 const s={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players};
 const out=artifacts.build(s);
 assert.match(out.global.html,/MODALIDAD · STABLEFORD/);
 assert.doesNotMatch(out.global.html,/TORNEO · Copa Oficial|CATEGORÍA · SENIOR|ID OFICIAL · SHA-256/);
 assert.match(out.global.html,/IN · HOYOS 1–9[\s\S]*?OUT · HOYOS 10–18/);
 assert.equal((out.global.html.match(/class="score-half"/g)||[]).length,2);
}
if(which==='personal'){
 const out=artifacts.build(snapshot);
 assert.match(out.personal[0].html,/Comportamiento Neto contra Par/);
 assert.match(out.personal[0].html,/Águilas/);
 assert.match(out.personal[0].html,/SHA-256/);
}
if(which==='matrix'){
 const players=[{...snapshot.players[0],id:'with-category',name:'CON CATEGORÍA',tournamentCategory:'championship'},{...snapshot.players[0],id:'without-category',name:'SIN REGISTRO',tournamentCategory:''}];
 for(const mode of ['general','stableford','match_play','four_ball','universales']){
  const s={...snapshot,mode,players,stablefordCategory:'',matchPlay:{},fourBall:{}};
  const cards=artifacts.build(s);
  assert.match(cards.global.html,/CAMPEONATO[\s\S]*CON CATEGORÍA/);
 }
}

if(which==='stableford2'){
 const players=Array.from({length:6},(_,p)=>({id:'sf'+(p+1),name:'JUGADOR '+(p+1),handicap:0,tee:'Blanco',holes:Object.fromEntries(Array.from({length:18},(_,i)=>{const hole=i+1,par=i%3===0?3:i%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2}]}))}));
 const ss={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players};
 const out=artifacts.build(ss);
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
console.log('PASS',which);
