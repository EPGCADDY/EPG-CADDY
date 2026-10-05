const $=id=>document.getElementById(id),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const messages={EVENT_ADMIN_REQUIRED:'NO TIENES PERMISO PARA ELIMINAR ESTE EVENTO',EVENT_NAME_CONFIRMATION_REQUIRED:'ESCRIBE EL NOMBRE EXACTO DEL EVENTO',EVENT_DELETE_REASON_REQUIRED:'ESCRIBE EL MOTIVO',ADMIN_RECIPIENT_REQUIRED:'INDICA EL NOMBRE Y CÓDIGO PERSONAL DE LA PERSONA',ADMIN_CODE_INVALID:'CÓDIGO INCORRECTO, USADO, VENCIDO O ASIGNADO A OTRA PERSONA',ACCOUNT_UNAUTHORIZED:'INICIA TU SESIÓN DE PROPIETARIO PARA TENER CONTROL PLENO',LIVE_EXPIRED:'EL EVENTO O PERMISO VENCIÓ'};
async function call(action,payload={},signal){try{const response=await fetch('/api/event-administration',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload}),signal});return{...await response.json(),ok:response.ok}}catch{return{ok:false,code:'NETWORK_ERROR'}}}
function showStatus(result,id='status'){ $(id).textContent=result.ok?'LISTO':messages[result.code]||'NO SE PUDO COMPLETAR · '+result.code }
function eventStatus(button,text){button.closest('article').querySelector('[data-event-status]').textContent=text}
async function copyTournamentId(button,code){if(button.disabled)return;button.disabled=true;button.textContent='COPIANDO…';eventStatus(button,'');try{await navigator.clipboard.writeText(code);button.textContent='ID COPIADO ✓';eventStatus(button,'ID COPIADO')}catch{button.textContent='COPIAR ID';eventStatus(button,'NO SE PUDO COPIAR · REINTENTA')}finally{button.disabled=false}}
async function shareTournament(button,e){if(button.disabled)return;button.disabled=true;eventStatus(button,'ABRIENDO WHATSAPP…');try{const grant=await window.GSCPersonalEvents.request('organizer-entry-code',{eventId:e.id,eventKind:'tournament'});if(!grant.ok){eventStatus(button,messages[grant.code]||window.GSCPersonalEvents.message(grant.code));return}const opened=window.GSCWhatsAppInvitations.open({kind:'tournament',code:grant.joinCode,eventName:e.name},()=>{});eventStatus(button,opened===false?'NO SE PUDO ABRIR WHATSAPP · REINTENTA':'')}catch{eventStatus(button,'NO SE PUDO ABRIR WHATSAPP · REINTENTA')}finally{button.disabled=false}}
let requestedEventOpened=false;
const format=at=>new Date(at).toLocaleString('es-GT',{timeZone:'America/Guatemala'});
function administrationRows(local,directory){
 const rows=new Map(),source=local.source;
 for(const e of local.ok?local.events||[]:[])rows.set(source+':'+e.event_kind+':'+e.id,{...e,source,canAdminister:true});
 for(const e of directory.ok?directory.events||[]:[]){if(!['lab','production'].includes(e.source)||e.status!=='active')continue;const key=e.source+':tournament:'+e.id;if(!rows.has(key))rows.set(key,{...e,event_kind:'tournament',canAdminister:false})}
 return [...rows.values()].sort((a,b)=>a.name.localeCompare(b.name,'es')||a.source.localeCompare(b.source)||a.id.localeCompare(b.id));
}
function administrationCard(e,codes){
 const authorized=e.canAdminister,code=authorized&&e.event_kind==='tournament'?codes[e.id]:'';
 const scores=e.event_kind==='tournament'?'<a href="/live-hub.html?directoryEvent='+encodeURIComponent('directory_'+e.source+'_'+e.id)+'">VER SCORES</a>':'';
 return '<article data-event-id="'+escape(e.id)+'" data-event-source="'+escape(e.source)+'"><h3>'+escape(e.name)+'</h3><p>'+escape(e.event_kind==='private'?'GRUPO':'TORNEO')+'</p>'+scores+(code?'<p>ID DE TORNEO · UN SOLO USO</p><output>'+escape(code)+'</output><button data-copy-tournament="'+escape(e.id)+'">COPIAR ID</button><button data-share-tournament="'+escape(e.id)+'">COMPARTIR POR WHATSAPP</button>':'')+'<p data-event-status="'+escape(e.id)+'" role="status" aria-live="polite"></p>'+(authorized?'<button class="danger" data-delete="'+escape(e.id)+'">ELIMINAR</button>':'')+'</article>';
}
let refreshSequence=0,cachedLocal={ok:false},cachedDirectory={ok:false},cachedCodes={},lastRowsSignature='';
async function refresh({automatic=false,signal}={}){
 const sequence=++refreshSequence;if(!automatic)$('status').textContent='CARGANDO TORNEOS Y GRUPOS…';
 const [result,directory]=await Promise.all([call('list',{},signal),fetch('/api/tournament-score-directory',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list'}),signal}).then(async response=>({...await response.json(),ok:response.ok})).catch(()=>({ok:false,code:'NETWORK_ERROR'}))]);
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
 if(!directory.ok||directory.partial)$('status').textContent+=' · LISTA GLOBAL INCOMPLETA · REINTENTA';
 $('events').innerHTML='<h2>TORNEOS Y GRUPOS</h2>'+rows.map(e=>administrationCard(e,codes)).join('');
 if(!rows.length)$('events').insertAdjacentHTML('beforeend','<p>'+(!directory.ok||directory.partial||!result.ok?'NO SE PUDO COMPROBAR LA LISTA COMPLETA · REINTENTA':'NO HAY TORNEOS ACTIVOS NI GRUPOS DISPONIBLES PARA TU CUENTA.')+'</p>');
 document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>remove(rows.find(e=>e.canAdminister&&e.id===b.dataset.delete)));
 document.querySelectorAll('[data-copy-tournament]').forEach(b=>b.onclick=()=>copyTournamentId(b,codes[b.dataset.copyTournament]));
 document.querySelectorAll('[data-share-tournament]').forEach(b=>b.onclick=()=>shareTournament(b,rows.find(e=>e.canAdminister&&e.id===b.dataset.shareTournament)));
 const params=new URLSearchParams(location.search),requested=rows.find(e=>e.canAdminister&&e.id===params.get('eventId')&&e.event_kind===params.get('eventKind'));if(requested&&!requestedEventOpened&&!automatic){requestedEventOpened=true;remove(requested)}
 return{ok:result.ok&&directory.ok,partial:directory.partial};
}
function event(e){return{eventId:e.id,eventKind:e.event_kind}}
function preserveReturnTarget(){const link=document.querySelector('[data-gsc-close]'),target=new URLSearchParams(location.search).get('returnTo');if(!link||!target)return;try{const destination=new URL(target,location.origin);if(destination.origin===location.origin&&destination.pathname==='/index-grupal.html')link.href=destination.pathname+destination.search+destination.hash}catch{}}
preserveReturnTarget();
function open(content){$('action').innerHTML=content;$('actionStatus').textContent='';$('actionDialog').showModal()}
function remove(e){open('<h2>CONFIRMAR ELIMINAR</h2><p>'+escape(e.name)+'</p><button class="danger" id="confirmDelete">ELIMINAR</button>');$('confirmDelete').onclick=async()=>{const b=$('confirmDelete');b.disabled=true;const result=await call('delete',{...event(e),confirmName:e.name,reason:'Eliminación confirmada por el usuario'});showStatus(result,'actionStatus');if(result.ok){$('actionDialog').close();await refresh()}else b.disabled=false}}
window.addEventListener('gsc-account-ready',refresh);
$('refresh').onclick=()=>refresh();
// Prepare only a device identity, never create a tournament or round.
await fetch('/api/personal-events',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'identity'})});await refresh();


const automaticDirectory=window.GSCDirectoryAutoRefresh.create({refresh:signal=>refresh({automatic:true,signal}),onState:state=>{const label=$('directorySync');if(label)label.textContent=state.ok&&!state.partial?'TORNEOS ACTUALIZADOS · '+new Date(state.lastUpdated).toLocaleTimeString('es-GT',{timeZone:'America/Guatemala'}):'REINTENTO AUTOMÁTICO · CONSERVANDO LA LISTA'}});automaticDirectory.start({immediate:false});
