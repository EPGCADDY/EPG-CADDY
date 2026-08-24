import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

// Una ronda registrada renderiza sólo sus jugadores reales, en orden continuo.
assert.match(html,/const visualSlots=provisional\?playersByVisualSlot\(\):round\.players\.slice\(0,6\)/);
assert.match(html,/for\(let i=0;i<visualSlots\.length;i\+\+\)html\+=playerBlock\(visualSlots\[i\],i\+1\)/);
assert.match(html,/for\(let i=0;i<visualSlots\.length;i\+\+\)\{/);

// La ronda sin registro conserva sus seis posiciones editables.
assert.match(html,/provisional\?playersByVisualSlot\(\)/);

// El antiguo flotante se sustituye por un único botón pequeño ATRÁS.
assert.match(html,/id="backToRegistrationButton"[^>]*>ATRÁS<\/button>/);
assert.match(html,/\.back-registration-control\{position:static;/);
assert.match(html,/\.back-registration-button\{min-width:68px;height:30px/);
assert.doesNotMatch(html,/REGRESAR A DATOS/);
assert.doesNotMatch(html,/\.back-registration-control\{position:fixed;/);

// Agregar jugador es explícito, sólo aparece con cupo y usa el editor que conserva la ronda.
assert.match(html,/id="addPlayerButton"[^>]*>\+ JUGADOR<\/button>/);
assert.match(html,/editable&&round\.players\.length<6/);
assert.match(html,/addPlayerButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openStablefordDataEditor\(\):openRosterEditor\(\)\)/);

// ATRÁS vuelve al inicio en Stableford; + JUGADOR conserva el editor y los scores.
assert.match(html,/backToRegistrationButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openNewRoundDraft\(\):openCurrentRoundDataEditor\(\)\)/);
assert.match(html,/function openNewRoundDraft\(\)[\s\S]*?persist\(\);[\s\S]*?openSetup\("new"\)/);
assert.match(html,/holes:previous\[i\]\?\.holes\|\|\{\}/);

// Simulación con la función real: se agrega el sexto y los scores existentes permanecen intactos.
const functionStart=html.indexOf("function startStablefordRoundMode(){");
const functionEnd=html.indexOf("\nfunction stablefordGrossAt",functionStart);
assert.ok(functionStart>0&&functionEnd>functionStart,"No se encontró startStablefordRoundMode");
const startStablefordSource=html.slice(functionStart,functionEnd);
const initialPlayers=["JAIME","HENRY","JUNIOR","FITO","ALFONSO"].map((name,i)=>({id:`sf${i+1}`,name,handicap:0,tee:"Blanco",holes:{1:{gross:i+3}},activeFrom:1,slot:i+1}));
const initialRound={id:"round-v263",mode:"stableford",configured:true,stablefordCategory:"senior",stablefordRoundNumber:1,courseKey:"pulte",course:"El Pulté",tournament:{name:"TORNEO"},players:structuredClone(initialPlayers)};
const setupInputs=[...initialPlayers.map(p=>({value:p.name})),{value:"DIEGO"}];
const controls={
  stablefordSetupStatus:{textContent:""},setupStatus:{textContent:""},
  stablefordSetupOverlay:{classList:{remove(){}},setAttribute(){}},setupOverlay:{classList:{remove(){}}}
};
const harness=new Function("initialRound","setupInputs","controls",`
  let round=initialRound,draftCourse=null,voiceContext="setup";
  const stablefordSetupCategory="senior",stablefordSetupCourseKey="pulte",stablefordSetupMode="edit";
  const COURSE_CATALOG={pulte:{configured:true,name:"El Pulté"}};
  const GSCStableford={
    categoryConfig:value=>value==="senior"?{tee:"Blanco"}:null,
    cleanName:value=>String(value||"").trim().toUpperCase(),
    isAllowedCourse:value=>value==="pulte"
  };
  const document={
    querySelectorAll:selector=>selector==="[data-stableford-name]"?setupInputs:[],
    getElementById:id=>id==="stablefordTournamentName"?{value:"TORNEO"}:null
  };
  const $=id=>controls[id];
  const updateStablefordSetupValidity=()=>({names:setupInputs.map(input=>GSCStableford.cleanName(input.value)).filter(Boolean),duplicates:[]});
  const setStablefordSetupError=message=>{controls.stablefordSetupStatus.textContent=message;return false};
  const stablefordDuplicateMessage=()=>"NO REPITAS EL MISMO JUGADOR";
  const stablefordCourseRoundNumber=()=>1,isStablefordRound=(value=round)=>value?.mode==="stableford";
  const normalizePlayer=(value,index)=>({...value,slot:index+1});
  const normalizeStablefordPlayer=(value,index,config)=>({...normalizePlayer(value,index),tee:config.tee,handicap:0});
  const teardownRealtime=()=>{},activateCourse=()=>{},savePlayersToDirectory=()=>{},resetRoundCapture=()=>{},persist=()=>{},render=()=>{};
  const newRoundId=()=>"unused";
  ${startStablefordSource}
  return {run:startStablefordRoundMode,getRound:()=>round};
`)(structuredClone(initialRound),setupInputs,controls);
assert.equal(harness.run(),true);
const updatedRound=harness.getRound();
assert.equal(updatedRound.players.length,6);
assert.equal(updatedRound.players[5].name,"DIEGO");
assert.deepEqual(updatedRound.players.slice(0,5).map(p=>p.holes),initialPlayers.map(p=>p.holes));
assert.deepEqual(updatedRound.players[5].holes,{});

console.log("PASS V263 · jugadores compactos y botón ATRÁS no invasivo");
