import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');

const ids=[
'cardLibraryOpenGlobal','cardLibraryImageGlobal','cardLibraryPdfGlobal','cardLibraryPlayer',
'cardLibraryOpenPersonal','cardLibraryImagePersonal','cardLibraryPdfPersonal','cardLibraryPdfAll','cardLibraryStats'
];
for(const id of ids)assert(app.includes('id="'+id+'"'),'Falta control físico '+id);

for(const id of ['cardLibraryOpenGlobal','cardLibraryImageGlobal','cardLibraryPdfGlobal','cardLibraryOpenPersonal','cardLibraryImagePersonal','cardLibraryPdfPersonal','cardLibraryPdfAll','cardLibraryStats']){
  assert(app.includes('$("'+id+'").addEventListener("click"'),'Falta handler '+id);
}

assert.match(app,/function cardLibrarySelectedPersonalArtifact\(\)/,'Falta selección personal desde historial');
assert.match(app,/function renderCardLibraryActions\(\)/,'Falta habilitar/deshabilitar acciones según selección');
assert.match(app,/function cardLibraryImage\(item\)/,'Falta imagen desde historial');
assert.match(app,/function cardLibraryPdfAll\(\)/,'Falta PDF completo desde historial');

console.log('PASS R60 historial físico: global/personal imagen/pdf/paquete/estadísticas accesibles');
