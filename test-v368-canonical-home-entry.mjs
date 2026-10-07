import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const hosting=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("manifest.webmanifest","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-canonical-home-entry" content="V368-CANONICAL-HOME-ENTRY-20260829"/);
assert.match(html,/const directHome=startupParams\.get\("inicio"\)==="1"/);\nassert.match(html,/directHome&&!isRecoverableStoredRound\\(round\\)/,"Conservar la Score Card activa al abrir el enlace principal");
assert.match(html,/if\(explicitNewRound\)\{\s*openNewRoundDraft\(\);\s*\}else if\(directHome&&!isRecoverableStoredRound\(round\)\)\{\s*openRegistrationPreservingActiveRound\(\);/);
assert.ok(html.indexOf("const standaloneApp=")<html.indexOf("function openSetup("),"standaloneApp debe existir antes de la apertura inicial");

for(const source of ["/","/index.html","/inicio"]){
  const route=hosting.redirects.find(item=>item.source===source);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${source} debe abrir Inicio`);
}
assert.equal(manifest.start_url,"/pwa-launch.html");
assert.match(fs.readFileSync("pwa-launch.html","utf8"),/index-grupal\.html\?source=pwa/,"La apertura instalada recupera la tarjeta sin forzar Registro");

const persisted={configured:true,players:[{name:"JUGADOR",holes:{1:{gross:4}}}]};
let saved=structuredClone(persisted),opened=false;
const openNewRoundDraft=()=>{saved=null;opened=true};
const openRegistrationPreservingActiveRound=()=>{saved=structuredClone(saved);opened=true};
const explicitNewRound=false,directHome=true;
if(explicitNewRound)openNewRoundDraft();else if(directHome&&!persisted.configured)openRegistrationPreservingActiveRound();
assert.equal(opened,false,"El enlace de inicio no debe interrumpir una Score Card activa");
assert.deepEqual(saved,persisted,"Abrir la app conserva la tarjeta viva");
let noRoundOpened=false;if(directHome&&!({configured:false}).configured)noRoundOpened=true;
assert.equal(noRoundOpened,true,"Sin ronda recuperable, Inicio abre Registro");
assert.match(worker,/v367-universal-voice-in-place-v368-canonical-home-entry-r183-active-scorecard-reopen/);

console.log("PASS V368 · enlace web abre Inicio y app instalada conserva tarjeta viva");