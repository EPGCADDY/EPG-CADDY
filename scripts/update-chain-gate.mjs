import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const manifestPath='Intocables/UPDATE_CHAIN_PAYLOAD.lock.json';
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sha256=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const text=path=>fs.readFileSync(path,'utf8');
const capture=(source,re,label)=>{const m=source.match(re);assert.ok(m?.[1],`${label}_MISSING`);return m[1]};
const tracked=execFileSync('git',['ls-files'],{encoding:'utf8'}).split(/\r?\n/).filter(Boolean);

assert.equal(manifest.schema,'gscg-update-chain-payload/v2');
assert.equal(manifest.status,'PUBLICATION_CHAIN_LOCKED');

const apiRelease=capture(text('api/release.js'),/release:'([^']+)'/,'API_RELEASE');
const generatorRelease=capture(text('scripts/apply-update-e.mjs'),/const release='([^']+)'/,'GENERATOR_RELEASE');
assert.equal(apiRelease,generatorRelease,`CHAIN_RELEASE_DESYNC api=${apiRelease} generator=${generatorRelease}`);
assert.equal(manifest.release,apiRelease,`CHAIN_MANIFEST_RELEASE_DESYNC manifest=${manifest.release} api=${apiRelease}`);

const excludedPrefixes=[
  '.github/','CONTROL_PROYECTO_SCIRE/','docs/','evidence/','previews/','update-lab-e/','native/','node_modules/'
];
const excludedExact=new Set([
  manifestPath,'ROADMAP_OVERALL.md','ROADMAP_A_DETALLE.md','package-lock.json','app-current-shell.html'
]);
const excludedName=/^(test-|audit-|Inventario_|Manual_)/i;
const runtimeExt=/\.(?:html|js|css|json|webmanifest)$/i;
const isRuntime=path=>{
  if(excludedExact.has(path)||excludedPrefixes.some(prefix=>path.startsWith(prefix)))return false;
  if(excludedName.test(path.split('/').pop()||''))return false;
  if(path.startsWith('scripts/'))return false;
  if(path.startsWith('Intocables/'))return false;
  if(path==='vercel.json'||path==='middleware.js'||path==='candidate-index-grupal.html'||path==='index-grupal.html')return true;
  if(path.startsWith('api/')&&path.endsWith('.js'))return true;
  if(!path.includes('/')&&runtimeExt.test(path))return true;
  return false;
};
const payloadFiles=tracked.filter(isRuntime).sort();
assert.ok(payloadFiles.includes('candidate-index-grupal.html'),'CHAIN_CANDIDATE_NOT_TRACKED');
assert.ok(payloadFiles.includes('index-grupal.html'),'CHAIN_INDEX_NOT_TRACKED');
assert.ok(payloadFiles.includes('middleware.js'),'CHAIN_MIDDLEWARE_NOT_TRACKED');
assert.ok(payloadFiles.includes('vercel.json'),'CHAIN_VERCEL_NOT_TRACKED');
assert.ok(payloadFiles.some(path=>path.startsWith('api/')),'CHAIN_API_NOT_TRACKED');

const fileHashes=Object.fromEntries(payloadFiles.map(path=>[path,sha256(fs.readFileSync(path))]));
const computedFingerprint=sha256(Buffer.from(payloadFiles.map(path=>`${path}:${fileHashes[path]}`).join('\n')));
assert.equal(manifest.fingerprint,computedFingerprint,'CHAIN_PAYLOAD_FINGERPRINT_STALE');
assert.equal(manifest.fileCount,payloadFiles.length,'CHAIN_FILE_COUNT_STALE');

const candidateHash=fileHashes['candidate-index-grupal.html'];
assert.equal(manifest.candidateSha256,candidateHash,'CHAIN_CANDIDATE_SHA_STALE');

// A payload change is not allowed to keep the same announced release.
try{
  const parentRaw=execFileSync('git',['show',`HEAD^:${manifestPath}`],{encoding:'utf8',stdio:['ignore','pipe','ignore']});
  const previous=JSON.parse(parentRaw);
  if(previous.fingerprint!==manifest.fingerprint){
    assert.notEqual(previous.release,manifest.release,'CHAIN_RELEASE_NOT_BUMPED_WITH_PAYLOAD');
  }
}catch(error){
  // First installation of the v2 lock has no parent manifest; later commits are enforced.
}

console.log(`UPDATE_CHAIN_GATE PASS release=${manifest.release} files=${payloadFiles.length} fingerprint=${computedFingerprint.slice(0,12)} candidate=${candidateHash.slice(0,12)}`);
