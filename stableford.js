"use strict";

(function stablefordModule(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root){
    root.GSCStableford=api;
    if(root.document){
      const install=()=>{try{api.installTournamentCourses();api.installStablefordUi()}catch(err){console.error("Stableford install",err)}};
      if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",install,{once:true});
      else setTimeout(install,0);
    }
  }
})(typeof globalThis!=="undefined"?globalThis:this,function buildStableford(){
  const SERIES_ID="clasificacion-senior-super-senior-ca-el-salvador-2027";
  const MAX_PLAYERS=5;
  const MAX_ROUNDS=4;
  const BEST_ROUNDS=3;
  const ALLOWED_COURSES=Object.freeze(["country_club","pulte","san_isidro","mayan_golf"]);
  const CATEGORY_CONFIG=Object.freeze({senior:Object.freeze({key:"senior",label:"SENIOR",handicap:0,tee:"Blanco",rankingPlaces:5,captainChoices:3}),super_senior:Object.freeze({key:"super_senior",label:"S. SENIOR",handicap:0,tee:"Amarillo",rankingPlaces:4,captainChoices:2})});
  const cleanName=value=>String(value||"").trim().replace(/\s+/g," ").toUpperCase();
  const safeInteger=value=>Number.isInteger(Number(value))?Number(value):null;
  function categoryConfig(category){return CATEGORY_CONFIG[category]||null}
  function isAllowedCourse(courseKey){return ALLOWED_COURSES.includes(String(courseKey||""))}
  function pointsFor(gross,par,status){if(String(status||"").toLowerCase()==="x")return 0;const g=safeInteger(gross),p=safeInteger(par);if(g===null||p===null)return null;const d=g-p;if(d>=2)return 0;if(d===1)return 1;if(d===0)return 2;if(d===-1)return 3;return 4}
  function holeResult(entry,par){if(!entry)return{recorded:false,gross:null,points:null,status:null};const status=String(entry.status||"").toLowerCase()==="x"?"x":null,gross=safeInteger(entry.gross),points=pointsFor(gross,par,status);return{recorded:status==="x"||gross!==null,gross,status,points}}
  function totals(player,holes,pars){let gross=0,grossCount=0,points=0,count=0;for(const hole of holes||[]){const r=holeResult(player?.holes?.[hole],pars?.[hole-1]);if(!r.recorded)continue;count++;points+=r.points||0;if(r.gross!==null){gross+=r.gross;grossCount++}}return{gross,grossCount,points,count}}
  function bestThree(values){return(values||[]).map(Number).filter(Number.isFinite).sort((a,b)=>b-a).slice(0,BEST_ROUNDS).reduce((a,b)=>a+b,0)}
  function blankSeries(){return{id:SERIES_ID,version:1,maxRounds:MAX_ROUNDS,bestRounds:BEST_ROUNDS,allowedCourses:[...ALLOWED_COURSES],results:[],updatedAt:null}}
  function normalizeResult(value){if(!value||!CATEGORY_CONFIG[value.category]||!isAllowedCourse(value.courseKey))return null;const roundNumber=Math.trunc(Number(value.roundNumber)),points=Math.max(0,Math.trunc(Number(value.points)||0)),gross=value.gross==null||value.gross===""?null:Math.max(0,Math.trunc(Number(value.gross)||0)),playerName=cleanName(value.playerName);if(!playerName||roundNumber<1||roundNumber>MAX_ROUNDS)return null;return{playerName,category:value.category,roundNumber,courseKey:String(value.courseKey),points,gross,source:value.source==="manual"?"manual":"scorecard",roundId:value.roundId?String(value.roundId):null,updatedAt:value.updatedAt||new Date().toISOString()}}
  function normalizeSeries(value){const next=blankSeries(),seen=new Map();for(const raw of Array.isArray(value?.results)?value.results:[]){const item=normalizeResult(raw);if(item)seen.set(`${item.category}|${item.playerName}|${item.roundNumber}`,item)}next.results=[...seen.values()];next.updatedAt=value?.updatedAt||null;return next}
  function upsertResult(series,result){const next=normalizeSeries(series),item=normalizeResult(result);if(!item)throw new Error("Resultado Stableford inválido");const key=`${item.category}|${item.playerName}|${item.roundNumber}`,i=next.results.findIndex(x=>`${x.category}|${x.playerName}|${x.roundNumber}`===key);if(i>=0)next.results[i]=item;else next.results.push(item);next.updatedAt=new Date().toISOString();return next}
  function standings(series,category){const config=categoryConfig(category);if(!config)return[];const rows=new Map();for(const item of normalizeSeries(series).results.filter(x=>x.category===category)){const row=rows.get(item.playerName)||{playerName:item.playerName,category,rounds:Array(MAX_ROUNDS).fill(null),gross:Array(MAX_ROUNDS).fill(null)};row.rounds[item.roundNumber-1]=item.points;row.gross[item.roundNumber-1]=item.gross;rows.set(item.playerName,row)}return[...rows.values()].map(row=>({...row,bestThree:bestThree(row.rounds),played:row.rounds.filter(Number.isFinite).length})).sort((a,b)=>b.bestThree-a.bestThree||b.played-a.played||a.playerName.localeCompare(b.playerName,"es"))}
  function nextRoundNumber(series,category,courseKey){if(!CATEGORY_CONFIG[category]||!isAllowedCourse(courseKey))return null;const results=normalizeSeries(series).results.filter(x=>x.category===category),existing=results.find(x=>x.courseKey===courseKey);if(existing)return existing.roundNumber;const used=new Set(results.map(x=>x.roundNumber));for(let i=1;i<=MAX_ROUNDS;i++)if(!used.has(i))return i;return null}
  function installTournamentCourses(){return true}
  function installStablefordUi(){return true}
  return Object.freeze({SERIES_ID,MAX_PLAYERS,MAX_ROUNDS,BEST_ROUNDS,ALLOWED_COURSES,CATEGORY_CONFIG,cleanName,categoryConfig,isAllowedCourse,pointsFor,holeResult,totals,bestThree,blankSeries,normalizeResult,normalizeSeries,upsertResult,standings,nextRoundNumber,installTournamentCourses,installStablefordUi});
});
