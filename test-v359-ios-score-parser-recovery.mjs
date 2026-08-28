import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");
assert.match(html,/V363-RECORDED-MOBILE-BEHAVIOR-20260828/);
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior/);
assert.match(audit,/test-v359-ios-score-parser-recovery\.mjs/);
assert.match(html,/while\(\["numero","no"\]\.includes\(tokens\[holeAt\]\)\)holeAt\+\+/);
assert.match(html,/if\(!score&&!named&&entries\.length&&!previouslyExplicit\)/);
assert.match(html,/"golpe","golpes","tiro","tiros"/);

const players=[{id:"p1",name:"JAIME"},{id:"p2",name:"GUSTAVO"}];
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const numbers={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numbers[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const playerByRef=value=>players.find(player=>player.name===value||player.id===value)||null;
const QUERY_WORDS=new Set(["consulta","dime","resultado"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_WORDS=new Set(["gross","score","scores"]);
const SCORE_FILLERS=new Set(["con","un","una","de","en","el","del","para","hizo","hace","anota","anotar","registro","registrar","es","y","luego","despues","jugador","jugadora","numero","no","golpe","golpes","tiro","tiros","marco","marca","saco","saque","metio","puso","pone","le","fue","fueron"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,index)=>{index=skipScoreFillers(tokens,index);const parsed=parseSpanishNumberTokens(tokens,index);return parsed&&parsed.value>=1&&parsed.value<=30?{gross:parsed.value,status:null,next:parsed.next}:null};
const readOmittedScoreAt=()=>null,hasNamedOmissionIntent=()=>false;
const operationalHoleComplete=(hole,entries)=>players.every(player=>entries.some(entry=>entry.player===player.name&&entry.hole===hole));
const nextOperationalHole=(hole,entries)=>operationalHoleComplete(hole,entries)&&hole<18?hole+1:hole;
const start=html.indexOf("function parseScoreSequenceTranscript"),end=html.indexOf("\nfunction parseProvisionalScoreTranscript",start);
assert.ok(start>0&&end>start);
const parse=new Function("normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","nextOperationalHole","playerByRef","hasNamedOmissionIntent",`${html.slice(start,end)};return parseScoreSequenceTranscript`)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,readOmittedScoreAt,operationalHoleComplete,nextOperationalHole,playerByRef,hasNamedOmissionIntent);

for(const [phrase,hole,scores] of [
  ["en el hoyo número uno Jaime hizo cuatro golpes y Gustavo tiró cinco",1,[4,5]],
  ["score del hoyo número 2 para Jaime 5 y para Gustavo 4 golpes",2,[5,4]],
  ["Jaime hizo seis y Gustavo hizo cinco en el hoyo número tres",3,[6,5]],
]){
  const result=parse(phrase,{defaultHole:1});
  assert.equal(result.ok,true,phrase);
  assert.deepEqual(result.entries.map(entry=>[entry.player,entry.hole,entry.gross]),[["JAIME",hole,scores[0]],["GUSTAVO",hole,scores[1]]]);
}

assert.equal(parse("hoyo número uno quizá Jaime cuatro",{defaultHole:1}).ok,false,"Una palabra desconocida no puede fabricar un score");
console.log("PASS V359 · iPhone interpreta número, golpes, tiró y hoyo al final para dos jugadores sin adivinar");
