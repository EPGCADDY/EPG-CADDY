(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.GSCRoundAutoSave=api})(globalThis,function(){
 'use strict';
 const WAIT_MS=45*60*1000;
 const front=Array.from({length:9},(_,i)=>i+1),back=front.map(h=>h+9),all=[...front,...back];
 function decision(round,now=Date.now()){
  if(!round?.configured||round.provisional||round.officiallyClosedAt||!round.players?.length)return null;
  const completed=(p,h)=>Number.isInteger(p.holes?.[h]?.gross)&&p.holes[h].status!=='x';
  if(round.players.every(p=>all.every(h=>completed(p,h))))return{kind:'complete',holesPlayed:all};
  for(const holes of [front,back]){
   if(!round.players.every(p=>holes.every(h=>completed(p,h))))continue;
   if(round.players.some(p=>all.some(h=>!holes.includes(h)&&p.holes?.[h])))continue;
   const times=round.players.flatMap(p=>holes.map(h=>Date.parse(p.holes[h].updatedAt))).filter(Number.isFinite);
   if(times.length!==round.players.length*9)continue;
   const lastScoreAt=Math.max(...times);
   if(now>=lastScoreAt+WAIT_MS)return{kind:'nine',holesPlayed:holes,lastScoreAt};
  }
  return null;
 }
 return{WAIT_MS,decision};
});
