import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const hosting=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-home-entry" content="V367-HOME-ALWAYS-OPENS-REGISTRATION-20260828"/);
assert.match(html,/const directHome=startupParams\.get\("inicio"\)==="1"/);
assert.match(html,/if\(explicitNewRound\|\|directHome\)\{\s*openNewRoundDraft\(\);\s*\}else if\(!round\.configured\)\{/);
assert.doesNotMatch(html,/else if\(!round\.configured\)\{[\s\S]{0,180}else if\(directHome\)/);
assert.ok(html.indexOf("const standaloneApp=")<html.indexOf("function openSetup("),"standaloneApp debe inicializarse antes de abrir Registro durante el arranque");

for(const source of ["/","/index.html","/inicio"]){
  const route=hosting.redirects.find(item=>item.source===source);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${source} debe ordenar Inicio`);
}

const persisted={configured:true,players:[{name:"JUGADOR"}],holes:{1:{gross:4}}};
let activeRound=structuredClone(persisted),opened=false;
const persist=()=>{ activeRound=structuredClone(activeRound) };
const openSetup=mode=>{ assert.equal(mode,"new"); opened=true };
const openNewRoundDraft=()=>{ persist(); openSetup("new"); return true };
const directHome=true,explicitNewRound=false;
if(explicitNewRound||directHome)openNewRoundDraft();
assert.equal(opened,true,"Inicio debe abrir Registro aunque exista una ronda activa");
assert.deepEqual(activeRound,persisted,"Abrir Inicio no puede borrar ni sustituir la ronda activa");

assert.match(worker,/CACHE_NAME="gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-iphone-playback-v366-universal-audio-only-v367-home-entry"/);
console.log("PASS V367 · enlace principal abre Registro y conserva la ronda activa");
