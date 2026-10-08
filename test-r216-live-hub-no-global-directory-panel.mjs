import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('live-hub.html', 'utf8');
const js = await readFile('live-hub.js', 'utf8');

for (const forbidden of [
  'hubGlobalLiveDirectory',
  'hubGlobalLiveStatus',
  'hubGlobalLiveRows',
  'GRUPOS Y RONDAS GLOBALES ACTIVOS',
  'LISTA GLOBAL COMPLETA · LABORATORIO + PRODUCCIÓN',
  'ACTUALIZADO "+new Date(item.updatedAt)'
]) {
  assert.equal(html.includes(forbidden) || js.includes(forbidden), false, `Texto/panel global no debe aparecer: ${forbidden}`);
}

assert.equal(js.includes('list_active_tournaments'), false, 'La pantalla de Scores no debe refrescar el panel global retirado');
assert.equal(html.includes('id="hubShowGeneral"'), true, 'Scores General conserva su acceso');
assert.equal(html.includes('id="hubShowCategories"'), true, 'Scores por Categoría conserva su acceso');
assert.equal(html.includes('id="hubShowIndividual"'), true, 'Buscar Jugador conserva su acceso');
assert.equal(html.includes('id="hubAddToBoard"'), true, 'Mis Favoritos conserva su acceso');

console.log('PASS R216: Scores de torneo sin panel global ni textos blancos de grupos/rondas activos.');
