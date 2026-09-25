import fs from 'node:fs';import assert from 'node:assert/strict';
const code=fs.readFileSync('service-worker.js','utf8');
assert.match(code,/const RELEASE="LABORATORIO-20260925-R142"/);
assert.match(code,/fetch\(request,\{cache:"no-store"\}\)/);
assert.match(code,/key\.startsWith\("gscg-mobile-"\)&&key!==CACHE_NAME/);
assert.doesNotMatch(code,/approvedNavigationWithManualUpdate/);
assert.doesNotMatch(code,/APPROVED_CACHE_NAME/);
console.log('PASS: R142 iOS updater is network-first and removes stale approved-shell pinning');
