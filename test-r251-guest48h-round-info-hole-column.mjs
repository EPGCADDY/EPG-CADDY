import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync('index-grupal.html','utf8');
const build=readFileSync('scripts/build-manual-lab.mjs','utf8');

assert.match(html,/<th class="summary-player">JUGADOR<\/th><th>HOYO<\/th><th>GROSS IN<\/th>/,'Informacion de ronda debe mostrar HOYO inmediatamente despues de JUGADOR');
assert.ok(html.indexOf('<section class="card-shell"')<html.indexOf('<tr id="summaryHeadRow"><th class="summary-player">JUGADOR</th><th>HOYO</th>'),'La tarjeta del organizador debe ver la misma columna HOYO en informacion de ronda');
assert.match(html,/const currentHole=latestRecordedHoleForPlayer\(p\)\|\|"";[\s\S]{0,260}<td>\$\{currentHole\}<\/td><td>\$\{f\.count\?f\.gross:""\}<\/td>/,'La fila del resumen debe colocar el hoyo actual antes de Gross IN');
assert.match(html,/Array\(7\)\.fill\('<td>\.<\/td>'\)/,'Las filas vacias del resumen deben cubrir la nueva columna HOYO');
assert.match(html,/window\.GSC_GUEST_ACCESS/,'La Score Card invitada 48h sigue usando la pantalla protegida de acceso invitado');
assert.match(build,/test-r251-guest48h-round-info-hole-column\.mjs/,'El candado R251 debe correr en el banco obligatorio');

console.log('PASS R251: invitados 48h ven columna HOYO entre JUGADOR y GROSS IN en informacion de ronda.');
