import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('index-grupal.html', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));

assert.equal(release.label, 'R225');
assert.match(html, /<meta name="gscg-release" content="20261008-R225">/);
assert.match(html, /VERSIÓN R225/);

assert.match(
  html,
  /class="draft-hcp-input"[^>]+type="text"[^>]+inputmode="text"[^>]+pattern="-\?\[0-9\]\*"/,
  'El HDCP de Registro debe permitir capturar signo menos en iPhone'
);
assert.match(html, /championship">CAMPEONATO/);
assert.match(html, /a">A/);
assert.match(html, /hcp-stroke-give/);
assert.match(html, /entrega \$\{given\.map/);
assert.match(html, /data-draft-hcp-sign="\$\{i\}"/, 'Registro debe tener tecla visible - para HDCP');
assert.match(html, /draft-hcp-sign\.active/);
assert.match(html, /net=gross-strokes/);

function extractFunction(name) {
  const start = html.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `${name} debe existir`);
  let depth = 0;
  let seen = false;
  for (let i = start; i < html.length; i++) {
    if (html[i] === '{') {
      depth++;
      seen = true;
    } else if (html[i] === '}') {
      depth--;
      if (seen && depth === 0) return html.slice(start, i + 1);
    }
  }
  throw new Error(`No se pudo extraer ${name}`);
}

const context = {
  Number,
  Math,
  Date,
  SI_MEN: Array.from({ length: 18 }, (_, index) => index + 1),
  PAR: Array(18).fill(4),
  matrixFor: () => Array.from({ length: 18 }, (_, index) => index + 1)
};
vm.createContext(context);
vm.runInContext(`
${extractFunction('normalizeHandicapValue')}
${extractFunction('strokesOnHole')}
this.strokesOnHole = strokesOnHole;
`, context);

assert.equal(context.strokesOnHole(-2, 17, context.SI_MEN), -1);
assert.equal(context.strokesOnHole(-2, 18, context.SI_MEN), -1);
assert.equal(Math.abs(context.strokesOnHole(-2, 1, context.SI_MEN)), 0);
assert.equal(4 - context.strokesOnHole(-2, 17, context.SI_MEN), 5);
assert.equal(4 - context.strokesOnHole(0, 17, context.SI_MEN), 4);
assert.equal(4 - context.strokesOnHole(2, 1, context.SI_MEN), 3);
assert.equal(
  Array.from({ length: 18 }, (_, index) => context.strokesOnHole(-2, index + 1, context.SI_MEN))
    .reduce((sum, value) => sum + value, 0),
  -2
);

console.log('PASS R224/R223: Campeonato/A capturan HDCP negativo; -2 entrega tiros al campo y sube el neto.');