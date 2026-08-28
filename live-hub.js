(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root&&root.document)api.start()})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const STORAGE_KEY="golf-score-card-gt-live-hub-v1",POLL_MS=3000,TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
  let state={version:1,generalToken:"",follows:[]},general=null,generalRevision=null,generalStreams=new Map(),externalStreams=new Map(),pendingImportToken="",timer=null,loading=false;
  const $=id=>root&&root.document?root.document.getElementById(id):null;
  const text=(value,max=120)=>String(value==null?"":value).trim().replace(/\s+/g," ").slice(0,max);
  const escapeHtml=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const fold=value=>text(value,160).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
  const relation=value=>{const number=Number(value);return Number.isFinite(number)?number===0?"E":number>0?"+"+number:String(number):"—"};
  const tokenOk=value=>TOKEN_PATTERN.test(String(value||""));

  function parseHubHash(value){
    const params=new URLSearchParams(String(value||"").replace(/^#/,""));
    for(const kind of ["general","stream"]){const token=String(params.get(kind)||"");if(tokenOk(token))return{kind,token}}
    return null;
  }
  function parseShareLink(value,origin){
    try{
      const url=new URL(text(value,1200));
      if(!/^https?:$/.test(url.protocol)||url.origin!==origin||!url.pathname.endsWith("/live.html"))return null;
      const access=String(url.hash||"").replace(/^#/,""),params=new URLSearchParams(access);
      for(const kind of ["tournament","stream"]){const token=String(params.get(kind)||"");if(tokenOk(token))return{kind:kind==="tournament"?"general":"stream",token}}
    }catch{}
    return null;
  }
  function generalShareUrl(token){if(!tokenOk(token))return"";const url=new URL("/live.html",root.location.origin),share=new URL(root.location.href).searchParams.get("_vercel_share");if(share)url.searchParams.set("_vercel_share",share);url.hash="tournament="+encodeURIComponent(token);return url.toString()}
  function normalizeFollow(value){
    const token=tokenOk(value&&value.token)?String(value.token):"",streamId=text(value&&value.streamId,80),playerId=text(value&&value.playerId,80),kind=value&&value.kind==="group"?"group":"player";
    if(!streamId&&!token)return null;
    return{key:text(value&&value.key,180)||streamId+":"+(playerId||"group"),kind,token,streamId,playerId,label:text(value&&value.label,80)||"JUGADOR",groupLabel:text(value&&value.groupLabel,120)||"GRUPO"};
  }
  function normalizeHubState(value){
    const follows=[],keys=new Set();
    for(const raw of Array.isArray(value&&value.follows)?value.follows:[]){const item=normalizeFollow(raw);if(item&&!keys.has(item.key)){keys.add(item.key);follows.push(item)}}
    return{version:1,generalToken:tokenOk(value&&value.generalToken)?String(value.generalToken):"",follows};
  }
  function addFollowToState(current,value){
    const next=normalizeHubState(current),item=normalizeFollow(value);if(!item)return next;
    next.follows=next.follows.filter(existing=>existing.key!==item.key);next.follows.push(item);return next;
  }
  function removeFollowFromState(current,key){const next=normalizeHubState(current);next.follows=next.follows.filter(item=>item.key!==key);return next}
  function loadState(){try{return normalizeHubState(JSON.parse(root.localStorage.getItem(STORAGE_KEY)||"null"))}catch{return normalizeHubState(null)}}
  function saveState(){try{root.localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch{return false}}

  function tournamentPlayers(streams){
    const values=streams instanceof Map?[...streams.values()]:Array.isArray(streams)?streams:[];
    const players=[];
    for(const stream of values){const snapshot=stream&&stream.snapshot;if(!snapshot)continue;for(const player of snapshot.players||[]){const totals=player.totals||{};players.push({streamId:stream.id,playerId:player.id,name:player.name,groupLabel:stream.groupLabel||snapshot.groupLabel||"GRUPO",course:snapshot.course||"CAMPO",mode:snapshot.mode||"general",status:snapshot.status||"active",holes:Number(totals.holes)||0,gross:Number(totals.gross)||0,net:Number(totals.net)||0,relativeToPar:Number(totals.relativeToPar)||0,player,snapshot})}}
    return players;
  }
  function buildLeaderboard(streams){
    const players=tournamentPlayers(streams).sort((left,right)=>left.relativeToPar-right.relativeToPar||right.holes-left.holes||fold(left.name).localeCompare(fold(right.name)));
    let previous=null,rank=0;return players.map((item,index)=>{if(previous===null||item.relativeToPar!==previous)rank=index+1;previous=item.relativeToPar;return{...item,rank}})
  }
  function generalStreamMap(streams){return streams instanceof Map?streams:new Map((streams||[]).map(stream=>[stream.id,stream]))}
  function unresolvedFollowTokens(current,streams){
    const map=generalStreamMap(streams),tokens=new Set();
    for(const item of normalizeHubState(current).follows)if(!map.has(item.streamId)&&tokenOk(item.token))tokens.add(item.token);
    return[...tokens];
  }
  function resolveFollows(current,streams,external){
    const map=generalStreamMap(streams),externalMap=external instanceof Map?external:new Map();
    return normalizeHubState(current).follows.map(item=>{const stream=map.get(item.streamId)||externalMap.get(item.token)||null;if(!stream||!stream.snapshot)return{item,stream:null,players:[]};const players=item.kind==="group"?(stream.snapshot.players||[]):[(stream.snapshot.players||[]).find(player=>player.id===item.playerId)].filter(Boolean);return{item,stream,players}})
  }

  function setStatus(message,tone){
    const target=$("hubState");if(!target)return;target.textContent=message;target.className="state"+(tone?" "+tone:"");
  }
  async function read(kind,token,payload){
    let response;try{response=await root.fetch("/api/live",{method:"POST",headers:{"Content-Type":"application/json"},cache:"no-store",credentials:"same-origin",body:JSON.stringify(Object.assign({action:"read",kind:kind,viewerToken:token},payload||{}))})}catch{return{ok:false,code:"NETWORK_ERROR"}}
    const body=await response.json().catch(()=>({ok:false,code:"HTTP_"+response.status}));return Object.assign({},body,{ok:response.ok&&body&&body.ok!==false,status:response.status});
  }
  function errorMessage(code){return({NETWORK_ERROR:"SIN SEÑAL · CONSERVANDO LA ÚLTIMA VISTA",LIVE_LINK_INVALID:"ENLACE LIVE INVÁLIDO",LIVE_REVOKED:"UN ENLACE FUE REVOCADO",LIVE_EXPIRED:"UN ENLACE LIVE CADUCÓ",LIVE_RATE_LIMITED:"DEMASIADAS CONSULTAS · REINTENTANDO"})[String(code||"")]||"NO SE PUDO ACTUALIZAR CENTRO LIVE"}

  async function loadGeneral(){
    if(!tokenOk(state.generalToken))return{ok:true,empty:true};
    let result=await read("tournament",state.generalToken,{sinceRevision:generalRevision,limit:50});
    if(!result.ok||result.unchanged)return result;
    general=result.tournament||general;generalRevision=Number(result.tournament&&result.tournament.revision||result.revision)||0;const next=new Map();
    for(const stream of result.streams||[])next.set(stream.id,stream);
    let cursor=result.nextCursor||null;const seenCursors=new Set();
    while(cursor&&!seenCursors.has(cursor)){seenCursors.add(cursor);result=await read("tournament",state.generalToken,{cursor:cursor,limit:50});if(!result.ok)break;for(const stream of result.streams||[])next.set(stream.id,stream);cursor=result.nextCursor||null}
    if(next.size||!result.unchanged)generalStreams=next;return result;
  }
  async function loadExternal(){
    const tokens=unresolvedFollowTokens(state,generalStreams);
    await Promise.all(tokens.map(async token=>{const prior=externalStreams.get(token),result=await read("stream",token,{sinceRevision:prior&&prior.revision});if(result.ok&&result.stream)externalStreams.set(token,result.stream);else if(result&&["LIVE_REVOKED","LIVE_EXPIRED","LIVE_LINK_INVALID"].includes(result.code))externalStreams.delete(token)}));
  }

  function scoreRows(player,snapshot){
    const holes=new Map((player.holes||[]).map(item=>[Number(item.hole),item])),numbers=Array.from({length:18},(_,index)=>index+1),pars=new Map((snapshot.courseHoles||[]).map(item=>[Number(item.hole),item.par]));
    const cell=(item,key)=>!item?"":item.explicitX?(key==="gross"?"X":"—"):Number.isInteger(item[key])?String(item[key]):"";
    return'<div class="holes"><table><thead><tr><th>HOYO</th>'+numbers.map(hole=>"<th>"+hole+"</th>").join("")+'</tr></thead><tbody><tr><td>PAR</td>'+numbers.map(hole=>"<td>"+escapeHtml(pars.get(hole)||"")+"</td>").join("")+'</tr><tr><td>GROSS</td>'+numbers.map(hole=>"<td>"+cell(holes.get(hole),"gross")+"</td>").join("")+'</tr><tr><td>NETO</td>'+numbers.map(hole=>"<td>"+cell(holes.get(hole),"net")+"</td>").join("")+'</tr></tbody></table></div>';
  }
  function favoriteCard(resolved){
    if(!resolved.stream||!resolved.players.length)return'<article class="favorite"><header class="favorite-head"><div><h3>'+escapeHtml(resolved.item.label)+'</h3><small>ENLACE NO DISPONIBLE, CADUCADO O REVOCADO</small></div><button class="remove" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header></article>';
    const snapshot=resolved.stream.snapshot;
    return resolved.players.map(player=>{const totals=player.totals||{};return'<article class="favorite"><header class="favorite-head"><div><h3>'+escapeHtml(player.name)+'</h3><small>'+escapeHtml(resolved.stream.groupLabel||snapshot.groupLabel)+' · '+escapeHtml(snapshot.course||"CAMPO")+'</small></div><button class="remove" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header><div class="favorite-body"><div class="favorite-totals"><div><small>HOYOS</small><b>'+escapeHtml(totals.holes||0)+'/18</b></div><div><small>GROSS</small><b>'+escapeHtml(totals.gross||0)+'</b></div><div><small>NETO</small><b>'+escapeHtml(totals.net||0)+'</b></div><div><small>+/−</small><b class="'+(Number(totals.relativeToPar)<0?"under":Number(totals.relativeToPar)>0?"over":"")+'">'+relation(totals.relativeToPar||0)+'</b></div></div>'+scoreRows(player,snapshot)+'</div></article>'}).join("");
  }
  function renderFavorites(){
    const target=$("hubFavorites"),resolved=resolveFollows(state,generalStreams,externalStreams);if(!target)return;
    target.innerHTML=resolved.length?resolved.map(favoriteCard).join(""):'<div class="empty">EN EL MONITOR GENERAL, BUSCA UN JUGADOR Y TOCA + SEGUIR.</div>';
    target.querySelectorAll("[data-remove]").forEach(button=>button.onclick=()=>{state=removeFollowFromState(state,button.dataset.remove);saveState();renderAll()});
  }
  function renderSummary(){
    const target=$("hubSummary"),players=tournamentPlayers(generalStreams);if(!target)return;
    if(!state.generalToken){target.innerHTML='<div><small>GENERAL</small><strong>NO CONECTADA</strong></div>';return}
    const holes=players.reduce((sum,item)=>sum+item.holes,0),complete=players.filter(item=>item.holes===18).length;
    target.innerHTML='<div><small>TORNEO</small><strong>'+escapeHtml(general&&general.name||"GENERAL LIVE")+'</strong></div><div><small>GRUPOS</small><strong>'+generalStreams.size+'</strong></div><div><small>JUGADORES</small><strong>'+players.length+'</strong></div><div><small>FINALIZADOS</small><strong>'+complete+' · '+holes+' HOYOS</strong></div>';
  }
  function renderLeaderboard(){
    const wrap=$("hubLeaderWrap");if(!wrap)return;const rows=buildLeaderboard(generalStreams);
    if(!rows.length){wrap.innerHTML='<div class="empty">'+(state.generalToken?"TODAVÍA NO HAY SCORE CARDS PUBLICADAS.":"ABRE EL ENLACE GENERAL Y TOCA “ABRIR EN CENTRO LIVE”.")+'</div>';return}
    const followed=new Set(state.follows.map(item=>item.streamId+":"+item.playerId));
    wrap.innerHTML='<table class="leader"><thead><tr><th>POS</th><th>JUGADOR</th><th>GRUPO</th><th>HOYOS</th><th>GROSS</th><th>NETO</th><th>+/−</th><th>SEGUIR</th></tr></thead><tbody>'+rows.map(item=>{const key=item.streamId+":"+item.playerId,isFollowed=followed.has(key);return"<tr><td>"+item.rank+"</td><td>"+escapeHtml(item.name)+"</td><td>"+escapeHtml(item.groupLabel)+"</td><td>"+item.holes+"/18</td><td>"+item.gross+"</td><td>"+item.net+"</td><td class=\""+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+"\">"+relation(item.relativeToPar)+"</td><td><button class=\"star\" data-follow-stream=\""+escapeHtml(item.streamId)+"\" data-follow-player=\""+escapeHtml(item.playerId)+"\" aria-label=\"Seguir a "+escapeHtml(item.name)+"\">"+(isFollowed?"★":"＋")+"</button></td></tr>"}).join("")+"</tbody></table>";
    wrap.querySelectorAll("[data-follow-stream]").forEach(button=>button.onclick=()=>{const item=rows.find(row=>row.streamId===button.dataset.followStream&&row.playerId===button.dataset.followPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();renderAll();showMonitor("individual");setStatus(item.name+" ABIERTO EN MONITOR INDIVIDUAL","")}});
  }
  function renderSearch(){
    const target=$("hubSearchResults"),query=fold($("hubSearch")&&$("hubSearch").value);if(!target)return;
    if(!query){target.innerHTML="";return}
    const matches=tournamentPlayers(generalStreams).filter(item=>fold(item.name).includes(query)||fold(item.groupLabel).includes(query)).slice(0,20);
    target.innerHTML=matches.length?matches.map(item=>'<div class="search-row"><div><strong>'+escapeHtml(item.name)+'</strong><small>'+escapeHtml(item.groupLabel)+' · '+item.holes+'/18 HOYOS · NETO '+item.net+'</small></div><button class="follow-button" data-search-stream="'+escapeHtml(item.streamId)+'" data-search-player="'+escapeHtml(item.playerId)+'">+ SEGUIR</button></div>').join(""):'<div class="empty">NO ENCONTRÉ ESE NOMBRE EN LA GENERAL.</div>';
    target.querySelectorAll("[data-search-stream]").forEach(button=>button.onclick=()=>{const item=matches.find(row=>row.streamId===button.dataset.searchStream&&row.playerId===button.dataset.searchPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();$("hubSearch").value="";renderAll();showMonitor("individual");setStatus(item.name+" ABIERTO EN MONITOR INDIVIDUAL","")}});
  }
  function renderAll(){renderSummary();renderLeaderboard();renderSearch();renderFavorites()}

  function addImported(stream,player){
    const item=player?{key:stream.id+":"+player.id,kind:"player",token:pendingImportToken,streamId:stream.id,playerId:player.id,label:player.name,groupLabel:stream.groupLabel}:{key:stream.id+":group",kind:"group",token:pendingImportToken,streamId:stream.id,playerId:"",label:stream.groupLabel,groupLabel:stream.groupLabel};
    state=addFollowToState(state,item);saveState();pendingImportToken="";$("hubPicker").classList.remove("visible");renderAll();showMonitor("individual");setStatus((player?player.name:stream.groupLabel)+" ABIERTO EN MONITOR INDIVIDUAL","");
  }
  function showPicker(stream,token){
    pendingImportToken=token;externalStreams.set(token,stream);const players=stream.snapshot&&stream.snapshot.players||[],picker=$("hubPicker"),grid=$("hubPickerGrid");if(!picker||!grid)return;
    if(players.length===1){addImported(stream,players[0]);return}
    grid.innerHTML=players.map(player=>'<button type="button" data-pick-player="'+escapeHtml(player.id)+'">'+escapeHtml(player.name)+'</button>').join("")+'<button type="button" data-pick-group="1">TODO EL GRUPO</button>';
    grid.querySelectorAll("[data-pick-player]").forEach(button=>button.onclick=()=>addImported(stream,players.find(player=>player.id===button.dataset.pickPlayer)));
    grid.querySelector("[data-pick-group]").onclick=()=>addImported(stream,null);picker.classList.add("visible");
  }
  async function importStream(token){
    showMonitor("individual");setStatus("LEYENDO EL ENLACE PRIVADO…","");const result=await read("stream",token,{});
    if(!result.ok||!result.stream){setStatus(errorMessage(result.code),"error");return false}
    showPicker(result.stream,token);return true;
  }
  async function importAccess(access){
    if(!access)return false;
    if(access.kind==="general"){showMonitor("general");state.generalToken=access.token;saveState();general=null;generalRevision=null;generalStreams.clear();setStatus("GENERAL GUARDADA · CARGANDO JUGADORES…","");await refresh();return true}
    return importStream(access.token);
  }
  async function importTyped(){
    const access=parseShareLink($("hubImportLink")&&$("hubImportLink").value,root.location.origin);
    if(!access){setStatus("PEGA UN ENLACE LIVE VÁLIDO DE ESTA APLICACIÓN","warning");return false}
    $("hubImportLink").value="";return importAccess(access);
  }

  async function refresh(){
    if(loading)return;loading=true;let result={ok:true};
    if(state.generalToken)result=await loadGeneral();
    await loadExternal();loading=false;renderAll();
    if(result&&result.ok)setStatus(state.generalToken?"CENTRO LIVE ACTUALIZADO · MONITOR GENERAL + INDIVIDUAL":"AGREGA LA GENERAL O UN ENLACE PRIVADO","");
    else setStatus(errorMessage(result&&result.code),result&&["LIVE_REVOKED","LIVE_EXPIRED","LIVE_LINK_INVALID"].includes(result.code)?"error":"warning");
    clearTimeout(timer);timer=setTimeout(refresh,POLL_MS);
  }
  async function shareGeneral(){const url=generalShareUrl(state.generalToken);if(!url){setStatus("ABRE PRIMERO EL ENLACE GENERAL","warning");return false}if(root.navigator.share){try{await root.navigator.share({title:"GOLF SCORE CARD GT. LIVE",text:"Sigue la General del torneo en vivo desde cualquier país. Vista sólo lectura.",url:url});setStatus("GENERAL LISTA PARA COMPARTIR ♾️","");return true}catch{}}try{await root.navigator.clipboard.writeText(url);setStatus("ENLACE GENERAL COPIADO · COMPÁRTELO CON QUIEN DESEES","");return true}catch{setStatus("NO SE PUDO COMPARTIR EN ESTE NAVEGADOR","warning");return false}}
  function showMonitor(kind){const individual=kind==="individual";$("hubGeneralPanel")?.classList.toggle("hidden",individual);$("hubIndividualPanel")?.classList.toggle("hidden",!individual);$("hubShowGeneral")?.classList.toggle("active",!individual);$("hubShowIndividual")?.classList.toggle("active",individual)}
  function clearHash(){try{root.history.replaceState(null,"",root.location.pathname+root.location.search)}catch{}}
  async function start(){
    state=loadState();const imported=parseHubHash(root.location.hash);if(imported)clearHash();
    $("hubBack").onclick=()=>{root.close();setTimeout(()=>root.history.back(),100)};
    $("hubShowGeneral").onclick=()=>showMonitor("general");$("hubShowIndividual").onclick=()=>showMonitor("individual");$("hubShareGeneral").onclick=shareGeneral;$("hubRefresh").onclick=refresh;$("hubSearchButton").onclick=renderSearch;$("hubSearch").oninput=renderSearch;$("hubImportButton").onclick=importTyped;
    $("hubRemoveGeneral").onclick=()=>{state.generalToken="";saveState();general=null;generalRevision=null;generalStreams.clear();renderAll();setStatus("GENERAL RETIRADA DE ESTE DISPOSITIVO","warning")};
    $("hubClearFavorites").onclick=()=>{state.follows=[];saveState();externalStreams.clear();renderAll();setStatus("MONITOR INDIVIDUAL VACÍO","warning")};
    root.addEventListener("online",refresh);root.document.addEventListener("visibilitychange",()=>{if(root.document.visibilityState==="visible")refresh()});
    renderAll();if(imported)await importAccess(imported);else await refresh();return true;
  }

  return{STORAGE_KEY,POLL_MS,TOKEN_PATTERN,parseHubHash,parseShareLink,generalShareUrl,normalizeHubState,addFollowToState,removeFollowFromState,tournamentPlayers,buildLeaderboard,unresolvedFollowTokens,resolveFollows,start};
});
