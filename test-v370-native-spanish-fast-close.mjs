import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V371-R4-ECHO-MEXICAN-AUDIO-20260903/);
assert.match(worker,/v371-r4-echo-mexican-voice/);
assert.match(html,/CONVERSATION_VAD_SILENCE_MS=900/);
assert.match(html,/BROWSER_VOICE_SILENCE_MS=1200/);
assert.match(html,/BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS=8000/);
const firstResultRecovery=html.slice(html.indexOf("function scheduleBrowserVoiceFirstResultTimeout"),html.indexOf("function browserVoiceCombinedTranscript"));
assert.match(firstResultRecovery,/browserVoiceTransportRetryCount<BROWSER_VOICE_MAX_TRANSPORT_RETRIES/);
assert.match(firstResultRecovery,/detachBrowserVoiceRecognition\(recognition\)/);
assert.match(firstResultRecovery,/recognition\.abort\(\)/);
assert.match(firstResultRecovery,/beginBrowserVoiceRecognition\(context,"transport"\)/);
assert.match(firstResultRecovery,/browser_fallback_retry_scheduled/);
assert.match(html,/CONVERSATION_INACTIVITY_CLOSE_MS=12\*1000/);
assert.match(html,/CONVERSATION_RESPONSE_STALL_MS=15000/);

const preference=html.slice(html.indexOf("function preferredMaleBrowserVoice"),html.indexOf("function waitForPreferredMaleBrowserVoice"));
assert.match(preference,/voices\.filter\(voice=>String\(voice\.lang/);
assert.match(preference,/startsWith\("es-"\)/);
assert.match(preference,/locale==="es-mx"\?1000/);
assert.doesNotMatch(preference,/startsWith\("en-"\)/);

const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.match(speech,/\/api\/voice-speech/);
assert.match(speech,/PREPARANDO VOZ MEXICANA/);
assert.match(speech,/VOZ EN ESPAÑOL NO DISPONIBLE/);
assert.match(speech,/RESPONDIENDO EN VOZ MEXICANA · ECHO 0\.90/);
assert.match(speech,/await player\.play\(\)/);
assert.match(speech,/if\(!started\)throw new Error\("MEXICAN_TTS_NOT_STARTED"\)/);

const browserSpeech=html.slice(html.indexOf("async function speakAiUniversalMaleBrowserFallback"),html.indexOf("async function speakAiUniversalText"));
assert.match(browserSpeech,/const language="es-MX"/);
assert.match(browserSpeech,/utterance\.lang=voice\?\.lang\|\|language/);
assert.doesNotMatch(browserSpeech,/if\(!voice\)return false/);
assert.match(browserSpeech,/return new Promise\(resolve=>/);
assert.match(browserSpeech,/utterance\.onstart=.*finish\(true\)/s);
assert.match(browserSpeech,/browser_fallback_speech_start_timeout/);
assert.match(browserSpeech,/finish\(false\)/);
assert.doesNotMatch(browserSpeech,/speak\(utterance\);[^}]*return true/);

const primer=html.slice(html.indexOf("function primeAiUniversalSpeechFromGesture"),html.indexOf("function preferredMaleBrowserVoice"));
assert.match(primer,/new SpeechSynthesisUtterance\("\\u00a0"\)/);
assert.match(primer,/speechPrimer\.lang="es-MX"/);
assert.match(primer,/window\.speechSynthesis\.speak\(speechPrimer\)/);

const submit=html.slice(html.indexOf("async function submitAiUniversalText"),html.indexOf("async function continueConversationAfterTool"));
assert.equal((submit.match(/if\(voiceOnly\)return await speakAiUniversalText/g)||[]).length,3);

const conversation=html.slice(html.indexOf("function speakConversation"),html.indexOf("async function setSessionVoiceSpeed"));
assert.match(conversation,/listening=false;stopMonitorActive=false;phase="processing"/);
assert.match(conversation,/if\(micTrack\)micTrack\.enabled=false/);
assert.match(conversation,/submitAiUniversalText\(clean,\{voiceOnly:true\}\)/);
assert.doesNotMatch(conversation,/response\.create/);
assert.doesNotMatch(conversation,/micTrack\.enabled=listening/);

console.log("PASS V370 · español nativo prioritario + cierre físico inmediato + tiempos conversacionales acotados");
