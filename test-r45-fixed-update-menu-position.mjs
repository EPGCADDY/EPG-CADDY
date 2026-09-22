import assert from 'node:assert/strict';
import fs from 'node:fs';
const index=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const shortcuts=fs.readFileSync(new URL('./shortcuts-ui.js',import.meta.url),'utf8');
assert.match(index,/\.mandatory-update\{display:none;position:fixed;right:max\(10px,env\(safe-area-inset-right\)\);top:max\(60px,calc\(env\(safe-area-inset-top,0px\) \+ 58px\)\);z-index:2147482999\}/);
assert.match(shortcuts,/#gscShortcutsButton\{position:fixed!important;right:max\(10px,env\(safe-area-inset-right,0px\)\)!important;top:max\(10px,calc\(env\(safe-area-inset-top,0px\) \+ 8px\)\)!important;/);
assert.match(index,/UNIFIED|score-entry-contract\.js/);
console.log('PASS R45: MENU arriba y ACTUALIZAR debajo, ambos fijos y sin traslape');
