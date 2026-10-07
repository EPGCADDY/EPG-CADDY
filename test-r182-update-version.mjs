import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const source = readFileSync('app-update.js', 'utf8');
async function run(visible, latest) {
  const nodes = new Map();
  const document = {
    hidden: false,
    querySelector: () => ({content: visible}),
    getElementById: id => nodes.get(id),
    createElement: () => ({style: {}, remove() { nodes.delete(this.id); }}),
    body: {appendChild: node => nodes.set(node.id, node)},
    addEventListener() {},
  };
  const navigator = {serviceWorker: {register: async () => ({update: async () => {}}), addEventListener() {}}};
  const root = {
    document, navigator,
    fetch: async () => ({ok: true, json: async () => ({release: latest})}),
    AbortSignal, Date, URL,
    location: {href: 'https://example.test/event-administration.html', origin: 'https://example.test'},
    setInterval() {}, console, addEventListener() {},
  };
  root.window = root;
  vm.runInNewContext(source, root);
  await new Promise(resolve => setTimeout(resolve, 10));
  return nodes;
}

assert.equal((await run('20261006-R183', '20261006-R183')).has('gscDeliveryUpdateButton'), false);
assert.equal((await run('20261006-R183', '20261006-R178')).has('gscDeliveryUpdateButton'), false);
assert.equal((await run('20261006-R178', '20261006-R183')).has('gscDeliveryUpdateButton'), true);
for (const path of ['event-administration.html', 'global-rounds.html']) {
  assert.match(readFileSync(path, 'utf8'), /<meta name="gscg-release" content="20261006-R182">/);
}
assert.match(readFileSync('index-grupal.html', 'utf8'), /<meta name="gscg-release" content="20261006-R183">/);
console.log('PASS R183 update: same version removes prompt, older server never offered as upgrade, newer release offered; main page declares R183');
