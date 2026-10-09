import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('index-grupal.html', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));

assert.match(release.label, /^R\d+$/);
assert.match(html, /<meta name="gscg-release" content="2026100[89]-R\d+">/);
assert.match(html, /VERSIÓN R\d+/);

assert.match(
  html,
  /class="draft-hcp-input"[^>]+type="text"[^>]+inputmode="text"[^>]+pattern="\[\+-\]\?\[0-9\]\*"/,
  'El HDCP de Registro debe permitir capturar signo plus en iPhone'
);
assert.match(html, /championship">CAMPEONATO/);
assert.match(html, /a">A/);
assert.match(html, /hcp-stroke-give/);
assert.match(html, /displayHandicapValue\(value\)[\s\S]*number<0\?`\+\$\{Math\.abs\(number\)\}`/);
assert.match(html, /parseManualHandicapValue\(value\)[\s\S]*return-Number\(raw\.slice\(1\)\)/);
assert.match(
  html,
  /\.hcp-stroke-give\{[^}]*color:var\(--red\)!important[^}]*border:2px solid var\(--red\)!important[^}]*border-radius:50%/s,
  'Los tiros que el jugador entrega al campo deben marcarse con círculo rojo en la fila HDCP'
);
assert.match(
  html,
  /giveClass=st<0[\s\S]*style=giveClass\?"":` style="color:\$\{tee\.color\}"`[\s\S]*class="hcp-stroke-circle \$\{giveClass\?"hcp-stroke-give":""\}"/,
  'El círculo de tiros entregados no debe heredar el color de la marca del jugador'
);
assert.match(html, /entrega \$\{given\.map/);
assert.match(html, /data-draft-hcp-sign="\$\{i\}"[^>]+aria-label="Poner handicap plus jugador \$\{i\+1\}">\+/s, 'Registro debe tener tecla visible + para handicap plus');
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
${extractFunction('displayHandicapValue')}
${extractFunction('parseManualHandicapValue')}
${extractFunction('strokesOnHole')}
this.strokesOnHole = strokesOnHole;
this.displayHandicapValue = displayHandicapValue;
this.parseManualHandicapValue = parseManualHandicapValue;
`, context);

assert.equal(context.parseManualHandicapValue('+2'), -2);
assert.equal(context.displayHandicapValue(-2), '+2');
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

console.log('PASS R224/R223: Campeonato/A capturan HDCP plus; +2 entrega tiros al campo en HDCP 17 y 18.');
