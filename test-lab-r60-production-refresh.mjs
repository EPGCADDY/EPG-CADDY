import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');

assert.match(app,/gscg-release" content="PRODUCTION-20260923-R68"/,'La app debe identificarse como R68');
assert.match(app,/updateViaCache:"none"/,'El registro del Service Worker debe ignorar caché HTTP intermedia');
assert.match(app,/controllerchange[\s\S]*location\.reload\(\)/,'La app debe recargar al tomar control un SW nuevo');

assert.match(sw,/const RELEASE="PRODUCTION-20260923-R68"/,'El SW debe identificarse como R68');
assert.match(sw,/clients\.claim\(\)/,'El SW nuevo debe tomar control inmediato');
assert.match(sw,/clients\.matchAll\(\{type:"window",includeUncontrolled:true\}\)/,'El SW debe localizar ventanas antiguas');
assert.match(sw,/client\.navigate\(url\.href\)/,'El SW debe recargar clientes viejos al activar');
assert.doesNotMatch(sw,/LAB-PHYSICAL-CERTIFIED-20260923-R59/,'No debe quedar release R59 como release activa del SW');

console.log('PASS R68: producción fuerza actualización de clientes PWA viejos y evita permanecer en versiones anteriores');
