(function(){'use strict';
 const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),hashParams=new URLSearchParams(String(location.hash||'').slice(1)),visitor=params.get('visitor')==='1',legacyId=params.get('liveEvent'),legacyKind=params.get('liveKind')||'tournament',legacy=!!legacyId,prefilledCode=String(hashParams.get('code')||'').trim();
 if(visitor){document.body.classList.add('visitor-entry');$('guestScoresBackdrop').hidden=false;$('entryTitle').textContent='INGRESA TU CÓDIGO';$('entryLead').textContent='Abre los Scores compartidos en una vista privada de sólo lectura.';const panel=document.querySelector('main.entry');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','entryTitle')}
 if(prefilledCode){$('entryCode').value=prefilledCode;try{const clean=new URL(location.href);clean.hash='';history.replaceState(null,'',clean.toString())}catch{}}
 if($('entryClose'))$('entryClose').onclick=()=>location.assign(new URL('/index-grupal.html',location.origin).toString());
 $('entryForm').addEventListener('submit',async event=>{
   event.preventDefault();const code=$('entryCode').value.trim();if(!code)return;
   $('entryEnter').disabled=true;$('entryStatus').textContent='ABRIENDO…';
   try{
     if(legacy&&(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(legacyId)||!['tournament','private'].includes(legacyKind)))throw Error('LIVE_SHARE_EVENT_INVALID');
     const response=await fetch(legacy?'/api/live-share':'/api/app-access?action=redeem-code',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify(legacy?{action:'redeem',eventId:legacyId,eventKind:legacyKind,code}: {code})}),result=await response.json();
     if(!response.ok||!result.ok)throw Error(result.code||'UNAVAILABLE');
     const destination=new URL(legacy?'/live-hub.html':result.destination,location.origin);if(legacy){destination.searchParams.set('shared','1');destination.searchParams.set('liveEvent',legacyId);destination.searchParams.set('liveKind',legacyKind)}
     if(destination.origin!==location.origin||!['/index-grupal.html','/live-hub.html'].includes(destination.pathname))throw Error('UNAVAILABLE');
     location.assign(destination.toString());
   }catch(error){$('entryStatus').textContent=({CODE_INVALID_OR_USED:'EL CÓDIGO VENCIÓ O YA FUE UTILIZADO. PIDE UNO NUEVO.',LIVE_SHARE_CODE_INVALID_OR_USED:'EL CÓDIGO VENCIÓ O YA FUE UTILIZADO. PIDE UNO NUEVO.',LIVE_SHARE_EVENT_CLOSED:'ESTA RONDA YA ESTÁ CERRADA.',CODE_EVENT_CLOSED:'ESTA RONDA YA ESTÁ CERRADA.',LIVE_SHARE_EVENT_EXPIRED:'ESTE ENLACE LIVE VENCIÓ.',LIVE_SHARE_REVOKED:'ESTE ENLACE LIVE FUE REVOCADO.',LIVE_SHARE_EVENT_INVALID:'ENLACE LIVE INVÁLIDO.'})[error.message]||'NO SE PUDO ABRIR. INTENTA DE NUEVO.';$('entryEnter').disabled=false}
 });
})();
