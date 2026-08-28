import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-ios-voice-tail" content="V351-R13-LIVE-ROUND-RELOAD-20260828"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v332-dual-currency-matrix"/);
assert.match(worker,/const SHELL_REVISION="V351-R13-LIVE-ROUND-RELOAD"/);
assert.match(html,/const STORAGE_KEY="golf-score-card-guatemala-group-round-v2"/);
assert.match(html,/const STORAGE_BACKUP_KEY="golf-score-card-guatemala-group-round-v2-backup"/);
assert.match(html,/window\.addEventListener\("pagehide",\(\)=>\{\s*persist\(\)/);
assert.match(html,/window\.addEventListener\("beforeunload",persist\)/);
assert.match(html,/if\(isGeneralConversationIntent\(clean\)\)return answerBrowserVoiceQuery\(context,clean\)/);

const intentStart=html.indexOf("const GENERAL_CONVERSATION_CUE=");
const intentEnd=html.indexOf("\nfunction conversationStatusTarget",intentStart);
const normalizeSpeech=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const conversationIntent=new Function("normalizeSpeech",`${html.slice(intentStart,intentEnd)};return isGeneralConversationIntent`)(normalizeSpeech);
for(const question of ["¿Cómo está el clima hoy?","¿Cómo está el tráfico?","¿Por qué el cielo es azul?","Dime qué es la gravedad"]){
  assert.equal(conversationIntent(question),true,`Debe reconocer pregunta general: ${question}`);
}
assert.equal(conversationIntent("Jaime catorce blancas Gustavo quince azules"),false,"Un listado no puede desviarse al Caddie");

const startupMarker='if(!round.configured){\n  if(sfEmergency)window.addEventListener("DOMContentLoaded",openFreshStablefordSetup,{once:true});';
const startupStart=html.lastIndexOf(startupMarker);
const startupEnd=html.indexOf("\nwindow.GSC_ACCOUNT_SIGNED_IN",startupStart);
assert.ok(startupStart>0&&startupEnd>startupStart,"No se encontró la decisión de arranque R13");
const startupSource=html.slice(startupStart,startupEnd);
function startupCalls(round,{directHome=true,sfEmergency=false}={}){
  const calls=[];
  const window={addEventListener:(event)=>calls.push(event)};
  new Function("round","sfEmergency","directHome","window","openFreshStablefordSetup","openNewRoundDraft","openSetup",startupSource)(
    round,sfEmergency,directHome,window,()=>calls.push("stableford"),()=>calls.push("new-draft"),mode=>calls.push(`setup:${mode}`)
  );
  return calls;
}

const activeRound={
  id:"round-live-r13",configured:true,mode:"match_play",courseKey:"pulte",course:"El Pulté",
  players:[
    {id:"p1",name:"JUGADOR 1",holes:{3:{gross:4},4:{gross:5}},lastHole:4},
    {id:"p2",name:"JUGADOR 2",holes:{3:{gross:5},4:{gross:4}},lastHole:4}
  ]
};

assert.deepEqual(startupCalls(activeRound),[],"Una ronda activa debe montarse directamente, incluso con ?inicio=1");
assert.deepEqual(startupCalls({configured:false,players:[]}),["new-draft"],"Sin ronda activa, el enlace raíz sí abre Registro");
assert.deepEqual(startupCalls({configured:false,players:[]},{directHome:false}),["setup:new"],"La URL directa vacía abre Registro");

const persistStart=html.indexOf("function persist(){");
const persistEnd=html.indexOf("\nlet masterSyncChain=",persistStart);
assert.ok(persistStart>0&&persistEnd>persistStart,"No se encontró el escritor persistente");
const persistSource=html.slice(persistStart,persistEnd);
function persistRound(initialRound){
  const storage=new Map(),localStorage={setItem:(key,value)=>storage.set(key,value),getItem:key=>storage.get(key)||null};
  const runner=new Function("initialRound","localStorage",`
    let round=JSON.parse(JSON.stringify(initialRound));
    let roundLiveStaging=false;
    const demoControlManual=false;
    const DEMO_CONTROL_MANUAL_KEY="demo";
    const STABLEFORD_ACTIVE_KEY="stableford";
    const MATCH_PLAY_ACTIVE_KEY="match";
    const FOUR_BALL_ACTIVE_KEY="four-ball";
    const STORAGE_KEY="primary";
    const STORAGE_BACKUP_KEY="backup";
    const syncSideGameResults=()=>{};
    const archiveRoundSnapshot=()=>true;
    const queueMasterDataSnapshot=()=>Promise.resolve(true);
    ${persistSource}
    persist();
    return round;
  `);
  return{storage,round:runner(initialRound,localStorage)};
}

const saved=persistRound(activeRound);
const restored=JSON.parse(saved.storage.get("match"));
assert.equal(restored.id,activeRound.id);
assert.equal(restored.configured,true);
assert.deepEqual(restored.players.map(player=>player.holes),activeRound.players.map(player=>player.holes),"Los multi-hoyos deben sobrevivir el cierre");
assert.deepEqual(startupCalls(restored),[],"Al reabrir, la tarjeta persistida debe quedar visible y no un Registro vacío");

const draftStart=html.indexOf("function openNewRoundDraft(){");
const draftEnd=html.indexOf("\nfunction closeSetup(){",draftStart);
const draftSource=html.slice(draftStart,draftEnd);
const draftResult=new Function("initialRound",`
  let round=initialRound;
  const calls=[];
  const persist=()=>calls.push("persist");
  const sfEmergency=false;
  const window={history:{replaceState:()=>calls.push("replace")},location:{pathname:"/index-grupal.html"}};
  const dateSetup=()=>calls.push("date");
  const openSetup=mode=>calls.push("setup:"+mode);
  ${draftSource}
  openNewRoundDraft();
  return{round,calls};
`)(activeRound);
assert.equal(draftResult.round,activeRound,"Abrir NUEVA RONDA no puede reemplazar la ronda activa");
assert.deepEqual(draftResult.calls,["persist","date","setup:new"]);

console.log("PASS V351-R13 · tarjeta viva tras cerrar/reabrir · multi-hoyos persistidos · NUEVA RONDA no reemplaza hasta confirmar");
