import assert from "node:assert/strict";
import fs from "node:fs";
import {createHash} from "node:crypto";

const html=fs.readFileSync("index-grupal.html","utf8");
const approval=JSON.parse(fs.readFileSync("Intocables/APROBACION_FISICA_REGISTRO_SCORES_V378.json","utf8"));
const scope=approval.scopes.find(item=>item.id==="activacion_compartida");
assert.ok(scope,"Falta activación compartida en Intocables");
const start=html.indexOf(scope.start),end=html.indexOf(scope.end,start),source=html.slice(start,end);
assert.equal(createHash("sha256").update(source).digest("hex"),scope.sha256);
assert.match(source,/releaseAiUniversalPlaybackForListening\(\);\s*primeAiUniversalSpeechFromGesture\(\);\s*setMicConnecting\(context,true\);\s*toggleVoice\(context\)/);
assert.doesNotMatch(source,/await|\.then\(|resetAiUniversalAudioSession|aiUniversalInputResetRequired/);
assert.equal(approval.scopes.length,7);
console.log("PASS V384 · activación compartida Registro/Scores restaurada desde V378 y sellada por SHA-256");
