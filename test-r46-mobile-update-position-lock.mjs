import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.equal((source.match(/right:58px/g)||[]).length,0);
assert.equal((source.match(/right:22px/g)||[]).length,0);
assert.equal((source.match(/top:calc\(env\(safe-area-inset-top\) \+ 12px\)/g)||[]).length,0);
assert.ok((source.match(/top:max\(60px,calc\(env\(safe-area-inset-top,0px\) \+ 58px\)\)/g)||[]).length>=1);
assert.ok((source.match(/right:max\(10px,env\(safe-area-inset-right\)\)/g)||[]).length>=1);
console.log('PASS R46: ACTUALIZAR mantiene una sola posición fija móvil debajo de MENÚ');
