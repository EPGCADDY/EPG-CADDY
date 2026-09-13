import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/class="update-version-id" id="appVersionId">V407 · R\d+<\/span><button type="button" id="mandatoryUpdateButton" aria-disabled="true" disabled/);
assert.match(html,/\.mandatory-update-card\{display:flex;flex-direction:column;align-items:center\}/);
assert.match(html,/\.update-version-id\{[^}]*color:#fff/);
assert.match(html,/mandatoryUpdateAction"\)\.textContent="ACTUALIZAR"/);
assert.match(html,/sessionStorage\.setItem\("gscg\.expected\.release",pendingPublishedBuild\)/);
assert.match(html,/nextUrl\.searchParams\.delete\("app_version"\)/);
assert.match(html,/nextUrl\.searchParams\.set\("update_check",String\(Date\.now\(\)\)\)/);
assert.match(html,/navigator\.serviceWorker\.ready/);
assert.match(html,/worker\.postMessage\(\{type:"PROMOTE_BUILD",build:pendingPublishedBuild,nonce\},\[channel\.port2\]\)/);
assert.match(worker,/if\(url\.searchParams\.get\("app_version"\)===RELEASE\)\{await promoteCandidate\(\)/);
assert.match(worker,/self\.addEventListener\("activate",event=>event\.waitUntil\(ensureApprovedShell\(\)\.then\(\(\)=>self\.clients\.claim\(\)\)\)\)/);
assert.match(worker,/const RELEASE="V407-R33-ROOT-VOICE-UPDATE-20260910"/);
assert.doesNotMatch(worker,/install[\s\S]{0,300}promoteCandidate\(/,"La instalación del worker no puede promover R33 sin el toque del propietario");

console.log("PASS V407-R7 ID SOBRE ACTUALIZAR · ÁREA SEGURA IPHONE");
