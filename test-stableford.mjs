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

assert.deepEqual(s.TOURNAMENT_COURSES.san_isidro.par,[4,3,5,3,4,4,5,4,4,4,5,4,3,4,5,3,4,4]);
assert.deepEqual(s.TOURNAMENT_COURSES.san_isidro.tees.Blanco.yds,[358,139,530,155,375,436,553,259,410,409,455,383,200,385,535,149,370,369]);
assert.deepEqual(s.TOURNAMENT_COURSES.san_isidro.tees.Amarillo.yds,[338,129,500,144,360,410,525,228,377,374,419,354,173,374,503,131,348,349]);
assert.equal(s.TOURNAMENT_COURSES.san_isidro.tees.Blanco.total,6470);
assert.equal(s.TOURNAMENT_COURSES.san_isidro.tees.Amarillo.total,6036);
assert.deepEqual(s.TOURNAMENT_COURSES.mayan_golf.par,[4,3,4,4,5,4,3,4,5,4,4,4,3,5,4,4,3,5]);
assert.deepEqual(s.TOURNAMENT_COURSES.mayan_golf.tees.Blanco.yds,[390,132,348,397,583,418,179,357,515,388,405,392,157,566,384,394,160,530]);
assert.deepEqual(s.TOURNAMENT_COURSES.mayan_golf.tees.Amarillo.yds,[377,120,324,380,573,407,168,345,506,334,395,385,151,562,370,387,154,519]);
assert.equal(s.TOURNAMENT_COURSES.mayan_golf.tees.Blanco.total,6695);
assert.equal(s.TOURNAMENT_COURSES.mayan_golf.tees.Amarillo.total,6457);

let series=s.blankSeries();
for(const [roundNumber,courseKey,points] of [[1,"country_club",31],[2,"pulte",28],[3,"san_isidro",34],[4,"mayan_golf",30]]){
  series=s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber,courseKey,points,gross:80});
}
const [leader]=s.standings(series,"senior");
assert.equal(leader.bestThree,95);
assert.deepEqual(leader.rounds,[31,28,34,30]);
assert.throws(()=>s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber:2,courseKey:"country_club",points:20}),/campo/);
assert.throws(()=>s.upsertResult(series,{playerName:"JAIME KIRSTE",category:"senior",roundNumber:5,courseKey:"pulte",points:20}),/inválido/);
assert.equal(s.installTournamentCourses(),false,"En Node no debe intentar tocar globals del navegador");

console.log("Stableford: reglas, matrices de cuatro campos, cuatro fechas y mejores tres verificados.");