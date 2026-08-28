import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sourceBetween=(start,end)=>{
  const from=html.indexOf(start),to=html.indexOf(end,from);
  assert.ok(from>=0&&to>from,`No se encontró ${start}`);
  return html.slice(from,to);
};

assert.match(html,/gscg-consecutive-hole-voice" content="V351-R6-CONSECUTIVE-HOLES-VOICE-SCORE-20260828"/);
assert.match(html,/gscg-hybrid-consecutive-hole-voice" content="V351-R7-HYBRID-CONSECUTIVE-HOLES-VOICE-SCORE-20260828"/);
assert.match(html,/function parseMultiHoleScoreSegments[\s\S]*?parseHoleListScoreSegments[\s\S]*?parseHoleFirstScoreBlocks/);
assert.match(html,/const listed=parseHoleListScoreSegments[\s\S]*?if\(listed\?\.ok\)return listed[\s\S]*?const blocked=parseHoleFirstScoreBlocks[\s\S]*?if\(blocked\?\.ok\)return blocked/);

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
const parserSource=sourceBetween("function scoreHoleMentions","\nfunction parseProvisionalScoreTranscript");
const validateSource=sourceBetween("function validateEntry","\nfunction saveEntry");
const saveSource=sourceBetween("function saveEntry","\nfunction ensureAnnouncedState");
const recordManySource=sourceBetween("function recordScores","\nfunction editDistance");

const NAMES=["JAIME","GUSTAVO","ANA","LUIS","MARTA","CARLOS"];
const HOLES=[3,4,5],HOLE_WORDS=["tres","cuatro","cinco"];
const allowedCounts={general:[1,2,3,4,5,6],stableford:[1,2,3,4,5,6],match_play:[2,4,6],four_ball:[2,4,6]};
const scoreFor=(playerIndex,holeIndex)=>4+(playerIndex+holeIndex)%5;
const scoreWord=value=>Object.keys(WORD_NUMBERS).find(key=>WORD_NUMBERS[key]===value&&key!=="un"&&key!=="una");

function repeatedHoleBlocks(players,{bareContinuation=false,roman=false}={}){
  return HOLES.map((hole,holeIndex)=>{
    const marker=holeIndex&&bareContinuation?HOLE_WORDS[holeIndex]:`hoyo ${HOLE_WORDS[holeIndex]}`;
    const body=players.map((player,playerIndex)=>{
      const score=scoreFor(playerIndex,holeIndex),spoken=roman&&score===4?"IV":roman&&score===5?"V":scoreWord(score);
      return`${player.name} hizo ${spoken} golpes`;
    }).join(" y ");
    return`${marker} ${body}`;
  }).join(" luego ");
}

function listedHolesByPlayer(players){
  const body=players.map((player,playerIndex)=>`${player.name} ${HOLES.map((_,holeIndex)=>scoreWord(scoreFor(playerIndex,holeIndex))).join(" y ")}`).join(" luego ");
  return`hoyos tres cuatro y cinco ${body}`;
}

function playerRows(players){
  return players.map((player,playerIndex)=>`${player.name} ${HOLES.map((hole,holeIndex)=>`hoyo ${HOLE_WORDS[holeIndex]} ${scoreFor(playerIndex,holeIndex)}`).join(" ")}`).join(" luego ");
}

function hybridPrefaceAndBlocks(players){
  return`hoyos tres cuatro y cinco corridos ${repeatedHoleBlocks(players)}`;
}

function hybridPrefaceAndPlayerRows(players){
  return`hoyos tres cuatro y cinco corridos ${playerRows(players)}`;
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
  const variants=[repeatedHoleBlocks(players),repeatedHoleBlocks(players,{bareContinuation:true}),listedHolesByPlayer(players),playerRows(players),hybridPrefaceAndBlocks(players),hybridPrefaceAndPlayerRows(players)];
  for(const transcript of variants){
    for(const player of players)player.holes={};
    const parsed=parseScoreSequenceTranscript(transcript,{defaultPlayer:count===1?players[0]:null,defaultHole:3});
    assert.equal(parsed.ok,true,`${mode}/${count}: ${transcript} (${parsed.failureCode||"sin código"})`);
    assert.equal(parsed.entries.length,count*HOLES.length,`${mode}/${count} debe conservar tres hoyos completos`);
    const keys=new Set(parsed.entries.map(entry=>`${entry.player}:${entry.hole}`));
    assert.equal(keys.size,count*HOLES.length,"No puede duplicar jugador+hoyo");
    let renderCount=0,persisted="";
    const PAR=Array(18).fill(4),isOmittedScore=score=>score?.status==="x";
    const validateEntry=new Function("round","playerByRef",`${validateSource};return validateEntry`)(round,playerByRef);
    const scoreObject=(player,hole,gross)=>({hole,gross,par:4,strokes:0,net:gross,diff:gross-4,...(mode==="stableford"?{points:Math.max(0,2-(gross-4))}:{})});
    const saveEntry=new Function("round","validateEntry","scoreObject","PAR","isOmittedScore",`${saveSource};return saveEntry`)(round,validateEntry,scoreObject,PAR,isOmittedScore);
    const recordScores=new Function("round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",`${recordManySource};return recordScores`)(round,validateEntry,()=>false,saveEntry,()=>"",()=>{persisted=JSON.stringify({mode,players})},()=>{renderCount++});
    const written=recordScores({entries:parsed.entries});
    assert.equal(written.ok,true,`${mode}/${count} debe terminar en el escritor oficial`);
    const restored=JSON.parse(persisted);
    for(let playerIndex=0;playerIndex<count;playerIndex++)for(let holeIndex=0;holeIndex<HOLES.length;holeIndex++)assert.equal(restored.players[playerIndex].holes[HOLES[holeIndex]].gross,scoreFor(playerIndex,holeIndex));
    assert.equal(renderCount,1,"La tanda 3-4-5 debe pintar la tarjeta en una sola transacción");
    scoreWrites+=parsed.entries.length;voiceFlows++;
  }
  configurations++;
}

assert.equal(configurations,18);
assert.equal(voiceFlows,108);
assert.equal(scoreWrites,1188);

const physicalPlayers=NAMES.slice(0,2).map((name,index)=>({id:`physical-${index+1}`,name,handicap:index?15:14,tee:"Blanco",holes:{},lastHole:0,activeFrom:1}));
const physicalRound={configured:true,mode:"match_play",officiallyClosedAt:null,provisional:false,players:physicalPlayers,announced:{front:false,back:false,complete:false}};
const physicalPlayerByRef=value=>physicalPlayers.find(player=>player.id===value||player.name===value)||null;
const physicalMatchPlayerAt=(tokens,index)=>{const player=physicalPlayers.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const physicalParser=new Function(
  "normalizeSpeech","QUERY_WORDS","hasNamedOmissionIntent","readOmittedScoreAt","readOperationalScoreAt","parseSpanishNumberTokens","matchPlayerAt","SCORE_FILLERS","CORRECTION_WORDS","SCORE_WORDS","skipScoreFillers","playerByRef","operationalHoleComplete",
  `${parserSource};return parseScoreSequenceTranscript`
)(normalizeSpeech,QUERY_WORDS,hasNamedOmissionIntent,readOmittedScoreAt,readOperationalScoreAt,parseSpanishNumberTokens,physicalMatchPlayerAt,SCORE_FILLERS,CORRECTION_WORDS,SCORE_WORDS,skipScoreFillers,physicalPlayerByRef,(hole,entries=[])=>physicalPlayers.every(player=>entries.some(entry=>entry.player===player.name&&entry.hole===hole)));
const physicalValidateEntry=new Function("round","playerByRef",`${validateSource};return validateEntry`)(physicalRound,physicalPlayerByRef);
const physicalScoreObject=(player,hole,gross)=>({hole,gross,par:4,strokes:0,net:gross,diff:gross-4});
const physicalSaveEntry=new Function("round","validateEntry","scoreObject","PAR","isOmittedScore",`${saveSource};return saveEntry`)(physicalRound,physicalValidateEntry,physicalScoreObject,Array(18).fill(4),score=>score?.status==="x");
let physicalPersisted="",physicalRenders=0;
const physicalRecordScores=new Function("round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",`${recordManySource};return recordScores`)(physicalRound,physicalValidateEntry,()=>false,physicalSaveEntry,()=>"",()=>{physicalPersisted=JSON.stringify(physicalRound)},()=>{physicalRenders++});
const scoreLooksSource=sourceBetween("function aiUniversalLooksLikeScoreOrder","\nfunction localScoreOrderInstruction");
const aiUniversalLooksLikeScoreOrder=new Function("normalizeSpeech","round","romanScoreValue",`${scoreLooksSource};return aiUniversalLooksLikeScoreOrder`)(normalizeSpeech,physicalRound,()=>null);
const routeSource=sourceBetween("function routeAiUniversalAppText","\nfunction aiUniversalAppContext");
const routeAiUniversalAppText=new Function(
  "window","round","$","aiUniversalCommandShouldRemainLocal","executeVoiceAssistantAction","parseRoundNavigationCommand","openNewRoundDraft","aiUniversalLooksLikeSetupOrder","parseSetupTranscript","applySetupChanges","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","applyLiteralScores","localScoreOrderInstruction","isLocalRoundQueryIntent","parseRoundQueryTranscript","isGeneralConversationIntent",
  `${routeSource};return routeAiUniversalAppText`
)(
  {GSCVoiceAssistant:{parse:()=>({matched:false})}},physicalRound,()=>({classList:{contains:()=>false}}),()=>false,()=>false,()=>({matched:false}),()=>false,()=>false,()=>({ok:false}),()=>({ok:false}),aiUniversalLooksLikeScoreOrder,
  text=>physicalParser(text,{defaultPlayer:null,defaultHole:3}),parsed=>physicalRecordScores({entries:parsed.entries}),()=>"SCORE NO REGISTRADO",()=>false,()=>({matched:false}),()=>false
);
const browserSource=sourceBetween("async function processBrowserVoiceTranscript","\nfunction startBrowserVoiceFallback");
let universalCalls=0,lastHealth="";
const processBrowserVoiceTranscript=new Function(
  "voiceContext","setPrimaryVoiceMatrix","parseSetupTranscript","applySetupChanges","phase","reportVoiceHealth","renderDraft","resetSetupCapture","routeAiUniversalAppText","aiUniversalRemember","aiUniversalSetState","speakAiUniversalText","submitAiUniversalText","primaryVoiceStatusTarget",
  `${browserSource};return processBrowserVoiceTranscript`
)("round",()=>true,()=>({ok:false}),()=>({ok:false}),"idle",event=>{lastHealth=event;return true},()=>{},()=>{},routeAiUniversalAppText,()=>{},()=>{},()=>false,async()=>{universalCalls++;return false},()=>({textContent:""}));
const physicalPhrase="hoyos tres cuatro y cinco corridos hoyo tres Jaime cinco Gustavo cinco hoyo cuatro Jaime cuatro Gustavo cinco hoyo cinco Jaime cinco Gustavo cinco";
assert.equal(await processBrowserVoiceTranscript("round",physicalPhrase),true);
assert.equal(lastHealth,"browser_fallback_score_applied","La tanda física 3-4-5 debe terminar aplicada");
assert.equal(universalCalls,0,"La tanda de Score nunca puede salir a AI UNIVERSAL");
assert.equal(physicalRenders,1,"El fallback debe pintar una sola vez los seis Gross");
assert.deepEqual(JSON.parse(physicalPersisted).players.map(player=>HOLES.map(hole=>player.holes[hole].gross)),[[5,4,5],[5,5,5]]);
const missingMulti=physicalParser("hoyos tres cuatro cinco Jaime cuatro cinco Gustavo cinco cinco cinco",{defaultPlayer:null,defaultHole:3});
assert.deepEqual({ok:missingMulti.ok,failureCode:missingMulti.failureCode},{ok:false,failureCode:"missing_score"},"Un Gross faltante debe rechazar toda la tanda");
const extraMulti=physicalParser("hoyos tres cuatro cinco Jaime cuatro cinco seis siete Gustavo cinco cinco cinco",{defaultPlayer:null,defaultHole:3});
assert.deepEqual({ok:extraMulti.ok,failureCode:extraMulti.failureCode},{ok:false,failureCode:"ambiguous_score"},"Un Gross adicional no puede asignarse por adivinanza");
const duplicateMulti=physicalParser("hoyos tres cuatro cinco Jaime cuatro cinco seis Jaime cuatro cinco seis",{defaultPlayer:null,defaultHole:3});
assert.deepEqual({ok:duplicateMulti.ok,failureCode:duplicateMulti.failureCode},{ok:false,failureCode:"duplicate_score"},"Jugador+hoyo duplicado debe rechazarse");
const invalidMulti=physicalParser("hoyos tres cuatro 19 Jaime cuatro cinco seis Gustavo cinco cinco cinco",{defaultPlayer:null,defaultHole:3});
assert.deepEqual({ok:invalidMulti.ok,failureCode:invalidMulti.failureCode},{ok:false,failureCode:"invalid_hole"},"Un hoyo fuera de 1–18 debe rechazarse");

console.log("PASS V351-R7 · 18 configuraciones · 108 tandas 3-4-5 · 1188 Gross · frases híbridas físicas · fallback real · cero IA · escritor/persistencia/render transaccional");
