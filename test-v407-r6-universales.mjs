import assert from "node:assert/strict";
import fs from "node:fs";
import universales from "./universales.js";
import artifacts from "./card-artifacts.js";
import voice from "./voice-assistant.js";
import {normalizeLiveSnapshot} from "./api/live.js";
import liveHub from "./live-hub.js";
import liveControl from "./live-control.js";
import liveViewer from "./live-view.js";

const cases=[
  [[3,4,5,6],[6,4,2,0]],
  [[3,4,4,5],[6,3,3,0]],
  [[3,4,5,5],[6,4,1,1]],
  [[3,3,4,5],[5,5,2,0]],
  [[3,3,4,4],[5,5,1,1]],
  [[3,4,4,4],[6,2,2,2]],
  [[3,3,3,4],[4,4,4,0]],
  [[3,3,3,3],[3,3,3,3]],
  [[3,4,5],[6,4,2]],
  [[3,3,4],[5,5,2]],
  [[3,4,4],[6,3,3]],
  [[3,3,3],[4,4,4]]
];
for(const [nets,expected] of cases){
  const result=universales.distribute(nets);
  assert.deepEqual(result.points,expected,`Distribución incorrecta para ${nets}`);
  assert.equal(result.total,12);
}
assert.throws(()=>universales.distribute([3,4]),/3_O_4/);
assert.throws(()=>universales.distribute([3,4,5,6,7]),/3_O_4/);
assert.deepEqual(universales.distribute([3,Number.NaN,5]).points,[null,null,null]);

const players=["Jaime","Carlos","Miguel","Roberto"].map((name,index)=>({id:`p${index+1}`,name}));
const scores={p1:{1:{net:4}},p2:{1:{net:4}},p3:{1:{net:5}},p4:{1:{net:5}}};
assert.deepEqual(universales.hole(players,1,(player,hole)=>scores[player.id][hole]).pointsById,{p1:5,p2:5,p3:1,p4:1});

const snapshot={roundId:"round-universales-1",version:1,status:"officially_closed",mode:"universales",sha256:"abc123",course:"EL PULTÉ",playedAt:"2026-09-08T12:00:00.000Z",players:players.map((player,index)=>({...player,handicap:index,tee:"BLANCAS",holes:{1:{hole:1,par:4,gross:index<2?4:5,net:index<2?4:5,strokes:0}}}))};
const cards=artifacts.build(snapshot);
assert.equal(cards.global.mode,"universales");
assert.match(cards.global.name,/tarjeta-global-universales/);
assert.match(cards.global.html,/G\/N\/P/);
assert.match(cards.global.html,/5/);
assert.equal(cards.personal.length,4);
assert.match(cards.personal[0].html,/Puntos total/);
assert.equal(normalizeLiveSnapshot(snapshot).mode,"universales");
assert.equal(liveHub.modeLabel("universales"),"UNIVERSALES");
assert.equal(voice.parse("Quiero jugar Universales").action,"open_universales");
const liveSnapshot=liveControl.buildLiveSnapshot({id:"round-live-universales",configured:true,mode:"universales",course:"EL PULTÉ",createdAt:"2026-09-08T12:00:00.000Z",updatedAt:"2026-09-08T12:01:00.000Z",players:snapshot.players},{course:"EL PULTÉ",pars:Array(18).fill(4)});
assert.equal(liveSnapshot.mode,"universales");
assert.deepEqual(liveSnapshot.players.map(player=>player.holes[0].universalesPoints),[5,5,1,1]);
assert.deepEqual(liveSnapshot.players.map(player=>player.totals.universalesPoints),[5,5,1,1]);
const liveCard=liveViewer.streamCard({id:"stream-universales",groupLabel:"GRUPO 1",snapshot:liveSnapshot});
assert.match(liveCard,/UNIVERSALES/);
assert.match(liveCard,/PUNTOS UNIVERSALES/);
const liveRanks=liveHub.buildLeaderboard(new Map([["stream-universales",{id:"stream-universales",groupLabel:"GRUPO 1",snapshot:liveSnapshot}]]));
assert.deepEqual(liveRanks.map(item=>item.name),["Carlos","Jaime","Miguel","Roberto"]);
assert.deepEqual(liveRanks.map(item=>item.universalesPoints),[5,5,1,1]);
const liveApi=fs.readFileSync(new URL("./api/live.js",import.meta.url),"utf8"),liveControlSource=fs.readFileSync(new URL("./live-control.js",import.meta.url),"utf8"),liveMigration=fs.readFileSync(new URL("./database/005_live_tournament_mode.sql",import.meta.url),"utf8");
assert.match(liveControlSource,/id="liveTournamentMode"/);
assert.match(liveControlSource,/LIVE_TOURNAMENT_MODE_MISMATCH/);
assert.match(liveApi,/candidate\.current_snapshot->>'mode'.*tournament\.mode/);
assert.match(liveMigration,/universales/);

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/id="universalesRoundButton"/);
assert.match(html,/>UNIVERSALES</);
assert.doesNotMatch(html,/id="dotsRoundButton"/);
assert.doesNotMatch(html,/id="dotsConfig"/);
assert.doesNotMatch(html,/saveDotsDraftConfig/);
assert.match(html,/UNIVERSALES REQUIERE 3 O 4 JUGADORES/);
assert.match(html,/function renderUniversales/);
assert.match(html,/GSCUniversales\.hole/);
assert.match(html,/PUNTOS TOTAL/);
for(const token of ["courseOptions","tournamentToggle","data-draft-category","data-draft-hcp","data-draft-tee","setupMic","roundManualEntry","previousRoundButton","cardLibraryOverlay","finalCardOverlay","shareFinalLiveButton","sendFinalCard","clearAllRegistration"]){assert.match(html,new RegExp(token),`Falta configuración/recorrido compartido ${token}`)}
const mobileBuild=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
assert.match(mobileBuild,/"universales\.js"/);
assert.doesNotMatch(fs.readFileSync(new URL("./card-artifacts.js",import.meta.url),"utf8"),/>DOTS</);
console.log("PASS V407-R6 · UNIVERSALES distribuye exactamente 12 puntos con 3/4 jugadores y todos los empates");
