import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const code=fs.readFileSync('service-worker.js','utf8');
const start=code.indexOf('async function approvedNavigationWithManualUpdate('),end=code.indexOf('self.addEventListener("fetch"',start);
let html='';const ctx={Response,Headers,RELEASE:'R49',OFFLINE_ENTRY:'/index-grupal.html',APPROVED_CACHE_NAME:'approved',caches:{match:async()=>new Response(html)},fetchPublishedRelease:async()=>{},networkFirst(){throw Error('unexpected network')}};
vm.createContext(ctx);vm.runInContext(code.slice(start,end),ctx);
html='<head><meta name="gscg-release" content="R43"></head><body><button id="mandatoryUpdateButton">ACTUALIZAR</button></body>';
let out=await (await ctx.approvedNavigationWithManualUpdate({})).text();assert.match(out,/bottom:calc\(env\(safe-area-inset-bottom/);assert.match(out,/z-index:2147483647/);assert.match(out,/mandatoryUpdateButton/);
html='<head><meta name="gscg-release" content="R49"></head><body>current</body>';
out=await (await ctx.approvedNavigationWithManualUpdate({})).text();assert.equal(out,html,'Current release must retain approved button geometry');
html='<head><meta name="gscg-release" content="LABORATORIO-20260928-R129"></head><body><button id="mandatoryUpdateButton">ACTUALIZAR</button></body>';
ctx.RELEASE='LABORATORIO-20260929-R139';
out=await (await ctx.approvedNavigationWithManualUpdate({})).text();
const rescue=out.match(/<script id="gsc-fallback-update-script">([\s\S]*?)<\/script>/)?.[1];
assert.ok(rescue,'Injected rescue script must have a valid closing script tag');
const button={disabled:false,textContent:''};let next='';
vm.runInNewContext(rescue,{document:{getElementById:()=>button},URL,Date,location:{href:'https://golf-sc-gt-lab.vercel.app/index-grupal.html',replace:value=>next=value}});
button.onclick();const url=new URL(next);
assert.equal(url.searchParams.get('app_version'),ctx.RELEASE);
assert.equal(url.searchParams.get('__gscg_build_check'),'1');
assert.ok(url.searchParams.has('update_check'));
assert.doesNotMatch(rescue,/R129/,'Rescue must never target the old release');
assert.match(code,/searchParams\.has\("__gscg_build_check"\)[^\n]*cache:"no-store"/);
const app=fs.readFileSync('index-grupal.html','utf8');
const actions=app.match(/<div class="round-actions">([\s\S]*?)<\/div>/)?.[1];
const ids=[...actions.matchAll(/id="([^"]+)"/g)].map(match=>match[1]);
assert.deepEqual(ids,['shareRoundLiveButton','backToRegistrationButton','finalCardButton','previousRoundButton','openCardLibraryButton','newRoundButton']);
const deletion=app.match(/<div class="round-secondary-actions" id="roundSecondaryActions">([\s\S]*?)<\/div>/)?.[1];
assert.deepEqual([...deletion.matchAll(/id="([^"]+)"/g)].map(match=>match[1]),['clearRoundScores','clearScoresOnly']);
assert.match(app,/\.round-secondary-actions\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);

assert.match(app,/\$\("myRoundButton"\)\.addEventListener\("click",[\s\S]*?window\.GSCPrivateRounds\.open\(round\)/);
assert.match(app,/<div class="round-actions"><button id="myRoundButton"[^>]*>RONDA PARTICULAR<\/button><button id="privateGroupScoresButton"[^>]*>SCORES GRUPO<\/button><\/div>/);
assert.match(app,/\$\("privateGroupScoresButton"\)\.addEventListener\("click",\(\)=>window\.GSCPrivateRounds\.openScores\(round\)/);
console.log('PASS R143: update recovery and requested round button placement');
assert.match(app,/<div class="round-actions"><button id="roundTournamentButton"[^>]*>TORNEO<\/button><button id="roundTournamentScoresButton"[^>]*>SCORES TORNEO<\/button><\/div>/);
const navigation=app.slice(app.indexOf('function openRoundTournament('),app.indexOf('$("roundTournamentButton").addEventListener'));
for(const search of ['', '?personalEvent=event-123&personalKind=tournament', '?personalEvent=private-123&personalKind=private']){
 let persisted=0,destination='';const context={URL,location:{origin:'https://golf-sc-gt-lab.vercel.app',href:'https://golf-sc-gt-lab.vercel.app/index-grupal.html'+search,assign:url=>destination=url},persist:()=>persisted++};vm.runInNewContext(navigation,context);context.openRoundTournament(true);const target=new URL(destination);assert.equal(persisted,1);assert.equal(target.pathname,'/live-hub.html');assert.equal(target.searchParams.get('shortcut'),'scores');assert.equal(target.searchParams.get('personalEvent'),search.includes('personalKind=tournament')?'event-123':null);
 context.openRoundTournament();assert.equal(new URL(destination).searchParams.get('shortcut'),null);
}
console.log('PASS bottom TORNEO / SCORES TORNEO: round persisted before navigation; tournament membership retained; private event never selected as tournament');

// Execute the complete worker lifecycle, including a previous approved cache.
for(const origin of ['https://golf-sc-gt-lab.vercel.app','https://epg-caddy.vercel.app']){
 const stores=new Map(),listeners={},prefix=code.match(/const CACHE_NAME="([^"]+)"/)[1],current=code.match(/const RELEASE_FALLBACK="([^"]+)"/)[1];
 const key=request=>new URL(typeof request==='string'?request:request.url,origin).pathname;
 const open=async name=>{if(!stores.has(name))stores.set(name,new Map());const data=stores.get(name);return {match:async request=>data.get(key(request))?.clone(),put:async(request,response)=>data.set(key(request),response.clone()),keys:async()=>[...data.keys()]}};
 const caches={open,keys:async()=>[...stores.keys()],match:async(request,{cacheName}={})=>{if(cacheName)return (await open(cacheName)).match(request);for(const name of stores.keys()){const response=await(await open(name)).match(request);if(response)return response}},delete:async()=>{throw Error('Approved cache must not be deleted before consent')}};
 const previous=await open(prefix+'-approved-previous');
 await previous.put('/index-grupal.html',new Response('<head><meta name="gscg-release" content="OLD"></head><body>OLD CARD</body>'));
 await previous.put('/live-control.js',new Response('OLD SCRIPT'));
 let broken=false;
 const worker=vm.createContext({URL,Response,Headers,Date,caches,fetch:async input=>{const path=key(input);if(broken&&path==='/live-control.js')throw Error('offline');if(path==='/release.json')return Response.json({release:current});return new Response(path==='/index-grupal.html'?'<head><meta name="gscg-release" content="'+current+'"></head><body>NEW CARD</body>':'NEW SCRIPT')},self:{location:{origin},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,callback)=>listeners[name]=callback}});
 vm.runInContext(code,worker);
 const lifecycle=async name=>{let pending;listeners[name]({waitUntil:promise=>pending=promise});await pending};
 const navigate=async query=>{let pending;listeners.fetch({request:{url:origin+'/index-grupal.html'+query,method:'GET',mode:'navigate'},respondWith:promise=>pending=promise});return (await pending).text()};
 await lifecycle('install');await lifecycle('activate');
 let page=await navigate('');assert.match(page,/OLD CARD/);assert.match(page,/gscFallbackUpdateButton/);assert.doesNotMatch(page,/NEW CARD/);
 assert.match(await navigate('?app_version='+current),/OLD CARD/,'Version parameter alone is not consent');
 let asset;listeners.fetch({request:{url:origin+'/live-control.js',method:'GET',mode:'cors'},respondWith:promise=>asset=promise});assert.equal(await(await asset).text(),'OLD SCRIPT');
 broken=true;assert.match(await navigate('?app_version='+current+'&update_check=1&__gscg_build_check=1'),/OLD CARD/,'Failed download preserves approved card');
 broken=false;assert.match(await navigate('?app_version='+current+'&update_check=2&__gscg_build_check=1'),/NEW CARD/);
 assert.match(await navigate(''),/NEW CARD/,'Accepted version persists after reopening');
 console.log('PASS manual update '+origin+': install/reopen retain old card and scripts; button visible; partial download retains old build; explicit update installs complete build');
}
