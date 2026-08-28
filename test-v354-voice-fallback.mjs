import assert from "node:assert/strict";
import fs from "node:fs";
import { sanitizeVoiceHealth } from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("./audit-project.mjs",import.meta.url),"utf8");

assert.match(html,/V358-SYNCHRONIZED-PROGRESSIVE-VOICE-20260828/);
assert.match(worker,/gscg-mobile-v358-synchronized-progressive-voice/);
assert.match(audit,/test-v354-voice-fallback\.mjs/);
assert.match(html,/function operationalDefaultVoicePlayer\(\)\{return operationalPromptPlayer\(\)\?\?\(\(round\?\.players\|\|\[\]\)\.length===1\?round\.players\[0\]:null\)\}/);

const parserStart=html.indexOf("function parseScoreSequenceTranscript");
const parserEnd=html.indexOf("\nfunction parseProvisionalScoreTranscript",parserStart);
assert.ok(parserStart>0&&parserEnd>parserStart);
const parserSource=html.slice(parserStart,parserEnd);
const players=[{id:"p1",name:"JAIME"},{id:"p2",name:"JORGE"}];
const numberWords={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18};
const parseSpanishNumberTokens=(tokens,index)=>{const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numberWords[raw];return Number.isInteger(value)?{value,next:index+1}:null};
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñü]+/gi," ").trim();
const QUERY_WORDS=new Set(["como","que","dime","consulta"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_FILLERS=new Set(["y","luego","gross","score"]),SCORE_WORDS=new Set(["scores"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,index)=>{if(tokens[index]==="par")return{gross:4,status:null,next:index+1};const number=parseSpanishNumberTokens(tokens,index);return number&&number.value>=1&&number.value<=30?{gross:number.value,status:null,next:number.next}:null};
const readOmittedScoreAt=()=>null,hasNamedOmissionIntent=()=>false,playerByRef=value=>players.find(player=>player.name===value)||null;
const operationalHoleComplete=(hole,entries)=>entries.some(entry=>entry.player==="JAIME"&&entry.hole===hole);
const parseScoreSequenceTranscript=new Function("normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",`${parserSource};return parseScoreSequenceTranscript`)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,readOmittedScoreAt,operationalHoleComplete,playerByRef,hasNamedOmissionIntent);

const natural=parseScoreSequenceTranscript("hoyo 1 cuatro, hoyo 2 cinco, hoyo 3 cinco",{defaultPlayer:players[0],defaultHole:1});
assert.equal(natural.ok,true);
assert.deepEqual(natural.entries.map(({player,hole,gross})=>({player,hole,gross})),[
  {player:"JAIME",hole:1,gross:4},
  {player:"JAIME",hole:2,gross:5},
  {player:"JAIME",hole:3,gross:5}
]);
const plural=parseScoreSequenceTranscript("hoyos 4 seis, hoyo 5 cuatro",{defaultPlayer:players[0],defaultHole:4});
assert.equal(plural.ok,true);
assert.deepEqual(plural.entries.map(({hole,gross})=>({hole,gross})),[{hole:4,gross:6},{hole:5,gross:4}]);

const processStart=html.indexOf("async function processBrowserVoiceTranscript");
const processEnd=html.indexOf("\nfunction startBrowserVoiceFallback",processStart);
const processSource=html.slice(processStart,processEnd);
assert.ok(processStart>0&&processEnd>processStart);
assert.ok(processSource.indexOf("parseRoundScoreTranscript(clean)")<processSource.indexOf("routeAiUniversalAppText(clean)"));
assert.match(processSource,/browser_fallback_round_applied/);
assert.match(processSource,/entryCount:count/);
assert.match(processSource,/NO RECONOCÍ LA TANDA/);
assert.ok(processSource.indexOf('openAiUniversalPanel(false,{focus:false})')<processSource.indexOf('submitAiUniversalText(clean,{voiceOnly:true})'));
assert.match(processSource,/browser_fallback_general_visible/);
assert.match(html,/speechSynthesis\.resume\?\.\(\)/);

const runtimeEvents=[],runtimeOrder=[],runtimeMatrices=[];
const makeBrowserProcessor=(parseResult,submitResult=true)=>new Function(
  "setPrimaryVoiceMatrix","parseSetupTranscript","applySetupChanges","reportVoiceHealth","renderDraft","resetSetupCapture","parseRoundScoreTranscript","isGeneralConversationIntent","aiUniversalLooksLikeScoreOrder","applyLiteralScores","routeAiUniversalAppText","aiUniversalRemember","aiUniversalSetState","speakAiUniversalText","openAiUniversalPanel","submitAiUniversalText","primaryVoiceStatusTarget","round",
  `let voiceContext="round",phase="idle";${processSource};return processBrowserVoiceTranscript`,
)(
  (...args)=>runtimeMatrices.push(args),()=>({ok:false}),()=>({ok:false}),
  (event,detail={})=>{runtimeEvents.push({event,detail});return true},()=>{},()=>{},
  ()=>parseResult,query=>/^como\b/i.test(query),query=>/\bhoyos?\b/i.test(query),
  parsed=>{runtimeOrder.push(`apply:${parsed.entries.length}`);return{ok:true}},()=>({handled:false}),()=>{},()=>{},()=>false,
  ()=>runtimeOrder.push("open"),async()=>{runtimeOrder.push("submit");return submitResult},()=>({textContent:""}),{configured:true},
);
const dynamicBatch=makeBrowserProcessor(natural);
assert.equal(await dynamicBatch("round","hoyo 1 cuatro, hoyo 2 cinco, hoyo 3 cinco"),true);
assert.deepEqual(runtimeOrder,["apply:3"]);
assert.deepEqual(runtimeEvents.find(item=>item.event==="browser_fallback_round_applied"),{event:"browser_fallback_round_applied",detail:{entryCount:3}});
assert.match(runtimeMatrices.at(-1)[2],/3 HOYOS REGISTRADOS/);

runtimeOrder.length=0;runtimeEvents.length=0;runtimeMatrices.length=0;
const dynamicGeneral=makeBrowserProcessor({matched:false,ok:false});
assert.equal(await dynamicGeneral("round","Cómo está el tráfico para ir de El Pulté a Pradera Concepción"),true);
assert.deepEqual(runtimeOrder,["open","submit"]);
assert.equal(runtimeEvents.some(item=>item.event==="browser_fallback_general_visible"),true);

const applied=sanitizeVoiceHealth({event:"browser_fallback_round_applied",build:"V355",context:"round",entryCount:3,transcript:"PROHIBIDO",name:"JAIME"});
assert.deepEqual(applied,{event:"browser_fallback_round_applied",build:"V355",context:"round",turn:0,elapsedMs:0,entryCount:3});
assert.equal(sanitizeVoiceHealth({event:"browser_fallback_unknown"}),null);

console.log("PASS V354 VOZ: un jugador registra 3 hoyos, plural aceptado, consulta general visible y telemetría privada");
