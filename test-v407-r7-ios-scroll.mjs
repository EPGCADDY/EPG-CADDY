import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/V407-R8-SINGLE-SCROLL-20260908/);
assert.match(worker,/v407-r8-single-scroll/);
assert.match(worker,/self\.clients\.matchAll\(\{type:"window",includeUncontrolled:true\}\)/);
assert.match(worker,/await client\.navigate\(url\.toString\(\)\)/);
assert.match(html,/\.overlay\{height:100dvh;min-height:100dvh;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain/);
assert.match(html,/body\.gsc-setup-open #setupOverlay\.visible\{position:relative;inset:auto;width:100%;height:auto!important;min-height:100dvh;overflow:visible!important/);
assert.match(html,/body\.gsc-setup-open:has\(#setupOverlay\.visible\) main\{display:none\}/);
assert.match(html,/for\(const element of new Set\(\[document\.documentElement,document\.body,root\]\)\)/);
assert.match(html,/if\(overlay\.id==="setupOverlay"\)\{overlay\.style\.removeProperty\("height"\);overlay\.style\.removeProperty\("overflow-y"\)/);
assert.doesNotMatch(html,/addEventListener\("touchstart",recoverInstalledAppScrolling/);
assert.match(html,/class="update-version-id" id="appVersionId">V407 · R8<\/span>/);
assert.match(html,/class="mandatory-update available" id="mandatoryUpdate"/);
assert.match(html,/id="mandatoryUpdateButton" aria-disabled="false"><span id="mandatoryUpdateAction">ACTUALIZAR<\/span>/);
assert.match(html,/nextUrl\.searchParams\.set\("update_check",String\(Date\.now\(\)\)\)/);

console.log("PASS V407-R7 · scroll iPhone estable y actualización visible");
