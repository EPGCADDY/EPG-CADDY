import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
const access=fs.readFileSync('access.html','utf8');
const release=JSON.parse(fs.readFileSync('release.json','utf8'));

assert.match(release.label,/^R\d+$/);
assert.match(html,/<meta name="gscg-release" content="20261008-R\d+">/);
assert.match(html,/VERSIÓN R\d+/);
assert.doesNotMatch(html,/id="ownerShare24h"|id="ownerTrialReport"/);
assert.doesNotMatch(html,/PRUEBA · 48 H|VER PRUEBA 48 H/);
assert.doesNotMatch(html,/app-access\?action=status[\s\S]*role==="owner"/);
assert.match(access,/COMPARTIR APP 48 HORAS/);
assert.doesNotMatch(access,/VER ACTIVIDAD ANÓNIMA|CREAR CÓDIGO PARA JUGADOR/);

console.log('PASS R224: Score Card pública sin botones 48h; panel privado conserva administración temporal.');
