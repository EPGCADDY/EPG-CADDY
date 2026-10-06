(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root&&root.document)api.start()})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const STORAGE_KEY="golf-score-card-gt-live-hub-v1",POLL_MS=3000,DISPLAY_MS=10000,MAX_SAVED_TOURNAMENTS=5,TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
  let state={version:2,generalToken:"",tournaments:[],follows:[]},general=null,generalRevision=null,generalStreams=new Map(),tournamentStreams=new Map(),externalStreams=new Map(),pendingImportToken="",timer=null,loading=false,categoryCardOpen=false,tournamentPortalOpen=false,registeredTournamentsOpen=false,enterExistingTournament=false,activeMonitor="general",pendingMonitor="overview",tournamentEntryOpen=false,displayTimer=null,displayCountdownTimer=null,displaySceneIndex=0;
  const expandedFavorites=new Set();
  let administrationEvents=[],directoryPartial=false;
  const ROUND_TOURNAMENTS_KEY="gsc-round-tournament-tokens-v1";
  function isRoundTournament(token){try{const values=JSON.parse(root.localStorage.getItem(ROUND_TOURNAMENTS_KEY)||"[]");return Array.isArray(values)&&values.includes(String(token))}catch{return false}}
  const $=id=>root&&root.document?root.document.getElementById(id):null;
  const text=(value,max=120)=>String(value==null?"":value).trim().replace(/\s+/g," ").slice(0,max);
  const escapeHtml=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const fold=value=>text(value,160).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
  const relation=value=>{const number=Number(value);return Number.isFinite(number)?number===0?"E":number>0?"+"+number:String(number):"—"};
  const tokenOk=value=>TOKEN_PATTERN.test(String(value||""));
  const CATEGORY_LABELS={championship:"CAMPEONATO",a:"A",b:"B",c:"C",d:"D",senior:"SENIOR",super_senior:"SUPER SENIOR",female:"FEMENINA"};
  const CATEGORY_DEFAULT_TEES={championship:"NEGRAS",a:"AZULES",b:"BLANCAS",c:"BLANCAS",d:"BLANCAS",female:"ROJAS",senior:"BLANCAS",super_senior:"AMARILLAS"};
  const DEMO_DISTRIBUTION={championship:7,a:6,b:24,c:11,d:0,female:7,senior:7,super_senior:5};
  const demoMode=()=>root&&root.location&&new URLSearchParams(root.location.search||"").get("demo")==="1";
  const selectedCategory=()=>{const value=String($("hubCategory")?.value||"all");return CATEGORY_LABELS[value]?value:"all"};
  const selectedCourse=()=>String($("hubCourse")?.value||"all");
  const courseKey=value=>fold(value||"CAMPO");
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
  function tournamentDisplayUrl(token,origin,href,demo=false){const url=new URL(tournamentHubShareUrl(token,origin,href,demo));url.searchParams.set("display","1");return url.toString()}
  function normalizeFollow(value){
    const token=tokenOk(value&&value.token)?String(value.token):"",tournamentToken=tokenOk(value&&value.tournamentToken)?String(value.tournamentToken):"",streamId=text(value&&value.streamId,80),playerId=text(value&&value.playerId,80),kind=value&&value.kind==="group"?"group":"player";
    if(!streamId&&!token)return null;
    return{key:text(value&&value.key,180)||streamId+":"+(playerId||"group"),kind,token,tournamentToken,tournamentLabel:text(value&&value.tournamentLabel,80)||"",streamId,playerId,label:text(value&&value.label,80)||"JUGADOR",groupLabel:text(value&&value.groupLabel,120)||"GRUPO"};
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
  function loadState(){try{return normalizeHubState(JSON.parse(root.localStorage.getItem(STORAGE_KEY+(root.GSCPersonalEvents?":"+root.GSCPersonalEvents.storageSuffix():""))||"null"))}catch{return normalizeHubState(null)}}
  function saveState(){try{root.localStorage.setItem(STORAGE_KEY+(root.GSCPersonalEvents?":"+root.GSCPersonalEvents.storageSuffix():""),JSON.stringify(state));return true}catch{return false}}

  function uniquePlayerHoles(player){const unique=new Map();for(const raw of Array.isArray(player&&player.holes)?player.holes:[]){const hole=Number(raw&&raw.hole);if(Number.isInteger(hole)&&hole>=1&&hole<=18)unique.set(hole,raw)}return[...unique.values()].sort((left,right)=>Number(left.hole)-Number(right.hole))}
  function livePlayerTotals(player){const holes=uniquePlayerHoles(player);let gross=0,net=0,relativeToPar=0,universalesPoints=null,stablefordPoints=null;for(const hole of holes){if(hole.explicitX)continue;const holeGross=Number(hole.gross),holeNet=Number(hole.net),holePar=Number(hole.par),holeResult=Number(hole.relativeToPar),hasPoints=Number.isFinite(hole.universalesPoints),holePoints=Number(hole.universalesPoints);if(Number.isFinite(holeGross))gross+=holeGross;if(Number.isFinite(holeNet))net+=holeNet;if(Number.isFinite(holeResult))relativeToPar+=holeResult;else if(Number.isFinite(holeNet)&&Number.isFinite(holePar))relativeToPar+=holeNet-holePar;if(hasPoints)universalesPoints=(universalesPoints||0)+holePoints;if(Number.isFinite(hole.stablefordPoints))stablefordPoints=(stablefordPoints||0)+hole.stablefordPoints}const currentHole=holes.length?Math.max(...holes.map(hole=>Number(hole.hole))):0;return{holes:holes.length,currentHole,gross,net,relativeToPar,...(universalesPoints===null?{}:{universalesPoints}),...(stablefordPoints===null?{}:{stablefordPoints}),finished:holes.length===18}}
  function tournamentPlayers(streams){
    const values=streams instanceof Map?[...streams.values()]:Array.isArray(streams)?streams:[];
    const consolidated=new Map();
    for(const stream of values){const snapshot=stream&&stream.snapshot;if(!snapshot)continue;for(const player of snapshot.players||[]){const groupLabel=stream.groupLabel||snapshot.groupLabel||"GRUPO",key=snapshot.personal?String(player.participantId||stream.id+":"+player.id):fold(groupLabel)+"|"+fold(player.name),existing=consolidated.get(key),holes=new Map(uniquePlayerHoles(existing?.player).map(hole=>[Number(hole.hole),hole]));let conflicts=existing?.conflicts||0;for(const hole of uniquePlayerHoles(player)){const prior=holes.get(Number(hole.hole));if(!prior)holes.set(Number(hole.hole),hole);else if(JSON.stringify([prior.gross,prior.net,prior.explicitX])!==JSON.stringify([hole.gross,hole.net,hole.explicitX]))conflicts+=1}const merged={...player,holes:[...holes.values()].sort((a,b)=>a.hole-b.hole)},totals=livePlayerTotals(merged),category=CATEGORY_LABELS[player.tournamentCategory]?player.tournamentCategory:(existing?.tournamentCategory||"");consolidated.set(key,{streamId:existing?.streamId||stream.id,playerId:existing?.playerId||player.id,name:existing?.name||player.name,tournamentCategory:category,categoryLabel:categoryLabel(category),groupLabel,course:snapshot.course||existing?.course||"CAMPO",mode:snapshot.mode||existing?.mode||"general",status:snapshot.status||existing?.status||"active",conflicts,...totals,player:merged,snapshot})}}
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
  function favoriteStreams(streams){const combined=demoTournamentStreams();for(const [id,stream] of generalStreamMap(streams))combined.set(id,stream);return combined}
  function categoryIndex(streams){const index={};for(const item of tournamentPlayers(streams)){const key=item.tournamentCategory||"uncategorized";(index[key]||(index[key]=[])).push(item)}return index}
  function visibleTournamentPlayers(streams){
    const category=selectedCategory(),course=selectedCourse();
    return tournamentPlayers(streams).filter(item=>(category==="all"||item.tournamentCategory===category)&&(course==="all"||courseKey(item.course)===course));
  }
  function rankingValue(item){return item.mode==="universales"?-(item.universalesPoints??0):item.mode==="stableford"?-(item.stablefordPoints??0):item.relativeToPar}
  function compareTournamentPlayers(left,right){return rankingValue(left)-rankingValue(right)||right.holes-left.holes||fold(left.name).localeCompare(fold(right.name))}
  function sortRoundPlayers(players){return[...(players||[])].sort((left,right)=>rankingValue(left)-rankingValue(right)||right.currentHole-left.currentHole||fold(left.name).localeCompare(fold(right.name)))}
  function buildLeaderboard(streams,filtered=true){
    const players=(filtered?visibleTournamentPlayers(streams):tournamentPlayers(streams)).sort(compareTournamentPlayers);
    const tieCounts=new Map();for(const item of players){const value=rankingValue(item),key=item.mode+":"+value+":"+item.holes;tieCounts.set(key,(tieCounts.get(key)||0)+1)}
    let previous=null,rank=0;return players.map((item,index)=>{const value=rankingValue(item),key=item.mode+":"+value+":"+item.holes;if(previous===null||key!==previous)rank=index+1;previous=key;return{...item,rank,rankLabel:(tieCounts.get(key)||0)>1?`T${rank}`:String(rank)}})
  }
  function categoryScoreboardRows(streams,category="all"){
    const selected=CATEGORY_LABELS[category]?category:"all",course=selectedCourse(),players=tournamentPlayers(streams).filter(item=>(selected==="all"||item.tournamentCategory===selected)&&(course==="all"||courseKey(item.course)===course));
    const ranked=buildLeaderboard(players.map(item=>({id:item.streamId,groupLabel:item.groupLabel,snapshot:{mode:item.mode,course:item.course,players:[item.player]}})),false);
    const rankByPlayer=new Map(ranked.map(item=>[item.streamId+":"+item.playerId,item.rankLabel]));
    return players.sort(compareTournamentPlayers).map(item=>{
      const holes=new Map(uniquePlayerHoles(item.player).map(hole=>[Number(hole.hole),hole]));
      const segment=numbers=>numbers.reduce((sum,hole)=>{const value=holes.get(hole);if(!value||value.explicitX)return sum;const gross=Number(value.gross),net=Number(value.net),par=Number(value.par);if(Number.isFinite(gross))sum.gross+=gross;if(Number.isFinite(net))sum.net+=net;if(Number.isFinite(net)&&Number.isFinite(par))sum.result+=net-par;sum.holes+=1;return sum},{gross:0,net:0,result:0,holes:0});
      return{...item,rankLabel:rankByPlayer.get(item.streamId+":"+item.playerId)||"—",holeValues:Array.from({length:18},(_,index)=>{const hole=holes.get(index+1);if(!hole)return null;if(hole.explicitX)return{gross:"X",net:"—",result:"—"};const result=Number.isFinite(Number(hole.relativeToPar))?Number(hole.relativeToPar):Number(hole.net)-Number(hole.par);return{gross:hole.gross,net:hole.net,result:relation(result)}}),inTotals:segment([1,2,3,4,5,6,7,8,9]),outTotals:segment([10,11,12,13,14,15,16,17,18]),totalTotals:segment(Array.from({length:18},(_,index)=>index+1))};
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

  function uniqueFavoritePlayers(resolved){
    // Prefer an individually followed player when their group is followed too.
    const ordered=[...resolved.filter(row=>row.item.kind!=="group"),...resolved.filter(row=>row.item.kind==="group")],seen=new Set();
    return ordered.map(row=>({...row,players:row.players.filter(player=>{const key=(row.stream?.id||row.item.streamId)+":"+player.id;if(seen.has(key))return false;seen.add(key);return true})})).filter(row=>!row.stream||row.players.length);
  }
  function setStatus(message,tone){
    const target=$("hubState");if(!target)return;target.textContent=message;target.className="state"+(tone?" "+tone:"");
  }
  function directoryEventKind(token){return /^directory_private_/.test(String(token||''))?'private':(root.GSCPersonalEvents?.descriptor(token)||root.GSCOneUseLive?.descriptor(token))?.eventKind}
  async function read(kind,token,payload){
    const directory=String(token||'').match(/^directory_(?:(private)_)?(lab|production)_([0-9a-f-]{36})$/i);
    if(directory){try{const response=await root.fetch('/api/tournament-score-directory',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',credentials:'same-origin',body:JSON.stringify({action:'read',source:directory[2],eventId:directory[3],eventKind:directory[1]?'private':'tournament'})}),body=await response.json();return{...body,ok:response.ok&&body?.ok!==false,status:response.status}}catch{return{ok:false,code:'NETWORK_ERROR'}}}
    if(root.GSCPersonalEvents?.descriptor(token))return root.GSCPersonalEvents.read(token,payload);
    if(String(token).startsWith("oneuse_")&&root.GSCOneUseLive)return root.GSCOneUseLive.read(token,payload);
    let response;try{response=await root.fetch("/api/live",{method:"POST",headers:{"Content-Type":"application/json"},cache:"no-store",credentials:"same-origin",body:JSON.stringify(Object.assign({action:"read",kind:kind,viewerToken:token},payload||{}))})}catch{return{ok:false,code:"NETWORK_ERROR"}}
    const body=await response.json().catch(()=>({ok:false,code:"HTTP_"+response.status}));return Object.assign({},body,{ok:response.ok&&body&&body.ok!==false,status:response.status});
  }
  function errorMessage(code){return({NETWORK_ERROR:"SIN SEÑAL · CONSERVANDO LA ÚLTIMA VISTA",LIVE_LINK_INVALID:"ENLACE LIVE INVÁLIDO",LIVE_REVOKED:"UN ENLACE FUE REVOCADO",LIVE_EXPIRED:"UN ENLACE LIVE CADUCÓ",LIVE_RATE_LIMITED:"DEMASIADAS CONSULTAS · REINTENTANDO"})[String(code||"")]||shareAccessMessage(code)}

  async function loadGeneral(){
    if(!tokenOk(state.generalToken))return{ok:true,empty:true};
    let result=await read("tournament",state.generalToken,{sinceRevision:generalRevision,limit:50});
    if(!result.ok||result.unchanged){if(root.GSCPersonalEvents?.descriptor(state.generalToken)&&['PERSONAL_EVENT_FORBIDDEN','ACCOUNT_UNAUTHORIZED','LIVE_EXPIRED','CODE_SESSION_EXPIRED','CODE_SESSION_REVOKED'].includes(result.code)){general=null;generalStreams.clear();tournamentStreams.delete(state.generalToken)}return result;}
    general=result.tournament||general;generalRevision=Number(result.tournament&&result.tournament.revision||result.revision)||0;const next=new Map();
    for(const stream of result.streams||[])next.set(stream.id,stream);
    let cursor=result.nextCursor||null;const seenCursors=new Set();
    while(cursor&&!seenCursors.has(cursor)){seenCursors.add(cursor);result=await read("tournament",state.generalToken,{cursor:cursor,limit:50});if(!result.ok)break;for(const stream of result.streams||[])next.set(stream.id,stream);cursor=result.nextCursor||null}
    if(next.size||!result.unchanged){generalStreams=next;tournamentStreams.set(state.generalToken,new Map(next))}if(general&&state.generalToken&&directoryEventKind(state.generalToken)!=='private'){const saved=upsertTournamentState(state,state.generalToken,general.name||"TORNEO LIVE");state=saved.full?{...saved.state,generalToken:state.generalToken}:saved.state;saveState()}return result;
  }
  async function readTournamentStreams(token){
    if(!tokenOk(token))return null;
    let result=await read("tournament",token,{limit:50});if(!result.ok)return null;
    const next=new Map();for(const stream of result.streams||[])next.set(stream.id,stream);
    let cursor=result.nextCursor||null,guard=new Set();
    while(cursor&&!guard.has(cursor)){guard.add(cursor);result=await read("tournament",token,{cursor,limit:50});if(!result.ok)break;for(const stream of result.streams||[])next.set(stream.id,stream);cursor=result.nextCursor||null}
    return next;
  }
  async function loadFollowTournaments(){
    const tokens=[...new Set(normalizeHubState(state).follows.map(item=>item.tournamentToken).filter(token=>tokenOk(token)&&token!==state.generalToken))];
    await Promise.all(tokens.map(async token=>{const streams=await readTournamentStreams(token);if(streams)tournamentStreams.set(token,streams)}));
  }
  function allTournamentStreams(){
    const combined=new Map();
    for(const streams of tournamentStreams.values())for(const [id,stream] of streams)combined.set(id,stream);
    for(const [id,stream] of generalStreams)combined.set(id,stream);
    return combined;
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
    if(!resolved.stream||!resolved.players.length)return'<article class="favorite"><header class="favorite-head"><div><h3>'+escapeHtml(resolved.item.label)+'</h3><small>ENLACE NO DISPONIBLE, CADUCADO O REVOCADO</small></div><button class="remove" aria-label="Quitar seguimiento de '+escapeHtml(resolved.item.label)+'" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header></article>';
    const snapshot=resolved.stream.snapshot;
    return resolved.players.map(player=>{const totals=livePlayerTotals(player),rank=rankByPlayer.get(resolved.stream.id+":"+player.id)||"—";return'<article class="favorite"><header class="favorite-head"><div><h3>'+escapeHtml(player.name)+'</h3><small>'+escapeHtml(resolved.stream.groupLabel||snapshot.groupLabel)+' · '+escapeHtml(snapshot.course||"CAMPO")+(rank==='—'?'':' · POSICIÓN GENERAL '+escapeHtml(rank))+'</small></div><button class="remove" aria-label="Quitar seguimiento de '+escapeHtml(resolved.item.label)+'" data-remove="'+escapeHtml(resolved.item.key)+'">×</button></header><div class="favorite-body"><div class="favorite-totals"><div><small>HOYO ACTUAL</small><b>'+(totals.finished?'FINAL':escapeHtml(totals.currentHole||'—'))+'</b></div><div><small>GROSS</small><b>'+escapeHtml(totals.gross)+'</b></div><div><small>NETO</small><b>'+escapeHtml(totals.net)+'</b></div><div><small>+/−</small><b class="'+(totals.relativeToPar<0?"under":totals.relativeToPar>0?"over":"")+'">'+relation(totals.relativeToPar)+'</b></div></div>'+'<details data-favorite-detail="'+escapeHtml(resolved.stream.id+':'+player.id)+'"'+(expandedFavorites.has(resolved.stream.id+':'+player.id)?' open':'')+'><summary>VER HOYO POR HOYO</summary>'+scoreRows(player,snapshot)+'</details>'+'</div></article>'}).join("");
  }
  function renderFavorites(){
    const visible=displayStreams(),streams=favoriteStreams(allTournamentStreams()),target=$("hubFavorites"),resolved=resolveFollows({...state,follows:state.follows.filter(item=>!root.GSCPersonalEvents?.descriptor(item.token)||root.GSCPersonalEvents.membership(item.token))},streams,externalStreams);if(!target)return;const rankByPlayer=new Map();for(const tournamentMap of tournamentStreams.values())for(const item of buildLeaderboard(tournamentMap,false))rankByPlayer.set(item.streamId+":"+item.playerId,item.rankLabel);for(const item of buildLeaderboard(visible,false))rankByPlayer.set(item.streamId+":"+item.playerId,item.rankLabel);
    if(root.GSCScoresUI&&!root.document.body.classList.contains('public-display')){
      const rows=uniqueFavoritePlayers(resolved).flatMap(row=>row.stream&&row.players.length?row.players.map(player=>({player,snapshot:row.stream.snapshot,item:row.item})):[{unavailable:true,item:row.item}]);
      target.innerHTML=rows.length?rows.map((row,index)=>row.unavailable?'<article class="scores-favorite"><header><h3>'+escapeHtml(row.item.label)+'</h3><button type="button" data-score-remove="'+escapeHtml(row.item.key)+'" aria-label="Quitar favorito '+escapeHtml(row.item.label)+'">★</button></header><p>ENLACE NO DISPONIBLE, CADUCADO O REVOCADO</p></article>':'<article class="scores-favorite" data-score-player="'+index+'" tabindex="0"><header><h3>'+escapeHtml(row.player.name)+'</h3><button type="button" data-score-remove="'+escapeHtml(row.item.key)+'" aria-label="Quitar favorito '+escapeHtml(row.player.name)+'">★</button></header><small>'+escapeHtml(categoryLabel(row.player.tournamentCategory))+'</small><p>G/N = GROSS / NETO</p>'+root.GSCScoresUI.grid(row.player)+'</article>').join(''):'<div class="empty">TODAVÍA NO TIENES FAVORITOS DISPONIBLES.</div>';
      root.GSCScoresUI.bindRows(target,rows.map(row=>({...row,eventName:row.item.tournamentLabel||general?.name})));target.querySelectorAll('[data-score-remove]').forEach(button=>button.onclick=()=>{state=removeFollowFromState(state,button.dataset.scoreRemove);saveState();renderAll()});return;
    }
    target.innerHTML=resolved.length?uniqueFavoritePlayers(resolved).map(item=>favoriteCard(item,rankByPlayer)).join(""):'<div class="empty">EN EL MONITOR DEL TORNEO, BUSCA UN JUGADOR Y TOCA + SEGUIR.</div>';
    target.querySelectorAll("[data-favorite-detail]").forEach(detail=>detail.ontoggle=()=>{if(detail.open)expandedFavorites.add(detail.dataset.favoriteDetail);else expandedFavorites.delete(detail.dataset.favoriteDetail)});
    target.querySelectorAll("[data-remove]").forEach(button=>button.onclick=()=>{state=removeFollowFromState(state,button.dataset.remove);saveState();renderAll()});
  }
  function renderSummary(){
    const streams=displayStreams(),target=$("hubSummary"),players=tournamentPlayers(streams);if(!target)return;
    if(!state.generalToken&&!demoMode()){target.innerHTML='<div><small>GENERAL</small><strong>NO CONECTADA</strong></div>';return}
    const holes=players.reduce((sum,item)=>sum+item.holes,0),complete=players.filter(item=>item.holes===18).length;
    target.innerHTML='<div><small>TORNEO</small><strong>'+escapeHtml(general&&general.name||(demoMode()?"DEMOSTRACIÓN":"TORNEO EN VIVO"))+'</strong></div><div><small>GRUPOS</small><strong>'+streams.size+'</strong></div><div><small>JUGADORES</small><strong>'+players.length+'</strong></div><div><small>FINALIZADOS</small><strong>'+complete+' · '+holes+' HOYOS</strong></div>';
  }
  function renderLeaderboard(){
    const wrap=$("hubLeaderWrap");if(!wrap)return;const rows=buildLeaderboard(displayStreams()),showPoints=rows.some(item=>item.mode==="universales"||item.mode==="stableford");
    if(root.GSCScoresUI&&!root.document.body.classList.contains('public-display')){renderCompactScores(wrap,rows);return}
    if(!rows.length){wrap.innerHTML='<div class="empty">'+(buildLeaderboard(displayStreams(),false).length?"NO HAY JUGADORES CON ESTOS FILTROS · PRUEBA OTRA CATEGORÍA O CAMPO.":state.generalToken||demoMode()?"TODAVÍA NO HAY SCORE CARDS PUBLICADAS.":"ABRE EL TORNEO PARA VER SUS RESULTADOS EN VIVO.")+'</div>';return}
    if(isRoundTournament(state.generalToken)){
      const ordered=sortRoundPlayers(rows);
      wrap.innerHTML='<table class="leader friends-leader"><thead><tr><th>NOMBRE</th><th>HDCP</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/-</th></tr></thead><tbody>'+ordered.map(item=>'<tr><td>'+escapeHtml(item.name)+'</td><td>'+escapeHtml(item.player?.handicap??"—")+'</td><td>'+(item.finished?"FINAL":item.currentHole||"—")+'</td><td>'+item.gross+'</td><td>'+item.net+'</td><td class="'+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+'">'+relation(item.relativeToPar)+'</td></tr>').join("")+'</tbody></table>';
      return;
    }
    const followed=new Set(state.follows.map(item=>item.streamId+":"+item.playerId));
    wrap.innerHTML='<table class="leader"><thead><tr><th>POS</th><th>JUGADOR</th><th>HOYO ACTUAL</th><th>GROSS</th><th>NETO</th>'+(showPoints?'<th>PUNTOS</th>':'')+'<th>RESULTADO</th><th>CATEGORÍA</th><th>SEGUIR</th></tr></thead><tbody>'+rows.map(item=>{const key=item.streamId+":"+item.playerId,isFollowed=followed.has(key),progress=item.finished?"FINAL":item.currentHole?String(item.currentHole):"—";return"<tr><td>"+item.rankLabel+"</td><td>"+escapeHtml(item.name)+"</td><td>"+progress+"</td><td>"+item.gross+"</td><td>"+item.net+"</td>"+(showPoints?"<td>"+(item.mode==="universales"?item.universalesPoints:item.mode==="stableford"?item.stablefordPoints??"—":"—")+"</td>":"")+"<td class=\""+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+"\">"+relation(item.relativeToPar)+"</td><td><span class=\"category-chip category-"+escapeHtml(item.tournamentCategory||"none")+"\">"+escapeHtml(categoryShortLabel(item.tournamentCategory))+"</span></td><td><button class=\"star\" data-follow-stream=\""+escapeHtml(item.streamId)+"\" data-follow-player=\""+escapeHtml(item.playerId)+"\" aria-label=\"Seguir a "+escapeHtml(item.name)+"\">"+(isFollowed?"★ PERSONA":"＋ PERSONA")+"</button><button class=\"star\" data-follow-group=\""+escapeHtml(item.streamId)+"\" aria-label=\"Seguir grupo "+escapeHtml(item.groupLabel)+"\">＋ GRUPO</button></td></tr>"}).join("")+"</tbody></table>";
    wrap.querySelectorAll("[data-follow-stream]").forEach(button=>button.onclick=()=>{const item=rows.find(row=>row.streamId===button.dataset.followStream&&row.playerId===button.dataset.followPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",tournamentToken:state.generalToken,tournamentLabel:general?.name||"TORNEO",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();renderAll();showMonitor("individual");setStatus(item.name+" AGREGADO AL TABLERO DE MIS FAVORITOS","")}});
    wrap.querySelectorAll("[data-follow-group]").forEach(button=>button.onclick=()=>{const item=rows.find(row=>row.streamId===button.dataset.followGroup);if(item){state=addFollowToState(state,{key:item.streamId+":group",kind:"group",tournamentToken:state.generalToken,tournamentLabel:general?.name||"TORNEO",streamId:item.streamId,playerId:"",label:item.groupLabel,groupLabel:item.groupLabel});saveState();renderAll();showMonitor("individual");setStatus(item.groupLabel+" AGREGADO AL TABLERO DE MIS FAVORITOS","")}});
  }
  function categoryCell(value){return value?'<span><b>'+escapeHtml(value.gross)+'</b><i>'+escapeHtml(value.net)+'</i><em>'+escapeHtml(value.result)+'</em></span>':'<span class="pending">—</span>'}
  function toggleScoreFavorite(item){
    const key=item.streamId+':'+item.playerId,existing=state.follows.find(row=>row.key===key);
    state=existing?removeFollowFromState(state,key):addFollowToState(state,{key,kind:'player',tournamentToken:state.generalToken,tournamentLabel:general?.name||'TORNEO',streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();renderAll();
  }
  function renderCompactScores(wrap,rows){
    const query=fold($('hubSearch')?.value),visible=rows.filter(row=>(activeMonitor!=="individual"||state.follows.some(item=>item.streamId===row.streamId&&(item.kind==="group"||item.playerId===row.playerId)))&&(!query||fold(row.name).includes(query))),followed=new Set(state.follows.map(row=>row.streamId+':'+row.playerId));
    if((root.GSCPersonalEvents?.descriptor(state.generalToken)||root.GSCOneUseLive?.descriptor(state.generalToken))?.eventKind==='private'||/^directory_private_/.test(String(state.generalToken||''))){wrap.innerHTML=visible.length?'<table class="scores-compact"><thead><tr><th>NOMBRE</th><th>HDCP</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/−</th></tr></thead><tbody>'+visible.map((row,index)=>'<tr data-score-player="'+index+'" tabindex="0"><td>'+escapeHtml(row.name)+'</td><td>'+escapeHtml(row.player?.handicap??'—')+'</td><td>'+(row.currentHole||'—')+'</td><td>'+(row.holes?row.gross:'—')+'</td><td>'+(row.holes?row.net:'—')+'</td><td>'+(row.holes?(row.relativeToPar===0?'EVEN':relation(row.relativeToPar)):'—')+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">TODAVÍA NO HAY SCORES EN ESTA RONDA.</div>';root.GSCScoresUI.bindRows(wrap,visible.map(row=>({...row,eventName:general?.name})));return}
    wrap.innerHTML=visible.length?'<table class="scores-compact"><thead><tr><th>NOMBRE</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/−</th></tr></thead><tbody>'+visible.map((row,index)=>'<tr data-score-player="'+index+'" tabindex="0" aria-label="'+escapeHtml(row.name)+' · Ver 18 scores"><td><div class="scores-name"><button type="button" data-score-favorite="'+index+'" aria-label="'+(followed.has(row.streamId+':'+row.playerId)?'Quitar':'Agregar')+' favorito '+escapeHtml(row.name)+'" aria-pressed="'+followed.has(row.streamId+':'+row.playerId)+'">'+(followed.has(row.streamId+':'+row.playerId)?'★':'☆')+'</button><span><strong>'+escapeHtml(row.name)+'</strong><small>'+escapeHtml(row.categoryLabel)+'</small></span></div></td><td>'+(row.currentHole||'—')+'</td><td>'+(row.holes?row.gross:'—')+'</td><td class="scores-net">'+(row.holes?row.net:'—')+'</td><td class="'+(row.relativeToPar<0?'under':row.relativeToPar>0?'over':'under')+'">'+(row.holes?(row.relativeToPar===0?'EVEN':relation(row.relativeToPar)):'—')+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">NO HAY SCORES DISPONIBLES CON ESTOS FILTROS.</div>';
    root.GSCScoresUI.bindRows(wrap,visible.map(row=>({...row,eventName:general?.name})));wrap.querySelectorAll('[data-score-favorite]').forEach(button=>button.onclick=event=>{event.stopPropagation();toggleScoreFavorite(visible[Number(button.dataset.scoreFavorite)])});
  }
  function totalCell(value){return categoryCell(value&&value.holes?{gross:value.gross,net:value.net,result:relation(value.result)}:null)}
  function liveDate(value){const date=new Date(value||Date.now());return Number.isFinite(date.getTime())?new Intl.DateTimeFormat("es-GT",{timeZone:"America/Guatemala",day:"2-digit",month:"2-digit",year:"numeric"}).format(date):"—"}
  function modeLabel(value){return({general:"MEDAL PLAY NORMAL",stableford:"STABLEFORD",match_play:"MATCH PLAY",four_ball:"FOUR BALL",universales:"UNIVERSALES"})[value]||text(value,30).toUpperCase()||"MEDAL PLAY NORMAL"}
  // Keep scroll containers mounted while LIVE refreshes; replacing them cancels
  // touch momentum and returns the spectator to hole 1 every polling cycle.
  function updateCategoryCardContent(target,html){
    const selectors=[".category-card-head",".category-ranking",".category-detail-title",".category-score"];
    if(!target.querySelector(".category-score-wrap")){target.innerHTML=html;return}
    const next=root.document.createElement("div");next.innerHTML=html;
    for(const selector of selectors){
      const current=target.querySelector(selector),replacement=next.querySelector(selector);
      if(!current||!replacement){target.innerHTML=html;return}
      if(current.innerHTML!==replacement.innerHTML)current.innerHTML=replacement.innerHTML;
    }
  }
  function renderCategoryCard(){
    const target=$("hubCategoryCard"),button=$("hubCategoryCardToggle");if(!target||!button)return;
    if(root.GSCScoresUI&&!root.document.body.classList.contains('public-display')){target.classList.add('hidden');return}
    target.classList.toggle("hidden",!categoryCardOpen);button.setAttribute("aria-expanded",String(categoryCardOpen));button.textContent=categoryCardOpen?"OCULTAR DETALLE LIVE":"VER DETALLE LIVE DE CATEGORÍA";if(!categoryCardOpen)return;
    const category=selectedCategory(),rows=categoryScoreboardRows(displayStreams(),category),label=category==="all"?"GENERAL":categoryLabel(category);
    if(!rows.length){target.innerHTML='<div class="empty">NO HAY JUGADORES PUBLICADOS EN '+escapeHtml(label)+'.</div>';return}
    const first=rows[0],tournament=text(first.snapshot.tournament,120).toUpperCase()||"TORNEO",date=liveDate(first.snapshot.playedAt),mode=modeLabel(first.mode),showPoints=rows.some(item=>item.mode==="universales"||item.mode==="stableford");
    const heads=Array.from({length:18},(_,index)=>'<th>'+(index+1)+'</th>').join("");
    const ranking=rows.map(item=>'<tr><td>'+escapeHtml(item.rankLabel||"—")+'</td><td><b>'+escapeHtml(item.name)+'</b></td><td>'+escapeHtml(item.player.handicap)+'</td><td><span class="category-chip category-'+escapeHtml(item.tournamentCategory||"none")+'">'+escapeHtml(categoryShortLabel(item.tournamentCategory))+'</span></td><td>'+(item.finished?'FINAL':item.currentHole||'—')+'</td><td>'+item.gross+'</td><td>'+item.net+'</td>'+(showPoints?'<td class="category-points">'+(item.mode==="universales"?item.universalesPoints:item.mode==="stableford"?item.stablefordPoints??"—":"—")+'</td>':'')+'<td class="'+(item.relativeToPar<0?"under":item.relativeToPar>0?"over":"")+'">'+relation(item.relativeToPar)+'</td></tr>').join("");
    updateCategoryCardContent(target,'<header class="category-card-head"><div class="category-event-meta"><span><small>FECHA</small><b>'+escapeHtml(date)+'</b></span><span><small>TORNEO</small><b>'+escapeHtml(tournament)+'</b></span><span><small>MODALIDAD</small><b>'+escapeHtml(mode)+'</b></span></div><strong>'+escapeHtml(label)+'</strong><small>'+rows.length+' JUGADORES EN VIVO</small></header><div class="category-ranking-wrap"><table class="category-ranking"><thead><tr><th>POS</th><th>NOMBRE</th><th>HDCP</th><th>CATEGORÍA</th><th>HOYO</th><th>GROSS</th><th>NETO</th>'+(showPoints?'<th>PUNTOS</th>':'')+'<th>+/−</th></tr></thead><tbody>'+ranking+'</tbody></table></div><div class="category-detail-title">DETALLE POR HOYO · GROSS / NETO / RESULTADO</div><div class="category-score-wrap"><table class="category-score"><thead><tr><th>POS</th><th>JUGADOR</th>'+heads+'<th>IN</th><th>OUT</th><th>TOTAL</th></tr></thead><tbody>'+rows.map(item=>'<tr><td>'+escapeHtml(item.rankLabel||"—")+'</td><td><b>'+escapeHtml(item.name)+'</b><small>'+escapeHtml(item.groupLabel)+'</small></td>'+item.holeValues.map(categoryCell).map(cell=>'<td>'+cell+'</td>').join("")+'<td>'+totalCell(item.inTotals)+'</td><td>'+totalCell(item.outTotals)+'</td><td>'+totalCell(item.totalTotals)+'</td></tr>').join("")+'</tbody></table></div>');
  }
  function renderSearch(){
    const target=$("hubSearchResults"),query=fold($("hubSearch")&&$("hubSearch").value);if(!target)return;
    if(!query){target.innerHTML="";return}
    const matches=tournamentPlayers(displayStreams()).filter(item=>fold(item.name).includes(query)||fold(item.groupLabel).includes(query)||fold(item.categoryLabel).includes(query)).sort((left,right)=>fold(left.name).localeCompare(fold(right.name),"es")).slice(0,100);
    const generalRanking=buildLeaderboard(displayStreams(),false),categoryRankings=new Map();
    const searchPosition=item=>{
      const overall=generalRanking.find(row=>row.streamId===item.streamId&&row.playerId===item.playerId);
      if(!categoryRankings.has(item.tournamentCategory))categoryRankings.set(item.tournamentCategory,buildLeaderboard(new Map([...displayStreams()].map(([key,stream])=>[key,{...stream,snapshot:{...stream.snapshot,players:(stream.snapshot?.players||[]).filter(player=>player.tournamentCategory===item.tournamentCategory)}}])),false));
      const category=categoryRankings.get(item.tournamentCategory).find(row=>row.streamId===item.streamId&&row.playerId===item.playerId);
      return 'GENERAL '+escapeHtml(overall?.rankLabel||'—')+' · CATEGORÍA '+escapeHtml(category?.rankLabel||'—');
    };
    target.innerHTML=matches.length?matches.map(item=>'<div class="search-row"><div><strong>'+escapeHtml(item.name)+'</strong><small><span class="category-chip category-'+escapeHtml(item.tournamentCategory||"none")+'">'+escapeHtml(categoryShortLabel(item.tournamentCategory))+'</span> · '+escapeHtml(item.groupLabel)+' · '+item.holes+'/18 HOYOS · NETO '+item.net+' · '+searchPosition(item)+'</small></div><div><button class="follow-button" data-search-stream="'+escapeHtml(item.streamId)+'" data-search-player="'+escapeHtml(item.playerId)+'">+ PERSONA</button><button class="follow-button" data-search-group="'+escapeHtml(item.streamId)+'">+ GRUPO</button></div></div>').join(""):'<div class="empty">NO ENCONTRÉ ESE NOMBRE EN EL MONITOR DEL TORNEO.</div>';
    target.querySelectorAll("[data-search-stream]").forEach(button=>button.onclick=()=>{const item=matches.find(row=>row.streamId===button.dataset.searchStream&&row.playerId===button.dataset.searchPlayer);if(item){state=addFollowToState(state,{key:item.streamId+":"+item.playerId,kind:"player",tournamentToken:state.generalToken,tournamentLabel:general?.name||"TORNEO",streamId:item.streamId,playerId:item.playerId,label:item.name,groupLabel:item.groupLabel});saveState();$("hubSearch").value="";renderAll();showMonitor("individual");setStatus(item.name+" AGREGADO AL TABLERO DE MIS FAVORITOS","")}});
    target.querySelectorAll("[data-search-group]").forEach(button=>button.onclick=()=>{const item=matches.find(row=>row.streamId===button.dataset.searchGroup);if(item){state=addFollowToState(state,{key:item.streamId+":group",kind:"group",tournamentToken:state.generalToken,tournamentLabel:general?.name||"TORNEO",streamId:item.streamId,playerId:"",label:item.groupLabel,groupLabel:item.groupLabel});saveState();$("hubSearch").value="";renderAll();showMonitor("individual");setStatus(item.groupLabel+" AGREGADO AL TABLERO DE MIS FAVORITOS","")}});
  }
  function displayScenes(){
    const available=categoryIndex(displayStreams()),categories=Object.keys(CATEGORY_LABELS).filter(key=>(available[key]||[]).length);
    return["all",...categories];
  }
  function applyDisplayScene(){
    if(!root.document.body.classList.contains("public-display"))return;
    const scenes=displayScenes(),scene=scenes[displaySceneIndex%Math.max(1,scenes.length)]||"all",category=$("hubCategory");
    if(category)category.value=scene;
    const isGeneral=scene==="all";
    root.document.body.classList.toggle("display-general",isGeneral);
    root.document.body.classList.toggle("display-category",!isGeneral);
    categoryCardOpen=!isGeneral;
    renderSummary();renderLeaderboard();renderCategoryCard();
    const label=isGeneral?"GENERAL":categoryLabel(scene),target=$("publicDisplayScene");
    if(target)target.textContent=label;
  }
  function scheduleDisplayRotation(){
    if(!root.document.body.classList.contains("public-display"))return;
    clearTimeout(displayTimer);clearInterval(displayCountdownTimer);
    let remaining=DISPLAY_MS/1000;const countdown=$("publicDisplayCountdown");if(countdown)countdown.textContent=String(remaining);
    displayCountdownTimer=setInterval(()=>{remaining=Math.max(0,remaining-1);if(countdown)countdown.textContent=String(remaining)},1000);
    displayTimer=setTimeout(()=>{const scenes=displayScenes();displaySceneIndex=(displaySceneIndex+1)%Math.max(1,scenes.length);applyDisplayScene();scheduleDisplayRotation()},DISPLAY_MS);
  }
  function openPublicDisplay(){
    const url=tournamentDisplayUrl(state.generalToken,root.location.origin,root.location.href,demoMode());
    if(!url){setStatus("ABRE PRIMERO UN TORNEO","warning");return false}
    root.open(url,"_blank","noopener,noreferrer");return true;
  }
  function activatePublicDisplay(){
    root.document.body.classList.add("public-display","display-general");
    tournamentPortalOpen=false;activeMonitor="general";categoryCardOpen=false;displaySceneIndex=0;
    applyDisplayScene();scheduleDisplayRotation();
    return true;
  }

  function renderCourseFilter(){
    const select=$("hubCourse");if(!select)return;
    const current=selectedCourse(),courses=[...new Set(tournamentPlayers(displayStreams()).map(item=>text(item.course,120)).filter(Boolean))].sort((a,b)=>fold(a).localeCompare(fold(b),"es"));
    select.innerHTML='<option value="all">TODOS LOS CLUBES / CAMPOS</option>'+courses.map(course=>'<option value="'+escapeHtml(courseKey(course))+'">'+escapeHtml(course)+'</option>').join("");
    select.value=courses.some(course=>courseKey(course)===current)?current:"all";
  }
  let registeredDirectory=[],membershipVerified=false;
  async function refreshRegisteredDirectory(signal){
   const before=JSON.stringify([registeredDirectory,directoryPartial]);
   const redraw=()=>{if(tournamentPortalOpen&&before!==JSON.stringify([registeredDirectory,directoryPartial]))renderTournamentShelf()};
   try{const response=await root.fetch('/api/tournament-score-directory',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',credentials:'same-origin',body:JSON.stringify({action:'list'}),signal});const directory=await response.json();if(signal?.aborted)return{ok:false};if(!response.ok||!directory.ok){directoryPartial=true;redraw();return{ok:false}}
    const incoming=directory.events.map(event=>({...event,token:'directory_'+event.source+'_'+event.id,label:event.name}));
    if(directory.partial){const merged=new Map(registeredDirectory.map(item=>[item.token,item]));for(const item of incoming)merged.set(item.token,item);registeredDirectory=[...merged.values()]}else registeredDirectory=incoming;
    directoryPartial=Boolean(directory.partial);redraw();return{ok:true,partial:directoryPartial};
   }catch{if(!signal?.aborted){directoryPartial=true;redraw()}return{ok:false}}
  }
  async function safePersonalSync(api){if(!api?.sync)return{ok:false,items:[]};try{return await api.sync()||{ok:false,items:[]}}catch{return{ok:false,items:[]}}}
  function resolveDirectoryEventToken(token,items=[]){const requested=String(token||'');const listed=items.find(item=>item.token===requested);if(listed)return listed.token;return /^directory_(?:private_)?(?:lab|production)_[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(requested)?requested:''}
  let scoresPageTitle="SCORES TORNEO";
  function renderEventDeletion(){const button=$("hubDeleteEvent");if(!button)return;const authority=administrationEvents.find(event=>'personal_'+event.id===state.generalToken);button.hidden=!authority||tournamentPortalOpen;button.textContent=authority?.event_kind==='private'?'ELIMINAR GRUPO':'ELIMINAR TORNEO';button.onclick=()=>{if(authority)root.GSCPersonalEvents.openAdministration({eventId:authority.id,eventKind:authority.event_kind})}}
  function renderTournamentShelf(){renderEventDeletion();const shelf=$("hubTournamentShelf"),cards=$("hubTournamentCards"),shared=new URLSearchParams(root.location.search||"").get("shared")==="1";if(!shelf||!cards)return;const portal=tournamentPortalOpen&&!shared,items=registeredDirectory;if($('hubDirectorySync'))$('hubDirectorySync').hidden=!portal;root.document.body.classList.toggle("scores-tournament-directory",portal);if(portal){registeredTournamentsOpen=true};shelf.classList.toggle("hidden",!portal);cards.classList.toggle("hidden",!registeredTournamentsOpen);$("hubRegisteredTournaments")?.setAttribute("aria-expanded",String(registeredTournamentsOpen));$("hubSavedEventActions")?.classList.toggle("hidden",!registeredTournamentsOpen);cards.innerHTML=(items.length?items.map(item=>{const authority=administrationEvents.find(event=>'personal_'+event.id===item.token);return '<article class="tournament-event-entry"><button class="tournament-card" type="button" data-tournament="'+escapeHtml(item.token)+'">'+escapeHtml(item.label)+'<small>'+(item.demo?'67 JUGADORES':'EN VIVO')+'</small></button>'+'</article>'}).join(""):'<div class="empty">NINGÚN TORNEO EN CURSO</div>')+(directoryPartial?'<div class="empty" role="status">NO SE PUDO CARGAR EL OTRO ENTORNO · INTENTA ACTUALIZAR SCORES</div>':'');cards.querySelectorAll("[data-delete-event]").forEach(button=>button.onclick=()=>root.GSCPersonalEvents.openAdministration({eventId:button.dataset.deleteEvent,eventKind:"tournament"}));cards.querySelectorAll("[data-tournament]").forEach(button=>button.onclick=()=>button.dataset.tournament==="__demo__"?root.location.assign(tournamentHubOpenUrl("",root.location.origin,root.location.href,true)):String(button.dataset.tournament).startsWith("directory_")?selectSavedTournament(button.dataset.tournament):enterExistingTournament&&root.GSCPersonalEvents?.membership(button.dataset.tournament)?.players?.length?root.GSCPersonalEvents.openAssignedCard(root.GSCPersonalEvents.descriptor(button.dataset.tournament)):(typeof registeredDirectory!=='undefined'&&registeredDirectory.find(item=>item.token===button.dataset.tournament)?root.GSCPersonalEvents.viewDirectoryEvent(registeredDirectory.find(item=>item.token===button.dataset.tournament),selectSavedTournament):selectSavedTournament(button.dataset.tournament)));$("hubTournamentEntry")?.classList.toggle("hidden",!portal||!tournamentEntryOpen);$("hubTournamentHome")?.classList.toggle("hidden",portal||shared);$("hubGeneralPanel")?.classList.toggle("hidden",portal);$("hubIndividualPanel")?.classList.toggle("hidden",true);root.document.querySelector(".monitor-switch")?.classList.toggle("hidden",portal)}
  function resetGeneralView(){general=null;generalRevision=null;generalStreams.clear();categoryCardOpen=false;$("hubCategory")&&( $("hubCategory").value="all");$("hubSearch")&&( $("hubSearch").value="")}
  async function selectSavedTournament(token){if(!tokenOk(token))return false;const target=pendingMonitor||"general";pendingMonitor="general";tournamentEntryOpen=false;state.generalToken=token;saveState();tournamentPortalOpen=false;const roundView=isRoundTournament(token);root.document.body.classList.toggle("friends-round-view",roundView);resetGeneralView();showMonitor(target==="overview"?"general":target);if(target==="overview"){setPageTitle(directoryEventKind(token)==='private'?"SCORES MI GRUPO":"SCORES TORNEO")}if(roundView){const title=$("hubPanelTitle"),label=state.tournaments.find(item=>item.token===token)?.label;if(title)title.textContent=label?"JUGADORES · "+label:"JUGADORES"}setStatus("ABRIENDO TORNEO…","");await refresh();return true}
  function setPageTitle(value){scoresPageTitle=value;const title=$("hubPageTitle");if(title)title.textContent=value;if(root.document)root.document.title=value+" · Golf Score Card GT"} function showTournamentPortal(){root.document.body.classList.remove("hub-search-mode","hub-favorites-mode","friends-round-view");tournamentPortalOpen=true;pendingMonitor="overview";tournamentEntryOpen=false;registeredTournamentsOpen=true;setPageTitle("SCORES TORNEO");clearTimeout(timer);renderAll();setStatus("","")}
  function renderAll(){renderTournamentShelf();renderCourseFilter();renderSummary();renderLeaderboard();renderCategoryCard();renderSearch();renderFavorites();renderScoresHeading()}
  function renderScoresHeading(){
    if(!root.GSCScoresUI||root.document.body.classList.contains('public-display'))return;
    const notice=$('hubMembershipNotice');if(notice){const joined=state.tournaments.some(item=>root.GSCPersonalEvents?.descriptor(item.token)?.eventKind==='tournament'&&root.GSCPersonalEvents?.membership(item.token)?.players?.length);const directoryView=String(state.generalToken||'').startsWith('directory_');notice.hidden=directoryView||joined||root.GSCPersonalEvents?.descriptor(state.generalToken)?.eventKind==='private';notice.textContent=directoryView?'':membershipVerified?'NO PERTENECES A NINGÚN TORNEO':'NO SE PUDO COMPROBAR TU PARTICIPACIÓN · REINTENTA';}
    const visible=!tournamentPortalOpen;if($("hubScoresReturn"))$("hubScoresReturn").hidden=false;if($('hubShareGeneral')){$('hubShareGeneral').hidden=!visible;$('hubShareGeneral').disabled=!root.GSCOneUseLive?.publisher(directoryEventKind(state.generalToken)||'tournament',general?.id);}root.document.body.classList.toggle('hub-scores-view',visible);
    const privateView=directoryEventKind(state.generalToken)==='private';root.document.body.classList.toggle('private-live-view',privateView);if($('hubScoresHelp')){$('hubScoresHelp').hidden=!visible;$('hubScoresHelp').innerHTML='DOBLE TOQUE EN EL JUGADOR: VER 18 SCORES'+(privateView?'':'<span>☆ AGREGA · ★ QUITA FAVORITO</span>')}
    if(!visible){if($('hubPersonalScoreCard'))$('hubPersonalScoreCard').hidden=true;if($('hubPersonalOrganization'))$('hubPersonalOrganization').hidden=true;if($('hubMyPosition'))$('hubMyPosition').hidden=true;if($('hubEventName'))$('hubEventName').textContent='';if($('hubEventMeta'))$('hubEventMeta').textContent='';return}
    const personalMembership=root.GSCPersonalEvents?.membership(state.generalToken);
    const logo=root.document.querySelector(".head>img");if(logo){const admin=personalMembership?.role==="organizer";logo.tabIndex=admin?0:-1;logo.setAttribute("role",admin?"button":"img");logo.setAttribute("aria-label",admin?"Organización del torneo":"Golf Score Card Guatemala");logo.onclick=admin?()=>root.GSCPersonalEvents.organization(state.generalToken):null;logo.onkeydown=admin?event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();logo.click()}}:null;}
    if($('hubPersonalOrganization'))$('hubPersonalOrganization').hidden=!visible||personalMembership?.role!=='organizer';if($('hubPersonalScoreCard'))$('hubPersonalScoreCard').hidden=!visible||!personalMembership?.players?.length||general?.status==='closed';
    if($('hubMyPosition')){const content=root.GSCPersonalEvents?.positions(state.generalToken,buildLeaderboard(displayStreams(),false),row=>buildLeaderboard(new Map([...displayStreams()].map(([key,stream])=>[key,{...stream,snapshot:{...stream.snapshot,players:(stream.snapshot?.players||[]).filter(player=>player.tournamentCategory===row.tournamentCategory)}}])),false).find(item=>item.streamId===row.streamId&&item.playerId===row.playerId)?.rankLabel)||'';$('hubMyPosition').hidden=!visible||!content;$('hubMyPosition').querySelector('div').innerHTML=content}
    const snapshot=[...displayStreams().values()][0]?.snapshot||{};
    if(privateView)scoresPageTitle="SCORES MI GRUPO";setPageTitle(scoresPageTitle);if($('hubEventName'))$('hubEventName').textContent=general?.name||snapshot.tournament||'';
    if($('hubEventMeta'))$('hubEventMeta').textContent=[general?.configuration?.course||snapshot.course,privateView?'':modeLabel(general?.configuration?.mode||snapshot.mode),root.GSCScoresUI.date(general?.configuration?.playedAt||snapshot.playedAt||general?.createdAt||'')].filter(Boolean).join(' · ');
  }

  function addImported(stream,player){
    const item=player?{key:stream.id+":"+player.id,kind:"player",token:pendingImportToken,streamId:stream.id,playerId:player.id,label:player.name,groupLabel:stream.groupLabel}:{key:stream.id+":group",kind:"group",token:pendingImportToken,streamId:stream.id,playerId:"",label:stream.groupLabel,groupLabel:stream.groupLabel};
    state=addFollowToState(state,item);saveState();pendingImportToken="";$("hubPicker").classList.remove("visible");renderAll();showMonitor("individual");setStatus((player?player.name:stream.groupLabel)+" AGREGADO AL TABLERO DE MIS FAVORITOS","");
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
    if(access.kind==="general"){const saved=upsertTournamentState(state,access.token,"TORNEO CARGANDO…");if(saved.full&&!String(access.token).startsWith("oneuse_")){setStatus("MÁXIMO 5 TORNEOS GUARDADOS · QUITA UNO PARA AGREGAR OTRO","warning");return false}state=saved.full?{...saved.state,generalToken:access.token}:saved.state;saveState();tournamentPortalOpen=false;resetGeneralView();showMonitor("general");setStatus("TORNEO GUARDADO · CARGANDO RESULTADOS…","");await refresh();return true}
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
    await loadFollowTournaments();
    await loadExternal();loading=false;renderAll();
    if(result&&result.ok)setStatus(demoMode()?"TORNEO DE DEMOSTRACIÓN · DATOS DE EJEMPLO":state.generalToken?"MONITOR DEL TORNEO ACTUALIZADO · RESULTADOS + SEGUIMIENTO":state.follows.length?"FAVORITOS ACTUALIZADOS":"ELIGE UN TORNEO","");
    else setStatus(errorMessage(result&&result.code),result&&["LIVE_REVOKED","LIVE_EXPIRED","LIVE_LINK_INVALID"].includes(result.code)?"error":"warning");
    clearTimeout(timer);timer=setTimeout(refresh,POLL_MS);
  }
  function shareAccessMessage(code){return({CODE_SESSION_EXPIRED:'ESTE ENLACE LIVE VENCIÓ',CODE_SESSION_REVOKED:'ESTE ENLACE LIVE FUE REVOCADO',CODE_EVENT_CLOSED:'ESTA RONDA YA ESTÁ CERRADA',LIVE_SHARE_EVENT_CLOSED:'ESTA RONDA YA ESTÁ CERRADA',PERSONAL_EVENT_CLOSED:'ESTA RONDA YA ESTÁ CERRADA',LIVE_SHARE_EVENT_EXPIRED:'ESTE ENLACE LIVE VENCIÓ',LIVE_SHARE_REVOKED:'ESTE ENLACE LIVE FUE REVOCADO',LIVE_SHARE_EVENT_INVALID:'ENLACE LIVE INVÁLIDO',LIVE_SHARE_CODE_INVALID_OR_USED:'ESTE CÓDIGO YA SE USÓ O CADUCÓ · PIDE UNO NUEVO',LIVE_SHARE_SESSION_REQUIRED:'INGRESA EL CÓDIGO DE INVITADO',NETWORK_ERROR:'SIN CONEXIÓN · CONSERVANDO LOS ÚLTIMOS SCORES'})[code]||'NO SE PUDO VALIDAR EL ACCESO LIVE'}
  async function shareGeneral(){const kind=root.GSCPersonalEvents?.descriptor(state.generalToken)?.eventKind||root.GSCOneUseLive?.descriptor(state.generalToken)?.eventKind||'tournament';const result=await root.GSCOneUseLive?.share(kind,general?.id,general?.name);if(!result?.ok){setStatus(result?.code==='LIVE_SHARE_PLAYER_REQUIRED'?'SOLO JUGADORES INSCRITOS PUEDEN COMPARTIR LIVE':shareAccessMessage(result?.code),'warning');return false}return true}
  function showMonitor(kind){
    const individual=kind==="individual",categories=kind==="categories",add=kind==="add";
    const pageTitle=add?"BUSCAR JUGADOR":categories?"SCORES POR CATEGORÍA":individual?"MIS FAVORITOS":"SCORES GENERAL";
    if(tournamentPortalOpen&&!individual&&!state.generalToken&&!demoMode()){
      pendingMonitor=kind;tournamentEntryOpen=false;setPageTitle(pageTitle);if($("hubPanelTitle"))$("hubPanelTitle").textContent=pageTitle;renderTournamentShelf();setStatus(add?"ELIGE EL TORNEO DONDE QUIERES BUSCAR":categories?"ELIGE EL TORNEO PARA VER SU CATEGORÍA":"ELIGE EL TORNEO PARA VER RESULTADOS","warning");return
    }
    if(tournamentPortalOpen&&(individual||state.generalToken||demoMode()))tournamentPortalOpen=false;
    activeMonitor=individual?"individual":"general";
    setPageTitle(pageTitle);if($("hubPanelTitle"))$("hubPanelTitle").textContent=pageTitle;
    root.document.body.classList.toggle("hub-search-mode",add);
    root.document.body.classList.toggle("hub-favorites-mode",individual);
    renderTournamentShelf();
    $("hubGeneralPanel")?.classList.toggle("hidden",tournamentPortalOpen);
    $("hubIndividualPanel")?.classList.toggle("hidden",true);
    $("hubShowGeneral")?.classList.toggle("active",!individual&&!categories&&!add);
    $("hubShowCategories")?.classList.toggle("active",categories);
    $("hubShowIndividual")?.classList.toggle("active",add);
    $("hubAddToBoard")?.classList.toggle("active",individual);
    if(tournamentPortalOpen){setStatus("ELIGE UN TORNEO","warning");return}
    if(kind==="general"||categories||add||individual){
      if($("hubSearch"))$("hubSearch").value="";
    }
    if((add||individual)&&$("hubCategory"))$("hubCategory").value="all";
    if(kind==="general"){
      if($("hubCategory"))$("hubCategory").value="all";
      categoryCardOpen=false;
      renderAll();
    }
    if(categories){
      const select=$("hubCategory"),assignedCategories=[...new Set((root.GSCPersonalEvents?.membership(state.generalToken)?.players||[]).map(player=>player.tournamentCategory).filter(category=>Object.hasOwn(CATEGORY_LABELS,category)))];
      if(select&&assignedCategories.length===1)select.value=assignedCategories[0];
      else if(select&&select.value==="all")select.value=Object.keys(categoryIndex(displayStreams())).find(key=>Object.hasOwn(CATEGORY_LABELS,key))||"championship";
      categoryCardOpen=true;renderAll();
      setTimeout(()=>$("hubCategory")?.focus(),0);
    }
    if(add){
      setTimeout(()=>$("hubSearch")?.focus(),80);
      setStatus("BUSCAR JUGADOR","");
    }
    renderLeaderboard();renderScoresHeading();
  }
  function clearHash(){try{root.history.replaceState(null,"",root.location.pathname+root.location.search)}catch{}}
  function roundCreationStoragePrefix(draft,origin){
    if(!draft?.returnTo)return "";
    const url=new URL(draft.returnTo,origin),account=url.searchParams.get('personalAccount');
    if(url.origin!==origin||url.pathname!=='/index-grupal.html'||(account&&account!==draft.accountCode))throw new Error('INVALID_ROUND_RETURN');
    return account?'gscg-personal:'+account+':':"";
  }
  function registrationEventDraft(){
    try{const draft=JSON.parse(root.sessionStorage.getItem("gsc-registration-event-draft-v1")||"null");return draft&&draft.accountCode===root.GSCPersonalEvents?.storageSuffix()&&Array.isArray(draft.players)?draft:null}catch{return null}
  }
  function setRoundCreateDialogOpen(open){
    const dialog=$("hubRoundCreateDialog");if(!dialog)return false;
    const visible=!!open;if(visible&&!dialog.hidden)return true;dialog.hidden=!visible;dialog.setAttribute("aria-hidden",String(!visible));root.document.body.classList.toggle("round-create-open",visible);
    const nameField=$("hubRoundName"),message=$("hubRoundDialogStatus");
    if(visible){if($("hubRoundCreator"))$("hubRoundCreator").value="";const draft=registrationEventDraft();if(draft){if($("hubRoundCourse"))$("hubRoundCourse").value=draft.course;if($("hubRoundMode"))$("hubRoundMode").value=draft.mode}if(nameField)nameField.value=draft?.name||"";if($("hubRoundDate"))$("hubRoundDate").value=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Guatemala"}).format(new Date());if(message)message.textContent=state.tournaments.length>=MAX_SAVED_TOURNAMENTS?"YA TIENES 5 TORNEOS GUARDADOS":"";setTimeout(()=>nameField?.focus(),0)}
    else setTimeout(()=>$("hubCreateRound")?.focus(),0);
    return true;
  }
  async function openRoundCreate(){
    const identity=await root.GSCPersonalEvents.request("organizer-status");
    if(!identity.ok){setStatus(root.GSCPersonalEvents.message(identity.code),"warning");return false}
    if(!identity.canCreate){root.GSCPersonalEvents.authorizeOrganizer(openRoundCreate,identity.accountCode);return false}
    return setRoundCreateDialogOpen(true);
  }
  function roundCreateMessage(value,tone="warning"){const message=$("hubRoundDialogStatus");if(message)message.textContent=value;setStatus(value,tone)}
  async function submitRoundCreate(){
    const name=text($("hubRoundName")?.value,120),okButton=$("hubRoundOk");
    if(okButton?.disabled)return false;
    if(!name){roundCreateMessage("ESCRIBE EL NOMBRE DEL TORNEO O EVENTO");$("hubRoundName")?.focus();return false}
    if(state.tournaments.length>=MAX_SAVED_TOURNAMENTS){roundCreateMessage("YA TIENES 5 TORNEOS GUARDADOS");return false}
    if(okButton)okButton.disabled=true;
    const message=$("hubRoundDialogStatus");if(message)message.textContent="CREANDO TORNEO…";setStatus("CREANDO TORNEO…","");
    const creatorName=text($("hubRoundCreator")?.value,120);if(!creatorName){roundCreateMessage("ESCRIBE EL NOMBRE DEL CREADOR");if(okButton)okButton.disabled=false;return false}
    const mode=$("hubRoundMode")?.value||"general",course=text($("hubRoundCourse")?.value,120),playedAt=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Guatemala"}).format(new Date()),categories=[...root.document.querySelectorAll("#hubRoundCategories input:checked")].map(el=>el.value);
    if(!course||!playedAt||!categories.length){roundCreateMessage("COMPLETA CAMPO, FECHA Y CATEGORÍAS");if(okButton)okButton.disabled=false;return false}
    const originDraft=registrationEventDraft();
    const result=await root.GSCPersonalEvents.request("create",{eventKind:"tournament",name,mode,course,playedAt,categories,creatorName,players:originDraft?.players||[],groupLabel:originDraft?.groupLabel||""});
    if(!result.ok||!result?.viewerToken){const message=result?.code==="42703"?"TORNEOS NO DISPONIBLES · FALTA ACTUALIZAR EL SERVIDOR":result?.code==="DATABASE_NOT_CONFIGURED"||result?.code==="DATABASE_MIGRATION_REQUIRED"?"LIVE NO ESTÁ ACTIVADO EN LA BASE CENTRAL":root.GSCPersonalEvents?.message(result?.code)||"NO SE PUDO CREAR EL TORNEO";roundCreateMessage(message);if(okButton)okButton.disabled=false;return false}
    try{root.sessionStorage.removeItem("gsc-registration-event-draft-v1")}catch{}
    const saved=upsertTournamentState(state,"personal_"+result.eventId,name);
    if(saved.full){roundCreateMessage("YA TIENES 5 TORNEOS GUARDADOS");if(okButton)okButton.disabled=false;return false}
    state=saved.state;saveState();
    try{
      const storagePrefix=roundCreationStoragePrefix(originDraft,root.location.origin),liveKey=storagePrefix+"golf-score-card-gt-live-control-v1",liveSaved=JSON.parse(root.localStorage.getItem(liveKey)||"null"),liveState=liveSaved&&liveSaved.version===1?liveSaved:{version:1};
      liveState.version=1;liveState.tournamentOwned={tournamentId:result.tournamentId,name,mode,configuration:result.configuration,organizerSecret:result.organizerSecret,viewerToken:result.viewerToken,joinCode:result.joinCode,expiresAt:result.expiresAt};
      root.localStorage.setItem(liveKey,JSON.stringify(liveState));
      root.localStorage.setItem(storagePrefix+"gsc-tournament-connect-selection-v1",JSON.stringify({label:name,id:result.tournamentId,joinCode:result.joinCode,mode,configuration:result.configuration,personal:true,eventKind:"tournament",roundId:originDraft?.roundId||"",players:originDraft?.players||[],groupLabel:originDraft?.groupLabel||"",connected:false}));
      const roundTokens=JSON.parse(root.localStorage.getItem(ROUND_TOURNAMENTS_KEY)||"[]"),safeTokens=Array.isArray(roundTokens)?roundTokens.filter(token=>tokenOk(token)&&token!==result.viewerToken):[];safeTokens.push("personal_"+result.eventId);root.localStorage.setItem(ROUND_TOURNAMENTS_KEY,JSON.stringify(safeTokens.slice(-MAX_SAVED_TOURNAMENTS)));
    }catch{roundCreateMessage("NO SE PUDO PREPARAR LA TARJETA DE SCORE");if(okButton)okButton.disabled=false;return false}
    const refreshed=await root.GSCPersonalEvents.sync(),item=refreshed.items?.find(item=>item.event.eventId===result.eventId);setRoundCreateDialogOpen(false);if(item){state=upsertTournamentState(state,item.token,item.label).state;saveState();await selectSavedTournament(item.token)}root.GSCPersonalEvents.presentCreatedTournament(result,originDraft?.returnTo);if(okButton)okButton.disabled=false;return true;
  }
  async function start(){
    // Render the authorized entry immediately while account verification is pending.
    const initialParams=new URLSearchParams(root.location.search||'');tournamentPortalOpen=!demoMode()&&!parseHubHash(root.location.hash)&&!initialParams.has('liveEvent')&&!(initialParams.get('shortcut')==='scores'&&initialParams.has('personalEvent'));renderAll();
    $('hubEnterExisting').onclick=()=>{enterExistingTournament=true;registeredTournamentsOpen=true;renderTournamentShelf();$('hubSavedEventActions')?.classList.remove('hidden')};$('hubCreateRound').onclick=openRoundCreate;$('hubRegisteredTournaments').onclick=()=>{enterExistingTournament=false;registeredTournamentsOpen=!registeredTournamentsOpen;renderTournamentShelf()};
    await refreshRegisteredDirectory();
    const personal=await safePersonalSync(root.GSCPersonalEvents);membershipVerified=!!personal.ok;try{administrationEvents=await root.GSCPersonalEvents?.administrationEvents?.()||[]}catch{administrationEvents=[]}state=loadState();if(personal?.ok){state.tournaments=await root.GSCPersonalEvents.reconcile(state.tournaments);state.generalToken=await root.GSCPersonalEvents.canonicalToken(state.generalToken)}state.tournaments=state.tournaments.filter(item=>!item.token.startsWith("personal_"));if(personal?.ok)for(const item of personal.items)state=upsertTournamentState(state,item.token,item.label).state;const oneUse=await root.GSCOneUseLive?.open();const imported=oneUse?.ok?oneUse:parseHubHash(root.location.hash);if(imported&&!oneUse)clearHash();const params=new URLSearchParams(root.location.search||""),shared=params.get("shared")==="1";tournamentPortalOpen=!demoMode()&&!imported;root.document.body.classList.toggle("shared-view",shared);
    const returnTo=params.get('returnTo');let scorecardReturn=null;
    if(returnTo){try{const candidate=new URL(returnTo,root.location.origin);if(candidate.origin===root.location.origin&&candidate.pathname==='/index-grupal.html')scorecardReturn=candidate}catch{}}
    $("hubPickerClose").onclick=()=>$("hubPicker").classList.remove("visible");
    $("hubScoresReturn").textContent="×";
    $("hubScoresReturn").setAttribute("data-gsc-close","");
    $("hubScoresReturn").setAttribute('aria-label',scorecardReturn?'Cerrar Scores y regresar a mi Score Card':'Cerrar Scores');
    $("hubScoresReturn").onclick=()=>{if(scorecardReturn)return root.location.assign(scorecardReturn.toString());if(shared||params.get("display")==="1"||tournamentPortalOpen)return $("hubBack").click();showTournamentPortal()};
    $("hubBack").onclick=()=>{if(scorecardReturn){root.location.assign(scorecardReturn.toString());return}const url=new URL("/index-grupal.html",root.location.origin),personal=root.GSCPersonalEvents?.descriptor(state.generalToken);if(personal&&root.GSCPersonalEvents?.membership(state.generalToken)?.players?.length){root.GSCPersonalEvents.openAssignedCard(personal);return}const share=new URL(root.location.href).searchParams.get("_vercel_share");if(share)url.searchParams.set("_vercel_share",share);root.location.assign(url.toString())};$("hubOpenTournament").onclick=openTournamentTyped;$("hubTournamentLink").onkeydown=event=>{if(event.key==="Enter")openTournamentTyped()};
    $("hubShowGeneral").onclick=()=>showMonitor("general");$("hubShowCategories").onclick=()=>showMonitor("categories");$("hubShowIndividual").onclick=()=>showMonitor("add");$("hubAddToBoard").onclick=()=>showMonitor("individual");$("hubShareGeneral").onclick=shareGeneral;$("hubRefresh").onclick=refresh;$("hubPublicDisplay").onclick=openPublicDisplay;$("hubCategory").onchange=renderAll;$("hubCourse").onchange=renderAll;$("hubCategoryCardToggle").onclick=()=>{categoryCardOpen=!categoryCardOpen;renderCategoryCard()};$("hubSearchButton").onclick=renderAll;$("hubSearch").oninput=renderAll;$("hubImportButton").onclick=importTyped;$("hubAddTournament").onclick=()=>{tournamentEntryOpen=!tournamentEntryOpen;renderTournamentShelf();if(tournamentEntryOpen)setTimeout(()=>$("hubTournamentLink")?.focus(),0)};$("hubTournamentHome").onclick=showTournamentPortal;
    $("hubPersonalIdentity").onclick=()=>root.GSCPersonalEvents.identity();$("hubPersonalInvite").onclick=()=>root.GSCPersonalEvents.invitation();$("hubPersonalOrganization").onclick=()=>root.GSCPersonalEvents.organization(state.generalToken);$("hubPersonalScoreCard").onclick=()=>root.GSCPersonalEvents.openAssignedCard(root.GSCPersonalEvents.descriptor(state.generalToken));root.addEventListener("gsc-personal-updated",refresh);
    root.addEventListener("gsc-account-ready",async()=>{const fresh=await root.GSCPersonalEvents.sync();membershipVerified=!!fresh.ok;if(fresh.ok){resetGeneralView();tournamentStreams.clear();externalStreams.clear();state=loadState();if(personal?.ok){state.tournaments=await root.GSCPersonalEvents.reconcile(state.tournaments);state.generalToken=await root.GSCPersonalEvents.canonicalToken(state.generalToken)}state.tournaments=state.tournaments.filter(item=>!item.token.startsWith('personal_'));for(const item of fresh.items)state=upsertTournamentState(state,item.token,item.label).state;renderAll()}});
    $("hubCreateRound").onclick=openRoundCreate;
    $("hubPrivateRounds").onclick=()=>root.GSCPrivateRounds.list();
    $("hubRegisteredTournaments").onclick=()=>{enterExistingTournament=false;registeredTournamentsOpen=!registeredTournamentsOpen;renderTournamentShelf()};
    $("hubRoundClose").onclick=()=>setRoundCreateDialogOpen(false);
    $("hubRoundOk").onclick=submitRoundCreate;
    $("hubRoundCreateDialog").onclick=event=>{if(event.target===$("hubRoundCreateDialog"))setRoundCreateDialogOpen(false)};
    $("hubRoundName").onkeydown=event=>{if(event.key==="Enter"){event.preventDefault();submitRoundCreate()}};
    root.document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!$("hubRoundCreateDialog")?.hidden)setRoundCreateDialogOpen(false)});
    $("hubRemoveGeneral").onclick=()=>{root.GSCPersonalEvents?.hide(state.generalToken);state=removeTournamentFromState(state,state.generalToken);saveState();resetGeneralView();showTournamentPortal()};
    $("hubClearFavorites").onclick=()=>{state.follows=[];saveState();externalStreams.clear();renderAll();setStatus("TABLERO DE MIS FAVORITOS VACÍO","warning")};
    root.addEventListener("online",refresh);root.document.addEventListener("visibilitychange",()=>{if(root.document.visibilityState==="visible")refresh()});
    const publicDisplay=params.get("display")==="1";
    renderAll();if(oneUse&&!oneUse.ok){tournamentPortalOpen=false;generalStreams.clear();state.generalToken="";renderAll();setStatus(shareAccessMessage(oneUse.code),"error");return false}if(imported)await importAccess(imported);else if(tournamentPortalOpen&&!publicDisplay)setStatus("","");else await refresh();
    if(!params.has("directory")&&params.get("personalEvent")&&personal?.ok){const token="personal_"+params.get("personalEvent");if([...personal.items,...(personal.privateItems||[])].some(item=>item.token===token))await selectSavedTournament(token)}
    if(params.get("shortcut")==="create"&&!shared)await openRoundCreate();
    if(params.get("shortcut")==="scores"&&!shared){
      const token=state.generalToken,privateEvent=root.GSCPersonalEvents?.descriptor(token)?.eventKind==='private';
      if(token&&params.get('personalEvent')&&token==='personal_'+params.get('personalEvent')&&((privateEvent&&params.get('personalKind')==='private')||(!privateEvent&&params.get('personalKind')==='tournament')))await selectSavedTournament(token);
      else{showTournamentPortal();registeredTournamentsOpen=true;renderTournamentShelf();setStatus("SELECCIONA UN TORNEO PARA VER SUS SCORES","");}
    }
    const shortcut=params.get("shortcut"),monitor=params.get("monitor")||shortcut;
    if(["general","categories","search","board"].includes(monitor)){
      // Resolve the authorized tournament before selecting its view; no timer race.
      if(state.generalToken&&tournamentPortalOpen)await selectSavedTournament(state.generalToken);
      showMonitor(monitor==="search"?"add":monitor==="board"?"individual":monitor);
      if(state.generalToken)await refresh();
    }
    if(shortcut==="add")$("hubAddTournament")?.click();
    if(shortcut==="remove")$("hubRemoveGeneral")?.click();
    if(shortcut==="clear-board")$("hubClearFavorites")?.click();
    if(params.has("directory")){showTournamentPortal();registeredTournamentsOpen=true;renderTournamentShelf()}
    const administrationSelection=resolveDirectoryEventToken(params.get('directoryEvent'),registeredDirectory);if(administrationSelection){await selectSavedTournament(administrationSelection);const requestedMonitor=params.get("monitor");if(["general","categories"].includes(requestedMonitor))showMonitor(requestedMonitor)}
    const automaticDirectory=root.GSCDirectoryAutoRefresh?.create({refresh:refreshRegisteredDirectory,onState:status=>{const label=$('hubDirectorySync');if(label){label.hidden=!tournamentPortalOpen;label.textContent=status.ok&&!status.partial?'TORNEOS ACTUALIZADOS · '+new Date(status.lastUpdated).toLocaleTimeString('es-GT',{timeZone:'America/Guatemala'}):'REINTENTO AUTOMÁTICO · CONSERVANDO LA LISTA'}}});automaticDirectory?.start({immediate:false});
    if(publicDisplay)activatePublicDisplay();
    return true;
  }

  return{roundCreationStoragePrefix,STORAGE_KEY,POLL_MS,DISPLAY_MS,MAX_SAVED_TOURNAMENTS,TOKEN_PATTERN,CATEGORY_LABELS,CATEGORY_DEFAULT_TEES,DEMO_DISTRIBUTION,safePersonalSync,resolveDirectoryEventToken,demoTournamentStreams,favoriteStreams,parseHubHash,parseShareLink,generalShareUrl,tournamentHubShareUrl,tournamentHubOpenUrl,normalizeHubState,upsertTournamentState,removeTournamentFromState,addFollowToState,removeFollowFromState,uniquePlayerHoles,livePlayerTotals,tournamentPlayers,categoryIndex,categoryShortLabel,buildLeaderboard,sortRoundPlayers,categoryScoreboardRows,liveDate,modeLabel,unresolvedFollowTokens,resolveFollows,uniqueFavoritePlayers,read,start};
});
