import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const functionSource=(name,next)=>{
  const start=html.indexOf(`function ${name}`),end=html.indexOf(next,start);
  assert.ok(start>0&&end>start,`No se encontró ${name}`);
  return html.slice(start,end);
};

assert.match(html,/name="gscg-voice-hotfix" content="V265-FIRST-NINE-AUTOMATIC-RESULT-20260823"/);
assert.match(html,/segmentSpeech=function\(title,holes\)\{return baseSegmentSpeech\(title,holes\)\}/);
assert.match(html,/async function speakClosure\(text\)[\s\S]*await ensureSession\(\)[\s\S]*speakAuthorized\("closure",text\)/);

const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const player={name:"JAIME",holes:{}};
for(const hole of FRONT.slice(0,8))player.holes[hole]={gross:4,net:4,par:4};
const round={players:[player],announced:{front:false,back:false,complete:false}};
const segmentComplete=holes=>round.players.length>0&&round.players.every(p=>holes.every(h=>!!p.holes[h]));
const totals=(p,holes)=>holes.reduce((t,h)=>{const score=p.holes[h];if(!score)return t;t.count+=1;t.gross+=score.gross;t.net+=score.net;t.par+=score.par;return t},{count:0,gross:0,net:0,par:0});
const requiredHolesForPlayer=(p,holes)=>holes;
const playerEligibleForResults=()=>true;
const versusParSource=functionSource("versusParSpeech","function segmentSpeech");
const versusParSpeech=new Function(`${versusParSource};return versusParSpeech`)();
assert.equal(versusParSpeech(0),"par");
assert.equal(versusParSpeech(3),"3 sobre par");
assert.equal(versusParSpeech(-2),"2 bajo par");

const baseSegmentSource=functionSource("segmentSpeech","function closureSpeechIfDue");
const stableOverride=html.match(/segmentSpeech=function\(title,holes\)\{return baseSegmentSpeech\(title,holes\)\};/)?.[0];
assert.ok(stableOverride,"Falta el resumen Stableford delegado al motor oficial");
const buildSegment=new Function("round","requiredHolesForPlayer","playerEligibleForResults","totals","versusParSpeech",`
  ${baseSegmentSource}
  const baseSegmentSpeech=segmentSpeech;
  ${stableOverride}
  return segmentSpeech;
`);
const segmentSpeech=buildSegment(round,requiredHolesForPlayer,playerEligibleForResults,totals,versusParSpeech);

const ensureAnnouncedState=()=>{if(!round.announced)round.announced={front:false,back:false,complete:false}};
const closureSource=functionSource("closureSpeechIfDue","function recordScore");
const closureSpeechIfDue=new Function("round","FRONT","BACK","ALL","ensureAnnouncedState","segmentComplete","segmentSpeech",`${closureSource};return closureSpeechIfDue`)(round,FRONT,BACK,ALL,ensureAnnouncedState,segmentComplete,segmentSpeech);

assert.equal(closureSpeechIfDue(),"","Ocho hoyos no deben cerrar la primera vuelta");
player.holes[9]={gross:5,net:5,par:4};
assert.equal(closureSpeechIfDue(),"Primera vuelta. JAIME. Gross 37. Neto 37. 1 sobre par.");
assert.equal(round.announced.front,true);
assert.equal(closureSpeechIfDue(),"","La primera vuelta no debe duplicarse");

const speakClosureStart=html.indexOf("async function speakClosure"),speakClosureEnd=html.indexOf("async function speakQuery",speakClosureStart);
assert.ok(speakClosureStart>0&&speakClosureEnd>speakClosureStart,"No se encontró speakClosure");
const speakClosureSource=html.slice(speakClosureStart,speakClosureEnd);
let speechAttempts=0,sessionRetries=0;
const speakAuthorized=()=>++speechAttempts>1;
const ensureSession=async()=>{sessionRetries+=1;return true};
const speakClosure=new Function("speakAuthorized","ensureSession",`${speakClosureSource};return speakClosure`)(speakAuthorized,ensureSession);
assert.equal(await speakClosure("Primera vuelta."),true);
assert.equal(speechAttempts,2,"Debe reintentar el cierre hablado una vez abierta la sesión");
assert.equal(sessionRetries,1,"Debe recuperar la sesión de voz si el primer envío no estaba disponible");

console.log("PASS V265 · hoyo 9 anuncia automáticamente Gross, Neto y sobre/bajo par en Stableford");
