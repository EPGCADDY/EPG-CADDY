import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const health=fs.readFileSync("api/voice-health.js","utf8");

assert.match(html,/gscg-physical-startup-playback" content="V365-IPHONE-VALID-ROUND-AUDIO-COMPLETION-20260828"/);
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-iphone-playback/);

const playableSource=html.match(/function playableStoredRound\(x\)\{[^\n]+\}/)?.[0];
assert.ok(playableSource,"Falta el filtro de ronda realmente jugable");
const playable=new Function("validStoredRound",`${playableSource};return playableStoredRound`)(value=>!!(value&&typeof value==="object"&&Array.isArray(value.players)&&typeof value.configured==="boolean"));
assert.equal(playable({configured:true,players:[]}),false,"Una ronda sin jugadores no puede abrir la tarjeta");
assert.equal(playable({configured:true,players:[{name:"JAIME"}]}),true);
assert.match(html,/filter\(value=>playableStoredRound\(value\)&&mode\(value\)===modeHint\)/);
assert.match(html,/return blankRound\(\)/);
assert.match(html,/if\(playableStoredRound\(stored\)\)/);

const start=html.indexOf("function playAiUniversalServerAudio");
const end=html.indexOf("\nasync function speakAiUniversalText",start);
assert.ok(start>0&&end>start,"Falta el comprobador de reproducción completa");
const playbackSource=html.slice(start,end);
const events=[];
const playServerAudio=new Function("deps",`
  let aiUniversalTtsPlaybackCancel=null,aiUniversalSpeechPrimed=false,voiceContext="round",listening=false;
  const reportVoiceHealth=(event)=>deps.events.push(event),setPrimaryVoiceMatrix=()=>{},aiUniversalSetState=()=>{};
  ${playbackSource}
  return playAiUniversalServerAudio;
`)({events});
let ended=false;
const player={play(){queueMicrotask(()=>this.onplay?.());setTimeout(()=>{ended=true;this.onended?.()},15);return Promise.resolve()},pause(){}};
const pending=playServerAudio(player,"Respuesta comprobada","onyx");
await new Promise(resolve=>setTimeout(resolve,2));
let resolved=false;pending.then(()=>{resolved=true});
assert.equal(resolved,false,"Aceptar play() no equivale a terminar la comunicación");
assert.equal(await pending,true);
assert.equal(ended,true);
assert.deepEqual(events,["browser_fallback_speech_started","browser_fallback_speech_completed"]);
assert.match(health,/browser_fallback_speech_completed/);

console.log("PASS V365 · inicio descarta ronda vacía y voz sólo acredita final al terminar audio");
