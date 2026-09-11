"use strict";
export const RELEASE_URL="/update-lab-d/release.json";
export const SW_URL="/update-lab-d/update-sw.js";
export const SW_SCOPE="/update-lab-d/";

export async function fetchRelease(){
  const r=await fetch(`${RELEASE_URL}?t=${Date.now()}`,{cache:"no-store",headers:{"cache-control":"no-cache"}});
  if(!r.ok)throw new Error(`RELEASE_HTTP_${r.status}`);
  const m=await r.json();
  if(m?.schema!=="gscg-update-release/v3"||!m.release)throw new Error("RELEASE_INVALID");
  return m;
}

function waitForControllerChange(timeoutMs=12000){
  return new Promise((resolve,reject)=>{
    let done=false;
    const onChange=()=>{if(done)return;done=true;clearTimeout(timer);navigator.serviceWorker.removeEventListener("controllerchange",onChange);resolve(navigator.serviceWorker.controller)};
    const timer=setTimeout(()=>{if(done)return;done=true;navigator.serviceWorker.removeEventListener("controllerchange",onChange);reject(new Error("CONTROLLERCHANGE_TIMEOUT"))},timeoutMs);
    navigator.serviceWorker.addEventListener("controllerchange",onChange,{once:true});
  });
}

export function queryActiveRelease(worker=navigator.serviceWorker.controller,timeoutMs=5000){
  return new Promise((resolve,reject)=>{
    if(!worker)return reject(new Error("NO_CONTROLLER"));
    const channel=new MessageChannel();
    const timer=setTimeout(()=>reject(new Error("ACTIVE_RELEASE_TIMEOUT")),timeoutMs);
    channel.port1.onmessage=e=>{clearTimeout(timer);const v=String(e.data?.release||"");v?resolve(v):reject(new Error("ACTIVE_RELEASE_EMPTY"))};
    worker.postMessage({type:"QUERY_ACTIVE_RELEASE"},[channel.port2]);
  });
}

export async function installVerifiedUpdate(expectedRelease){
  if(!("serviceWorker" in navigator))throw new Error("SERVICE_WORKER_UNAVAILABLE");
  const before=navigator.serviceWorker.controller;
  const registration=await navigator.serviceWorker.register(SW_URL,{scope:SW_SCOPE,updateViaCache:"none"});
  await registration.update();
  const worker=registration.waiting||registration.installing;
  if(!worker)throw new Error("NO_NEW_WORKER");
  if(worker.state==="installing")await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("INSTALL_TIMEOUT")),12000);worker.addEventListener("statechange",()=>{if(worker.state==="installed"){clearTimeout(timer);resolve()}else if(worker.state==="redundant"){clearTimeout(timer);reject(new Error("WORKER_REDUNDANT"))}})});
  const changed=waitForControllerChange();
  worker.postMessage({type:"ACTIVATE_RELEASE",release:expectedRelease});
  const controller=await changed;
  if(!controller||controller===before)throw new Error("CONTROLLER_NOT_REPLACED");
  const active=await queryActiveRelease(controller);
  if(active!==expectedRelease)throw new Error(`ACTIVE_RELEASE_MISMATCH_${active}`);
  return active;
}
