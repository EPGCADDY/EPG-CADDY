"use strict";

(function stablefordModule(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root){
    root.GSCStableford=api;
    if(root.document){
      const install=()=>{try{api.installTournamentCourses()}catch(err){console.error("Stableford course install",err)}};
      if(root.document.readyState==="loading")root.document.addEventListener("DOMContentLoaded",install,{once:true});
      else setTimeout(install,0);
    }
  }
})(typeof globalThis!=="undefined"?globalThis:this,function buildStableford(){
  const SERIES_ID="clasificacion-senior-super-senior-ca-el-salvador-2027";
  const MAX_PLAYERS=4;
  const MAX_ROUNDS=4;
  const BEST_ROUNDS=3;
  const ALLOWED_COURSES=Object.freeze(["country_club","pulte","san_isidro","mayan_golf"]);
  const CATEGORY_CONFIG=Object.freeze({
    senior:Object.freeze({key:"senior",label:"SENIOR",handicap:0,tee:"Blanco",rankingPlaces:5,captainChoices:3}),
    super_senior:Object.freeze({key:"super_senior",label:"S. SENIOR",handicap:0,tee:"Amarillo",rankingPlaces:4,captainChoices:2})
  });
  const TOURNAMENT_COURSES=Object.freeze({
    san_isidro:Object.freeze({
      name:"San Isidro",displayName:"SAN ISIDRO",par:Object.freeze([4,3,5,3,4,4,5,4,4,4,5,4,3,4,5,3,4,4]),
      si:Object.freeze([9,15,11,13,7,1,5,17,3,4,18,8,12,2,10,14,6,16]),
      tees:Object.freeze({
        Blanco:Object.freeze({label:"BLANCAS",color:"#fff",fill:"#f3f3f3",text:"#000",yds:Object.freeze([358,139,530,155,375,436,553,259,410,409,455,383,200,385,535,149,370,369]),front:3215,back:3255,total:6470,rating:71.3,slope:121}),
        Amarillo:Object.freeze({label:"AMARILLAS",color:"#ffbf00",fill:"#ffbf00",text:"#000",yds:Object.freeze([338,129,500,144,360,410,525,228,377,374,419,354,173,374,503,131,348,349]),front:3011,back:3025,total:6036,rating:69.3,slope:121})
      })
    }),
    mayan_golf:Object.freeze({
      name:"Mayan Golf",displayName:"MAYAN GOLF",par:Object.freeze([4,3,4,4,5,4,3,4,5,4,4,4,3,5,4,4,3,5]),
      si:Object.freeze([13,15,7,9,1,3,11,5,17,6,8,4,12,10,16,2,14,18]),
      tees:Object.freeze({
        Blanco:Object.freeze({label:"BLANCAS",color:"#fff",fill:"#f3f3f3",text:"#000",yds:Object.freeze([390,132,348,397,583,418,179,357,515,388,405,392,157,566,384,394,160,530]),front:3319,back:3376,total:6695,rating:72.2,slope:145}),
        Amarillo:Object.freeze({label:"AMARILLAS",color:"#ffbf00",fill:"#ffbf00",text:"#000",yds:Object.freeze([377,120,324,380,573,407,168,345,506,334,395,385,151,562,370,387,154,519]),front:3200,back:3257,total:6457,rating:71.4,slope:130})
      })
    })
  });

  const cleanName=value=>String(value||"").trim().replace(/\s+/g," ").toUpperCase();
  const safeInteger=value=>Number.isInteger(Number(value))?Number(value):null;
  function categoryConfig(category){return CATEGORY_CONFIG[category]||null}
  function isAllowedCourse(courseKey){return ALLOWED_COURSES.includes(String(courseKey||""))}
  function pointsFor(gross,par,status){
    if(String(status||"").toLowerCase()==="x")return 0;
    const g=safeInteger(gross),p=safeInteger(par);
    if(g===null||p===null)return null;
    const againstPar=g-p;
    if(againstPar>=2)return 0;
    if(againstPar===1)return 1;
    if(againstPar===0)return 2;
    if(againstPar===-1)return 3;
    return 4;
  }
  function holeResult(entry,par){
    if(!entry)return{recorded:false,gross:null,points:null,status:null};
    const status=String(entry.status||"").toLowerCase()==="x"?"x":null;
    const gross=safeInteger(entry.gross);
    const points=pointsFor(gross,par,status);
    return{recorded:status==="x"||gross!==null,gross,status,points};
  }
  function totals(player,holes,pars){
    let gross=0,grossCount=0,points=0,count=0;
    for(const hole of holes||[]){
      const result=holeResult(player?.holes?.[hole],pars?.[hole-1]);
      if(!result.recorded)continue;
      count+=1;
      points+=result.points||0;
      if(result.gross!==null){gross+=result.gross;grossCount+=1}
    }
    return{gross,grossCount,points,count};
  }
  function bestThree(values){
    return(values||[]).map(Number).filter(Number.isFinite).sort((a,b)=>b-a).slice(0,BEST_ROUNDS).reduce((a,b)=>a+b,0);
  }
  function blankSeries(){return{id:SERIES_ID,version:1,maxRounds:MAX_ROUNDS,bestRounds:BEST_ROUNDS,allowedCourses:[...ALLOWED_COURSES],results:[],updatedAt:null}}
  function normalizeResult(value){
    if(!value||!CATEGORY_CONFIG[value.category]||!isAllowedCourse(value.courseKey))return null;
    const roundNumber=Math.trunc(Number(value.roundNumber));
    const points=Math.max(0,Math.trunc(Number(value.points)||0));
    const gross=value.gross===null||value.gross===undefined||value.gross===""?null:Math.max(0,Math.trunc(Number(value.gross)||0));
    const playerName=cleanName(value.playerName);
    if(!playerName||roundNumber<1||roundNumber>MAX_ROUNDS)return null;
    return{playerName,category:value.category,roundNumber,courseKey:String(value.courseKey),points,gross,source:value.source==="manual"?"manual":"scorecard",roundId:value.roundId?String(value.roundId):null,updatedAt:value.updatedAt||new Date().toISOString()};
  }
  function normalizeSeries(value){
    const next=blankSeries();
    const seen=new Map();
    for(const raw of Array.isArray(value?.results)?value.results:[]){
      const item=normalizeResult(raw);if(!item)continue;
      seen.set(`${item.category}|${item.playerName}|${item.roundNumber}`,item);
    }
    next.results=[...seen.values()];next.updatedAt=value?.updatedAt||null;return next;
  }
  function upsertResult(series,result){
    const next=normalizeSeries(series),item=normalizeResult(result);
    if(!item)throw new Error("Resultado Stableford inválido");
    const duplicateCourse=next.results.find(x=>x.category===item.category&&x.playerName===item.playerName&&x.courseKey===item.courseKey&&x.roundNumber!==item.roundNumber);
    if(duplicateCourse)throw new Error("Cada campo sólo puede contar en una fecha de clasificación");
    const key=`${item.category}|${item.playerName}|${item.roundNumber}`;
    const index=next.results.findIndex(x=>`${x.category}|${x.playerName}|${x.roundNumber}`===key);
    if(index>=0)next.results[index]=item;else next.results.push(item);
    next.updatedAt=new Date().toISOString();return next;
  }
  function standings(series,category){
    const config=categoryConfig(category);if(!config)return[];
    const rows=new Map();
    for(const item of normalizeSeries(series).results.filter(x=>x.category===category)){
      const row=rows.get(item.playerName)||{playerName:item.playerName,category,rounds:Array(MAX_ROUNDS).fill(null),gross:Array(MAX_ROUNDS).fill(null)};
      row.rounds[item.roundNumber-1]=item.points;row.gross[item.roundNumber-1]=item.gross;rows.set(item.playerName,row);
    }
    return[...rows.values()].map(row=>({...row,bestThree:bestThree(row.rounds),played:row.rounds.filter(Number.isFinite).length})).sort((a,b)=>b.bestThree-a.bestThree||b.played-a.played||a.playerName.localeCompare(b.playerName,"es"));
  }
  function nextRoundNumber(series,category,courseKey){
    if(!CATEGORY_CONFIG[category]||!isAllowedCourse(courseKey))return null;
    const results=normalizeSeries(series).results.filter(x=>x.category===category);
    const existing=results.find(x=>x.courseKey===courseKey);
    if(existing)return existing.roundNumber;
    const used=new Set(results.map(x=>x.roundNumber));
    for(let i=1;i<=MAX_ROUNDS;i++)if(!used.has(i))return i;
    return null;
  }
  function installTournamentCourses(){
    if(typeof COURSE_CATALOG==="undefined"||typeof COURSE_DATA==="undefined")return false;
    for(const [key,c] of Object.entries(TOURNAMENT_COURSES)){
      if(!COURSE_CATALOG[key])continue;
      COURSE_CATALOG[key].configured=true;
      COURSE_CATALOG[key].displayName=c.displayName;
      COURSE_DATA[key]={par:[...c.par],tees:{Blanco:{...c.tees.Blanco,yds:[...c.tees.Blanco.yds]},Amarillo:{...c.tees.Amarillo,yds:[...c.tees.Amarillo.yds]}},siMen:[...c.si],siWomen:[...c.si],siByTee:{Blanco:[...c.si],Amarillo:[...c.si]}};
    }
    return !!COURSE_DATA.san_isidro&&!!COURSE_DATA.mayan_golf;
  }
  return{SERIES_ID,MAX_PLAYERS,MAX_ROUNDS,BEST_ROUNDS,ALLOWED_COURSES,CATEGORY_CONFIG,TOURNAMENT_COURSES,categoryConfig,isAllowedCourse,pointsFor,holeResult,totals,bestThree,blankSeries,normalizeSeries,normalizeResult,upsertResult,standings,nextRoundNumber,cleanName,installTournamentCourses};
});
