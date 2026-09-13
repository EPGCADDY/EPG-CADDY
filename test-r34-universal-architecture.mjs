import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const session=fs.readFileSync("api/session-grupal.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");

const conversation=html.slice(html.indexOf("function speakConversation(transcript)"),html.indexOf("async function setSessionVoiceSpeed"));
assert.match(conversation,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.match(conversation,/suspendRealtimeCaptureForExternalAnswer\(\)/);
assert.doesNotMatch(conversation,/response\.create|responseForConversation/);
assert.match(html,/function suspendRealtimeCaptureForExternalAnswer\(\)[\s\S]*?micTrack\.enabled=false/);
assert.match(html,/function resumeRealtimeCaptureAfterExternalAnswer\(\)[\s\S]*?micTrack\.enabled=true[\s\S]*?ESCUCHANDO · PUEDES CONTINUAR/);
assert.match(html,/showUniversalSpokenAnswer\(clean\)/);
assert.match(html,/\/api\/universal-ai/);
assert.match(html,/\/api\/voice-speech/);
assert.match(universal,/model:"gpt-5\.6"/);
assert.match(universal,/MAX_HISTORY_TURNS=80/);
assert.match(universal,/type:"web_search"/);
assert.match(html,/const CONVERSATION_VAD_SILENCE_MS=275/);
assert.match(html,/const CONVERSATION_BROWSER_SILENCE_MS=300/);
assert.match(html,/speed:1\.2305/);
assert.match(session,/speed: 1\.2305/);
assert.match(speech,/const SPEED=\.963/);
console.log("PASS R34 · arquitectura general única, texto+voz aprobada, continuidad y tiempos autorizados");
