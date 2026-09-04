import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const client=fs.readFileSync(new URL("./gateway-realtime.js",import.meta.url),"utf8");
const endpoint=fs.readFileSync(new URL("./api/realtime-gateway-token.js",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/V372-GATEWAY-REALTIME-STREAMING-20260904/);
assert.match(worker,/v372-gateway-realtime-streaming/);
assert.match(worker,/"\/gateway-realtime\.js"/);
assert.match(endpoint,/openai\/gpt-realtime-2\.1/);
assert.match(endpoint,/gateway\.experimental_realtime\.getToken/);
assert.match(endpoint,/expiresAfterSeconds:300/);
assert.match(endpoint,/isAllowedAppOrigin/);
assert.match(client,/ai-gateway-realtime\.v1/);
assert.match(client,/input-audio-append/);
assert.match(client,/input-audio-commit/);
assert.match(client,/input-transcription-completed/);
assert.match(client,/SILENCE_MS=1200/);
assert.match(client,/voice:"cedar"/);
assert.match(client,/outputModalities:\["audio"\]/);
assert.match(client,/audio-delta/);
assert.match(client,/playAt=Math\.max/);
assert.match(client,/Español latinoamericano neutral/);
assert.doesNotMatch(client,/voice:"(?:alloy|echo)"/);

const toggle=html.slice(html.indexOf("async function toggleVoice"),html.indexOf("function dateSetup"));
assert.ok(toggle.indexOf("GSCGatewayRealtime.startCapture")<toggle.indexOf("startBrowserVoiceFallback"),"Realtime debe preceder al respaldo Safari");
assert.match(toggle,/GSCGatewayRealtime\.stopCapture/);
const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.ok(speech.indexOf("GSCGatewayRealtime.speakExact")<speech.indexOf('/api/voice-speech'),"Audio progresivo debe preceder al MP3 completo");
assert.match(html,/processBrowserVoiceTranscript\(context,text\)/);

console.log("PASS V372 · Gateway Realtime precede Safari, transcribe PCM, cierra por silencio y reproduce audio progresivo Cedar");
