import fs from 'node:fs';
import assert from 'node:assert/strict';

const app=fs.readFileSync('index-grupal.html','utf8');
const hub=fs.readFileSync('live-hub.js','utf8');
const ui=fs.readFileSync('shortcuts-ui.js','utf8');

for(const token of [
  'SEGUNDO TOQUE DETECTADO · LLAMANDO VOZ LOCAL',
  'if(isUniversalesRound())',
  'if(isStablefordRound())',
  'Acumulado total. Puntos',
  'AUDIO DE RESULTADOS',
  'officialCloseButton',
  'VER MI TARJETA',
  'VER RONDAS GUARDADAS',
  'officialCorrectionOverlay',
  'mandatoryUpdateButton'
]) assert(app.includes(token),'Falta función física: '+token);
assert(!app.includes('PRUEBA · 48 H')&&!app.includes('VER PRUEBA 48 H'),'La Score Card pública no debe mostrar controles propietarios de prueba 48h');
assert(!app.includes('src="./auth-gate.js"'),'La entrada no debe cargar autenticación global');

assert(hub.includes('TABLERO DE MIS FAVORITOS'),'Falta favoritos');
assert(hub.includes('rankLabel'),'Falta posición oficial');
assert(hub.includes('COMPARTIR'),'Falta compartir torneo');
assert(hub.includes('VER DETALLE LIVE DE CATEGORÍA'),'Falta detalle por categoría');
assert(ui.includes('MI SCORE CARD')&&ui.includes('MANUAL DE USUARIO')&&ui.includes('SCORES TORNEO')&&ui.includes('SCORES GENERAL')&&ui.includes('SCORES MI GRUPO')&&ui.includes('SCORES POR CATEGORÍA')&&ui.includes('MIS FAVORITOS'),'MENÚ incompleto');
assert(ui.includes('position:fixed!important'),'MENÚ no es flotante');

console.log('PASS R60 matriz contractual: doble toque, puntos, audio, compartir, menú, update, cierre, tarjeta, historial y corrección; acceso general libre');
