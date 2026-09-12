"use strict";
(()=>{
  const CANONICAL_LAB_ORIGIN="https://golf-sc-gt-lab.vercel.app";
  const RELEASE_ENDPOINT=`${CANONICAL_LAB_ORIGIN}/api/release`;
  const SHELL_ENDPOINT=`${CANONICAL_LAB_ORIGIN}/app-current-shell.html`;
  const LEGACY_CACHE_PREFIX="gscg-mobile-";
  const INSTALLED_HTML_KEY="gscg_installed_shell_html_v1";
  const INSTALLED_RELEASE_KEY="gscg_active_release_v1";
  const CURRENT_RELEASE=document.querySelector('meta[name="gscg-release"]')?.content||"";
  let checking=false,updating=false,pending=CURRENT_RELEASE;
  const $=id=>document.getElementById(id);

  function releaseParts(release){
    const match=String(release||"").match(/^V(\d+)-R(\d+)(?:-[A-Z0-9-]+)?-(\d{4})(\d{2})(\d{2})$/i)
      ||String(release||"").match(/^V(\d+)-R(\d+)/i);
    return match?{version:Number(match[1]),revision:Number(match[2]),date:match[3]?`${match[5]}/${match[4]}/${match[3]}`:""}:null;
  }
  function isNewerRelease(candidate,current){
    const next=releaseParts(candidate),active=releaseParts(current);
    if(!next||!active)return false;
    return next.version>active.version||(next.version===active.version&&next.revision>active.revision);
  }
  function renderActiveRelease(){
    const active=releaseParts(CURRENT_RELEASE),label=$("appVersionId");
    if(active&&label)label.textContent=`V${active.version} · R${active.revision}${active.date?` · ${active.date}`:""}`;
  }

  try{
    if(CURRENT_RELEASE&&!localStorage.getItem(INSTALLED_RELEASE_KEY))localStorage.setItem(INSTALLED_RELEASE_KEY,CURRENT_RELEASE);
  }catch{}

  function setCurrent(){
    pending=CURRENT_RELEASE;
    const button=$("mandatoryUpdateButton");
    if(button){button.disabled=true;button.setAttribute("aria-disabled","true")}
    const action=$("mandatoryUpdateAction");if(action)action.textContent="ACTUALIZADO";
    $("mandatoryUpdate")?.classList.remove("available");
  }
  function setAvailable(release){
    if(!isNewerRelease(release,CURRENT_RELEASE))return setCurrent();
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
    catch(error){console.warn("APP_VERSION_SYNC_PINNED",error?.message||error)}
    finally{checking=false}
  }
  function persistState(){
    try{if($("setupOverlay")?.classList.contains("visible")){window.captureVisibleRegistrationValues?.();window.syncDraftPlayersFromManualRows?.({strict:false,renderAfter:false});window.persistDraftState?.()}}catch{}
    try{window.persist?.()}catch{}
  }
  async function fetchAndVerifyShell(expectedRelease){
    const probe=new URL(SHELL_ENDPOINT);
    probe.searchParams.set("manual_update_probe",String(Date.now()));
    probe.searchParams.set("expected_release",expectedRelease);
    const response=await fetch(probe.toString(),{cache:"no-store",headers:{"Cache-Control":"no-cache","Pragma":"no-cache"}});
    if(!response.ok)throw new Error(`SHELL_HTTP_${response.status}`);
    const html=await response.text();
    if(html.length<300000)throw new Error("SHELL_TOO_SMALL");
    const release=html.match(/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i)?.[1]||"";
    if(release!==expectedRelease)throw new Error(`SHELL_RELEASE_MISMATCH_${release||"EMPTY"}`);
    return html;
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
      const html=await fetchAndVerifyShell(data.release);
      localStorage.setItem(INSTALLED_HTML_KEY,html);
      localStorage.setItem(INSTALLED_RELEASE_KEY,data.release);
      await retireLegacyWorkersAndCaches();
      const next=new URL("/index-grupal.html",CANONICAL_LAB_ORIGIN);
      const source=new URL(location.href).searchParams.get("source");
      if(source)next.searchParams.set("source",source);
      next.searchParams.set("manual_update",String(Date.now()));
      location.replace(next.toString());
    }catch(error){
      updating=false;
      console.warn("APP_UPDATE_PINNED",error?.message||error);
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
  window.GSCUpdatePinned={check,fetchRelease,current:CURRENT_RELEASE};
  renderActiveRelease();
  setCurrent();
  setTimeout(check,250);
  setInterval(check,30000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(check,300)});
})();
