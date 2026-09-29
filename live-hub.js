(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root&&root.document)api.start()})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  const STORAGE_KEY="golf-score-card-gt-live-hub-v1",POLL_MS=3000,DISPLAY_MS=10000,MAX_SAVED_TOURNAMENTS=5,TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
  let state={version:2,generalToken:"",tournaments:[],follows:[]},general=null,generalRevision=null,generalStreams=new Map(),tournamentStreams=new Map(),externalStreams=new Map(),pendingImportToken="",timer=null,loading=false,categoryCardOpen=false,tournamentPortalOpen=false,activeMonitor="general",pendingMonitor="general",tournamentEntryOpen=false,displayTimer=null,displayCountdownTimer=null,displaySceneIndex=0;
  const expandedFavorites=new Set();
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
  function loadState(){try{return normalizeHubState(JSON.parse(root.localStorage.getItem(STORAGE_KEY)||"null"))}catch{return normalizeHubState(null)}}
  function saveState(){try{root.localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true}catch{return false}}

  function uniquePlayerHoles(player){const unique=new Map();for(const raw of Array.isArray(player&&player.holes)?player.holes:[]){const hole=Number(raw&&raw.hole);if(Number.isInteger(hole)&&hole>=1&&hole<=18)unique.set(hole,raw)}return[...unique.values()].sort((left,right)=>Number(left.hole)-Number(right.hole))}
  function livePlayerTotals(player){const holes=uniquePlayerHoles(player);let gross=0,net=0,relativeToPar=0,universalesPoints=null,stablefordPoints=null;for(const hole of holes){if(hole.explicitX)continue;const holeGross=Number(hole.gross),holeNet=Number(hole.net),holePar=Number(hole.par),holeResult=Number(hole.relativeToPar),hasPoints=Number.isFinite(hole.universalesPoints),holePoints=Number(hole.universalesPoints);if(Number.isFinite(holeGross))gross+=holeGross;if(Number.isFinite(holeNet))net+=holeNet;if(Number.isFinite(holeResult))relativeToPar+=holeResult;else if(Number.isFinite(holeNet)&&Number.isFinite(holePar))relativeToPar+=holeNet-holePar;if(hasPoints)universalesPoints=(universalesPoints||0)+holePoints;if(Number.isFinite(hole.stablefordPoints))stablefordPoints=(stablefordPoints||0)+hole.stablefordPoints}const currentHole=holes.length?Math.max(...holes.map(hole=>Number(hole.hole))):0;return{holes:holes.length,currentHole,gross,net,relativeToPar,...(universalesPoints===null?{}:{universalesPoints}),...(stablefordPoints===null?{}:{stablefordPoints}),finished:holes.length===18}}
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
  function favoriteStreams(streams){const combined=demoTournamentStreams();for(const [id,stream] of generalStreamMap(streams))combined.set(id,stream);return combined}
  function categoryIndex(streams){const index={};for(const item of tournamentPlayers(streams)){const key=item.tournamentCategory||"uncategorized";(index[key]||(index[key]=[])).push(item)}return index}
  function visibleTournamentPlayers(streams){
    const category=selectedCategory(),course=selectedCourse();
    return tournamentPlayers(streams).filter(item=>(category==="all"||item.tournamentCategory===category)&&(course==="all"||courseKey(item.course)===course));
  }
  function rankingValue(item){return item.mode==="universales"?-(item.universalesPoints??0):item.mode==="stableford"?-(item.stablefordPoints??0):item.relativeToPar}
  function compareTournamentPlayers(left,right){return rankingValue(left)-rankingValue(right)||right.holes-left.holes||fold(left.name).localeCompare(fold(right.name))}
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
    return ordered.map(row=>({...row,players:row.players.filter(player=>{const key=(row.stream?.id||row.item.streamId)+":"+player.id;if(seen.has(key