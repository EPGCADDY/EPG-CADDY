import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const access=readFileSync('access.html','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(access,/COMPARTIR APP 48 HORAS/,'Owner access panel must keep the exact 48h app-sharing action');
assert.doesNotMatch(access,/CREAR ENLACE DE PRUEBA 48 HORAS/,'Owner access panel must use the owner-approved button label');
assert.match(access,/Panel privado del propietario para crear únicamente el enlace compartido válido por 48 horas/,'Owner access copy must state the single 48h purpose');
assert.doesNotMatch(access,/CREAR CÓDIGO PARA JUGADOR|createPlayerCode|create-code|revoke-code/,'Owner access panel must not expose player-code options');
assert.doesNotMatch(access,/VER ACTIVIDAD ANÓNIMA|reportData|action=report|\$\("report"\)/,'Owner access panel must not expose anonymous activity report');
assert.doesNotMatch(access,/emitir, consultar o revocar/,'Owner access copy must not advertise removed report/extra options');
assert.match(access,/no necesitas credenciales/,'Owner access panel must still clarify normal app entry is free');
assert.match(access,/openWhatsAppInviteLink\(data\.url\)/,'Owner access create action must open WhatsApp directly after generating the 48h invitation link');
assert.match(access,/https:\/\/wa\.me\/\?text=/,'Owner access invitation sharing must route to WhatsApp without manual copy/paste');
assert.match(access,/\$\("url"\)\.onclick=\(\)=>openWhatsAppInviteLink\(\$\("url"\)\.textContent\)/,'Owner access invitation link must be touchable to reopen WhatsApp sharing');
assert.match(access,/whatsappInviteText\(url\)\{return \["INVITACIÓN 48 HORAS","","TOCA EL ENLACE PARA ABRIR LA SCORE CARD:",url\]\.join\("\\n"\)\}/,'Owner access WhatsApp message must omit EPG and put the URL alone on a clickable line');
assert.doesNotMatch(access,/EPG CADDY|join\("\\\\n"\)|48 HORAS\\\\n"\+url/,'Owner access WhatsApp message must not include EPG or send a literal backslash-n before the URL');
const releaseNumber=Number(String(release.label||'').replace(/^R/,''));
assert.ok(releaseNumber>=230,'Release label must be R230 or later for owner access 48h-only panel');

console.log('PASS R230: owner access panel exposes only the 48h invitation option.');
