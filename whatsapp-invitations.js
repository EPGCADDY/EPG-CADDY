(function(root){'use strict';
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null;
 const pendingKey='gsc-whatsapp-code-pending-v1';
 function remember(){try{root.localStorage?.removeItem(pendingKey)}catch{}}
 function registrationUrl(){const url=new URL('/index-grupal.html?inicio=1',root.location.origin);return url.toString()}
 function messages(kind,creator,code){const name=String(creator||'').trim(),value=String(code||'').trim();if(!name||!value)throw Error('INVITATION_INCOMPLETE');return ['GOLF SCORE CARD GT\nTe ha invitado a participar en '+(kind==='tournament'?'el torneo '+name:'el grupo de '+name)+'.\nCopia y pega el código en la pantalla inicial de registro.\n'+registrationUrl()+'\n\nMODALIDAD\n'+(kind==='tournament'?'TORNEO':'MI GRUPO')+'\nCódigo\n\n\n'+value]}
 function keys(event){if(event.key==='Escape'){event.preventDefault();close()}else if(event.key==='Tab'&&current){const nodes=[...current.querySelectorAll('button:not([disabled]),input')],first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&root.document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&root.document.activeElement===last){event.preventDefault();first.focus()}}}
 function close(){remember(null);if(!current)return;current.remove();current=null;root.document.removeEventListener?.('keydown',keys)}
 function open(options,onComplete){
  const code=String(options.code||'').trim();if(!code)return false;close();
  const panel=root.document.createElement('div');current=panel;panel.id='gscWhatsAppInvitation';panel.className='scores-detail-backdrop';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Invitación por WhatsApp');
  panel.innerHTML='<section class="scores-detail"><button type="button" data-close-whatsapp data-gsc-close aria-label="Cerrar">×</button><h3 data-whatsapp-heading>INVITACIÓN POR WHATSAPP</h3><p>La invitación y el código se comparten juntos en un solo mensaje.</p><label for="whatsappCreator">NOMBRE DEL CREADOR</label><input id="whatsappCreator" maxlength="120" value="'+esc(options.kind==='tournament'?options.eventName||'':options.creatorName||'')+'"><p data-invitation-preview style="white-space:pre-wrap;overflow-wrap:anywhere"></p><button type="button" class="primary" data-send-invitation>COMPARTIR POR WHATSAPP</button><button type="button" data-finish-whatsapp>VOLVER</button><p data-whatsapp-status role="status" aria-live="polite"></p></section>';
  root.document.body.appendChild(panel);root.document.addEventListener?.('keydown',keys);
  const creator=panel.querySelector('#whatsappCreator'),first=panel.querySelector('[data-send-invitation]'),status=panel.querySelector('[data-whatsapp-status]');let busy=false;creator.value=(options.kind==='tournament'?options.eventName:options.creatorName)||'';panel.querySelector('label').textContent=options.kind==='tournament'?'NOMBRE DEL TORNEO':'NOMBRE DEL CREADOR';
  const preview=()=>{try{panel.querySelector('[data-invitation-preview]').textContent=messages(options.kind,creator.value,code)[0]}catch{panel.querySelector('[data-invitation-preview]').textContent=options.kind==='tournament'?'ESCRIBE EL NOMBRE DEL TORNEO':'ESCRIBE EL NOMBRE DEL CREADOR'}};
  creator.oninput=preview;preview();
  async function send(){
   if(busy)return;let text;try{text=messages(options.kind,creator.value,code)[0]}catch{status.textContent=options.kind==='tournament'?'ESCRIBE EL NOMBRE DEL TORNEO':'ESCRIBE EL NOMBRE DEL CREADOR';creator.focus();return}
   busy=true;first.disabled=true;
   try{
    if(typeof root.navigator?.share==='function')await root.navigator.share({text});
    else root.location.assign('https://wa.me/?text='+encodeURIComponent(text));
    if(current!==panel)return;
    status.textContent='MENSAJE PREPARADO · CONFIRMA EL ENVÍO EN WHATSAPP';
   }catch(error){if(current!==panel)return;status.textContent=error?.name==='AbortError'?'COMPARTIR CANCELADO · PUEDES REINTENTAR':'NO SE PUDO ABRIR WHATSAPP · REINTENTA'}finally{busy=false;first.disabled=false}
  }
  first.onclick=send;panel.querySelector('[data-close-whatsapp]').onclick=close;panel.querySelector('[data-finish-whatsapp]').onclick=()=>{close();onComplete?.()};return true;
 }
 function resume(){remember();return false}
 root.GSCWhatsAppInvitations={open,close,messages,resume};
 root.document.addEventListener?.('DOMContentLoaded',resume,{once:true});
})(globalThis);
