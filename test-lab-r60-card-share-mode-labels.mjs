import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');
const exporter=fs.readFileSync('card-file-export.js','utf8');

assert.match(app,/function officialArtifactShareText\(item,snapshot=round\.officialSnapshot\)\{const course=.*?date=new Intl\.DateTimeFormat\("es-GT".*?;return`Score Card\\n\$\{course\}\\n\$\{date\}`\}/,'El mensaje debe tener solamente Score Card, el campo y la fecha.');
assert.match(app,/shareImage\(item,"Score Card",officialArtifactShareText\(item,entry\?\.snapshot\)\)/,'El historial debe usar campo/fecha de la tarjeta seleccionada.');
assert.match(app,/payload=\{title:"Score Card",text:officialArtifactShareText\(item\),files:\[file\]\}/,'Compartir por WhatsApp debe usar el texto único de la tarjeta.');
assert.match(exporter,/async function shareImage\(item,title="Score Card",text=""\).*?navigator\.share\(\{title,text,files:\[file\]\}\)/,'La imagen compartida debe incluir ese texto.');
assert.doesNotMatch(app,/TARJETA DIGITAL FINAL · PARA:|TARJETA OFICIAL \$\{mode\} \$\{scope\}|SHA-256 \$\{snapshot\.sha256\}/,'No se deben añadir destinatarios, modalidad ni SHA-256 al mensaje.');
console.log('PASS tarjeta WhatsApp: Score Card + campo + fecha en share Global, Personal, historial y jugadores');
