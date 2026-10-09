import fs from 'node:fs';
import assert from 'node:assert/strict';
const hub=fs.readFileSync('live-hub.js','utf8');

assert.match(hub,/showPoints=rows\.some\(item=>item\.mode==="universales"\|\|item\.mode==="stableford"\)/,'Categorías debe detectar modalidades por puntos');
assert.match(hub,/showPoints\?'<th>PUNTOS<\/th>':'\'/,'La cabecera debe insertar PUNTOS sólo cuando showPoints está activo');
assert.match(hub,/item\.mode==="universales"\?item\.universalesPoints:item\.mode==="stableford"\?item\.stablefordPoints/,'Debe mostrar puntos según modalidad');
console.log('PASS R60 categorías: Stableford/Universales muestran PUNTOS; otras modalidades conservan tabla normal');
