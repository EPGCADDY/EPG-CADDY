import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/V407-R7-IOS-SCROLL-20260908/);
assert.match(worker,/v407-r7-ios-scroll/);
assert.match(html,/\.overlay\{height:100dvh;min-height:100dvh;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain/);
assert.match(html,/for\(const element of new Set\(\[document\.documentElement,document\.body,root\]\)\)/);
assert.doesNotMatch(html,/addEventListener\("touchstart",recoverInstalledAppScrolling/);
assert.match(html,/class="update-version-id" id="appVersionId">V407 · R7<\/span>/);

console.log("PASS V407-R7 · scroll iPhone estable y actualización visible");
