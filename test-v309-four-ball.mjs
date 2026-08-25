import assert from "node:assert/strict";
import fs from "node:fs";
import fourBall from "./four-ball.js";
import roundClosure from "./round-closure.js";
import cardArtifacts from "./card-artifacts.js";
import cardLibrary from "./card-library.js";
import roundNavigation from "./round-navigation.js";
import masterDataSync from "./master-data-sync.js";
import accountBackup from "./account-backup.js";
import historicalAnalytics from "./historical-analytics.js";

const score=(hole,net,strokes=1)=>({hole,gross:net+strokes,strokes,net,par:4,diff:net-4,status:null});
const player=(id,name,nets)=>({id,name,handicap:12,tee:"Blanco",holes:Object.fromEntries(nets.map((net,index)=>[index+1,score(index+1,net)]))});

assert.equal(fourBall.validatePlayers([]),false);
assert.equal(fourBall.validatePlayers([player("a","ANA",[]),player("b","BETO",[])]),true);
assert.equal(fourBall.validatePlayers([player("a","ANA",[]),player("b","BETO",[]),player("c","CARLA",[]),player("d","DIEGO",[])]),true);
assert.equal(fourBall.teamIndexForPlayer(0),0);
assert.equal(fourBall.teamIndexForPlayer(3),1);

{
  const players=[
    player("a","ANA",[4,5,5]),
    player("b","BETO",[6,4,6]),
    player("c","CARLA",[5,4,4]),
    player("d","DIEGO",[7,6,5])
  ];
  const first=fourBall.holeResult(players,1),second=fourBall.holeResult(players,2),third=fourBall.holeResult(players,3);
  assert.equal(first.winnerTeamIndex,0,"Hoyo 1: gana el mejor Neto de la Pareja Verde");
  assert.deepEqual(first.teamBest.map(item=>item.score),[4,5]);
  assert.equal(first.teamBest[0].playerIndexes[0],0,"ANA aporta la mejor bola Verde");
  assert.equal(second.winnerTeamIndex,null,"Hoyo 2 empatado por mejores Netos");
  assert.equal(third.winnerTeamIndex,1,"Hoyo 3: gana la Pareja Oro");
  assert.equal(fourBall.teamStanding(players,0,[1]).position,"+1");
  assert.equal(fourBall.teamStanding(players,0,[1,2]).position,"+1","Un hoyo empatado conserva +1");
  assert.equal(fourBall.teamStanding(players,1,[1,2]).position,"−1","La pareja rival conserva −1");
  assert.equal(fourBall.teamStanding(players,0,[1,2,3]).position,"EVEN");
}

{
  const players=[player("a","ANA",Array(18).fill(4)),player("b","BETO",Array(18).fill(5))],result=fourBall.status(players);
  assert.equal(result.teamCount,1,"Four Ball admite una sola pareja");
  assert.equal(result.closed,true);
  assert.equal(result.resultLabel,"PAREJA VERDE · NETO TOTAL 72");
  assert.equal(fourBall.teamStanding(players,0,[1,2,3]).position,"NETO 12");
  const singleClosed=await roundClosure.close({id:"four-ball-single",configured:true,mode:"four_ball",courseKey:"pulte",course:"El Pulté",players,fourBall:{...result,holes:undefined},createdAt:"2026-08-25T00:00:00.000Z"},{appVersion:"V311",closedAt:"2026-08-25T03:00:00.000Z"});
  assert.equal(singleClosed.ok,true);
  const singleArtifacts=cardArtifacts.build(singleClosed.snapshot);
  assert.equal(singleArtifacts.personal.length,2);
  assert.match(singleArtifacts.global.html,/Una o dos parejas/);
  assert.doesNotMatch(singleArtifacts.personal[0].html,/Rivales:/);
}

{
  const incomplete=[player("a","ANA",[4]),player("b","BETO",[5]),player("c","CARLA",[6]),player("d","DIEGO",[])];
  assert.equal(fourBall.holeResult(incomplete,1).recorded,false,"El hoyo requiere Gross de los cuatro jugadores");
}

const decisivePlayers=[
  player("a","ANA",Array(10).fill(4)),
  player("b","BETO",Array(10).fill(5)),
  player("c","CARLA",Array(10).fill(6)),
  player("d","DIEGO",Array(10).fill(7))
];
const decisive=fourBall.status(decisivePlayers);
assert.equal(decisive.closed,true);
assert.equal(decisive.decidedAt,10);
assert.equal(decisive.resultLabel,"PAREJA VERDE GANA 10 & 8");

const closed=await roundClosure.close({
  id:"four-ball-1",configured:true,mode:"four_ball",courseKey:"pulte",course:"El Pulté",players:decisivePlayers,
  fourBall:{...decisive,holes:undefined},createdAt:"2026-08-25T00:00:00.000Z"
},{appVersion:"V309",closedAt:"2026-08-25T01:00:00.000Z"});
assert.equal(closed.ok,true);
assert.equal(closed.snapshot.mode,"four_ball");
assert.equal(closed.snapshot.players.length,4);
assert.equal(closed.snapshot.fourBall.resultLabel,"PAREJA VERDE GANA 10 & 8");

const libraryEntry=cardLibrary.entry(closed.round);
assert.equal(libraryEntry.mode,"four_ball");
assert.equal(cardLibrary.filter([libraryEntry],{mode:"four_ball"}).length,1);
assert.equal(roundNavigation.modeOf(closed.round),"four_ball");
assert.equal(roundNavigation.resolve([closed.round],null,"four_ball").target.mode,"four_ball");

const central=masterDataSync.build({round:closed.round,profiles:[],courseData:{par:Array(18).fill(4),tees:{}},capturedAt:"2026-08-25T02:00:00.000Z"});
assert.equal(central.round.mode,"four_ball");
const restored=accountBackup.localRound(central.round);
assert.equal(restored.mode,"four_ball");
assert.equal(restored.fourBall.resultLabel,"PAREJA VERDE GANA 10 & 8");
const historical=historicalAnalytics.run("REPORTE FOUR BALL DEL ÚLTIMO MES",[closed.round],{now:new Date("2026-08-25T04:00:00.000Z")});
assert.equal(historical.matched,true);
assert.equal(historical.ok,true);

const artifacts=cardArtifacts.build(closed.snapshot);
assert.equal(artifacts.global.mode,"four_ball");
assert.equal(artifacts.personal.length,4);
assert.match(artifacts.global.name,/tarjeta-global-four-ball/);
assert.match(artifacts.global.html,/PAREJA VERDE/);
assert.match(artifacts.global.html,/PAREJA ORO/);
assert.match(artifacts.global.html,/★ MEJOR/);
assert.match(artifacts.global.html,/Una o dos parejas, con HCP individual y resultado separado por pareja/);
assert.match(artifacts.global.html,/class="pair-divider"/);
assert.match(artifacts.personal[0].html,/NETO COMPAÑERO/);
assert.match(artifacts.personal[0].html,/MEJOR NETO RIVAL/);

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const mobile=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const vercel=fs.readFileSync(new URL("./vercel.json",import.meta.url),"utf8");
assert.match(html,/gscg-four-ball" content="V309-TWO-PAIRS-BEST-NET-CUMULATIVE-MATCH-20260825"/);
assert.match(html,/id="fourBallRoundButton"[\s\S]*?<span>FOUR BALL<\/span>/);
assert.match(html,/FOUR BALL REQUIERE 2 O 4 JUGADORES/);
assert.doesNotMatch(html,/FOUR BALL · 2 PAREJAS/);
assert.match(html,/FOUR BALL · REGISTRA UNA O DOS PAREJAS/);
assert.match(html,/team-pair-spacer/);
assert.match(html,/function fourBallPlayerBlock/);
assert.match(html,/function fourBallHoleStanding/);
assert.match(html,/fourBallStatus\(\)\.closed/);
assert.match(html,/MEJOR NETO POR PAREJA/);
assert.match(html,/CONTROL MANUAL · \$\{stable\?"STABLEFORD":isFourBallRound\(\)\?"FOUR BALL"/);
assert.match(html,/Modalidad Four Ball por parejas/);
assert.match(html,/round\.fourBall=\{\.\.\.state,holes:undefined\}/);
assert.match(worker,/"\/four-ball\.js"/);
assert.match(mobile,/"four-ball\.js"/);
assert.match(vercel,/four-ball/);

console.log("PASS V309/V310/V311 · FOUR BALL · UNA O DOS PAREJAS · HCP INDIVIDUAL · MEJOR NETO · SEPARACIÓN · EXPORTACIÓN");
