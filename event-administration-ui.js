const $=id=>document.getElementById(id),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const messages={EVENT_ADMIN_REQUIRED:'NO TIENES PERMISO PARA ELIMINAR ESTE EVENTO',EVENT_NAME_CONFIRMATION_REQUIRED:'ESCRIBE EL NOMBRE EXACTO DEL EVENTO',EVENT_DELETE_REASON_REQUIRED:'ESCRIBE EL MOTIVO',ADMIN_RECIPIENT_REQUIRED:'INDICA EL NOMBRE Y CÓDIGO PERSONAL DE LA PERSONA',ADMIN_CODE_INVALID:'CÓDIGO INCORRECTO, USADO, VENCIDO O ASIGNADO A OTRA PERSONA',ACCOUNT_UNAUTHORIZED:'INICIA TU SESIÓN DE PROPIETARIO PARA TENER CONTROL PLENO',LIVE_EXPIRED:'EL EVENTO O PERMISO VENCIÓ'};
async function call(action,payload={},signal){try{const response=await fetch('/api/event-administration',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload}),signal});return{...await response.json(),ok:response.ok}}catch{return{ok:false,code:'NETWORK_ERROR'}}}
function showStatus(result,id='status'){ $(id).textContent=result.ok?'LISTO':messages[result.code]||'NO SE PUDO COMPLETAR · '+result.code }
function eventStatus(button,text){button.closest('article').querySelector('[data-event-status]').textContent=text}
async function copyTournamentId(button,code){if(button.disabled)return;button.disabled=true;button.textContent='COPIANDO…';eventStatus(button,'');try{await navigator.clipboard.writeText(code);button.textContent='ID COPIADO ✓';eventStatus(button,'ID COPIADO')}catch{button.textContent='COPIAR ID';eventStatus(button,'NO SE PUDO COPIAR · REINTENTA')}finally{button.disabled=false}}
async function shareEvent(button,e){if(button.disabled)return;button.disabled=true;eventStatus(button,'PREPARANDO CÓDIGO…');try{const local=e.source===cachedLocal.source,result=e.joinCode?{ok:true,joinCode:e.joinCode}:local?await window.GSCPersonalEvents.request(e.event_kind==='private'?'share-code':'organizer-entry-code',{eventId:e.id,eventKind:e.event_kind}):await call('remote-share',{source:e.source,eventId:e.id,eventKind:e.event_kind});if(!result.ok){eventStatus(button,messages[result.code]||window.GSCPersonalEvents.message(result.code));return}const code=result.joinCode||result.code||'';if(!code){eventStatus(button,'EL SERVIDOR NO ENTREGÓ UN CÓDIGO');return}const opened=window.GSCWhatsAppInvitations.open({kind:e.event_kind,code,eventName:e.name,source:e.source},()=>{});eventStatus(button,opened===false?'CÓDIGO '+code+' · NO SE PUDO ABRIR WHATSAPP':'CÓDIGO '+code+' · LISTO PARA COMPARTIR')}catch{eventStatus(button,'NO SE PUDO PREPARAR EL CÓDIGO · REINTENTA')}finally{button.disabled=false}}
let requestedEventOpened=false;
const format=at=>new Date(at).toLocaleString('es-GT',{timeZone:'America/Guatemala'});
function administrationRows(local,directory){
 const rows=new Map(),source=local.source;
 for(const e of local.ok?local.events||[]:[]){const eventSource=e.source||source;rows.set(eventSource+':'+e.event_kind+':'+e.id,{...e,source:eventSource,canAdminister:true})};
 for(const e of directory.ok?directory.events||[]:[]){if(!['lab','production'].includes(e.source)||e.status!=='active')continue;const key=e.source+':tournament:'+e.id;if(!rows.has(key))rows.set(key,{...e,event_kind:'tournament',canAdminister:false});else rows.set(key,{...rows.get(key),joinCode:e.joinCode})}
 return [...rows.values()].sort((a,b)=>a.name.localeCompare(b.name,'es')||a.source.localeCompare(b.source)||a.id.localeCompare(b.id));
}
function scoresHref(e,monitor){const same=e.source===cachedLocal.source,base=same?'':e.source==='lab'?'https://golf-sc-gt-lab.vercel.app':'https://epg-caddy.vercel.app';if(e.event_kind==='private')return base+'/live-hub.html?shortcut=scores&personalEvent='+encodeURIComponent(e.id)+'&personalKind=private&monitor='+monitor;return '/live-hub.html?directoryEvent='+encodeURIComponent('directory_'+e.source+'_'+e.id)+'&monitor='+monitor}
function administrationCard(e){
 const authorized=e.canAdminister,origin=e.source==='lab'?'LABORATORIO':'PRODUCCIÓN',key=escape(e.source+':'+e.event_kind+':'+e.id),kind=e.event_kind==='private'?'GRUPO':'TORNEO';
 const scores='<nav aria-label="SCORES '+escape(e.name)+'"><a href="'+escape(scoresHref(e,'general'))+'">SCORES · GENERAL</a><a href="'+escape(scoresHref(e,'categories'))+'">SCORES · CATEGORÍAS</a></nav>';
 const sharing=authorized||e.joinCode?'<button data-share-event="'+key+'">COMPARTIR CÓDIGO</button>':'<button disabled aria-label="Compartir requiere permiso de organizador">COMPARTIR · ORGANIZADOR</button>';
 const deleteLabel='ELIMINAR '+kind;
 const deleting='<button class="danger" data-delete="'+key+'">'+deleteLabel+'</button>';
 return '<article data-event-id="'+escape(e.id)+'" data-event-source="'+escape(e.source)+'"><h3>'+escape(e.name)+'</h3><p>'+kind+' · '+origin+'</p>'+(!authorized?'<p>CONSULTA DE SCORES · ELIMINAR REQUIERE AUTORIZACIÓN DEL ORGANIZADOR</p>':'')+scores+(e.joinCode?'<p>ID DE TORNEO</p><output data-tournament-code>'+escape(e.joinCode)+'</output>':'')+sharing+'<p data-event-status="'+key+'" role="status" aria-live="polite"></p>'+deleting+'</article>';
}
let refreshSequence=0,cachedLocal={ok:false},cachedDirectory={ok:false},cachedCodes={},lastRowsSignature='';
async function refresh({automatic=false,signal}={}){
 const sequence=++refreshSequence;if(!automatic)$('status').textContent='CARGANDO TORNEOS Y GRUPOS…';
 await window.GSCPersonalEvents.claimLegacyOwnedTournament();
 const [result,directory]=await Promise.all([call('list',{},signal),fetch('/api/tournament-score-directory',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list',withCodes:true}),signal}).then(async response=>({...await response.json(),ok:response.ok})).catch(()=>({ok:false,code:'NETWORK_ERROR'}))]);
 if(sequence!==refreshSequence||signal?.aborted)return{ok:false};
 const localChanged=result.ok&&JSON.stringify(result.events)!==JSON.stringify(cachedLocal.events);
 if(result.ok)cachedLocal=result;if(directory.ok&&!directory.partial)cachedDirectory=directory;
 else if(directory.ok){const merged=new Map((cachedDirectory.events||[]).map(e=>[e.source+':'+e.id,e]));for(const e of directory.events||[])merged.set(e.source+':'+e.id,e);cachedDirectory={ok:true,events:[...merged.values()]}}
 if(result.ok&&(!automatic||localChanged)){await window.GSCPersonalEvents.sync();cachedCodes=await window.GSCPersonalEvents.organizerCodes()||{}}if(sequence!==refreshSequence||signal?.aborted)return{ok:false};
 const codes=cachedCodes,rows=administrationRows(cachedLocal,cachedDirectory);showStatus(result);
 if(!result.ok&&cachedLocal.ok)$('status').textContent='SIN CONEXIÓN · CONSERVANDO LA ÚLTIMA LISTA';
 const signature=JSON.stringify([rows,codes]);
 if(automatic&&(signature===lastRowsSignature||document.querySelector('dialog[open],#gscWhatsAppInvitation,[data-gsc-dialog-backdrop]')))return{ok:result.ok&&directory.ok,partial:directory.partial};
 lastRowsSignature=signature;
 if(!directory.ok||directory.partial||result.partial)$('status').textContent+=' · LISTA GLOBAL INCOMPLETA · INICIA SESIÓN DE CUENTA Y REINTENTA';
 $('events').innerHTML='<h2>TORNEOS Y GRUPOS</h2>'+rows.map(e=>administrationCard(e)).join('');
 if(!rows.length)$('events').insertAdjacentHTML('beforeend','<p>'+(!directory.ok||directory.partial||!result.ok?'NO SE PUDO COMPROBAR LA LISTA COMPLETA · REINTENTA':'NO HAY TORNEOS ACTIVOS NI GRUPOS DISPONIBLES PARA TU CUENTA.')+'</p>');
 document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>remove(rows.find(e=>e.source+':'+e.event_kind+':'+e.id===b.dataset.delete)));
 document.querySelectorAll('[data-copy-tournament]').forEach(b=>b.onclick=()=>copyTournamentId(b,codes[b.dataset.copyTournament]));
 document.querySelectorAll('[data-share-event]').forEach(b=>b.onclick=()=>shareEvent(b,rows.find(e=>(e.canAdminister||e.joinCode)&&e.source+':'+e.event_kind+':'+e.id===b.dataset.shareEvent)));
 const params=new URLSearchParams(location.search),requested=rows.find(e=>e.canAdminister&&e.id===params.get('eventId')&&e.event_kind===params.get('eventKind'));if(requested&&!requestedEventOpened&&!automatic){requestedEventOpened=true;remove(requested)}
 return{ok:result.ok&&directory.ok,partial:directory.partial||result.partial};
}
function event(e){return{eventId:e.id,eventKind:e.event_kind}}
function preserveReturnTarget(){const link=document.querySelector('[data-gsc-close]'),target=new URLSearchParams(location.search).get('returnTo');if(!link||!target)return;try{const destination=new URL(target,location.origin);if(destination.origin===location.origin&&destination.pathname==='/index-grupal.html')link.href=destination.pathname+destination.search+destination.hash}catch{}}
preserveReturnTarget();
function open(content){$('action').innerHTML=content;$('actionStatus').textContent='';$('actionDialog').showModal()}
function remove(e){if(!e)return;const label='ELIMINAR '+(e.event_kind==='private'?'GRUPO':'TORNEO');open('<h2>'+(e.event_kind==='tournament'?'CONFIRMA ELIMINAR':'CONFIRMAR '+label)+'</h2><p>'+escape(e.name)+'</p><p>¿DESEAS ELIMINAR ESTE '+(e.event_kind==='private'?'GRUPO':'TORNEO')+'?</p><button type="button" id="cancelDelete">CANCELAR</button><button class="danger" id="confirmDelete">'+label+'</button>');$('cancelDelete').onclick=()=>$('actionDialog').close();$('confirmDelete').onclick=async()=>{const b=$('confirmDelete');b.disabled=true;const local=e.source===cachedLocal.source,result=await call(local?'delete':'remote-delete',{...event(e),...(local?{}:{source:e.source}),confirmName:e.name,reason:'Eliminación confirmada por el usuario'});showStatus(result,'actionStatus');if(result.ok){$('actionDialog').close();await refresh()}else b.disabled=false}}
window.addEventListener('gsc-account-ready',refresh);
$('refresh').onclick=()=>refresh();
// Prepare only a device identity, never create a tournament or round.
await fetch('/api/personal-events',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'identity'})});await refresh();


const automaticDirectory=window.GSCDirectoryAutoRefresh.create({refresh:signal=>refresh({automatic:true,signal}),onState:state=>{const label=$('directorySync');if(label)label.textContent=state.ok&&!state.partial?'TORNEOS ACTUALIZADOS · '+new Date(state.lastUpdated).toLocaleTimeString('es-GT',{timeZone:'America/Guatemala'}):'REINTENTO AUTOMÁTICO · CONSERVANDO LA LISTA'}});automaticDirectory.start({immediate:false});
