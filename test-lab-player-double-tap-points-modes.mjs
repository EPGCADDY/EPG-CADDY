import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index-grupal.html','utf8');
const start=html.indexOf('function requestedPlayerResultSpeech(player){');
const end=html.indexOf('window.GSCPlayerNameAudio=',start);
assert(start>=0&&end>start,'No se encontró requestedPlayerResultSpeech');
const code=html.slice(start,end);

assert.match(code,/if\(isUniversalesRound\(\)\)[\s\S]*Puntos/,'Universales debe anunciar PUNTOS');
assert.match(code,/if\(isStablefordRound\(\)\)[\s\S]*Puntos/,'Stableford debe anunciar PUNTOS');
assert.doesNotMatch(code,/if\(isFourBallRound\(\)\)[\s\S]*Puntos/,'Four Ball no debe usar la rama especial de PUNTOS');
assert.match(code,/const segmentTotals=totals\(player,segmentHoles\)/,'Las demás modalidades conservan GROSS/NETO');

console.log('PASS doble toque modalidades: UNIVERSALES=PUNTOS · STABLEFORD=PUNTOS · FOUR BALL=GROSS/NETO');
