(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCUniversales=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const TOTAL_POINTS=12;
  const BASE_POINTS={3:[6,4,2],4:[6,4,2,0]};

  function validPlayerCount(count){return count===3||count===4}

  function distribute(nets){
    if(!Array.isArray(nets)||!validPlayerCount(nets.length))throw new Error("UNIVERSALES_REQUIERE_3_O_4_JUGADORES");
    if(!nets.every(Number.isFinite))return{recorded:false,points:Array(nets.length).fill(null),total:0};
    const base=BASE_POINTS[nets.length],ranked=nets.map((net,index)=>({net,index})).sort((a,b)=>a.net-b.net||a.index-b.index),points=Array(nets.length).fill(0);
    for(let start=0;start<ranked.length;){
      let end=start+1;
      while(end<ranked.length&&ranked[end].net===ranked[start].net)end++;
      const shared=base.slice(start,end).reduce((sum,value)=>sum+value,0)/(end-start);
      for(let index=start;index<end;index++)points[ranked[index].index]=shared;
      start=end;
    }
    const total=points.reduce((sum,value)=>sum+value,0);
    if(total!==TOTAL_POINTS)throw new Error("UNIVERSALES_TOTAL_INVALIDO");
    return{recorded:true,points,total};
  }

  function hole(players,holeNumber,scoreFor){
    if(!Array.isArray(players)||!validPlayerCount(players.length))return{recorded:false,pointsById:{},total:0};
    const scores=players.map(player=>scoreFor(player,holeNumber));
    if(scores.some(score=>!score||score.status==="x"||!Number.isFinite(score.net)))return{recorded:false,pointsById:{},total:0};
    const result=distribute(scores.map(score=>score.net)),pointsById={};
    players.forEach((player,index)=>{pointsById[player.id]=result.points[index]});
    return{recorded:true,pointsById,total:result.total,nets:scores.map(score=>score.net)};
  }

  function totals(players,holes,scoreFor){
    const pointsById=Object.fromEntries((players||[]).map(player=>[player.id,0]));
    let recordedHoles=0;
    for(const holeNumber of holes||[]){
      const result=hole(players,holeNumber,scoreFor);
      if(!result.recorded)continue;
      recordedHoles++;
      for(const player of players)pointsById[player.id]+=result.pointsById[player.id];
    }
    return{pointsById,recordedHoles,total:recordedHoles*TOTAL_POINTS};
  }

  return Object.freeze({TOTAL_POINTS,BASE_POINTS,validPlayerCount,distribute,hole,totals});
});
