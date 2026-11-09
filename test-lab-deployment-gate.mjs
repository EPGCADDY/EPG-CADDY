import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const config=JSON.parse(readFileSync('vercel.json','utf8'));
const localAudit=readFileSync('scripts/build-manual-lab.mjs','utf8');
const directory=mkdtempSync(join(tmpdir(),'gsc-deployment-gate-'));
const gates=['project-quality-gate','roadmap-gate','inventory-gate','test-global-public-entry-policy','release-matrix-gate'];
try{
  mkdirSync(join(directory,'scripts'));
  for(const failing of [0,1,2,3,4,-1]){
    for(const [index,name] of gates.entries()){const file=name==='test-global-public-entry-policy'?join(directory,name+'.mjs'):join(directory,'scripts',name+'.mjs');writeFileSync(file,`import{writeSync}from'node:fs';writeSync(1,${JSON.stringify(name+'\n')});process.exit(${index===failing?23:0});`);}
    const result=spawnSync('sh',['-c',config.buildCommand],{cwd:directory,encoding:'utf8'});
    assert.equal(result.status,failing<0?0:23,'A failing release check must reject the deployment');
    assert.deepEqual(result.stdout.trim().split('\n'),gates.slice(0,failing<0?5:failing+1),'A rejected check must prevent every later build step');
  }
  assert.match(config.installCommand,/--omit=dev/,'Remote deployment keeps the approved low-build production install');
  for(const test of ['test-r251-two-digit-score.mjs','test-backup-account-roundtrip.mjs'])assert(localAudit.includes(test),'Required regression stays in local full audit: '+test);
  console.log('PASS LAB deployment pipeline: quality, roadmap, inventory, public entry and release matrix execute in order; full regression retained locally; each injected failure stops release. Disposable command fixtures.');
}finally{rmSync(directory,{recursive:true,force:true})}
