"use strict";
(()=>{
  const RELEASE_ENDPOINT="/api/release";
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
    if(!data?.release||!data?.baselineCommit)throw new Error("RELEASE_PAYLOAD_INVALID");
    return data;
  }
  async function check(){
    if(checking||updating||document.hidden)return;
    checking=true;
    try{const data=await fetchRelease();setAvailable(data.release)}
    catch(error){console.warn("APP_VERSION_SYNC_E",error?.message||error)}
    finally{checking=false}
  }
  function persistState(){
    try{if($("setupOverlay")?.classList.contains("visible")){window.captureVisibleRegistrationValues?.();window.syncDraftPlayersFromManualRows?.({strict:false,renderAfter:false});window.persistDraftState?.()}}catch{}
    try{window.persist?.()}catch{}
  }
  async function install(){
    if(updating||!pending||pending===CURRENT_RELEASE)return;
    updating=true;
    try{
      persistState();
      const data=await fetchRelease();
      if(data.release!==pending)throw new Error("RELEASE_CHANGED_DURING_UPDATE");
      const next=new URL(location.href);
      next.searchParams.delete("__gscg_build_check");
      next.searchParams.delete("app_version");
      next.searchParams.set("e_release",data.release);
      next.searchParams.set("e_update",String(Date.now()));
      location.replace(next.toString());
    }catch(error){
      updating=false;
      console.warn("APP_UPDATE_E",error?.message||error);
      setTimeout(check,250);
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
  window.GSCUpdateE={check,fetchRelease,current:CURRENT_RELEASE};
  setCurrent();
  setTimeout(check,250);
  setInterval(check,30000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(check,300)});
})();
