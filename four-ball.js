(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCFourBall=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const MAX_HOLES=18;
  const TEAM_PLAYER_INDEXES=Object.freeze([[0,1],[2,3],[4,5]]);
  const DEFAULT_TEAM_NAMES=Object.freeze(["PAREJA VERDE","PAREJA ORO","PAREJA AZUL"]);
  const playerName=(player,index)=>String(player?.name||`JUGADOR ${index+1}`).trim().toUpperCase();
  const netScore=(player,hole)=>{const score=player?.holes?.[hole];return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null};
  const teamNames=value=>DEFAULT_TEAM_NAMES.map((fallback,index)=>String(value?.[index]||fallback).trim().toUpperCase());

  function validatePlayers(players){
    if(!Array.isArray(players)||![2,4,6].includes(players.length))return false;
    const ids=new Set();
    for(let index=0;index<players.length;index++){
      const player=players[index],id=String(player?.id||"").trim();
      if(!id||!playerName(player,index)||ids.has(id))return false;
      ids.add(id);
    }
    return true;
  }

  function teamCount(players){return validatePlayers(players)?players.length/2:0}
  function teamIndexForPlayer(playerIndex){const index=Number(playerIndex);return Number.isInteger(index)&&index>=0&&index<6?Math.floor(index/2):null}
  function teamIndexes(players,teamIndex){return(TEAM_PLAYER_INDEXES[Number(teamIndex)]||[]).filter(index=>index<players.length)}
  function bestTeamScore(scores,indexes){const values=indexes.map(index=>scores[index]);if(values.some(value=>value===null))return null;const score=Math.min(...values);return{score,playerIndexes:indexes.filter(index=>scores[index]===score)}}

  function holeResult(players,hole){
    const number=Number(hole),count=teamCount(players);
    if(!count||!Number.isInteger(number)||number<1||number>MAX_HOLES)return{hole:number,recorded:false,scores:[],teamBest:[],teamStatuses:[],playerStatuses:[]};
    const scores=players.map(player=>netScore(player,number)),teamBest=Array.from({length:count},(_,index)=>bestTeamScore(scores,teamIndexes(players,index)));
    if(teamBest.some(value=>value===null))return{hole:number,recorded:false,scores,teamBest,teamStatuses:Array(count).fill("pending"),playerStatuses:Array(players.length).fill("pending"),winnerTeamIndex:null};
    if(count===1)return{hole:number,recorded:true,scores,teamBest,teamStatuses:["solo"],teamDeltas:[0],playerStatuses:Array(2).fill("tied"),winnerTeamIndex:null,winnerTeamIndexes:[]};
    const values=teamBest.map(value=>value.score),best=Math.min(...values),winnerTeamIndexes=values.map((value,index)=>value===best?index:null).filter(index=>index!==null),winnerTeamIndex=winnerTeamIndexes.length===1?winnerTeamIndexes[0]:null;
    const teamStatuses=values.map((value,index)=>value!==best?"lost":winnerTeamIndex===index?"won":"tied"),teamDeltas=values.map((value,index)=>values.reduce((total,other,otherIndex)=>otherIndex===index?total:total+(value<other?1:value>other?-1:0),0));
    return{hole:number,recorded:true,scores,teamBest,teamStatuses,teamDeltas,playerStatuses:players.map((_,index)=>teamStatuses[teamIndexForPlayer(index)]),winnerTeamIndex,winnerTeamIndexes};
  }

  function status(players,{maxHoles=MAX_HOLES,names=DEFAULT_TEAM_NAMES}={}){
    const limit=Math.max(1,Math.min(MAX_HOLES,Number(maxHoles)||MAX_HOLES)),labels=teamNames(names),count=teamCount(players);
    if(!count)return{valid:false,teamCount:0,played:0,remaining:limit,closed:false,label:"FOUR BALL REQUIERE 2, 4 O 6 JUGADORES",resultLabel:"FOUR BALL REQUIERE 2, 4 O 6 JUGADORES",teamNames:labels,holes:[]};
    const holes=[];let winsA=0,winsB=0,halves=0,totalNet=0;const teamPoints=Array(count).fill(0),teamWins=Array(count).fill(0),teamTies=Array(count).fill(0);
    for(let hole=1;hole<=limit;hole++){
      const result=holeResult(players,hole);if(!result.recorded)break;holes.push(result);
      if(count===1)totalNet+=result.teamBest[0].score;
      else{
        result.teamDeltas.forEach((delta,index)=>{teamPoints[index]+=delta});
        result.teamStatuses.forEach((state,index)=>{if(state==="won")teamWins[index]++;else if(state==="tied")teamTies[index]++});
        if(count===2){if(result.winnerTeamIndex===0)winsA++;else if(result.winnerTeamIndex===1)winsB++;else halves++}
      }
    }
    const played=holes.length,remaining=limit-played;
    if(count===1){
      const closed=played===limit,label=played?`${labels[0]} · NETO ${totalNet}`:`${labels[0]} · PENDIENTE`,resultLabel=closed?`${labels[0]} · NETO TOTAL ${totalNet}`:label;
      return{valid:true,teamCount:1,played,remaining,totalNet,closed,decidedAt:closed?limit:null,label,resultLabel,teamNames:labels,holes};
    }
    if(count===2){
      const margin=winsA-winsB,leaderTeamIndex=margin===0?null:margin>0?0:1,lead=Math.abs(margin),closed=played>0&&(lead>remaining||played===limit),leader=leaderTeamIndex===null?null:labels[leaderTeamIndex],label=leader?`${leader} · +${lead}`:"EVEN",resultLabel=closed?(leader?(remaining>0?`${leader} GANA ${lead} & ${remaining}`:`${leader} GANA ${lead} UP`):"MATCH EMPATADO"):label;
      return{valid:true,teamCount:2,played,remaining,wins:[winsA,winsB],halves,teamPoints,teamWins,teamTies,margin,lead,leaderTeamIndex,leader,closed,decidedAt:closed?played:null,label,resultLabel,teamNames:labels,holes};
    }
    const bestPoints=Math.max(...teamPoints),leaderTeamIndexes=teamPoints.map((points,index)=>points===bestPoints?index:null).filter(index=>index!==null),leaderTeamIndex=leaderTeamIndexes.length===1?leaderTeamIndexes[0]:null,leaders=leaderTeamIndexes.map(index=>labels[index]),closed=played===limit,label=teamPoints.map((points,index)=>`${labels[index]} ${points>0?"+":""}${points}`).join(" · "),resultLabel=closed?(leaderTeamIndex===null?`EMPATE · ${leaders.join(" Y ")} · ${bestPoints} PUNTOS`:`${labels[leaderTeamIndex]} GANA · ${bestPoints} PUNTOS`):label;
    return{valid:true,teamCount:3,played,remaining,teamPoints,teamWins,teamTies,leaderTeamIndexes,leaderTeamIndex,leader:leaderTeamIndex===null?null:labels[leaderTeamIndex],closed,decidedAt:closed?limit:null,label,resultLabel,teamNames:labels,holes};
  }

  function teamStanding(players,teamIndex,holes){
    const index=Number(teamIndex),selected=Array.isArray(holes)?holes.map(Number).filter(hole=>Number.isInteger(hole)&&hole>=1&&hole<=MAX_HOLES):[],labels=teamNames(),count=teamCount(players);
    if(!count||index<0||index>=count||!selected.length)return{valid:false,teamIndex:index,played:0,won:0,tied:0,lost:0,margin:0,position:"",label:"",state:"pending"};
    let won=0,tied=0,lost=0,played=0,netTotal=0,points=0;
    for(const hole of selected){
      const result=holeResult(players,hole);if(!result.recorded)break;played++;
      if(count===1)netTotal+=result.teamBest[0].score;
      else{const state=result.teamStatuses[index];points+=Number(result.teamDeltas?.[index]||0);if(state==="won")won++;else if(state==="lost")lost++;else tied++}
    }
    if(count===1){const position=played?`NETO ${netTotal}`:"";return{valid:true,teamIndex:index,played,won:0,tied:0,lost:0,margin:0,netTotal,position,label:played?`${labels[index]} · ${position}`:"",state:played?"even":"pending"}}
    if(count===2){const margin=won-lost,state=!played?"pending":margin>0?"up":margin<0?"down":"even",position=!played?"":margin===0?"EVEN":`${margin>0?"+":"−"}${Math.abs(margin)}`;return{valid:true,teamIndex:index,played,won,tied,lost,points,margin,position,label:played?`${labels[index]} · ${position}`:"",state}}
    const otherPoints=Array.from({length:count},(_,team)=>team===index?null:selected.reduce((total,hole)=>{const result=holeResult(players,hole);return result.recorded?total+Number(result.teamDeltas?.[team]||0):total},0)).filter(value=>value!==null),bestOther=Math.max(...otherPoints),margin=points-bestOther,state=!played?"pending":margin>0?"up":margin<0?"down":"even",position=!played?"":`${points>0?"+":""}${points} PTS`;
    return{valid:true,teamIndex:index,played,won,tied,lost,points,margin,position,label:played?`${labels[index]} · ${position}`:"",state};
  }

  function playerStanding(players,playerIndex,holes){const teamIndex=teamIndexForPlayer(playerIndex);return teamIndex===null?{valid:false,played:0,position:"",label:"",state:"pending"}:teamStanding(players,teamIndex,holes)}

  return Object.freeze({MAX_HOLES,TEAM_PLAYER_INDEXES,DEFAULT_TEAM_NAMES,validatePlayers,teamCount,teamIndexForPlayer,netScore,holeResult,status,teamStanding,playerStanding});
});
