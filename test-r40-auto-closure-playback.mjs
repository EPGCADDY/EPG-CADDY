import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');

assert.match(source,/if\(result\.closure\)void speakClosure\(result\.closure\)/);
assert.match(source,/Resultados totales de la primera vuelta/);
assert.match(source,/targetRound\.announced\.firstSegment=false/);
assert.match(source,/Resultados de la segunda vuelta/);
assert.match(source,/targetRound\.announced\.secondSegment=false/);
assert.match(source,/segmentSpeech\("Resultados totales\.",ALL\)/);
assert.match(source,/\[0,"X",""\]/);

console.log('PASS R40: cierre calculado por teclado manual se reproduce automáticamente');
