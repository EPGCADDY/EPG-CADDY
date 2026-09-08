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
assert.match(stablefordOut.global.html,/class="meta-hash"[\s\S]*?<code>b{64}<\/code>/,"El SHA-256 debe permanecer completo dentro de su propia caja adaptable");
assert.match(stablefordOut.global.html,/IN · HOYOS 1–9[\s\S]*?OUT · HOYOS 10–18/,"Stableford Global debe separar las dos vueltas en orden IN/OUT");
assert.equal((stablefordOut.global.html.match(/class="score-half"/g)||[]).length,2,"Stableford Global debe tener exactamente dos bloques de vuelta");
assert.match(stablefordOut.global.html,/@media\(max-width:720px\)[\s\S]*?\.meta\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/,"La cabecera móvil debe usar dos columnas simétricas");
assert.match(stablefordOut.global.html,/overflow-wrap:anywhere;word-break:break-word/,"El identificador oficial no puede desbordar la pantalla");
assert.match(stablefordOut.personal[0].html,/Puntos Stableford por hoyo/);
assert.match(stablefordOut.personal[0].html,/Fecha clasificatoria/);
assert.equal(stablefordOut.personal[0].stats.points,36);
assert.equal(stablefordOut.personal[0].stats.front.points,18);
assert.equal(stablefordOut.personal[0].stats.back.points,18);
console.log('PASS matriz oficial Stableford: Global y seis personales con Gross/Puntos');

const optionalCategoryPlayers=[
  {...snapshot.players[0],id:'with-category',name:'CON CATEGORÍA',tournamentCategory:'championship'},
  {...snapshot.players[0],id:'without-category',name:'SIN REGISTRO',tournamentCategory:''}
];
for(const mode of ['general','stableford','match_play','four_ball','universales']){
  const modeSnapshot={...snapshot,mode,players:optionalCategoryPlayers,stablefordCategory:'',matchPlay:{},fourBall:{}};
  const cards=artifacts.build(modeSnapshot);
  assert.match(cards.global.html,/CAMPEONATO[\s\S]*CON CATEGORÍA/,`${mode}: la Global debe mostrar la categoría guardada arriba del nombre`);
  assert.match(cards.personal[0].html,/CAMPEONATO[\s\S]*CON CATEGORÍA[\s\S]*HCP 14/,`${mode}: la Personal debe conservar categoría, nombre y HCP`);
  assert.doesNotMatch(cards.personal[1].html,/SIN CATEGORÍA/,`${mode}: no debe inventar categoría cuando el registro quedó vacío`);
}
console.log('PASS categoría opcional arriba del nombre en las diez tarjetas; HCP conservado');
const universalesCards=artifacts.build({...snapshot,mode:'universales',players:optionalCategoryPlayers});
assert.match(universalesCards.global.html,/color:#ff3030[\s\S]*PUNTOS/,'Universales Global debe identificar los puntos en rojo');
assert.match(universalesCards.personal[0].html,/<th style="color:#ff3030">PUNTOS<\/th>[\s\S]*color:#ff3030/,'Universales Personal debe mostrar leyenda y valores de puntos en rojo');
console.log('PASS leyenda, puntos por hoyo y totales Universales en rojo');
