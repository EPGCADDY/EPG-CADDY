(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.GSCPreviousRound=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const GENERAL="general";
  const STABLEFORD="stableford";
  const MATCH_PLAY="match_play";

  function modeOf(value){return value?.mode===STABLEFORD?STABLEFORD:value?.mode===MATCH_PLAY?MATCH_PLAY:GENERAL}
  function validRound(value){return !!(value&&value.configured&&Array.isArray(value.players)&&value.players.length&&value.id)}
  function clone(value){return value?JSON.parse(JSON.stringify(value)):null}
  function timestamp(value){const parsed=new Date(value?.createdAt||0).getTime();return Number.isFinite(parsed)?parsed:0}
  function orderedRounds(archive,mode){
    return (Array.isArray(archive)?archive:[])
      .filter(validRound)
      .filter(value=>modeOf(value)===mode)
      .slice()
      .sort((a,b)=>timestamp(a)-timestamp(b)||String(a.id).localeCompare(String(b.id)));
  }
  function resolve(archive,current,modeHint=null){
    const mode=[STABLEFORD,MATCH_PLAY,GENERAL].includes(modeHint)?modeHint:validRound(current)?modeOf(current):GENERAL;
    const candidates=orderedRounds(archive,mode);
    const latest=candidates[candidates.length-1]||null;
    if(!latest)return{available:false,mode,label:"RONDA PREVIA",relation:null,target:null};
    if(!validRound(current)||modeOf(current)!==mode){
      return{available:true,mode,label:"RONDA PREVIA",relation:"previous",target:clone(latest)};
    }
    if(latest.id!==current.id){
      return{available:true,mode,label:"RONDA ACTUAL",relation:"current",target:clone(latest)};
    }
    const previous=candidates.filter(value=>value.id!==current.id).at(-1)||null;
    return previous
      ?{available:true,mode,label:"RONDA PREVIA",relation:"previous",target:clone(previous)}
      :{available:false,mode,label:"RONDA PREVIA",relation:null,target:null};
  }

  return Object.freeze({GENERAL,STABLEFORD,MATCH_PLAY,modeOf,orderedRounds,resolve});
});
