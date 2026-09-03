import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V371-R1-IOS-SPANISH-VOICE-20260903/);
assert.match(worker,/v371-r1-ios-spanish-voice/);
assert.match(html,/CONVERSATION_VAD_SILENCE_MS=900/);
assert.match(html,/BROWSER_VOICE_SILENCE_MS=1200/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=8000/);
assert.match(html,/CONVERSATION_INACTIVITY_CLOSE_MS=12\*1000/);
assert.match(html,/CONVERSATION_RESPONSE_STALL_MS=15000/);

const preference=html.slice(html.indexOf("function preferredMaleBrowserVoice"),html.indexOf("function waitForPreferredMaleBrowserVoice"));
assert.match(preference,/voices\.filter\(voice=>String\(voice\.lang/);
assert.match(preference,/startsWith\("es-"\)/);
assert.match(preference,/locale==="es-mx"\?1000/);
assert.doesNotMatch(preference,/startsWith\("en-"\)/);

const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.match(speech,/if\(await speakAiUniversalMaleBrowserFallback\(clean\)\)return true/);
assert.match(speech,/PREPARANDO VOZ MEXICANA/);
assert.match(speech,/VOZ EN ESPAÑOL NO DISPONIBLE/);
assert.doesNotMatch(speech,/CEDAR|ONYX|\/api\/voice-speech/);

const browserSpeech=html.slice(html.indexOf("async function speakAiUniversalMaleBrowserFallback"),html.indexOf("async function speakAiUniversalText"));
assert.match(browserSpeech,/const language="es-MX"/);
assert.match(browserSpeech,/utterance\.lang=voice\?\.lang\|\|language/);
assert.doesNotMatch(browserSpeech,/if\(!voice\)return false/);

const conversation=html.slice(html.indexOf("function speakConversation"),html.indexOf("async function setSessionVoiceSpeed"));
assert.match(conversation,/listening=false;stopMonitorActive=false;phase="processing"/);
assert.match(conversation,/if\(micTrack\)micTrack\.enabled=false/);
assert.match(conversation,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.doesNotMatch(conversation,/response\.create/);
assert.doesNotMatch(conversation,/micTrack\.enabled=listening/);

console.log("PASS V370 · español nativo prioritario + cierre físico inmediato + tiempos conversacionales acotados");
