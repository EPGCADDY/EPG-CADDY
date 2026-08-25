(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCFourBall=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const MAX_HOLES=18;
  const TEAM_PLAYER_INDEXES=Object.freeze([[0,1],[2,3]]);
  const DEFAULT_TEAM_NAMES=Object.freeze(["PAREJA VERDE","PAREJA ORO"]);
  const playerName=(player,index)=>String(player?.name||`JUGADOR ${index+1}`).trim().toUpperCase();
  const netScore=(player,hole)=>{
    const score=player?.holes?.[hole];
    return score&&score.status!=="x"&&Number.isFinite(Number(score.net))?Number(score.net):null;
  };
  const teamNames=value=>DEFAULT_TEAM_NAMES.map((fallback,index)=>String(value?.[index]||fallback).trim().toUpperCase());

  function validatePlayers(players){
    if(!Array.isArray(players)||players.length!==4)return false;
    const ids=new Set();
    for(let index=0;index<players.length;index++){
      const player=players[index],id=String(player?.id||"").trim(),name=playerName(player,index);
      if(!id||!name||ids.has(id))return false;
      ids.add(id);
    }
    return true;
  }

  function teamIndexForPlayer(playerIndex){
    const index=Number(playerIndex);
    return index===0||index===1?0:index===2||index===3?1:null;
  }

  function bestTeamScore(scores,indexes){
    const values=indexes.map(index=>scores[index]);
    if(values.some(value=>value===null))return null;
    const score=Math.min(...values);
    return{score,playerIndexes:indexes.filter(index=>scores[index]===score)};
  }

  function holeResult(players,hole){
    const number=Number(hole);
    if(!validatePlayers(players)||!Number.isInteger(number)||number<1||number>MAX_HOLES){
      return{hole:number,recorded:false,scores:[],teamBest:[],teamStatuses:["pending","pending"],playerStatuses:[]};
    }
    const scores=players.map(player=>netScore(player,number));
    const teamBest=TEAM_PLAYER_INDEXES.map(indexes=>bestTeamScore(scores,indexes));
    if(teamBest.some(value=>value===null))return{hole:number,recorded:false,scores,teamBest,teamStatuses:["pending","pending"],playerStatuses:Array(4).fill("pending"),winnerTeamIndex:null};
    const values=teamBest.map(value=>value.score);
    if(values[0]===values[1])return{hole:number,recorded:true,scores,teamBest,teamStatuses:["tied","tied"],playerStatuses:Array(4).fill("tied"),winnerTeamIndex:null};
    const winnerTeamIndex=values[0]<values[1]?0:1,teamStatuses=winnerTeamIndex===0?["won","lost"]:["lost","won"];
    return{hole:number,recorded:true,scores,teamBest,teamStatuses,playerStatuses:[teamStatuses[0],teamStatuses[0],teamStatuses[1],teamStatuses[1]],winnerTeamIndex};
  }

  function status(players,{maxHoles=MAX_HOLES,names=DEFAULT_TEAM_NAMES}={}){
    const limit=Math.max(1,Math.min(MAX_HOLES,Number(maxHoles)||MAX_HOLES)),labels=teamNames(names);
    if(!validatePlayers(players))return{valid:false,played:0,remaining:limit,closed:false,label:"FOUR BALL REQUIERE 4 JUGADORES",resultLabel:"FOUR BALL REQUIERE 4 JUGADORES",teamNames:labels,holes:[]};
    const holes=[];let winsA=0,winsB=0,halves=0;
    for(let hole=1;hole<=limit;hole++){
      const result=holeResult(players,hole);
      if(!result.recorded)break;
      holes.push(result);
      if(result.winnerTeamIndex===0)winsA++;
      else if(result.winnerTeamIndex===1)winsB++;
      else halves++;
    }
    const played=holes.length,remaining=limit-played,margin=winsA-winsB,leaderTeamIndex=margin===0?null:margin>0?0:1,lead=Math.abs(margin),closed=played>0&&(lead>remaining||played===limit),leader=leaderTeamIndex===null?null:labels[leaderTeamIndex];
    const label=leader?`${leader} · +${lead}`:"EVEN";
    const resultLabel=closed?(leader?(remaining>0?`${leader} GANA ${lead} & ${remaining}`:`${leader} GANA ${lead} UP`):"MATCH EMPATADO"):label;
    return{valid:true,played,remaining,wins:[winsA,winsB],halves,margin,lead,leaderTeamIndex,leader,closed,decidedAt:closed?played:null,label,resultLabel,teamNames:labels,holes};
  }

  function teamStanding(players,teamIndex,holes){
    const index=Number(teamIndex),selected=Array.isArray(holes)?holes.map(Number).filter(hole=>Number.isInteger(hole)&&hole>=1&&hole<=MAX_HOLES):[],labels=teamNames();
    if(!validatePlayers(players)||![0,1].includes(index)||!selected.length)return{valid:false,teamIndex:index,played:0,won:0,tied:0,lost:0,margin:0,position:"",label:"",state:"pending"};
    let won=0,tied=0,lost=0,played=0;
    for(const hole of selected){
      const result=holeResult(players,hole);
      if(!result.recorded)break;
      played++;
      const state=result.teamStatuses[index];
      if(state==="won")won++;
      else if(state==="lost")lost++;
      else tied++;
    }
    const margin=won-lost,state=!played?"pending":margin>0?"up":margin<0?"down":"even",position=!played?"":margin===0?"EVEN":`${margin>0?"+":"−"}${Math.abs(margin)}`;
    return{valid:true,teamIndex:index,played,won,tied,lost,margin,position,label:played?`${labels[index]} · ${position}`:"",state};
  }

  function playerStanding(players,playerIndex,holes){
    const teamIndex=teamIndexForPlayer(playerIndex);
    return teamIndex===null?{valid:false,played:0,position:"",label:"",state:"pending"}:teamStanding(players,teamIndex,holes);
  }

  return Object.freeze({MAX_HOLES,TEAM_PLAYER_INDEXES,DEFAULT_TEAM_NAMES,validatePlayers,teamIndexForPlayer,netScore,holeResult,status,teamStanding,playerStanding});
});
