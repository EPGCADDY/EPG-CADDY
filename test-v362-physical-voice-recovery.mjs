import assert from "node:assert/strict";
import fs from "node:fs";
import {cedarGatewayPayload,cedarSpeechPayload} from "./api/voice-speech.js";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/V363-RECORDED-MOBILE-BEHAVIOR-20260828/);
assert.match(html,/V363-STOP-GUARD-NO-STUCK-LISTENING-20260828/);
assert.match(html,/V363-IMMEDIATE-PERSISTENT-SPOKEN-CLOSURE-20260828/);
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior/);
for(const file of ["test-v358-ios-score-universal-physical-recovery.mjs","test-v362-physical-voice-recovery.mjs"])assert.ok(audit.includes(file),file);

const direct=cedarSpeechPayload("Respuesta", "es-GT");
assert.equal(direct.model,"gpt-4o-mini-tts");
assert.equal(direct.voice,"cedar");
const gateway=cedarGatewayPayload("Respuesta", "es-GT");
assert.deepEqual(gateway,{text:"Respuesta",voice:"onyx",speed:.9,outputFormat:"mp3"});
assert.match(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1-hd"/);
assert.match(speech,/X-GSCG-Voice/);
assert.match(html,/IOS-ES-MX-0\.90-NATIVE-MEXICAN-SPANISH/);
assert.match(html,/PREPARANDO VOZ MEXICANA/);
const mexicanSpeech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.doesNotMatch(mexicanSpeech,/X-GSCG-Voice|CEDAR|ONYX|\/api\/voice-speech/);

assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=6000/);
const watchdogStart=html.indexOf("function scheduleBrowserVoiceFirstResultTimeout");
const watchdogEnd=html.indexOf("\nfunction browserVoiceCombinedTranscript",watchdogStart);
const watchdog=html.slice(watchdogStart,watchdogEnd);
assert.match(watchdog,/browser_fallback_no_result_timeout/);
assert.match(watchdog,/stopBrowserVoiceRecognitionSafely\(recognition,context\)/);
const stopGuard=html.slice(html.indexOf("function stopBrowserVoiceRecognitionSafely"),html.indexOf("\nfunction scheduleBrowserVoiceFinalize",html.indexOf("function stopBrowserVoiceRecognitionSafely")));
assert.match(stopGuard,/BROWSER_VOICE_STOP_GUARD_MS/);
assert.match(stopGuard,/recognition\.stop\(\)/);
const begin=html.slice(html.indexOf("function beginBrowserVoiceRecognition"),html.indexOf("\nfunction startBrowserVoiceFallback"));
assert.match(begin,/onstart=[\s\S]*scheduleBrowserVoiceFirstResultTimeout/);
assert.match(begin,/onresult=[\s\S]*clearBrowserVoiceFirstResultTimer/);

const seal=html.slice(html.indexOf("function sealBrowserVoiceProgress"),html.indexOf("\nfunction finalizeBrowserVoiceFallback"));
assert.match(seal,/const closure=consumeLiveRoundClosures\(\)/);
assert.match(seal,/return\{handled:true,count,closure\}/);
const finalize=html.slice(html.indexOf("function finalizeBrowserVoiceFallback"),html.indexOf("\nfunction restartBrowserVoiceAfterNaturalEnd"));
assert.match(finalize,/progressive\.closure[\s\S]*speakClosure\(progressive\.closure\)/);
const spokenClosure=html.slice(html.indexOf("async function speakClosure"),html.indexOf("\nasync function speakQuery"));
assert.match(spokenClosure,/return speakAiUniversalText\(text\)/);

assert.deepEqual(sanitizeVoiceHealth({event:"browser_fallback_no_result_timeout",build:"V363",transportFailure:"no_speech",transcript:"PRIVADO"}),{event:"browser_fallback_no_result_timeout",build:"V363",context:"round",turn:0,elapsedMs:0,transportFailure:"no_speech"});

console.log("PASS V362/V371 · un toque + watchdog + voz iOS es-MX + cierre hablado y persistencia progresiva");
