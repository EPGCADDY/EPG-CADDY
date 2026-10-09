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
console.log('PASS R77 visor global: ENVIAR A JUGADORES visible y conectado');

assert.match(app,/shareOpenedArtifactToRegisteredPlayers\('\$\{token\}',window\)/,'ENVIAR A JUGADORES del visor debe ejecutar el helper en la ventana que recibió el gesto');
assert.match(app,/function shareOpenedArtifactToRegisteredPlayers\(/,'Debe existir helper funcional de envío desde el visor');
assert.match(app,/targetWindow\.navigator\?\.share/,'El envío debe usar navigator.share de la ventana tocada para conservar activación del usuario en iPhone');
assert.match(app,/-webkit-user-select:none!important;user-select:none!important/,'Los controles del visor no deben permitir seleccionar texto');
console.log('PASS R78 visor global: botón jugadores funcional, gesto iPhone preservado y texto no seleccionable');

assert.match(app,/openedArtifactBlobs=new Map/,'El PNG debe quedar preparado antes del toque de compartir');
assert.match(app,/artifactViewerSendPlayers" disabled/,'ENVIAR A JUGADORES espera el PNG antes de habilitarse');
assert.match(app,/onselectstart="return false"/,'Los botones del visor no permiten selección de texto');
console.log('PASS R78: visor funcional y texto no seleccionable');
