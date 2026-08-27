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
assert.match(errorMessage(new Error("Canal Realtime no disponible")),/REVISA INTERNET/);
assert.deepEqual(["connected","disconnected","failed","closed","connecting"].map(connectionAction),["ready","grace","reset","reset","wait"]);
assert.match(html,/const REALTIME_DISCONNECT_GRACE_MS=5000/);
assert.match(html,/scheduleRealtimeDisconnectRecovery\(installedPc,voiceContext\)/);
assert.match(html,/pc\.onconnectionstatechange=null;pc\.oniceconnectionstatechange=null;pc\.close\(\)/);
assert.match(html,/voiceLastErrorMessage\|\|"NO SE PUDO ABRIR EL MICRÓFONO"/);
assert.match(sessionApi,/"realtime-session"/);
assert.deepEqual(sanitizeVoiceHealth({event:"connection_interrupted",query:"privado",latitude:14.6}),{event:"connection_interrupted",build:"",context:"round",turn:0,elapsedMs:0});

console.log("PASS V336 · micrófono distingue causa, tolera 5 s de desconexión y limpia transporte completo");
