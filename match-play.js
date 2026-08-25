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

  return Object.freeze({MAX_HOLES,validatePlayers,netScore,holeResult,status,playerHoleStatus});
});
