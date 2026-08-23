import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const functionSource=(name,next)=>{
  const start=html.indexOf(`function ${name}`),end=html.indexOf(next,start);
  assert.ok(start>0&&end>start,`No se encontró ${name}`);
  return html.slice(start,end);
};

assert.match(html,/name="gscg-voice-hotfix" content="V266-STABLEFORD-SEGMENT-GROSS-POINTS-20260823"/);
const stableOverride=html.match(/segmentSpeech=function\(title,holes\)\{if\(!isStablefordRound\(\)\)return baseSegmentSpeech\(title,holes\);[\s\S]*?\};/)?.[0];
assert.ok(stableOverride,"Falta el resumen Stableford con nombre, Gross y puntos");
assert.equal((html.match(/finishStablefordManualScoreChange\(\)/g)||[]).length,3,"El guardado manual y la edición manual deben compartir el mismo cierre");

const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const players=[{name:"JAIME",holes:{}},{name:"MARÍA",holes:{}}];
const round={mode:"stableford",players,announced:{front:false,back:false,complete:false}};
const addScores=(player,holes,gross,points)=>{for(const hole of holes)player.holes[hole]={gross,points}};
addScores(players[0],FRONT.slice(0,8),4,2);
addScores(players[1],FRONT.slice(0,8),4,2);

const isStablefordRound=()=>round.mode==="stableford";
const stablefordTotals=(player,holes)=>holes.reduce((total,hole)=>{
  const score=player.holes[hole];
  if(!score)return total;
  total.count+=1;total.gross+=score.gross;total.points+=score.points;
  return total;
},{count:0,gross:0,points:0});
const baseSegmentSpeech=(title)=>`GENERAL ${title}`;
const segmentSpeech=new Function("round","ALL","isStablefordRound","stablefordTotals","baseSegmentSpeech",`${stableOverride};return segmentSpeech`)(round,ALL,isStablefordRound,stablefordTotals,baseSegmentSpeech);

round.mode="general";
assert.equal(segmentSpeech("Primera vuelta.",FRONT),"GENERAL Primera vuelta.","General debe conservar su discurso base");
round.mode="stableford";

const ensureAnnouncedState=()=>{if(!round.announced)round.announced={front:false,back:false,complete:false}};
const segmentComplete=holes=>round.players.length>0&&round.players.every(player=>holes.every(hole=>!!player.holes[hole]));
const closureSource=functionSource("closureSpeechIfDue","function recordScore");
const closureSpeechIfDue=new Function("round","FRONT","BACK","ALL","ensureAnnouncedState","segmentComplete","segmentSpeech",`${closureSource};return closureSpeechIfDue`)(round,FRONT,BACK,ALL,ensureAnnouncedState,segmentComplete,segmentSpeech);

assert.equal(closureSpeechIfDue(),"","Ocho hoyos no deben cerrar la primera vuelta");
players[0].holes[9]={gross:5,points:1};
players[1].holes[9]={gross:4,points:2};
assert.equal(
  closureSpeechIfDue(),
  "Primera vuelta. JAIME. Gross 37. Puntos 17. MARÍA. Gross 36. Puntos 18."
);
assert.equal(closureSpeechIfDue(),"","La primera vuelta no debe duplicarse");

addScores(players[0],BACK,4,2);
addScores(players[1],BACK,5,1);
assert.equal(
  closureSpeechIfDue(),
  "Segunda vuelta. JAIME. Gross 36. Puntos 18. MARÍA. Gross 45. Puntos 9. Total. JAIME. Gross 73. Puntos 35. MARÍA. Gross 81. Puntos 27."
);
assert.equal(round.announced.back,true);
assert.equal(round.announced.complete,true);
assert.equal(closureSpeechIfDue(),"","La segunda vuelta y el total no deben duplicarse");

const manualFinishSource=functionSource("finishStablefordManualScoreChange","function registerStablefordRoster");
let manualClosureCalls=0,manualPersistCalls=0,manualRenderCalls=0;
const manualSpoken=[];
const finishStablefordManualScoreChange=new Function("closureSpeechIfDue","persist","render","speakClosure",`${manualFinishSource};return finishStablefordManualScoreChange`)(
  ()=>{manualClosureCalls+=1;return"Primera vuelta. JAIME. Gross 37. Puntos 17."},
  ()=>{manualPersistCalls+=1},
  ()=>{manualRenderCalls+=1},
  text=>{manualSpoken.push(text)}
);
assert.equal(finishStablefordManualScoreChange(),"Primera vuelta. JAIME. Gross 37. Puntos 17.");
assert.equal(manualClosureCalls,1);
assert.equal(manualPersistCalls,1);
assert.equal(manualRenderCalls,1);
assert.deepEqual(manualSpoken,["Primera vuelta. JAIME. Gross 37. Puntos 17."],"El control manual debe guardar, renderizar y pronunciar el mismo cierre");

console.log("PASS V266 · Stableford manual/voz anuncia nombre, Gross y puntos en primera vuelta, segunda vuelta y total");
