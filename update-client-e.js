"use strict";
(()=>{
  const RELEASE_ENDPOINT="/api/release";
  const LEGACY_CACHE_PREFIX="gscg-mobile-";
  const CURRENT_RELEASE=document.querySelector('meta[name="gscg-release"]')?.content||"";
  let checking=false,updating=false,pending=CURRENT_RELEASE;
  const $=id=>document.getElementById(id);

  function setCurrent(){
    pending=CURRENT_RELEASE;
    const button=$("mandatoryUpdateButton");
    if(button){button.disabled=true;button.setAttribute("aria-disabled","true")}
    const action=$("mandatoryUpdateAction");if(action)action.textContent="ACTUALIZADO";
    $("mandatoryUpdate")?.classList.remove("available");
  }
  function setAvailable(release){
    if(!release||release===CURRENT_RELEASE)return setCurrent();
    pending=release;
    const button=$("mandatoryUpdateButton");
    if(button){button.disabled=false;button.setAttribute("aria-disabled","false")}
    const action=$("mandatoryUpdateAction");if(action)action.textContent="ACTUALIZAR";
    $("mandatoryUpdate")?.classList.add("available");
  }
  async function fetchRelease(){
    const response=await fetch(`${RELEASE_ENDPOINT}?t=${Date.now()}`,{cache:"no-store",headers:{"Cache-Control":"no-cache","Pragma":"no-cache"}});
    if(!response.ok)throw new Error(`RELEASE_HTTP_${response.status}`);
    const data=await response.json();
    if(!data?.release||!data?.baseline)throw new Error("RELEASE_PAYLOAD_INVALID");
    return data;
  }
  async function check(){
    if(checking||updating||document.hidden)return;
    checking=true;
    try{const data=await fetchRelease();setAvailable(data.release)}
    catch(error){console.warn("APP_VERSION_SYNC_DIRECT",error?.message||error)}
    finally{checking=false}
  }
  function persistState(){
    try{if($("setupOverlay")?.classList.contains("visible")){window.captureVisibleRegistrationValues?.();window.syncDraftPlayersFromManualRows?.({strict:false,renderAfter:false});window.persistDraftState?.()}}catch{}
    try{window.persist?.()}catch{}
  }
  async function fetchAndVerifyShell(expectedRelease){
    const probe=new URL("/index-grupal.html",location.origin);
    probe.searchParams.set("direct_update_probe",String(Date.now()));
    probe.searchParams.set("expected_release",expectedRelease);
    const response=await fetch(probe.toString(),{cache:"no-store",headers:{"Cache-Control":"no-cache","Pragma":"no-cache"}});
    if(!response.ok)throw new Error(`SHELL_HTTP_${response.status}`);
    const html=await response.text();
    if(html.length<300000)throw new Error("SHELL_TOO_SMALL");
    const release=html.match(/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i)?.[1]||"";
    if(release!==expectedRelease)throw new Error(`SHELL_RELEASE_MISMATCH_${release||"EMPTY"}`);
    return true;
  }
  async function retireLegacyWorkersAndCaches(){
    if("caches" in window){
      const names=await caches.keys();
      await Promise.all(names.filter(name=>name.startsWith(LEGACY_CACHE_PREFIX)).map(name=>caches.delete(name)));
    }
    if("serviceWorker" in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(reg=>reg.unregister().catch(()=>false)));
    }
  }
  async function install(){
    if(updating||!pending||pending===CURRENT_RELEASE)return;
    updating=true;
    const button=$("mandatoryUpdateButton");
    if(button){button.disabled=true;button.setAttribute("aria-disabled","true")}
    try{
      persistState();
      const data=await fetchRelease();
      if(data.release!==pending)throw new Error("RELEASE_CHANGED_DURING_UPDATE");
      await fetchAndVerifyShell(data.release);
      await retireLegacyWorkersAndCaches();
      const next=new URL("/index-grupal.html",location.origin);
      const source=new URL(location.href).searchParams.get("source");
      if(source)next.searchParams.set("source",source);
      next.searchParams.set("release",data.release);
      next.searchParams.set("direct_update",String(Date.now()));
      location.replace(next.toString());
    }catch(error){
      updating=false;
      console.warn("APP_UPDATE_DIRECT",error?.message||error);
      setAvailable(pending);
      setTimeout(check,500);
    }
  }
  function replaceOldListener(){
    const old=$("mandatoryUpdateButton");
    if(!old)return false;
    const fresh=old.cloneNode(true);
    old.replaceWith(fresh);
    fresh.addEventListener("click",install);
    return true;
  }
  if(!replaceOldListener())return;
  window.GSCUpdateDirect={check,fetchRelease,current:CURRENT_RELEASE};
  setCurrent();
  setTimeout(check,250);
  setInterval(check,30000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(check,300)});
})();
