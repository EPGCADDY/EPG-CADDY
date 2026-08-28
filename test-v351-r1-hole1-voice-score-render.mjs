import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

function sourceBetween(start,end){
  const from=html.indexOf(start),to=html.indexOf(end,from);
  assert.ok(from>=0&&to>from,`No se encontró ${start}`);
  return html.slice(from,to);
}

assert.match(html,/gscg-hole1-voice" content="V351-R2-IOS-TOUCH-HOLE1-RENDER-20260827"/);
assert.match(html,/gscg-score-local-boundary" content="V351-R5-ALL-MODES-VOICE-SCORE-20260828"/);
assert.match(html,/gscg-match-score-roman" content="V351-R5-SAFARI-ROMAN-GROSS-X-OMISSION-20260828"/);
assert.match(html,/gscg-score-voice-matrix" content="V351-R5-NORMAL-STABLEFORD-MATCH-FOURBALL-1-6-20260828"/);
assert.match(html,/function operationalDefaultPlayer\(hole=currentOperationalHole\(\)\)[\s\S]*?active\.length===1\?active\[0\]:null/);
assert.match(html,/return\{handled:true,scoreOrder:true,ok:result\.ok,silent:result\.ok,answer:result\.ok\?"Score registrado en la tarjeta\."/);
assert.match(html,/if\(local\.scoreOrder\)\{phase="idle";reportVoiceHealth\(local\.ok\?"browser_fallback_score_applied":"browser_fallback_score_rejected",local\.ok\?\{\}:\{scoreFailure:/);

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
const romanScoreValue=token=>{const raw=String(token||"").toUpperCase();if(raw==="X"||!/^[IVXL]+$/.test(raw))return null;const table=[["L",50],["XL",40],["X",10],["IX",9],["V",5],["IV",4],["I",1]];let rest=raw,value=0;for(const [glyph,amount] of table)while(rest.startsWith(glyph)){value+=amount;rest=rest.slice(glyph.length)}let canonical="",remaining=value;for(const [glyph,amount] of table)while(remaining>=amount){canonical+=glyph;remaining-=amount}return !rest&&canonical===raw&&value>=1&&value<=30?value:null};
const parseScoreNumberTokens=(tokens,index)=>{const spoken=parseSpanishNumberTokens(tokens,index);if(spoken)return spoken;const value=romanScoreValue(tokens[index]);return value===null?null:{value,next:index+1}};
assert.equal(romanScoreValue("iv"),4,"Safari IV debe convertirse en Gross 4");
assert.equal(romanScoreValue("v"),5,"Safari V debe convertirse en Gross 5");
assert.equal(romanScoreValue("x"),null,"X conserva exclusivamente la omisión oficial");
const players=[singlePlayer];
const matchPlayerAt=(tokens,index)=>{const player=players.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const playerByRef=value=>players.find(player=>player.id===value||player.name===value)||null;
const QUERY_WORDS=new Set(["consulta","dime","resultado"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_FILLERS=new Set(["y","luego","hizo","hace","gross","score","golpe","golpes","tiro","tiros","ponle","anotale"]),SCORE_WORDS=new Set(["scores"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readOperationalScoreAt=(tokens,index)=>{index=skipScoreFillers(tokens,index);const parsed=parseScoreNumberTokens(tokens,index);return parsed&&parsed.value>=1&&parsed.value<=30?{gross:parsed.value,status:null,next:parsed.next}:null};
const parseSource=[sourceBetween("function scoreHoleMentions","\nfunction parseNamedScoreSegments"),sourceBetween("function parseNamedScoreSegments","\nfunction parseScoreSequenceTranscript"),sourceBetween("function parseScoreSequenceTranscript","\nfunction parseProvisionalScoreTranscript")].join("\n");
const parseScoreSequenceTranscript=new Function(
  "normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",
  `${parseSource};return parseScoreSequenceTranscript`
)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,()=>null,()=>true,playerByRef,()=>false);

const parsed=parseScoreSequenceTranscript("hoyo uno cuatro",{defaultPlayer:makeDefaultPlayer(players)(),defaultHole:1});
assert.equal(parsed.ok,true);
assert.deepEqual(parsed.entries,[{player:"JAIME",hole:1,gross:4,status:null}]);

const ambiguous=parseScoreSequenceTranscript("hoyo uno cuatro",{defaultPlayer:makeDefaultPlayer([singlePlayer,{id:"p2",name:"JORGE"}])(),defaultHole:1});
assert.equal(ambiguous.ok,false,"Con varios jugadores el nombre continúa siendo obligatorio");

const groupPlayers=[singlePlayer,{id:"p2",name:"GUSTAVO",handicap:15,tee:"Blanco",holes:{},lastHole:0,activeFrom:1}];
const groupMatchPlayerAt=(tokens,index)=>{const player=groupPlayers.find(item=>item.name.toLowerCase()===tokens[index]);return player?{player,next:index+1}:null};
const groupPlayerByRef=value=>groupPlayers.find(player=>player.id===value||player.name===value)||null;
const groupParser=new Function(
  "normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",
  `${parseSource};return parseScoreSequenceTranscript`
)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,groupMatchPlayerAt,readOperationalScoreAt,()=>null,(hole,entries)=>groupPlayers.every(player=>entries.some(entry=>entry.player===player.name&&entry.hole===hole)),groupPlayerByRef,()=>false);
const naturalGroup=groupParser("Jaime hizo cuatro y Gustavo hizo cinco",{defaultPlayer:null,defaultHole:1});
assert.equal(naturalGroup.ok,true,"La frase natural de dos jugadores debe ser una anotación, no una consulta");
assert.deepEqual(naturalGroup.entries,[
  {player:"JAIME",hole:1,gross:4,status:null},
  {player:"GUSTAVO",hole:1,gross:5,status:null}
]);
const matchPlaySafariRoman=groupParser("Jaime IV Gustavo V",{defaultPlayer:null,defaultHole:1});
assert.equal(matchPlaySafariRoman.ok,true,"Match Play debe aceptar IV/V producidos por Safari");
assert.deepEqual(matchPlaySafariRoman.entries,naturalGroup.entries);
const matchPlayNaturalUnits=groupParser("Jaime hizo IV golpes y Gustavo hizo V golpes",{defaultPlayer:null,defaultHole:1});
assert.equal(matchPlayNaturalUnits.ok,true,"Match Play debe aceptar golpes/tiros como unidades naturales");
assert.deepEqual(matchPlayNaturalUnits.entries,naturalGroup.entries);
const physicalTrailingHole=groupParser("Jaime cuatro golpes y Gustavo cinco golpes en el hoyo uno",{defaultPlayer:null,defaultHole:1});
assert.equal(physicalTrailingHole.ok,true,"La ubicación del hoyo al final no puede rechazar el dictado físico");
assert.deepEqual(physicalTrailingHole.entries,naturalGroup.entries);

const matchRound={configured:true,mode:"match_play",provisional:false,officiallyClosedAt:null,players:groupPlayers.map(player=>({...player,holes:{}})),announced:{front:false,back:false,complete:false}};
const matchPlayerByRef=value=>matchRound.players.find(player=>player.id===value||player.name===value)||null;
const matchValidateSource=sourceBetween("function validateEntry","\nfunction saveEntry");
const matchValidateEntry=new Function("round","playerByRef",`${matchValidateSource};return validateEntry`)(matchRound,matchPlayerByRef);
const matchScoreObject=(player,hole,gross)=>({hole,gross,par:4,si:hole,strokes:0,net:gross,diff:gross-4,updatedAt:new Date().toISOString()});
const matchSaveSource=sourceBetween("function saveEntry","\nfunction ensureAnnouncedState");
const matchSaveEntry=new Function("round","validateEntry","scoreObject","PAR","isOmittedScore",`${matchSaveSource};return saveEntry`)(matchRound,matchValidateEntry,matchScoreObject,Array(18).fill(4),score=>score?.status==="x");
const matchRecordSource=sourceBetween("function recordScores","\nfunction editDistance");
let matchPersisted="",matchRenderCount=0;
const matchRecordScores=new Function("round","validateEntry","isRetroactiveScore","saveEntry","closureSpeechIfDue","persist","render",`${matchRecordSource};return recordScores`)(matchRound,matchValidateEntry,()=>false,matchSaveEntry,()=>"",()=>{matchPersisted=JSON.stringify(matchRound)},()=>{matchRenderCount++});
const matchRecorded=matchRecordScores({entries:matchPlaySafariRoman.entries});
assert.equal(matchRecorded.ok,true,"El escritor oficial debe aceptar ambos Gross de Match Play");
assert.equal(matchRound.players[0].holes[1].gross,4);
assert.equal(matchRound.players[1].holes[1].gross,5);
assert.equal(JSON.parse(matchPersisted).players[1].holes[1].gross,5,"Match Play debe persistir ambos Gross");
assert.equal(matchRenderCount,1,"Match Play debe renderizar inmediatamente después de escribir");

const scoreLooksSource=sourceBetween("function aiUniversalLooksLikeScoreOrder","\nfunction localScoreOrderInstruction");
const aiUniversalLooksLikeScoreOrder=new Function("normalizeSpeech","round","romanScoreValue",`${scoreLooksSource};return aiUniversalLooksLikeScoreOrder`)(normalizeSpeech,{configured:true,mode:"match_play",players:groupPlayers},romanScoreValue);
const routeSource=sourceBetween("function routeAiUniversalAppText","\nfunction aiUniversalAppContext");
let routedEntries=null;
const routeAiUniversalAppText=new Function(
  "window","round","$","aiUniversalCommandShouldRemainLocal","executeVoiceAssistantAction","parseRoundNavigationCommand","openNewRoundDraft","aiUniversalLooksLikeSetupOrder","parseSetupTranscript","applySetupChanges","aiUniversalLooksLikeScoreOrder","parseRoundScoreTranscript","applyLiteralScores","localScoreOrderInstruction","isLocalRoundQueryIntent","parseRoundQueryTranscript","isGeneralConversationIntent",
  `${routeSource};return routeAiUniversalAppText`
)(
  {GSCVoiceAssistant:{parse:()=>({matched:false})}},
  {configured:true,mode:"match_play",players:groupPlayers},
  ()=>({classList:{contains:()=>false}}),
  ()=>false,()=>false,()=>({matched:false}),()=>false,()=>false,()=>({ok:false}),()=>({ok:false}),
  aiUniversalLooksLikeScoreOrder,
  text=>groupParser(text,{defaultPlayer:null,defaultHole:1}),
  parsed=>{routedEntries=parsed.entries;return{ok:true}},
  ()=>"SCORE NO REGISTRADO · DI NOMBRE Y GOLPES",
  ()=>false,()=>({matched:false}),()=>false
);
const routedNatural=routeAiUniversalAppText("Jaime hizo cuatro y Gustavo hizo cinco");
assert.equal(routedNatural.handled,true);
assert.equal(routedNatural.scoreOrder,true);
assert.equal(routedNatural.ok,true);
assert.equal(routedNatural.silent,true);
assert.deepEqual(routedEntries,naturalGroup.entries,"El router real debe entregar ambos scores al escritor local");
const routedRoman=routeAiUniversalAppText("Jaime IV Gustavo V");
assert.deepEqual({handled:routedRoman.handled,scoreOrder:routedRoman.scoreOrder,ok:routedRoman.ok,silent:routedRoman.silent},{handled:true,scoreOrder:true,ok:true,silent:true},"IV/V deben terminar en el escritor local de Match Play");
assert.deepEqual(routedEntries,naturalGroup.entries);
const routedAmbiguous=routeAiUniversalAppText("hoyo uno cuatro");
assert.deepEqual({handled:routedAmbiguous.handled,scoreOrder:routedAmbiguous.scoreOrder,ok:routedAmbiguous.ok,silent:routedAmbiguous.silent},{handled:true,scoreOrder:true,ok:false,silent:true},"Un score incompleto debe terminar localmente, nunca en IA");

const browserSource=sourceBetween("async function processBrowserVoiceTranscript","\nfunction startBrowserVoiceFallback");
let universalCalls=0,lastHealth="",lastMatrix={};
const processBrowserVoiceTranscript=new Function(
  "voiceContext","setPrimaryVoiceMatrix","parseSetupTranscript","applySetupChanges","phase","reportVoiceHealth","renderDraft","resetSetupCapture","routeAiUniversalAppText","aiUniversalRemember","aiUniversalSetState","speakAiUniversalText","submitAiUniversalText","primaryVoiceStatusTarget",
  `${browserSource};return processBrowserVoiceTranscript`
)("round",(state,context,message)=>{lastMatrix={state,context,message};return true},()=>({ok:false}),()=>({ok:false}),"idle",event=>{lastHealth=event;return true},()=>{},()=>{},routeAiUniversalAppText,()=>{},()=>{},()=>false,async()=>{universalCalls++;return false},()=>({textContent:""}));
assert.equal(await processBrowserVoiceTranscript("round","hoyo uno cuatro"),true);
assert.equal(universalCalls,0,"Un score ambiguo no puede llamar AI UNIVERSAL");
assert.equal(lastHealth,"browser_fallback_score_rejected");
assert.equal(lastMatrix.state,"error");
assert.equal(await processBrowserVoiceTranscript("round","Jaime hizo cuatro y Gustavo hizo cinco"),true);
assert.equal(universalCalls,0,"Un score válido tampoco puede llamar AI UNIVERSAL");
assert.equal(lastHealth,"browser_fallback_score_applied");
assert.equal(await processBrowserVoiceTranscript("round","Jaime IV Gustavo V"),true);
assert.equal(universalCalls,0,"El Score Match Play con romanos de Safari no puede llamar AI UNIVERSAL");
assert.equal(lastHealth,"browser_fallback_score_applied");
assert.equal(await processBrowserVoiceTranscript("round","Jaime cuatro golpes y Gustavo cinco golpes en el hoyo uno"),true);
assert.equal(universalCalls,0,"La frase física con el hoyo al final tampoco puede llamar AI UNIVERSAL");
assert.equal(lastHealth,"browser_fallback_score_applied");

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

console.log("PASS V351-R5 · Match Play Safari IV/V y hoyo final -> clasificador -> escritor local -> persistencia/render; X conserva omisión; cero llamadas IA");
