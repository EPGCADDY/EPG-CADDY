import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sourceBetween=(start,end)=>{
  const from=html.indexOf(start),to=html.indexOf(end,from);
  assert.ok(from>=0&&to>from,`No se encontró ${start}`);
  return html.slice(from,to);
};

assert.match(html,/gscg-score-voice-matrix" content="V351-R5-NORMAL-STABLEFORD-MATCH-FOURBALL-1-6-20260828"/);
assert.match(html,/function parseNamedScoreSegments[\s\S]*?"ambiguous_score":"missing_score"/);
assert.match(html,/reportVoiceHealth\(local\.ok\?"browser_fallback_score_applied":"browser_fallback_score_rejected",local\.ok\?\{\}:\{scoreFailure:/);
assert.match(html,/parseRoundScoreTranscript=function\(transcript,options=\{\}\)[\s\S]*?isStablefordRound\(\)\?parseStablefordTranscript\(transcript,merged\):baseParseRoundScoreTranscript\(transcript,merged\)/);

const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const WORD_NUMBERS={cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,start)=>{const raw=tokens[start],value=/^\d+$/.test(raw)?Number(raw):WORD_NUMBERS[raw];return Number.isInteger(value)?{value,next:start+1}:null};
const ROMAN={I:1,II:2,III:3,IV:4,V:5,VI:6,VII:7,VIII:8,IX:9,XI:11,XII:12};
const parseScoreNumberTokens=(tokens,start)=>{const spoken=parseSpanishNumberTokens(tokens,start);if(spoken)return spoken;const value=ROMAN[String(tokens[start]||"").toUpperCase()];return Number.isInteger(value)?{value,next:start+1}:null};
const SCORE_WORDS=new Set(["gross","gros","score","scores","scor","escor"]);
const SCORE_FILLERS=new Set(["con","un","una","de","en","el","del","para","hizo","hace","anota","anotar","anotale","apunta","apuntar","apuntale","pon","ponle","mete","metele","registro","registrar","es","y","luego","despues","jugador","jugadora","golpe","golpes","tiro","tiros"]);
const CORRECTION_WORDS=new Set(["correccion","corrijo","corrigiendo","corregir","corrige","corregido"]);
const QUERY_WORDS=new Set(["consulta","consultar","dime","decime","dame","repite","repiteme","repetir","cuanto","cuantos","cuanta","cuantas","cual","cuales","resultado","resultados","como","acumulado","acumulados","neto","netos","total","totales"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,start)=>{const index=skipScoreFillers(tokens,start);if(tokens[index]==="x"||tokens[index]==="equis")return{gross:null,status:"x",next:index+1};const parsed=parseScoreNumberTokens(tokens,index);return parsed&&parsed.value>=1&&parsed.value<=30?{gross:parsed.value,status:null,next:parsed.next}:null};
const readOmittedScoreAt=(tokens,start)=>{const index=skipScoreFillers(tokens,start);return tokens[index]==="x"||tokens[index]==="equis"?{gross:null,status:"x",next:index+1}:null};
const hasNamedOmissionIntent=()=>false;
const parserSource=[
  sourceBetween("function scoreHoleMentions","\nfunction parseNamedScoreSegments"),
  sourceBetween("function parseNamedScoreSegments","\nfunction parseScoreSequenceTranscript"),
  sourceBetween("function parseScoreSequenceTranscript","\nfunction parseProvisionalScoreTranscript")
].join("\n");
const validateSource=sourceBetween("function validateEntry","\nfunction saveEntry");
const saveSource=sourceBetween("function saveEntry","\nfunction ensureAnnouncedState");
const recordOneSource=sourceBetween("function recordScore","\nfunction recordScores");
const recordManySource=sourceBetween("function recordScores","\nfunction editDistance");

const NAMES=["JAIME","GUSTAVO","ANA","LUIS","MARTA","CARLOS"];
const WORD_SCORES=["cuatro","cinco","seis","siete","ocho","nueve"];
const ROMAN_SCORES=["IV","V","VI","VII","VIII","IX"];
const DIGIT_SCORES=["4","5","6","7","8","9"];
const allowedCounts={general:[1,2,3,4,5,6],stableford:[1,2,3,4,5,6],match_play:[2,4,6],four_ball:[2,4,6]};

function phrase(players,scores,{holeFirst=false,holeLast=false,noise=false}={}){
  const body=players.map((player,index)=>`${player.name} ${noise?"terminó con ":""}${scores[index]} golpes`).join(" y ");
  if(holeFirst)return`En el hoyo uno ${body}`;
  if(holeLast)return`${body} en el hoyo uno`;
  return body;
}

let configurations=0,voiceFlows=0,scoreWrites=0;
for(const [mode,counts] of Object.entries(allowedCounts))for(const count of counts){
  const players=NAMES.slice(0,count).map((name,index)=>({id:`${mode}-${count}-${index+1}`,name,handicap:index*3,tee:"Blanco",holes:{},lastHole:0,activeFrom:1}));
  const round={configured:true,mode,officiallyClosedAt:null,provisional:false,players,announced:{front:false,back:false,complete:false}};
  const playerByRef=value=>players.find(player=>player.id===value||player.name===value)||null;
  const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
  const operationalHoleComplete=(hole,entries=[])=>players.every(player=>entries.some(entry=>entry.player===player.name&&entry.hole===hole));
  const parseScoreSequenceTranscript=new Function(
    "normalizeSpeech","QUERY_WORDS","hasNamedOmissionIntent","readOmittedScoreAt","readOperationalScoreAt","parseSpanishNumberTokens","matchPlayerAt","SCORE_FILLERS","CORRECTION_WORDS","SCORE_WORDS","skipScoreFillers","playerByRef","operationalHoleComplete",
    `${parserSource};return parseScoreSequenceTranscript`
  )(normalizeSpeech,QUERY_WORDS,hasNamedOmissionIntent,readOmittedScoreAt,readOperationalScoreAt,parseSpanishNumberTokens,matchPlayerAt,SCORE_FILLERS,CORRECTION_WORDS,SCORE_WORDS,skipScoreFillers,playerByRef,operationalHoleComplete);
  const variants=[
    phrase(players,WORD_SCORES,{holeFirst:true}),
    phrase(players,DIGIT_SCORES),
    phrase(players,ROMAN_SCORES,{holeLast:true}),
    phrase(players,WORD_SCORES,{holeLast:true,noise:true})
  ];
  for(const transcript of variants){
    for(const player of players)player.holes={};
    const parsed=parseScoreSequenceTranscript(transcript,{defaultPlayer:count===1?players[0]:null,defaultHole:1});
    assert.equal(parsed.ok,true,`${mode}/${count}: ${transcript}`);
    assert.equal(parsed.entries.length,count,`${mode}/${count} debe conservar todos los jugadores`);
    let renderCount=0,persisted="";
    const PAR=Array(18).fill(4),isOmittedScore=score=>score?.status==="x";
    const validateEntry=new Function("round","playerByRef",`${validateSource};return validateEntry`)(round,playerByRef);
    const scoreObject=(player,hole,gross)=>({hole,gross,par:4,strokes:0,net:gross,diff:gross-4,...(mode==="stableford"?{points:Math.max(0,2-(gross-4))}:{})});
    const saveEntry=new Function("round","validateEntry","scoreObject","PAR","isOmittedScore",`${saveSource};return saveEntry`)(round,validateEntry,scoreObject,PAR,isOmittedScore);
    const writerArgs=[round,validateEntry,()=>false,saveEntry,()=>"",()=>{persisted=JSON.stringify({mode,players})},()=>{renderCount++}];
    const recordScore=new Function("round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",`${recordOneSource};return recordScore`)(...writerArgs);
    const recordScores=new Function("round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",`${recordManySource};return recordScores`)(...writerArgs);
    const written=parsed.entries.length===1?recordScore(parsed.entries[0]):recordScores({entries:parsed.entries});
    assert.equal(written.ok,true,`${mode}/${count} debe terminar en el escritor oficial`);scoreWrites+=parsed.entries.length;
    const restored=JSON.parse(persisted);
    assert.deepEqual(restored.players.map(player=>player.holes[1].gross),DIGIT_SCORES.slice(0,count).map(Number));
    assert.equal(renderCount,1);
    voiceFlows++;
  }
  configurations++;
}

const rejectedQuestion=(()=>{
  const players=[{id:"q1",name:"JAIME",holes:{}}],playerByRef=value=>players.find(player=>player.name===value)||null,matchPlayerAt=(tokens,index)=>tokens[index]==="jaime"?{player:players[0],next:index+1}:null;
  const operationalHoleComplete=()=>false;
  const parse=new Function("normalizeSpeech","QUERY_WORDS","hasNamedOmissionIntent","readOmittedScoreAt","readOperationalScoreAt","parseSpanishNumberTokens","matchPlayerAt","SCORE_FILLERS","CORRECTION_WORDS","SCORE_WORDS","skipScoreFillers","playerByRef","operationalHoleComplete",`${parserSource};return parseScoreSequenceTranscript`)(normalizeSpeech,QUERY_WORDS,hasNamedOmissionIntent,readOmittedScoreAt,readOperationalScoreAt,parseSpanishNumberTokens,matchPlayerAt,SCORE_FILLERS,CORRECTION_WORDS,SCORE_WORDS,skipScoreFillers,playerByRef,operationalHoleComplete);
  return parse("¿Cuánto hizo Jaime en el hoyo uno?",{defaultHole:1});
})();
assert.equal(rejectedQuestion.ok,false,"Una pregunta no puede escribir score");
assert.equal(configurations,18);
assert.equal(voiceFlows,72);
assert.equal(scoreWrites,264);

console.log("PASS V351-R5 · 18 configuraciones · 72 recorridos de voz · 264 Gross escritos · Normal/Stableford 1–6 · Match/Four Ball 2/4/6");
