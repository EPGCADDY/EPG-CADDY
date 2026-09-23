import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');

assert.match(source,/function playedSegmentOrder\(\)/);
assert.match(source,/const first=firstHole>=10\?BACK:FRONT/);
assert.match(source,/segmentSpeech\(order\.first===FRONT\?"Resultados totales de la primera vuelta\.":"Resultados de la segunda vuelta\.",order\.first\)/);
assert.match(source,/segmentSpeech\(order\.second===FRONT\?"Resultados totales de la primera vuelta\.":"Resultados de la segunda vuelta\.",order\.second\)/);
assert.match(source,/segmentSpeech\("Resultados totales\.",ALL\)/);

const secondIdx=source.indexOf('segmentSpeech(order.second===FRONT?');
const totalIdx=source.indexOf('segmentSpeech("Resultados totales.",ALL)');
assert.ok(secondIdx>=0&&totalIdx>secondIdx,'second-nine announcement must precede 18-hole total');

assert.match(source,/const segmentLabel=\`\$\{player\.name\}, hasta el hoyo/);
assert.match(source,/const totalSpeech=\`Acumulado total\./);

console.log('PASS R38: cierre de primera vuelta y segunda vuelta + resultado total, sin tocar audio individual');
