(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root&&root.document)api.start()})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const STORAGE_KEY="golf-score-card-gt-live-hub-v1",POLL_MS=3000,MAX_SAVED_TOURNAMENTS=5,TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
  let state={version:2,generalToken:"",tournaments:[],follows:[]},general=null,generalRevision=null,generalStreams=new Map(),externalStreams=new Map(),pendingImportToken="",timer=null,loading=false,categoryCardOpen=false,tournamentPortalOpen=false;
  const $=id=>root&&root.document?root.document.getElementById(id):null;
  const text=(value,max=120)=>String(value==null?"":value).trim().replace(/\s+/g," ").slice(0,max);
  const escapeHtml=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const fold=value=>text(value,160).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
  const relation=value=>{const number=Number(value);return Number.isFinite(number)?number===0?"E":number>0?"+"+number:String(number):"—"};
  const tokenOk=value=>TOKEN_PATTERN.test(String(value||""));
  const CATEGORY_LABELS={championship:"CAMPEONATO",a:"A",b:"B",c:"C",d:"D",female:"FEMENINA",senior:"SENIOR",super_senior:"S.SENIOR"};
  const CATEGORY_DEFAULT_TEES={championship:"NEGRAS",a:"AZULES",b:"BLANCAS",c:"BLANCAS",d:"BLANCAS",female:"ROJAS",senior:"BLANCAS",super_senior:"AMARILLAS"};
  const DEMO_DISTRIBUTION={championship:7,a:6,b:24,c:11,d:0,female:7,senior:7,super_senior:5};
  const demoMode=()=>root&&root.location&&new URLSearchParams(root.location.search||"").get("demo")==="1";
  const selectedCategory=()=>{const value=String($("hubCategory")?.value||"all");return CATEGORY_LABELS[value]?value:"all"};
  const categoryLabel=value=>CATEGORY_LABELS[String(value||"")]||"SIN CATEGORÍA";
  const categoryShortLabel=value=>String(value||"")==="championship"?"C":categoryLabel(value);

  function parseHubHash(value){
    const params=new URLSearchParams(String(value||"").replace(/^#/,""));
    for(const kind of ["general","stream"]){const token=String(params.get(kind)||"");if(tokenOk(token))return{kind,token}}
    return null;
  }
  function parseShareLink(value,origin){
    try{
      const url=new URL(text(value,1200));
      if(!/^https?:$/.test(url.protocol)||url.origin!==origin)return null;
      if(url.pathname.endsWith("/live-hub.html")&&url.searchParams.get("demo")==="1")return{kind:"demo",token:""};
      if(!url.pathname.endsWith("/live.html")&&!url.pathname.endsWith("/live-hub.html"))return null;
      const access=String(url.hash||"").replace(/^#/,""),params=new URLSearchParams(access);
      for(const kind of ["tournament","general","stream"]){const token=String(params.get(kind)||"");if(tokenOk(token))return{kind:kind==="stream"?"stream":"general",token}}
    }catch{}
    return null;
  }
  function generalShareUrl(token){if(!tokenOk(token))return"";const url=new URL("/live.html",root.location.origin),share=new URL(root.location.href).searchParams.get("_vercel_share");if(share)url.searchParams.set("_vercel_share",share);url.hash="tournament="+encodeURIComponent(token);return url.toString()}
  function tournamentHubShareUrl(token,origin,href,demo=false){const url=new URL("/live-hub.html",origin),share=new URL(href||origin).searchParams.get("_vercel_share");if(share)url.searchParams.set("_vercel_share",share);url.searchParams.set("shared","1");if(demo)url.searchParams.set("demo","1");else{if(!tokenOk(token))return"";url.hash="general="+encodeURIComponent(token)}return url.toString()}
  function tournamentHubOpenUrl(token,origin,href,demo=false){const url=new URL(tournamentHubShareUrl(token,origin,href,demo));url.searchParams.delete("shared");return url.toString()}
  function normalizeFollow(value){
    const token=tokenOk(value&&value.token)?String(value.token):"",streamId=text(value&&value.streamId,80),playerId=text(value&&value.playerId,80),kind=value&&value.kind==="group"?"group":"player";
    if(!streamId&&!token)return null;
    return{key:text(value&&value.key,180)||streamId+":"+(playerId||"group"),kind,token,streamId,playerId,label:text(value&&value.label,80)||"JUGADOR",groupLabel:text(value&&value.groupLabel,120)||"GRUPO"};
  }
  function normalizeHubState(value){
    const follows=[],keys=new Set();
    for(const raw of Array.isArray(value&&value.follows)?value.follows:[]){const item=normalizeFollow(raw);if(item&&!keys.has(item.key)){keys.add(item.key);follows.push(item)}}
    const generalToken=tokenOk(value&&value.generalToken)?String(value.generalToken):"",tournaments=[],tournamentTokens=new Set();
    for(const raw of Array.isArray(value&&value.tournaments)?value.tournaments:[]){const token=tokenOk(raw&&raw.token)?String(raw.token):"";if(!token||tournamentTokens.has(token)||tournaments.length>=MAX_SAVED_TOURNAMENTS)continue;tournamentTokens.add(token);tournaments.push({token,label:text(raw.label,80)||`TORNEO ${tournaments.length+1}`})}
    if(generalToken&&!tournamentTokens.has(generalToken)&&tournaments.length<MAX_SAVED_TOURNAMENTS)tournaments.push({token:generalToken,label:"TORNEO GUARDADO"});
    return{version:2,generalToken,tournaments,follows};
  }
  function upsertTournamentState(current,token,label="TORNEO GUARDADO"){const next=normalizeHubState(current),safe=tokenOk(token)?String(token):"";if(!safe)return{state:next,added:false,full:false};const existing=next.tournaments.find(item=>item.token===safe);if(existing){existing.label=text(label,80)||existing.label;next.generalToken=safe;return{state:next,added:false,full:false}}if(next.tournaments.length>=MAX_SAVED_TOURNAMENTS)return{state:next,added:false,full:true};next.tournaments.push({token:safe,label:text(label,80)||`TORNEO ${next.tournaments.length+1}`});next.generalToken=safe;return{state:next,added:true,full:false}}
  function removeTournamentFromState(current,token){const next=normalizeHubState(current);next.tournaments=next.tournaments.filter(item=>item.token!==token);if(next.generalToken===token)next.generalToken=next.tournaments[0]?.token||"";return next}
  function addFollowToState(current,value){
    const next=normalizeHubState(current),item=normalizeFollow(value);if(!item)return next;
    next.follows=next.follows.filter(existing=>existing.key!==item.key);next.follows.push(item);return next;
  }
  function removeFollowFromState(current,key){const next=normalizeHubState(current);next.follows=next.follows.filter(item=>item.key!==key);return next}
  function loadState(){try{return normalizeHubState(JSON.parse(root.localStorage.getItem(STORAGE_KEY)||"null"))}catch{return normalizeHubState(null)}}
  function saveState(){try{root.localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch{return false}}

  function uniquePlayerHoles(player){const unique=new Map();for(const raw of Array.isArray(player&&player.holes)?player.holes:[]){const hole=Number(raw&&raw.hole);if(Number.isInteger(hole)&&hole>=1&&hole<=18)unique.set(hole,raw)}return[...unique.values()].sort((left,right)=>Number(left.hole)-Number(right.hole))}
  function livePlayerTotals(player){const holes=uniquePlayerHoles(player);let gross=0,net=0,relativeToPar=0;for(const hole of holes){if(hole.explicitX)continue;const holeGross=Number(hole.gross),holeNet=Number(hole.net),holePar=Number(hole.par),holeResult=Number(hole.relativeToPar);if(Number.isFinite(holeGross))gross+=holeGross;if(Number.isFinite(holeNet))net+=holeNet;if(Number.isFinite(holeResult))relativeToPar+=holeResult;else if(Number.isFinite(holeNet)&&Number.isFinite(holePar))relativeToPar+=holeNet-holePar}const currentHole=holes.length?Math.max(...holes.map(hole=>Number(hole.hole))):0;return{holes:holes.length,currentHole,gross,net,relativeToPar,finished:holes.length===18}}
  function tournamentPlayers(streams){
    const values=streams instanceof Map?[...streams.values()]:Array.isArray(streams)?streams:[];
    const consolidated=new Map();
    for(const stream of values){const snapshot=stream&&stream.snapshot;if(!snapshot)continue;for(const player of snapshot.players||[]){const groupLabel=stream.groupLabel||snapshot.groupLabel||"GRUPO",key=fold(groupLabel)+"|"+fold(player.name),existing=consolidated.get(key),holes=new Map(uniquePlayerHoles(existing?.player).map(hole=>[Number(hole.hole),hole]));let conflicts=existing?.conflicts||0;for(const hole of uniquePlayerHoles(player)){const prior=holes.get(Number(hole.hole));if(!prior)holes.set(Number(hole.hole),hole);else if(JSON.stringify([prior.gross,prior.net,prior.explicitX])!==JSON.stringify([hole.gross,hole.net,hole.explicitX]))conflicts+=1}const merged={...player,holes:[...holes.values()].sort((a,b)=>a.hole-b.hole)},totals=livePlayerTotals(merged),category=CATEGORY_LABELS[player.tournamentCategory]?player.tournamentCategory:(existing?.tournamentCategory||"");consolidated.set(key,{streamId:existing?.streamId||stream.id,playerId:existing?.playerId||player.id,name:existing?.name||player.name,tournamentCategory:category,categoryLabel:categoryLabel(category),groupLabel,course:snapshot.course||existing?.course||"CAMPO",mode:snapshot.mode||existing?.mode||"general",status:snapshot.status||existing?.status||"active",conflicts,...totals,player:merged,snapshot})}}
    return[...consolidated.values()];
  }
  function demoTournamentStreams(){
    const players=[];let sequence=0;
    for(const [category,count] of Object.entries(DEMO_DISTRIBUTION))for(let index=1;index<=count;index++){
      sequence+=1;
      const played=sequence%9===0?18:Math.max(1,(sequence*3)%18),handicap=sequence%25,baseStrokes=Math.floor(handicap/18),extraStrokes=handicap%18;
      const holes=Array.from({length:played},(_,hole)=>{const par=4,gross=4+(sequence+hole)%3,strokes=baseStrokes+(hole<extraStrokes?1:0),net=gross-strokes;return{hole:hole+1,par,gross,net,relativeToPar:net-par}});
      players.push({id:`demo-${sequence}`,name:`${CATEGORY_LABELS[category]} ${String(index).padStart(2,"0")}`,tournamentCategory:category,handicap,tee:CATEGORY_DEFAULT_TEES[category],holes});
    }
    return new Map(Array.from({length:Math.ceil(players.length/4)},(_,group)=>{const id=`demo-group-${group+1}`;return[id,{id,groupLabel:`GRUPO ${group+1}`,snapshot:{tournament:"TORNEO DEMOSTRACIÓN",playedAt:new Date().toISOString(),course:"EL PULTÉ GOLF",mode:"general",status:"active",courseHoles:Array.from({length:18},(_,hole)=>({hole:hole+1,par:4})),players:players.slice(group*4,group*4+4)}}]}));
  }
  function displayStreams(){return generalStreams.size||!demoMode()?generalStreams:demoTournamentStreams()}
  function categoryIndex(streams){const index={};for(const item of tournamentPlayers(streams)){const key=item.tournamentCategory||"uncategorized";(index[key]||(index[key]=[])).push(item)}return index}
  function visibleTournamentPlayers(streams){const category=selectedCategory();return tournamentPlayers(streams).filter(item=>category==="all"||item.tournamentCategory===category)}
  function buildLeaderboard(streams){
    const players=visibleTournamentPlayers(streams).sort((left,right)=>left.relativeToPar-right.relativeToPar||right.holes-left.holes||fold(left.name).localeCompare(fold(right.name)));
    let previous=null,rank=0;return players.map((item,index)=>{const key=item.relativeToPar+":"+item.holes;if(previous===null||key!==previous)rank=index+1;previous=key;return{...item,rank}})
  }
  function categoryScoreboardRows(streams,category="all"){
    const selected=CATEGORY_LABELS[category]?category:"all",players=tournamentPlayers(streams).filter(item=>selected==="all"||item.tournamentCategory===selected);
    return players.sort((left,right)=>left.relativeToPar-right.relativeToPar||right.holes-left.holes||fold(left.name).localeCompare(fold(right.name))).map(item=>{
      const holes=new Map(uniquePlayerHoles(item.player).map(hole=>[Number(hole.hole),hole]));
      const segment=numbers=>numbers.reduce((sum,hole)=>{const value=holes.get(hole);if(!value||value.explicitX)return sum;const gross=Number(value.gross),net=Number(value.net),par=Number(value.par);if(Number.isFinite(gross))sum.gross+=gross;if(Number.isFinite(net))sum.net+=net;if(Number.isFinite(net)&&Number.isFinite(par))sum.result+=net-par;sum.holes+=1;return sum},{gross:0,net:0,result:0,holes:0});
      return{...item,holeValues:Array.from({length:18},(_,index)=>{const hole=holes.get(index+1);if(!hole)return null;if(hole.explicitX)return{gross:"X",net:"—",result:"—"};const result=Number.isFinite(Number(hole.relativeToPar))?Number(hole.relativeToPar):Number(hole.net)-Number(hole.par);return{gross:hole.gross,net:hole.net,result:relation(result)}}),inTotals:segment([1,2,3,4,5,6,7,8,9]),outTotals:segment([10,11,12,13,14,15,16,17,18]),totalTotals:segment(Array.from({length:18},(_,index)=>index+1))};
    });
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
    if(next.size||!result.unchanged)generalStreams=next;if(general&&state.generalToken){const saved=upsertTournamentState(state,state.generalToken,general.name||"TORNEO LIVE");state=saved.state;saveState()}return result;
  }
  async function loadExternal(){
    const tokens=unresolvedFollowTokens(state,generalStreams);
    await Promise.all(tokens.map(async token=>{const prior=externalStreams.get(token),result=await read("stream",token,{sinceRevision:prior&&prior.revision});if(result.ok&&result.stream)externalStreams.set(token,result.stream);else if(result&&["LIVE_REVOKED","LIVE_EXPIRED","LIVE_LINK_INVALID"].includes(result.code))externalStreams.delete(token)}));
  }

  function scoreRows(player,snapshot){
    const holes=new Map(uniquePlayerHoles(player).map(item=>[Number(item.hole),item])),numbers=Array.from({length:18},(_,index)=>index+1),pars=new Map((snapshot.courseHoles||[]).map(item=>[Number(item.hole),item.par]));
    const cell=(item,key)=>!item?"":item.explicitX?(key==="gross"?"X":"—"):Number.isInteger(item[key])?String(item[key]):"";
    return'<div class="holes"><table><thead><tr><th>HOYO</th>'+numbers.map(hole=>"<th>"+hole+"</th>").join("")+'</tr></thead><tbody><tr><td>PAR</td>'+numbers.map(hole=>"<td>"+escapeHtml(pars.get(hole)||"")+"</td>").join("")+'</tr><tr><td>GROSS</td>'+numbers.map(hole=>"<td>"+cell(holes.get(hole),"gross")+"</td>").join("")+'</tr><tr><td>NETO</td>'+numbers.map(hole=>"<td>"+cell(holes.get(hole),"net")+"</td>").join("")+'</tr></tbody></table></div>';
  }
  function favoriteCard(resolved,rankByPlayer){
    if(!resolved.stream||!resolved.players.length)return'<article class="favorite"><header class="favorite-head"><div><h3>'+escapeHtml(resolved.item.label)+'</h3><small>ENLACE NO DISPONIBLE, CADUCADO O REVOCADO</small></div><button class="remove" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header></article>';
    const snapshot=resolved.stream.snapshot;
    return resolved.players.map(player=>{const totals=livePlayerTotals(player),rank=rankByPlayer.get(resolved.stream.id+":"+player.id)||"—";return'<article class="favorite"><header class="favorite-head"><div><h3>#'+escapeHtml(rank)+' · '+escapeHtml(player.name)+'</h3><small>'+escapeHtml(resolved.stream.groupLabel||snapshot.groupLabel)+' · '+escapeHtml(snapshot.course||"CAMPO")+'</small></div><button class="remove" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header><div class="favorite-body"><div class="favorite-totals"><div><small>HOYO ACTUAL</small><b>'+(totals.finished?'FINAL':escapeHtml(totals.currentHole||'—'))+'</b></div><div><small>GROSS</small><b>'+escapeHtml(totals.gross)+'</b></div><div><small>NETO</small><b>'+escapeHtml(totals.net)+'</b></div><div><small>+/−</small><b class="'+(totals.relativeToPar<0?"under":totals.relativeToPar>0?"over":"")+'">'+relation(totals.relativeToPar)+'</b></div></div>'+scoreRows(player,snapshot)+'</div></article>'}).join("");
  }
  function renderFavorites(){
    const target=$("hubFavorites"),resolved=resolveFollows(state,generalStreams,externalStreams);if(!target)return;const rankByPlayer=new Map(buildLeaderboard(displayStreams()).map(item=>[item.streamId+":"+item.playerId,item.rank]));
    target.innerHTML=resolved.length?resolved.map(item=>favoriteCard(item,rankByPlayer)).join(""):'<div class="empty">EN EL MONITOR GENERAL, BUSCA UN JUGADOR Y TOCA + SEGUIR.</div>';
    target.querySelectorAll("[data-remove]").forEach(button=>button.onclick=()=>{state=removeFollowFromState(state,button.dataset.remove);saveState();renderAll()});
  }
  function renderSummary(){
    const streams=displayStreams(),target=$("hubSummary"),players=tournamentPlayers(streams);if(!target)return;
    if(!state.generalToken&&!demoMode()){target.innerHTML='<div><small>GENERAL</small><strong>NO CONECTADA</strong></div>';return}
    const holes=players.reduce((sum,item)=>sum+item.holes,0),complete=players.filter(item=>item.holes===18).length;
    target.innerHTML='<div><small>TORNEO</small><strong>'+escapeHtml(general&&general.name||(demoMode()?"DEMOSTRACIÓN":"GENERAL LIVE"))+'</strong></div><div><small>GRUPOS</small><strong>'+streams.size+'</strong></div><div><small>JUGADORES</small><strong>'+players.length+'</strong></div><div><small>FINALIZADOS</small><strong>'+complete+' · '+holes+' HOYOS</strong></div>';
  }
  function renderLeaderboard(){
    const wrap=$("hubLeaderWrap");if(!wrap)return;const rows=buildLeaderboard(displayStreams());
    if(!rows.length){wrap.innerHTML='<div class="empty">'+(state.generalToken?"TODAVÍA NO HAY SCORE CARDS PUBLICADAS.":"ABRE EL ENLACE GENERAL Y TOCA “ABRIR EN CENTRO LIVE”.")+'</div>';return}
    const followed=new Set(state.follows.map(item=>item.streamId+":"+item.playerId));
    wrap.innerHTML='<table class="leader"><thead><tr><th>POS</th><th>JUGADOR</th><th>CATEGORÍA</th><th>GRUPO</th><th>HOYO ACTUAL</th><th>GROSS</th><th>NETO</th><th>+/−</th><th>SEGUIR</th></tr></thead><tbody>'+rows.map(item=>{const key=item.streamId+":"+item.playerId,isFollowed=followed.has(key),progress=item.finished?"FINAL":item.currentHole?String(item.currentHole):"—";return"<tr><td>"+item.rank+"</td><td>"+escapeHtml(item.name)+"</td><td><span class=\"category-chip category-"+escapeHtml(item.tournamentCategory||"none")+"\">"+escapeHtml(categoryShortLabel(item.tournamentCategory))+"</span></td><td>"+escapeHtml(item.groupLabel)+"</td><td>"+progress+"</td><td>"+item.gross+"</td><td>"+item.net+"</td><td class=\""+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+"\">"+relation(item.relativeToPar)+"</td><td><button class=\"star\" data-follow-stream=\""+escapeHtml(item.streamId)+"\" data-follow-player=\""+escapeHtml(item.playerId)+"\" aria-label=\"Seguir a "+escapeHtml(item.name)+"\">"+(isFollowed?"★":"＋")+"</button></td></tr>"}).join("")+"</tbody></table>";
    wrap.querySelectorAll("[data-follow-stream]").forEach(button=>button.onclick=()=>{const item=rows.find(row=>row.streamId===button.dataset.followStream&&row.playerId===button.dataset.followPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();renderAll();showMonitor("individual");setStatus(item.name+" ABIERTO EN MONITOR INDIVIDUAL","")}});
  }
  function categoryCell(value){return value?'<span><b>'+escapeHtml(value.gross)+'</b><i>'+escapeHtml(value.net)+'</i><em>'+escapeHtml(value.result)+'</em></span>':'<span class="pending">—</span>'}
  function totalCell(value){return categoryCell(value&&value.holes?{gross:value.gross,net:value.net,result:relation(value.result)}:null)}
  function liveDate(value){const date=new Date(value||Date.now());return Number.isFinite(date.getTime())?new Intl.DateTimeFormat("es-GT",{timeZone:"America/Guatemala",day:"2-digit",month:"2-digit",year:"numeric"}).format(date):"—"}
  function modeLabel(value){return({general:"RONDA NORMAL",stableford:"STABLEFORD",match_play:"MATCH PLAY",four_ball:"FOUR BALL"})[value]||text(value,30).toUpperCase()||"RONDA NORMAL"}
  function renderCategoryCard(){
    const target=$("hubCategoryCard"),button=$("hubCategoryCardToggle");if(!target||!button)return;
    target.classList.toggle("hidden",!categoryCardOpen);button.setAttribute("aria-expanded",String(categoryCardOpen));button.textContent=categoryCardOpen?"OCULTAR DETALLE LIVE":"VER DETALLE LIVE DE CATEGORÍA";if(!categoryCardOpen)return;
    const category=selectedCategory(),rows=categoryScoreboardRows(displayStreams(),category),label=category==="all"?"GENERAL":categoryLabel(category);
    if(!rows.length){target.innerHTML='<div class="empty">NO HAY JUGADORES PUBLICADOS EN '+escapeHtml(label)+'.</div>';return}
    const first=rows[0],tournament=text(first.snapshot.tournament,120).toUpperCase()||"TORNEO",date=liveDate(first.snapshot.playedAt),mode=modeLabel(first.mode);
    const heads=Array.from({length:18},(_,index)=>'<th>'+(index+1)+'</th>').join("");
    const ranking=rows.map((item,index)=>'<tr><td>'+(index+1)+'</td><td><b>'+escapeHtml(item.name)+'</b></td><td>'+escapeHtml(item.player.handicap)+'</td><td><span class="category-chip category-'+escapeHtml(item.tournamentCategory||"none")+'">'+escapeHtml(categoryShortLabel(item.tournamentCategory))+'</span></td><td>'+(item.finished?'FINAL':item.currentHole||'—')+'</td><td>'+item.gross+'</td><td>'+item.net+'</td><td class="'+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+'">'+relation(item.relativeToPar)+'</td></tr>').join("");
    target.innerHTML='<header class="category-card-head"><div class="category-event-meta"><span><small>FECHA</small><b>'+escapeHtml(date)+'</b></span><span><small>TORNEO</small><b>'+escapeHtml(tournament)+'</b></span><span><small>MODALIDAD</small><b>'+escapeHtml(mode)+'</b></span></div><strong>'+escapeHtml(label)+'</strong><small>'+rows.length+' JUGADORES EN VIVO</small></header><div class="category-ranking-wrap"><table class="category-ranking"><thead><tr><th>POS</th><th>NOMBRE</th><th>HDCP</th><th>CATEGORÍA</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/−</th></tr></thead><tbody>'+ranking+'</tbody></table></div><div class="category-detail-title">DETALLE POR HOYO · GROSS / NETO / RESULTADO</div><div class="category-score-wrap"><table class="category-score"><thead><tr><th>POS</th><th>JUGADOR</th>'+heads+'<th>IN</th><th>OUT</th><th>TOTAL</th></tr></thead><tbody>'+rows.map((item,index)=>'<tr><td>'+(index+1)+'</td><td><b>'+escapeHtml(item.name)+'</b><small>'+escapeHtml(item.groupLabel)+'</small></td>'+item.holeValues.map(categoryCell).map(cell=>'<td>'+cell+'</td>').join("")+'<td>'+totalCell(item.inTotals)+'</td><td>'+totalCell(item.outTotals)+'</td><td>'+totalCell(item.totalTotals)+'</td></tr>').join("")+'</tbody></table></div>';
  }
  function renderSearch(){
    const target=$("hubSearchResults"),query=fold($("hubSearch")&&$("hubSearch").value);if(!target)return;
    if(!query){target.innerHTML="";return}
    const matches=tournamentPlayers(displayStreams()).filter(item=>fold(item.name).includes(query)||fold(item.groupLabel).includes(query)||fold(item.categoryLabel).includes(query)).sort((left,right)=>fold(left.name).localeCompare(fold(right.name),"es")).slice(0,100);
    target.innerHTML=matches.length?matches.map(item=>'<div class="search-row"><div><strong>'+escapeHtml(item.name)+'</strong><small><span class="category-chip category-'+escapeHtml(item.tournamentCategory||"none")+'">'+escapeHtml(categoryShortLabel(item.tournamentCategory))+'</span> · '+escapeHtml(item.groupLabel)+' · '+item.holes+'/18 HOYOS · NETO '+item.net+'</small></div><button class="follow-button" data-search-stream="'+escapeHtml(item.streamId)+'" data-search-player="'+escapeHtml(item.playerId)+'">+ SEGUIR</button></div>').join(""):'<div class="empty">NO ENCONTRÉ ESE NOMBRE EN LA GENERAL.</div>';
    target.querySelectorAll("[data-search-stream]").forEach(button=>button.onclick=()=>{const item=matches.find(row=>row.streamId===button.dataset.searchStream&&row.playerId===button.dataset.searchPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();$("hubSearch").value="";renderAll();showMonitor("individual");setStatus(item.name+" ABIERTO EN MONITOR INDIVIDUAL","")}});
  }
  function renderTournamentShelf(){const shelf=$("hubTournamentShelf"),cards=$("hubTournamentCards"),shared=new URLSearchParams(root.location.search||"").get("shared")==="1";if(!shelf||!cards)return;const portal=tournamentPortalOpen&&!shared,items=[{token:"__demo__",label:"TORNEO DEMOSTRACIÓN",demo:true},...state.tournaments];shelf.classList.toggle("hidden",!portal);cards.innerHTML=items.map(item=>'<button class="tournament-card" type="button" data-tournament="'+escapeHtml(item.token)+'">'+escapeHtml(item.label)+'<small>'+(item.demo?'67 JUGADORES SIMULADOS':'GENERAL Y CATEGORÍAS LIVE')+'</small></button>').join("");cards.querySelectorAll("[data-tournament]").forEach(button=>button.onclick=()=>button.dataset.tournament==="__demo__"?root.location.assign(tournamentHubOpenUrl("",root.location.origin,root.location.href,true)):selectSavedTournament(button.dataset.tournament));$("hubTournamentEntry")?.classList.toggle("hidden",!portal);$("hubTournamentHome")?.classList.toggle("hidden",portal||shared);$("hubGeneralPanel")?.classList.toggle("hidden",portal);$("hubIndividualPanel")?.classList.add("hidden");root.document.querySelector(".monitor-switch")?.classList.toggle("hidden",portal)}
  function resetGeneralView(){general=null;generalRevision=null;generalStreams.clear();categoryCardOpen=false;$("hubCategory")&&( $("hubCategory").value="all");$("hubSearch")&&( $("hubSearch").value="")}
  async function selectSavedTournament(token){if(!tokenOk(token))return false;state.generalToken=token;saveState();tournamentPortalOpen=false;resetGeneralView();showMonitor("general");setStatus("ABRIENDO TORNEO…","");await refresh();return true}
  function showTournamentPortal(){tournamentPortalOpen=true;clearTimeout(timer);renderAll();setStatus("ELIGE UNO DE TUS TORNEOS O AGREGA OTRO","")}
  function renderAll(){renderTournamentShelf();renderSummary();renderLeaderboard();renderCategoryCard();renderSearch();renderFavorites()}

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
    if(access.kind==="demo"){root.location.href=tournamentHubShareUrl("",root.location.origin,root.location.href,true);return true}
    if(access.kind==="general"){const saved=upsertTournamentState(state,access.token,"TORNEO CARGANDO…");if(saved.full){setStatus("MÁXIMO 5 TORNEOS GUARDADOS · QUITA UNO PARA AGREGAR OTRO","warning");return false}state=saved.state;saveState();tournamentPortalOpen=false;resetGeneralView();showMonitor("general");setStatus("GENERAL GUARDADA · CARGANDO JUGADORES…","");await refresh();return true}
    return importStream(access.token);
  }
  async function importTyped(){
    const access=parseShareLink($("hubImportLink")&&$("hubImportLink").value,root.location.origin);
    if(!access){setStatus("PEGA UN ENLACE LIVE VÁLIDO DE ESTA APLICACIÓN","warning");return false}
    $("hubImportLink").value="";return importAccess(access);
  }
  async function openTournamentTyped(){
    const access=parseShareLink($("hubTournamentLink")&&$("hubTournamentLink").value,root.location.origin);
    if(!access||access.kind!=="general"){setStatus("PEGA EL ENLACE DEL TORNEO","warning");return false}
    $("hubTournamentLink").value="";return importAccess(access);
  }

  async function refresh(){
    if(loading||tournamentPortalOpen)return;loading=true;let result={ok:true};
    if(state.generalToken)result=await loadGeneral();
    await loadExternal();loading=false;renderAll();
    if(result&&result.ok)setStatus(state.generalToken?"CENTRO LIVE ACTUALIZADO · MONITOR GENERAL + INDIVIDUAL":"AGREGA LA GENERAL O UN ENLACE PRIVADO","");
    else setStatus(errorMessage(result&&result.code),result&&["LIVE_REVOKED","LIVE_EXPIRED","LIVE_LINK_INVALID"].includes(result.code)?"error":"warning");
    clearTimeout(timer);timer=setTimeout(refresh,POLL_MS);
  }
  async function shareGeneral(){const url=tournamentHubShareUrl(state.generalToken,root.location.origin,root.location.href,demoMode());if(!url){setStatus("ABRE PRIMERO EL ENLACE GENERAL","warning");return false}if(root.navigator.share){try{await root.navigator.share({title:general&&general.name||"TORNEO LIVE",text:"Sigue la General y categorías de este torneo en vivo. Vista sólo lectura.",url:url});setStatus("ENLACE EXCLUSIVO DEL TORNEO LISTO PARA COMPARTIR ♾️","");return true}catch{}}try{await root.navigator.clipboard.writeText(url);setStatus("ENLACE DEL TORNEO COPIADO · NO COMPARTE LA APLICACIÓN","");return true}catch{setStatus("NO SE PUDO COMPARTIR EN ESTE NAVEGADOR","warning");return false}}
  function showMonitor(kind){const individual=kind==="individual";$("hubGeneralPanel")?.classList.toggle("hidden",individual);$("hubIndividualPanel")?.classList.toggle("hidden",!individual);$("hubShowGeneral")?.classList.toggle("active",!individual);$("hubShowIndividual")?.classList.toggle("active",individual)}
  function clearHash(){try{root.history.replaceState(null,"",root.location.pathname+root.location.search)}catch{}}
  async function start(){
    state=loadState();const imported=parseHubHash(root.location.hash);if(imported)clearHash();const params=new URLSearchParams(root.location.search||""),shared=params.get("shared")==="1";tournamentPortalOpen=!demoMode()&&!imported;root.document.body.classList.toggle("shared-view",shared);
    $("hubBack").onclick=()=>{root.close();setTimeout(()=>root.history.back(),100)};$("hubOpenTournament").onclick=openTournamentTyped;$("hubTournamentLink").onkeydown=event=>{if(event.key==="Enter")openTournamentTyped()};
    $("hubShowGeneral").onclick=()=>showMonitor("general");$("hubShowIndividual").onclick=()=>showMonitor("individual");$("hubShareGeneral").onclick=shareGeneral;$("hubRefresh").onclick=refresh;$("hubCategory").onchange=renderAll;$("hubCategoryCardToggle").onclick=()=>{categoryCardOpen=!categoryCardOpen;renderCategoryCard()};$("hubSearchButton").onclick=renderSearch;$("hubSearch").oninput=renderSearch;$("hubImportButton").onclick=importTyped;$("hubAddTournament").onclick=()=>$("hubTournamentLink")?.focus();$("hubTournamentHome").onclick=showTournamentPortal;
    $("hubRemoveGeneral").onclick=()=>{state=removeTournamentFromState(state,state.generalToken);saveState();resetGeneralView();showTournamentPortal()};
    $("hubClearFavorites").onclick=()=>{state.follows=[];saveState();externalStreams.clear();renderAll();setStatus("MONITOR INDIVIDUAL VACÍO","warning")};
    root.addEventListener("online",refresh);root.document.addEventListener("visibilitychange",()=>{if(root.document.visibilityState==="visible")refresh()});
    renderAll();if(imported)await importAccess(imported);else if(tournamentPortalOpen)setStatus("ELIGE UN TORNEO · PUEDES GUARDAR HASTA 5","");else await refresh();return true;
  }

  return{STORAGE_KEY,POLL_MS,MAX_SAVED_TOURNAMENTS,TOKEN_PATTERN,CATEGORY_LABELS,CATEGORY_DEFAULT_TEES,DEMO_DISTRIBUTION,demoTournamentStreams,parseHubHash,parseShareLink,generalShareUrl,tournamentHubShareUrl,tournamentHubOpenUrl,normalizeHubState,upsertTournamentState,removeTournamentFromState,addFollowToState,removeFollowFromState,uniquePlayerHoles,livePlayerTotals,tournamentPlayers,categoryIndex,categoryShortLabel,buildLeaderboard,categoryScoreboardRows,liveDate,modeLabel,unresolvedFollowTokens,resolveFollows,start};
});
