import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const updater=fs.readFileSync("update-client-e.js","utf8");
const current="V407-R62-SOURCE-BUILD-SEPARATION-20260912";
let remote="V407-R52-OLDER-20260912",installedShell="";
const stored=new Map([["round","MIGUEL|14|BLANCAS"]]),deletedCaches=[],unregistered=[];
const classes=new Set(),elements={};
const makeButton=()=>({disabled:false,attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,v){this.listeners[k]=v},cloneNode(){return makeButton()},replaceWith(next){elements.mandatoryUpdateButton=next}});
elements.mandatoryUpdateButton=makeButton();
elements.mandatoryUpdateAction={textContent:""};
elements.mandatoryUpdate={classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)}};
elements.appVersionId={textContent:""};
elements.setupOverlay={classList:{contains:()=>true}};
const document={hidden:false,querySelector(selector){if(selector==='meta[name="gscg-release"]')return{content:current};return null},getElementById:id=>elements[id]||null,addEventListener(){}};
const localStorage={getItem:key=>stored.get(key)||null,setItem(key,value){stored.set(key,String(value))}};
const location={href:"https://golf-sc-gt-lab.vercel.app/index-grupal.html?source=pwa",replace(value){this.replaced=value}};
const fetch=async url=>{
  const value=String(url);
  if(value.includes("/api/release"))return{ok:true,status:200,json:async()=>({release:remote,baseline:remote.match(/^V\d+-R\d+/)[0]})};
  installedShell=`<meta name="gscg-release" content="${remote}">${"x".repeat(300100)}`;
  return{ok:true,status:200,text:async()=>installedShell};
};
const caches={keys:async()=>["gscg-mobile-old","unrelated"],delete:async name=>(deletedCaches.push(name),true)};
const navigator={serviceWorker:{getRegistrations:async()=>[{unregister:async()=>(unregistered.push("sw"),true)}]}};
let captured=0,synced=0,persistedDraft=0,persistedRound=0;
const window={caches,localStorage,captureVisibleRegistrationValues:()=>captured++,syncDraftPlayersFromManualRows:()=>synced++,persistDraftState:()=>persistedDraft++,persist:()=>persistedRound++};
vm.runInNewContext(updater,{window,document,localStorage,location,fetch,caches,navigator,URL,setTimeout:()=>0,setInterval:()=>0,console});

assert.equal(elements.appVersionId.textContent,"V407 · R62 · 12/09/2026");
await window.GSCUpdatePinned.check();
assert.equal(classes.has("available"),false,"R52 no puede activar un downgrade desde R62");
assert.equal(elements.mandatoryUpdateButton.disabled,true);

remote="V407-R63-BROWSER-PROBE-20260912";
await window.GSCUpdatePinned.check();
assert.equal(classes.has("available"),true,"R63 debe activar ACTUALIZAR desde R62");
assert.equal(elements.mandatoryUpdateButton.disabled,false);
await elements.mandatoryUpdateButton.listeners.click();
assert.equal(stored.get("gscg_active_release_v1"),remote);
assert.equal(stored.get("gscg_installed_shell_html_v1"),installedShell);
assert.equal(stored.get("round"),"MIGUEL|14|BLANCAS","La actualización no puede perder la ronda");
assert.deepEqual(deletedCaches,["gscg-mobile-old"]);
assert.deepEqual(unregistered,["sw"]);
assert.equal(captured,1);assert.equal(synced,1);assert.equal(persistedDraft,1);assert.equal(persistedRound,1);
assert.match(location.replaced,/^https:\/\/golf-sc-gt-lab\.vercel\.app\/index-grupal\.html\?source=pwa&manual_update=/);

console.log("PASS R62 CRÍTICO · downgrade bloqueado, upgrade instalado, caché retirada, datos preservados y V/R/fecha visibles");
