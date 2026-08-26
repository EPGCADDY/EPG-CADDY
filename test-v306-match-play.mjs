import assert from "node:assert/strict";
import fs from "node:fs";
import matchPlay from "./match-play.js";
import roundClosure from "./round-closure.js";
import cardLibrary from "./card-library.js";
import cardArtifacts from "./card-artifacts.js";

const player=(id,name,nets)=>({id,name,holes:Object.fromEntries(nets.map((net,index)=>[index+1,{hole:index+1,gross:net+1,strokes:1,net,status:null}]))});

assert.equal(matchPlay.validatePlayers([]),false);
assert.equal(matchPlay.validatePlayers([player("a","A",[]),player("b","B",[])]),true);
assert.equal(matchPlay.validatePlayers([player("a","A",[]),player("b","B",[]),player("c","C",[]),player("d","D",[])]),true);
assert.equal(matchPlay.validatePlayers([player("a","A",[]),player("b","B",[]),player("c","C",[]),player("d","D",[]),player("e","E",[]),player("f","F",[])]),true);

{
  const players=[player("a","ANA",[4,5,3]),player("b","BETO",[5,5,4])];
  assert.deepEqual(matchPlay.holeResult(players,1).statuses,["won","lost"]);
  assert.deepEqual(matchPlay.holeResult(players,2).statuses,["tied","tied"]);
  const result=matchPlay.status(players);
  assert.equal(result.label,"ANA · 2 UP");
  assert.deepEqual(result.wins,[2,0]);
  assert.equal(result.halves,1);
  assert.equal(result.closed,false);
  assert.equal(matchPlay.segmentStanding(players,0,[1,2,3]).label,"ANA · 2 UP");
  assert.equal(matchPlay.segmentStanding(players,1,[1,2,3]).label,"BETO · 2 DOWN");
}

{
  const players=[
    player("a","ANA",Array(10).fill(4)),player("b","BETO",Array(10).fill(6)),
    player("c","CARLA",Array(18).fill(5)),player("d","DIEGO",Array(18).fill(5)),
    player("e","ELENA",Array(12).fill(3)),player("f","FABIO",Array(12).fill(5))
  ];
  const result=matchPlay.status(players);
  assert.equal(result.pairCount,3,"Match Play admite tres parejas independientes");
  assert.equal(result.matches[0].resultLabel,"ANA GANA 10 & 8");
  assert.equal(result.matches[1].resultLabel,"MATCH EMPATADO");
  assert.equal(result.matches[2].resultLabel,"ELENA GANA 12 & 6");
  assert.equal(result.closed,true);
  assert.equal(matchPlay.pairIndexForPlayer(5),2);
  const closed=await roundClosure.close({id:"match-3-pairs",configured:true,mode:"match_play",courseKey:"pulte",course:"El Pulté",players,matchPlay:{...result,holes:undefined},createdAt:"2026-08-26T00:00:00.000Z"},{appVersion:"V329",closedAt:"2026-08-26T02:00:00.000Z"});
  const artifacts=cardArtifacts.build(closed.snapshot);
  assert.match(artifacts.global.html,/PAREJA 3:/);
  assert.equal((artifacts.global.html.match(/class="pair-divider"/g)||[]).length,2);
}

{
  const players=[
    player("a","ANA",Array(10).fill(4)),
    player("b","BETO",Array(10).fill(6)),
    player("c","CARLA",Array(18).fill(5)),
    player("d","DIEGO",Array(18).fill(5))
  ];
  const result=matchPlay.status(players);
  assert.equal(result.pairCount,2,"Match Play admite dos parejas independientes");
  assert.equal(result.matches[0].resultLabel,"ANA GANA 10 & 8");
  assert.equal(result.matches[1].resultLabel,"MATCH EMPATADO");
  assert.equal(result.closed,true);
  assert.equal(matchPlay.segmentStanding(players,2,[1,2,3]).label,"CARLA · AS");
  const closed=await roundClosure.close({id:"match-2-pairs",configured:true,mode:"match_play",courseKey:"pulte",course:"El Pulté",players,matchPlay:{...result,holes:undefined},createdAt:"2026-08-25T00:00:00.000Z"},{appVersion:"V311",closedAt:"2026-08-25T02:00:00.000Z"});
  assert.equal(closed.ok,true,"Cada pareja puede cerrar en un hoyo distinto");
  const artifacts=cardArtifacts.build(closed.snapshot);
  assert.match(artifacts.global.html,/class="pair-divider"/);
  assert.match(artifacts.global.html,/PAREJA 1:/);
  assert.match(artifacts.global.html,/PAREJA 2:/);
}

{
  const players=[player("a","ANA",Array(16).fill(4)),player("b","BETO",[5,5,5,...Array(13).fill(4)])];
  const result=matchPlay.status(players);
  assert.equal(result.closed,true);
  assert.equal(result.decidedAt,16);
  assert.equal(result.resultLabel,"ANA GANA 3 & 2");
  assert.equal(matchPlay.segmentStanding(players,0,[1,2,3,4,5,6,7,8,9]).label,"ANA · 3 UP");
  assert.equal(matchPlay.segmentStanding(players,0,[10,11,12,13,14,15,16,17,18]).label,"ANA · AS");
  assert.equal(matchPlay.segmentStanding(players,0,Array.from({length:18},(_,index)=>index+1)).label,"ANA · 3 UP");
  assert.equal(matchPlay.segmentStanding(players,1,Array.from({length:18},(_,index)=>index+1)).label,"BETO · 3 DOWN");
  const closed=await roundClosure.close({id:"match-1",configured:true,mode:"match_play",courseKey:"pulte",course:"El Pulté",players,matchPlay:{...result,holes:undefined},createdAt:"2026-08-24T00:00:00.000Z"},{appVersion:"V307",closedAt:"2026-08-24T01:00:00.000Z"});
  assert.equal(closed.ok,true);
  assert.equal(closed.snapshot.mode,"match_play");
  assert.equal(closed.snapshot.matchPlay.resultLabel,"ANA GANA 3 & 2");
  const entry=cardLibrary.entry(closed.round);
  assert.equal(entry.mode,"match_play");
  const artifacts=cardArtifacts.build(closed.snapshot);
  assert.match(artifacts.global.html,/Flecha verde hacia arriba = ganó · flecha roja hacia abajo = perdió · sin símbolo = empate/);
  assert.match(artifacts.global.html,/stroke-width:4\.5/);
  assert.match(artifacts.global.html,/ANA GANA 3 &amp; 2/);
}

{
  const players=[player("a","ANA",Array(18).fill(4)),player("b","BETO",Array(18).fill(4))];
  const result=matchPlay.status(players);
  assert.equal(result.closed,true);
  assert.equal(result.resultLabel,"MATCH EMPATADO");
}

{
  const a=player("a","ANA",[4]);
  const b=player("b","BETO",[5]);
  b.holes[1].gross=4;b.holes[1].strokes=0;b.holes[1].net=4;
  assert.equal(matchPlay.holeResult([a,b],1).winnerIndex,null,"se compara Neto, no Gross");
  b.holes[2]={hole:2,gross:null,status:"x",net:0};
  assert.equal(matchPlay.holeResult([a,b],2).recorded,false,"X no decide un hoyo Match Play");
}

{
  const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
  assert.match(html,/id="matchPlayRoundButton"[\s\S]*?<span>MATCH PLAY<\/span>/);
  assert.doesNotMatch(html,/MATCH PLAY · CON HDCP/);
  assert.match(html,/function matchPlayPlayerBlock[\s\S]*?let html=basePlayerBlock\(player,slot\)/,"Match Play debe copiar la tarjeta Normal sin reescribir Gross, HDCP ni Neto");
  assert.match(html,/function matchArrowSvg\(state\)/,"Solo ganador y perdedor llevan un indicador SVG inequívoco");
  assert.match(html,/M12 22V5M5 12l7-7 7 7/,"La flecha ganadora debe tener tallo y punta ascendente completos");
  assert.match(html,/M12 2v17M5 12l7 7 7-7/,"La flecha perdedora debe tener tallo y punta descendente completos");
  assert.doesNotMatch(html,/state==="tied"\?"\/"/,"El empate conserva el score normal sin símbolo");
  assert.match(html,/draftRoundMode==="match_play"&&!\[2,4,6\]\.includes\(draftPlayers\.length\)/);
  assert.match(html,/MATCH PLAY REQUIERE 2, 4 O 6 JUGADORES/);
  assert.match(html,/teamPairSpacer\(\)\+block/);
  assert.match(html,/mode:draftRoundMode/);
  assert.match(html,/matchPlayStatus\(\)\.closed/);
  assert.match(html,/function matchPlaySummaryRows\(\)[\s\S]*?MATCH TOTAL/,'El resumen Match debe escribir OUT, IN y TOTAL como posición UP/DOWN');
  assert.match(html,/function matchPlayFinalSpeech\(state=matchPlayStatus\(\)\)/,'El cierre anticipado debe preparar el anuncio hablado con resultado y posiciones');
  assert.match(html,/FIN DEL MATCH · <strong>/,'La tarjeta debe cantar visualmente el final anticipado');
  assert.match(html,/hole>limit/,'Los hoyos posteriores a la decisión de cada pareja deben quedar bloqueados');
  assert.match(html,/CORRECCIÓN HASTA HOYO/,'Los hoyos ya jugados deben conservar corrección tras el final');
  assert.match(html,/RESULTADO POR HOYOS UP\/DOWN/,'La tarjeta digital final no debe describir un total Neto');
  assert.match(html,/GSCRoundClosure\.close\(round,\{deriveScore:derivedScoreForHole,appVersion:"V330"\}\)/,"El snapshot oficial debe firmarse con el build V330");
  assert.doesNotMatch(html,/appVersion:"V305"/,"Ningún cierre o corrección puede conservar la firma V305");
}

console.log("PASS V306/V307/V311/V330 MATCH PLAY · UNA, DOS O TRES PAREJAS · TARJETA NORMAL · NETO · FLECHAS · CIERRE INDEPENDIENTE");
