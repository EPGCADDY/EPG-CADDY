import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');

assert.match(app,/gscg-release" content="LAB-PRODUCTION-REFRESH-20260923-R60"/,'La app debe identificarse como R60');
assert.match(app,/updateViaCache:"none"/,'El registro del Service Worker debe ignorar caché HTTP intermedia');
assert.match(app,/controllerchange[\s\S]*location\.reload\(\)/,'La app debe recargar al tomar control un SW nuevo');

assert.match(sw,/const RELEASE="LAB-PRODUCTION-REFRESH-20260923-R60"/,'El SW debe identificarse como R60');
assert.match(sw,/clients\.claim\(\)/,'El SW nuevo debe tomar control inmediato');
assert.match(sw,/clients\.matchAll\(\{type:"window",includeUncontrolled:true\}\)/,'El SW debe localizar ventanas antiguas');
assert.match(sw,/client\.navigate\(url\.href\)/,'El SW debe recargar clientes viejos al activar');
assert.doesNotMatch(sw,/LAB-PHYSICAL-CERTIFIED-20260923-R59/,'No debe quedar release R59 como release activa del SW');

console.log('PASS R60: producción fuerza actualización de clientes PWA viejos y evita permanecer en R43/R59');
