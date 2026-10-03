(function(root){'use strict';
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null;
 const pendingKey='gsc-whatsapp-code-pending-v1',pendingLifetime=45*60*1000;
 function remember(value){try{if(value)root.localStorage?.setItem(pendingKey,JSON.stringify({...value,savedAt:Date.now()}));else root.localStorage?.removeItem(pendingKey)}catch{}}
 function pending(){try{const value=JSON.parse(root.localStorage?.getItem(pendingKey)||'null');if(value&&Date.now()-value.savedAt>=0&&Date.now()-value.savedAt<pendingLifetime&&typeof value.code==='string'&&typeof value.creatorName==='string'&&['private','tournament'].includes(value.kind))return value}catch{}remember(null);return null}
 function messages(kind,creator,code){const name=String(creator||'').trim(),value=String(code||'').trim();if(!name||!value)throw Error('INVITATION_INCOMPLETE');return ['GOLF SCORE CARD GT\nTe han invitado a participar en '+(kind==='tournament'?'el torneo':'la ronda')+' de '+name+'.',value]}
 function keys(event){if(event.key==='Escape'){event.preventDefault();close()}else if(event.key==='Tab'&&current){const nodes=[...current.querySelectorAll('button:not([disabled]),input')],first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&root.document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&root.document.activeElement===last){event.preventDefault();first.focus()}}}
 function close(){remember(null);if(!current)return;current.remove();current=null;root.document.removeEventListener?.('keydown',keys)}
 function open(options,onComplete){
  const code=String(options.code||'').trim();if(!code)return false;close();
  const panel=root.document.createElement('div');current=panel;panel.id='gscWhatsAppInvitation';panel.className='scores-detail-backdrop';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Invitación por WhatsApp');
  panel.innerHTML='<section class="scores-detail"><button type="button" data-close-whatsapp data-gsc-close aria-label="Cerrar">×</button><h3 data-whatsapp-heading>INVITACIÓN POR WHATSAPP</h3><p data-whatsapp-instructions>SON DOS ENVÍOS. Después de enviar la invitación, vuelve a esta app y toca ENVIAR SOLO EL CÓDIGO. Selecciona el mismo contacto en WhatsApp.</p><div data-first-message><label for="whatsappCreator">NOMBRE DEL CREADOR</label><input id="whatsappCreator" maxlength="120" value="'+esc(options.creatorName||'')+'"><p data-invitation-preview></p><button type="button" class="primary" data-send-invitation>1 · ENVIAR INVITACIÓN</button></div><output data-code-preview></output><button type="button" class="primary" data-send-code disabled>2 · ENVIAR SOLO EL CÓDIGO</button><button type="button" data-finish-whatsapp>VOLVER</button><p data-whatsapp-status role="status" aria-live="polite"></p></section>';
  root.document.body.appendChild(panel);root.document.addEventListener?.('keydown',keys);
  const creator=panel.querySelector('#whatsappCreator'),first=panel.querySelector('[data-send-invitation]'),second=panel.querySelector('[data-send-code]'),status=panel.querySelector('[data-whatsapp-status]');let busy=false,prepared=!!options.resumeCode;creator.value=options.creatorName||'';
  const snapshot=()=>({kind:options.kind==='tournament'?'tournament':'private',creatorName:creator.value.trim(),code,resumeCode:true});
  const stage=()=>{panel.querySelector('[data-first-message]').hidden=prepared;panel.querySelector('[data-whatsapp-heading]').textContent=prepared?'FALTA ENVIAR EL CÓDIGO':'INVITACIÓN POR WHATSAPP';second.disabled=!prepared;if(prepared){panel.querySelector('[data-whatsapp-instructions]').textContent='Toca ENVIAR SOLO EL CÓDIGO y confirma el envío al mismo contacto. El código no se envía automáticamente.';second.focus?.();second.scrollIntoView?.({block:'nearest'})}};
  const preview=()=>{try{panel.querySelector('[data-invitation-preview]').textContent=messages(options.kind,creator.value,code)[0]}catch{panel.querySelector('[data-invitation-preview]').textContent='ESCRIBE EL NOMBRE DE QUIEN CREÓ LA RONDA O EL TORNEO'}};
  creator.oninput=()=>{prepared=false;remember(null);stage();preview()};preview();panel.querySelector('[data-code-preview]').textContent=code;stage();if(prepared)remember(snapshot());
  async function send(index){
   if(busy||(index===1&&!prepared))return;let text;try{text=messages(options.kind,creator.value,code)[index]}catch{status.textContent='ESCRIBE EL NOMBRE DEL CREADOR';creator.focus();return}
   busy=true;first.disabled=true;second.disabled=true;
   try{
    if(index===0)remember(snapshot());
    if(typeof root.navigator?.share==='function')await root.navigator.share({text});
    else root.location.assign('https://wa.me/?text='+encodeURIComponent(text));
    if(current!==panel)return;
    if(index===0){prepared=true;remember(snapshot());stage();status.textContent='REGRESA DESPUÉS DE ENVIAR LA INVITACIÓN Y ENVÍA SOLO EL CÓDIGO'}else{remember(null);panel.querySelector('[data-whatsapp-heading]').textContent='CÓDIGO PREPARADO';status.textContent='CÓDIGO PREPARADO · CONFIRMA EL ENVÍO EN WHATSAPP'};
   }catch(error){if(current!==panel)return;if(index===0)remember(null);status.textContent=error?.name==='AbortError'?'COMPARTIR CANCELADO · PUEDES REINTENTAR':'NO SE PUDO ABRIR WHATSAPP · REINTENTA'}finally{busy=false;first.disabled=false;second.disabled=!prepared}
  }
  first.onclick=()=>send(0);second.onclick=()=>send(1);panel.querySelector('[data-close-whatsapp]').onclick=close;panel.querySelector('[data-finish-whatsapp]').onclick=()=>{close();onComplete?.()};return true;
 }
 function resume(){if(current)return false;const value=pending();if(!value)return false;return open(value)}
 root.GSCWhatsAppInvitations={open,close,messages,resume};
 root.document.addEventListener?.('DOMContentLoaded',resume,{once:true});
})(globalThis);
