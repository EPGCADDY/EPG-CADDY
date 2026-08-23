import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const sessionApi=fs.readFileSync("api/session-grupal.js","utf8");
const players=["FITO","JAIME","NELSON","JUNIOR","PEDRO","CARLOS"].map((name,index)=>({id:`p${index+1}`,name,activeFrom:1,holes:{}}));
const round={players};
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const numbers={cero:0,uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numbers[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const playerByRef=value=>players.find(player=>player.id===value||player.name===value)||null;
const QUERY_WORDS=new Set(["consulta","dime","resultado"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_FILLERS=new Set(["y","luego","gross","score"]),SCORE_WORDS=new Set(["scores"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readGrossAt=(tokens,index)=>{index=skipScoreFillers(tokens,index);const parsed=parseSpanishNumberTokens(tokens,index);return parsed&&parsed.value>=1&&parsed.value<=30?{gross:parsed.value,next:parsed.next}:null};

const omissionStart=html.indexOf("const OMITTED_SCORE_PHRASES=");
const omissionEnd=html.indexOf("\nfunction playerMentionInTokens",omissionStart);
assert.ok(omissionStart>0&&omissionEnd>omissionStart,"No se encontró el vocabulario común de X");
const omissionSource=html.slice(omissionStart,omissionEnd);
const {readOmittedScoreAt,readOperationalScoreAt,hasNamedOmissionIntent}=new Function("skipScoreFillers","readGrossAt","matchPlayerAt",`${omissionSource};return{readOmittedScoreAt,readOperationalScoreAt,hasNamedOmissionIntent}`)(skipScoreFillers,readGrossAt,matchPlayerAt);

for(const phrase of ["cero","sin score","sin dato","sin resultado","no informó","no reportó","no dijo","no cantó","no dio score","no se sabe","ponle cero","no le anotes","marca x","anota equis","omitido","pendiente","ausente"]){
  const tokens=normalizeSpeech(phrase).split(" "),result=readOmittedScoreAt(tokens,0);
  assert.equal(result?.status,"x",`No reconoció omisión: ${phrase}`);
  assert.equal(result?.next,tokens.length,`No consumió completa la omisión: ${phrase}`);
}

const operationalStart=html.indexOf("function operationalPlayersForHole");
const operationalEnd=html.indexOf("\nfunction parseScoreSequenceTranscript",operationalStart);
assert.ok(operationalStart>0&&operationalEnd>operationalStart,"No se encontró el criterio operacional común");
const document={getElementById:()=>null};
const ALL=Array.from({length:18},(_,index)=>index+1);
const manualHoleResult=(player,hole)=>({recorded:!!player?.holes?.[hole],status:player?.holes?.[hole]?.status||null,gross:player?.holes?.[hole]?.gross??null});
const operational=new Function("round","playerByRef","manualHoleResult","document","ALL",`${html.slice(operationalStart,operationalEnd)};return{operationalHoleComplete,nextOperationalHole}`)(round,playerByRef,manualHoleResult,document,ALL);

const parserStart=html.indexOf("function parseScoreSequenceTranscript");
const parserEnd=html.indexOf("\nfunction parseProvisionalScoreTranscript",parserStart);
assert.ok(parserStart>0&&parserEnd>parserStart,"No se encontró el parser V270");
const parseScoreSequenceTranscript=new Function("normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",`${html.slice(parserStart,parserEnd)};return parseScoreSequenceTranscript`)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,readOmittedScoreAt,operational.operationalHoleComplete,playerByRef,hasNamedOmissionIntent);

const twoHoles=parseScoreSequenceTranscript("Fito cinco Jaime cuatro Nelson seis Junior cinco Pedro cuatro Carlos cero Fito cuatro Jaime cinco Nelson cinco Junior cuatro Pedro seis Carlos cuatro",{defaultHole:2});
assert.equal(twoHoles.ok,true);
assert.deepEqual(twoHoles.entries.map(entry=>`${entry.player}:${entry.hole}:${entry.status||entry.gross}`),[
  "FITO:2:5","JAIME:2:4","NELSON:2:6","JUNIOR:2:5","PEDRO:2:4","CARLOS:2:x",
  "FITO:3:4","JAIME:3:5","NELSON:3:5","JUNIOR:3:4","PEDRO:3:6","CARLOS:3:4"
]);
assert.equal(twoHoles.nextHole,4,"Dos bloques completos deben ejecutar ENTER dos veces");
const namedNoResult=parseScoreSequenceTranscript("Fito sin resultado",{defaultHole:4});
assert.equal(namedNoResult.ok,true);assert.equal(namedNoResult.entries[0].status,"x","Una omisión con la palabra resultado no puede confundirse con una consulta");
const promptedGross=parseScoreSequenceTranscript("cinco",{defaultHole:4,defaultPlayer:players[0]});
assert.equal(promptedGross.ok,true);assert.deepEqual(promptedGross.entries[0],{player:"FITO",hole:4,gross:5,status:null});
const promptedX=parseScoreSequenceTranscript("sin score",{defaultHole:4,defaultPlayer:players[1]});
assert.equal(promptedX.ok,true);assert.deepEqual(promptedX.entries[0],{player:"JAIME",hole:4,gross:null,status:"x"});

const incomplete=parseScoreSequenceTranscript("Fito cinco Jaime cuatro Nelson seis Junior cinco Pedro cuatro",{defaultHole:2});
assert.equal(incomplete.ok,true);assert.equal(incomplete.nextHole,2,"Un jugador faltante debe bloquear ENTER");

const explicit=parseScoreSequenceTranscript("hoyo siete Fito cinco",{defaultHole:3});
assert.equal(explicit.ok,true);assert.equal(explicit.entries[0].hole,7);assert.equal(explicit.explicitHole,true);

const corrected=parseScoreSequenceTranscript("Fito cinco Fito seis Jaime cuatro Nelson cinco Junior cuatro Pedro cinco Carlos cuatro",{defaultHole:5});
assert.equal(corrected.ok,true);assert.equal(corrected.entries.find(entry=>entry.player==="FITO").gross,6,"La última corrección del bloque debe prevalecer");assert.equal(corrected.nextHole,6);

players.slice(0,5).forEach(player=>player.holes[4]={gross:4});
const completesStored=parseScoreSequenceTranscript("Carlos cuatro",{defaultHole:4});
assert.equal(completesStored.nextHole,5,"Los scores confirmados en turnos previos deben completar el hoyo");
const ignored=new Set(players.slice(0,5).map(player=>`${player.id}:4`));
const stableReparse=parseScoreSequenceTranscript("Fito cuatro Jaime cuatro Nelson cuatro Junior cuatro Pedro cuatro Carlos cuatro",{defaultHole:4,ignoreRecordedKeys:ignored});
assert.equal(stableReparse.nextHole,5,"Reprocesar deltas del mismo ítem no debe adelantar prematuramente el cursor");
players.forEach(player=>{player.holes={}});

players[5].activeFrom=3;
const activeFive=parseScoreSequenceTranscript("Fito cuatro Jaime cuatro Nelson cuatro Junior cuatro Pedro cuatro",{defaultHole:2});
assert.equal(activeFive.nextHole,3,"Solo cuentan los jugadores activos en el hoyo");
players[5].activeFrom=1;

const hole18=parseScoreSequenceTranscript("Fito cuatro Jaime cuatro Nelson cuatro Junior cuatro Pedro cuatro Carlos cuatro",{defaultHole:18});
assert.equal(hole18.ok,true);assert.equal(hole18.nextHole,18,"El cursor nunca debe crear el hoyo 19");
const overflow=parseScoreSequenceTranscript("Fito cuatro Jaime cuatro Nelson cuatro Junior cuatro Pedro cuatro Carlos cuatro Fito cinco",{defaultHole:18});
assert.equal(overflow.ok,false,"Datos posteriores al cierre del hoyo 18 deben rechazarse");

const invalid=parseScoreSequenceTranscript("Fito cuatro Jaime palabra ajena",{defaultHole:2});
assert.equal(invalid.ok,false,"Una tanda inválida debe fallar completa");

assert.match(html,/function validateEntry\(x\)[\s\S]*?if\(status==="x"\)return\{ok:true,p,hole,gross:null,status\}/);
assert.match(html,/v\.p\.holes\[v\.hole\]=v\.status==="x"\?/);
assert.match(html,/function applyLiteralScores\(parsed\)[\s\S]*?operationalTargetHoleForEntries\(parsed\.entries\)/);
assert.match(html,/const saveManualHole=\(\)=>\{[\s\S]*?manualScoreEntry\(input\.dataset\.playerId,selectedHole,input\.value\)/);
assert.doesNotMatch(html,/const saveManualHole=\(\)=>\{[\s\S]*?round\.players\.every\(player=>manualHoleResult/);
assert.match(html,/function stablefordGrossAt\(tokens,start,hole\)\{return readOperationalScoreAt\(tokens,start,hole\)\}/);
assert.match(html,/parseRoundScoreTranscript=function\(transcript,options=\{\}\)[\s\S]*?baseParseRoundScoreTranscript\(transcript,merged\)/);
assert.match(html,/defaultPlayer:options\.defaultPlayer\?\?operationalPromptPlayer\(\)/,"General y Stableford deben aceptar la respuesta contextual al recordatorio");
assert.match(html,/roundLiveOperationalHole/);
assert.match(html,/INGRESO OFICIAL · HOYO \$\{selectedHole\} · NOMBRE \+ SCORE · X = SIN DATO/);
assert.match(html,/setTimeout\(\(\)=>\{roundMissingPromptTimer=null;[\s\S]*?speakAuthorized\("missing_score",text\)[\s\S]*?\},2000\)/);
assert.match(html,/const text=`Falta \$\{playerVoiceAlias\(player\)\}`/);
assert.match(html,/ALLOWED_SPEECH_REASONS=new Set\(\["closure","query","query_accumulated","missing_score"\]\)/);
assert.doesNotMatch(html,/roundMissingPromptTimer[\s\S]{0,120}status:"x"/,"El recordatorio no puede fabricar X por tiempo");
assert.match(sessionApi,/El cursor ya indica automáticamente el hoyo activo/);
assert.match(sessionApi,/Después de Falta NOMBRE, una respuesta con solo score o solo omisión pertenece exclusivamente a ese jugador/);

console.log("PASS V270 · cursor automático General/Stableford, ENTER por bloque, X amplia y corrección retroactiva");
