import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/meta name="gscg-release" content="V407-R9-MANUAL-UPDATE-20260908"/);
assert.match(worker,/const RELEASE="V407-R9-MANUAL-UPDATE-20260908"/);
assert.match(html,/class="mandatory-update" id="mandatoryUpdate"/);
assert.match(html,/aria-disabled="true" disabled><span id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/if\(published===CURRENT_APP_BUILD\)showCurrentBuild\(\);else showMandatoryUpdate\(published\)/);
assert.match(html,/navigator\.serviceWorker\.getRegistrations\(\)/);
assert.match(html,/await registration\.unregister\(\)/);
assert.match(html,/if\(key\.startsWith\("gscg-mobile-"\)\)await caches\.delete\(key\)/);
assert.match(html,/nextUrl\.searchParams\.set\("app_version",pendingPublishedBuild\)/);
assert.match(worker,/self\.addEventListener\("activate",event=>event\.waitUntil\(ensureApprovedShell\(\)\.then\(\(\)=>self\.clients\.claim\(\)\)\)\)/);
assert.doesNotMatch(worker,/client\.navigate/);

console.log("PASS V407-R9 · actualización manual sustituye caché y deja ACTUALIZADO");
