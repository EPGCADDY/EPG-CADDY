(function(root){'use strict';
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null;
 const pendingKey='gsc-whatsapp-code-pending-v1';
 function remember(){try{root.localStorage?.removeItem(pendingKey)}catch{}}
 function sourceOrigin(source){return source==='lab'?'https://golf-sc-gt-lab.vercel.app':source==='production'?'https://epg-caddy.vercel.app':root.location.origin}
 function registrationUrl(source){return new URL('/index-grupal.html?inicio=1',sourceOrigin(source)).toString()}
 function tournamentInvitationUrl(name,eventId,code,source){const slug=String(name||'TORNEO').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z0-9]+/g,'-').replace(/^-|-$/g,'')||'TORNEO',url=new URL('/torneo/'+slug,sourceOrigin(source));url.hash='evento='+encodeURIComponent(eventId)+'&codigo='+encodeURIComponent(code);return url.toString()}
 function messages(kind,creator,code,source,eventId){const name=String(creator||'').trim(),value=String(code||'').trim();if(!name||!value)throw Error('INVITATION_INCOMPLETE');const direct=kind==='tournament'&&eventId,link=direct?tournamentInvitationUrl(name,eventId,value,source):registrationUrl(source),instruction=direct?'Abre este enlace; el torneo, el campo y la modalidad se cargarÃ¡n automÃ¡ticamente.':'Abre este enlace y registra a tus jugadores.';return ['GOLF SCORE CARD GT\nTe ha invitado a participar en '+(kind==='tournament'?'el torneo '+¶»§q«^