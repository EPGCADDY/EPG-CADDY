import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const access=fs.readFileSync('access.html','utf8');

assert.doesNotMatch(app,/ownerShare24h|ownerTrialReport|PRUEBA · 48 H|VER PRUEBA 48 H|app-access\?action=status[\s\S]*role==="owner"/,'La Score Card pública no puede exponer botones propietarios de prueba 48h');
assert.match(access,/COMPARTIR APP 48 HORAS/,'El panel privado conserva emisión de invitaciones 48h');
assert.doesNotMatch(access,/VER ACTIVIDAD ANÓNIMA|CREAR CÓDIGO PARA JUGADOR/,'El panel privado conserva sólo la opción 48h');
assert.match(access,/app-access\?action=\$\{action\}/,'El panel privado conserva API app-access autenticada');
assert.match(access,/no necesitas credenciales/i,'El panel privado debe aclarar que la app normal abre libre');

console.log('PASS invitation UI: 48h vive sólo en access.html; Score Card pública no muestra controles propietarios.');
