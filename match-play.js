(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCMatchPlay=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const MAX_HOLES=18;
  const PAIR_PLAYER_INDEXES=Object.freeze([[0,1],[2,3]]);
  const playerName=(player,index)=>String(player?.name||`JUGADOR ${index+1}`).trim().toUpperCase();
  const netScore=(player,hole)=>{
    const score=player?.holes?.[hole];
    return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null;
  };

  function validatePlayers(players){
    if(!Array.isArray(players)||![2,4].includes(players.length))return false;
    const ids=new Set();
    for(let index=0;index<players.length;index++){
      const player=players[index],id=String(player?.id||"").trim();
      if(!id||!playerName(player,index)||ids.has(id))return false;
      ids.add(id);
    }
    return true;
  }

  function pairIndexForPlayer(playerIndex){
    const index=Number(playerIndex);
    return index===0||index===1?0:index===2||index===3?1:null;
  }

  function pairIndexes(players,pairIndex){
    const indexes=PAIR_PLAYER_INDEXES[Number(pairIndex)]||[];
    return indexes.filter(index=>index<players.length);
  }

  function pairHoleResult(players,pairIndex,hole){
    const number=Number(hole),indexes=pairIndexes(players,pairIndex);
    if(!validatePlayers(players)||indexes.length!==2||!Number.isInteger(number)||number<1||number>MAX_HOLES)return{hole:number,pairIndex:Number(pairIndex),recorded:false,indexes,statuses:["pending","pending"],winnerIndex:null};
    const scores=indexes.map(index=>netScore(players[index],number));
    if(scores.some(value=>value===null))return{hole:number,pairIndex:Number(pairIndex),recorded:false,indexes,scores,statuses:["pending","pending"],winnerIndex:null};
    if(scores[0]===scores[1])return{hole:number,pairIndex:Number(pairIndex),recorded:true,indexes,scores,statuses:["tied","tied"],winnerIndex:null};
    const localWinner=scores[0]<scores[1]?0:1;
    return{hole:number,pairIndex:Number(pairIndex),recorded:true,indexes,scores,statuses:localWinner===0?["won","lost"]:["lost","won"],winnerIndex:indexes[localWinner]};
  }

  function holeResult(players,hole,pairIndex=0){return pairHoleResult(players,pairIndex,hole)}

  function statusForPair(players,pairIndex,{maxHoles=MAX_HOLES}={}){
    const limit=Math.max(1,Math.min(MAX_HOLES,Number(maxHoles)||MAX_HOLES)),indexes=pairIndexes(players,pairIndex);
    if(!validatePlayers(players)||indexes.length!==2)return{valid:false,pairIndex:Number(pairIndex),played:0,remaining:limit,closed:false,label:"MATCH PLAY REQUIERE 2 O 4 JUGADORES",resultLabel:"MATCH PLAY REQUIERE 2 O 4 JUGADORES",holes:[]};
    const holes=[];let winsA=0,winsB=0,halves=0;
    for(let hole=1;hole<=limit;hole++){
      const result=pairHoleResult(players,pairIndex,hole);
      if(!result.recorded)break;
      holes.push(result);
      if(result.winnerIndex===indexes[0])winsA++;
      else if(result.winnerIndex===indexes[1])winsB++;
      else halves++;
    }
    const played=holes.length,remaining=limit-played,margin=winsA-winsB,leaderLocalIndex=margin===0?null:margin>0?0:1,leaderIndex=leaderLocalIndex===null?null:indexes[leaderLocalIndex],lead=Math.abs(margin),closed=played>0&&(lead>remaining||played===limit),leader=leaderIndex===null?null:playerName(players[leaderIndex],leaderIndex);
    let label="AS",resultLabel="EMPATE";
    if(leader){label=`${leader} · ${lead} UP`;if(closed)resultLabel=remaining>0?`${leader} GANA ${lead} & ${remaining}`:`${leader} GANA ${lead} UP`}
    else if(closed)resultLabel="MATCH EMPATADO";
    return{valid:true,pairIndex:Number(pairIndex),playerIndexes:indexes,played,remaining,wins:[winsA,winsB],halves,margin,lead,leaderIndex,leader,closed,decidedAt:closed?played:null,label,resultLabel:closed?resultLabel:label,holes};
  }

  function status(players,{maxHoles=MAX_HOLES}={}){
    const limit=Math.max(1,Math.min(MAX_HOLES,Number(maxHoles)||MAX_HOLES));
    if(!validatePlayers(players))return{valid:false,pairCount:0,played:0,remaining:limit,closed:false,label:"MATCH PLAY REQUIERE 2 O 4 JUGADORES",resultLabel:"MATCH PLAY REQUIERE 2 O 4 JUGADORES",matches:[],holes:[]};
    const pairCount=players.length/2,matches=Array.from({length:pairCount},(_,pairIndex)=>statusForPair(players,pairIndex,{maxHoles:limit}));
    if(pairCount===1)return{...matches[0],pairCount,matches};
    const closed=matches.every(match=>match.closed),played=Math.min(...matches.map(match=>match.played)),remaining=limit-played,decidedAt=closed?Math.max(...matches.map(match=>match.decidedAt||limit)):null;
    const format=(match,index,result=false)=>`PAREJA ${index+1}: ${result?match.resultLabel:match.label}`;
    return{valid:true,pairCount,matches,played,remaining,closed,decidedAt,label:matches.map((match,index)=>format(match,index,false)).join(" · "),resultLabel:matches.map((match,index)=>format(match,index,closed)).join(" · "),holes:[]};
  }

  function playerHoleStatus(players,playerIndex,hole){
    const pairIndex=pairIndexForPlayer(playerIndex),indexes=pairIndexes(players,pairIndex),localIndex=indexes.indexOf(Number(playerIndex));
    return localIndex<0?"pending":pairHoleResult(players,pairIndex,hole).statuses?.[localIndex]||"pending";
  }

  function segmentStanding(players,playerIndex,holes){
    const index=Number(playerIndex),pairIndex=pairIndexForPlayer(index),indexes=pairIndexes(players,pairIndex),localIndex=indexes.indexOf(index),selected=Array.isArray(holes)?holes.map(Number).filter(hole=>Number.isInteger(hole)&&hole>=1&&hole<=MAX_HOLES):[];
    if(!validatePlayers(players)||localIndex<0||!selected.length)return{valid:false,pairIndex,played:0,won:0,tied:0,lost:0,margin:0,position:"",label:"",state:"pending"};
    let won=0,tied=0,lost=0,played=0;
    for(const hole of selected){
      const result=pairHoleResult(players,pairIndex,hole);
      if(!result.recorded)break;
      played++;
      const state=result.statuses[localIndex];
      if(state==="won")won++;else if(state==="lost")lost++;else tied++;
    }
    const margin=won-lost,state=!played?"pending":margin>0?"up":margin<0?"down":"as",position=!played?"":margin===0?"AS":`${Math.abs(margin)} ${margin>0?"UP":"DOWN"}`;
    return{valid:true,pairIndex,played,won,tied,lost,margin,position,label:played?`${playerName(players[index],index)} · ${position}`:"",state};
  }

  function finalHoleForPlayer(players,playerIndex,{maxHoles=MAX_HOLES}={}){
    const state=status(players,{maxHoles}),pairIndex=pairIndexForPlayer(playerIndex),match=state.matches?.[pairIndex]||state;
    return match?.closed&&Number.isInteger(match.decidedAt)?match.decidedAt:maxHoles;
  }

  return Object.freeze({MAX_HOLES,PAIR_PLAYER_INDEXES,validatePlayers,pairIndexForPlayer,netScore,pairHoleResult,holeResult,statusForPair,status,playerHoleStatus,segmentStanding,finalHoleForPlayer});
});
