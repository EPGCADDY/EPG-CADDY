(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.GSCTimerInactivity=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const LIMIT_MS=30*60*1000; // compatibilidad histórica; no dispara cierre genérico
  const NINE_HOLE_WAIT_MS=45*60*1000;

  function timestamp(value){
    const parsed=Date.parse(String(value||""));
    return Number.isFinite(parsed)?parsed:null;
  }
  function lastInstructionAt(round){
    return timestamp(round?.timerLastInstructionAt)
      ??timestamp(round?.clockResumedAt)
      ??timestamp(round?.createdAt)
      ??0;
  }
  function scoreTime(round,hole){
    const values=(round?.players||[]).map(p=>timestamp(p?.holes?.[hole]?.updatedAt)).filter(Number.isFinite);
    return values.length?Math.max(...values):null;
  }
  function hasScore(round,hole){
    return (round?.players||[]).some(p=>Number.isFinite(timestamp(p?.holes?.[hole]?.updatedAt)));
  }
  function completedNine(round){
    if(!round?.players?.length)return null;
    for(const start of [1,10]){
      const holes=Array.from({length:9},(_,i)=>start+i);
      if(round.players.every(p=>holes.every(h=>Number.isInteger(p.holes?.[h]?.gross)&&p.holes[h].status!=='x'))&&!round.players.some(p=>Object.keys(p.holes||{}).some(h=>!holes.includes(Number(h)))))return holes;
    }
    return null;
  }
  function isNineHoleGap(round){return !!(round?.configured&&!round?.endedAt&&completedNine(round))}
  function nineHoleAnchor(round){const holes=completedNine(round);if(!holes)return 0;const times=round.players.flatMap(p=>holes.map(h=>timestamp(p.holes[h].updatedAt))).filter(Number.isFinite);return times.length===round.players.length*9?Math.max(...times):0}
  function remainingMs(round,now=Date.now()){
    if(!isNineHoleGap(round))return 60*60*1000;
    return Math.max(0,NINE_HOLE_WAIT_MS-Math.max(0,Number(now)-nineHoleAnchor(round)));
  }
  function shouldStop(round,now=Date.now()){
    return !!(isNineHoleGap(round)&&nineHoleAnchor(round)>0&&remainingMs(round,now)===0);
  }
  function stopEndAt(round,now=Date.now()){
    if(shouldStop(round,now))return nineHoleAnchor(round);
    return null;
  }
  return Object.freeze({LIMIT_MS,NINE_HOLE_WAIT_MS,lastInstructionAt,remainingMs,shouldStop,isNineHoleGap,stopEndAt});
});
