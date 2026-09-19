import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';
const handlers={};let offline=false;
const cachedCard=new Response('CARD');
const context={URL,Response,Headers,self:{location:{origin:'https://lab.test'},addEventListener:(type,fn)=>handlers[type]=fn},caches:{open:async()=>({match:async r=>r==='/index-grupal.html'?cachedCard.clone():null,put:async()=>{}})},fetch:async()=>{if(offline)throw Error('offline');return new Response('LIVE')}};
vm.runInNewContext(fs.readFileSync('service-worker.js','utf8'),context);
async function navigate(path){let result;handlers.fetch({request:{url:'https://lab.test'+path,method:'GET',mode:'navigate'},respondWith:p=>result=p});return await result}
assert.equal(await (await navigate('/live-hub.html')).text(),'LIVE');
offline=true;assert.equal((await navigate('/live-hub.html')).type,'error');
console.log('PASS LIVE uses requested page; offline never substitutes scorecard');
