import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const block=source.match(/<section class="round-meta">[\s\S]*?<\/section>/)?.[0]||'';
assert.ok(block.indexOf('id="appReleaseBadge"')>=0);
assert.ok(block.indexOf('id="appReleaseBadge"')<block.indexOf('<h1>Ronda en curso</h1>'));
assert.match(block,/font-size:17px/);
assert.match(source,/if\(result\.closure\)void speakClosure\(result\.closure\)/);
console.log('PASS R42: versión arriba de Ronda en curso y mismo tamaño que fecha');
