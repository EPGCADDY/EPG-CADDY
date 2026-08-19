import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const expected=['El Pulté','Country Club','San Isidro','Mayan Golf','Hacienda Nueva','Alta Vista','La Reunión'];

for(const name of expected)assert.ok(html.includes(`name:"${name}"`),`Falta el campo ${name}`);
assert.equal((html.match(/name:"(?:El Pulté|Country Club|San Isidro|Mayan Golf|Hacienda Nueva|Alta Vista|La Reunión)"/g)||[]).length,7);
assert.ok(html.includes('type="radio" name="registrationCourse"'),'El campo debe elegirse mediante selección única');
assert.ok(html.includes('if(!selectedCourse?.configured)'),'Los campos pendientes deben quedar bloqueados');
assert.ok(!html.includes('Guatemala Country Club'),'El rótulo debe ser exactamente Country Club');
assert.ok(html.includes('NOMBRE / HDCP / MARCAS - TEES'),'La guía debe mostrar nombre, handicap, marcas y tees');
assert.ok(!html.includes('TEESS'),'La forma TEESS está prohibida');
assert.ok(html.includes('HASTA 6 JUGADORES'),'La guía debe informar el límite de seis jugadores');
console.log('PASS catálogo y registro V170');
