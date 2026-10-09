const $=id=>document.getElementById(id),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(document.cookie.split(";").some(value=>value.trim()==="gsc_guest_mode=1")){
  document.getElementById("status")&&(document.getElementById("status").textContent="ORGANIZADOR NO DISPONIBLE PARA INVITADOS 48H · COMPARTIR LIVE SÍ PERMANECE ACTIVO");
  throw new Error("GUEST_48H_ADMIN_BLOCKED");
}
const messages={EVENT_ADMIN_REQUIRED:'NO TIENES PERMISO PARA ELIMINAR ESTE EVENTO',EVENT_NAME_CONFIRMATION_REQUIRED:'ESCRIBE EL NOMBRE EXACTO DEL EVENTO',EVENT_DELETE_REASON_REQUIRED:'ESCRIBE EL MOTIVO',ADMIN_RECIPIENT_REQUIRED:'INDICA EL NOMBRE Y CÓDIGO PERSONAL DE LA PERSONA',ADMIN_CODE_INVALID:'CÓDIGO INCORRECTO, USADO, VENCIDO O ASIGNADO A OTRA PERSONA',ACCOUNT_UNAUTHORIZED:'INICIA TU SESIÓN DE PROPIETARIO PARA TENER CONTROL PLENO',LIVE_EXPIRED:'EL EVENTO O PERMISO VENCIÓ',DATABASE_QUOTA_EXCEEDED:'BASE DE DATOS SIN CUOTA · NEON 402 · ACTUALIZA EL PLAN O LA CUOTA'};
async function call(action,payload={},signal){try{const response=await fetch('/api/event-administration',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload}),signal});return{...await response.json(),ok:response.ok}}catch{return{ok:false,code:'NETWORK_ERROR'}}}
function showStatus(result,id='status'){ $(id).textContent=result.ok?'LISTO':messages[result.code]||'NO SE PUDO COMPLETAR · '+result.code }
function eventStatus(button,text){button.closest('article').querySelector('[data-event-status]').textContent=text}
async function copyTournamentId(button,code){if(button.disabled)return;button.disabled=true;button.textContent='COPIANDO…';eventStatus(button,'');try{await navigator.clipboard.writeText(code);button.textContent='ID COPIADO ✓';eventStatus(button,'ID COPIADO')}catch{button.textContent='COPIAR ID';eventStatus(button,'NO SE PUDO COPIAR · REINTENTA')}finally{button.disabled=false}}
async function shareEvent(button,e){if(button.disabled)return;button.disabled=true;eventStatus(button,'PREPARANDO CÓDIGO…');try{const local=e.source===cachedLocal.source,result=e.joinCode?{ok:true,joinCode:e.joinCode}:local?await window.GSCPersonalEvents.request(e.event_kind==='private'?'share-code':'organizer-entry-code',{eventId:e.id,eventKind:e.event_kind}):await call('remote-share',{source:e.source,eventId:e.id,eventKind:e.event_kind});if(!result.ok){eventStatus(button,messages[result.code]||window.GSCPersonalEvents.message(result.code));return}const code=result.joinCode||result.code||'';if(!code){eventStatus(button,'EL SERVIDOR NO ENTREGÓ UN CÓDIGO');return}const opened=window.GSCWhatsAppInvitations.open({kind:e.event_kind,code,eventName:e.name,source:e.source},()=>{});eventStatus(button,opened===false?'CÓDIGO '+code+' · NO SE PUDO ABRIR WHATSAPP':'CÓDIGO '+code+' · LISTO PARA COMPARTIR')}catch{eventStatus(button,'NO SE PUDO PREPARAR EL CÓDIGO · REINTENTA')}finally{button.disabled=false}}
let requestedEventOpened=false;
const format=at=>new Date(at).toLocaleString('es-GT',{timeZone:'America/Guatemala'});
function administrationRows(local,directory){
 const rows=new Map(),source=local.source;
 for(const e of local.ok?local.events||[]:[]){const eventSource=e.source||source,kind=e.event_kind||'tournament';if(!['tournament','private'].includes(kind))continue;rows.set(eventSource+':'+kind+':'+e.id,{...e,event_kind:kind,source:eventSource,canAdminister:e.canAdminister!==false})};
 for(const e of directory.ok?directory.events||[]:[]){const kind=e.event_kind||'tournament';if(!['lab','production'].includes(e.source)||!['tournament','private'].includes(kind)||e.status!=='active')continue;const key=e.source+':'+kind+':'+e.id;if(!rows.has(key))rows.set(key,{...e,event_kind:kind,canAdminister:false});else rows.set(key,{...rows.get(key),joinCode:e.joinCode})}
 return [...rows.values()].sort((a,b)=>(a.event_kind==='tournament'?0:1)-(b.event_kind==='tournament'?0:1)||a.name.localeCompare(b.name,'es')||a.source.localeCompare(b.source)||a.id.localeCompare(b.id));
}
function scoresHref(e,monitor){const same=e.source===cachedLocal.source,base=same?'':e.source==='lab'?'https://golf-sc-gt-lab.vercel.app':'https://epg-caddy.vercel.app';return '/live-hub.html?directoryEvent='+encodeURIComponent('directory_'+(e.event_kind==='private'?'private_':'')+e.source+'_'+e.id)+'&monitor='+monitor}
function administrationCard(e){
 const authorized=e.canAdminister,key=escape(e.source+':'+e.event_kind+':'+e.id),kind=e.event_kind==='private'?'GRUPO':'TORNEO';
 const scores='<nav aria-label="SCORES '+escape(e.name)+'"><a href="'+escape(scoresHref(e,'general'))+'">SCORES · GENERAL</a><a href="'+escape(scoresHref(e,'categories'))+'">SCORES · CATEGORÍAS</a></nav>';
 const sharing=authorized||e.joinCode?'<button data-share-event="'+key+'">COMPARTIR CÓDIGO</button>':'<button disabled aria-label="Compartir requiere permiso de organizador">COMPARTIR · ORGANIZADOR</button>';
 const deleteLabel='ELIMINAR '+kind;
 const deleting='<button class="danger" data-delete="'+key+'">'+deleteLabel+'</button>';
 return '<article data-event-id="'+escape(e.id)+'" data-event-source="'+escape(e.source)+'"><h3>'+escape(e.name)+'</h3>'+scores+(e.joinCode?'<p>ID DE '+kind+'</p><output data-tournament-code>'+escape(e.joinCode)+'</output>':'')+sharing+'<p data-event-status="'+key+'" role="status" aria-live="polite"></p>'+deleting+'</article>';
}
function guestGroupTitle(group){
 const snapshot=group.current_snapshot||{},first=(snapshot.players||[]).map(player=>String(player?.name||'').trim()).filter(Boolean)[0];
 return first||'ACCESO COMPARTIDO 48H';
}
function liveModeLabel(value){return({general:'SCORE CARD',match_play:'MATCH PLAY',four_ball:'FOUR BALL',stableford:'STABLEFORD',universales:'UNIVERSALES'})[value]||'SCORE CARD'}
function guestRelation(value){const number=Number(value);if(!Number.isFinite(number))return'';return number===0?'E':number>0?'+'+number:String(number)}
function guestHoleMap(player){return new Map((player?.holes||[]).map(item=>[Number(item.hole),item]))}
function guestParMap(snapshot){const map=new Map((snapshot?.courseHoles||[]).map(item=>[Number(item.hole),item.par]));for(const player of snapshot?.players||[])for(const item of player.holes||[])if(item.par)map.set(Number(item.hole),item.par);return map}
function guestGrossMarkClass(item){if(!item||item.explicitX||!Number.isInteger(item.gross)||!Number.isInteger(item.par))return'';if(item.gross===1)return'ace';const diff=item.gross-item.par;if(diff===-1)return'birdie';if(diff===-2)return'eagle';if(diff<=-3)return'albatross';if(diff===1)return'bogey';if(diff===2)return'double-bogey';if(diff>=3)return'triple-bogey';return''}
function guestScoreCell(item,key){if(!item)return'';if(item.explicitX)return key==='gross'?'X':'—';const value=item[key];if(!Number.isInteger(value))return'';if(key==='gross'){const mark=guestGrossMarkClass(item);return mark?'<span class="gross-mark '+mark+'">'+escape(value)+'</span>':String(value)}return String(value)}
function guestCellClass(item,key){if(!item)return'';if(key==='relativeToPar'&&Number.isInteger(item.relativeToPar))return item.relativeToPar<0?'filled under':item.relativeToPar>0?'filled over':'filled';return Number.isInteger(item[key])||item.explicitX?'filled':''}
function guestTeeLabel(player){return player?.tournamentCategory==='championship'?'NEGRAS':String(player?.tee||'').toUpperCase()}
function guestPlayerLiveCard(player,snapshot,index=0){
 const holes=guestHoleMap(player),pars=guestParMap(snapshot),numbers=Array.from({length:18},(_,index)=>index+1),totals=player.totals||{},displayName=String(player?.name||'JUGADOR').toUpperCase();
 return '<section class="player-live"><div class="player-title"><strong data-score-player="'+escape(index)+'" tabindex="0" aria-label="'+escape(displayName)+' · Ver 18 scores">'+escape(displayName)+'</strong></div><div class="score-scroll"><table class="score-live"><thead><tr><th>HOYO</th>'+numbers.map(hole=>'<th>'+hole+'</th>').join('')+'</tr></thead><tbody><tr><td>PAR</td>'+numbers.map(hole=>'<td>'+escape(pars.get(hole)||'')+'</td>').join('')+'</tr><tr><td>GROSS</td>'+numbers.map(hole=>{const item=holes.get(hole);return '<td class="'+guestCellClass(item,'gross')+'">'+guestScoreCell(item,'gross')+'</td>'}).join('')+'</tr><tr class="net-row"><td>NETO</td>'+numbers.map(hole=>{const item=holes.get(hole);return '<td class="'+guestCellClass(item,'net')+'">'+guestScoreCell(item,'net')+'</td>'}).join('')+'</tr><tr><td>+/- POR<br>HOYO</td>'+numbers.map(hole=>{const item=holes.get(hole);return '<td class="'+guestCellClass(item,'relativeToPar')+'">'+(item&&!item.explicitX&&Number.isInteger(item.relativeToPar)?guestRelation(item.relativeToPar):'')+'</td>'}).join('')+'</tr></tbody></table></div><div class="player-total-title">RESULTADOS ACUMULADOS</div><div class="player-total"><div><small>HOYOS</small><b>'+escape(totals.holes??0)+' / 18</b></div><div><small>GROSS</small><b>'+escape(totals.gross??0)+'</b></div><div><small>NETO</small><b class="net-total">'+escape(totals.net??0)+'</b></div><div><small>+/- ACUMULADO</small><b class="'+(Number(totals.relativeToPar)<0?'under':Number(totals.relativeToPar)>0?'over':'')+'">'+guestRelation(totals.relativeToPar??0)+'</b></div></div></section>';
}
function guestGroupLiveCard(group){
 const snapshot=group.current_snapshot||{},players=Array.isArray(snapshot.players)?snapshot.players:[],date=snapshot.playedAt||group.updated_at||group.created_at;
 return '<article class="group-card guest-live-card" data-guest-live-card="'+escape(group.id)+'"><header class="group-head"><div><div class="group-meta">'+escape(snapshot.course||'CAMPO')+(snapshot.tournament?' · '+escape(snapshot.tournament):'')+' · '+escape(date?format(date):'—')+'</div></div><span class="group-badge">'+escape(liveModeLabel(snapshot.mode))+' · RONDA EN CURSO</span></header>'+players.map((player,index)=>guestPlayerLiveCard(player,snapshot,index)).join('')+'</article>';
}
function guestGroupCard(group){
 const canOpen=!!group.current_snapshot;
 return '<article data-guest-group="'+escape(group.id)+'" data-event-source="'+escape(group.source)+'"><h3>'+escape(guestGroupTitle(group))+'</h3><p>'+escape(String(group.source||'').toUpperCase())+' · 48H'+(group.expires_at?' · VENCE '+escape(format(group.expires_at)):'')+'</p>'+(canOpen?'<button type="button" data-guest-group-open="'+escape(group.id)+'">ABRIR TARJETA LIVE</button>':'<button type="button" disabled>SIN TARJETA LIVE AÚN</button>')+'</article>';
}
let refreshSequence=0,cachedLocal={ok:false},cachedDirectory={ok:false},cachedCodes={},lastRowsSignature='';
async function refresh({automatic=false,signal}={}){
 const sequence=++refreshSequence;if(!automatic)$('status').textContent='CARGANDO TORNEOS…';
 await window.GSCPersonalEvents.claimLegacyOwnedTournament();
 const [result,directory]=await Promise.all([call('list',{},signal),fetch('/api/tournament-score-directory',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list',withCodes:true,includeGroups:true}),signal}).then(async response=>({...await response.json(),ok:response.ok})).catch(()=>({ok:false,code:'NETWORK_ERROR'}))]);
 if(sequence!==refreshSequence||signal?.aborted)return{ok:false};
 const localChanged=result.ok&&JSON.stringify(result.events)!==JSON.stringify(cachedLocal.events);
 if(result.ok)cachedLocal=result;if(directory.ok&&!directory.partial)cachedDirectory=directory;
 else if(directory.ok)cachedDirectory=directory;
 if(result.ok&&(!automatic||localChanged)){await window.GSCPersonalEvents.sync();cachedCodes=await window.GSCPersonalEvents.organizerCodes()||{}}if(sequence!==refreshSequence||signal?.aborted)return{ok:false};
 const codes=cachedCodes,rows=administrationRows(cachedLocal,cachedDirectory),guestGroups=result.ok?result.guestGroups||[]:cachedLocal.guestGroups||[];showStatus(result.ok?result:directory);
 if(!result.ok&&cachedLocal.ok)$('status').textContent='SIN CONEXIÓN · CONSERVANDO LA ÚLTIMA LISTA';
 const signature=JSON.stringify([rows,guestGroups,codes]);
 if(automatic&&(signature===lastRowsSignature||document.querySelector('dialog[open],#gscWhatsAppInvitation,[data-gsc-dialog-backdrop]')))return{ok:directory.ok,partial:directory.partial};
 lastRowsSignature=signature;
 if(!directory.ok||directory.partial)$('status').textContent+=' · LISTA GLOBAL INCOMPLETA · REINTENTO AUTOMÁTICO';else $('status').textContent='LISTA GLOBAL COMPLETA · LABORATORIO + PRODUCCIÓN';
 $('events').innerHTML='<h2>TORNEOS Y RONDAS</h2>'+rows.map(e=>administrationCard(e)).join('')+'<h2>GRUPOS INVITADOS 48H</h2>'+guestGroups.map(guestGroupCard).join('');
 if(!rows.length)$('events').insertAdjacentHTML('beforeend','<p>'+(!directory.ok||directory.partial||!result.ok?'NO SE PUDO COMPROBAR LA LISTA COMPLETA · REINTENTA':'NO HAY TORNEOS NI RONDAS ACTIVAS DISPONIBLES PARA TU CUENTA.')+'</p>');
 if(!guestGroups.length)$('events').insertAdjacentHTML('beforeend','<p>AÚN NO HAY GRUPOS 48H CON JUGADORES REGISTRADOS.</p>');
 document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>remove(rows.find(e=>e.source+':'+e.event_kind+':'+e.id===b.dataset.delete)));
 document.querySelectorAll('[data-copy-tournament]').forEach(b=>b.onclick=()=>copyTournamentId(b,codes[b.dataset.copyTournament]));
 document.querySelectorAll('[data-share-event]').forEach(b=>b.onclick=()=>shareEvent(b,rows.find(e=>(e.canAdminister||e.joinCode)&&e.source+':'+e.event_kind+':'+e.id===b.dataset.shareEvent)));
 document.querySelectorAll('[data-guest-group-open]').forEach(b=>b.onclick=()=>openGuestGroupLive(guestGroups.find(group=>String(group.id)===String(b.dataset.guestGroupOpen))));
 const params=new URLSearchParams(location.search),requested=rows.find(e=>e.canAdminister&&e.id===params.get('eventId')&&e.event_kind===params.get('eventKind'));if(requested&&!requestedEventOpened&&!automatic){requestedEventOpened=true;remove(requested)}
 return{ok:directory.ok,partial:directory.partial};
}
function event(e){return{eventId:e.id,eventKind:e.event_kind}}
function preserveReturnTarget(){const link=document.querySelector('[data-gsc-close]'),target=new URLSearchParams(location.search).get('returnTo');if(!link||!target)return;try{const destination=new URL(target,location.origin);if(destination.origin===location.origin&&destination.pathname==='/index-grupal.html')link.href=destination.pathname+destination.search+destination.hash}catch{}}
preserveReturnTarget();
function open(content){$('action').innerHTML=content;$('actionStatus').textContent='';$('actionDialog').showModal()}
function openGuestGroupLive(group){if(!group)return;open('<h2>TARJETA LIVE · INVITADO 48H</h2>'+guestGroupLiveCard(group))}
function remove(e){if(!e)return;const label='ELIMINAR '+(e.event_kind==='private'?'GRUPO':'TORNEO');open('<h2>'+(e.event_kind==='tournament'?'CONFIRMA ELIMINAR':'CONFIRMAR '+label)+'</h2><p>'+escape(e.name)+'</p><p>¿DESEAS ELIMINAR ESTE '+(e.event_kind==='private'?'GRUPO':'TORNEO')+'?</p><button type="button" id="cancelDelete">CANCELAR</button><button class="danger" id="confirmDelete">'+label+'</button>');$('cancelDelete').onclick=()=>$('actionDialog').close();$('confirmDelete').onclick=async()=>{const b=$('confirmDelete');b.disabled=true;const local=e.source===cachedLocal.source,result=await call(local?'delete':'remote-delete',{...event(e),...(local?{}:{source:e.source}),confirmName:e.name,reason:'Eliminación confirmada por el usuario'});showStatus(result,'actionStatus');if(result.ok){cachedLocal.events=(cachedLocal.events||[]).filter(row=>row.id!==e.id||row.source&&row.source!==e.source);cachedDirectory.events=(cachedDirectory.events||[]).filter(row=>row.id!==e.id||row.source!==e.source);cachedDirectory.groups=(cachedDirectory.groups||[]).filter(row=>row.tournament_id!==e.id||row.source!==e.source);if(local)window.GSCPersonalEvents?.purgeDeletedEvents?.([{eventId:e.id,eventKind:e.event_kind}]);$('actionDialog').close();await refresh()}else b.disabled=false}}
window.addEventListener('gsc-account-ready',refresh);
$('refresh').onclick=()=>refresh();
// Prepare only a device identity, never create a tournament or round.
await fetch('/api/personal-events',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'identity'})});await refresh();


const automaticDirectory=window.GSCDirectoryAutoRefresh.create({refresh:signal=>refresh({automatic:true,signal}),onState:state=>{const label=$('directorySync');if(label)label.textContent=state.ok&&!state.partial?'TORNEOS ACTUALIZADOS · '+new Date(state.lastUpdated).toLocaleTimeString('es-GT',{timeZone:'America/Guatemala'}):'REINTENTO AUTOMÁTICO · CONSERVANDO LA LISTA'}});automaticDirectory.start({immediate:false});
