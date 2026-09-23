import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');
const lib=fs.readFileSync('card-library.js','utf8');

assert.match(app,/OVERALL · TODAS/,'Historial debe ofrecer OVERALL');
assert.match(app,/OVERALL · TODOS LOS CAMPOS/,'Historial debe ofrecer todos los campos');
for(const mode of ['GENERAL / MEDAL','STABLEFORD','MATCH PLAY','FOUR BALL','UNIVERSALES'])assert(app.includes(mode),'Falta modalidad '+mode);
assert.match(lib,/sort\(\(a,b\)=>timestamp\(b\.playedAt\)-timestamp\(a\.playedAt\)/,'Historial debe ordenar última fecha hacia atrás');
assert.match(lib,/wantedCourse[\s\S]*normalized\(item\.course\)!==wantedCourse[\s\S]*normalized\(item\.courseKey\)!==wantedCourse/,'Filtro por campo debe aceptar nombre o courseKey');
assert.match(lib,/dateTerms\(item\.playedAt\)/,'Búsqueda libre debe encontrar fecha');
assert.match(lib,/item\.players\.map\(player=>player\.name\)/,'Búsqueda libre debe encontrar jugador');
assert.match(lib,/item\.tournament/,'Búsqueda libre debe encontrar torneo');

console.log('PASS R60 historial: OVERALL + por campo + modalidades + búsqueda + última fecha hacia atrás');
