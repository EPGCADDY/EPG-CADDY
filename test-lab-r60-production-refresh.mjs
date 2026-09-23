import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');

assert.match(app,/gscg-release" content="PRODUCTION-20260923-R73"/,'La app debe identificarse como R73');
assert.match(app,/updateViaCache:"none"/,'El registro del Service Worker debe ignorar caché HTTP intermedia');
assert.match(app,/controllerchange[\s\S]*location\.reload\(\)/,'La app debe recargar al tomar control un SW nuevo');

assert.match(sw,/const RELEASE="PRODUCTION-20260923-R73"/,'El SW debe identificarse como R73');
assert.match(sw,/clients\.claim\(\)/,'El SW nuevo debe tomar control inmediato');
assert.match(sw,/clients\.matchAll\(\{type:"window",includeUncontrolled:true\}\)/,'El SW debe localizar ventanas antiguas');
assert.match(sw,/client\.navigate\(url\.href\)/,'El SW debe recargar clientes viejos al activar');
assert.doesNotMatch(sw,/LAB-PHYSICAL-CERTIFIED-20260923-R59/,'No debe quedar release R59 como release activa del SW');

console.log('PASS R73: producción fuerza actualización de clientes PWA viejos y evita permanecer en versiones anteriores');

assert.match(app,/#cardLibraryActions\{display:none!important/,'MIS RONDAS GUARDADAS no debe mostrar la franja blanca de acciones redundantes');

assert.doesNotMatch(app,/<span>HOYO<\/span><strong>SCORE<\/strong>/,"El anotador no debe mostrar la columna HOYO");
assert.match(app,/<strong>JUGADOR<\/strong><strong>SCORE<\/strong><span class="round-keypad-head">TECLADO<\/span>/,"El anotador debe conservar JUGADOR, SCORE y TECLADO");

assert.match(app,/grid-template-columns:minmax\(70px,1\.2fr\) minmax\(58px,1fr\) repeat\(3,minmax\(40px,\.72fr\)\)!important/,'La matriz móvil debe tener cinco columnas sin HOYO');
assert.match(app,/\.round-player-grid-head>strong,\.round-player-grid-head>span,\.round-player-grid-head>span:not\(:empty\)\{font-size:16px!important;[^}]*color:#fff!important/,'TECLADO no debe heredar el verde grande de celdas no vacías');
