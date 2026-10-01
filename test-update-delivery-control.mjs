import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=fs.readFileSync('app-update.js','utf8');
for(const origin of ['https://golf-sc-gt-lab.vercel.app','https://epg-caddy.vercel.app']){
 const elements=new Map(),events={},timers=[];let approved='LABORATORIO-20260930-R147.2.4',networkFailure=false,destination='',persisted=0;
 const worker={postMessage(_message,ports){ports[0].send({release:approved})}},registration={active:worker,update:async()=>{}};
 class Channel{constructor(){this.port1={close(){},onmessage:null};this.port2={send:data=>this.port1.onmessage({data})}}}
 const ctx=vm.createContext({URL,AbortSignal,MessageChannel:Channel,console:{warn(){}},location:{origin,href:origin+'/live-hub.html',assign:value=>destination=value},persist:()=>persisted++,setTimeout:callback=>{timers.push(callback);return timers.length},clearTimeout(){},setInterval(){},navigator:{serviceWorker:{controller:worker,ready:Promise.resolve(registration),register:async()=>registration,addEventListener:(name,callback)=>events[name]=callback}},document:{hidden:false,querySelector:()=>({content:approved}),getElementById:id=>elements.get(id),createElement:()=>({style:{cssText:''},remove(){elements.delete(this.id)}}),body:{appendChild:element=>elements.set(element.id,element)},addEventListener:(name,callback)=>events[name]=callback},window:{addEventListener:(name,callback)=>events[name]=callback},fetch:async()=>{if(networkFailure)throw Error('offline');return Response.json({release:'LABORATORIO-20261001-R147.2.4.4'})}});
 vm.runInContext(source,ctx);await new Promise(resolve=>setImmediate(resolve));
 const button=elements.get('gscDeliveryUpdateButton');assert.ok(button);assert.equal(button.textContent,'ACTUALIZAR');assert.equal(button.disabled,false);assert.equal(destination,'','Checking never navigates or updates an installation');assert.equal(persisted,0);
 button.onclick();assert.equal(persisted,1);const url=new URL(destination);assert.equal(url.pathname,'/index-grupal.html');assert.equal(url.searchParams.get('inicio'),'1');assert.equal(url.searchParams.get('app_version'),'LABORATORIO-20261001-R147.2.4.4');assert.ok(url.searchParams.has('update_check'));
 approved='LABORATORIO-20261001-R147.2.4.4';await events.pageshow();assert.equal(elements.has('gscDeliveryUpdateButton'),false,'Current approved build hides the independent control');
 networkFailure=true;await events.online();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'REINTENTAR','A failed check remains actionable');
 assert.equal(destination,url.toString(),'A failed check never performs another navigation');
 networkFailure=false;approved='LABORATORIO-20260930-R147.2.4';ctx.navigator.serviceWorker.ready=new Promise(()=>{});ctx.navigator.serviceWorker.controller={postMessage(){throw Error('Legacy worker does not support discovery')}};
 await events.pageshow();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'ACTUALIZAR','The displayed old card must offer update even if serviceWorker.ready never resolves');
 ctx.document.querySelector=()=>null;
 ctx.caches={keys:async()=>['gscg-mobile-test-approved-old'],open:async()=>({match:async()=>new Response('<meta name="gscg-release" content="'+approved+'">')})};
 await events.pageshow();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'ACTUALIZAR','Scores pages recover approved release from cache without controller messaging');
 approved='LABORATORIO-20261001-R147.2.4.4';await events.pageshow();assert.equal(elements.has('gscDeliveryUpdateButton'),false);
 ctx.caches={keys:async()=>[]};await events.pageshow();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'ACTUALIZAR','Unknown legacy controller still offers explicit recovery for a verified published release');
 assert.equal(destination,url.toString(),'Discovery and fallback never navigate without another click');
 console.log('PASS independent discovery '+origin+': old approved R147.2.4 offers manual button; only click navigates; failure offers retry; current build hides control');
}
