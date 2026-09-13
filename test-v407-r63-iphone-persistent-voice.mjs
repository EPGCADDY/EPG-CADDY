import assert from "node:assert/strict";
import fs from "node:fs";

const source=fs.readFileSync("candidate-index-grupal.html","utf8");
const override=fs.readFileSync("voice-assistant.js","utf8");
const generator=fs.readFileSync("scripts/apply-update-e.mjs","utf8");
const release=fs.readFileSync("api/release.js","utf8");

const toggle=source.slice(source.indexOf("async function toggleVoice("),source.indexOf("function dateSetup()"));
assert.ok(toggle.includes("await ensureSession()"),"WebRTC persistente debe estar disponible");
assert.ok(toggle.includes("startBrowserVoiceFallback(context)"),"fallback local debe conservarse");
assert.ok(override.includes("window.gestureSafeBrowserVoicePreferred=()=>false"),"iPhone no debe forzar captura de una sola toma");
assert.ok(source.includes("finishAiUniversalSpeechTurn({resumeConversation})"),"audio debe reabrir la conversación");
assert.ok(source.includes("resumeConversationListening()"),"WebRTC debe permitir el siguiente turno");
assert.ok(generator.includes("V407-R63-IPHONE-PERSISTENT-VOICE-20260913"));
assert.ok(generator.includes("V407 · R63"));
assert.ok(release.includes("V407-R63-IPHONE-PERSISTENT-VOICE-20260913"));
console.log("PASS R63 IPHONE · WebRTC persistente primero, audio y segundo turno conservados, fallback ante fallo");
