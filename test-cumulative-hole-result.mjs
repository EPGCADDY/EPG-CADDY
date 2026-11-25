import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
for (const repo of ['current']) {
  const source = fs.readFileSync(`index-grupal.html`, 'utf8');
  const cell = source.match(/ const scoreCell=.*$/m)[0].trim();
  const totals = source.match(/function totals\(p,holes\)\{[\s\S]*?\n\}/)[0];
  const player = { holes: {} };
  const context = {
    p: player, ALL: Array.from({ length: 18 }, (_, i) => i + 1),
    derivedScoreForHole: (p, h) => p.holes[h],
    isOmittedScore: s => s?.status === 'x',
    resultClass: n => n < 0 ? 'under' : n > 0 ? 'over' : 'even',
    vr: n => n === 0 ? 'E' : n > 0 ? `+${n}` : String(n),
    escapeHtml: String, grossMarkHtml: s => String(s.gross)
  };
  vm.createContext(context);
  vm.runInContext(`${totals}\n${cell}\nthis.cell = scoreCell`, context);
  const add = (h, net) => { player.holes[h] = { gross: net, net, par: 4 }; };
  add(1, 5); add(2, 3); add(3, 3);
  assert.equal(context.cell(1, 'diff'), '<td class="over">+1</td>');
  assert.equal(context.cell(2, 'diff'), '<td class="even">EVEN</td>');
  assert.equal(context.cell(3, 'diff'), '<td class="under">-1</td>');
  assert.equal(context.cell(4, 'diff'), '<td class=""></td>');
  add(9, 5); add(10, 5);
  assert.equal(context.cell(9, 'diff'), '<td class="even">EVEN</td>');
  assert.equal(context.cell(10, 'diff'), '<td class="over">+1</td>');
  player.holes[2].net = 5;
  assert.equal(context.cell(10, 'diff'), '<td class="over">+3</td>');
  player.holes[2].status = 'x';
  assert.match(context.cell(2, 'diff'), />X<\/td>/);
  assert.equal(context.cell(10, 'diff'), '<td class="over">+2</td>');
  for (const [name, color] of [['under', 'var(--lime)'], ['over', 'var(--red)'], ['even', '#fff']]) {
    assert.ok(source.includes(`.${name}{color:${color}!important`));
  }
  console.log(`${repo} PASS cumulative, EVEN, colors, ninth-to-tenth, correction, omitted and unplayed holes`);
}
