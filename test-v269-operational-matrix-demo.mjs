import assert from "node:assert/strict";
import fs from "node:fs";
import navigation from "./round-navigation.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/<meta name="gscg-demo-link" content="V269-OPERATIONAL-MATRIX-DEMO-20260823">/);
assert.match(html,/const demoControlManual=startupParams\.get\("demo_control_manual"\)==="v269"/);
assert.match(html,/const DEMO_CONTROL_MANUAL_KEY="golf-score-card-guatemala-demo-control-manual-v269"/);
assert.match(html,/const DEMO_CONTROL_MANUAL_DRAFT_KEY="golf-score-card-guatemala-demo-control-manual-draft-v269"/);
assert.match(html,/const DEMO_CONTROL_MANUAL_ARCHIVE_KEY="golf-score-card-guatemala-demo-control-manual-archive-v269"/);

const definitionsStart=html.indexOf("const CONTROL_MANUAL_DEMO_PLAYERS=");
const definitionsEnd=html.indexOf("const STABLEFORD_ACTIVE_KEY",definitionsStart);
assert.ok(definitionsStart>0&&definitionsEnd>definitionsStart,"No se encontró la definición única de la demostración");
const definitionsSource=html.slice(definitionsStart,definitionsEnd);
const demoPlayers=new Function(`${definitionsSource};return CONTROL_MANUAL_DEMO_PLAYERS`)();

assert.deepEqual(demoPlayers.map(player=>player.name),["JAIME","NELSON","JUNIOR","FITO","PEDRO","CARLOS"]);
assert.equal(demoPlayers.length,6);
assert.equal(demoPlayers.flatMap(player=>player.scores).length,30);
assert.ok(demoPlayers.every(player=>player.scores.length===5));

assert.match(html,/if\(demoControlManual\)\{localStorage\.setItem\(DEMO_CONTROL_MANUAL_KEY,payload\);archiveRoundSnapshot\(round\);return true\}/);
assert.match(html,/function activeRoundArchiveKey\(\)\{return demoControlManual\?DEMO_CONTROL_MANUAL_ARCHIVE_KEY:ROUND_ARCHIVE_KEY\}/);
assert.match(html,/function activeDraftStorageKey\(\)\{return demoControlManual\?DEMO_CONTROL_MANUAL_DRAFT_KEY:DRAFT_STORAGE_KEY\}/);
assert.match(html,/function readPlayerDirectory\(\)\{if\(demoControlManual\)return\[\]/);
assert.match(html,/function savePlayersToDirectory\([^)]*\)\{if\(demoControlManual\)return\[\]/);
assert.match(html,/function queueMasterDataSnapshot\([^)]*\)\{\s*if\(demoControlManual\)return Promise\.resolve\(false\)/);

assert.doesNotMatch(html,/function activatePreviousOperationalRound\([^)]*\)\{\s*if\(demoControlManual\)return false/);
assert.doesNotMatch(html,/editable=!!\(!demoControlManual&&round\.configured/);
assert.doesNotMatch(html,/if\(demoControlManual\)\$\("newRoundButton"\)\?\.classList\.add\("hidden"\)/);
assert.doesNotMatch(html,/\$\("backToRegistrationButton"\)\.addEventListener\("click",\(\)=>demoControlManual\?false:/);
assert.doesNotMatch(html,/\$\("newRoundButton"\)\.addEventListener\("click",\(\)=>demoControlManual\?false:/);
assert.match(html,/\$\("backToRegistrationButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openStablefordDataEditor\(\):openCurrentRoundDataEditor\(\)\)/);
assert.match(html,/\$\("previousRoundButton"\)\.addEventListener\("click",\(\)=>activatePreviousOperationalRound\(\)\)/);
assert.match(html,/\$\("newRoundButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\|\|sfEmergency\?openFreshStablefordSetup\(\):openNewRoundDraft\(\)\)/);

const builderStart=html.indexOf("function controlManualDemoRound(");
const builderEnd=html.indexOf("\nfunction derivedScoreForHole",builderStart);
assert.ok(builderStart>0&&builderEnd>builderStart,"No se encontró el constructor V269");
const builderSource=html.slice(builderStart,builderEnd);
const demoStore=new Map(),archive=[];
const built=new Function("CONTROL_MANUAL_DEMO_PLAYERS","localStorage","archive","navigation",`
  let round={configured:false,players:[]},voiceContext="setup";
  const demoControlManual=true;
  const DEMO_CONTROL_MANUAL_KEY="golf-score-card-guatemala-demo-control-manual-v269";
  const ALL=Array.from({length:18},(_,index)=>index+1);
  const PAR=[4,4,4,4,3,5,5,3,4,3,5,4,4,5,4,4,3,4];
  const activateCourse=key=>key;
  const normalizePlayer=value=>({...value});
  const scoreObject=(player,hole,gross)=>({hole,gross,player:player.name});
  const readRoundArchive=()=>archive;
  const archiveRoundSnapshot=value=>{const copy=JSON.parse(JSON.stringify(value)),index=archive.findIndex(item=>item.id===copy.id);if(index>=0)archive[index]=copy;else archive.push(copy);archive.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));return true};
  ${builderSource}
  const activated=activateControlManualDemo();
  const current=JSON.parse(localStorage.getItem(DEMO_CONTROL_MANUAL_KEY));
  return{activated,round,voiceContext,current,archive,previousState:navigation.resolve(archive,round,"general")};
`)(demoPlayers,{setItem:(key,value)=>demoStore.set(key,value),getItem:key=>demoStore.get(key)||null},archive,navigation);

assert.equal(built.activated,true);
assert.equal(built.voiceContext,"round");
assert.equal(built.round.id,"demo-control-manual-current-v269");
assert.equal(built.round.players.length,6);
assert.equal(built.round.players.flatMap(player=>Object.values(player.holes)).length,30);
assert.deepEqual(Object.keys(built.round.players[0].holes).map(Number),[1,2,3,4,5]);
assert.equal(built.archive.length,2,"La demostración debe contener ronda actual y ronda previa aisladas");
assert.equal(built.archive[0].id,"demo-control-manual-previous-v269");
assert.equal(built.archive[0].players.flatMap(player=>Object.values(player.holes)).length,108);
assert.equal(built.previousState.label,"RONDA PREVIA");
assert.equal(built.previousState.target.id,"demo-control-manual-previous-v269");
const returnState=navigation.resolve(built.archive,built.previousState.target,"general");
assert.equal(returnState.label,"RONDA ACTUAL");
assert.equal(returnState.target.id,"demo-control-manual-current-v269");

assert.match(html,/const STORAGE_KEY="golf-score-card-guatemala-group-round-v2"/);
assert.match(html,/const STABLEFORD_ACTIVE_KEY="golf-score-card-guatemala-stableford-active-v1"/);
assert.match(html,/else\{\s*localStorage\.setItem\(STORAGE_KEY,payload\);\s*localStorage\.setItem\(STORAGE_BACKUP_KEY,payload\)/);

console.log("PASS V269 · Registro, Ronda previa y retorno a Ronda actual operativos en demo aislada");
