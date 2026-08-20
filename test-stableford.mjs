import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const s=require("./stableford.js");

assert.deepEqual(s.ALLOWED_COURSES,["country_club","pulte","san_isidro","mayan_golf"]);
assert.equal(s.MAX_ROUNDS,4);
assert.equal(s.MAX_PLAYERS,4);
assert.deepEqual(s.categoryConfig("senior"),{key:"senior",label:"SENIOR",handicap:0,tee:"Blanco",rankingPlaces:5,captainChoices:3});
assert.equal(s.categoryConfig("super_senior").tee,"Amarillo");
assert.equal(s.pointsFor(6,4),0);
assert.equal(s.pointsFor(5,4),1);
assert.equal(s.pointsFor(4,4),2);
assert.equal(s.pointsFor(3,4),3);
assert.equal(s.pointsFor(2,4),4);
assert.equal(s.pointsFor(1,5),4);
assert.equal(s.pointsFor(null,4,"x"),0);
assert.equal(s.bestThree([31,28,34,30]),95);

let series=s.blankSeries();
for(const [roundNumber,courseKey,points] of [[1,"country_club",31],[2,"pulte",28],[3,"san_isidro",34],[4,"mayan_golf",30]]){
  series=s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber,courseKey,points,gross:80});
}
const [leader]=s.standings(series,"senior");
assert.equal(leader.bestThree,95);
assert.deepEqual(leader.rounds,[31,28,34,30]);
assert.throws(()=>s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber:2,courseKey:"country_club",points:20}),/campo/);
assert.throws(()=>s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber:5,courseKey:"pulte",points:20}),/inválido/);

console.log("Stableford: reglas, cuatro campos, cuatro fechas y mejores tres verificados.");
