import assert from "node:assert/strict";
import fs from "node:fs";
import stableford from "./stableford.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

// Recupera la configuración oficial que usa la aplicación, sin mantener una
// segunda copia de pares, yardajes, marcas ni matrices en esta prueba.
const courseStart=html.indexOf("const COURSE_CATALOG=");
const courseEnd=html.indexOf("let ACTIVE_COURSE_KEY",courseStart);
assert.ok(courseStart>0&&courseEnd>courseStart,"No se encontró la fuente oficial de campos");
const courseSource=html.slice(courseStart,courseEnd);
const {COURSE_CATALOG,COURSE_DATA}=new Function(`${courseSource};return{COURSE_CATALOG,COURSE_DATA}`)();

const rowStart=html.indexOf("function roundManualPlayerRows");
const rowEnd=html.indexOf("\nfunction roundGridStatus",rowStart);
assert.ok(rowStart>0&&rowEnd>rowStart,"No se encontró el control manual común");
const rowSource=html.slice(rowStart,rowEnd);
const renderManualRows=new Function("round","manualSegmentValue","manualHoleResult","FRONT","BACK","ALL","escapeHtml",`${rowSource};return roundManualPlayerRows`);
const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];

function verifyRoundShape({mode,courseKey,category=null,count,tee,tournament=false,provisional=false}){
  assert.ok(Number.isInteger(count)&&count>=1&&count<=6);
  const players=Array.from({length:count},(_,index)=>({id:`${mode}-${courseKey}-${category||"general"}-${index+1}`,name:`JUGADOR ${index+1}`,handicap:mode==="stableford"?0:(index*7)%55,tee,holes:{}}));
  const round={mode,courseKey,stablefordCategory:category,configured:true,provisional,officiallyClosedAt:null,tournament:tournament?{name:"TORNEO MATRIZ"}:null,players};
  const rowRenderer=renderManualRows(round,()=>({count:0,total:0}),()=>({recorded:false,gross:null}),FRONT,BACK,ALL,value=>String(value));
  const manualRows=rowRenderer(1);
  assert.equal((manualRows.match(/class="round-grid-name"/g)||[]).length,count);
  assert.equal((manualRows.match(/class="round-grid-gross"/g)||[]).length,count);
  assert.doesNotMatch(manualRows,new RegExp(`JUGADOR ${count+1}`));
  return round
}

let stablefordConfigurations=0;
for(const courseKey of stableford.ALLOWED_COURSES){
  const data=COURSE_DATA[courseKey]||stableford.TOURNAMENT_COURSES[courseKey];
  assert.ok(data,`Falta tarjeta oficial Stableford para ${courseKey}`);
  assert.equal(data.par.length,18);
  for(const category of Object.keys(stableford.CATEGORY_CONFIG)){
    const cfg=stableford.categoryConfig(category);
    const tees=data.tees||COURSE_DATA[courseKey]?.tees;
    assert.ok(tees?.[cfg.tee],`Faltan marcas ${cfg.tee} para ${courseKey}/${category}`);
    for(let count=1;count<=6;count++)for(const tournament of [false,true]){
      verifyRoundShape({mode:"stableford",courseKey,category,count,tee:cfg.tee,tournament});
      stablefordConfigurations++;
    }
  }
}
assert.equal(stablefordConfigurations,96,"4 campos × 2 categorías × 1–6 jugadores × torneo con/sin nombre");

const generalCourses=Object.keys(COURSE_DATA).filter(key=>COURSE_CATALOG[key]?.configured);
assert.deepEqual(generalCourses.sort(),["country_club","pulte"]);
let generalConfigurations=0;
for(const courseKey of generalCourses){
  const data=COURSE_DATA[courseKey];
  assert.equal(data.par.length,18);
  for(const tee of Object.keys(data.tees))for(let count=1;count<=6;count++)for(const tournament of [false,true]){
    verifyRoundShape({mode:"general",courseKey,count,tee,tournament});
    generalConfigurations++;
  }
  // Una combinación mixta por cada tamaño comprueba que cada jugador puede
  // conservar marcas distintas sin crear otra arquitectura.
  const tees=Object.keys(data.tees);
  for(let count=1;count<=6;count++)for(const tournament of [false,true]){
    const round=verifyRoundShape({mode:"general",courseKey,count,tee:tees[0],tournament});
    round.players.forEach((player,index)=>{player.tee=tees[index%tees.length]});
    assert.equal(new Set(round.players.map(player=>player.id)).size,count);
    generalConfigurations++;
  }
  verifyRoundShape({mode:"general",courseKey,count:6,tee:tees[0],provisional:true});
  generalConfigurations++;
}
assert.equal(generalConfigurations,146,"General: marcas individuales/mixtas, 1–6, torneo y sin registro");

// Manual, final de voz e incremental deben desembocar en la misma operación.
assert.match(html,/function applyManualScoreEntries\(entries\)[\s\S]*?applyLiteralScores\(\{matched:true,ok:true,entries\}\)/);
assert.match(html,/const result=parsed\.ok\?applyLiteralScores\(parsed\):parsed/);
assert.match(html,/result=applyLiteralScores\(\{matched:true,ok:true,entries:fresh\}\)/);
assert.match(html,/parseRoundScoreTranscript=function\(transcript\)\{return isStablefordRound\(\)\?parseStablefordTranscript\(transcript\):baseParseRoundScoreTranscript\(transcript\)\}/);
assert.equal((html.match(/id="roundManualEntry"/g)||[]).length,1);
assert.doesNotMatch(html,/id="stablefordManualEntry"/);

console.log(`PASS V267 · matriz integral ${stablefordConfigurations+generalConfigurations} configuraciones de Score Card por una arquitectura`);
