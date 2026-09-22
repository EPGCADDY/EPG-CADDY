import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');

assert.match(source,/const inlineScoreRows=\[\[1,2,3\],\[4,5,6\],\[7,8,9\],\[0,"X",""\]\]/);
assert.match(source,/key==="0"\s*\?\{player:player\.id,hole,gross:null,status:"x"\}/);
assert.match(source,/if\(key==="X"\)[\s\S]*removeManualScore\(player,hole\)/);
assert.match(source,/round\.announced\.firstSegment=false/);
assert.match(source,/round\.announced\.secondSegment=false/);
assert.match(source,/segmentSpeech\("Resultados totales de la primera vuelta\.",order\.first\)/);
assert.match(source,/segmentSpeech\("Resultados de la segunda vuelta\.",order\.second\)/);
assert.match(source,/segmentSpeech\("Resultados totales\.",ALL\)/);

console.log('PASS R39: 0=no jugó, X=borra, y cierre de 9/18 se rearma tras corrección');
