import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');

assert.match(html,/id="addRosterPlayer"[^>]*>AGREGAR JUGADOR<\/button>/,'Registro debe tener botón explícito para agregar jugador en ronda activa');
assert.match(html,/registrationSlots=rosterEditMode\?Math\.min\(6,Math\.max\(1,draftPlayers\.length\+\(draftPlayers\.length<6\?1:0\)\)\):6/,'Edición debe renderizar una fila adicional hasta máximo seis');
assert.match(html,/lastDataIndex=manualDraftRows\.reduce/,'Sincronización debe leer la fila nueva escrita por el usuario');
assert.match(html,/limit=rosterEditMode\?Math\.min\(6,Math\.max\(draftPlayers\.length,lastDataIndex\+1\)\):6/,'Edición debe aceptar jugadores nuevos sin eliminar los existentes');
assert.match(html,/activeFrom:old\.activeFrom\|\|rosterEditJoinHole/,'Jugador nuevo debe entrar desde el siguiente hoyo calculado');
assert.match(html,/JUGADOR NUEVO ENTRA DESDE HOYO \$\{rosterEditJoinHole\} · MÁXIMO 6/,'La interfaz debe explicar desde qué hoyo entra el jugador');
assert.doesNotMatch(html,/if\(rosterEditMode\)return false/,'El Registro ya no puede bloquear revelar una fila durante edición');

console.log('PASS R224: Registro permite agregar jugadores en ronda activa hasta seis y conserva scores previos.');
