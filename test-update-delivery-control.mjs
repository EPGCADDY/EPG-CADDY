import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=fs.readFileSync('app-update.js','utf8');
for(const origin of ['https://golf-sc-gt-lab.vercel.app','https://epg-caddy.vercel.app']){
 const elements=new Map(),events={},timers=[];let approved='LABORATORIO-20260930-R147.2.4',networkFailure=false,destination='',persisted=0;
 const worker={postMessage(_message,ports){ports[0].send({release:approved})}},registration={active:worker,update:async()=>{}};
 class Channel{constructor(){this.port1={close(){},onmessage:null};this.port2={send:data=>this.port1.onmessage({data})}}}
 const ctx=vm.createContext({URL,AbortSignal,MessageChannel:Channel,console:{warn(){}},location:{origin,href:origin+'/live-hub.html',assign:value=>destination=value},persist:()=>persisted++,setTimeout:callback=>{timers.push(callback);return timers.length},clearTimeout(){},setInterval(){},navigator:{serviceWorker:{controller:worker,ready:Promise.resolve(registration),register:async()=>registration,addEventListener:(name,callback)=>events[name]=callback}},document:{hidden:false,querySelector:()=>({content:approved}),getElementById:id=>elements.get(id),createElement:()=>({style:{cssText:''},remove(){elements.delete(this.id)}}),body:{appendChild:element=>elements.set(element.id,element)},addEventListener:(name,callback)=>events[name]=callback},window:{addEventListener:(name,callback)=>events[name]=callback},fetch:async()=>{if(networkFailure)throw Error('offline');return Response.json({release:'LABORATORIO-20261001-R147.2.4.4'})}});
 vm.runInContext(source,ctx);await new Promise(resolve=>setImmediate(resolve));
 const button=elements.get('gscDeliveryUpdateButton');assert.ok(button);assert.equal(button.textContent,'ACTUALIZAR');assert.equal(button.disabled,false);assert.equal(destination,'','Checking never navigates or updates an installation');assert.equal(persisted,0);
 assert.match(button.style.cssText,/animation:gscUpdatePulse/);button.onclick();assert.equal(persisted,1);const url=new URL(destination);assert.equal(url.pathname,'/index-grupal.html');assert.equal(url.searchParams.get('inicio'),'1');assert.equal(url.searchParams.get('app_version'),'LABORATORIO-20261001-R147.2.4.4');assert.ok(url.searchParams.has('update_check'));
 approved='LABORATORIO-20261001-R147.2.4.4';await events.pageshow();assert.equal(elements.has('gscDeliveryUpdateButton'),false,'Current approved build hides the independent control');
 // Returning to Administration has no release meta and can leave several approved caches.
 ctx.document.querySelector=()=>null;
 ctx.caches={keys:async()=>['gscg-mobile-current-approved-shell','gscg-mobile-old-approved-shell'],open:async name=>({match:async()=>new Response('<meta name="gscg-release" content="'+(name.includes('-old-')?'LABORATORIO-20260930-R147.2.4':'LABORATORIO-20261001-R147.2.4.4')+'">')})};
 await events.pageshow();assert.equal(elements.has('gscDeliveryUpdateButton'),false,'Administration return must use the current controller, not a later-listed old cache');
 approved='LABORATORIO-20260930-R147.2.4';await events.pageshow();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'ACTUALIZAR','An unapproved downloaded cache cannot hide an actual update');
 approved='LABORATORIO-20261001-R147.2.4.4';await events.pageshow();assert.equal(elements.has('gscDeliveryUpdateButton'),false,'After successful update, Administration return must stay current');
 assert.equal(destination,url.toString(),'Return checks never navigate or update by themselves');
 ctx.document.querySelector=()=>({content:approved});
 console.log('PASS R185 Administration → Score Card → Administration: controller approval wins over stale or unapproved caches in '+origin);
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
 const candidate=JSON.parse(fs.readFileSync('release.json')).release;
 approved=/-B\d+$/.test(candidate)?candidate.replace(/-B\d+$/,''):candidate+'-B0';ctx.document.querySelector=()=>({content:approved});ctx.fetch=async()=>Response.json({release:candidate});
 await events.pageshow();assert.equal(elements.get('gscDeliveryUpdateButton').textContent,'ACTUALIZAR','Same visible release with a new build identity must offer manual update');assert.equal(destination,url.toString(),'Same-version build discovery never updates automatically');
 elements.get('gscDeliveryUpdateButton').onclick();assert.equal(new URL(destination).searchParams.get('app_version'),candidate);
 console.log('PASS same visible release build correction offers ACTUALIZAR without automatic navigation: '+origin);
 console.log('PASS independent discovery '+origin+': old approved R147.2.4 offers manual button; only click navigates; failure offers retry; current build hides control');
}

// R147.2.4's real worker fetches the Manual from the network, but returns its
// cached navigation script. Recovery must bootstrap without that cached script.
{
 const legacy=fs.readFileSync('tests/fixtures/r14724-service-worker.js','utf8'),manual=fs.readFileSync('manual.html','utf8'),listeners={},requests=[];
 const oldMenu='/* legacy cached menu: no independent updater */';
 const legacyContext={URL,Response,Headers,Date,fetch:async input=>{requests.push(String(input));return new Response(manual)},caches:{open:async()=>({match:async()=>new Response('<html>old card</html>')}),match:async path=>new Response(path==='/shortcuts-ui.js'?oldMenu:'<html>old card</html>')},self:{location:{origin:'https://legacy.example'},addEventListener:(name,fn)=>listeners[name]=fn}};
 vm.runInNewContext(legacy,legacyContext);
 let result;listeners.fetch({request:{method:'GET',mode:'navigate',url:'https://legacy.example/manual.html'},respondWith:promise=>result=promise});
 const delivered=await(await result).text();assert.deepEqual(requests,['/manual.html?__gscg_build_check=1']);
 const scripts=[...delivered.matchAll(/<script\b[^>]*src=["']([^"']+)["']/g)].map(m=>m[1]);
 assert.ok(scripts.includes('/app-update.js'),'The legacy network Manual must load the independent updater directly, before cached menu code');
 assert.ok(scripts.indexOf('/app-update.js')<scripts.indexOf('/shortcuts-ui.js'));
 assert.doesNotMatch(oldMenu,/app-update/);
}
console.log('PASS real R147.2.4 worker: network Manual bootstraps independent recovery without its cached menu');

// The real card update handler must keep the scoped personal card/account.
const app=fs.readFileSync('index-grupal.html','utf8');
const publishedRelease=JSON.parse(fs.readFileSync('release.json','utf8'));
assert.equal(app.match(/<meta name="gscg-release" content="([^"]+)"/)[1],publishedRelease.release,'Visible shell metadata must match the published build');
assert.equal(app.match(/id="appReleaseBadge"[^>]*>([^<]+)/)[1],`VERSIÓN ${publishedRelease.label}`,'The first visible app-version badge must match the release even before JavaScript runs');
const returnHelper=app.slice(app.indexOf('function currentRoundReturnPath('),app.indexOf('async function openRoundTournament('));
const install=app.slice(app.indexOf('async function installMandatoryUpdate('),app.indexOf('async function syncPublishedAppVersion('));
for(const configured of [true,false])for(const origin of ['https://golf-sc-gt-lab.vercel.app','https://epg-caddy.vercel.app']){
 const round={configured,players:[{name:'BECKY',holes:[{gross:5,net:4}]}]},before=JSON.stringify(round);let destination='',writes=0;
 const ctx=vm.createContext({URL,round,appBuildReloading:false,pendingPublishedBuild:'NEXT',location:{origin,href:origin+'/index-grupal.html?personalAccount=account-a&personalEvent=familia&personalKind=tournament&inicio=1',replace:url=>destination=url},persist:()=>writes++,$:()=>({classList:{contains:()=>false}})});
 vm.runInContext(returnHelper+install,ctx);await ctx.installMandatoryUpdate();const url=new URL(destination);
 for(const [key,value] of Object.entries({personalAccount:'account-a',personalEvent:'familia',personalKind:'tournament',app_version:'NEXT'}))assert.equal(url.searchParams.get(key),value);
 assert.equal(url.searchParams.get('inicio'),configured?null:'1');assert.equal(url.searchParams.get('round_return'),configured?'1':null);assert.equal(writes,1);assert.equal(JSON.stringify(round),before);
}
console.log('PASS real ACTUALIZAR: scoped Familia card/account, current scores and registration context survive in LAB and Production');

// The approved worker returns to Administration only after a complete successful update.
const workerSource=fs.readFileSync('service-worker.js','utf8');
const updateNavigation=workerSource.slice(workerSource.indexOf('async function manualAppNavigation('),workerSource.indexOf('async function authorizedPersonalNavigation('));
for(const complete of [false,true])for(const target of ['/event-administration.html?returnTo=%2Findex-grupal.html','https://evil.example/event-administration.html','/live-hub.html']){
 let promoted=0;
 const context=vm.createContext({URL,Response,RELEASE:'CURRENT',OFFLINE_ENTRY:'/index-grupal.html',APPROVED_CACHE_NAME:'approved',fetchPublishedRelease:async()=>{},refreshShell:async()=>complete,promoteCandidate:async()=>promoted++,caches:{match:async()=>new Response('approved-card')},approvedNavigationWithManualUpdate:async()=>new Response('previous-card'),networkFirst:async()=>new Response('network-card')});
 vm.runInContext(updateNavigation,context);
 const request={url:'https://epg-caddy.vercel.app/index-grupal.html?app_version=CURRENT&update_check=1&update_return='+encodeURIComponent(target)};
 const response=await context.manualAppNavigation(request);
 assert.equal(promoted,complete?1:0);
 if(complete&&target.startsWith('/event-administration.html')){assert.equal(response.status,303);assert.equal(response.headers.get('location'),'https://epg-caddy.vercel.app'+target)}else{assert.equal(response.status,200);assert.equal(await response.text(),complete?'approved-card':'previous-card')}
}
console.log('PASS R185 update returns to Administration after success; incomplete install retains prior card; foreign and unrelated return destinations rejected.');
