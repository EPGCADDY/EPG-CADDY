import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const candidate=fs.readFileSync("candidate-index-grupal.html","utf8");
const updater=fs.readFileSync("update-client-e.js","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");
const manual=fs.readFileSync("manual.html","utf8");
const voiceModule=fs.readFileSync("approved-voice.js","utf8");

assert.match(candidate,/V407-R33-ROOT-VOICE-UPDATE-20260910/);
assert.match(candidate,/type:"semantic_vad",eagerness:"auto"/);
assert.match(candidate,/new MessageChannel\(\)/);
assert.match(candidate,/data\.type==="PROMOTION_READY"/);
assert.match(candidate,/await ack/);
assert.doesNotMatch(candidate.slice(candidate.indexOf("async function installMandatoryUpdate"),candidate.indexOf("async function syncPublishedAppVersion")),/searchParams\.set\("app_version"/);
assert.match(updater,/fetchAndVerifyShell/);
assert.match(updater,/SHELL_RELEASE_MISMATCH/);
assert.match(updater,/localStorage\.setItem\(INSTALLED_HTML_KEY,html\)/);
assert.match(updater,/retireLegacyWorkersAndCaches/);
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
assert.match(candidate,/CLIENT_UNIVERSAL_TIMEOUT_MS=8000/,"Universal AI client must have a bounded response budget");
assert.match(universal,/UNIVERSAL_TIMEOUT_MS=6_875/,"Universal AI server budget must be one quarter of the historical 27.5 seconds");
assert.match(candidate,/async function answerBrowserVoiceQuery\(context,clean\)[\s\S]*?browser_fallback_general_in_place[\s\S]*?submitAiUniversalText\(clean,\{voiceOnly:true\}\)/,"R55 general iPhone questions must use the proven Universal AI path");
assert.match(candidate,/function finishAiUniversalSpeechTurn\(\{resumeConversation=false\}=\{\}\)[\s\S]*?releaseAiUniversalPlaybackForListening\(\)[\s\S]*?setTimeout\(\(\)=>\{if\(resumeBrowserVoiceConversationAfterSpeech\(\)\)return;/,"Universal voice must release playback before reopening the microphone");
assert.match(candidate,/speakAiUniversalText\(result\.answer,\{resumeConversation:true\}\)/,"A completed Universal voice answer must request the next listening turn");
assert.match(candidate,/function releaseAiUniversalPlaybackForListening\(\)[\s\S]*?aiUniversalSpeechPrimer=null;aiUniversalSpeechPrimed=false;aiUniversalTtsObjectUrl="";aiUniversalTtsAudio=null/,"R57 must fully release the generated-audio session before the next iPhone turn");
assert.doesNotMatch(candidate,/function fireMicActivation\(context,e\)[\s\S]*?releaseAiUniversalPlaybackForListening\(\);\s*primeAiUniversalSpeechFromGesture\(\);/,"R57 must not play a silent audio primer immediately before opening the microphone");
assert.match(candidate,/player\.onended=\(\)=>finishAiUniversalSpeechTurn\(\{resumeConversation\}\)/,"Generated audio completion must enter the safe continuation path");
assert.match(candidate,/speed:1\.035,\s*accumulatedSpeed:1\.035/,"R52 must increase Realtime locutor speed by 15 percent from 0.90x");
assert.match(candidate,/AI_UNIVERSAL_VOICE_SPEED=1\.15/,"Universal locutor must run 15 percent faster than 1.00x");
assert.match(candidate,/utterance\.rate=AI_UNIVERSAL_VOICE_SPEED/,"Device Universal locutor must use the 15 percent profile");
assert.match(candidate,/player\.playbackRate=AI_UNIVERSAL_VOICE_SPEED/,"Generated Universal audio must use the 15 percent profile");
assert.match(candidate,/expectedSpeed=target===REALTIME_TURN_PROFILE_CONVERSATION\?AI_UNIVERSAL_VOICE_SPEED:VOICE_POLICY\.speed/,"Realtime Universal voice must use the 15 percent profile without changing score announcements");
assert.match(candidate,/pertinencia directa, fundamento verificable, profundidad suficiente, precisión factual, aplicación práctica y claridad/,"Realtime Universal answers must enforce the same six-part quality matrix as text");
