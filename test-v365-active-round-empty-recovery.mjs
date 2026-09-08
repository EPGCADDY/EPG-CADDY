import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V365-ACTIVE-ROUND-RECOVERY/);
assert.match(worker,/v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery/);
assert.match(worker,/const ACTIVE_CACHE_NAME=`\$\{CACHE_NAME\}-v407-r3-premium-final-card`/);
assert.match(worker,/const APPROVED_CACHE_NAME=`\$\{CACHE_NAME\}-approved`/);
assert.match(worker,/url\.searchParams\.has\("__gscg_build_check"\)/,"la consulta de versión debe ir a red sin sustituir la versión aprobada");
assert.match(worker,/url\.searchParams\.get\("app_version"\)===RELEASE/,"sólo el toque de ACTUALIZAR promueve el candidato");
assert.match(worker,/await ensureApprovedShell\(\);\s*return await caches\.match\(OFFLINE_ENTRY,\{cacheName:APPROVED_CACHE_NAME\}\)/,"una apertura normal conserva el shell aprobado");
assert.match(html,/id="mandatoryUpdate"[^>]*class="mandatory-update"|class="mandatory-update"[^>]*id="mandatoryUpdate"/);
assert.doesNotMatch(html,/id="mandatoryUpdate"[^>]*class="mandatory-update available"|class="mandatory-update available"[^>]*id="mandatoryUpdate"/);
assert.match(html,/id="mandatoryUpdateButton" aria-disabled="true" disabled><span id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/class="update-version-id" id="appVersionId">V407 · R3<\/span><button type="button" id="mandatoryUpdateButton"/);
assert.match(html,/\.mandatory-update\.available \.mandatory-update-card button\{[^}]*animation:gscUpdatePulse/);
assert.match(html,/button\.disabled=false;button\.setAttribute\("aria-disabled","false"\)/);
assert.doesNotMatch(html,/document\.querySelector\("main\.app"\)\?\.setAttribute\("inert"/);
assert.match(html,/meta name="gscg-build" content="V363-RECORDED-MOBILE-BEHAVIOR-20260828"/);
assert.match(html,/meta name="gscg-release" content="V407-R3-PREMIUM-FINAL-CARD-20260908"/);
assert.match(html,/function recoverInstalledAppScrolling\(\)/);
assert.match(html,/window\.addEventListener\("pageshow",recoverInstalledAppScrolling\)/);
assert.match(html,/\.overlay\{overscroll-behavior-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom\}/);
assert.match(html,/\.overlay:not\(\.visible\)\{pointer-events:none!important\}/);
assert.match(html,/meta\[name="gscg-release"\]/);
assert.match(html,/\.mandatory-update\{position:fixed/);
assert.match(html,/body\.gsc-final-card-open \.mandatory-update\{display:block!important\}/);
assert.doesNotMatch(html,/body\.gsc-final-card-open \.mandatory-update\{display:none!important\}/);
assert.match(html,/pendingPublishedBuild=CURRENT_APP_BUILD/);
assert.match(html,/showMandatoryUpdate\(published\)/);
assert.match(html,/if\(!isRecoverableStoredRound\(round\)\)restorePersistedRound\(\)/);
assert.match(html,/if\(!isRecoverableStoredRound\(round\)&&restorePersistedRound\(\)\)render\(\)/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)\)\{localStorage\.removeItem\(PRINCIPAL_RESET_KEY\);localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)\}/,"Toda modalidad operativa debe sustituir la ronda activa canónica y retirar la bandera de borrado");
assert.match(html,/if\(localStorage\.getItem\(PRINCIPAL_RESET_KEY\)==="1"\)return blankRound\(\)/,"un borrado explícito debe impedir rescatar una ronda archivada");

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
  ,PRINCIPAL_RESET_KEY:"principal-reset"
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

const clearedStorage=new MemoryStorage({
  [keys.PRINCIPAL_RESET_KEY]:"1",
  [keys.ROUND_ARCHIVE_KEY]:JSON.stringify([valid])
});
const clearedContext={...context,localStorage:clearedStorage,readRoundArchive:()=>JSON.parse(clearedStorage.getItem(keys.ROUND_ARCHIVE_KEY)||"[]")};
vm.createContext(clearedContext);
vm.runInContext(`${source};globalThis.recovered=loadRound();`,clearedContext);
assert.equal(clearedContext.recovered.configured,false,"BORRAR TODO debe abrir Inicio aunque exista una ronda antigua en Historial");
assert.equal(clearedStorage.getItem(keys.ACTIVE_ROUND_KEY),null,"la reapertura no puede reconstruir la ronda eliminada");

const stableford={id:"stableford-viva",mode:"stableford",configured:true,players:[{...player,name:"ANA",holes:{1:{gross:4},2:{gross:5}}}],courseKey:"pulte",course:"El Pulté",createdAt:"2026-09-06T17:00:00.000Z",updatedAt:"2026-09-06T17:02:00.000Z"};
const oldPractice={...valid,id:"practica-vieja",provisional:true,updatedAt:"2026-09-06T16:00:00.000Z"};
const stableStorage=new MemoryStorage({
  [keys.STORAGE_KEY]:JSON.stringify(oldPractice),
  [keys.STORAGE_BACKUP_KEY]:JSON.stringify(oldPractice),
  [keys.ACTIVE_ROUND_KEY]:JSON.stringify(stableford),
  [keys.STABLEFORD_ACTIVE_KEY]:JSON.stringify(stableford)
});
const stableContext={...context,localStorage:stableStorage,readRoundArchive:()=>[]};
vm.createContext(stableContext);
vm.runInContext(`${source};globalThis.recovered=loadRound();`,stableContext);
assert.equal(stableContext.recovered.id,"stableford-viva","La ronda Stableford activa debe ganar sobre una Práctica antigua");
assert.equal(stableContext.recovered.players[0].holes[2].gross,5,"Stableford debe conservar scores al reabrir");

console.log("PASS V365/V400 · ronda activa multimodal, tarjeta viva y scores recuperados");
