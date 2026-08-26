import assert from "node:assert/strict";
import fs from "node:fs";
import skins from "./skins.js";
import roundClosure from "./round-closure.js";
import cardArtifacts from "./card-artifacts.js";
import cardLibrary from "./card-library.js";
import masterDataSync from "./master-data-sync.js";
import accountBackup from "./account-backup.js";

const player=(id,name,values)=>({
  id,name,holes:Object.fromEntries(values.map((value,index)=>{
    const hole=index+1;
    if(value===null)return[hole,undefined];
    if(value==="X")return[hole,{hole,status:"x",gross:null,net:null}];
    const gross=typeof value==="object"?value.gross:value,net=typeof value==="object"?value.net:value;
    return[hole,{hole,gross,net}];
  }).filter(([,value])=>value))
});

const carry=skins.compute([
  player("a","ANA",[4,3]),player("b","BETO",[4,4])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:2});
assert.equal(carry.ok,true);
assert.deepEqual(carry.holes.map(hole=>hole.state),["carry","won"]);
assert.equal(carry.holes[1].potUnits,2);
assert.equal(carry.summaries.find(item=>item.playerId==="a").skins,2);
assert.equal(carry.balances.a,20);
assert.equal(carry.balances.b,-20);
assert.equal(carry.settlements[0].amount,20);

const gross=skins.compute([
  player("a","ANA",[{gross:4,net:3}]),player("b","BETO",[{gross:3,net:4}])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:1});
const net=skins.compute([
  player("a","ANA",[{gross:4,net:3}]),player("b","BETO",[{gross:3,net:4}])
],{enabled:true,scoreType:"net",tiePolicy:"carry",unitValue:10},{holeCount:1});
assert.equal(gross.holes[0].winnerIds[0],"b");
assert.equal(net.holes[0].winnerIds[0],"a");

const split=skins.compute([
  player("a","ANA",[4]),player("b","BETO",[4]),player("c","CARLOS",[5]),player("d","DORA",[6])
],{enabled:true,scoreType:"gross",tiePolicy:"split",unitValue:25},{holeCount:1});
assert.equal(split.holes[0].state,"split");
assert.equal(split.summaries.find(item=>item.playerId==="a").skins,0.5);
assert.equal(split.balances.a,25);
assert.equal(split.balances.b,25);
assert.equal(split.balances.c,-25);
assert.equal(split.balances.d,-25);
assert.equal(Object.values(split.balances).reduce((sum,value)=>sum+value,0),0);

const voidTie=skins.compute([
  player("a","ANA",[4]),player("b","BETO",[4])
],{enabled:true,scoreType:"gross",tiePolicy:"void",unitValue:10},{holeCount:1});
assert.equal(voidTie.holes[0].state,"void");
assert.equal(voidTie.pendingCarryUnits,0);
assert.equal(voidTie.settlements.length,0);

const explicitX=skins.compute([
  player("a","ANA",["X"]),player("b","BETO",[5])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:1});
assert.equal(explicitX.holes[0].state,"won");
assert.equal(explicitX.holes[0].winnerIds[0],"b");

const missing=skins.compute([
  player("a","ANA",[4,3]),player("b","BETO",[null,4])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:2});
assert.deepEqual(missing.holes.map(hole=>hole.state),["pending","blocked"]);
assert.equal(missing.settlements.length,0);

const finalCarry=skins.compute([
  player("a","ANA",[4]),player("b","BETO",[4])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:1});
assert.equal(finalCarry.holes[0].state,"carry_pending");
assert.equal(finalCarry.pendingCarryUnits,1);

const corrected=skins.compute([
  player("a","ANA",[4,3]),player("b","BETO",[5,4])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:2});
assert.equal(corrected.summaries.find(item=>item.playerId==="a").skins,2);
assert.equal(skins.compute([
  player("a","ANA",[6,3]),player("b","BETO",[5,4])
],{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10},{holeCount:2}).summaries.find(item=>item.playerId==="a").skins,1,"Una corrección debe recalcular desde el estado actual");

{
  const officialPlayer=(id,name,first,rest)=>({id,name,handicap:0,tee:"Blanco",matrix:"Caballeros",holes:Object.fromEntries(Array.from({length:18},(_,index)=>{const hole=index+1,gross=index===0?first:rest;return[hole,{hole,gross,strokes:0,net:gross,par:4,diff:gross-4,status:null}]}))});
  const players=[officialPlayer("a","ANA",4,4),officialPlayer("b","BETO",5,4)];
  const round={id:"skins-official",configured:true,mode:"general",courseKey:"pulte",course:"El Pulté",createdAt:"2026-08-26T10:00:00.000Z",sideGames:{skins:{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:20}},players};
  const closed=await roundClosure.close(round,{appVersion:"V329",closedAt:"2026-08-26T14:00:00.000Z"});
  assert.equal(closed.ok,true);
  assert.equal(closed.snapshot.sideGames.skins.result.summaries.find(item=>item.playerId==="a").skins,1);
  assert.equal(closed.snapshot.sideGames.skins.result.settlements[0].amount,20);
  const artifacts=cardArtifacts.build(closed.snapshot);
  assert.match(artifacts.global.html,/SKINS · GROSS/);
  assert.match(artifacts.global.html,/LIQUIDACIÓN:/);
  assert.match(artifacts.global.html,/BETO paga Q20\.00 a ANA/);
  assert.match(artifacts.personal[0].html,/el score deportivo no se modifica/i);
  const libraryEntry=cardLibrary.entry(closed.round);
  assert.equal(libraryEntry.sideGames.skins.enabled,true);
  assert.equal(cardLibrary.filter([libraryEntry],{query:"skins"}).length,1);
  const central=masterDataSync.build({round:closed.round,profiles:[],courseData:{par:Array(18).fill(4),tees:{}},capturedAt:"2026-08-26T14:05:00.000Z"});
  assert.equal(central.round.sideGames.skins.result.settlements[0].amount,20);
  const restored=accountBackup.localRound(central.round);
  assert.equal(restored.sideGames.skins.result.summaries.find(item=>item.playerId==="a").skins,1);
  const changed=await roundClosure.correct(closed.round,{changes:[{playerId:"a",hole:1,gross:6}],reason:"Score verificado",authorizedBy:"Jaime",appVersion:"V329",correctedAt:"2026-08-26T14:10:00.000Z"});
  assert.equal(changed.ok,true);
  assert.equal(changed.snapshot.version,2);
  assert.equal(changed.snapshot.sideGames.skins.result.summaries.find(item=>item.playerId==="a").skins,0);
  assert.equal(changed.snapshot.sideGames.skins.result.summaries.find(item=>item.playerId==="b").skins,1);
  assert.notEqual(changed.snapshot.sha256,closed.snapshot.sha256);
  assert.match(cardArtifacts.build(changed.snapshot).global.html,/ANA paga Q20\.00 a BETO/);
}

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
for(const token of [
  '<script src="./skins.js"></script>',
  'id="skinsRoundButton"',
  'id="skinsScoreType"',
  'id="skinsTiePolicy"',
  'id="skinsUnitValue"',
  'MODALIDADES EXISTENTES',
  'NUEVOS JUEGOS',
  'id="wolfRoundButton"',
  'id="vegasRoundButton"',
  'id="dotsRoundButton"',
  'function skinsSpeechSummary()',
  'function syncSkinsResult(value=round)',
  'SCORE DEPORTIVO INTACTO'
])assert.ok(html.includes(token),`Falta integración Skins: ${token}`);
const overlayIndex=html.indexOf('id="skinsOverlay"'),mainIndex=html.indexOf('<main class="app">');
assert.ok(overlayIndex>=0&&overlayIndex<mainIndex,"Skins debe abrir fuera del formato de la pantalla principal");
const main=html.slice(mainIndex,html.indexOf('</main>',mainIndex));
assert.ok(main.includes('id="scorecard"')&&main.includes('id="summaryBody"'));
assert.equal(main.includes('id="skinsResults"'),false,"No se debe insertar el resultado económico en la pantalla principal");
assert.match(worker,/gscg-mobile-v330-side-games-r3/);
assert.ok(worker.includes('"/skins.js"'));
assert.doesNotMatch(fs.readFileSync(new URL("./skins.js",import.meta.url),"utf8"),/(?:saveEntry|recordScore|setScore|fetch\()/,"El cálculo Skins no escribe scores ni consulta servicios");

console.log("PASS V329-R2 · Skins Gross/Neto, tres políticas de empate, unidad GTQ, X, cierre firmado, corrección, nube, historial, liquidación, voz y pantalla principal intacta");
