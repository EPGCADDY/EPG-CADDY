import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const candidate=fs.readFileSync("candidate-index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");
const manual=fs.readFileSync("manual.html","utf8");
const voiceModule=fs.readFileSync("approved-voice.js","utf8");

assert.match(candidate,/V407-R33-ROOT-VOICE-UPDATE-20260910/);
assert.match(candidate,/type:"semantic_vad",eagerness:"auto"/);
assert.match(candidate,/new MessageChannel\(\)/);
assert.match(candidate,/data\.type==="PROMOTION_READY"/);
assert.match(candidate,/await ack/);
assert.doesNotMatch(candidate.slice(candidate.indexOf("async function installMandatoryUpdate"),candidate.indexOf("async function syncPublishedAppVersion")),/searchParams\.set\("app_version"/);
assert.match(worker,/CANDIDATE_RELEASE_MISMATCH/);
assert.match(worker,/PROMOTED_RELEASE_MISMATCH/);
assert.match(worker,/PROMOTION_MARKER/);
assert.match(worker,/port\?\.postMessage\(\{type:"PROMOTION_READY"/);
assert.match(universal,/const responseProfile=baseResponseProfile/);
assert.doesNotMatch(universal,/Math\.ceil\(baseResponseProfile\.maxOutputTokens\/2\)/);
assert.match(candidate,/\.\/approved-voice\.js/);
assert.match(manual,/\.\/approved-voice\.js/);
assert.doesNotMatch(candidate,/LOCUTOR MASCULINO|VOZ MASCULINA NO DISPONIBLE|preferredMaleBrowserVoice/);

const storage=new Map();
const latin={name:"Manual Latin",lang:"es-MX",voiceURI:"manual-latin"};
const other={name:"Otro",lang:"es-ES",voiceURI:"other"};
const window={speechSynthesis:{getVoices:()=>[latin,other]},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)}};
vm.runInNewContext(voiceModule,{window,setTimeout,clearTimeout});
assert.equal(window.GSCApprovedVoice.select().voiceURI,"manual-latin");
window.speechSynthesis.getVoices=()=>[other,latin];
assert.equal(window.GSCApprovedVoice.select().voiceURI,"manual-latin");

console.log("PASS V407 R33 · contrato raíz: ACK transaccional, semantic VAD, profundidad equivalente y voz del Manual persistente");
