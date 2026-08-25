(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  else root.GSCTimerInactivity=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const LIMIT_MS=30*60*1000;

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

  function remainingMs(round,now=Date.now()){
    return Math.max(0,LIMIT_MS-Math.max(0,Number(now)-lastInstructionAt(round)));
  }

  function shouldStop(round,now=Date.now()){
    return !!(round?.configured&&!round?.endedAt&&remainingMs(round,now)===0);
  }

  return Object.freeze({LIMIT_MS,lastInstructionAt,remainingMs,shouldStop});
});
