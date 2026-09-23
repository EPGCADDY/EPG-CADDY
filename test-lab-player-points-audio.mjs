import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
const start=html.indexOf('function playerRecordedTimeline(player){');
const end=html.indexOf('window.GSCPlayerNameAudio=',start);
assert(start>=0&&end>start,'No se encontró motor de audio por jugador');
const code=html.slice(start,end);

const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const HOLE_SPEECH_NAMES={1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'dieciséis',17:'diecisiete',18:'dieciocho'};

function roundFrom(startHole,endHole){
  const order=startHole===1?[...FRONT,...BACK]:[...BACK,...FRONT],holes={};let tick=1;
  for(const h of order){holes[h]={gross:4,net:4,par:4,updatedAt:new Date(tick++*1000).toISOString()};if(h===endHole)break;}
  return {configured:true,mode:'general',players:[{id:'p1',name:'JAIME',holes},{id:'p2',name:'RODRIGO',holes:structuredClone(holes)},{id:'p3',name:'FRANCISCO',holes:structuredClone(holes)},{id:'p4',name:'RICARDO',holes:structuredClone(holes)}]};
}
function run(mode,startHole,endHole){
  const round=roundFrom(startHole,endHole);round.mode=mode;
  const ctx={round,FRONT,BACK,ALL,HOLE_SPEECH_NAMES,isOmittedScore:()=>false,
    isUniversalesRound:()=>mode==='universales',isStablefordRound:()=>mode==='stableford',isFourBallRound:()=>mode==='four_ball',
    universalesSegment:holes=>({pointsById:{p1:holes.length*3}}),
    stablefordTotals:(player,holes)=>({points:holes.length*2,count:holes.length}),
    window:{GSCFourBall:{teamIndexForPlayer:index=>Math.floor(index/2)}},
    totals:(player,holes)=>({count:holes.length,gross:holes.length*4,net:holes.length*4,par:holes.length*4}),
    versusParSpeech:()=> 'even'};
  vm.createContext(ctx);vm.runInContext(code,ctx);
  return ctx.requestedPlayerResultSpeech(round.players[0]);
}

for(const mode of ['universales','stableford']){
  let speech=run(mode,1,5);
  assert.match(speech,/Puntos /i,mode+' debe anunciar puntos');
  assert.doesNotMatch(speech,/Gros|Neto/i,mode+' NO debe anunciar scores');

  speech=run(mode,1,13);
  assert.match(speech,/Acumulado total\. Puntos /i,mode+' debe dar segundo nivel acumulado en puntos');
  assert.doesNotMatch(speech,/Gros|Neto/i,mode+' acumulado NO debe anunciar scores');

  speech=run(mode,10,4);
  assert.match(speech,/Acumulado total\. Puntos /i,mode+' debe acumular correctamente si inicia por hoyo 10');
  assert.doesNotMatch(speech,/Gros|Neto/i,mode+' desde hoyo 10 NO debe anunciar scores');
}

console.log('PASS doble toque: UNIVERSALES y STABLEFORD anuncian PUNTOS exclusivamente, incluyendo segundo nivel acumulado y comienzo por 1 o 10');
