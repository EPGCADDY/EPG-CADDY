(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.GSCCardArtifacts=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const esc=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const sum=(items,key)=>items.reduce((total,item)=>total+(Number(item?.[key])||0),0);
  const rel=value=>value===0?"E":value>0?`+${value}`:String(value);
  const slug=value=>String(value||"tarjeta").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-|-$/g,"").toLowerCase();
  const categoryLabel=value=>value==="super_senior"?"S. SENIOR":value==="senior"?"SENIOR":String(value||"").toUpperCase();
  const courseLabel=value=>typeof value==="object"?(value?.displayName||value?.name||""):String(value||"");

  function playerStats(player){
    const holes=Object.values(player.holes||{}).filter(score=>score&&Number.isInteger(score.gross)).sort((a,b)=>a.hole-b.hole);
    const gross=sum(holes,"gross"),net=sum(holes,"net"),par=sum(holes,"par"),strokes=sum(holes,"strokes");
    const count=diff=>holes.filter(score=>score.gross-score.par===diff).length;
    const front=holes.filter(score=>score.hole<=9),back=holes.filter(score=>score.hole>=10);
    const rounds=[front,back].filter(items=>items.length).map(items=>({gross:sum(items,"gross"),net:sum(items,"net"),from:items[0].hole,to:items[items.length-1].hole}));
    const sorted=[...holes].sort((a,b)=>(a.net-a.par)-(b.net-b.par)||a.gross-b.gross),byPar={};
    [3,4,5].forEach(parValue=>{const items=holes.filter(score=>score.par===parValue);byPar[parValue]=items.length?Number((sum(items,"gross")/items.length).toFixed(2)):null});
    return{holes,gross,net,par,relative:net-par,strokes,eagles:holes.filter(score=>score.gross-score.par<=-2).length,birdies:count(-1),pars:count(0),bogeys:count(1),doubleBogeys:count(2),triplePlus:holes.filter(score=>score.gross-score.par>=3).length,best:sorted[0]||null,worst:sorted.at(-1)||null,bestNine:rounds.sort((a,b)=>a.net-b.net)[0]||null,byPar};
  }

  function stablefordPoints(gross,par,status){
    if(String(status||"").toLowerCase()==="x")return 0;
    if(!Number.isInteger(gross)||!Number.isInteger(par))return 0;
    const againstPar=gross-par;
    if(againstPar>=2)return 0;
    if(againstPar===1)return 1;
    if(againstPar===0)return 2;
    if(againstPar===-1)return 3;
    return 4;
  }

  function stablefordPlayerStats(player){
    const holes=Object.entries(player.holes||{}).map(([rawHole,entry])=>{
      const hole=Number(entry?.hole??rawHole),gross=Number.isInteger(entry?.gross)?entry.gross:null,par=Number(entry?.par),status=String(entry?.status||"").toLowerCase()==="x"?"x":null;
      return{hole,gross,par:Number.isInteger(par)?par:null,status,points:stablefordPoints(gross,par,status),recorded:status==="x"||gross!==null};
    }).filter(score=>score.recorded&&Number.isInteger(score.hole)).sort((a,b)=>a.hole-b.hole);
    const grossHoles=holes.filter(score=>score.gross!==null),front=holes.filter(score=>score.hole<=9),back=holes.filter(score=>score.hole>=10);
    const totals=items=>{const numeric=items.filter(score=>score.gross!==null);return{gross:sum(numeric,"gross"),grossCount:numeric.length,points:sum(items,"points"),count:items.length}};
    const pointCounts=Object.fromEntries([0,1,2,3,4].map(points=>[points,holes.filter(score=>points===4?score.points>=4:score.points===points).length]));
    return{holes,gross:sum(grossHoles,"gross"),grossCount:grossHoles.length,points:sum(holes,"points"),front:totals(front),back:totals(back),pointCounts};
  }

  function summary(name,stats){
    const level=stats.relative<0?`${Math.abs(stats.relative)} bajo par neto`:stats.relative>0?`${stats.relative} sobre par neto`:"par neto";
    return`${name} terminó con ${stats.gross} Gross y ${stats.net} Neto (${level}). Registró ${stats.eagles} águilas, ${stats.birdies} birdies, ${stats.pars} pares, ${stats.bogeys} bogeys, ${stats.doubleBogeys} dobles bogeys y ${stats.triplePlus} triples bogeys o superiores. Recibió ${stats.strokes} tiros de handicap.`;
  }

  function stablefordSummary(name,stats){
    const gross=stats.grossCount===18?`${stats.gross} Gross`:`Gross parcial ${stats.gross} en ${stats.grossCount} hoyos`;
    return`${name} finalizó con ${stats.points} puntos Stableford y ${gross}. OUT: ${stats.front.points} puntos. IN: ${stats.back.points} puntos.`;
  }

  const style=`<style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#000;color:#fff;font-family:Arial,sans-serif}main{max-width:1500px;margin:auto;border:1px solid #555;padding:22px}h1,h2{color:#31ff00}.table-wrap{max-width:100%;overflow:auto}table{width:100%;border-collapse:collapse}th,td{border:1px solid #555;padding:7px;text-align:center}.meta{display:flex;gap:22px;flex-wrap:wrap;color:#ccc;margin-bottom:16px}.under,.match-won{color:#31ff00;font-weight:900}.over,.match-lost{color:#ff3030;font-weight:900}.match-tied{color:#fff;font-weight:900}.team-green{color:#31ff00;font-weight:900}.team-gold{color:#d4af37;font-weight:900}.best-ball{color:#d4af37;font-weight:900}.match-arrow{display:inline-flex;width:26px;height:32px;align-items:center;justify-content:center;vertical-align:middle}.match-arrow svg{display:block;width:26px;height:32px;overflow:visible}.match-arrow path{fill:none;stroke:currentColor;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}.match-result{margin:14px 0;border:2px solid #31ff00;padding:12px;color:#31ff00;text-align:center;font-size:20px;font-weight:900}.four-ball-result{border-color:#d4af37;color:#d4af37}.points{color:#31ff00;font-weight:900}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:18px 0}.stat{border:1px solid #555;padding:10px}.chart{display:flex;align-items:center;gap:3px;height:150px;border:1px solid #555;padding:10px}.bar{flex:1;position:relative;height:100%}.bar i{position:absolute;left:12%;right:12%;bottom:50%;background:#31ff00;min-height:2px}.bar.over i{top:50%;bottom:auto;background:#ff3030}.bar b{position:absolute;bottom:0;width:100%;text-align:center;font-size:10px}.stableford-chart{align-items:flex-end}.stableford-chart .bar i,.stableford-chart .bar.over i{top:auto;bottom:24px}@media(max-width:720px){body{padding:8px}main{padding:10px}.stats{grid-template-columns:repeat(2,1fr)}th,td{padding:5px;font-size:11px}.match-arrow{width:22px;height:28px}.match-arrow svg{width:22px;height:28px}}</style>`;

  function shell(title,snapshot,body){
    const tournament=snapshot.tournament?.name||snapshot.tournament||"",category=snapshot.mode==="stableford"?categoryLabel(snapshot.stablefordCategory):"";
    const tournamentMeta=tournament?`<span>TORNEO · ${esc(tournament)}</span>`:"",categoryMeta=category?`<span>CATEGORÍA · ${esc(category)}</span>`:"";
    return`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title>${style}<body><main><h1>${esc(title)}</h1><div class="meta"><span>${esc(courseLabel(snapshot.course))}</span><span>${esc(new Date(snapshot.playedAt).toLocaleString("es-GT"))}</span>${tournamentMeta}${categoryMeta}<span>VERSIÓN ${snapshot.version}</span><span>SHA-256 ${esc(snapshot.sha256)}</span></div>${body}</main></body></html>`;
  }

  function globalCard(snapshot){
    const rows=snapshot.players.map(player=>{const stats=playerStats(player);return`<tr><td>${esc(player.name)}</td><td>${esc(player.tee)}</td><td>${player.handicap}</td>${stats.holes.map(hole=>`<td>${hole.gross}/${hole.net}</td>`).join("")}<td>${stats.gross}</td><td>${stats.net}</td><td class="${stats.relative<0?'under':stats.relative>0?'over':''}">${rel(stats.relative)}</td></tr>`}).join("");
    return shell(snapshot.version>1?"Tarjeta Global corregida":"Tarjeta Global",snapshot,`<div class="table-wrap"><table><thead><tr><th>JUGADOR</th><th>MARCAS</th><th>HCP</th>${Array.from({length:18},(_,i)=>`<th>${i+1}</th>`).join("")}<th>GROSS</th><th>NETO</th><th>+/-</th></tr></thead><tbody>${rows}</tbody></table></div>`);
  }

  function personalCard(snapshot,player){
    const stats=playerStats(player),bars=stats.holes.map(hole=>{const diff=hole.net-hole.par,height=Math.min(48,Math.max(2,Math.abs(diff)*22));return`<span class="bar ${diff>0?'over':''}"><i style="height:${height}px"></i><b>${hole.hole}<br>${rel(diff)}</b></span>`}).join("");
    const line=`<div class="table-wrap"><table><tr><th>HOYO</th>${stats.holes.map(hole=>`<th>${hole.hole}</th>`).join("")}</tr><tr><th>GROSS</th>${stats.holes.map(hole=>`<td>${hole.gross}</td>`).join("")}</tr><tr><th>NETO</th>${stats.holes.map(hole=>`<td>${hole.net}</td>`).join("")}</tr></table></div>`;
    const items=[["Gross",stats.gross],["Neto",stats.net],["Contra par",rel(stats.relative)],["Tiros HCP",stats.strokes],["Águilas",stats.eagles],["Birdies",stats.birdies],["Pares",stats.pars],["Bogeys",stats.bogeys],["Dobles",stats.doubleBogeys],["Triples+",stats.triplePlus],["Mejor hoyo",stats.best?.hole||"—"],["Peor hoyo",stats.worst?.hole||"—"],["Mejor vuelta",stats.bestNine?`${stats.bestNine.from}-${stats.bestNine.to}: ${stats.bestNine.net}`:"—"],["Prom. Par 3",stats.byPar[3]??"—"],["Prom. Par 4",stats.byPar[4]??"—"],["Prom. Par 5",stats.byPar[5]??"—"]].map(([key,value])=>`<div class="stat"><b>${key}</b><br>${value}</div>`).join("");
    return shell(snapshot.version>1?`Tarjeta personal corregida · ${player.name}`:`Tarjeta personal · ${player.name}`,snapshot,`<h2>${esc(player.name)} · HCP ${player.handicap} · ${esc(player.tee)}</h2>${line}<div class="stats">${items}</div><h2>Comportamiento Neto contra Par</h2><div class="chart">${bars}</div><p>${esc(summary(player.name,stats))}</p>`);
  }

  function stablefordGlobalCard(snapshot){
    const label=categoryLabel(snapshot.stablefordCategory),rows=snapshot.players.map(player=>{const stats=stablefordPlayerStats(player),byHole=new Map(stats.holes.map(hole=>[hole.hole,hole]));return`<tr><td>${esc(player.name)}</td><td>${esc(player.tee)}</td>${Array.from({length:18},(_,i)=>{const hole=byHole.get(i+1);return`<td>${hole?(hole.status==="x"?"X":hole.gross):"—"}/${hole?.points??"—"}</td>`}).join("")}<td>${stats.grossCount===18?stats.gross:"—"}</td><td class="points">${stats.points}</td></tr>`}).join("");
    return shell(snapshot.version>1?`Tarjeta Global Stableford corregida · ${label}`:`Tarjeta Global Stableford · ${label}`,snapshot,`<div class="table-wrap"><table><thead><tr><th>JUGADOR</th><th>MARCAS</th>${Array.from({length:18},(_,i)=>`<th>${i+1}<br>G/P</th>`).join("")}<th>GROSS</th><th>PUNTOS</th></tr></thead><tbody>${rows}</tbody></table></div><p>G/P = Gross / Puntos Stableford.</p>`);
  }

  function stablefordPersonalCard(snapshot,player){
    const label=categoryLabel(snapshot.stablefordCategory),stats=stablefordPlayerStats(player),bars=stats.holes.map(hole=>`<span class="bar"><i style="height:${Math.max(2,hole.points*22)}px"></i><b>${hole.hole}<br>${hole.points}</b></span>`).join("");
    const grossTotal=stats.grossCount===18?stats.gross:"—";
    const line=`<div class="table-wrap"><table><tr><th>HOYO</th>${stats.holes.map(hole=>`<th>${hole.hole}</th>`).join("")}<th>TOTAL</th></tr><tr><th>GROSS</th>${stats.holes.map(hole=>`<td>${hole.status==="x"?"X":hole.gross}</td>`).join("")}<td>${grossTotal}</td></tr><tr><th>PUNTOS</th>${stats.holes.map(hole=>`<td class="points">${hole.points}</td>`).join("")}<td class="points">${stats.points}</td></tr></table></div>`;
    const items=[["Gross",grossTotal],["Puntos",stats.points],["Gross 1ª vuelta",stats.front.grossCount===9?stats.front.gross:"—"],["Puntos 1ª vuelta",stats.front.points],["Gross 2ª vuelta",stats.back.grossCount===9?stats.back.gross:"—"],["Puntos 2ª vuelta",stats.back.points],["4 puntos",stats.pointCounts[4]],["3 puntos",stats.pointCounts[3]],["2 puntos",stats.pointCounts[2]],["1 punto",stats.pointCounts[1]],["0 puntos",stats.pointCounts[0]],["Fecha clasificatoria",snapshot.stablefordRoundNumber||"—"]].map(([key,value])=>`<div class="stat"><b>${key}</b><br>${value}</div>`).join("");
    return shell(snapshot.version>1?`Tarjeta personal Stableford corregida · ${player.name}`:`Tarjeta personal Stableford · ${player.name}`,snapshot,`<h2>${esc(player.name)} · ${esc(label)} · ${esc(player.tee)}</h2>${line}<div class="stats">${items}</div><h2>Puntos Stableford por hoyo</h2><div class="chart stableford-chart">${bars}</div><p>${esc(stablefordSummary(player.name,stats))}</p>`);
  }

  function matchPlayHole(snapshot,hole){
    const scores=snapshot.players.map(player=>{const score=player.holes?.[hole];return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null});
    if(scores.some(value=>value===null))return{recorded:false,scores,statuses:["pending","pending"]};
    if(scores[0]===scores[1])return{recorded:true,scores,statuses:["tied","tied"]};
    return scores[0]<scores[1]?{recorded:true,scores,statuses:["won","lost"]}:{recorded:true,scores,statuses:["lost","won"]};
  }
  const matchSymbol=status=>{if(status!=="won"&&status!=="lost")return"";const path=status==="won"?"M12 22V5M5 12l7-7 7 7":"M12 2v17M5 12l7 7 7-7";return`<span class="match-arrow match-arrow-${status}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="${path}"></path></svg></span>`};
  function matchPlayGlobalCard(snapshot){
    const finalHole=Number(snapshot.matchPlay?.decidedAt)||18,rows=snapshot.players.map((player,index)=>`<tr><td>${esc(player.name)}</td><td>${player.handicap}</td>${Array.from({length:18},(_,offset)=>{const hole=offset+1,result=matchPlayHole(snapshot,hole),score=player.holes?.[hole],state=result.statuses[index];return`<td class="match-${state}">${hole<=finalHole&&score?`${score.gross}/${score.net}<br>${matchSymbol(state)}`:"—"}</td>`}).join("")}</tr>`).join("");
    return shell(`Tarjeta Global Match Play`,snapshot,`<div class="match-result">${esc(snapshot.matchPlay?.resultLabel||snapshot.matchPlay?.label||"MATCH PLAY")}</div><div class="table-wrap"><table><thead><tr><th>JUGADOR</th><th>HCP</th>${Array.from({length:18},(_,i)=>`<th>${i+1}<br>G/N</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div><p>Flecha verde hacia arriba = ganó · flecha roja hacia abajo = perdió · sin símbolo = empate. Cada hoyo se define por resultado Neto con handicap.</p>`);
  }
  function matchPlayPersonalCard(snapshot,player){
    const index=snapshot.players.findIndex(item=>item.id===player.id),finalHole=Number(snapshot.matchPlay?.decidedAt)||18,rows=Array.from({length:finalHole},(_,offset)=>{const hole=offset+1,result=matchPlayHole(snapshot,hole),score=player.holes?.[hole],opponent=snapshot.players[1-index]?.holes?.[hole],state=result.statuses[index];return`<tr><td>${hole}</td><td>${score?.gross??"—"}</td><td>${score?.net??"—"}</td><td>${opponent?.net??"—"}</td><td class="match-${state}">${matchSymbol(state)}</td></tr>`}).join("");
    return shell(`Tarjeta Match Play · ${player.name}`,snapshot,`<h2>${esc(player.name)} · HCP ${player.handicap} · ${esc(player.tee)}</h2><div class="match-result">${esc(snapshot.matchPlay?.resultLabel||snapshot.matchPlay?.label||"MATCH PLAY")}</div><table><thead><tr><th>HOYO</th><th>GROSS</th><th>NETO</th><th>NETO RIVAL</th><th>RESULTADO</th></tr></thead><tbody>${rows}</tbody></table><p>Flecha verde hacia arriba = ganó · flecha roja hacia abajo = perdió · sin símbolo = empate.</p>`);
  }

  const FOUR_BALL_TEAM_NAMES=["PAREJA VERDE","PAREJA ORO"];
  const fourBallTeamIndex=playerIndex=>playerIndex<2?0:1;
  function fourBallHole(snapshot,hole){
    const scores=snapshot.players.map(player=>{const score=player.holes?.[hole];return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null});
    if(scores.length!==4||scores.some(value=>value===null))return{recorded:false,scores,teamBest:[],teamStatuses:["pending","pending"]};
    const teamBest=[{score:Math.min(scores[0],scores[1]),playerIndexes:[]},{score:Math.min(scores[2],scores[3]),playerIndexes:[]}];
    teamBest[0].playerIndexes=[0,1].filter(index=>scores[index]===teamBest[0].score);teamBest[1].playerIndexes=[2,3].filter(index=>scores[index]===teamBest[1].score);
    if(teamBest[0].score===teamBest[1].score)return{recorded:true,scores,teamBest,teamStatuses:["tied","tied"]};
    return teamBest[0].score<teamBest[1].score?{recorded:true,scores,teamBest,teamStatuses:["won","lost"]}:{recorded:true,scores,teamBest,teamStatuses:["lost","won"]};
  }
  function fourBallStanding(snapshot,teamIndex,hole){let margin=0,played=0;for(let current=1;current<=hole;current++){const result=fourBallHole(snapshot,current);if(!result.recorded)break;played++;if(result.teamStatuses[teamIndex]==="won")margin++;else if(result.teamStatuses[teamIndex]==="lost")margin--}return{played,margin,state:!played?"pending":margin>0?"won":margin<0?"lost":"tied",label:!played?"":margin===0?"EVEN":`${margin>0?"+":"−"}${Math.abs(margin)}`}}
  function fourBallGlobalCard(snapshot){
    const finalHole=Number(snapshot.fourBall?.decidedAt)||18,rows=snapshot.players.map((player,index)=>{const teamIndex=fourBallTeamIndex(index),teamClass=teamIndex===0?"team-green":"team-gold";return`<tr><td>${esc(player.name)}</td><td class="${teamClass}">${FOUR_BALL_TEAM_NAMES[teamIndex]}</td><td>${player.handicap}</td>${Array.from({length:18},(_,offset)=>{const hole=offset+1,result=fourBallHole(snapshot,hole),standing=fourBallStanding(snapshot,teamIndex,hole),score=player.holes?.[hole],best=result.teamBest?.[teamIndex]?.playerIndexes?.includes(index);return`<td class="match-${standing.state}">${hole<=finalHole&&score?`${score.gross}/${score.net}${best?'<br><span class="best-ball">★ MEJOR</span>':""}<br>${matchSymbol(standing.state)} ${standing.label}`:"—"}</td>`}).join("")}</tr>`}).join("");
    return shell("Tarjeta Global Four Ball",snapshot,`<div class="match-result four-ball-result">${esc(snapshot.fourBall?.resultLabel||snapshot.fourBall?.label||"FOUR BALL")}</div><div class="table-wrap"><table><thead><tr><th>JUGADOR</th><th>PAREJA</th><th>HCP</th>${Array.from({length:18},(_,i)=>`<th>${i+1}<br>G/N</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div><p>Dos parejas de dos jugadores. ★ identifica el mejor Neto de la pareja. Ese mejor Neto se compara con el de la pareja rival. EVEN, +1, +2 o −1 se mantienen acumulados hasta que cambie el resultado.</p>`)
  }
  function fourBallPersonalCard(snapshot,player){
    const index=snapshot.players.findIndex(item=>item.id===player.id),teamIndex=fourBallTeamIndex(index),mateIndex=teamIndex===0?(index===0?1:0):(index===2?3:2),rivalIndexes=teamIndex===0?[2,3]:[0,1],finalHole=Number(snapshot.fourBall?.decidedAt)||18,rows=Array.from({length:finalHole},(_,offset)=>{const hole=offset+1,result=fourBallHole(snapshot,hole),standing=fourBallStanding(snapshot,teamIndex,hole),score=player.holes?.[hole],mate=snapshot.players[mateIndex]?.holes?.[hole],rivalBest=result.teamBest?.[1-teamIndex]?.score,best=result.teamBest?.[teamIndex]?.playerIndexes?.includes(index);return`<tr><td>${hole}</td><td>${score?.gross??"—"}</td><td>${score?.net??"—"}${best?' <span class="best-ball">★</span>':""}</td><td>${mate?.net??"—"}</td><td>${rivalBest??"—"}</td><td class="match-${standing.state}">${matchSymbol(standing.state)} ${standing.label}</td></tr>`}).join("");
    return shell(`Tarjeta Four Ball · ${player.name}`,snapshot,`<h2>${esc(player.name)} · <span class="${teamIndex===0?"team-green":"team-gold"}">${FOUR_BALL_TEAM_NAMES[teamIndex]}</span> · HCP ${player.handicap} · ${esc(player.tee)}</h2><div class="match-result four-ball-result">${esc(snapshot.fourBall?.resultLabel||snapshot.fourBall?.label||"FOUR BALL")}</div><table><thead><tr><th>HOYO</th><th>GROSS</th><th>NETO</th><th>NETO COMPAÑERO</th><th>MEJOR NETO RIVAL</th><th>ACUMULADO</th></tr></thead><tbody>${rows}</tbody></table><p>La pareja está formada por ${esc(snapshot.players[teamIndex*2]?.name)} y ${esc(snapshot.players[teamIndex*2+1]?.name)}. Rivales: ${rivalIndexes.map(i=>esc(snapshot.players[i]?.name)).join(" y ")}.</p>`)
  }

  function build(snapshot){
    if(!snapshot||!["officially_closed","corrected"].includes(snapshot.status)||!snapshot.sha256)throw new Error("Se requiere snapshot oficialmente cerrado");
    const stableford=snapshot.mode==="stableford",matchPlay=snapshot.mode==="match_play",fourBall=snapshot.mode==="four_ball",mode=stableford?"stableford":matchPlay?"match_play":fourBall?"four_ball":"stroke";
    const global={kind:"global",mode,name:stableford?`tarjeta-global-stableford-v${snapshot.version}.html`:matchPlay?`tarjeta-global-match-play-v${snapshot.version}.html`:fourBall?`tarjeta-global-four-ball-v${snapshot.version}.html`:`tarjeta-global-v${snapshot.version}.html`,html:stableford?stablefordGlobalCard(snapshot):matchPlay?matchPlayGlobalCard(snapshot):fourBall?fourBallGlobalCard(snapshot):globalCard(snapshot)};
    const personal=snapshot.players.map(player=>({kind:"personal",mode,playerId:player.id,name:stableford?`tarjeta-stableford-${slug(player.name)}-v${snapshot.version}.html`:matchPlay?`tarjeta-match-play-${slug(player.name)}-v${snapshot.version}.html`:fourBall?`tarjeta-four-ball-${slug(player.name)}-v${snapshot.version}.html`:`tarjeta-${slug(player.name)}-v${snapshot.version}.html`,html:stableford?stablefordPersonalCard(snapshot,player):matchPlay?matchPlayPersonalCard(snapshot,player):fourBall?fourBallPersonalCard(snapshot,player):personalCard(snapshot,player),stats:stableford?stablefordPlayerStats(player):playerStats(player)}));
    return{global,personal,all:[global,...personal]};
  }

  return{build,playerStats,stablefordPlayerStats,summary,stablefordSummary};
});
