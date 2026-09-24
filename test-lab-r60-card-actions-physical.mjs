import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');

const required=[
'openGlobalCard','imageGlobalCard','pdfGlobalCard','shareGlobalCard',
'personalCardPlayer','openPersonalCard','imagePersonalCard','pdfPersonalCard',
'sharePersonalCard','downloadAllCards','openOriginalGlobal'
];
for(const id of required)assert(app.includes('id="'+id+'"'),'Falta control '+id);

assert.match(app,/actions\.hidden=!round\.officiallyClosedAt/,'Las acciones oficiales deben mostrarse al cerrar la ronda');
assert.doesNotMatch(app,/actions\.hidden=true;sendButton\.hidden=!round\.officiallyClosedAt/,'No se permite ocultar permanentemente acciones oficiales');

for(const id of ['openGlobalCard','imageGlobalCard','pdfGlobalCard','shareGlobalCard','openPersonalCard','imagePersonalCard','pdfPersonalCard','sharePersonalCard','downloadAllCards']){
 assert(app.includes('$("'+id+'").addEventListener("click"'),'Falta listener de '+id);
}
assert.doesNotMatch(app,/id="openOfficialCorrection"/,'Tarjeta Digital Final no debe mostrar CORREGIR RONDA');
assert.match(app,/\$\("openOfficialCorrection"\)\?\.addEventListener\("click",openOfficialCorrection\)/,'El handler legado de corrección debe ser seguro si el botón final no existe');
assert.match(app,/openOriginalGlobal[^\n]*addEventListener\("click",openOriginalGlobalCard\)/,'Falta listener de tarjeta original');
assert.match(app,/openOriginalGlobal"\)\.classList\.toggle\("hidden",!corrected\)/,'Original sólo debe aparecer tras corrección');

console.log('PASS R60 tarjetas: acciones oficiales visibles tras cierre y todos los botones tienen handler');

assert.match(app,/id="artifactViewerSendPlayers"/,'El visor de Tarjeta Global debe mostrar ENVIAR A JUGADORES');
assert.match(app,/shareFinalCardToRegisteredPlayers\(\)/,'El botón del visor debe conectar con el envío a jugadores registrados');
console.log('PASS R77 visor global: ENVIAR A JUGADORES visible y conectado');
