import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index-grupal.html','utf8');
const code=html.slice(html.indexOf('function playedSegmentOrder(){'),html.indexOf('function recordScore(a){'));
for(const start of [1,10]){
 const FRONT=Array.from({length:9},(_,i)=>i+1),BACK=FRONT.map(h=>h+9),ALL=[...FRONT,...BACK];
 const round={players:[{holes:{}}],announced:{firstSegment:false,secondSegment:false,complete:false}};
 const ctx={round,FRONT,BACK,ALL,ensureAnnouncedState(){},segmentComplete:holes=>holes.every(h=>Number.isInteger(round.players[0].holes[h]?.gross)),segmentSpeech:(title,holes)=>`${title} [${holes.join(',')}]`};
 vm.createContext(ctx);vm.runInContext(code,ctx);
 const first=start===1?FRONT:BACK,second=start===1?BACK:FRONT;
 let t=0;
 for(const h of first){round.players[0].holes[h]={gross:4,updatedAt:new Date(++t*1000).toISOString()};if(h!==first.at(-1))assert.equal(ctx.closureSpeechIfDue(),'');}
 const firstSpeech=ctx.closureSpeechIfDue();
 assert.match(firstSpeech,start===1?/primera vuelta/:/segunda vuelta/);
 assert.doesNotMatch(firstSpeech,/Resultados totales\./);
 assert.equal(round.announced.complete,false);
 assert.equal(ctx.closureSpeechIfDue(),'');
 for(const h of second)round.players[0].holes[h]={gross:4,updatedAt:new Date(++t*1000).toISOString()};
 const secondSpeech=ctx.closureSpeechIfDue();
 assert.match(secondSpeech,start===1?/segunda vuelta/:/primera vuelta/);
 assert.match(secondSpeech,/Resultados totales\./);
 assert.equal(ctx.closureSpeechIfDue(),'');
}
console.log('PASS técnico: 1–9 primera, 10–18 segunda; total sólo con 18 hoyos, ambos órdenes. No certifica audio audible.');
