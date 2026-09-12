import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const candidate=fs.readFileSync("candidate-index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");
const grupalSession=fs.readFileSync("api/session-grupal.js","utf8");
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

// R52: deferred conversational guarantees
assert.match(candidate,/if\(state==="listening"\)return"ESCUCHANDO";\s*if\(state==="responding"\)return"RESPONDIENDO";\s*if\(message\)return message;/,"R52 must keep exact bilateral labels ahead of custom text");
assert.match(candidate,/conversationClearResponseId&&e\.response_id&&\(conversationClearResponseId==="pending"\|\|e\.response_id===conversationClearResponseId\)\)return;/,"R52 must ignore stale stopped event from interrupted response");
assert.match(universal,/pertinencia directa, fundamento verificable, profundidad suficiente, precisión factual, aplicación práctica y claridad/,"R52 must enforce permanent six-part answer quality matrix");
assert.match(candidate,/CONVERSATION_RESPONSE_STALL_MS=30000/,"Realtime must retain a recovery margin that does not abort valid responses");
assert.match(universal,/UNIVERSAL_TIMEOUT_MS=27_500/,"Universal AI fallback must retain its recovery margin");
assert.match(candidate,/async function answerBrowserVoiceQuery\(context,clean\)[\s\S]*?browser_fallback_general_realtime_handoff[\s\S]*?await ensureSession\(\)[\s\S]*?setRealtimeTurnProfile\(REALTIME_TURN_PROFILE_CONVERSATION\)[\s\S]*?speakConversation\(clean\)/,"General iPhone questions must hand off once to the continuous Realtime conversation");
assert.match(grupalSession,/if\(process\.env\.VERCEL_ENV==="preview"\)return proxyPreviewSession\(req,res\)/,"R54 Preview must bridge Realtime through the canonical LAB when its direct key is unavailable");
assert.match(grupalSession,/const CANONICAL_LAB_ORIGIN = "https:\/\/golf-sc-gt-lab\.vercel\.app"/,"R54 bridge must target only the canonical LAB");
assert.match(candidate,/speed:1\.035,\s*accumulatedSpeed:1\.035/,"R52 must increase Realtime locutor speed by 15 percent from 0.90x");
assert.match(candidate,/utterance\.rate=1\.035/,"R52 must increase device locutor speed by 15 percent");
assert.match(candidate,/player\.playbackRate=1\.15/,"R52 must increase generated audio playback by 15 percent");
