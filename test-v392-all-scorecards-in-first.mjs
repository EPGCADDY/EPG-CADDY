import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const main=fs.readFileSync("index-grupal.html","utf8");
const stablefordStandalone=fs.readFileSync("stableford-torneo.html","utf8");
const artifactsSource=fs.readFileSync("card-artifacts.js","utf8");
const live=fs.readFileSync("live-view.js","utf8");
const individual=fs.readFileSync("index.html","utf8");

assert.match(main,/FRONT\.map\(h=>`<th class="hole-col"[^]*?<th class="sum-col">IN<\/th>\$\{BACK\.map[^]*?<th class="sum-col">OUT<\/th>/);
assert.match(main,/<th>GROSS IN<\/th><th>GROSS OUT<\/th><th>GROSS TOTAL<\/th>/);
assert.match(main,/<th>MATCH IN<\/th><th>MATCH OUT<\/th><th>MATCH TOTAL<\/th>/);
assert.match(main,/<th>PUNTOS IN<\/th><th>PUNTOS OUT<\/th><th>PUNTOS TOTAL<\/th>/);
assert.match(main,/grossIn=totals\(player,FRONT\),grossOut=totals\(player,BACK\)/);
assert.match(main,/inside=matchPlaySegment\(index,FRONT\),out=matchPlaySegment\(index,BACK\)/);
assert.match(main,/inside=fourBallSegment\(teamIndex,FRONT\),out=fourBallSegment\(teamIndex,BACK\)/);
assert.match(main,/\$\{metric\} IN<\/b><b[^]*?\$\{metric\} OUT<\/b>/);

assert.match(stablefordStandalone,/frontCells\(h=>`<th class="hole">\$\{h\}<\/th>`\)\+'<th class="sum">IN<\/th>'\+backCells[^]*?'<th class="sum">OUT<\/th>/);
assert.match(stablefordStandalone,/<th>GROSS IN<\/th><th>PTS IN<\/th><th>GROSS OUT<\/th><th>PTS OUT<\/th>/);

assert.match(artifactsSource,/const IN_HOLES=Array\.from\(\{length:9\}[^]*?OUT_HOLES=Array\.from\(\{length:9\}/);
assert.match(artifactsSource,/IN_HOLES\.map[^]*?<th>IN<\/th>\$\{OUT_HOLES\.map[^]*?<th>OUT<\/th>/);
assert.match(artifactsSource,/IN: \$\{stats\.front\.points\} puntos\. OUT: \$\{stats\.back\.points\} puntos\./);
assert.doesNotMatch(artifactsSource,/OUT: \$\{stats\.front\.points\}/);

assert.match(live,/inside\.map[^]*?<th>IN<\/th>\$\{out\.map[^]*?<th>OUT<\/th>/);
assert.match(live,/<th>GROSS IN<\/th><th>GROSS OUT<\/th><th>GROSS TOTAL<\/th>/);
assert.match(live,/segmentTotal\(player,"gross",1,9\)[^]*?segmentTotal\(player,"gross",10,18\)/);
assert.match(individual,/renderNineScorecard\(FRONT[^]*?,"IN"\);renderNineScorecard\(BACK[^]*?,"OUT"\)/);
assert.ok(individual.indexOf("<strong>IN</strong>")<individual.indexOf("<strong>OUT</strong>"));

const CardArtifacts=require("./card-artifacts.js");
const holes={};
for(let hole=1;hole<=18;hole++)holes[hole]={hole,gross:hole<=9?4:5,net:hole<=9?4:5,par:4,strokes:0};
const base={roundId:"v392-order",version:1,status:"officially_closed",mode:"general",course:"PRUEBA",playedAt:"2026-09-05T12:00:00.000Z",sha256:"abc",players:[{id:"p1",name:"JAIME",tee:"Blanco",handicap:0,holes}]};
const general=CardArtifacts.build(base).global.html;
assert.ok(general.indexOf("<th>IN</th>")<general.indexOf("<th>OUT</th>"));
assert.match(general,/<td>36<\/td>[^]*?<td>45<\/td><td>81<\/td>/);

const stableHoles={};
for(let hole=1;hole<=18;hole++)stableHoles[hole]={hole,gross:4,par:4};
const stable=CardArtifacts.build({...base,mode:"stableford",stablefordCategory:"senior",players:[{...base.players[0],holes:stableHoles}]}).global.html;
assert.ok(stable.indexOf("<th>IN<br>G/P</th>")<stable.indexOf("<th>OUT<br>G/P</th>"));

for(const [name,source] of [["main",main],["individual",individual],["stableford",stablefordStandalone],["artifacts",artifactsSource],["live",live]]){
  assert.doesNotMatch(source,/<th(?: class="[^"]*")?>GROSS OUT<\/th><th(?: class="[^"]*")?>GROSS IN<\/th>/,`${name}: resumen OUT antes de IN`);
  assert.doesNotMatch(source,/<th(?: class="[^"]*")?>MATCH OUT<\/th><th(?: class="[^"]*")?>MATCH IN<\/th>/,`${name}: Match OUT antes de IN`);
}

console.log("PASS V392 · 100% de superficies de tarjeta inventariadas usan IN=1–9 antes de OUT=10–18");
