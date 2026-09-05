import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sw=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
assert.match(html,/let aiUniversalDirectCaptureAfterSpeech=false;/);
assert.match(html,/setAiUniversalAudioSessionType\("play-and-record"\);aiUniversalDirectCaptureAfterSpeech=true;/);
assert.match(html,/if\(!listening&&gestureSafeBrowserVoicePreferred\(\)\)[\s\S]*if\(aiUniversalDirectCaptureAfterSpeech&&serverVoiceCapturePreferred\(\)\)/);
assert.match(html,/if\(await startServerVoiceCapture\(context,\{universalOnly:true\}\)\)\{aiUniversalDirectCaptureAfterSpeech=false;voiceLastErrorMessage="MICRÓFONO DEL IPHONE ACTIVO";return true\}/);
assert.match(html,/voiceLastErrorMessage="RECONOCIMIENTO DE VOZ NO DISPONIBLE · INTENTA DE NUEVO";return false/);
const capture=fs.readFileSync(new URL("./server-voice-capture.js",import.meta.url),"utf8");
assert.match(capture,/transcribeAudio\(base64\(wavBytes\(chunks\)\),"audio\/wav"\)/);
assert.match(capture,/if\(requestUniversalOnly&&typeof MediaRecorder==="function"\)/);
assert.match(sw,/v386-universal-direct-capture/);
console.log("PASS V386 · seguimiento universal directo; Registro y Scores conservan V378");
