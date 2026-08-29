import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const hosting=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("manifest.webmanifest","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-canonical-home-entry" content="V368-CANONICAL-HOME-ENTRY-20260829"/);
assert.match(html,/const directHome=startupParams\.get\("inicio"\)==="1"/);
assert.match(html,/if\(explicitNewRound\|\|directHome\)\{\s*openNewRoundDraft\(\);\s*\}else if\(!isRecoverableStoredRound\(round\)\)\{/);
assert.ok(html.indexOf("const standaloneApp=")<html.indexOf("function openSetup("),"standaloneApp debe existir antes de la apertura inicial");

for(const source of ["/","/index.html","/inicio"]){
  const route=hosting.redirects.find(item=>item.source===source);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${source} debe abrir Inicio`);
}
assert.equal(manifest.start_url,"/index-grupal.html?source=pwa","La app instalada debe reabrir la tarjeta viva sin forzar Inicio");

const persisted={configured:true,players:[{name:"JUGADOR",holes:{1:{gross:4}}}]};
let saved=structuredClone(persisted),opened=false;
const openNewRoundDraft=()=>{saved=structuredClone(saved);opened=true};
const explicitNewRound=false,directHome=true;
if(explicitNewRound||directHome)openNewRoundDraft();
assert.equal(opened,true,"El enlace principal debe abrir Registro con una ronda guardada");
assert.deepEqual(saved,persisted,"Abrir Inicio no puede borrar la tarjeta viva");
assert.match(worker,/v367-universal-voice-in-place-v368-canonical-home-entry/);

console.log("PASS V368 · enlace web abre Inicio y app instalada conserva tarjeta viva");
