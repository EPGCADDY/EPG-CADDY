import assert from "node:assert/strict";
import fs from "node:fs";
import matchPlay from "./match-play.js";
import roundClosure from "./round-closure.js";
import cardLibrary from "./card-library.js";
import cardArtifacts from "./card-artifacts.js";

const player=(id,name,nets)=>({id,name,holes:Object.fromEntries(nets.map((net,index)=>[index+1,{hole:index+1,gross:net+1,strokes:1,net,status:null}]))});

assert.equal(matchPlay.validatePlayers([]),false);
assert.equal(matchPlay.validatePlayers([player("a","A",[]),player("b","B",[])]),true);

{
  const players=[player("a","ANA",[4,5,3]),player("b","BETO",[5,5,4])];
  assert.deepEqual(matchPlay.holeResult(players,1).statuses,["won","lost"]);
  assert.deepEqual(matchPlay.holeResult(players,2).statuses,["tied","tied"]);
  const result=matchPlay.status(players);
  assert.equal(result.label,"ANA · 2 UP");
  assert.deepEqual(result.wins,[2,0]);
  assert.equal(result.halves,1);
  assert.equal(result.closed,false);
}

{
  const players=[player("a","ANA",Array(16).fill(4)),player("b","BETO",[5,5,5,...Array(13).fill(4)])];
  const result=matchPlay.status(players);
  assert.equal(result.closed,true);
  assert.equal(result.decidedAt,16);
  assert.equal(result.resultLabel,"ANA GANA 3 & 2");
  const closed=await roundClosure.close({id:"match-1",configured:true,mode:"match_play",courseKey:"pulte",course:"El Pulté",players,matchPlay:{...result,holes:undefined},createdAt:"2026-08-24T00:00:00.000Z"},{appVersion:"V306",closedAt:"2026-08-24T01:00:00.000Z"});
  assert.equal(closed.ok,true);
  assert.equal(closed.snapshot.mode,"match_play");
  assert.equal(closed.snapshot.matchPlay.resultLabel,"ANA GANA 3 & 2");
  const entry=cardLibrary.entry(closed.round);
  assert.equal(entry.mode,"match_play");
  const artifacts=cardArtifacts.build(closed.snapshot);
  assert.match(artifacts.global.html,/↑ ganó · ↓ perdió · sin símbolo = empate/);
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
  assert.match(html,/id="matchPlayRoundButton"[\s\S]*?MATCH PLAY · CON HDCP/);
  assert.match(html,/function matchPlayPlayerBlock[\s\S]*?let html=basePlayerBlock\(player,slot\)/,"Match Play debe copiar la tarjeta Normal sin reescribir Gross, HDCP ni Neto");
  assert.match(html,/state==="won"\?"↑":state==="lost"\?"↓":""/,"Solo ganador y perdedor llevan indicador");
  assert.doesNotMatch(html,/state==="tied"\?"\/"/,"El empate conserva el score normal sin símbolo");
  assert.match(html,/draftRoundMode==="match_play"&&draftPlayers\.length!==2/);
  assert.match(html,/mode:draftRoundMode/);
  assert.match(html,/matchPlayStatus\(\)\.closed/);
  assert.match(html,/GSCRoundClosure\.close\(round,\{deriveScore:derivedScoreForHole,appVersion:"V306"\}\)/,"El snapshot oficial Match Play debe firmarse con el build V306");
  assert.doesNotMatch(html,/appVersion:"V305"/,"Ningún cierre o corrección puede conservar la firma V305");
}

console.log("PASS V306 MATCH PLAY · TARJETA NORMAL INTACTA · NETO · ↑/↓ · AS/UP · CIERRE ANTICIPADO");
