(function(){'use strict';
 const $=id=>document.getElementById(id),visitor=new URLSearchParams(location.search).get('visitor')==='1';
 if(visitor){$('entryTitle').textContent='SCORES';$('entryLead').textContent='Ingresa el código que te compartieron para ver los resultados.'}
 $('entryForm').addEventListener('submit',async event=>{
   event.preventDefault();const code=$('entryCode').value.trim();if(!code)return;
   $('entryEnter').disabled=true;$('entryStatus').textContent='ABRIENDO…';
   try{
     const response=await fetch('/api/app-access?action=redeem-code',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})}),result=await response.json();
     if(!response.ok||!result.ok)throw Error(result.code||'UNAVAILABLE');
     const destination=new URL(result.destination,location.origin);
     if(destination.origin!==location.origin||!['/index-grupal.html','/live-hub.html'].includes(destination.pathname))throw Error('UNAVAILABLE');
     location.assign(destination.toString());
   }catch(error){$('entryStatus').textContent=error.message==='CODE_INVALID_OR_USED'?'EL CÓDIGO VENCIÓ O YA FUE UTILIZADO. PIDE UNO NUEVO.':'NO SE PUDO ABRIR. INTENTA DE NUEVO.';$('entryEnter').disabled=false}
 });
})();
