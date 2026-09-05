import assert from "node:assert/strict";
import fs from "node:fs";
import {requestUniversalResponse} from "./api/universal-ai.js";

const capture=fs.readFileSync("server-voice-capture.js","utf8");
const transcriptionApi=fs.readFileSync("api/voice-transcribe.js","utf8");
const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(capture,/SETUP_SPEECH_THRESHOLD=\.009,ROUND_SPEECH_THRESHOLD=\.0045/);
assert.match(capture,/requestContext==="round"\?ROUND_SPEECH_THRESHOLD:SETUP_SPEECH_THRESHOLD/);
assert.match(transcriptionApi,/El número de hoyo dicho una vez se aplica a todos los jugadores siguientes hasta que se diga otro hoyo/);
assert.match(worker,/v375-fast-universal-sensitive-score/);
assert.match(audit,/test-v375-fast-universal-sensitive-score\.mjs/);

const calls=[];
const fetchImpl=async(url,options)=>{
  calls.push({url,options});
  return{
    ok:true,status:200,headers:{get:()=>null},
    json:async()=>({model:"gateway-fast-test",output:[{type:"message",content:[{type:"output_text",text:"Respuesta inmediata en español."}]}]})
  };
};
const fast=await requestUniversalResponse({input:[{role:"user",content:"Explica la fotosíntesis"}]},{
  apiKey:"direct-key",gatewayToken:"gateway-key",preferGateway:true,
  deadlineMs:Date.now()+10_000,fetchImpl,sleepImpl:async()=>{}
});
assert.equal(fast.ok,true);
assert.equal(fast.gateway,true);
assert.equal(calls.length,1);
assert.match(calls[0].url,/ai-gateway\.vercel\.sh/);
assert.equal(calls[0].options.headers.Authorization,"Bearer gateway-key");

const players=["JUAN","PEDRO","LUIS","TOMÁS"].map((name,index)=>({id:`p${index+1}`,name}));
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const numbers={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numbers[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>normalizeSpeech(item.name)===tokens[index]);return player?{player,next:index+1}:null};
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
const scores=parse("Hoyo 1 Juan cuatro Pedro cinco Luis seis Tomás cuatro",{defaultHole:1});
assert.equal(scores.ok,true);
assert.deepEqual(scores.entries.map(entry=>[entry.player,entry.hole,entry.gross]),[["JUAN",1,4],["PEDRO",1,5],["LUIS",1,6],["TOMÁS",1,4]]);

console.log("PASS V375 · Gateway primero, Score sensible y cuatro jugadores con un solo hoyo");
