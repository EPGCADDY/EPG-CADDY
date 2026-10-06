import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
const versusStart=html.indexOf('function versusParSpeech(diff){');
const versusEnd=html.indexOf('\nfunction segmentSpeech(title,holes){',versusStart);
assert(versusStart>=0&&versusEnd>versusStart,'No se encontr贸 formateador relativo al par');
const versusContext={};vm.createContext(versusContext);vm.runInContext(html.slice(versusStart,versusEnd),versusContext);
assert.equal(versusContext.versusParSpeech(0),'EVEN','el audio debe anunciar EVEN al quedar par');
assert.equal(versusContext.versusParSpeech(1),'1 sobre par','se conserva la locuci贸n arriba del par');
assert.equal(versusContext.versusParSpeech(-1),'1 bajo par','se conserva la locuci贸n bajo par');
const start=html.indexOf('function playerRecordedTimeline(player){');
const end=html.indexOf('window.GSCPlayerNameAudio=',start);
assert(start>=0&&end>start,'No se encontr贸 motor de audio por jugador');
const code=html.slice(start,end);

const FRONT=[1,2,3,4,5,6,7,8,9],BACK=[10,11,12,13,14,15,16,17,18],ALL=[...FRONT,...BACK];
const HOLE_SPEECH_NAMES={1:'uno',2:'dos',3:'tres',4:'cuatro',5:'cinco',6:'seis',7:'siete',8:'ocho',9:'nueve',10:'diez',11:'once',12:'doce',13:'trece',14:'catorce',15:'quince',16:'diecis茅is',17:'diecisiete',18:'dieciocho'};

function roundFrom(startHole,endHole){
  const order=startHole===1?[...FRONT,...BACK]:[...BACK,...FRONT],holes={};let tick=1;
  fo痘玘