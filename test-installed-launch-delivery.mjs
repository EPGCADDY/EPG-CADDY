import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync('pwa-launch.html','utf8'),script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
for(const scenario of ['success','offline','hung']){
 let destination='',updates=0,listener;const timers=new Map();let id=0;
 const pending={state:'installing',addEventListener(_name,fn){listener=fn},removeEventListener(){}};
 const registration={installing:pending,update:async()=>{updates++;if(scenario==='offline')throw Error('offline');if(scenario==='hung')await new Promise(()=>{})}};
 const context={Date,Promise,location:{replace:value=>destination=value},setTimeout:(fn,ms)=>{timers.set(++id,{fn,ms});return id},clearTimeout:key=>timers.delete(key),navigator:{serviceWorker:{register:async(path,options)=>{assert.equal(path,'/service-worker.js');assert.equal(options.updateViaCache,'none');return registration},addEventListener(){},removeEventListener(){}}}};
 vm.runInNewContext(script,context);await new Promise(resolve=>setImmediate(resolve));
 assert.equal(updates,1);
 if(scenario==='success'){
  assert.equal(destination,'','Installed entry must not race ahead of delivery worker activation');
  pending.state='activated';listener();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(destination,'');[...timers.values()].find(t=>t.ms===250).fn();
 }else if(scenario==='hung'){
  assert.equal(destination,'');[...timers.values()].find(t=>t.ms===8000).fn();
 }
 await new Promise(resolve=>setImmediate(resolve));
 const url=new URL(destination,'https://same-installed.example');assert.equal(url.pathname,'/index-grupal.html');assert.equal(url.searchParams.get('source'),'pwa');
 assert.ok(!url.searchParams.has('app_version')&&!url.searchParams.has('update_check'),'Discovery cannot approve or install an app release');
 assert.doesNotMatch(script,/localStorage|sessionStorage|caches\.delete|unregister/,'Launch cannot alter round data or uninstall');
 console.log('PASS same installed launch: '+scenario+'; bounded discovery, stable path and preserved storage');
}
// Verify the real original worker delivers the installed entry from the network.
let handler,result;const requests=[];vm.runInNewContext(fs.readFileSync('tests/fixtures/r14724-service-worker.js','utf8'),{URL,Response,Headers,Date,self:{location:{origin:'https://same-installed.example'},addEventListener:(name,fn)=>{if(name==='fetch')handler=fn}},fetch:async(request,options)=>{requests.push({url:request.url,cache:options.cache});return new Response(html)}});
handler({request:{method:'GET',mode:'navigate',url:'https://same-installed.example/pwa-launch.html'},respondWith:promise=>result=promise});
assert.equal(await(await result).text(),html);assert.equal(requests[0].cache,'no-store');
console.log('PASS original R147.2.4 worker: unchanged installed start_url receives fresh delivery bootstrap');
