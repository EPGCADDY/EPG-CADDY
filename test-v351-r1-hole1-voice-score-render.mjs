import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

function sourceBetween(start,end){
  const from=html.indexOf(start),to=html.indexOf(end,from);
  assert.ok(from>=0&&to>from,`No se encontró ${start}`);
  return html.slice(from,to);
}

assert.match(html,/gscg-hole1-voice" content="V351-R2-IOS-TOUCH-HOLE1-RENDER-20260827"/);
assert.match(html,/function operationalDefaultPlayer\(hole=currentOperationalHole\(\)\)[\s\S]*?active\.length===1\?active\[0\]:null/);
assert.match(html,/return\{handled:true,silent:result\.ok,answer:result\.ok\?"Score registrado en la tarjeta\."/);
assert.match(html,/if\(local\.silent\)\{setPrimaryVoiceMatrix\("idle",context\);return true\}/);

const singlePlayer={id:"p1",name:"JAIME",handicap:0,tee:"Blanco",holes:{},lastHole:0,activeFrom:1};
const defaultSource=sourceBetween("function operationalDefaultPlayer","\nfunction operationalCaptureQuiet");
const makeDefaultPlayer=(players,prompted=null)=>new Function(
  "operationalPromptPlayer","operationalPlayersForHole","currentOperationalHole",
  `${defaultSource};return operationalDefaultPlayer`
)(()=>prompted,()=>players,()=>1);
assert.equal(makeDefaultPlayer([singlePlayer])(),singlePlayer,"Una ronda individual debe aceptar hoyo + score sin repetir el nombre");
assert.equal(makeDefaultPlayer([singlePlayer,{id:"p2",name:"JORGE"}])(),null,"Una ronda grupal no puede adivinar el jugador");
assert.equal(makeDefaultPlayer([singlePlayer,{id:"p2",name:"JORGE"}],singlePlayer)(),singlePlayer,"El recordatorio explícito conserva prioridad");

const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const numberWords={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numberWords[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const players=[singlePlayer];
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const playerByRef=value=>players.find(player=>player.id===value||player.name===value)||null;
const QUERY_WORDS=new Set(["consulta","dime","resultado"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_FILLERS=new Set(["y","luego","gross","score"]),SCORE_WORDS=new Set(["scores"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,index)=>{index=skipScoreFillers(tokens,index);const parsed=parseSpanishNumberTokens(tokens,index);return parsed&&parsed.value>=1&&parsed.value<=30?{gross:parsed.value,status:null,next:parsed.next}:null};
const parseSource=sourceBetween("function parseScoreSequenceTranscript","\nfunction parseProvisionalScoreTranscript");
const parseScoreSequenceTranscript=new Function(
  "normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",
  `${parseSource};return parseScoreSequenceTranscript`
)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,()=>null,()=>true,playerByRef,()=>false);

const parsed=parseScoreSequenceTranscript("hoyo uno cuatro",{defaultPlayer:makeDefaultPlayer(players)(),defaultHole:1});
assert.equal(parsed.ok,true);
assert.deepEqual(parsed.entries,[{player:"JAIME",hole:1,gross:4,status:null}]);

const ambiguous=parseScoreSequenceTranscript("hoyo uno cuatro",{defaultPlayer:makeDefaultPlayer([singlePlayer,{id:"p2",name:"JORGE"}])(),defaultHole:1});
assert.equal(ambiguous.ok,false,"Con varios jugadores el nombre continúa siendo obligatorio");

const round={configured:true,provisional:false,officiallyClosedAt:null,players,announced:{front:false,back:false,complete:false}};
const PAR=Array(18).fill(4),isOmittedScore=score=>score?.status==="x";
const validateSource=sourceBetween("function validateEntry","\nfunction saveEntry");
const validateEntry=new Function("round","playerByRef",`${validateSource};return validateEntry`)(round,playerByRef);
const scoreObject=(player,hole,gross)=>({hole,gross,par:PAR[hole-1],si:hole,strokes:0,net:gross,diff:gross-PAR[hole-1],updatedAt:new Date().toISOString()});
const saveSource=sourceBetween("function saveEntry","\nfunction ensureAnnouncedState");
const saveEntry=new Function("round","validateEntry","scoreObject","PAR","isOmittedScore",`${saveSource};return saveEntry`)(round,validateEntry,scoreObject,PAR,isOmittedScore);
let persisted="",persistCount=0,renderCount=0;
const recordSource=sourceBetween("function recordScore","\nfunction recordScores");
const recordScore=new Function(
  "round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",
  `${recordSource};return recordScore`
)(round,validateEntry,()=>false,saveEntry,()=>"",()=>{persistCount++;persisted=JSON.stringify(round)},()=>{renderCount++});
const recorded=recordScore(parsed.entries[0]);
assert.equal(recorded.ok,true);
assert.equal(round.players[0].holes[1].gross,4);
assert.equal(JSON.parse(persisted).players[0].holes[1].gross,4,"El score del hoyo 1 debe quedar persistido");
assert.equal(persistCount,1);
assert.equal(renderCount,1,"El escritor oficial debe renderizar inmediatamente");

const FRONT=Array.from({length:9},(_,index)=>index+1),BACK=Array.from({length:9},(_,index)=>index+10),ALL=[...FRONT,...BACK];
const totals=(player,holes)=>{const scores=holes.map(hole=>player.holes[hole]).filter(Boolean);return{count:scores.length,gross:scores.reduce((sum,score)=>sum+score.gross,0),net:scores.reduce((sum,score)=>sum+score.net,0),par:scores.reduce((sum,score)=>sum+score.par,0)}};
const derivedScoreForHole=(player,hole)=>player.holes[hole]||null;
const grossMarkHtml=score=>String(score.gross);
const playerBlockSource=sourceBetween("function playerBlock","\nfunction isRoundComplete");
const playerBlock=new Function(
  "round","totals","FRONT","BACK","ALL","TEES","matrixFor","derivedScoreForHole","isOmittedScore","escapeHtml","grossMarkHtml","resultClass","vr","provisionalProfileComplete","yds10NameSafe","playerHole10AliasClass","playerHole10Label","strokesOnHole","firstPlayerSpacer",
  `${playerBlockSource};return playerBlock`
)(round,totals,FRONT,BACK,ALL,{Blanco:{label:"BLANCAS",color:"#fff",yds:Array(18).fill(0),front:0,back:0,total:0}},()=>ALL,derivedScoreForHole,isOmittedScore,value=>String(value),grossMarkHtml,()=>"",value=>String(value),()=>false,value=>String(value),()=>"",player=>player.name,()=>0,()=>"");
const cardHtml=playerBlock(singlePlayer,1);
assert.match(cardHtml,/data-round-player="p1" data-round-hole="1"[^>]*>4<\/td>/,"El Gross 4 debe aparecer visualmente en la casilla del hoyo 1");

console.log("PASS V351-R2 · voz iOS dentro del toque + hoyo 1 -> escritor oficial -> persistencia -> render visual; grupos permanecen sin adivinación");
