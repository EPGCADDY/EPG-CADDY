(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCMatchPlay=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const MAX_HOLES=18;
  const playerName=(player,index)=>String(player?.name||`JUGADOR ${index+1}`).trim().toUpperCase();
  const netScore=(player,hole)=>{
    const score=player?.holes?.[hole];
    return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null;
  };

  function validatePlayers(players){
    return Array.isArray(players)&&players.length===2&&players.every(player=>player&&player.id&&playerName(player,0));
  }

  function holeResult(players,hole){
    const number=Number(hole);
    if(!validatePlayers(players)||!Number.isInteger(number)||number<1||number>MAX_HOLES)return{hole:number,recorded:false,statuses:[]};
    const scores=players.map(player=>netScore(player,number));
    if(scores.some(value=>value===null))return{hole:number,recorded:false,scores,statuses:["pending","pending"],winnerIndex:null};
    if(scores[0]===scores[1])return{hole:number,recorded:true,scores,statuses:["tied","tied"],winnerIndex:null};
    const winnerIndex=scores[0]<scores[1]?0:1;
    return{hole:number,recorded:true,scores,statuses:winnerIndex===0?["won","lost"]:["lost","won"],winnerIndex};
  }

  function status(players,{maxHoles=MAX_HOLES}={}){
    const limit=Math.max(1,Math.min(MAX_HOLES,Number(maxHoles)||MAX_HOLES));
    if(!validatePlayers(players))return{valid:false,played:0,remaining:limit,closed:false,label:"MATCH PLAY REQUIERE 2 JUGADORES",holes:[]};
    const holes=[];
    let winsA=0,winsB=0,halves=0;
    for(let hole=1;hole<=limit;hole++){
      const result=holeResult(players,hole);
      if(!result.recorded)break;
      holes.push(result);
      if(result.winnerIndex===0)winsA++;
      else if(result.winnerIndex===1)winsB++;
      else halves++;
    }
    const played=holes.length,remaining=limit-played,margin=winsA-winsB,leaderIndex=margin===0?null:margin>0?0:1,lead=Math.abs(margin);
    const closed=played>0&&(lead>remaining||played===limit);
    const leader=leaderIndex===null?null:playerName(players[leaderIndex],leaderIndex);
    let label="AS",resultLabel="EMPATE";
    if(leader){
      label=`${leader} · ${lead} UP`;
      if(closed)resultLabel=remaining>0?`${leader} GANA ${lead} & ${remaining}`:`${leader} GANA ${lead} UP`;
    }else if(closed)resultLabel="MATCH EMPATADO";
    return{valid:true,played,remaining,wins:[winsA,winsB],halves,margin,lead,leaderIndex,leader,closed,decidedAt:closed?played:null,label,resultLabel:closed?resultLabel:label,holes};
  }

  function playerHoleStatus(players,playerIndex,hole){
    return holeResult(players,hole).statuses?.[playerIndex]||"pending";
  }

  function segmentStanding(players,playerIndex,holes){
    const index=Number(playerIndex),selected=Array.isArray(holes)?holes.map(Number).filter(hole=>Number.isInteger(hole)&&hole>=1&&hole<=MAX_HOLES):[];
    if(!validatePlayers(players)||![0,1].includes(index)||!selected.length)return{valid:false,played:0,won:0,tied:0,lost:0,margin:0,position:"",label:"",state:"pending"};
    let won=0,tied=0,lost=0,played=0;
    for(const hole of selected){
      const result=holeResult(players,hole);
      if(!result.recorded)break;
      played++;
      const state=result.statuses[index];
      if(state==="won")won++;
      else if(state==="lost")lost++;
      else tied++;
    }
    const margin=won-lost,state=!played?"pending":margin>0?"up":margin<0?"down":"as",position=!played?"":margin===0?"AS":`${Math.abs(margin)} ${margin>0?"UP":"DOWN"}`;
    return{valid:true,played,won,tied,lost,margin,position,label:played?`${playerName(players[index],index)} · ${position}`:"",state};
  }

  return Object.freeze({MAX_HOLES,validatePlayers,netScore,holeResult,status,playerHoleStatus,segmentStanding});
});
