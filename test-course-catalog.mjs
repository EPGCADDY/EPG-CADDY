import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const expected=['El Pulté','Country Club','San Isidro','Mayan Golf','Hacienda Nueva','Alta Vista','La Reunión'];

for(const name of expected)assert.ok(html.includes(`name:"${name}"`),`Falta el campo ${name}`);
assert.equal((html.match(/name:"(?:El Pulté|Country Club|San Isidro|Mayan Golf|Hacienda Nueva|Alta Vista|La Reunión)"/g)||[]).length,7);
assert.ok(html.includes('type="radio" name="registrationCourse"'),'El campo debe elegirse mediante selección única');
assert.ok(html.includes('if(!selectedCourse?.configured)'),'Los campos pendientes deben quedar bloqueados');
assert.ok(html.includes('country_club:{name:"Country Club",displayName:"GUATEMALA COUNTRY CLUB",configured:true}'),'Country Club debe estar habilitado con su nombre oficial de tarjeta');
assert.ok(!html.includes('TEESS'),'La forma TEESS está prohibida');
assert.ok(!html.includes('player-registration-guide'),'Las tres falsas casillas de registro deben estar eliminadas');
assert.ok(!html.includes('NOMBRE / HDCP - MARCAS - TEES'),'El rótulo engañoso de las falsas casillas debe estar eliminado');
assert.match(html,/<div class="newbie-guide-player">HASTA 6 JUGADORES<\/div>/,'La guía vigente debe informar el límite real sin recuperar las falsas casillas');
assert.ok(html.includes('if(!Array.isArray(players)||players.length<1||players.length>6)'),'La validación funcional debe conservar el límite de seis jugadores');
console.log('PASS catálogo y registro V170');
