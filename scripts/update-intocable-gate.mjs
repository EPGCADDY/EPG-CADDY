import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';

const mode=process.argv[2]||'source';
const root=new URL('../',import.meta.url);
const lock=JSON.parse(fs.readFileSync(new URL('../Intocables/ACTUALIZADOR_APROBADO.lock.json',import.meta.url),'utf8'));
const engine=fs.readFileSync(new URL('../update-client-e.js',import.meta.url));
const generator=fs.readFileSync(new URL('./apply-update-e.mjs',import.meta.url),'utf8');
const api=fs.readFileSync(new URL('../api/release.js',import.meta.url),'utf8');

function gitBlobSha1(bytes){
  const header=Buffer.from(`blob ${bytes.length}\0`,'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([header,bytes])).digest('hex');
}
function capture(source,re,label){
  const m=source.match(re);
  assert.ok(m?.[1],`${label}_MISSING`);
  return m[1];
}

assert.equal(lock.schema,'gscg-pinned-updater-lock/v1');
assert.equal(lock.status,'INTOCABLE_TECNICO');
assert.equal(gitBlobSha1(engine),lock.engine.gitBlobSha1,'ACTUALIZADOR_INTOCABLE_VIOLADO: update-client-e.js cambio');

for(const required of [
  'const RELEASE_ENDPOINT="/api/release"',
  'const SHELL_ENDPOINT="/app-current-shell.html"',
  'cache:"no-store"',
  'SHELL_RELEASE_MISMATCH_',
  'localStorage.setItem(INSTALLED_HTML_KEY,html)',
  'localStorage.setItem(INSTALLED_RELEASE_KEY,data.release)',
  'retireLegacyWorkersAndCaches()',
  'location.replace(next.toString())',
  'fresh.addEventListener("click",install)'
]) assert.ok(engine.includes(required),`ACTUALIZADOR_CONTRATO_ROTO: falta ${required}`);

const generatedRelease=capture(generator,/const release='([^']+)'/,'GENERATOR_RELEASE');
const apiRelease=capture(api,/release:'([^']+)'/,'API_RELEASE');
const apiBaseline=capture(api,/baseline:'([^']+)'/,'API_BASELINE');
assert.equal(generatedRelease,apiRelease,`RELEASE_DESINCRONIZADO generator=${generatedRelease} api=${apiRelease}`);
const rxx=capture(generatedRelease,/V407-(R\d+)-DIRECT-UPDATE-/,'RELEASE_RXX');
assert.equal(apiBaseline,`V407-${rxx}`,`BASELINE_DESINCRONIZADO ${apiBaseline} != V407-${rxx}`);

if(mode==='built'){
  const shell=fs.readFileSync(new URL('../app-current-shell.html',import.meta.url),'utf8');
  const shellRelease=capture(shell,/<meta\s+name=["']gscg-release["']\s+content=["']([^"']+)["']/i,'SHELL_RELEASE');
  assert.equal(shellRelease,apiRelease,`SHELL_API_DESINCRONIZADO shell=${shellRelease} api=${apiRelease}`);
  assert.ok(shell.length>300000,'SHELL_TOO_SMALL');
}

console.log(`ACTUALIZADOR_INTOCABLE PASS mode=${mode} engine=${lock.engine.gitBlobSha1} release=${apiRelease}`);
