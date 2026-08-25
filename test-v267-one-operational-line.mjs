import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");
const sessionApi=fs.readFileSync(new URL("./api/session-grupal.js",import.meta.url),"utf8");

assert.match(html,/gscg-operational-hotfix" content="V267-ONE-OPERATIONAL-LINE-20260823"/);

// Un solo escritor para el registro Stableford: la ruta oficial applySetupChanges.
assert.doesNotMatch(stable,/const syncNames=/,"Stableford no debe copiar nombres ocultos del registro General");
assert.doesNotMatch(stable,/directHandleRealtime/,"Stableford no debe procesar dos veces la misma transcripción");
assert.match(stable,/applyToActiveRegistration=function\(changes\)/);
assert.match(stable,/applySetupChanges=applyToActiveRegistration/);
assert.match(html,/stableford=readStoredRound\(STABLEFORD_ACTIVE_KEY\)/);
assert.match(html,/function latestStoredRound\(modeHint\)/);
assert.match(html,/value\?\.configured&&mode\(value\)===modeHint/);
assert.match(html,/function loadRound\(\)\{const candidates=\[latestStoredRound\("general"\),latestStoredRound\("match_play"\)\]/);

// Todas las combinaciones de Score Card comparten el mismo control manual,
// las mismas celdas editables y el mismo escritor usado por la voz.
assert.equal((html.match(/id="roundManualEntry"/g)||[]).length,1);
assert.doesNotMatch(html,/id="stablefordManualEntry"/);
assert.match(html,/renderRoundManualEntry\(\);bindRoundManualCells\(\)/);
assert.match(html,/function applyManualScoreEntries\(entries\)/);
assert.match(html,/const result=applyLiteralScores\(\{matched:true,ok:true,entries\}\)/);
assert.match(html,/class="gross-cell round-manual-cell" data-round-player=/);
assert.doesNotMatch(html,/class="sfGridName"/);

// Cambiar de nombre a handicap no puede reconstruir el formulario ni perder
// la escritura que comienza en el siguiente campo móvil.
const draftChangeStart=html.indexOf('$("detectedBody").addEventListener("change"');
const draftChangeEnd=html.indexOf('\n$("tournamentToggle")',draftChangeStart);
assert.ok(draftChangeStart>0&&draftChangeEnd>draftChangeStart);
const draftChangeSource=html.slice(draftChangeStart,draftChangeEnd);
assert.doesNotMatch(draftChangeSource,/renderDraft\(\)/);

// El estado inválido debe ser inequívoco antes de intentar iniciar.
assert.match(html,/#stablefordSetupCourse\{display:none!important\}/);
assert.match(html,/input\.stableford-name-duplicate\{border-color:var\(--red\)/);
assert.match(html,/input\.stableford-name-duplicate:focus\{outline:1px solid var\(--red\)!important/);
assert.match(html,/#startStablefordRound:disabled/);
assert.match(html,/ESTÁ REPETIDO EN JUGADOR \$\{positions\.join\(" Y JUGADOR "\)\} · AGREGA APELLIDO O ALIAS/);
assert.match(html,/button\.disabled=!ready/);

// La voz autorizada contiene el literal en las instrucciones y prohíbe preámbulos.
assert.match(html,/function exactSpeechInstructions\(reason,spokenText\)/);
assert.match(html,/Tu primer sonido debe ser la primera palabra del texto autorizado/);
assert.match(html,/Está prohibido decir entendido, voy a leer, resultados ahora/);
assert.match(html,/input:\[\{type:"message",role:"user",content:\[\{type:"input_text",text:"Pronuncia ahora únicamente el TEXTO ÚNICO AUTORIZADO de las instrucciones\."\}\]\}\]/);
assert.match(html,/const ALLOWED_SPEECH_REASONS=new Set\(\["closure","query","query_accumulated","missing_score","conversation"\]\)/);
assert.doesNotMatch(html,/speakAuthorized\("setup_confirmation"/);
assert.doesNotMatch(html,/Listo, puedes confirmar el inicio de la ronda/);
assert.match(html,/function speakSetupConfirmation\(\)\{return false\}/);
assert.match(html,/target\.textContent="ERROR"/);
assert.doesNotMatch(html,/NO SE RECONOCIÓ · DICTA NOMBRE, HDCP Y MARCAS/);
assert.match(html,/\$\("status"\)\.textContent=roundIdleStatus\(\);\$\("finalCardButton"\)/);
assert.match(stable,/teeLabel=cfg\.tee==="Blanco"\?"BLANCAS":"AMARILLAS"/);

// La ronda usa transcripción viva y consume los deltas por el mismo parser/escritor.
assert.match(html,/model:"gpt-live-transcribe",keywords:/);
assert.match(sessionApi,/model: "gpt-live-transcribe", keywords: roundKeywords/);
assert.match(html,/conversation\.item\.input_audio_transcription\.delta/);
assert.match(html,/appendLiveRoundDelta\(e\.item_id\|\|e\.event_id\|\|"round_live_fallback",e\.delta\|\|""\)/);
assert.match(html,/function applyLiveRoundTranscript\(itemId,transcript,\{final=false\}=\{\}\)/);
assert.match(html,/committed\.get\(key\)===fingerprint/);
assert.match(html,/if\(roundLiveStaging\)return false/);
assert.match(html,/function rememberLiveRoundOriginal\(itemId,entries\)/);
assert.match(html,/function rollbackLiveRoundItem\(itemId,\{commit=true\}=\{\}\)/);
assert.match(html,/if\(!parsed\?\.ok\)return\{handled:final&&committed\.size>0,applied:0,preserved:committed\.size>0\}/);
assert.doesNotMatch(html,/if\(final&&roundLiveOriginal\.has\(id\)\)\{rollbackLiveRoundItem/);
assert.match(html,/if\(final\)\{persist\(\);render\(\)\}/);

// Ejecuta el parser único real para General y Stableford.
const parserStart=html.indexOf("function parseScoreSequenceTranscript");
const parserEnd=html.indexOf("\nfunction parseProvisionalScoreTranscript",parserStart);
assert.ok(parserStart>0&&parserEnd>parserStart,"No se encontró el parser operacional único");
const parserSource=html.slice(parserStart,parserEnd);
const players=[{id:"p1",name:"JAIME"},{id:"p2",name:"NELSON"},{id:"p3",name:"JUNIOR"},{id:"p4",name:"FITO"},{id:"p5",name:"PEDRO"}];
const numberWords={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6};
const parseSpanishNumberTokens=(tokens,index)=>{
  const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numberWords[raw];
  return Number.isInteger(value)?{value,next:index+1}:null;
};
const matchPlayerAt=(tokens,index)=>{
  const player=players.find(item=>item.name.toLowerCase()===tokens[index]);
  return player?{player,next:index+1}:null;
};
const normalizeSpeech=value=>String(value||"").toLowerCase().replace(/[^a-z0-9áéíóúñü]+/gi," ").trim();
const QUERY_WORDS=new Set(["consulta","dime","resultado"]),CORRECTION_WORDS=new Set(["corrijo"]),SCORE_FILLERS=new Set(["y","luego","gross","score"]),SCORE_WORDS=new Set(["scores"]);
const skipScoreFillers=(tokens,index)=>{while(index<tokens.length&&(SCORE_FILLERS.has(tokens[index])||CORRECTION_WORDS.has(tokens[index])||SCORE_WORDS.has(tokens[index])))index++;return index};
const readGrossAt=(tokens,index,hole)=>{
  if(tokens[index]==="par")return{gross:4,next:index+1};
  const number=parseSpanishNumberTokens(tokens,index);
  return number&&number.value>=1&&number.value<=30?{gross:number.value,next:number.next}:null;
};
const readOperationalScoreAt=(tokens,index,hole)=>{const gross=readGrossAt(tokens,index,hole);return gross?{...gross,status:null}:null};
const canonicalPlayerNameKey=value=>String(value).toLowerCase();
const playerByRef=value=>players.find(player=>player.name===value)||null;
const operationalHoleComplete=(hole,entries)=>players.every(player=>entries.some(entry=>entry.hole===hole&&entry.player===player.name));
const hasNamedOmissionIntent=()=>false;
const readOmittedScoreAt=()=>null;
const parseScoreSequenceTranscript=new Function("normalizeSpeech","QUERY_WORDS","CORRECTION_WORDS","SCORE_FILLERS","SCORE_WORDS","skipScoreFillers","parseSpanishNumberTokens","matchPlayerAt","readOperationalScoreAt","readOmittedScoreAt","operationalHoleComplete","playerByRef","hasNamedOmissionIntent",`${parserSource};return parseScoreSequenceTranscript`)(normalizeSpeech,QUERY_WORDS,CORRECTION_WORDS,SCORE_FILLERS,SCORE_WORDS,skipScoreFillers,parseSpanishNumberTokens,matchPlayerAt,readOperationalScoreAt,readOmittedScoreAt,operationalHoleComplete,playerByRef,hasNamedOmissionIntent);

const consecutive=parseScoreSequenceTranscript("Jaime hoyo 1 cuatro, hoyo 2 cinco, 3 par");
assert.equal(consecutive.ok,true);
assert.deepEqual(consecutive.entries.map(({player,hole,gross})=>({player,hole,gross})),[
  {player:"JAIME",hole:1,gross:4},
  {player:"JAIME",hole:2,gross:5},
  {player:"JAIME",hole:3,gross:4}
]);

const groupBatch=parseScoreSequenceTranscript("hoyo 4 Jaime cinco Nelson seis hoyo 5 Jaime cuatro Nelson cinco");
assert.equal(groupBatch.ok,true);
assert.deepEqual(groupBatch.entries.map(entry=>`${entry.player}:${entry.hole}:${entry.gross}`),["JAIME:4:5","NELSON:4:6","JAIME:5:4","NELSON:5:5"]);

const stableReader=(tokens,index,hole)=>tokens[index]==="x"?{gross:null,status:"x",next:index+1}:(()=>{const gross=readGrossAt(tokens,index,hole);return gross?{...gross,status:null}:null})();
const stableBatch=parseScoreSequenceTranscript("Jaime hoyo 6 x hoyo 7 cuatro",{readScoreAt:stableReader});
assert.equal(stableBatch.ok,true);
assert.deepEqual(stableBatch.entries.map(({hole,gross,status})=>({hole,gross,status})),[{hole:6,gross:null,status:"x"},{hole:7,gross:4,status:null}]);

const invalid=parseScoreSequenceTranscript("Jaime hoyo 8 cuatro palabra ajena hoyo 9 cinco");
assert.equal(invalid.ok,false,"Una tanda parcialmente inválida debe fallar completa");

// Un score y una tanda terminan en el mismo motor; la tanda usa una sola operación.
const applyStart=html.indexOf("function applyLiteralScores");
const applyEnd=html.indexOf("\nfunction speechForHole",applyStart);
const applySource=html.slice(applyStart,applyEnd);
let single=0,batch=0;
const applyLiteralScores=new Function("recordScore","recordScores","document","operationalTargetHoleForEntries","scheduleOperationalMissingPrompt","listening","voiceContext","noteRoundOperationalActivity",`${applySource};return applyLiteralScores`)(()=>{single++;return{ok:true}},({entries})=>{batch++;return{ok:true,count:entries.length}},{getElementById:()=>null},()=>1,()=>false,false,"round",()=>{});
applyLiteralScores({entries:[{player:"JAIME",hole:1,gross:4}]});
applyLiteralScores({entries:groupBatch.entries});
assert.equal(single,1);assert.equal(batch,1);

// Simula exactamente 7 hoyos por 5 jugadores: cada pareja completa aparece
// durante los deltas y el evento final no duplica ninguna de las 35 escrituras.
const liveStart=html.indexOf("function parseLiveRoundScorePrefix");
const liveEnd=html.indexOf("\nfunction applyLiveRoundTranscript",liveStart);
assert.ok(liveStart>0&&liveEnd>liveStart,"No se encontró el parser incremental");
const liveSource=html.slice(liveStart,liveEnd);
const parseLiveRoundScorePrefix=new Function("normalizeSpeech","parseRoundScoreTranscript",`${liveSource};return parseLiveRoundScorePrefix`)(normalizeSpeech,parseScoreSequenceTranscript);
let liveTranscript="",liveWrites=0;const liveCommitted=new Set();
const acceptDelta=delta=>{
  liveTranscript+=delta;
  const parsed=parseLiveRoundScorePrefix(liveTranscript);
  if(!parsed.ok)return;
  for(const entry of parsed.entries){const key=`${entry.player}:${entry.hole}:${entry.gross??entry.status}`;if(!liveCommitted.has(key)){liveCommitted.add(key);liveWrites++}}
};
for(let hole=2;hole<=8;hole++){
  acceptDelta(`hoyo ${hole} `);
  for(const player of players)acceptDelta(`${player.name} 4 `);
}
assert.equal(liveWrites,35);
assert.equal(liveCommitted.size,35);
const finalLive=parseScoreSequenceTranscript(liveTranscript);
assert.equal(finalLive.ok,true);assert.equal(finalLive.entries.length,35);
const finalFresh=finalLive.entries.filter(entry=>!liveCommitted.has(`${entry.player}:${entry.hole}:${entry.gross??entry.status}`));
assert.equal(finalFresh.length,0,"La transcripción final no puede duplicar deltas ya guardados");

console.log("PASS V267 · una línea operacional, 35 scores incrementales transaccionales, registro sin contaminación y salida literal");
