import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
const start=html.indexOf('function playerRecordedTimeline(player){');
const end=html.indexOf('window.GSCPlayerNameAudio=',start);
assert(start>=0&&end>start,'No se encontró motor de doble toque');
const code=html.slice(start,end);
const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const HOLE_SPEECH_NAMES={1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho'};
const round={configured:true,players:[{id:'p1',name:'JAIME',holes:{1:{gross:4,updatedAt:'2026-09-23T10:00:01Z'},2:{gross:4,updatedAt:'2026-09-23T10:00:02Z'},3:{gross:4,updatedAt:'2026-09-23T10:00:03Z'}}}]};
function run(mode){
  const ctx={
    round,FRONT,BACK,ALL,HOLE_SPEECH_NAMES,isOmittedScore:()=>false,
    isUniversalesRound:()=>mode==='universales',
    isStablefordRound:()=>mode==='stableford',
    isFourBallRound:()=>mode==='four_ball',
    universalesSegment:holes=>({pointsById:{p1:holes.length*3}}),
    stablefordTotals:(player,holes)=>({points:holes.length*2,count:holes.length}),
    totals:(player,holes)=>({count:holes.length,gross:holes.length*4,net:holes.length*4,par:holes.length*4}),
    versusParSpeech:()=> 'even'
  };
  vm.createContext(ctx);vm.runInContext(code,ctx);return ctx.requestedPlayerResultSpeech(round.players[0]);
}
const u=run('universales');assert.match(u,/Puntos 9\./);assert.doesNotMatch(u,/Gros|Neto/);
const s=run('stableford');assert.match(s,/Puntos 6\./);assert.doesNotMatch(s,/Gros|Neto/);
const fball=run('four_ball');assert.match(fball,/Gros 12\. Neto 12\./);assert.doesNotMatch(fball,/Puntos/);
console.log('PASS doble toque: UNIVERSALES=PUNTOS · STABLEFORD=PUNTOS · FOUR BALL=GROSS/NETO');
