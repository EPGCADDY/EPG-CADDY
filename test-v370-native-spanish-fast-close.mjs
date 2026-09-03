import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V370-R1-IOS-SPANISH-VOICE-20260903/);
assert.match(worker,/v370-r1-ios-spanish-voice/);
assert.match(html,/CONVERSATION_VAD_SILENCE_MS=900/);
assert.match(html,/BROWSER_VOICE_SILENCE_MS=1200/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=8000/);
assert.match(html,/CONVERSATION_INACTIVITY_CLOSE_MS=12\*1000/);
assert.match(html,/CONVERSATION_RESPONSE_STALL_MS=15000/);

const preference=html.slice(html.indexOf("function preferredMaleBrowserVoice"),html.indexOf("function waitForPreferredMaleBrowserVoice"));
assert.match(preference,/voices\.filter\(voice=>String\(voice\.lang/);
assert.match(preference,/\^es-\(mx\|us\|419\)/);
assert.match(preference,/maleName\.test[\s\S]*?\?100:0/);

const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.match(speech,/const speechLanguage="es-MX"/);
assert.match(speech,/if\(await speakAiUniversalMaleBrowserFallback\(clean\)\)return true/);
assert.match(speech,/PREPARANDO VOZ CEDAR/);
assert.match(speech,/language:speechLanguage/);
assert.ok(speech.indexOf("/api/voice-speech")<speech.lastIndexOf("speakAiUniversalMaleBrowserFallback"),"Cedar debe ser principal y la voz española de iOS su recuperación");

const conversation=html.slice(html.indexOf("function speakConversation"),html.indexOf("async function setSessionVoiceSpeed"));
assert.match(conversation,/listening=false;stopMonitorActive=false;phase="processing"/);
assert.match(conversation,/if\(micTrack\)micTrack\.enabled=false/);
assert.match(conversation,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.doesNotMatch(conversation,/response\.create/);
assert.doesNotMatch(conversation,/micTrack\.enabled=listening/);

console.log("PASS V370 · español nativo prioritario + cierre físico inmediato + tiempos conversacionales acotados");
