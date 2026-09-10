import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/class="update-version-id" id="appVersionId">V407 · R26<\/span><button type="button" id="mandatoryUpdateButton" aria-disabled="true" disabled/);
assert.match(html,/\.mandatory-update-card\{display:flex;flex-direction:column;align-items:center\}/);
assert.match(html,/\.update-version-id\{[^}]*color:#fff/);
assert.match(html,/mandatoryUpdateAction"\)\.textContent="ACTUALIZAR"/);
assert.match(html,/nextUrl\.searchParams\.set\("app_version",pendingPublishedBuild\)/);
assert.match(html,/navigator\.serviceWorker\.getRegistrations\(\)/);
assert.match(html,/key\.startsWith\("gscg-mobile-"\)/);
assert.match(worker,/if\(url\.searchParams\.get\("app_version"\)===RELEASE\)\{await promoteCandidate\(\)/);
assert.match(worker,/self\.addEventListener\("activate",event=>event\.waitUntil\(ensureApprovedShell\(\)\.then\(\(\)=>self\.clients\.claim\(\)\)\)\)/);
assert.match(worker,/const RELEASE="V407-R26-OK-HOTFIX-20260910"/);
assert.doesNotMatch(worker,/install[\s\S]{0,300}promoteCandidate\(/,"La instalación del worker no puede promover R25 sin el toque del propietario");

console.log("PASS V407-R7 ID SOBRE ACTUALIZAR · ÁREA SEGURA IPHONE");
