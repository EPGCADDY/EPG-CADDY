import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V365-ACTIVE-ROUND-RECOVERY/);
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior-v365-active-round-recovery/);
assert.match(html,/if\(!isRecoverableStoredRound\(round\)\)restorePersistedRound\(\)/);
assert.match(html,/if\(!isRecoverableStoredRound\(round\)&&restorePersistedRound\(\)\)render\(\)/);

const start=html.indexOf("function validStoredRound(x)");
const end=html.indexOf("const SIDE_GAME_KEYS",start);
assert.ok(start>0&&end>start,"No se encontró el bloque de persistencia activa");
const source=html.slice(start,end);

class MemoryStorage{
  constructor(seed={}){this.values=new Map(Object.entries(seed))}
  getItem(key){return this.values.has(key)?this.values.get(key):null}
  setItem(key,value){this.values.set(key,String(value))}
}

const keys={
  STORAGE_KEY:"primary",
  STORAGE_BACKUP_KEY:"backup",
  ACTIVE_ROUND_KEY:"canonical",
  STABLEFORD_ACTIVE_KEY:"stableford",
  MATCH_PLAY_ACTIVE_KEY:"match-play",
  FOUR_BALL_ACTIVE_KEY:"four-ball",
  ROUND_ARCHIVE_KEY:"archive"
};
const player={id:"p1",name:"JAIME",handicap:12,tee:"Blanco",holes:{1:{gross:5,net:4}},slot:1};
const valid={id:"score-cabo-viva",mode:"general",configured:true,players:[player],courseKey:"pulte",course:"El Pulté",createdAt:"2026-08-28T15:00:00.000Z",updatedAt:"2026-08-28T15:59:00.000Z"};
const empty={id:"ronda-vacia",mode:"general",configured:true,players:[],courseKey:"pulte",course:"El Pulté",createdAt:"2026-08-28T16:00:00.000Z",updatedAt:"2026-08-28T16:00:00.000Z"};
const localStorage=new MemoryStorage({
  [keys.STORAGE_KEY]:JSON.stringify(empty),
  [keys.STORAGE_BACKUP_KEY]:JSON.stringify(empty),
  [keys.ACTIVE_ROUND_KEY]:JSON.stringify(empty),
  [keys.ROUND_ARCHIVE_KEY]:JSON.stringify([valid])
});
const context={
  ...keys,
  localStorage,
  COURSE_DATA:{pulte:{}},
  courseKeyForName:()=>"pulte",
  normalizeTournament:value=>value||null,
  normalizeSideGames:value=>value||{},
  assignStablePlayerSlots:players=>players,
  readRoundArchive:()=>JSON.parse(localStorage.getItem(keys.ROUND_ARCHIVE_KEY)||"[]"),
  blankRound:()=>({id:"blank",mode:"general",configured:false,players:[],createdAt:"2026-08-28T16:01:00.000Z"}),
  console
};
vm.createContext(context);
vm.runInContext(`${source};globalThis.recovered=loadRound();`,context);

assert.equal(context.recovered.id,"score-cabo-viva","La ronda vacía no puede ganar sobre la tarjeta operativa archivada");
assert.equal(context.recovered.players[0].holes[1].gross,5,"Los scores deben sobrevivir la recuperación");
assert.equal(JSON.parse(localStorage.getItem(keys.ACTIVE_ROUND_KEY)).id,"score-cabo-viva","La recuperación debe reparar la identidad canónica");

console.log("PASS V365 · ronda configurada vacía descartada + tarjeta viva y scores recuperados");
