import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const config=JSON.parse(readFileSync('vercel.json','utf8'));
const directory=mkdtempSync(join(tmpdir(),'gsc-deployment-gate-'));
const gates=['project-quality-gate','roadmap-gate','inventory-gate','build-manual-lab'];
try{
  mkdirSync(join(directory,'scripts'));
  for(const failing of [0,2,3,-1]){
    for(const [index,name] of gates.entries())writeFileSync(join(directory,'scripts',name+'.mjs'),`import{writeSync}from'node:fs';writeSync(1,${JSON.stringify(name+'\n')});process.exit(${index===failing?23:0});`);
    const result=spawnSync('sh',['-c',config.buildCommand],{cwd:directory,encoding:'utf8'});
    assert.equal(result.status,failing<0?0:23,'A failing release check must reject the deployment');
    assert.deepEqual(result.stdout.trim().split('\n'),gates.slice(0,failing<0?4:failing+1),'A rejected check must prevent every later build step');
  }
  assert.match(config.installCommand,/--include=dev/,'PostgreSQL regression dependency must be installed for release checks');
  console.log('PASS LAB deployment pipeline: quality, roadmap, inventory and regression execute in order; each injected failure stops release. Disposable command fixtures.');
}finally{rmSync(directory,{recursive:true,force:true})}
