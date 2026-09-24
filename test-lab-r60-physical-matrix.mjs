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
  'mandatoryUpdateButton',
  'INVITAR · 24 H'
]) assert(app.includes(token),'Falta función física: '+token);

assert(hub.includes('TABLERO DE MIS FAVORITOS'),'Falta favoritos');
assert(hub.includes('rankLabel'),'Falta posición oficial');
assert(hub.includes('COMPARTIR'),'Falta compartir torneo');
assert(hub.includes('VER DETALLE LIVE DE CATEGORÍA'),'Falta detalle por categoría');
assert(ui.includes('MI SCORE CARD')&&ui.includes('MANUAL DE USUARIO')&&ui.includes('MIS TORNEOS'),'MENÚ incompleto');
assert(ui.includes('position:fixed!important'),'MENÚ no es flotante');

console.log('PASS R60 matriz física-contractual: doble toque, puntos, audio, compartir/invitar, menú, update, cierre, tarjeta, historial y corrección');
