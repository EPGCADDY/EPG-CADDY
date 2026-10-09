import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const path='CONTROL_PROYECTO_SCIRE/CONTINUIDAD_MAESTRA_LAB.md';
const text=readFileSync(path,'utf8');

for(const required of [
  'EPG-CADDY-LAB-CONTINUITY-V1',
  'MAIN NO SE TOCA NUNCA',
  'f24af2dd954ef11a87c885f9db15d34dfd7b65bf',
  'dpl_FuDVeY79yoTgjdsJwLRBsXSfR3L7',
  'https://epg-caddy.vercel.app/index-grupal.html?inicio=1',
  '6ca572ccdf74054a618fd473519edc6342fcc74c',
  'dpl_4AGM3JUoxkR6UGVJv7kuDqrfr8es',
  'https://epg-caddy-git-lab-epgcaddys-projects.vercel.app/index-grupal.html',
  'CAMBIO MÍNIMO → PRUEBA REAL → REGRESIÓN → EVIDENCIA → TERMINAR',
  'test-lab-continuity-master.mjs',
  'CONTINUACIÓN EPG CADDY LAB'
])assert.ok(text.includes(required),`Falta ancla de continuidad: ${required}`);

assert.match(text,/trabajo, prueba, commit y deployment nuevo se ejecuta exclusivamente en la rama `LAB`/);
assert.match(text,/No se borra el icono LAB antiguo hasta transferir y comprobar los datos/);
assert.match(text,/No declarar PASS físico sin evidencia obtenida en el dispositivo real/);

console.log('PASS continuidad maestra LAB: MAIN congelada, LAB canónico y relevo entre conversaciones blindados.');
