import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V366-PRINCIPAL-ENTRY-RECOVERY-20260828/);
assert.match(worker,/v366-principal-entry-recovery/);

const start=html.indexOf("function ensurePrincipalEntry(){");
const end=html.indexOf("function closeSetup(){",start);
assert.ok(start>0&&end>start,"No se encontró el guard de entrada principal");
const source=html.slice(start,end);

function scenario({round,visible=false,demo=false,stableford=false}){
  const classes=new Set(visible?["visible"]:[]),bodyClasses=new Set();
  const overlay={classList:{contains:value=>classes.has(value),add:value=>classes.add(value)}};
  let opened=0;
  const ensurePrincipalEntry=new Function(
    "demoControlManual","sfEmergency","isRecoverableStoredRound","round","$","document","openNewRoundDraft",
    `${source};return ensurePrincipalEntry`
  )(
    demo,stableford,
    value=>!!(value?.configured&&Array.isArray(value.players)&&value.players.length>=1&&value.players.length<=6),
    round,id=>id==="setupOverlay"?overlay:null,
    {body:{classList:{add:value=>bodyClasses.add(value)}}},
    ()=>{opened++;return true}
  );
  return{result:ensurePrincipalEntry(),opened,visible:classes.has("visible"),body:bodyClasses.has("gsc-setup-open")};
}

const blank=scenario({round:{configured:false,players:[]}});
assert.deepEqual(blank,{result:true,opened:1,visible:true,body:true},"Sin ronda debe abrir y fijar Inicio");

const invalid=scenario({round:{configured:true,players:[]}});
assert.deepEqual(invalid,{result:true,opened:1,visible:true,body:true},"Una ronda vacía no puede dejar la tarjeta principal expuesta");

const alreadyVisible=scenario({round:{configured:false,players:[]},visible:true});
assert.deepEqual(alreadyVisible,{result:true,opened:0,visible:true,body:true},"Regresar a foco no debe reiniciar un Registro ya visible");

const active=scenario({round:{configured:true,players:[{name:"JAIME"}]}});
assert.deepEqual(active,{result:false,opened:0,visible:false,body:false},"Una tarjeta operativa debe conservarse viva y visible");

for(const event of ["visibilitychange","pageshow","focus"]){
  const eventAt=html.indexOf(`addEventListener("${event}"`);
  assert.ok(eventAt>0,`Falta evento ${event}`);
  assert.ok(html.slice(eventAt,eventAt+1500).includes("ensurePrincipalEntry();"),`${event} debe restablecer Inicio si no existe ronda operativa`);
}

const startupStart=html.indexOf("// Regla de continuidad: al abrir/reabrir");
const startup=html.slice(startupStart,html.indexOf("window.GSC_ACCOUNT_SIGNED_IN",startupStart));
assert.match(startup,/if\(!isRecoverableStoredRound\(round\)\)[\s\S]*?ensurePrincipalEntry\(\)/);
assert.ok(startup.indexOf("ensurePrincipalEntry()")<startup.indexOf('queueMasterDataSnapshot("app-open")'),"Inicio debe montarse antes de sincronizaciones opcionales");
assert.match(startup,/if\(explicitNewRound\|\|directHome\)\{\s*openNewRoundDraft\(\)/,"NUEVA RONDA o entrada web principal deben abrir Registro sin borrar la tarjeta viva");

console.log("PASS V366 · Inicio principal obligatorio sin ronda + tarjeta operativa intacta");
