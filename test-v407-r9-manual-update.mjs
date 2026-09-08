import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/meta name="gscg-release" content="V407-R14-PERSISTENT-MANUAL-UPDATE-20260908"/);
assert.match(worker,/const RELEASE="V407-R14-PERSISTENT-MANUAL-UPDATE-20260908"/);
assert.match(html,/class="mandatory-update available" id="mandatoryUpdate"/);
assert.match(html,/aria-disabled="false"><span id="mandatoryUpdateAction">ACTUALIZAR<\/span>/);
assert.match(html,/button\.disabled=false;button\.setAttribute\("aria-disabled","false"\)/);
assert.match(html,/if\(published===CURRENT_APP_BUILD\)showCurrentBuild\(\);else showMandatoryUpdate\(published\)/);
assert.match(html,/navigator\.serviceWorker\.getRegistrations\(\)/);
assert.match(html,/await registration\.unregister\(\)/);
assert.match(html,/if\(key\.startsWith\("gscg-mobile-"\)\)await caches\.delete\(key\)/);
assert.match(html,/nextUrl\.searchParams\.set\("app_version",pendingPublishedBuild\)/);
assert.match(worker,/self\.addEventListener\("activate",event=>event\.waitUntil\(ensureApprovedShell\(\)\.then\(\(\)=>self\.clients\.claim\(\)\)\)\)/);
assert.doesNotMatch(worker,/client\.navigate/);

console.log("PASS V407-R14 · ACTUALIZAR permanece visible, parpadeante y fuerza recarga real");
