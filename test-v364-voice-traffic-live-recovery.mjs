import assert from "node:assert/strict";
import fs from "node:fs";
import {cedarGatewayPayload} from "./api/voice-speech.js";
import {expandKnownTrafficPlace} from "./api/_lib/traffic.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const speech=fs.readFileSync("api/voice-speech.js","utf8");
const audit=fs.readFileSync("audit-project.mjs","utf8");

assert.match(html,/V364-VOICE-TRAFFIC-LIVE-RECOVERY-20260828/);
assert.match(html,/V364-CANONICAL-TTS-LOCAL-POI-20260828/);
assert.match(html,/player\.playbackRate=VOICE_POLICY\.speed/);
assert.match(worker,/gscg-mobile-v364-voice-traffic-live-recovery/);
assert.match(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1"/);
assert.doesNotMatch(speech,/GATEWAY_SPEECH_MODEL="openai\/tts-1-hd"/);
assert.deepEqual(cedarGatewayPayload("Prueba"),{text:"Prueba",voice:"onyx",outputFormat:"mp3"});
assert.equal(expandKnownTrafficPlace("El Pulté Golf"),"El Pulté Golf, Guatemala");
assert.equal(expandKnownTrafficPlace("Pradera Concepción"),"Pradera Concepción, Santa Catarina Pinula, Guatemala");
assert.equal(expandKnownTrafficPlace("Paseo de la Reforma 222, CDMX"),"Paseo de la Reforma 222, CDMX");
assert.ok(audit.includes("test-v364-voice-traffic-live-recovery.mjs"));

console.log("PASS V364 · TTS canónico + destino local exacto sin limitar GPS mundial");
