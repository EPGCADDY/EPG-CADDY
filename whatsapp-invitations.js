(function(root){'use strict';
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null;
 const pendingKey='gsc-whatsapp-code-pending-v1';
 function remember(){try{root.localStorage?.removeItem(pendingKey)}catch{}}
 function sourceOrigin(source){return source==='lab'?'https://golf-sc-gt-lab.vercel.app':source==='production'?'https://epg-caddy.vercel.app':root.location.origin}
 function registrationUrl(source,code){const url=new URL('/index-grupal.html?inicio=1',sourceOrigin(source));const value=String(code||'').trim().toUpperCase();if(value)url.searchParams.set('codigo',value);return url.toString()}
 function tournamentInvitationUrl(name,eventId,code,source){const slug=String(name||'TORNEO').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]+/g,'-').replace(/^-|-$/g,'')||'TORNEO',url=new URL('/torneo/'+slug,sourceOrigin(source));url.hash='evento='+encodeURIComponent(eventId)+'&codigo='+encodeURIComponent(code);return url.toString()}
 function messages(kind,creator,code,source,eventId){const name=String(creator||'').trim(),value=String(code||'').trim().toUpperCase();if(!name||!value)throw Error('INVITATION_INCOMPLETE');const direct=kind==='tournament'&&eventId,link=direct?tournamentInvitationUrl(name,eventId,value,source):registrationUrl(source,value),instruction=direct?'Abre este enlace; el torneo, el campo y la modalidad se cargarán automáticamente.':'Abre este enlace; el código ya va cargado y podrás registrar a tus jugadores.';return ['GOLF SCORE CARD GT\nTe ha invitado a participar en '+(kind==='tournament'?'el torneo '+name:'el grupo de '+name)+'.\n'+instruction+'\n'+link+'\n\nMODALIDAD\n'+(kind==='tournament'?'TORNEO':'MI GRUPO')+'\n\nCÓDIGO DE INGRESO\n'+value,''+value]}
 function keys(event){if(event.key==='Escape'){event.preventDefault();close()}else if(event.key==='Tab'&&current){const nodes=[...current.querySelectorAll('button:not([disabled]),input')],first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&root.document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&root.document.activeElement===last){event.preventDefault();first.focus()}}}
 function close(){remember(null);if(!current)return;current.remove();current=null;root.document.removeEventListener?.('keydown',keys)}
 function open(options,onComplete){
  const code=String(options.code||'').trim();if(!code)return false;close();
  const panel=root.document.createElement('div');current=panel;panel.id='gscWhatsAppInvitation';panel.className='scores-detail-backdrop';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Invitación por WhatsApp');
  panel.innerHTML='<section class="scores-detail"><button type="button" data-close-whatsapp data-gsc-close aria-label="Cerrar">×</button><h3 data-whatsapp-heading>INVITACIÓN POR WHATSAPP</h3><p>La invitación incluye el código. También puedes compartir o copiar sólo el código.</p><label for="whatsappCreator">NOMBRE DEL CREADOR</label><input id="whatsappCreator" maxlength="120" value="'+esc(options.kind==='tournament'?options.eventName||'':options.creatorName||'')+'"><p data-invitation-preview style="white-space:pre-wrap;overflow-wrap:anywhere"></p><button type="button" class="primary" data-send-invitation>COMPARTIR INVITACIÓN Y CÓDIGO</button><button type="button" data-send-code>COMPARTIR SOLO EL CÓDIGO</button><button type="button" data-copy-code>COPIAR SOLO EL CÓDIGO</button><button type="button" data-finish-whatsapp>VOLVER</button><p data-whatsapp-status role="status" aria-live="polite"></p></section>';
  root.document.body.appendChild(panel);root.document.addEventListener?.('keydown',keys);
  const creator=panel.querySelector('#whatsappCreator'),first=panel.querySelector('[data-send-invitation]'),status=panel.querySelector('[data-whatsapp-status]');let busy=false;creator.value=(options.kind==='tournament'?options.eventName:options.creatorName)||'';panel.querySelector('label').textContent=options.kind==='tournament'?'NOMBRE DEL TORNEO':'NOMBRE DEL CREADOR';
  const preview=()=>{try{panel.querySelector('[data-invitation-preview]').textContent=messages(options.kind,creator.value,code,options.source,options.eventId)[0]}catch{panel.querySelector('[data-invitation-preview]').textContent=options.kind==='tournament'?'ESCRIBE EL NOMBRE DEL TORNEO':'ESCRIBE EL NOMBRE DEL CREADOR'}};
  creator.oninput=preview;preview();
  async function send(){
   if(busy)return;let text;try{text=messages(options.kind,creator.value,code,options.source,options.eventId)[0]}catch{status.textContent=options.kind==='tournament'?'ESCRIBE EL NOMBRE DEL TORNEO':'ESCRIBE EL NOMBRE DEL CREADOR';creator.focus();return}
   busy=true;first.disabled=true;
   try{
    if(typeof root.navigator?.share==='function')await root.navigator.share({text});
    else root.location.assign('https://wa.me/?text='+encodeURIComponent(text));
    if(current!==panel)return;
    panel.querySelector('[data-send-code]').hidden=false;panel.querySelector('[data-copy-code]').hidden=false;status.textContent='INVITACIÓN Y CÓDIGO PREPARADOS · COMPLETA EL ENVÍO EN WHATSAPP';
   }catch(error){if(current!==panel)return;status.textContent=error?.name==='AbortError'?'COMPARTIR CANCELADO · PUEDES REINTENTAR':'NO SE PUDO ABRIR WHATSAPP · REINTENTA'}finally{busy=false;first.disabled=false}
  }
  async function sendCode(){if(busy)return;busy=true;const button=panel.querySelector('[data-send-code]');button.disabled=true;try{if(typeof root.navigator?.share==='function')await root.navigator.share({text:messages(options.kind,creator.value,code,options.source,options.eventId)[1]});else root.location.assign('https://wa.me/?text='+encodeURIComponent(messages(options.kind,creator.value,code,options.source,options.eventId)[1]));if(current===panel)status.textContent='CÓDIGO PREPARADO COMO MENSAJE INDEPENDIENTE'}catch(error){if(current===panel)status.textContent=error?.name==='AbortError'?'ENVÍO DEL CÓDIGO CANCELADO · PUEDES REINTENTAR':'NO SE PUDO ABRIR WHATSAPP · REINTENTA'}finally{busy=false;button.disabled=false}}
  async function copyCode(){try{await root.navigator.clipboard.writeText(code);status.textContent='CÓDIGO COPIADO · '+code}catch{status.textContent='NO SE PUDO COPIAR · USA COMPARTIR SOLO EL CÓDIGO'}}
  first.onclick=send;panel.querySelector('[data-send-code]').onclick=sendCode;panel.querySelector('[data-copy-code]').onclick=copyCode;panel.querySelector('[data-close-whatsapp]').onclick=close;panel.querySelector('[data-finish-whatsapp]').onclick=()=>{close();onComplete?.()};return true;
 }
 function resume(){remember();return false}
 root.GSCWhatsAppInvitations={open,close,messages,resume};
 root.document.addEventListener?.('DOMContentLoaded',resume,{once:true});
})(globalThis);
