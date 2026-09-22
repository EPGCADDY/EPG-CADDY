import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.match(source,/id="appReleaseBadge"/);
assert.match(source,/function appVersionLabel\(build\)/);
assert.match(source,/VERSIÓN \$\{current\} · ÚLTIMA \$\{latest\}/);
assert.match(source,/paintAppVersionBadge\(build\)/);
assert.match(source,/if\(result\.closure\)void speakClosure\(result\.closure\)/);
console.log('PASS R41: versión visible y estado de atraso + cierre automático R40 preservado');
