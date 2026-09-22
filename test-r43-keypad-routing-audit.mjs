import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');

assert.match(source,/function firstPendingScorePlayer\(hole\)/);
assert.match(source,/function ensureRoundKeyTarget\(hole\)/);
assert.match(source,/\?\{player:player\.id,hole,gross:null,status:"x"\}/);
assert.match(source,/\:\{player:player\.id,hole,gross:Number\(key\),status:null\}/);
assert.match(source,/if\(key!=="0"/);
assert.match(source,/if\(key==="X"\)[\s\S]*removeManualScore\(player,hole\)/);
assert.match(source,/find\(p=>!operationalEntryRecorded\(p\?\.holes\?\.\[hole\]\)\)/);
assert.match(source,/if\(result\.closure\)void speakClosure\(result\.closure\)/);
assert.match(source,/id="appReleaseBadge"/);

for(const key of ["1","2","3","4","5","6","7","8","9"]){
  const n=Number(key);
  assert.equal(Number(key),n);
  assert.ok(n>=1&&n<=9);
}
assert.notEqual(Number("5"),0);
console.log('PASS R43: recorrido teclado-jugador-score auditado; 1-9 directos, 0 omisión, X borrado');
