import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V358-VOICE-ROUND-CONTINUITY-20260828/);
assert.match(worker,/gscg-mobile-v358-voice-round-continuity/);

const setupStart=html.indexOf("function normalizeTee");
const setupEnd=html.indexOf("\nfunction applySetupChanges",setupStart);
assert.ok(setupStart>0&&setupEnd>setupStart);
const setupSource=html.slice(setupStart,setupEnd);
const canonicalPlayerName=value=>String(value||"").trim().replace(/\s+/g," ").toUpperCase();
const canonicalPlayerNameKey=value=>canonicalPlayerName(value).toLowerCase();
const parseInline=new Function(
  "canonicalPlayerName","canonicalPlayerNameKey",
  `let draftPlayers=[],handicapRectificationMode=false,rosterAddMode=false;${setupSource};return parseInlineManualRosterPhrase`,
)(canonicalPlayerName,canonicalPlayerNameKey);

assert.deepEqual(parseInline("Ancas Gustavo, 15 blancas",0),{
  position:1,name:"ANCAS GUSTAVO",handicap:15,tee:"Blanco",matrix:"Caballeros"
});
assert.deepEqual(parseInline("María López handicap 8 rojas",2),{
  position:3,name:"MARIA LOPEZ",handicap:8,tee:"Rojo",matrix:"Caballeros"
});
assert.equal(parseInline("Ancas Gustavo",0),null);
assert.equal(parseInline("Ancas Gustavo 60 blancas",0),null);

const primeStart=html.indexOf("function primeAiUniversalSpeechFromGesture");
const primeEnd=html.indexOf("\nfunction preferredMaleBrowserVoice",primeStart);
assert.ok(primeStart>0&&primeEnd>primeStart);
const primeSource=html.slice(primeStart,primeEnd);
const events=[],played=[];
class FakeAudio{constructor(src){this.src=src}play(){played.push(this);this.onplay?.();return Promise.resolve()}}
const prime=new Function(
  "Audio","reportVoiceHealth",
  `let aiUniversalSpeechPrimed=false,aiUniversalMuted=false,aiUniversalSpeechPrimer=null,aiUniversalTtsAudio=null;${primeSource};return primeAiUniversalSpeechFromGesture`,
)(FakeAudio,event=>events.push(event));
assert.equal(prime(),true);
assert.equal(played.length,1);
assert.deepEqual(events,["browser_fallback_speech_primed"]);
assert.equal(prime(),false);

assert.match(html,/sendAiUniversal"\)\.addEventListener\("click",\(\)=>\{primeAiUniversalSpeechFromGesture\(\);submitAiUniversalText\(\)\}/);
assert.match(html,/lastMicGestureAt=now;\s*primeAiUniversalSpeechFromGesture\(\);/);
assert.match(html,/if\(name\)\{if\(applyInlineManualRosterPhrase\(name,idx\)\)return;/);
assert.match(html,/RESPONDIENDO EN VOZ/);

assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_speech_primed",build:"V355",transcript:"PROHIBIDO"}),{
  event:"browser_fallback_speech_primed",build:"V355",context:"round",turn:0,elapsedMs:0
});
assert.deepEqual(sanitizeVoiceHealth({event:"keyboard_dictation_setup_applied",build:"V355",name:"PROHIBIDO"}),{
  event:"keyboard_dictation_setup_applied",build:"V355",context:"round",turn:0,elapsedMs:0
});

console.log("PASS V355 iPhone: audio habilitado desde gesto y dictado del teclado distribuido en nombre, HDCP y marcas");
