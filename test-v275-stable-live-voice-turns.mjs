import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sessionApi=fs.readFileSync(new URL("./api/session-grupal.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V277-OFFICIAL-ROUND-CORRECTIONS-20260823"/);
assert.match(html,/V275-LIVE-TURN-ANCHOR-SPEECH-LOCK-20260823/);
assert.match(html,/appVersion:"V277"/);

// Un mismo ítem de audio conserva el hoyo donde comenzó aunque el cursor
// visual avance mientras siguen llegando deltas del mismo dictado.
const liveStart=html.indexOf("function applyLiveRoundTranscript");
const liveEnd=html.indexOf("\nfunction appendLiveRoundDelta",liveStart);
assert.ok(liveStart>0&&liveEnd>liveStart,"No se encontró la recepción viva V275");
const liveSource=html.slice(liveStart,liveEnd);
const seenHoles=[];
let activeHole=2;
const roundLiveItemText=new Map(),roundLiveCommitted=new Map(),roundLiveOperationalHole=new Map();
const applyLiveRoundTranscript=new Function(
  "roundLiveItemText","round","stopMonitorActive","roundLiveCommitted","roundLiveOperationalHole","currentOperationalHole","parseRoundScoreTranscript","parseLiveRoundScorePrefix","liveScoreEntryKey","liveScoreEntryFingerprint","rememberLiveRoundOriginal","roundLiveStaging","applyLiteralScores","rollbackLiveRoundItem","roundLiveClosureQueue","$","phase","listening","persist","render",
  `${liveSource};return applyLiveRoundTranscript`
)(roundLiveItemText,{configured:true},false,roundLiveCommitted,roundLiveOperationalHole,()=>activeHole,()=>({ok:false}),(_text,options)=>{seenHoles.push(options.defaultHole);return{ok:false}},()=>"",()=>"",()=>{},false,()=>({ok:true}),()=>{},[],()=>({textContent:""}),"listening",true,()=>{},()=>{});

applyLiveRoundTranscript("item-a","Fito cinco");
activeHole=3;
applyLiveRoundTranscript("item-a","Fito cinco Jaime cuatro");
applyLiveRoundTranscript("item-b","Fito cuatro");
assert.deepEqual(seenHoles,[2,2,3],"Cada ítem debe permanecer anclado a su hoyo inicial");

// Una transcripción anterior puede completarse después de que ya comenzó el
// siguiente bloque. Ese evento atrasado no puede declarar que ya no hay voz.
const speechStart=html.indexOf("function rememberRoundSpeechStarted");
const speechEnd=html.indexOf("\nfunction appendRoundTranscript",speechStart);
assert.ok(speechStart>0&&speechEnd>speechStart,"No se encontró el candado por ítem de voz");
const speechSource=html.slice(speechStart,speechEnd);
const order=[];
const rememberRoundItem=value=>{const id=String(value||"");if(id&&!order.includes(id))order.push(id);return id};
const speechState=new Function("rememberRoundItem","roundActiveSpeechItems","roundPendingItems","roundSegmentText","roundSpeechActive",`${speechSource};return{start:rememberRoundSpeechStarted,stop:rememberRoundSpeechStopped,complete:rememberRoundTranscriptionCompleted,active:()=>roundSpeechActive}`)(rememberRoundItem,new Set(),new Set(),new Map(),false);
speechState.start("item-a");
speechState.stop("item-a");
speechState.start("item-b");
speechState.complete("item-a");
assert.equal(speechState.active(),true,"El completed atrasado de A no puede apagar la voz activa de B");
speechState.stop("item-b");
assert.equal(speechState.active(),false);

assert.match(html,/const ROUND_MISSING_IDLE_MS=2000/);
assert.match(html,/const ROUND_MISSING_CONFIRM_MS=450/);
assert.match(html,/const confirmedActivityAt=roundOperationalActivityAt/);
assert.match(html,/roundOperationalActivityAt!==confirmedActivityAt/);
assert.match(html,/\},ROUND_MISSING_CONFIRM_MS\)/);

// Más prefijo conserva el nombre inicial y una pausa mayor evita cortar una
// pareja nombre/score por respiraciones naturales, sin detener los deltas.
assert.match(html,/const ROUND_VAD_THRESHOLD=0\.2/);
assert.match(html,/const ROUND_VAD_PREFIX_MS=700/);
assert.match(html,/const ROUND_VAD_SILENCE_MS=1200/);
assert.match(html,/threshold:ROUND_VAD_THRESHOLD,prefix_padding_ms:ROUND_VAD_PREFIX_MS,silence_duration_ms:ROUND_VAD_SILENCE_MS/);
assert.match(html,/Number\(td\?\.threshold\)===expectedThreshold&&Number\(td\?\.prefix_padding_ms\)===expectedPrefix/);
assert.match(sessionApi,/const silence = context === "setup" \? 1500 : 1200/);
assert.match(sessionApi,/const threshold = context === "setup" \? 0\.5 : 0\.2/);
assert.match(sessionApi,/const prefixPadding = context === "setup" \? 300 : 700/);

console.log("PASS V275 · hoyo anclado por bloque, voz concurrente protegida y recordatorio confirmado");
