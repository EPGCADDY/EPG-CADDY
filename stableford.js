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

    if(typeof toggleVoice==="function"&&!toggleVoice.__stablefordFastVoice){
      const baseToggleVoice=toggleVoice;
      const fastToggleVoice=async function(context){
        if(!stablefordVoiceActive())return baseToggleVoice(context);
        if(voiceActivationPromise)return voiceActivationPromise;
        if(context==="round"&&(phase==="processing"||roundFinalizeRequested||roundPendingItems.size)){
          if(typeof $==="function"&&$("status"))$("status").textContent="PROCESANDO…";
          return false;
        }
        if(context==="setup"&&(setupFinalizeRequested||setupLocked)){
          if(typeof $==="function"&&$("setupStatus"))$("setupStatus").textContent="PROCESANDO…";
          return false;
        }
        if(activeResponseId||stopMonitorActive)stopAuthorizedSpeech();
        voiceContext=context;
        if(listening){
          if(context==="round"){requestRoundFinalize(0,true);return true}
          setVoice(false);return true;
        }
        voiceActivationContext=context;
        voiceOpening=true;
        voiceActivationPromise=(async()=>{
          try{
            const reuse=typeof realtimeReusableFor==="function"?realtimeReusableFor(context):(typeof realtimeReady==="function"&&realtimeReady());
            const stablefordContextMismatch=typeof realtimeSessionContext!=="undefined"&&realtimeSessionContext&&realtimeSessionContext!==context;
            if(!reuse||stablefordContextMismatch){
              if(typeof setMicConnecting==="function")setMicConnecting(context,true);
              teardownRealtime();
              voiceContext=context;
              await ensureSession();
            }
            if(context!==voiceContext)throw new Error("Contexto de micrófono cambió");
            if(context==="round")resetRoundCapture();
            else resetSetupCapture();
            if(!realtimeReady())throw new Error("Realtime no quedó listo");
            if(typeof setMicConnecting==="function")setMicConnecting(context,false);
            setVoice(true);
            return true;
          }catch(err){
            console.error("Activación Stableford:",err);
            teardownRealtime();
            voiceContext=context;
            if(typeof setMicConnecting==="function")setMicConnecting(context,false);
            if(context==="setup"&&typeof $==="function"&&$("setupStatus"))$("setupStatus").textContent="ERROR";
            else if(typeof $==="function"&&$("status"))$("status").textContent="ERROR";
            return false;
          }
        })();
        try{return await voiceActivationPromise}
        finally{
          if(typeof setMicConnecting==="function")setMicConnecting(context,false);
          voiceOpening=false;
          voiceActivationPromise=null;
          voiceActivationContext=null;
        }
      };
      fastToggleVoice.__stablefordFastVoice=true;
      toggleVoice=fastToggleVoice;
    }

    if(typeof fireMicActivation==="function"&&!fireMicActivation.__stablefordCleanGesture){
      const baseFireMicActivation=fireMicActivation;
      let stablefordGestureAt=0;
      const cleanFire=function(context,e){
        if(!stablefordVoiceActive())return baseFireMicActivation(context,e);
        if(e&&e.cancelable)e.preventDefault();
        if(e&&e.stopPropagation)e.stopPropagation();
        const now=Date.now();
        if(now-stablefordGestureAt<500)return false;
        stablefordGestureAt=now;
        toggleVoice(context);
        return true;
      };
      cleanFire.__stablefordCleanGesture=true;
      fireMicActivation=cleanFire;
    }

    if(!document.getElementById("stablefordTournamentName")){
      const facts=document.getElementById("stablefordSetupFacts");
      const wrap=document.createElement("label");
      wrap.className="stableford-tournament-field";
      wrap.innerHTML='<span>NOMBRE DEL TORNEO</span><input id="stablefordTournamentName" maxlength="80" autocomplete="off" placeholder="NOMBRE DEL TORNEO">';
      (facts?.parentNode||card).insertBefore(wrap,facts?.nextSibling||card.firstChild);
    }
    if(!document.getElementById("stablefordSetupMicWrap")){
      const course=document.getElementById("stablefordSetupCourse");
      const mic=document.createElement("div");
      mic.className="nr-mic stableford-registration-mic";
      mic.id="stablefordSetupMicWrap";
      mic.innerHTML='<button class="mic-hit" id="stablefordSetupMic" type="button" aria-label="Micrófono de registro Stableford"></button><div class="mic-visual" aria-hidden="true">🎤</div>';
      (course?.parentNode||card).insertBefore(mic,course?.nextSibling||card.firstChild);
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
      style.textContent='.stableford-tournament-field{display:grid;gap:6px;margin:12px 0;text-align:left;color:#fff;font:800 11px Arial,sans-serif}.stableford-tournament-field input{width:100%;height:44px;border:1px solid var(--line);border-radius:6px;background:#050505;color:#fff;padding:0 12px;font:800 14px Arial,sans-serif;text-transform:uppercase}.stableford-registration-mic{margin-top:12px;margin-bottom:12px}.stableford-registration-mic .mic-visual{background:var(--lime);border-color:var(--lime);color:#000}.stableford-registration-mic.active .mic-visual{background:var(--red);border-color:var(--red);color:#fff}';
      document.head.appendChild(style);
    }
    const stableStatus=document.getElementById("stablefordSetupStatus"),baseStatus=document.getElementById("setupStatus"),baseMic=document.getElementById("setupMicWrap"),stableMic=document.getElementById("stablefordSetupMicWrap");
    const syncNames=()=>{if(!overlay.classList.contains("visible"))return;const source=[...document.querySelectorAll("[data-draft-name]")].map(x=>cleanName(x.value)).filter(Boolean).slice(0,MAX_PLAYERS);if(!source.length)return;const targets=[...document.querySelectorAll("[data-stableford-name]")];source.forEach((name,i)=>{if(targets[i])targets[i].value=name})};
    const syncVoiceUi=()=>{if(!overlay.classList.contains("visible"))return;syncNames();if(stableStatus&&baseStatus?.textContent)stableStatus.textContent=baseStatus.textContent;if(stableMic&&baseMic)stableMic.classList.toggle("active",baseMic.classList.contains("active"))};
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

    if(typeof handleRealtime==="function"&&!handleRealtime.__stablefordDirectTranscript){
      const baseHandleRealtime=handleRealtime;
      const directHandleRealtime=function(message){
        let event=null;
        try{event=JSON.parse(message.data)}catch{}
        baseHandleRealtime(message);
        if(!overlay.classList.contains("visible")||event?.type!=="conversation.item.input_audio_transcription.completed")return;
        const parser=stablefordParseSetupTranscript||parseSetupTranscript;
        const parsed=parser(event.transcript||"");
        if(!parsed?.ok||!Array.isArray(parsed.changes))return;
        const targets=[...document.querySelectorAll("[data-stableford-name]")];
        for(const change of parsed.changes){const target=targets[Number(change.position)-1];if(target){target.value=cleanName(change.name);target.dispatchEvent(new Event("input",{bubbles:true}));target.dispatchEvent(new Event("change",{bubbles:true}))}}
        if(stableStatus)stableStatus.textContent="JUGADORES DETECTADOS";
        if(listening)setVoice(false);
      };
      directHandleRealtime.__stablefordDirectTranscript=true;
      handleRealtime=directHandleRealtime;
      if(typeof dc!=="undefined"&&dc)dc.onmessage=handleRealtime;
    }

    const categoryButtons=[...document.querySelectorAll("[data-stableford-category]")];
    for(const button of categoryButtons)if(!button.__stablefordDefaults){button.__stablefordDefaults=true;button.addEventListener("click",()=>{const category=button.getAttribute("data-stableford-category"),cfg=categoryConfig(category);if(!cfg)return;const facts=document.getElementById("stablefordSetupFacts");if(facts)facts.textContent=`SCRATCH · MARCAS ${cfg.tee.toUpperCase()}S · HCP 0 · MÁXIMO 4 JUGADORES`})}
    return true;
  }
  return{SERIES_ID,MAX_PLAYERS,MAX_ROUNDS,BEST_ROUNDS,ALLOWED_COURSES,CATEGORY_CONFIG,TOURNAMENT_COURSES,categoryConfig,isAllowedCourse,pointsFor,holeResult,totals,bestThree,blankSeries,normalizeSeries,normalizeResult,upsertResult,standings,nextRoundNumber,cleanName,installTournamentCourses,installStablefordUi};
});