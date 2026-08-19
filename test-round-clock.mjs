import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.ok(html.includes('id="stopClockButton"'),'Falta el botón para detener el cronómetro');
assert.ok(html.includes('PARAR CRONÓMETRO'),'El botón debe indicar claramente su función');
assert.ok(html.includes('#stopClockButton{background:#d71920'),'El botón debe ser rojo');
assert.ok(html.includes('round.endedAt?new Date(round.endedAt).getTime():Date.now()'),'El tiempo debe congelarse al detenerse');
assert.ok(html.includes('isRoundComplete()&&lastScore'),'Una ronda completa antigua debe recuperar el último score');
assert.ok(html.includes('round.durationSeconds='),'La duración final debe persistirse');
assert.ok(html.includes('if(!round.configured||round.endedAt)return false'),'El botón debe ser idempotente');
assert.ok(html.includes('id="backToRegistrationButton"'),'Falta la flecha inferior izquierda');
assert.ok(html.includes('Regresar al registro de ronda'),'La flecha debe tener una etiqueta accesible');
assert.ok(html.includes('$("backToRegistrationButton").addEventListener("click",openNewRoundDraft)'),'La flecha debe abrir el registro sin borrar la ronda');
assert.ok(html.includes('position:fixed;left:14px;bottom:18px'),'La flecha debe permanecer visible abajo a la izquierda');
console.log('PASS controles visibles de ronda V172');
