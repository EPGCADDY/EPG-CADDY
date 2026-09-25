import assert from 'node:assert/strict';
import artifacts from './card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const out=artifacts.build(snapshot);assert.equal(out.personal.length,1);assert.equal(out.all.length,2);assert.doesNotMatch(out.global.html,/>Tarjeta Global</);assert.ok(out.global.html.includes('data:image/webp;base64,'));
assert.match(out.global.html,/PRIMERA VUELTA · HOYOS 1–9/);
assert.match(out.global.html,/SEGUNDA VUELTA · HOYOS 10–18/);
assert.ok(out.global.html.includes('1<br><small>G/N</small>'));
assert.ok(out.global.html.includes('10<br><small>G/N</small>'));assert.match(out.global.html,/CAMPO · El Pulté Golf/);assert.match(out.global.html,/MODALIDAD · MEDAL PLAY/);assert.match(out.global.html,/FECHA ·/);assert.doesNotMatch(out.global.html,/VERSIÓN ·|ID OFICIAL · SHA-256/);assert.match(out.personal[0].html,/Comportamiento Neto contra Par/);assert.match(out.personal[0].html,/Águilas/);assert.doesNotMatch(out.personal[0].html,/ID OFICIAL · SHA-256/);assert.throws(()=>artifacts.build({...snapshot,status:'active'}));console.log('PASS archivos Global/personal desde snapshot oficial');

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
assert.doesNotMatch(stablefordOut.global.html,/>Tarjeta Global Stableford/);assert.match(stablefordOut.global.html,/MODALIDAD · STABLEFORD/);
assert.doesNotMatch(stablefordOut.global.html,/TORNEO · Copa Oficial/);
assert.doesNotMatch(stablefordOut.global.html,/CATEGORÍA · SENIOR/);
assert.match(stablefordOut.global.html,/G\/P = Gross \/ Puntos Stableford/);
assert.doesNotMatch(stablefordOut.global.html,/<th>NETO<\/th>/);
assert.doesNotMatch(stablefordOut.global.html,/ID OFICIAL · SHA-256/,"La Global limpia no debe mostrar ID técnico visible");
assert.match(stablefordOut.global.html,/PRIMERA VUELTA · HOYOS 1–9[\s\S]*?SEGUNDA VUELTA · HOYOS 10–18/,"Stableford Global debe separar las dos vueltas en orden IN/OUT");
assert.equal((stablefordOut.global.html.match(/class="score-half"/g)||[]).length,2,"Stableford Global debe tener exactamente dos bloques de vuelta");
assert.match(stablefordOut.global.html,/global-clean-meta[\s\S]*?grid-template-columns:1fr!important/,"La cabecera Global móvil debe apilar Campo, Modalidad y Fecha");
assert.doesNotMatch(stablefordOut.global.html,/ID OFICIAL · SHA-256/,"La Global limpia no muestra identificador técnico");
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

// Legacy point fields cannot contaminate non-Universales artifacts.
const legacy=JSON.parse(JSON.stringify(snapshot));legacy.mode='general';legacy.universalesPoints=12;
for(const player of legacy.players){player.universalesPoints=12;for(const h of Object.values(player.holes)){h.universalesPoints=12;h.stablefordPoints=2;}}
for(const card of artifacts.build(legacy).all)assert.doesNotMatch(card.html,/PUNTOS UNIVERSALES|PUNTOS IN|PUNTOS OUT|G\/N\/P/);
console.log('PASS: global and personal Medal cards ignore legacy Universales point fields');

const matchPlayers=Array.from({length:2},(_,playerIndex)=>({...snapshot.players[0],id:`mp${playerIndex+1}`,name:`MATCH ${playerIndex+1}`,holes:JSON.parse(JSON.stringify(holes))}));
const matchSnapshot={...snapshot,mode:'match_play',players:matchPlayers,matchPlay:{closed:true,decidedAt:18,resultLabel:'MATCH 1 UP',matches:[{closed:true,decidedAt:18,resultLabel:'MATCH 1 UP'}]}};
const matchCards=artifacts.build(matchSnapshot);
assert.equal(matchCards.global.mode,'match_play');
assert.match(matchCards.global.html,/MODALIDAD · MATCH PLAY/);
assert.match(matchCards.global.html,/match-arrow/,'Match Play digital debe conservar flechas');
assert.doesNotMatch(matchCards.global.html,/TEAM ·|★ MEJOR|MODALIDAD · FOUR BALL/,'Match Play digital no puede contener formato Four Ball');
console.log('PASS tarjeta digital Match Play conserva flechas y no contamina Four Ball');

// LAB R127 — seven-card premium visual contract
for(const mode of ['general','practice','skins','stableford','match_play','four_ball','universales']){
  const modeSnapshot={...snapshot,mode,players:mode==='universales'?optionalCategoryPlayers:mode==='stableford'?stablefordPlayers:mode==='match_play'?matchPlayers:snapshot.players,stablefordCategory:'senior',matchPlay:{closed:true,decidedAt:18,resultLabel:'MATCH PLAY'},fourBall:{resultLabel:'FOUR BALL'}};
  const card=artifacts.build(modeSnapshot).global.html;
  assert.match(card,/r127-seven-card-premium/,mode+': premium visual layer missing');
  assert.match(card,/PRIMERA VUELTA/,mode+': first round label missing');
  assert.match(card,/SEGUNDA VUELTA/,mode+': second round label missing');
}
console.log('PASS LAB R127 premium visual layer present across seven digital cards');

// LAB R127 final visual/format contract
{
 const medal=artifacts.build({...snapshot,mode:'general'}).global.html;
 assert.match(medal,/MODALIDAD · MEDAL PLAY/,'Medal debe titularse MEDAL PLAY');
 assert.doesNotMatch(medal,/MEDAL PLAY NORMAL/,'No debe quedar MEDAL PLAY NORMAL');
 const mp=artifacts.build({...snapshot,mode:'match_play',players:matchPlayers.slice(0,4),matchPlay:{resultLabel:'MATCH PLAY'}}).global.html;
 assert.match(mp,/PRIMERA VUELTA/); assert.match(mp,/SEGUNDA VUELTA/); assert.match(mp,/G\/N/);
 assert.equal((mp.match(/class="pair-divider"/g)||[]).length,2,'Una separación de parejas por cada vuelta');
 for(const p of matchPlayers.slice(0,4)) assert.match(mp,new RegExp(p.name.split(' ')[0]),'Deben aparecer exactamente los cuatro jugadores de las dos parejas');
}
console.log('PASS LAB R127 final: Medal Play + Match Play 4 jugadores / 2 parejas / G-N / dos vueltas');
