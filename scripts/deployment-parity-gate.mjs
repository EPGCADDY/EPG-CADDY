import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const [labCommit,productionCommit]=process.argv.slice(2);
assert.match(labCommit||'',/^[a-f0-9]{40}$/,'Provide verified LAB READY commit');
assert.equal(productionCommit,labCommit,'LAB and Production READY commits must match');
for(const path of ['release.json','index-grupal.html','app-update.js','service-worker.js','event-administration-ui.js']){
 const bodies=await Promise.all(['https://golf-sc-gt-lab.vercel.app/','https://epg-caddy.vercel.app/'].map(async base=>{
  const r=await fetch(base+path+'?parity='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(15000)});
  assert.equal(r.status,200,base+path);return r.text();
 }));
 const hashes=bodies.map(body=>createHash('sha256').update(body).digest('hex'));
 assert.equal(hashes[0],hashes[1],'Deployment disparity: '+path);
 console.log('PASS parity '+path+' SHA-256 '+hashes[0]);
}
console.log('PASS mandatory LAB/Production parity commit '+labCommit);
