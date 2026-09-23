import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
assert.match(html,/function stablefordPlayerBlock[\s\S]*?player-audio-button[\s\S]*?data-player-audio-id/,'Stableford debe exponer el mismo botón físico de audio por jugador');
assert.match(html,/closest\?\.\("\.player-audio-button\[data-player-audio-id\]"\)/,'El doble toque debe resolver el botón físico del jugador');

const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const HOLE_SPEECH_NAMES={1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho'};
const start=html.indexOf('function playerRecordedTimeline(player){');
const end=html.indexOf('window.GSCPlayerNameAudio=',start);
assert(start>=0&&end>start,'No se encontró motor de resultado acumulado por jugador');
const code=html.slice(start,end);

function makeRound(startHole,endHole){
  const order=startHole===1?[...FRONT,...BACK]:[...BACK,...FRONT];
  const selected=[];
  for(const h of order){selected.push(h);if(h===endHole)break;}
  const holes={};let tick=1;
  for(const h of selected)holes[h]={gross:4,net:4,par:4,updatedAt:new Date(tick++*1000).toISOString()};
  return {configured:true,players:[{id:'p1',name:'JAIME',holes}]};
}
function speechFor(round){
  const ctx={round,FRONT,BACK,ALL,HOLE_SPEECH_NAMES,isOmittedScore:()=>false,isUniversalesRound:()=>false,isFourBallRound:()=>false,totals:(player,holes)=>({count:holes.length,gross:holes.length*4,net:holes.length*4,par:holes.length*4}),versusParSpeech:()=> 'even'};
  vm.createContext(ctx);vm.runInContext(code,ctx);return ctx.requestedPlayerResultSpeech(round.players[0]);
}

let s=speechFor(makeRound(1,5));
assert.match(s,/JAIME, hasta el hoyo cinco\. Gros 20\. Neto 20\./);
assert.doesNotMatch(s,/Acumulado total/);

s=speechFor(makeRound(1,13));
assert.match(s,/JAIME, hasta el hoyo trece\. Gros 16\. Neto 16\./,'En segunda vuelta debe anunciar sólo la vuelta actual hasta el hoyo 13');
assert.match(s,/Acumulado total\. Gros 52\. Neto 52\./,'Después debe anunciar acumulado total');

s=speechFor(makeRound(10,13));
assert.match(s,/JAIME, hasta el hoyo trece\. Gros 16\. Neto 16\./);
assert.doesNotMatch(s,/Acumulado total/);

s=speechFor(makeRound(10,4));
assert.match(s,/JAIME, hasta el hoyo cuatro\. Gros 16\. Neto 16\./,'Si inicia por 10, al entrar al 1–9 debe anunciar la vuelta actual');
assert.match(s,/Acumulado total\. Gros 52\. Neto 52\./,'Si inicia por 10, debe acumular BACK + FRONT');

console.log('PASS doble toque/resultado: Medal y Stableford comparten botón; IN/OUT correcto en ambos órdenes; segundo nivel = acumulado total');
