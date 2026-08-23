import assert from 'node:assert/strict';import fs from 'node:fs';
const h=fs.readFileSync('index-grupal.html','utf8');
assert.match(h,/stableford-manual-cell/);
assert.match(h,/window\.prompt\(`\$\{p\.name\} · HOYO \$\{hole\} · GROSS`/);
assert.match(h,/saveEntry\(\{player:p\.name,hole,status:value==="X"\?"x":null,gross:value==="X"\?null:Number\(value\)\}\)/);
assert.match(h,/if\(result\.ok\)finishStablefordManualScoreChange\(\)/);
assert.match(h,/function finishStablefordManualScoreChange\(\)\{const closure=closureSpeechIfDue\(\);persist\(\);render\(\);if\(closure\)speakClosure\(closure\);return closure\}/);
assert.match(h,/points:GSCStableford\.pointsFor\(v\.gross,PAR\[v\.hole-1\]\)/);
console.log('PASS manual Gross -> saveEntry -> points -> cierre compartido -> persist -> render -> voz');
