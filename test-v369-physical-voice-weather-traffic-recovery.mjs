import assert from "node:assert/strict";
import fs from "node:fs";
import {directTrafficRouteFromQuery,trafficOriginNeedsDeviceLocation} from "./api/universal-ai.js";
import {cedarGatewayPayload,cedarSpeechPayload} from "./api/voice-speech.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const universal=fs.readFileSync("api/universal-ai.js","utf8");

assert.equal(cedarSpeechPayload("Clima actual").speed,.9);
assert.equal(cedarGatewayPayload("Clima actual").speed,.9);
assert.match(html,/speed:\.9,[\s\S]*?accumulatedSpeed:\.9/);
assert.match(html,/utterance\.rate=VOICE_POLICY\.speed/);
assert.match(html,/CEDAR 0\.90/);
assert.match(html,/ONYX 0\.90/);

const restartStart=html.indexOf("function restartBrowserVoiceAfterNaturalEnd");
const restartEnd=html.indexOf("\nfunction stopBrowserVoiceFallback",restartStart);
const restartSource=html.slice(restartStart,restartEnd);
assert.match(restartSource,/if\(isGeneralConversationIntent\(pending\)\)return false/);
assert.ok(restartSource.indexOf("isGeneralConversationIntent(pending)")<restartSource.indexOf("beginBrowserVoiceRecognition"));

const route=directTrafficRouteFromQuery("¿Cómo está el tráfico de aquí a Pradera Concepción?");
assert.deepEqual(route,{origin:"aquí",destination:"Pradera Concepción"});
for(const origin of ["aquí","acá","mi ubicación","ubicación actual","donde estoy","here","current location"]){
  assert.equal(trafficOriginNeedsDeviceLocation(origin),true,origin);
}
assert.equal(trafficOriginNeedsDeviceLocation("El Pulté Golf"),false);
assert.match(fs.readFileSync("api/universal-ai.js","utf8"),/origin:trafficOriginNeedsDeviceLocation\(route\.origin\)\?"":route\.origin/);
assert.match(universal,/conserva exactamente el mismo razonamiento, investigación, comparación, contexto, evidencia, matices y profundidad que entregarías por texto/);
assert.match(universal,/no impongas un límite artificial de oraciones/);
assert.doesNotMatch(universal,/normalmente en tres a seis oraciones/);

console.log("PASS V369 · voz 0.90 masculina neutral + consulta universal de un turno + tráfico desde GPS");
