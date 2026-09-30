import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const sw=fs.readFileSync('service-worker.js','utf8');

const release=JSON.parse(fs.readFileSync('release.json','utf8')).release;
assert.equal(app.match(/name="gscg-release" content="([^"]+)/)?.[1],release,'La app debe identificar la release vigente');
assert.match(app,/updateViaCache:"none"/,'El registro del Service Worker debe ignorar caché HTTP intermedia');
assert.doesNotMatch(app,/controllerchange[^\n]*location\.reload\(\)/,'Cambiar controlador no debe recargar la ronda sin el toque ACTUALIZAR');

assert.match(sw,/fetchPublishedRelease\(\)/,'El SW consulta la release LAB vigente');
assert.match(sw,/let RELEASE=RELEASE_FALLBACK/,'El SW conserva un respaldo cuando no hay red');
assert.match(sw,/clients\.claim\(\)/,'El SW nuevo debe tomar control inmediato');
assert.doesNotMatch(sw,/client\.navigate\(/,'Activar el SW no debe sustituir automáticamente la ronda abierta');
assert.doesNotMatch(sw,/LAB-PHYSICAL-CERTIFIED-20260923-R59/,'No debe quedar release R59 como release activa del SW');

console.log('PASS LAB: release sincronizada y actualización manual sin navegación automática');

assert.match(app,/#cardLibraryActions\{display:none!important/,'MIS RONDAS GUARDADAS no debe mostrar la franja blanca de acciones redundantes');

assert.doesNotMatch(app,/<span>HOYO<\/span><strong>SCORE<\/strong>/,"El anotador no debe mostrar la columna HOYO");
assert.match(app,/<strong>JUGADOR<\/strong><strong>SCORE<\/strong><span class="round-keypad-head">TECLADO<\/span>/,"El anotador debe conservar JUGADOR, SCORE y TECLADO");

assert.match(app,/grid-template-columns:minmax\(70px,1\.2fr\) minmax\(58px,1fr\) repeat\(3,minmax\(40px,\.72fr\)\)!important/,'La matriz móvil debe tener cinco columnas sin HOYO');
assert.match(app,/\.round-player-grid-head>strong,\.round-player-grid-head>span,\.round-player-grid-head>span:not\(:empty\)\{font-size:16px!important;[^}]*color:#fff!important/,'TECLADO no debe heredar el verde grande de celdas no vacías');

assert.doesNotMatch(app,/id="shareFinalLiveButton"/,'Tarjeta Digital Final no debe mostrar compartir ronda en vivo');
assert.doesNotMatch(app,/id="openOfficialCorrection">CORREGIR RONDA/,'Tarjeta Digital Final no debe mostrar CORREGIR RONDA');
assert.match(app,/id="sendFinalCard" hidden>COMPARTIR TARJETA<\/button>/,'Debe conservar COMPARTIR TARJETA');
assert.match(app,/id="sendFinalCardPlayers"[^>]*>ENVIAR A JUGADORES<\/button>/,'Debe incluir ENVIAR A JUGADORES');
assert.match(app,/function finalCardRegisteredRecipients\(\)/,'ENVIAR A JUGADORES debe depender del registro WhatsApp');
