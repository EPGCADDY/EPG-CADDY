import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/<meta name="gscg-demo-link" content="V268-CONTROL-MANUAL-DEMO-20260823">/);
assert.match(html,/const demoControlManual=startupParams\.get\("demo_control_manual"\)==="v268"/);
assert.match(html,/const DEMO_CONTROL_MANUAL_KEY="golf-score-card-guatemala-demo-control-manual-v268"/);

const definitionsStart=html.indexOf("const CONTROL_MANUAL_DEMO_PLAYERS=");
const definitionsEnd=html.indexOf("const STABLEFORD_ACTIVE_KEY",definitionsStart);
assert.ok(definitionsStart>0&&definitionsEnd>definitionsStart,"No se encontró la definición única de la demostración");
const definitionsSource=html.slice(definitionsStart,definitionsEnd);
const demoPlayers=new Function(`${definitionsSource};return CONTROL_MANUAL_DEMO_PLAYERS`)();

assert.deepEqual(demoPlayers.map(player=>player.name),["JAIME","NELSON","JUNIOR","FITO","PEDRO","CARLOS"]);
assert.equal(demoPlayers.length,6,"La demostración debe contener seis jugadores");
assert.equal(demoPlayers.flatMap(player=>player.scores).length,30,"Seis jugadores × cinco hoyos deben producir 30 scores");
for(const player of demoPlayers){
  assert.equal(player.scores.length,5,`${player.name} debe tener los hoyos 1 al 5`);
  assert.ok(player.scores.every(score=>Number.isInteger(score)&&score>=1&&score<=30),`${player.name} contiene un Gross inválido`);
}

assert.match(html,/demoControlManual\?\(readStoredRound\(DEMO_CONTROL_MANUAL_KEY\)\|\|blankRound\(\)\):loadRound\(\)/);
assert.match(html,/if\(demoControlManual\)\{localStorage\.setItem\(DEMO_CONTROL_MANUAL_KEY,payload\);return true\}/);
assert.match(html,/function queueMasterDataSnapshot\([^)]*\)\{\s*if\(demoControlManual\)return Promise\.resolve\(false\)/);
assert.match(html,/function savePlayersToDirectory\([^)]*\)\{if\(demoControlManual\)return\[\]/);
assert.match(html,/function activatePreviousOperationalRound\([^)]*\)\{\s*if\(demoControlManual\)return false/);
assert.match(html,/editable=!!\(!demoControlManual&&round\.configured/);
assert.match(html,/if\(demoControlManual\)\$\("newRoundButton"\)\?\.classList\.add\("hidden"\)/);
assert.match(html,/\$\("backToRegistrationButton"\)\.addEventListener\("click",\(\)=>demoControlManual\?false:/);
assert.match(html,/\$\("newRoundButton"\)\.addEventListener\("click",\(\)=>demoControlManual\?false:/);
assert.match(html,/function activateControlManualDemo\(\)[\s\S]*?scoreIndex\+1[\s\S]*?player\.holes\[hole\]=scoreObject\(player,hole,gross\)/);
assert.match(html,/if\(demoControlManual\)activateControlManualDemo\(\);\s*else if\(!sfEmergency\)restorePersistedRound\(\)/);
assert.match(html,/if\(!demoControlManual\)\{queueMasterDataSnapshot\("app-open"\);setTimeout\(flushMasterSyncQueue,1800\)\}/);

const builderStart=html.indexOf("function activateControlManualDemo()");
const builderEnd=html.indexOf("\nfunction derivedScoreForHole",builderStart);
assert.ok(builderStart>0&&builderEnd>builderStart,"No se encontró el constructor real de la demostración");
const builderSource=html.slice(builderStart,builderEnd);
const demoStore=new Map();
const built=new Function("CONTROL_MANUAL_DEMO_PLAYERS","localStorage",`
  let round={configured:false,players:[]},voiceContext="setup";
  const demoControlManual=true;
  const DEMO_CONTROL_MANUAL_KEY="golf-score-card-guatemala-demo-control-manual-v268";
  const activateCourse=key=>key;
  const normalizePlayer=value=>({...value});
  const scoreObject=(player,hole,gross)=>({hole,gross,player:player.name});
  ${builderSource}
  const activated=activateControlManualDemo();
  return{activated,round,voiceContext,stored:JSON.parse(localStorage.getItem(DEMO_CONTROL_MANUAL_KEY))};
`)(demoPlayers,{setItem:(key,value)=>demoStore.set(key,value),getItem:key=>demoStore.get(key)||null});

assert.equal(built.activated,true);
assert.equal(built.voiceContext,"round");
assert.equal(built.round.players.length,6);
assert.equal(built.round.players.flatMap(player=>Object.values(player.holes)).length,30);
assert.deepEqual(Object.keys(built.round.players[0].holes).map(Number),[1,2,3,4,5]);
assert.equal(built.stored.id,"demo-control-manual-v268");

// La ruta de demostración es un estado aislado. General y Stableford conservan
// sus llaves, restauración y operación normales cuando el parámetro no existe.
assert.match(html,/const STORAGE_KEY="golf-score-card-guatemala-group-round-v2"/);
assert.match(html,/const STABLEFORD_ACTIVE_KEY="golf-score-card-guatemala-stableford-active-v1"/);
assert.match(html,/else\{\s*localStorage\.setItem\(STORAGE_KEY,payload\);\s*localStorage\.setItem\(STORAGE_BACKUP_KEY,payload\)/);

console.log("PASS V268 · enlace real aislado con 6 jugadores y 30 scores en hoyos 1–5");
