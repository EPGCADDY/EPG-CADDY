import assert from "node:assert/strict";
import fs from "node:fs";
import {cedarGatewayPayload} from "./api/voice-speech.js";

const speech=fs.readFileSync("api/voice-speech.js","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const payload=cedarGatewayPayload("La capital de Australia es Canberra.");

assert.equal(payload.voice,"f0325cd11aac4fa983eb41ca2d371660");
assert.equal(payload.language,"es-419");
assert.equal(payload.speed,.9);
assert.match(payload.instructions,/Locutor masculino adulto mexicano/);
assert.match(speech,/voice:FIXED_MALE_VOICE/);
assert.match(worker,/v383-fixed-male-voice/);

console.log("PASS V383 · locutor masculino Fish fijo por ID, español es-419 y velocidad 0.90");
