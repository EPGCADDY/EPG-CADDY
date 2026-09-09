(function(){
  if(!document.cookie.split(";").some(value=>value.trim()==="gsc_guest_mode=1"))return;
  window.GSC_GUEST_ACCESS=true;
  const storage=window.localStorage,prefix="gscg-guest24h:",proto=Storage.prototype;
  const base={getItem:proto.getItem,setItem:proto.setItem,removeItem:proto.removeItem,clear:proto.clear};
  proto.getItem=function(key){return this===storage?base.getItem.call(this,prefix+key):base.getItem.call(this,key)};
  proto.setItem=function(key,value){return this===storage?base.setItem.call(this,prefix+key,value):base.setItem.call(this,key,value)};
  proto.removeItem=function(key){return this===storage?base.removeItem.call(this,prefix+key):base.removeItem.call(this,key)};
  proto.clear=function(){if(this!==storage)return base.clear.call(this);const keys=[];for(let index=0;index<this.length;index++){const key=this.key(index);if(key&&key.startsWith(prefix))keys.push(key)}keys.forEach(key=>base.removeItem.call(this,key))};
  window.addEventListener("DOMContentLoaded",()=>{document.body.classList.add("guest-24h");const notice=document.createElement("div");notice.id="guestAccessNotice";notice.setAttribute("role","status");notice.style.cssText="position:sticky;top:0;z-index:20000;padding:10px;background:#102000;color:#31ff00;border-bottom:1px solid #31ff00;text-align:center;font:900 11px Arial";notice.textContent="ACCESO TEMPORAL 24 HORAS · ACTIVIDAD ANÓNIMA REGISTRADA HASTA 48 HORAS · SIN NOMBRES NI IDENTIDAD";document.body.prepend(notice);["commercialProButton","accountBackupOverlay"].forEach(id=>document.getElementById(id)?.remove())});
})();

