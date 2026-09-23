import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');
assert.match(app,/error\?\.name==="AbortError"\)\{status\.textContent="COMPARTIR CANCELADO"/,'Historial debe distinguir cancelación de compartir');
assert.match(app,/status\.textContent="NO SE PUDO GENERAR EL ARCHIVO"/,'Errores reales deben seguir visibles');
console.log('PASS R60 historial share: cancelación separada de error real');
