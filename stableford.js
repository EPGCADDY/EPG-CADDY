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
  const MAX_PLAYERS=6;
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
        Amarillo:Object.freeze({label:"AMARILLAS",color:"#ffbf00",fill:"#ffbf00",text:"#000",yds:Object.freeze([335,132,500,134,369,429,543,230,377,371,419,354,165,364,522,128,360,356]),front:3049,back:3039,total:6088,rating:69.3,slope:121})
      })
    }),
    mayan_golf:Object.freeze({
      name:"Mayan Golf",displayName:"MAYAN GOLF",par:Object.freeze([4,3,4,4,5,4,3,4,5,4,4,4,3,5,4,4,3,5]),
      si:Object.freeze([13,15,7,9,1,3,11,5,17,6,8,4,12,10,16,2,14,18]),
      tees:Object.freeze({
        Blanco:Object.freeze({label:"BLANCAS",color:"#fff",fill:"#f3f3f3",text:"#000",yds:Object.freeze([390,132,348,397,583,418,179,357,515,388,405,392,157,566,384,394,160,530]),front:3319,back:3376,total:6695,rating:72.2,slope:132}),
        Amarillo:Object.freeze({label:"AMARILLAS",color:"#ffbf00",fill:"#ffbf00",text:"#000",yds:Object.freeze([377,120,324,380,573,407,168,345,506,334,395,385,151,562,370,387,154,519]),front:3200,back:3257,total:6457,rating:71.2,slope:130})
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
      const existing=COURSE_DATA[key],complete=Array.isArray(existing?.par)&&existing.par.length===18&&existing?.tees?.Blanco&&existing?.tees?.Amarillo;
      if(!complete)COURSE_DATA[key]={par:[...c.par],tees:{Blanco:{...c.tees.Blanco,yds:[...c.tees.Blanco.yds]},Amarillo:{...c.tees.Amarillo,yds:[...c.tees.Amarillo.yds]}},siMen:[...c.si],siWomen:[...c.si],siByTee:{Blanco:[...c.si],Amarillo:[...c.si]}};
    }
    if(typeof renderCourseInfo==="function"&&!renderCourseInfo.__stablefordSafe){
      const baseRenderCourseInfo=renderCourseInfo;
      const safeRender=function(){
        const standard=["Negro","Azul","Blanco","Rojo","Amarillo"];
        if(typeof TEES==="undefined"||standard.every(k=>TEES[k]))return baseRenderCourseInfo();
        const rows=standard.filter(k=>TEES[k]).map(k=>[k,TEES[k]]);
        const target=typeof $==="function"?$("courseInfo"):null;if(!target)return;
        target.innerHTML=`<div class="head">YARDAS</div><div class="head">COURSE RATING</div><div class="head">SLOPE RATING</div>${rows.map(([k,t])=>`<div style="text-align:left"><span class="tee-dot" style="background:${t.color}"></span><span style="color:${t.color};font-weight:800">${Number(t.total).toLocaleString("en-US")}</span></div><div style="text-align:center">${Number(t.rating).toFixed(1)}</div><div style="text-align:center">${Number(t.slope)}</div>`).join("")}`;
      };
      safeRender.__stablefordSafe=true;
      renderCourseInfo=safeRender;
    }
    return !!COURSE_DATA.san_isidro&&!!COURSE_DATA.mayan_golf;
  }
  function installStablefordUi(){
    if(typeof document==="undefined")return false;
    try{
      const params=new URLSearchParams(location.search);
      if(params.get("stableford_emergency")==="countryclub"){
        localStorage.removeItem("golf-score-card-guatemala-group-round-v2");
        localStorage.removeItem("golf-score-card-guatemala-group-round-v2-backup");
        localStorage.removeItem("golf-score-card-guatemala-group-draft-v1");
        sessionStorage.setItem("gscg_stableford_emergency","countryclub");
      }
    }catch{}
    const overlay=document.getElementById("stablefordSetupOverlay"),card=overlay?.querySelector(".stableford-setup-card");
    if(!overlay||!card)return false;
    const stablefordVoiceActive=()=>overlay.classList.contains("visible")||(typeof round!=="undefined"&&round?.mode==="stableford");

    // Stableford usa exactamente la ruta Realtime base ya probada de GRUPAL.


    // Micrófono Stableford: handler base GRUPAL sin wrapper intermedio.


    if(!document.getElementById("stablefordTournamentName")){
      const facts=document.getElementById("stablefordSetupFacts");
      const wrap=document.createElement("label");
      wrap.className="stableford-tournament-field";
      wrap.innerHTML='<span>NOMBRE DEL TORNEO</span><input id="stablefordTournamentName" maxlength="80" autocomplete="off" placeholder="NOMBRE DEL TORNEO">';
      (facts?.parentNode||card).insertBefore(wrap,facts?.nextSibling||card.firstChild);
    }
    if(!document.getElementById("stablefordSetupMicWrap")){
      const course=document.getElementById("stablefordSetupCourse");
      const parent=course?.parentNode||card,anchor=course?.nextSibling||card.firstChild;
      const prompt=document.createElement("div");
      prompt.className="voice-prompt stableford-voice-prompt";
      prompt.innerHTML='<strong>REGISTRO DE JUGADORES · CADDIE UNIVERSAL</strong><span>REGISTRA O PREGUNTA CUALQUIER TEMA</span>';
      const method=document.createElement("section");
      method.className="registration-method stableford-registration-method";
      method.setAttribute("aria-label","Método 1 Dictado Stableford");
      method.innerHTML='<div class="newbie-registration-guide" aria-label="Instrucciones de registro Stableford por posición"><div class="newbie-guide-title">DICTA ASÍ:</div><div>1-# JUGADOR</div><div>2-NOMBRE</div><div class="newbie-guide-player">HASTA 6 JUGADORES</div><div>3-OK</div></div><div class="nr-mic stableford-registration-mic" id="stablefordSetupMicWrap"><button class="mic-hit" id="stablefordSetupMic" type="button" aria-label="Abrir Caddie universal o dictar jugadores Stableford"></button><div class="mic-visual" aria-hidden="true"><svg class="setup-mic-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21H8v2h8v-2h-3v-3.08A7 7 0 0 0 19 11h-2Z"/></svg></div></div>';
      parent.insertBefore(prompt,anchor);
      parent.insertBefore(method,anchor);
      const hit=document.getElementById("stablefordSetupMic");
      const activate=e=>{if(typeof fireMicActivation==="function")return fireMicActivation("setup",e);return false};
      if(hit){
        if(globalThis.PointerEvent)hit.addEventListener("pointerup",activate,{passive:false,capture:true});
        else hit.addEventListener("touchend",activate,{passive:false,capture:true});
        hit.addEventListener("click",e=>{if(e.detail===0)activate(e)},{passive:false,capture:true});
      }
    }
    if(!document.getElementById("stableford-ui-bridge-style")){
      const style=document.createElement("style");style.id="stableford-ui-bridge-style";
      style.textContent='.stableford-tournament-field{display:grid;gap:6px;margin:12px 0;text-align:left;color:#fff;font:800 11px Arial,sans-serif}.stableford-tournament-field input{width:100%;height:44px;border:1px solid var(--line);border-radius:6px;background:#050505;color:#fff;padding:0 12px;font:800 14px Arial,sans-serif;text-transform:uppercase}';
      document.head.appendChild(style);
    }
    const stableStatus=document.getElementById("stablefordSetupStatus"),baseStatus=document.getElementById("setupStatus"),baseMic=document.getElementById("setupMicWrap"),stableMic=document.getElementById("stablefordSetupMicWrap");
    const syncVoiceUi=()=>{if(!overlay.classList.contains("visible"))return;if(stableStatus&&!stableStatus.classList.contains("error")&&baseStatus?.textContent)stableStatus.textContent=baseStatus.textContent;if(stableMic&&baseMic)stableMic.classList.toggle("active",baseMic.classList.contains("active"))};
    if(!overlay.__stablefordVoiceBridge){
      overlay.__stablefordVoiceBridge=true;
      const observer=new MutationObserver(syncVoiceUi);if(baseStatus)observer.observe(baseStatus,{subtree:true,childList:true,characterData:true,attributes:true});if(baseMic)observer.observe(baseMic,{attributes:true,attributeFilter:["class"]});const detected=document.getElementById("detectedBody");if(detected)observer.observe(detected,{subtree:true,childList:true,attributes:true,characterData:true});
      overlay.addEventListener("transitionend",syncVoiceUi);
    }
    const start=document.getElementById("startStablefordRound");
    if(start&&!start.__stablefordTournamentBridge){
      start.__stablefordTournamentBridge=true;
      start.addEventListener("click",()=>{const value=cleanName(document.getElementById("stablefordTournamentName")?.value||"");setTimeout(()=>{try{if(typeof round!=="undefined"&&round?.mode==="stableford"){round.tournament=value?{name:value}:null;if(typeof persist==="function")persist();if(typeof render==="function")render()}}catch(err){console.error("Stableford tournament",err)}},0)});
    }

    if(typeof setupSessionConfig==="function"&&!setupSessionConfig.__stablefordRegistrationPrompt){
      const baseSetupSessionConfig=setupSessionConfig;
      setupSessionConfig=function(){
        const config=baseSetupSessionConfig();
        if(overlay.classList.contains("visible")&&config?.audio?.input?.transcription)config.audio.input.transcription.prompt="Golf Guatemala con Caddie universal. Transcribe literalmente español natural de cualquier tema. Registro Stableford Scratch: conserva posiciones y nombres: Jugador 1 Miguel; Jugador 2 y el nombre pronunciado; hasta Jugador 6. No agregues handicap ni marcas porque la categoría los asigna automáticamente.";
        return config;
      };
      setupSessionConfig.__stablefordRegistrationPrompt=true;
    }

    let stablefordParseSetupTranscript=null;
    if(typeof parseSetupTranscript==="function"&&!parseSetupTranscript.__stablefordScratchVoice){
      const baseParseSetupTranscript=parseSetupTranscript;
      stablefordParseSetupTranscript=function(transcript){
        if(!overlay.classList.contains("visible"))return baseParseSetupTranscript(transcript);
        const active=document.querySelector("#stablefordSetupOverlay [data-stableford-category].active")||document.querySelector("#stablefordSetupOverlay [data-stableford-category][aria-pressed='true']");
        const category=active?.getAttribute("data-stableford-category")||(typeof stablefordSetupCategory!=="undefined"?stablefordSetupCategory:"senior");
        const cfg=categoryConfig(category);
        if(!cfg||typeof normalizeSpeech!=="function"||typeof playerPositionToken!=="function")return{ok:false,speech:"Error"};
        const tokens=normalizeSpeech(transcript).split(" ").filter(Boolean);
        const changes=[];let i=0;
        while(i<tokens.length){
          while(i<tokens.length&&["y","luego","despues","después","jugadores","jugadoras"].includes(tokens[i]))i++;
          if(i>=tokens.length)break;
          if(["jugador","jugadora"].includes(tokens[i]))i++;
          const position=playerPositionToken(tokens[i]);
          if(!position||position<1||position>MAX_PLAYERS)return{ok:false,speech:"Error"};
          i++;
          const start=i;
          while(i<tokens.length){
            if(["jugador","jugadora"].includes(tokens[i])&&playerPositionToken(tokens[i+1]))break;
            i++;
          }
          const nameTokens=tokens.slice(start,i);
          while(nameTokens.length&&["y","luego","despues","después"].includes(nameTokens[nameTokens.length-1]))nameTokens.pop();
          const rawName=nameTokens.join(" ").trim();
          if(!rawName)return{ok:false,speech:"Error"};
          const name=typeof titleName==="function"?titleName(rawName):cleanName(rawName);
          changes.push({position,name,handicap:0,tee:cfg.tee,matrix:"Caballeros"});
          if(changes.length>MAX_PLAYERS)return{ok:false,speech:"Error"};
        }
        return changes.length?{ok:true,changes}:{ok:false,speech:"Error"};
      };
      stablefordParseSetupTranscript.__stablefordScratchVoice=true;
      parseSetupTranscript=stablefordParseSetupTranscript;
    }

    if(typeof applySetupChanges==="function"&&!applySetupChanges.__stablefordRegistrationTarget){
      const baseApplySetupChanges=applySetupChanges;
      const applyToActiveRegistration=function(changes){
        if(!overlay.classList.contains("visible"))return baseApplySetupChanges(changes);
        if(!Array.isArray(changes)||!changes.length)return{ok:false,speech:"Error"};
        const targets=[...document.querySelectorAll("[data-stableford-name]")],next=targets.map(target=>cleanName(target.value));
        for(const change of changes){const index=Number(change.position)-1,name=cleanName(change.name);if(!Number.isInteger(index)||index<0||index>=MAX_PLAYERS||!name)return{ok:false,speech:"Error"};next[index]=name}
        next.forEach((name,index)=>{const target=targets[index];if(!target||target.value===name)return;target.value=name;target.dispatchEvent(new Event("input",{bubbles:true}));target.dispatchEvent(new Event("change",{bubbles:true}))});
        if(stableStatus&&!stableStatus.classList.contains("error"))stableStatus.textContent="JUGADORES DETECTADOS · REVISA Y PRESIONA OK";
        if(typeof listening!=="undefined"&&listening&&typeof setVoice==="function")setVoice(false);
        return{ok:true,speech:""};
      };
      applyToActiveRegistration.__stablefordRegistrationTarget=true;
      applySetupChanges=applyToActiveRegistration;
    }

    const stableSelector=document.querySelector('[data-course-key="stableford"]');
    if(stableSelector&&!stableSelector.__stablefordRoute){stableSelector.__stablefordRoute=true;stableSelector.addEventListener("click",e=>{e.preventDefault();e.stopImmediatePropagation();overlay.classList.add("visible");overlay.setAttribute("aria-hidden","false");},true)}
    if(!document.getElementById("stableford-touch-plan-b-style")){const st=document.createElement("style");st.id="stableford-touch-plan-b-style";st.textContent='body.stableford-round .score-cell{touch-action:manipulation;-webkit-user-select:none;user-select:none}body.stableford-round .score-cell input{touch-action:manipulation;min-width:100%;min-height:100%;margin:0;padding:0;text-align:center}body.stableford-round .score-table{touch-action:pan-x pan-y}';document.head.appendChild(st)}
    const markStablefordRound=()=>document.body.classList.toggle("stableford-round",typeof round!=="undefined"&&round?.mode==="stableford");markStablefordRound();
    const categoryButtons=[...document.querySelectorAll("[data-stableford-category]")];
    for(const button of categoryButtons)if(!button.__stablefordDefaults){button.__stablefordDefaults=true;button.addEventListener("click",()=>{const category=button.getAttribute("data-stableford-category"),cfg=categoryConfig(category);if(!cfg)return;const facts=document.getElementById("stablefordSetupFacts"),teeLabel=cfg.tee==="Blanco"?"BLANCAS":"AMARILLAS";if(facts)facts.textContent=`SCRATCH · MARCAS ${teeLabel} · HCP 0 · MÁXIMO 6 JUGADORES`})}
    return true;
  }
  return{SERIES_ID,MAX_PLAYERS,MAX_ROUNDS,BEST_ROUNDS,ALLOWED_COURSES,CATEGORY_CONFIG,TOURNAMENT_COURSES,categoryConfig,isAllowedCourse,pointsFor,holeResult,totals,bestThree,blankSeries,normalizeSeries,normalizeResult,upsertResult,standings,nextRoundNumber,cleanName,installTournamentCourses,installStablefordUi};
});
