import assert from "node:assert/strict";
import fs from "node:fs";
import wolf from "./wolf.js";
import vegas from "./vegas.js";
import dots from "./dots.js";
import roundClosure from "./round-closure.js";
import cardArtifacts from "./card-artifacts.js";
import cardLibrary from "./card-library.js";
import historicalAnalytics from "./historical-analytics.js";
import masterDataSync from "./master-data-sync.js";
import accountBackup from "./account-backup.js";

const player=(id,name,values,par=4)=>({id,name,holes:Object.fromEntries(values.map((gross,index)=>[index+1,gross==="X"?{hole:index+1,status:"x",gross:null,net:null,par}:{hole:index+1,status:null,gross,net:gross,par,diff:gross-par}]))});
const six=values=>["ANA","BETO","CARLA","DIEGO","ELENA","FABIO"].map((name,index)=>player(String.fromCharCode(97+index),name,values[index]));

{
  const players=six([[3],[4],[5],[6],[7],[8]]),result=wolf.compute(players,{enabled:true,scoreType:"gross",unitValue:10,decisions:{1:{type:"partner",partnerPlayerId:"b"}}},{holeCount:1});
  assert.equal(result.ok,true);
  assert.equal(result.holes[0].wolfPlayerId,"a");
  assert.equal(result.holes[0].winnerSide,"wolf");
  assert.equal(result.holes[0].multiplier,1);
  assert.equal(result.balances.a,40);
  assert.equal(result.balances.b,40);
  assert.equal(result.balances.c,-20);
  assert.equal(result.summaries.find(item=>item.playerId==="a").netUnits,4,"Wolf debe mostrar unidades netas además del saldo");
  assert.equal(result.metrics.completedHoles,1);
  assert.equal(result.metrics.moneyTransferred,80);
  assert.equal(Object.values(result.balances).reduce((sum,value)=>sum+value,0),0);
  assert.equal(result.settlements.reduce((sum,item)=>sum+item.amount,0),80);
}

{
  const players=six([[3,5],[8,3],[3,6],[7,7],[6,8],[5,9]]),push=wolf.compute(players,{enabled:true,scoreType:"gross",tiePolicy:"push",unitValue:10,decisions:{1:{type:"lone"},2:{type:"blind"}}},{holeCount:2});
  assert.equal(push.holes[0].state,"push","El empate Wolf hace push por omisión");
  assert.equal(push.holes[1].wolfPlayerId,"b","El Wolf rota por orden de jugadores");
  assert.equal(push.holes[1].multiplier,3,"Blind Wolf usa multiplicador tres");
  assert.equal(push.holes[1].winnerSide,"wolf");
  const carry=wolf.compute(players,{enabled:true,scoreType:"gross",tiePolicy:"carry",unitValue:10,decisions:{1:{type:"lone"},2:{type:"lone"}}},{holeCount:2});
  assert.equal(carry.holes[0].state,"carry");
  assert.equal(carry.holes[1].potUnits,2);
  assert.equal(carry.holes[1].multiplier,2);
  assert.equal(carry.metrics.openCarryUnits,0);
  const capped=wolf.compute(players,{enabled:true,scoreType:"gross",unitValue:10,holeCapAmount:15,decisions:{1:{type:"lone"},2:{type:"blind"}}},{holeCount:2});
  assert.equal(capped.holes[1].rawStake,30);
  assert.equal(capped.holes[1].stake,15,"El tope limita el valor por rival y hoyo");
  assert.equal(capped.holes[1].capApplied,true);
  assert.equal(capped.metrics.largestStakePerRival,15);
  const migrated=wolf.normalizeConfig({enabled:true,wolfTeePosition:"last",loneMultiplier:4,blindMultiplier:5,decisions:{1:{type:"solo"}}});
  assert.equal(migrated.decisions[1].type,"lone","SOLO legado migra al término claro Lobo solitario");
  assert.equal(migrated.wolfTeePosition,"last");
  assert.deepEqual(migrated.multipliers,{partner:1,lone:4,blind:5});
  assert.equal(wolf.decisionRisk(4,"blind",migrated,1).wolfExposure,300);
}

{
  const players=six([[4],[5],[5],[6],[6],[7]]),result=vegas.compute(players,{enabled:true,scoreType:"gross",unitValue:1,holeCapPoints:20},{holeCount:1});
  assert.equal(result.ok,true);
  assert.deepEqual(result.holes[0].teams.map(team=>team.baseNumber),[45,56,67]);
  assert.deepEqual(result.teamPoints,[31,0,-31],"Tres parejas se comparan de forma pareada con tope por duelo");
  assert.equal(result.teams[0].balance,31);
  assert.equal(result.balances.a,15.5);
  assert.equal(result.metrics.duelsResolved,3);
  assert.equal(result.metrics.cappedDuels,1);
  assert.equal(result.metrics.totalPointsMoved,42);
  assert.equal(Object.values(result.balances).reduce((sum,value)=>sum+value,0),0);
  assert.equal(result.settlements.reduce((sum,item)=>sum+item.amount,0),31);
}

{
  const players=[player("a","ANA",[3]),player("b","BETO",[5]),player("c","CARLA",[4]),player("d","DIEGO",[6])],flipped=vegas.compute(players,{enabled:true,birdieFlip:true,holeCapPoints:999},{holeCount:1}),plain=vegas.compute(players,{enabled:true,birdieFlip:false,holeCapPoints:999},{holeCount:1});
  assert.equal(flipped.holes[0].matchups[0].numberB,64,"El birdie voltea el número de la pareja rival");
  assert.equal(flipped.teamPoints[0],29);
  assert.equal(plain.teamPoints[0],11);
  const bothBirdiesPlayers=[player("a","ANA",[3]),player("b","BETO",[5]),player("c","CARLA",[3]),player("d","DIEGO",[6])],bothCancel=vegas.compute(bothBirdiesPlayers,{enabled:true,birdieFlip:true,bothBirdies:"cancel",holeCapPoints:999},{holeCount:1}),bothFlip=vegas.compute(bothBirdiesPlayers,{enabled:true,birdieFlip:true,bothBirdies:"both_flip",holeCapPoints:999},{holeCount:1});
  assert.equal(bothCancel.holes[0].matchups[0].numberA,35,"Dos birdies cancelan el volteo en la regla base");
  assert.equal(bothCancel.holes[0].matchups[0].numberB,36);
  assert.equal(bothFlip.holes[0].matchups[0].numberA,53,"La regla del grupo puede voltear ambas parejas");
  assert.equal(bothFlip.holes[0].matchups[0].numberB,63);
  assert.equal(vegas.pairNumber([{value:4},{value:10}]),104,"Un score de 10 o más va primero y no produce un número ambiguo");
  const voided=vegas.compute([player("a","ANA",[3]),player("b","BETO",[5]),player("c","CARLA",["X"]),player("d","DIEGO",[6])],{enabled:true},{holeCount:1});
  assert.equal(voided.holes[0].state,"void","Una X no se convierte en número Vegas inventado");
}

{
  const players=six([[3],[4],[4],[4],[4],[4]]),configured=dots.toggleEvent(dots.toggleEvent({enabled:true,unitValue:5},1,"a","sandy"),1,"f","snake"),result=dots.compute(players,configured,{holeCount:1});
  assert.equal(result.ok,true);
  assert.deepEqual(result.summaries.find(item=>item.playerId==="a").events.map(item=>item.event).sort(),["birdie","sandy"]);
  assert.equal(result.points.a,2);
  assert.equal(result.points.f,-1);
  assert.equal(result.metrics.totalAwards,3);
  assert.equal(result.metrics.automaticAwards,1);
  assert.equal(result.metrics.manualAwards,2);
  assert.equal(result.metrics.positivePoints,2);
  assert.equal(result.metrics.negativePoints,-1);
  assert.equal(result.summaries.find(item=>item.playerId==="a").positivePoints,2);
  assert.equal(dots.EVENTS.greenie.description,"MÁS CERCA EN PAR 3 Y PAR O MEJOR");
  assert.equal(result.config.enabledEvents.ferret,false,"Ferret empieza apagado porque puede duplicar Chippie");
  assert.equal(Object.values(result.balances).reduce((sum,value)=>sum+value,0),0);
  assert.equal(result.balances.a,55,"Cada jugador paga la diferencia de puntos a cada rival");
  assert.equal(result.balances.f,-35);
  const removed=dots.toggleEvent(configured,1,"a","sandy");
  assert.equal(removed.ledger[1]?.a,undefined);
  const disabled=dots.compute(players,{enabled:true,unitValue:5,enabledEvents:{birdie:false}},{holeCount:1});
  assert.equal(disabled.points.a,0,"Un evento desactivado antes de la ronda no debe contar");
  const amigoConfig=dots.toggleEvent({enabled:true,enabledEvents:{amigo:true}},1,"b","amigo"),amigoResult=dots.compute(players,amigoConfig,{holeCount:1});
  assert.ok(amigoResult.summaries.find(item=>item.playerId==="b").events.some(item=>item.event==="amigo"));
}

{
  const names=["ANA","BETO","CARLA","DIEGO","ELENA","FABIO"],ids=["a","b","c","d","e","f"],officialPlayers=firstScores=>names.map((name,index)=>player(ids[index],name,Array(18).fill(firstScores[index]))),decisions=Object.fromEntries(Array.from({length:18},(_,index)=>{const wolfIndex=index%6;return[index+1,{type:"partner",partnerPlayerId:ids[(wolfIndex+1)%6]}]}));
  const cases=[
    {key:"wolf",players:officialPlayers([3,4,5,6,7,8]),config:{enabled:true,scoreType:"gross",tiePolicy:"push",unitValue:10,decisions},heading:/WOLF · GROSS/},
    {key:"vegas",players:officialPlayers([4,5,5,6,6,7]),config:{enabled:true,scoreType:"gross",unitValue:2,birdieFlip:true,eagleDouble:false,holeCapPoints:20},heading:/VEGAS · 3 PAREJAS/},
    {key:"dots",players:officialPlayers([3,4,4,4,4,4]),config:dots.toggleEvent(dots.toggleEvent({enabled:true,unitValue:5},1,"a","sandy"),1,"f","snake"),heading:/DOTS/}
  ];
  const pendingWolf=await roundClosure.close({id:"wolf-pending",configured:true,mode:"general",courseKey:"pulte",course:"El Pulté",createdAt:"2026-08-26T10:00:00.000Z",sideGames:{wolf:{enabled:true}},players:officialPlayers([3,4,5,6,7,8])},{appVersion:"V330"});
  assert.equal(pendingWolf.code,"SIDE_GAME_PENDING","Wolf no debe cerrar sin decisión por hoyo");
  for(const item of cases){
    const round={id:`official-${item.key}`,configured:true,mode:"general",courseKey:"pulte",course:"El Pulté",createdAt:"2026-08-26T10:00:00.000Z",sideGames:{[item.key]:item.config},players:item.players};
    const closed=await roundClosure.close(round,{appVersion:"V330",closedAt:"2026-08-26T14:00:00.000Z"});
    assert.equal(closed.ok,true,`${item.key} debe cerrar oficialmente`);
    assert.equal(closed.snapshot.sideGames[item.key].result.ok,true);
    assert.ok(closed.snapshot.sideGames[item.key].result.settlements.length,`${item.key} debe producir liquidación`);
    const artifacts=cardArtifacts.build(closed.snapshot);
    assert.match(artifacts.global.html,item.heading);
    assert.match(artifacts.global.html,/LIQUIDACIÓN:/);
    assert.match(artifacts.personal[0].html,item.heading,`${item.key} también debe aparecer en tarjeta personal`);
    const entry=cardLibrary.entry(closed.round);
    assert.equal(cardLibrary.filter([entry],{query:item.key}).length,1,`${item.key} debe localizarse en historial`);
    const history=historicalAnalytics.run(`historial de ${item.key}`,[closed.round],{now:new Date("2026-08-26T18:00:00.000Z")});
    assert.equal(history.ok,true);
    assert.match(history.speech,new RegExp(item.key,"i"));
    const central=masterDataSync.build({round:closed.round,profiles:[],courseData:{par:Array(18).fill(4),tees:{}},capturedAt:"2026-08-26T14:05:00.000Z"});
    assert.equal(central.round.sideGames[item.key].result.ok,true,`${item.key} debe viajar a nube`);
    assert.equal(accountBackup.localRound(central.round).sideGames[item.key].result.ok,true,`${item.key} debe recuperarse`);
    const before=JSON.stringify(closed.snapshot.sideGames[item.key].result.balances),changes=item.key==="wolf"?[{playerId:"a",hole:1,gross:9},{playerId:"b",hole:1,gross:9}]:[{playerId:"a",hole:1,gross:6}],changed=await roundClosure.correct(closed.round,{changes,reason:"Score verificado",authorizedBy:"Jaime",appVersion:"V330",correctedAt:"2026-08-26T14:10:00.000Z"});
    assert.equal(changed.ok,true);
    assert.equal(changed.snapshot.version,2);
    assert.notEqual(changed.snapshot.sha256,closed.snapshot.sha256);
    assert.notEqual(JSON.stringify(changed.snapshot.sideGames[item.key].result.balances),before,`${item.key} debe recalcular dinero después de corrección`);
  }
}

for(const file of ["wolf.js","vegas.js","dots.js"]){
  const source=fs.readFileSync(new URL(`./${file}`,import.meta.url),"utf8");
  assert.doesNotMatch(source,/(?:fetch\(|saveEntry|recordScore|setScore)/,`${file} no debe escribir scores ni llamar servicios`);
}

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8"),worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8"),mobile=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
for(const file of ["wolf.js","vegas.js","dots.js"]){assert.ok(html.includes(`<script src="./${file}"></script>`));assert.ok(worker.includes(`"/${file}"`));assert.ok(mobile.includes(`"${file}"`))}
for(const token of ['id="wolfConfig"','id="wolfTeePosition"','id="wolfLoneMultiplier"','id="wolfBlindMultiplier"','id="wolfHoleCap"','LOBO SOLITARIO','LOBO CIEGO','UNIDADES NETAS','data-wolf-save','id="vegasConfig"','id="vegasBothBirdies"','SCORE DE 10 O MÁS','PUNTOS MOVIDOS','id="dotsConfig"','id="dotsEventConfig"','data-dots-enabled','NO EXISTE UN PAQUETE UNIVERSAL DE DOTS','PUNTOS + / −','AMIGO · GRUPO','IZQUIERDA · GRUPO','DERECHA · GRUPO','function sideGameSpeechSummary()','MODALIDADES EXISTENTES','NUEVOS JUEGOS'])assert.ok(html.includes(token)||fs.readFileSync(new URL("./dots.js",import.meta.url),"utf8").includes(token),`Falta integración V331: ${token}`);
assert.match(worker,/gscg-mobile-v331-researched-side-games/);
assert.match(html,/function enforceExclusiveDraftGame\(preferredKey=undefined\)/,"Debe limpiar estados laterales heredados");
assert.match(html,/function syncDraftModeSelection\(preferredKey=undefined\)/,"Debe existir un único escritor visual de modalidad");
assert.match(html,/draftRoundMode="general";enforceExclusiveDraftGame\(key\);syncDraftModeSelection\(key\)/,"El toque lateral debe desmarcar visualmente las demás opciones antes de renderizar");

{
  const selectionStart=html.indexOf("const DRAFT_MODE_BUTTONS="),selectionEnd=html.indexOf("\nfunction persistDraftState",selectionStart),selectionSource=html.slice(selectionStart,selectionEnd);
  const harness=new Function(`
    const SIDE_GAME_KEYS=["skins","wolf","vegas","dots"];
    const normalizeConfig=value=>({...value,enabled:!!value?.enabled});
    const window={GSCSkins:{normalizeConfig},GSCWolf:{normalizeConfig},GSCVegas:{normalizeConfig},GSCDots:{normalizeConfig}};
    let draftRoundMode="general",draftSkins={enabled:true},draftWolf={enabled:true},draftVegas={enabled:true},draftDots={enabled:true};
    const nodes=Object.fromEntries(["normalRoundButton","matchPlayRoundButton","fourBallRoundButton","skinsRoundButton","wolfRoundButton","vegasRoundButton","dotsRoundButton"].map(id=>[id,{pressed:"",setAttribute(name,value){if(name==="aria-pressed")this.pressed=value}}]));
    const $=id=>nodes[id];
    function activeDraftGameKey(){return[{key:"skins",config:draftSkins},{key:"wolf",config:draftWolf},{key:"vegas",config:draftVegas},{key:"dots",config:draftDots}].find(item=>item.config.enabled)?.key||null}
    ${selectionSource}
    return{enforceExclusiveDraftGame,syncDraftModeSelection,nodes,snapshot:()=>({skins:draftSkins.enabled,wolf:draftWolf.enabled,vegas:draftVegas.enabled,dots:draftDots.enabled})};
  `)();
  assert.equal(harness.enforceExclusiveDraftGame("wolf"),"wolf");
  assert.deepEqual(harness.snapshot(),{skins:false,wolf:true,vegas:false,dots:false},"WOLF debe apagar incluso estados heredados de todos los demás juegos");
  assert.equal(harness.syncDraftModeSelection("wolf"),"wolf");
  assert.deepEqual(Object.fromEntries(Object.entries(harness.nodes).map(([id,node])=>[id,node.pressed])),{
    normalRoundButton:"false",matchPlayRoundButton:"false",fourBallRoundButton:"false",skinsRoundButton:"false",wolfRoundButton:"true",vegasRoundButton:"false",dotsRoundButton:"false"
  },"Sólo WOLF puede quedar verde después del toque");
}

console.log("PASS V331 · selección física única + Wolf investigado con estados, riesgo, acumulados y liquidación");
