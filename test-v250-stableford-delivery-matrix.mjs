import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');

assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);
assert.match(html,/id="shareGlobalCard">CORREO \/ WHATSAPP GLOBAL/);
assert.match(html,/id="sharePersonalCard">CORREO \/ WHATSAPP PERSONAL/);
assert.match(html,/navigator\.share\(\{title,text,files:\[file\]\}\)/);
assert.match(html,/ARCHIVO OFICIAL DESCARGADO · ADJÚNTALO EN CORREO O WHATSAPP/);
assert.match(html,/NO SE MARCÓ COMO ENVIADO/);
assert.doesNotMatch(html,/STABLEFORD no genera envíos automáticos en esta versión/);
assert.doesNotMatch(html,/STABLEFORD SCRATCH · TARJETA OFICIAL · SOLO CONSULTA";\$\("artifactActions"\)\.hidden=true/);
assert.match(html,/archiveRoundSnapshot\(round\)/);
assert.match(html,/CAMPO, FECHA, TORNEO Y TARJETA GUARDADOS EN HISTORIAL/);

console.log('PASS V252: Stableford conserva matriz oficial GRUPAL, historial y compartir');
