import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const candidate=fs.readFileSync("candidate-index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));
const manifest=JSON.parse(fs.readFileSync("update-manifest.json","utf8"));
const expectedHash=`sha256:${crypto.createHash("sha256").update(candidate).digest("hex")}`;

assert.equal(manifest.schema,"gscg-update-manifest/v1");
assert.equal(manifest.release,"V407-R34-HARDENED-UPDATE-MICROPHONE-20260910");
assert.equal(manifest.candidatePath,"/candidate-index-grupal.html");
assert.equal(manifest.candidateSha256,expectedHash,"El manifiesto debe sellar exactamente el candidato publicado");

assert.match(worker,/const STAGING_CACHE_NAME=/);
assert.match(worker,/crypto\.subtle\.digest\("SHA-256"/);
assert.match(worker,/CANDIDATE_SHA256_MISMATCH/);
assert.match(worker,/CANDIDATE_NOT_STAGED/);
assert.match(worker,/CLIENT_SHA256_MISMATCH/);
assert.match(worker,/type:"BUILD_READY"/);
assert.match(worker,/await meta\.put\(PROMOTION_MARKER/);
assert.match(candidate,/async function verifiedUpdateWorker/);
assert.match(candidate,/type:"QUERY_BUILD"/);
assert.match(candidate,/data\.candidateSha256===pendingPublishedManifest\.candidateSha256/);
assert.match(candidate,/new URL\("\/update-manifest\.json",location\.origin\)/);
assert.match(candidate,/showMandatoryUpdate\(published,manifest\)/,"La detección debe entregar el manifiesto verificado al botón");
assert.doesNotMatch(worker,/searchParams\.get\("app_version"\).*promoteCandidate/s,"La URL no puede promover una versión sin el hash y ACK del propietario");
assert.match(worker,/url\.pathname===MANIFEST_ENTRY\)\{event\.respondWith\(fetch\(request,\{cache:"no-store"\}\)\)/,"El manifiesto de una versión futura nunca debe quedar atrapado en el shell aprobado");
const cacheHeaderFor=(source)=>vercel.headers.find((entry)=>entry.source===source)?.headers.find((header)=>header.key==="Cache-Control")?.value;
assert.equal(cacheHeaderFor("/update-manifest.json"),"no-cache, no-store, max-age=0, must-revalidate");
assert.equal(cacheHeaderFor("/candidate-index-grupal.html"),"no-cache, no-store, max-age=0, must-revalidate");

const toggle=candidate.slice(candidate.indexOf("async function toggleVoice"),candidate.indexOf("function dateSetup"));
assert.doesNotMatch(toggle,/if\(!listening&&gestureSafeBrowserVoicePreferred\(\)\)/,"iPhone no debe desviar siempre la voz fuera de Realtime");
assert.match(toggle,/await ensureSession\(\)/,"Realtime debe ser la ruta primaria");
assert.match(toggle,/shouldUseBrowserVoiceFallback\(err\).*fallbackVoiceAvailable\(\)/s,"SpeechRecognition debe quedar como respaldo después de un fallo");
assert.match(candidate,/type:"semantic_vad",eagerness:"auto"/);
assert.match(candidate,/type:"server_vad",threshold:ROUND_VAD_THRESHOLD/);
assert.match(candidate,/installedTrack\.onended=/);
assert.match(candidate,/installedTrack\.onmute=/);
assert.match(candidate,/installedTrack\.onunmute=/);

console.log("PASS V407 R34 · actualización con SHA-256/staging/ACK y Realtime primario con respaldo controlado");
