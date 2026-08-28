import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/gscg-build" content="V358-IOS-SCORE-UNIVERSAL-PHYSICAL-RECOVERY-20260828"/);
assert.match(html,/gscg-ios-voice-recovery" content="V358-NATURAL-SCORE-AI-ONE-TOUCH-20260828"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v358-ios-score-universal-physical-recovery"/);
assert.match(html,/build:"V358"/);

const parserStart=html.indexOf("function parseScoreSequenceTranscript");
const parserEnd=html.indexOf("\nfunction parseProvisionalScoreTranscript",parserStart);
assert.ok(parserStart>0&&parserEnd>parserStart,"Falta el parser operacional de score");
const parserSource=html.slice(parserStart,parserEnd);
const players=[{id:"p1",name:"JAIME"},{id:"p2",name:"JORGE"}];
const numberWords={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const holePattern="(?:1[0-8]|[1-9]|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciseis|diecisiete|dieciocho|primero|primer|segundo|tercero|tercer|cuarto|quinto|sexto|septimo|octavo|noveno|decimo)";
const holeRepair=new RegExp(`\\b(?:hoy|oy|ollo)\\s+(?=(?:numero\\s+)?${holePattern}\\b)`,"g");
const normalizeScoreSpeech=value=>normalizeSpeech(value).replace(holeRepair,"hoyo ");
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numberWords[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const ordinals={primero:1,primer:1,segundo:2,tercero:3,tercer:3,cuarto:4,quinto:5,sexto:6,septimo:7,octavo:8,noveno:9,decimo:10};
const parseHoleNumberTokens=(tokens,start)=>{let index=start;while(["numero","num","no"].includes(tokens[index]))index++;const spoken=parseSpanishNumberTokens(tokens,index);return spoken||Number.isInteger(ordinals[tokens[index]])?spoken||{value:ordinals[tokens[index]],next:index+1}:null};
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const QUERY_WORDS=new Set(["como","que","dime","consulta"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_WORDS=new Set(["score","gross"]);
const SCORE_FILLERS=new Set(["con","un","una","de","en","el","del","para","hizo","hice","hicimos","hace","saque","saco","quedo","fueron","golpe","golpes","tiro","tiros","anota","anotar","registro","registrar","es","y","luego","despues","jugador","jugadora"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,index)=>{index=skipScoreFillers(tokens,index);if(tokens[index]==="par")return{gross:4,status:null,next:index+1};const number=parseSpanishNumberTokens(tokens,index);return number&&number.value>=1&&number.value<=30?{gross:number.value,status:null,next:number.next}:null};
const readOmittedScoreAt=()=>null,hasNamedOmissionIntent=()=>false,playerByRef=value=>players.find(player=>player.name===value)||null;
const operationalHoleComplete=(hole,entries)=>entries.some(entry=>entry.player==="JAIME"&&entry.hole===hole);
const parseScoreSequenceTranscript=new Function(
  "normalizeScoreSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","parseHoleNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",
  `${parserSource};return parseScoreSequenceTranscript`
)(normalizeScoreSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,parseHoleNumberTokens,matchPlayerAt,readOperationalScoreAt,readOmittedScoreAt,operationalHoleComplete,playerByRef,hasNamedOmissionIntent);

for(const [spoken,hole,gross] of [
  ["En el hoy número uno hice cuatro golpes",1,4],
  ["Hoyo primero saqué cinco golpes",1,5],
  ["Oy dos hice seis tiros",2,6]
]){
  const parsed=parseScoreSequenceTranscript(spoken,{defaultPlayer:players[0],defaultHole:1});
  assert.equal(parsed.ok,true,`Debe aceptar dictado natural: ${spoken}`);
  assert.deepEqual(parsed.entries.map(entry=>({player:entry.player,hole:entry.hole,gross:entry.gross})),[{player:"JAIME",hole,gross}]);
}
const multi=parseScoreSequenceTranscript("Hoy uno hice cuatro golpes, hoy número dos hice cinco golpes, hoy tercero hice seis golpes",{defaultPlayer:players[0],defaultHole:1});
assert.equal(multi.ok,true);
assert.deepEqual(multi.entries.map(({hole,gross})=>({hole,gross})),[{hole:1,gross:4},{hole:2,gross:5},{hole:3,gross:6}]);

const defaultStart=html.indexOf("function operationalDefaultVoicePlayer");
const defaultEnd=html.indexOf("\nfunction parseRoundScoreTranscript",defaultStart);
const chooseDefault=new Function("operationalPromptPlayer","operationalMissingPlayers","currentOperationalHole","round",`${html.slice(defaultStart,defaultEnd)};return operationalDefaultVoicePlayer`)(()=>null,()=>[players[1]],()=>1,{players});
assert.equal(chooseDefault(),players[1],"Un hoyo sin nombre debe usar el siguiente jugador pendiente, no quedar sin jugador");

const oneTouchStart=html.indexOf("let lastAiUniversalGestureAt=0");
const oneTouchEnd=html.indexOf("\n$(\"openGolfRules\")",oneTouchStart);
assert.ok(oneTouchStart>0&&oneTouchEnd>oneTouchStart,"Falta AI UNIVERSAL de un toque");
const oneTouchSource=html.slice(oneTouchStart,oneTouchEnd);
assert.ok(oneTouchSource.indexOf("openAiUniversalPanel(false,{focus:false})")<oneTouchSource.indexOf("startAiUniversalListening()"),"El panel debe abrir antes de escuchar");
assert.match(oneTouchSource,/pointerdown/);
assert.match(oneTouchSource,/primeAiUniversalSpeechFromGesture\(\)/);
const order=[],listeners={};
const openAndListen=new Function("$","window","openAiUniversalPanel","primeAiUniversalSpeechFromGesture","startAiUniversalListening",`${oneTouchSource};return openAiUniversalAndListen`)(
  ()=>({addEventListener:(type,handler)=>{listeners[type]=handler}}),{PointerEvent:function PointerEvent(){}},
  ()=>order.push("open"),()=>order.push("prime"),()=>order.push("listen")
);
assert.equal(typeof listeners.pointerdown,"function");
openAndListen({cancelable:true,preventDefault(){},stopPropagation(){}});
assert.deepEqual(order,["open","prime","listen"],"AI ∞ debe abrir la escucha en el mismo toque");

const sanitized=sanitizeVoiceHealth({event:"browser_fallback_score_rejected",build:"V358",context:"round",scoreFailure:"missing_player",transcript:"PROHIBIDO",name:"JAIME",latitude:14.6});
assert.equal(sanitized.scoreFailure,"missing_player");
for(const forbidden of ["transcript","name","latitude"])assert.equal(forbidden in sanitized,false);

console.log("PASS V358 · score natural iPhone + jugador pendiente + AI UNIVERSAL de un toque + privacidad");
