(function(root){
  "use strict";
  const KEY="golf-score-card-gt-private-round-v1",ACTIVE="golf-score-card-guatemala-active-round-v1";
  const escape=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let round=null,timer=null,dialog=null;
  const read=key=>{try{return JSON.parse(root.localStorage.getItem(key)||"null")}catch{return null}};
  const active=()=>round||read(ACTIVE);
  const request=(action,body)=>root.GSCLiveControl.request(action,body);
  const saved=()=>read(KEY);
  function store(value){root.localStorage.setItem(KEY,JSON.stringify(value))}
  function close(){root.GSCOneUseLive?.close();root.GSCScoresUI?.close();clearTimeout(timer);timer=null;dialog?.remove();dialog=null}
  function show(title,content){
    close();dialog=root.document.createElement("div");dialog.setAttribute("data-gsc-dialog-backdrop","");dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");dialog.setAttribute("aria-label",title);
    dialog.style.cssText="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.84);display:grid;place-items:center;padding:18px";
    dialog.innerHTML='<section data-gsc-dialog-card style="box-sizing:border-box;width:min(520px,100%);max-height:90dvh;overflow:auto;padding:20px;border:1px solid #31ff00;border-radius:18px;background:#050505;color:white;font-family:Arial,sans-serif"><button data-close style="float:right;background:#080808;color:white;border:1px solid #444;border-radius:50%;width:38px;height:38px;font-size:22px" aria-label="Cerrar">×</button><h2 style="color:#31ff00;font-size:22px">'+escape(title)+'</h2>'+content+'<p data-status role="status" aria-live="polite"></p></section>';
    root.document.body.appendChild(dialog);dialog.querySelector('[data-close]').onclick=close;
  }
  const input=(label,id)=>'<label for="'+id+'">'+escape(label)+'</label><input id="'+id+'" maxlength="120" style="box-sizing:border-box;width:100%;height:50px;margin:10px 0;border:1px solid #31ff00;border-radius:11px;background:#030303;color:white;padding:0 12px;font-size:16px">';
  const button=(label,id)=>'<button id="'+id+'" style="width:100%;min-height:50px;margin-top:10px;border:1px solid #31ff00;border-radius:11px;background:#31ff00;color:black;font-size:16px;font-weight:900">'+label+'</button>';
  function status(message){if(dialog)dialog.querySelector('[data-status]').textContent=message}
  function error(code){return({PRIVATE_ROUND_CODE_INVALID:"CÓDIGO INCORRECTO PARA ESTE GRUPO",LIVE_ROUND_REQUIRED:"INICIA TU SCORE CARD PARA AGREGAR TU GRUPO",LIVE_TOURNAMENT_MODE_MISMATCH:"TU SCORE CARD USA OTRA MODALIDAD",NETWORK_ERROR:"SIN CONEXIÓN · INTENTA DE NUEVO",LIVE_EXPIRED:"ESTE GRUPO YA CADUCÓ",LIVE_RATE_LIMITED:"ESPERA UN MINUTO E INTENTA DE NUEVO"})[code]||"NO SE PUDO COMPLETAR LA ACCIÓN · INTENTA DE NUEVO"}
  async function connect(item,code){const result=await root.GSCLiveControl.connectPrivateRound(item.id,code,active());if(!result.ok){status(error(result.code));return false}store({...item,name:result.name,viewerToken:result.viewerToken,joinCode:code,roundId:active().id});await scores(saved());return true}
  async function create(){
    const name=dialog.querySelector('#privateName').value.trim();if(!name){status("ESCRIBE EL NOMBRE DEL GRUPO");return}
    const ok=dialog.querySelector('#privateCreate');ok.disabled=true;status("CREANDO MI GRUPO…");
    const result=await request("create_private_round",{name,mode:active()?.mode||"general",durationDays:8,consent:{confirmed:true}});
    if(!result.ok){ok.disabled=false;status(error(result.code));return}
    const item={id:result.privateRoundId,name:result.name,viewerToken:result.viewerToken,joinCode:result.joinCode,creator:true,roundId:active()?.configured?active().id:"",expiresAt:result.expiresAt};store(item);
    if(active()?.configured){const joined=await root.GSCLiveControl.connectPrivateRound(item.id,item.joinCode,active());if(!joined.ok){await scores(item,true);status(error(joined.code));return}}
    await scores(item,true);
  }
  async function scores(item,showCode=false){
    show("SCORES MI GRUPO",(item.creator&&showCode?'<p>CÓDIGO PARA COMPARTIR</p><strong style="color:#31ff00;font-size:24px">'+escape(item.joinCode)+'</strong>'+button("COMPARTIR CÓDIGO","privateShare"):"")+'<div data-scores></div>');
    dialog.querySelector('section').classList.add('private-score-panel');
    const heading=(snapshot={})=>'<header class="group-scores-heading"><h2>SCORES MI GRUPO</h2><p>'+escape([snapshot.course||active()?.course||active()?.courseName,root.GSCScoresUI?.date(snapshot.playedAt||active()?.playedAt||active()?.startedAt)].filter(Boolean).join(' · '))+'</p></header>';
    dialog.querySelector('h2').outerHTML=heading();
    const help=root.document.createElement('p');help.className='group-scores-help';help.textContent='DOBLE TOQUE EN EL JUGADOR: VER 18 SCORES';dialog.querySelector('section').appendChild(help);
    if(item.creator&&showCode)dialog.querySelector('#privateShare').onclick=async()=>{const message="Ronda "+item.name+"\n"+item.joinCode;try{if(root.navigator.share){await root.navigator.share({title:item.name,text:message});close()}else{await root.navigator.clipboard.writeText(message);status("CÓDIGO COPIADO")}}catch(e){if(e.name!=="AbortError")status("CÓDIGO: "+item.joinCode)}};
    const current=dialog;
    async function refresh(){
      if(dialog!==current)return;let result=item.personal?await root.GSCPersonalEvents.request("read",{eventId:item.id,eventKind:"private"}):await request("read_private_round",{kind:"tournament",viewerToken:item.viewerToken,limit:50});
      if(dialog!==current)return;
      if(!result.ok){if(["LIVE_REVOKED","LIVE_EXPIRED"].includes(result.code)){root.localStorage.removeItem(KEY);show("SCORES MI GRUPO","<p>NO PERTENECES A NINGÚN GRUPO</p>");return}status(item.personal?root.GSCPersonalEvents.message(result.code):error(result.code));return}
      const streams=[...(result.streams||[])],seen=new Set();let cursor=result.nextCursor;
      while(cursor&&!seen.has(cursor)){seen.add(cursor);const page=await request("read_private_round",{kind:"tournament",viewerToken:item.viewerToken,limit:50,cursor});if(!page.ok){status(error(page.code));return}streams.push(...(page.streams||[]));cursor=page.nextCursor}
      if(dialog!==current)return;
      const snap=streams.find(stream=>stream.snapshot)?.snapshot||{};
      current.querySelector('.group-scores-heading').outerHTML=heading({...snap,course:result.tournament?.configuration?.course||snap.course,playedAt:result.tournament?.configuration?.playedAt||snap.playedAt});
      const rows=streams.flatMap(stream=>(stream.snapshot?.players||[]).map(player=>({player,snapshot:stream.snapshot,eventName:item.name,group:stream.groupLabel||stream.snapshot.groupLabel})));
      current.querySelector('[data-scores]').innerHTML=rows.length?'<table class="private-score-table"><thead><tr><th>NOMBRE</th><th>HDCP</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/−</th></tr></thead><tbody>'+rows.map(({player,group},index)=>'<tr data-score-player="'+index+'" tabindex="0" aria-label="'+escape(player.name)+' · Ver 18 scores"><td>'+escape(player.name)+'</td><td>'+escape(player.handicap)+'</td><td>'+escape(player.holes?.length?Math.max(...player.holes.map(h=>h.hole)):"—")+'</td><td>'+escape(player.holes?.length?(player.totals?.gross??"—"):"—")+'</td><td>'+escape(player.holes?.length?(player.totals?.net??"—"):"—")+'</td><td class="'+(player.totals?.relativeToPar<0?'private-score-under':player.totals?.relativeToPar>0?'private-score-over':'')+'">'+escape(player.holes?.length&&Number.isFinite(player.totals?.relativeToPar)?(player.totals.relativeToPar===0?'EVEN':(player.totals.relativeToPar>0?'+':'')+player.totals.relativeToPar):'—')+'</td></tr>').join("")+'</tbody></table>':'<p>TODAVÍA NO HAY JUGADORES EN MI GRUPO.</p>';
      if(root.GSCScoresUI)root.GSCScoresUI.bindRows(current.querySelector('[data-scores]'),rows);
      status("");timer=root.setTimeout(refresh,10000);
    }
    await refresh();
  }
  function open(value){round=value||read(ACTIVE);const item=saved();if(item&&new Date(item.expiresAt||"2099-01-01")>new Date()&&item.roundId===round?.id)return scores(item,true);show("GRUPO PARTICULAR",input("NOMBRE DEL GRUPO","privateName")+button("CREAR MI GRUPO","privateCreate"));dialog.querySelector('#privateCreate').onclick=create;dialog.querySelector('#privateName').focus()}
  function openCreate(value){round=value||read(ACTIVE);show("CREAR MI GRUPO",input("NOMBRE DEL GRUPO","privateName")+button("CREAR MI GRUPO","privateCreate"));dialog.querySelector('#privateCreate').onclick=create;dialog.querySelector('#privateName').focus()}
  function openGroupScores(value){
    round=value||read(ACTIVE);const selection=read('gsc-tournament-connect-selection-v1');
    if(selection?.personal&&selection.eventKind==='private'&&selection.roundId===round?.id)return scores({id:selection.id,name:selection.label,personal:true});
    return openScores(round);
  }
  async function leaveGroup(value){
    round=value||read(ACTIVE);const selection=read('gsc-tournament-connect-selection-v1'),item=saved(),personal=selection?.personal&&selection.eventKind==='private'&&selection.roundId===round?.id;
    if(!personal&&(!item||item.roundId!==round?.id)){show('SALIR DEL GRUPO','<p>NO PERTENECES A NINGÚN GRUPO</p>');return{ok:true,left:false}}
    show('SALIR DEL GRUPO','<p>SALIENDO…</p>');
    if(personal){const result=await root.GSCPersonalEvents.request('leave',{eventId:selection.id,eventKind:'private'});if(!result.ok){status(root.GSCPersonalEvents.message(result.code));return result}}
    const disconnected=await root.GSCLiveControl.disconnectPrivateRound(round,personal);if(!disconnected.ok){status(error(disconnected.code));return disconnected}
    if(personal)root.localStorage.removeItem('gsc-tournament-connect-selection-v1');if(item?.roundId===round?.id)root.localStorage.removeItem(KEY);
    if(personal&&round.personalEventId===selection.id){delete round.personalEventId;delete round.liveGroupLabel;round.tournament={name:''}}
    if(root.location?.href){const url=new URL(root.location.href);if(url.searchParams.get('personalKind')==='private'){url.searchParams.delete('personalEvent');url.searchParams.delete('personalKind');root.history?.replaceState(null,'',url.toString())}}
    root.GSCPrivateGroupLeft?.(round);if(personal)await root.GSCPersonalEvents.sync();show('SALIR DEL GRUPO','<p>HAS SALIDO DEL GRUPO · TUS SCORES SE CONSERVAN EN TU SCORE CARD</p>');return disconnected;
  }
  function openScores(value){round=value||read(ACTIVE);const item=saved();if(item&&new Date(item.expiresAt||"2099-01-01")>new Date()&&item.roundId===round?.id)return scores(item);show("SCORES MI GRUPO","<p>NO PERTENECES A NINGÚN GRUPO</p>")}
  async function list(title="GRUPOS PARTICULARES"){
    round=read(ACTIVE);show(title,'<div data-rounds></div>');status("CARGANDO GRUPOS…");const current=dialog;async function refresh(){if(dialog!==current)return;const legacy=await request("list_private_rounds",{}),personal=await root.GSCPersonalEvents?.sync();if(dialog!==current)return;if(!legacy.ok&&!personal?.ok){status(error(legacy.code));return}const rounds=new Map((legacy.rounds||[]).map(item=>[item.id,item]));for(const item of personal?.privateItems||[])rounds.set(item.event.eventId,{...item.event,id:item.event.eventId,name:item.label});const authorities=await root.GSCPersonalEvents?.administrationEvents?.()||[];if(dialog!==current)return;const result={rounds:[...rounds.values()]}
    const target=dialog.querySelector('[data-rounds]');target.innerHTML=result.rounds.length?result.rounds.map(item=>button(escape(item.name),"private-"+item.id)+(authorities.some(event=>event.id===item.id&&event.event_kind==='private')?button("ELIMINAR GRUPO","delete-private-"+item.id):"")).join(""):'<p>NO HAY GRUPOS PARTICULARES DISPONIBLES.</p>';status("");
    for(const item of result.rounds){const remove=target.querySelector("#delete-private-"+item.id);if(remove)remove.onclick=()=>root.GSCPersonalEvents.openAdministration({eventId:item.id,eventKind:"private"})}
    for(const item of result.rounds)target.querySelector('#private-'+item.id).onclick=()=>{const personal=root.GSCPersonalEvents?.descriptor('personal_'+item.id);if(personal){close();root.location.assign('/live-hub.html?personalEvent='+encodeURIComponent(item.id)+'&personalKind=private');return}show(item.name,input("CÓDIGO DEL GRUPO","privateCode")+button("ENTRAR AL GRUPO","privateJoin"));const field=dialog.querySelector('#privateCode');field.maxLength=10;field.autocomplete="off";dialog.querySelector('#privateJoin').onclick=async()=>{const b=dialog.querySelector('#privateJoin');b.disabled=true;try{await connect(item,field.value.trim().toUpperCase())}finally{if(b.isConnected)b.disabled=false}};field.focus()};timer=root.setTimeout(refresh,10000);}
    await refresh();
  }
  let connecting=false;
  async function syncPending(value){const item=saved();if(connecting||!item?.creator||item.roundId||!value?.configured)return;connecting=true;try{const result=await root.GSCLiveControl.connectPrivateRound(item.id,item.joinCode,value);if(result.ok)store({...item,roundId:value.id})}finally{connecting=false}}
  root.GSCPrivateRounds={open,openCreate,openScores,openGroupScores,leaveGroup,list,close,syncPending};
})(globalThis);
