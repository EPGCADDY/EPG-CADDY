import assert from "node:assert/strict";
import fs from "node:fs";
import stableford from "./stableford.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V317-SETUP-VOICE-RECOVERY-20260825"/);
assert.match(html,/V275-LIVE-TURN-ANCHOR-SPEECH-LOCK-20260823/);
assert.match(html,/appVersion:"V307"/);

const courseStart=html.indexOf("const COURSE_CATALOG=");
const courseEnd=html.indexOf("let ACTIVE_COURSE_KEY",courseStart);
assert.ok(courseStart>0&&courseEnd>courseStart,"No se encontró la fuente única de campos");
const {COURSE_CATALOG,COURSE_DATA}=new Function(`${html.slice(courseStart,courseEnd)};return{COURSE_CATALOG,COURSE_DATA}`)();
const configured=Object.keys(COURSE_CATALOG).filter(key=>COURSE_CATALOG[key].configured).sort();
assert.deepEqual(configured,["alta_vista","country_club","hacienda_nueva","la_reunion","mayan_golf","pulte","san_isidro"]);

function verifyCourse(key,{par,tees,totals}){
  const data=COURSE_DATA[key];
  assert.ok(data,`Falta ${key}`);
  assert.equal(data.par.length,18);
  assert.equal(data.par.reduce((sum,value)=>sum+value,0),par);
  assert.deepEqual(Object.keys(data.tees),tees);
  assert.deepEqual(Object.fromEntries(Object.entries(data.tees).map(([tee,value])=>[tee,value.total])),totals);
  for(const value of Object.values(data.tees)){
    assert.equal(value.yds.length,18);
    assert.equal(value.yds.slice(0,9).reduce((sum,yds)=>sum+yds,0),value.front);
    assert.equal(value.yds.slice(9).reduce((sum,yds)=>sum+yds,0),value.back);
    assert.equal(value.front+value.back,value.total);
  }
}

verifyCourse("mayan_golf",{par:72,tees:["Negro","Azul","Blanco","Amarillo","Rojo"],totals:{Negro:7423,Azul:6912,Blanco:6695,Amarillo:6457,Rojo:5804}});
verifyCourse("hacienda_nueva",{par:72,tees:["Azul","Blanco","Amarillo","Rojo"],totals:{Azul:7080,Blanco:6716,Amarillo:6341,Rojo:5926}});
verifyCourse("la_reunion",{par:72,tees:["Negro","Azul","Blanco","Rojo"],totals:{Negro:7295,Azul:6821,Blanco:6277,Rojo:5657}});
assert.deepEqual(COURSE_DATA.hacienda_nueva.siMen,[3,9,13,17,15,5,1,11,7,16,18,2,10,12,6,4,14,8]);
assert.deepEqual(COURSE_DATA.hacienda_nueva.siWomen,[7,3,9,11,17,5,1,15,13,14,6,12,10,16,2,4,18,8]);
assert.equal(COURSE_DATA.mayan_golf.tees.Blanco.slope,132);
assert.equal(COURSE_DATA.mayan_golf.tees.Amarillo.rating,71.2);
assert.equal(stableford.TOURNAMENT_COURSES.mayan_golf.tees.Blanco.slope,132);
assert.equal(stableford.TOURNAMENT_COURSES.mayan_golf.tees.Amarillo.rating,71.2);
assert.match(html,/function courseRatingText\(value\)[\s\S]*?return[\s\S]*?"—"/);
assert.match(html,/function courseSlopeText\(value\)[\s\S]*?return[\s\S]*?"—"/);

const liveStart=html.indexOf("function applyLiveRoundTranscript");
const liveEnd=html.indexOf("\nfunction appendLiveRoundDelta",liveStart);
assert.ok(liveStart>0&&liveEnd>liveStart,"No se encontró la recepción viva");
const liveSource=html.slice(liveStart,liveEnd);
assert.match(liveSource,/const exact=final\?parseRoundScoreTranscript/);
assert.match(liveSource,/parseLiveRoundScorePrefix\(text,parseOptions\)/);
assert.match(liveSource,/preserved:committed\.size>0/);
assert.doesNotMatch(liveSource,/if\(final&&roundLiveOriginal\.has\(id\)\)\{rollbackLiveRoundItem/);

const roundLiveItemText=new Map(),roundLiveCommitted=new Map([["item-1",new Map([["p1:1","p1:1:gross:5"]])]]),roundLiveOriginal=new Map(),roundLiveOperationalHole=new Map();
const applyLiveRoundTranscript=new Function(
  "roundLiveItemText","round","stopMonitorActive","roundLiveCommitted","roundLiveOperationalHole","currentOperationalHole","parseRoundScoreTranscript","parseLiveRoundScorePrefix","liveScoreEntryKey","liveScoreEntryFingerprint","rememberLiveRoundOriginal","roundLiveStaging","applyLiteralScores","rollbackLiveRoundItem","roundLiveClosureQueue","$","phase","listening","persist","render",
  `${liveSource};return applyLiveRoundTranscript`
)(roundLiveItemText,{configured:true},false,roundLiveCommitted,roundLiveOperationalHole,()=>1,()=>({ok:false}),()=>({ok:false}),()=>"",()=>"",()=>{},false,()=>({ok:true}),()=>{throw new Error("No debe revertir")},[],()=>({textContent:""}),"listening",true,()=>{},()=>{});
const preserved=applyLiveRoundTranscript("item-1","Jaime cinco conversación ajena",{final:true});
assert.equal(preserved.handled,true);
assert.equal(preserved.preserved,true);

assert.match(html,/function noteRoundOperationalActivity\(\)\{roundOperationalActivityAt=Date\.now\(\);cancelOperationalMissingTimer\(\)/);
assert.match(html,/ROUND_MISSING_IDLE_MS-\(Date\.now\(\)-roundOperationalActivityAt\)/);
assert.match(html,/speech_started"&&voiceContext==="round"&&listening[^)]*\)\{[\s\S]*?noteRoundOperationalActivity\(\)/);
assert.match(html,/input_audio_transcription\.delta"&&voiceContext==="round"&&!stopMonitorActive\)\{[\s\S]*?noteRoundOperationalActivity\(\)/);
assert.match(html,/input_audio_transcription\.completed"&&voiceContext==="round"\)\{[\s\S]*?noteRoundOperationalActivity\(\)/);
assert.match(html,/Todo lo que no sea una operación reconocida de la tarjeta pasa al Caddie/);
assert.match(html,/Esta ruta nunca modifica jugadores, hoyos ni scores/);
assert.match(html,/replacedOmission:isOmittedScore\(previous\)/);

console.log("PASS V274 · siete campos, voz continua protegida, conversación y corrección X");
