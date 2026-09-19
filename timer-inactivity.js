(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.GSCTimerInactivity=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const LIMIT_MS=30*60*1000; // compatibilidad histórica; no dispara cierre genérico
  const NINE_HOLE_WAIT_MS=25*60*1000;

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
  function isNineHoleGap(round){
    return !!(round?.configured&&!round?.endedAt&&hasScore(round,9)&&!hasScore(round,10));
  }
  function nineHoleAnchor(round){
    return scoreTime(round,9)??0;
  }
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
