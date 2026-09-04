import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

const start=html.indexOf("async function toggleVoice");
const end=html.indexOf("\nfunction dateSetup",start);
assert.ok(start>0&&end>start,"Falta toggleVoice");
const toggle=html.slice(start,end);
const nativeAt=toggle.indexOf("gestureSafeBrowserVoicePreferred()");
const serverAt=toggle.indexOf("serverVoiceCapturePreferred()");
const realtimeAt=toggle.indexOf("await ensureSession()");
assert.ok(nativeAt>=0,"Falta reconocimiento nativo de Safari");
assert.ok(serverAt>nativeAt,"El transporte experimental no puede anteceder al micrófono aprobado");
assert.ok(realtimeAt>serverAt,"Realtime debe permanecer como último respaldo");
assert.match(toggle,/startBrowserVoiceFallback\(context\).*MICRÓFONO DEL IPHONE ACTIVO/s);
assert.match(toggle,/startServerVoiceCapture\(context\).*MICRÓFONO ACTIVO/s);
assert.match(worker,/v376-native-mic-first/);
assert.match(audit,/test-v376-native-mic-first\.mjs/);

console.log("PASS V376 · Registro, Score y Universal usan primero el mismo micrófono nativo aprobado");
