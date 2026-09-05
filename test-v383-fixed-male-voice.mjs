import assert from "node:assert/strict";
import fs from "node:fs";
import {cedarGatewayPayload} from "./api/voice-speech.js";

const speech=fs.readFileSync("api/voice-speech.js","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const payload=cedarGatewayPayload("La capital de Australia es Canberra.");

assert.equal(Object.hasOwn(payload,"voice"),false,"el ID V383 cambió físicamente la voz V378 y debe permanecer retirado");
assert.equal(payload.language,"es-419");
assert.equal(payload.speed,.9);
assert.match(payload.instructions,/Locutor masculino adulto mexicano/);
assert.doesNotMatch(speech,/FIXED_MALE_VOICE|06ddea79e86a412aa4babdd69917331a/);
assert.match(worker,/v383-fixed-male-voice/);

console.log("PASS V390 · V383 retirado; payload y velocidad de voz restaurados exactamente desde V378");
