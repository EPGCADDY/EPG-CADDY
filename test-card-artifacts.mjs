import assert from 'node:assert/strict';
import artifacts from './card-artifacts.js';
const holes=Object.fromEntries(Array.from({length:18},(_,i)=>[i+1,{hole:i+1,par:i%3===0?3:i%3===1?4:5,gross:4,strokes:i<10?1:0,net:i<10?3:4}]));
const snapshot={status:'officially_closed',sha256:'a'.repeat(64),version:1,course:'El Pulté Golf',playedAt:'2026-08-19T14:00:00Z',players:[{id:'p1',name:'Jaime Kirste',handicap:14,tee:'Blanco',holes}]};
const out=artifacts.build(snapshot);assert.equal(out.personal.length,1);assert.equal(out.all.length,2);assert.doesNotMatch(out.global.html,/>Tarjeta Global</);assert.match(out.global.html,/golf-score-card-gt-horizontal-original\.webp/);
assert.match(out.global.html,/PRIMERA VUELTA · HOYOS 1–9/);
assert.match(out.global.html,/SEGUNDA VUELTA · HOYOS 10–18/);
assert.match(out.global.html,/<th>1<\/th>/);
assert.match(out.global.html,/<th>10<\/th>/);
assert.match(out.global.html,/class="par-row"><th>PAR<\/th>[\s\S]*?<td>3<\/td>/,'La fila PAR conserva una sola etiqueta antes de los valores');
assert.doesNotMatch(out.global.html,/<td><small>PAR<\/small>/,'PAR no se repite encima de cada dígito');
const parRows=out.global.html.match(/<tr class="par-row">[\s\S]*?<\/tr>/g)||[];assert.equal(parRows.length,2,'La fila PAR debe aparecer en ambas vueltas');for(const row of parRows){assert.doesNotMatch(row,/<td>36<\/td><td>0<\/td><td>36<\/td>/,'La fila PAR no lleva totales gross/hdcp/neto');assert.doesNotMatch(row,/<td>E<\/td>/,'La fila PAR no lleva resultado +/-');}
assert.match(out.global.html,/VUELTA IN[\s\S]*?VUELTA OUT[\s\S]*?VUELTA COMPLETA[\s\S]*?<th>HDCP<\/th>/);
assert.match(out.global.html,/<td>36<\/td><td>9<\/td><td>27<\/td><td>36<\/td><td>1<\/td><td>35<\/td><td>72<\/td><td>10<\/td><td>62<\/td>/,'Subtotales y total 18 hoyos Gross/HDCP/Neto deben sumar scores y tiros asignados');
assert.match(out.global.html,/CAMPO · El Pulté Golf/);assert.match(out.global.html,/MODALIDAD · MEDAL PLAY NORMAL/);assert.match(out.global.html,/FECHA ·/);assert.doesNotMatch(out.global.html,/VERSIÓN ·|ID OFICIAL · SHA-256/);assert.match(out.personal[0].html,/Comportamiento Neto contra Par/);assert.match(out.personal[0].html,/Águilas/);assert.match(out.personal[0].html,/RESULTADOS/);assert.match(out.personal[0].html,/class="par-row"><th>PAR<\/th>/);assert.doesNotMatch(out.personal[0].html,/ID OFICIAL · SHA-256/);assert.throws(()=>artifacts.build({...snapshot,status:'active'}));console.log('PASS tarjetas Global/Personal: PAR claro y subtotales Gross/HDCP/Neto de 18 hoyos');

const stablefordPlayers=Array.from({length:6},(_,playerIndex)=>({
  id:`sf${playerIndex+1}`,
  name:`JUGADOR ${playerIndex+1}`,
  handicap:24,
  tee:'Blanco',
  holes:Object.fromEntries(Array.from({length:18},(_,i)=>{
    const hole=i+1,par=i%3===0?3:i%3===1?4:5;
    return[hole,{hole,par,gross:par,strokes:2,net:par-2,status:null,points:2}];
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
assert.match(stablefordOut.global.html,/G\/P = Gross \/ <span class=\"points\">Puntos Stableford<\/span>/);
assert.match(stablefordOut.global.html,/class="par-row"><th colspan="2">PAR<\/th>/);
assert.match(stablefordOut.global.html,/VUELTA COMPLETA/);
assert.doesNotMatch(stablefordOut.global.html,/\bHCP\b|HDCP|NETO/,'La tarjeta Stableford completa elimina HCP, HDCP y Neto');
assert.match(stablefordOut.global.html,/<th colspan="2">VUELTA IN<\/th>[\s\S]*?<th colspan="2">VUELTA OUT<\/th>[\s\S]*?<th colspan="2">VUELTA COMPLETA<\/th>/);
assert.match(stablefordOut.global.html,/<th>GROSS<\/th><th class="points">PUNTOS<\/th>[\s\S]*?<td class="stableford-gross">72<\/td><td class="points">36<\/td>/,'El resultado Stableford completo se resume sólo con Gross y Puntos');
assert.match(stablefordOut.global.html,/<span class="stableford-gross">3<\/span>\/<span class="points">2<\/span>/,'Gross queda blanco y los puntos por hoyo verdes');
assert.doesNotMatch(stablefordOut.global.html,/ID OFICIAL · SHA-256/,"La Global limpia no debe mostrar ID técnico visible");
assert.match(stablefordOut.global.html,/IN · HOYOS 1–9[\s\S]*?OUT · HOYOS 10–18/,"Stableford Global debe separar las dos vueltas en orden IN/OUT");
assert.equal((stablefordOut.global.html.match(/class="score-half"/g)||[]).length,2,"Stableford Global debe tener exactamente dos bloques de vuelta");
assert.match(stablefordOut.global.html,/global-clean-meta[\s\S]*?grid-template-columns:1fr!important/,"La cabecera Global móvil debe apilar Campo, Modalidad y Fecha");
assert.doesNotMatch(stablefordOut.global.html,/ID OFICIAL · SHA-256/,"La Global limpia no muestra identificador técnico");
assert.doesNotMatch(stablefordOut.personal[0].html,/\bHCP\b|HDCP|NETO/,'La Stableford Personal también elimina cualquier rubro HCP/HDCP/Neto');
assert.match(stablefordOut.personal[0].html,/Puntos Stableford por hoyo/);
assert.match(stablefordOut.personal[0].html,/<th class="points">PUNTOS<\/th>/);
assert.match(stablefordOut.personal[0].html,/<span class="points">2<\/span>/);
assert.match(stablefordOut.personal[0].html,/<span class="stableford-gross">72<\/span>/);
assert.match(stablefordOut.personal[0].html,/Fecha clasificatoria/);
assert.match(stablefordOut.personal[0].html,/class="par-row"><th>PAR<\/th>/);
assert.match(stablefordOut.personal[0].html,/VUELTA OUT[\s\S]*?VUELTA COMPLETA/);
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
  assert.match(cards.global.html,/CON CATEGORÍA/,`${mode}: la Global debe mostrar el nombre guardado`);
  assert.match(cards.personal[0].html,/CON CATEGORÍA/,`${mode}: la Personal debe conservar el nombre`);
  assert.match(cards.global.html,/VUELTA COMPLETA/,`${mode}: la Global debe mostrar Gross/HDCP/Neto por vuelta completa`);
  assert.match(cards.personal[0].html,/VUELTA COMPLETA/,`${mode}: la Personal debe mostrar Gross/HDCP/Neto por vuelta completa`);
  if(mode==='stableford'){
    assert.doesNotMatch(cards.global.html,/\bHCP\b|HDCP|NETO/);
    assert.doesNotMatch(cards.personal[0].html,/\bHCP\b|HDCP|NETO/);
    assert.match(cards.global.html,/<td class="stableford-gross">72<\/td><td class="points">36<\/td>/);
  }else{
    assert.match(cards.global.html,/<td>72<\/td><td>10<\/td><td>62<\/td>/,`${mode}: total de 18 hoyos debe coincidir con Gross 72, HDCP 10 y Neto 62`);
    assert.match(cards.personal[0].html,/<td>72<\/td><td>10<\/td><td>62<\/td>/,`${mode}: tarjeta personal debe coincidir con Gross 72, HDCP 10 y Neto 62`);
  }
  assert.match(cards.global.html,/class="par-row"/,`${mode}: Global debe conservar la línea PAR`);
  if(mode==='match_play'||mode==='four_ball')assert.match(cards.personal[0].html,/<th>HOYO<\/th><th>PAR<\/th>/,`${mode}: Personal debe mostrar el PAR de cada hoyo`);
  else assert.match(cards.personal[0].html,/class="par-row"/,`${mode}: Personal debe conservar la línea PAR`);
  assert.match(cards.personal[0].html,/VUELTA IN[\s\S]*?VUELTA OUT/,`${mode}: debe conservar subtotales por vuelta`);
  assert.doesNotMatch(cards.personal[1].html,/SIN CATEGORÍA/,`${mode}: no debe inventar categoría cuando el registro quedó vacío`);
}
console.log('PASS categoría opcional arriba del nombre en las diez tarjetas; HCP conservado');
const universalesCards=artifacts.build({...snapshot,mode:'universales',players:optionalCategoryPlayers});
assert.match(universalesCards.global.html,/color:#ff3030[\s\S]*PUNTOS/,'Universales Global debe identificar los puntos en rojo');
assert.match(universalesCards.personal[0].html,/<th style="color:#ff3030">PUNTOS<\/th>[\s\S]*color:#ff3030/,'Universales Personal debe mostrar leyenda y valores de puntos en rojo');
assert.match(universalesCards.global.html,/class="par-row"><th colspan="2">PAR<\/th>/);
assert.match(universalesCards.personal[0].html,/class="par-row"><th>PAR<\/th>/);
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
assert.match(matchCards.global.html,/<th>1<\/th>/,'Match Play deja el número de hoyo sin rótulo duplicado');
assert.match(matchCards.global.html,/class="par-row"><th colspan="2">PAR<\/th>[\s\S]*?<td>3<\/td>/,'Match Play conserva una sola etiqueta PAR al inicio de la fila');
assert.match(matchCards.personal[0].html,/<th>HOYO<\/th><th>PAR<\/th>/,'Match Play personal indica PAR por hoyo');
assert.doesNotMatch(matchCards.global.html,/TEAM ·|★ MEJOR|MODALIDAD · FOUR BALL/,'Match Play digital no puede contener formato Four Ball');
console.log('PASS tarjeta digital Match Play conserva flechas y no contamina Four Ball');

const fourBallCards=artifacts.build({...snapshot,mode:'four_ball',players:matchPlayers.map((player,index)=>({...player,name:`FOUR ${index+1}`})),fourBall:{closed:true,decidedAt:18,resultLabel:'TEAM 1 UP'}});
assert.match(fourBallCards.global.html,/<th>1<\/th>/,'Four Ball deja el número de hoyo sin rótulo duplicado');
assert.match(fourBallCards.global.html,/class="par-row"><th colspan="3">PAR<\/th>[\s\S]*?<td>3<\/td>/,'Four Ball conserva una sola etiqueta PAR al inicio de la fila');
assert.match(fourBallCards.personal[0].html,/<th>HOYO<\/th><th>PAR<\/th>/,'Four Ball personal indica PAR por hoyo');
assert.match(fourBallCards.global.html,/VUELTA COMPLETA/);
console.log('PASS tarjeta digital Four Ball: PAR y totales Gross/HDCP/Neto');

