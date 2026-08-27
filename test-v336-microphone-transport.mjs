import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sessionApi=fs.readFileSync(new URL("./api/session-grupal.js",import.meta.url),"utf8");
const errorStart=html.indexOf("function voiceActivationErrorMessage");
const errorEnd=html.indexOf("\nfunction realtimeConnectionAction",errorStart);
const actionEnd=html.indexOf("\nfunction voiceTransportFailure",errorEnd);
const errorMessage=new Function(`${html.slice(errorStart,errorEnd)};return voiceActivationErrorMessage`)();
const connectionAction=new Function(`${html.slice(errorEnd+1,actionEnd)};return realtimeConnectionAction`)();

assert.equal(errorMessage({name:"NotFoundError"}),"NO HAY UN MICRÓFONO DISPONIBLE EN ESTE DISPOSITIVO");
assert.match(errorMessage({name:"NotAllowedError"}),/PERMISO/);
assert.match(errorMessage({name:"AbortError"}),/AGOTÓ EL TIEMPO/);
const limited=Object.assign(new Error("OpenAI no pudo crear la sesión grupal."),{status:429});
assert.match(errorMessage(limited),/TEMPORALMENTE LIMITADO/);
assert.doesNotMatch(errorMessage(limited),/INTERNET/);
assert.match(errorMessage(new Error("Canal Realtime no disponible")),/SERVICIO DE VOZ NO DISPONIBLE/);
assert.deepEqual(["connected","disconnected","failed","closed","connecting"].map(connectionAction),["ready","grace","reset","reset","wait"]);
assert.match(html,/const REALTIME_DISCONNECT_GRACE_MS=5000/);
assert.match(html,/scheduleRealtimeDisconnectRecovery\(installedPc,voiceContext\)/);
assert.match(html,/pc\.onconnectionstatechange=null;pc\.oniceconnectionstatechange=null;pc\.close\(\)/);
assert.match(html,/voiceLastErrorMessage\|\|"NO SE PUDO ABRIR EL MICRÓFONO"/);
assert.match(html,/window\.SpeechRecognition\|\|window\.webkitSpeechRecognition/);
assert.match(html,/shouldUseBrowserVoiceFallback\(err\)&&fallbackVoiceAvailable\(\)&&startBrowserVoiceFallback\(context\)/);
assert.match(html,/failure\.status=rsp\.status/);
assert.match(html,/setPrimaryVoiceMatrix\("listening",context\)/);
assert.match(html,/setPrimaryVoiceMatrix\("responding",voiceContext\)/);
assert.match(html,/utterance\.onstart=.*setPrimaryVoiceMatrix\("responding",voiceContext\)/);
assert.match(sessionApi,/"realtime-session"/);
assert.deepEqual(sanitizeVoiceHealth({event:"connection_interrupted",query:"privado",latitude:14.6}),{event:"connection_interrupted",build:"",context:"round",turn:0,elapsedMs:0});

console.log("PASS V346 · 429 no culpa Internet, activa respaldo y muestra ESCUCHANDO / RESPONDIENDO");
