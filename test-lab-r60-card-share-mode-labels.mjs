import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');

for(const label of ['STABLEFORD','MATCH PLAY','FOUR BALL','UNIVERSALES','MEDAL PLAY']){
  assert(app.includes('"'+label+'"')||app.includes('`'+label+'`')||app.includes('?"'+label+'"'), 'Falta etiqueta '+label);
}
assert.match(app,/snapshot\.mode==="stableford"\?"STABLEFORD":snapshot\.mode==="match_play"\?"MATCH PLAY":snapshot\.mode==="four_ball"\?"FOUR BALL":snapshot\.mode==="universales"\?"UNIVERSALES":"MEDAL PLAY"/,'Compartir tarjeta debe etiquetar modalidad exacta');

console.log('PASS R60 compartir tarjeta: modalidad exacta en Medal/Stableford/Match/Four Ball/Universales');
