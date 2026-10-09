import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const handlers={},network=[],cache=[];
const env={URL,Response,Headers,self:{location:{origin:'https://app.example'},addEventListener:(name,fn)=>handlers[name]=fn},fetch:async(request,options)=>{network.push({url:request.url,options});return new Response('invite login')},caches:new Proxy({},{get(_t,key){return()=>{cache.push(key);throw Error('Invitation must never use cached app shell')}}})};
vm.runInNewContext(fs.readFileSync('service-worker.js','utf8'),env);
for(const path of ['/invite/'+'a'.repeat(43),'/access.html?invite='+'a'.repeat(43)]){
 let response;
 handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://app.example'+path},respondWith:p=>response=p});
 assert.equal(await (await response).text(),'invite login');
 assert.equal(network.at(-1).url,'https://app.example'+path);
 assert.equal(network.at(-1).options.cache,'no-store');
}
assert.deepEqual(cache,[]);
console.log('PASS invitation and access navigation reach original network URL; zero app-shell cache reads');
