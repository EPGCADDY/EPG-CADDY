import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const root=new URL('../',import.meta.url);
const manifestPath=new URL('../Intocables/UPDATE_CHAIN_PAYLOAD.lock.json',import.meta.url);
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sha256=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const read=path=>fs.readFileSync(new URL(`../${path}`,import.meta.url));
const text=path=>read(path).toString('utf8');
const capture=(source,re,label)=>{const m=source.match(re);assert.ok(m?.[1],`${label}_MISSING`);return m[1]};

assert.equal(manifest.schema,'gscg-update-chain-payload/v1');
assert.equal(manifest.status,'PUBLICATION_CHAIN_LOCKED');

const apiRelease=capture(text('api/release.js'),/release:'([^']+)'/,'API_RELEASE');
const generatorRelease=capture(text('scripts/apply-update-e.mjs'),/const release='([^']+)'/,'GENERATOR_RELEASE');
assert.equal(apiRelease,generatorRelease,`CHAIN_RELEASE_DESYNC api=${apiRelease} generator=${generatorRelease}`);
assert.equal(manifest.release,apiRelease,`CHAIN_MANIFEST_RELEASE_DESYNC manifest=${manifest.release} api=${apiRelease}`);

for(const [path,expected] of Object.entries(manifest.files||{})){
  assert.ok(fs.existsSync(new URL(`../${path}`,import.meta.url)),`CHAIN_FILE_MISSING ${path}`);
  const actual=sha256(read(path));
  assert.equal(actual,expected,`CHAIN_PAYLOAD_STALE ${path}`);
}

// If the payload manifest itself changed in this commit, the announced release must also change.
try{
  const parentManifest=execFileSync('git',['show','HEAD^:Intocables/UPDATE_CHAIN_PAYLOAD.lock.json'],{encoding:'utf8'});
  const previous=JSON.parse(parentManifest);
  if(previous.fingerprint!==manifest.fingerprint){
    assert.notEqual(previous.release,manifest.release,'CHAIN_RELEASE_NOT_BUMPED_WITH_PAYLOAD');
  }
}catch(error){
  if(!String(error?.message||error).includes('does not exist')) throw error;
}

const computedFingerprint=sha256(Buffer.from(Object.entries(manifest.files||{}).sort(([a],[b])=>a.localeCompare(b)).map(([p,h])=>`${p}:${h}`).join('\n')));
assert.equal(computedFingerprint,manifest.fingerprint,'CHAIN_FINGERPRINT_MISMATCH');

console.log(`UPDATE_CHAIN_GATE PASS release=${manifest.release} files=${Object.keys(manifest.files||{}).length} fingerprint=${manifest.fingerprint.slice(0,12)}`);
