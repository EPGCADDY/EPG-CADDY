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
assert.deepEqual(ids,['shareRoundLiveButton','backToRegistrationButton','finalCardButton','newRoundButton']);
const deletion=app.match(/<div class="round-secondary-actions" id="roundSecondaryActions">([\s\S]*?)<\/div>/)?.[1];
assert.deepEqual([...deletion.matchAll(/id="([^"]+)"/g)].map(match=>match[1]),['clearRoundScores','clearScoresOnly']);
assert.match(app,/\.round-secondary-actions\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);

assert.doesNotMatch(app,/id="(?:myRoundButton|roundTournamentButton|activeTournamentButton|previousRoundButton|openCardLibraryButton)"/);
assert.match(app,/<button id="privateGroupScoresButton"[^>]*>SCORES MI GRUPO<\/button>/);
assert.match(app,/<button id="roundTournamentScoresButton"[^>]*>SCORES TORNEO<\/button>/);
const menu=fs.readFileSync('shortcuts-ui.js','utf8');assert.match(menu,/item\("previous","RONDA PREVIA"/);assert.match(menu,/item\("saved","RONDAS GUARDADAS"/);
console.log('PASS R24 card actions: history in Menu, creation/join removed from card, only correctly named Scores buttons');

// Execute the complete worker lifecycle, including a previous approved cache.
for(const origin of ['https://golf-sc-gt-lab.vercel.app','https://epg-caddy.vercel.app']){
 const stores=new Map(),listeners={},prefix=code.match(/const CACHE_NAME="([^"]+)"/)[1],current=code.match(/const RELEASE_FALLBACK="([^"]+)"/)[1];
 const key=request=>new URL(typeof request==='string'?request:request.url,origin).pathname;
 const open=async name=>{if(!stores.has(name))stores.set(name,new Map());const data=stores.get(name);return {match:async request=>data.get(key(request))?.clone(),put:async(request,response)=>data.set(key(request),response.clone()),keys:async()=>[...data.keys()]}};
 const caches={open,keys:async()=>[...stores.keys()],match:async(request,{cacheName}={})=>{if(cacheName)return (await open(cacheName)).match(request);for(const name of stores.keys()){const response=await(await open(name)).match(request);if(response)return response}},delete:async()=>{throw Error('Approved cache must not be deleted before consent')}};
 const previous=await open(prefix+'-approved-previous');
 await previous.put('/index-grupal.html',new Response('<head><meta name="gscg-release" content="OLD"></head><body>OLD CARD</body>'));
 await previous.put('/live-control.js',new Response('OLD SCRIPT'));
 await open(prefix+'-approved-interrupted-empty'); // An interrupted successor must not hide the last complete card.
 let broken=false,denied=false,authorizationChecks=0,installShellFetches=0,releaseChecks=0;
 const worker=vm.createContext({URL,Response,Headers,Date,AbortController,setTimeout,clearTimeout,caches,fetch:async input=>{const path=key(input);if(path!=='/release.json')installShellFetches++;else releaseChecks++;if(typeof input!=='string'&&new URL(input.url).searchParams.has('personalEvent')){authorizationChecks++;if(denied)return new Response('PERSONAL ACCESS DENIED',{status:403})}if(broken&&path==='/live-control.js')throw Error('offline');if(path==='/release.json')return Response.json({release:current});return new Response(path==='/index-grupal.html'?'<head><meta name="gscg-release" content="'+current+'"></head><body>NEW CARD</body>':'NEW SCRIPT')},self:{location:{origin},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,callback)=>listeners[name]=callback}});
 vm.runInContext(code,worker);
 const lifecycle=async name=>{let pending;listeners[name]({waitUntil:promise=>pending=promise});await pending};
 const navigate=async query=>{let pending;listeners.fetch({request:{url:origin+'/index-grupal.html'+query,method:'GET',mode:'navigate'},respondWith:promise=>pending=promise});return (await pending).text()};
 await lifecycle('install');assert.equal(installShellFetches,0,'A controller update with an approved card must not wait for the whole new shell before it can offer ACTUALIZAR');await lifecycle('activate');assert.equal(releaseChecks,0,'Adopting an old approved card must not wait for a release network request');
 let messageResult,pendingMessage;listeners.message({data:{type:'GET_APPROVED_RELEASE'},ports:[{postMessage:value=>messageResult=value}],waitUntil:promise=>pendingMessage=promise});await pendingMessage;assert.equal(messageResult.release,'OLD','Discovery reports the approved old build, not the new server release');
 let menu;listeners.fetch({request:{url:origin+'/shortcuts-ui.js',method:'GET',mode:'cors'},respondWith:promise=>menu=promise});assert.match(await(await menu).text(),/import\("\/app-update\.js"\)/,'Old navigation menu receives only the independent discovery control');
 let page=await navigate('');assert.match(page,/OLD CARD/);assert.match(page,/gscFallbackUpdateButton/);assert.doesNotMatch(page,/NEW CARD/);
 assert.match(await navigate('?app_version='+current),/OLD CARD/,'Version parameter alone is not consent');
 const personal='?personalEvent=existing&personalAccount=account-a';
 assert.match(await navigate(personal),/OLD CARD/,'Authorized personal navigation must retain the old build before consent');
 assert.equal(authorizationChecks,1,'Personal membership is checked with the server');
 denied=true;assert.equal(await navigate(personal),'PERSONAL ACCESS DENIED','A revoked account must never receive the cached shell');denied=false;

 let asset;listeners.fetch({request:{url:origin+'/live-control.js',method:'GET',mode:'cors'},respondWith:promise=>asset=promise});assert.equal(await(await asset).text(),'OLD SCRIPT');
 broken=true;assert.match(await navigate('?app_version='+current+'&update_check=1&__gscg_build_check=1'),/OLD CARD/,'Failed download preserves approved card');
 assert.match(await navigate(personal+'&app_version='+current+'&update_check=1'),/OLD CARD/,'Failed personal update also retains the approved build');
 broken=false;assert.match(await navigate(personal+'&app_version='+current+'&update_check=2&__gscg_build_check=1'),/NEW CARD/);
 assert.match(await navigate(''),/NEW CARD/,'Accepted version persists after reopening');
 console.log('PASS manual update '+origin+': install/reopen retain old card and scripts; button visible; partial download retains old build; explicit update installs complete build');
}

// Historical source, 70db4e8: prove why an unadopted legacy worker cannot be certified.
{
 const legacy=fs.readFileSync('tests/fixtures/r14723-service-worker-before-manual-consent.js','utf8');
 const stores=new Map(),listeners={},origin='https://golf-sc-gt-lab.vercel.app';
 const key=input=>new URL(typeof input==='string'?input:input.url,origin).pathname;
 const open=async name=>{if(!stores.has(name))stores.set(name,new Map());const data=stores.get(name);return{match:async input=>data.get(key(input))?.clone(),put:async(input,response)=>data.set(key(input),response.clone()),keys:async()=>[...data.keys()]}};
 const caches={open,keys:async()=>[...stores.keys()],delete:async name=>stores.delete(name),match:async(input,{cacheName}={})=>{if(cacheName)return(await open(cacheName)).match(input);for(const name of stores.keys()){const r=await(await open(name)).match(input);if(r)return r}}};
 const prefix=legacy.match(/const CACHE_NAME="([^"]+)"/)[1],release='LEGACY-NEXT';
 await(await open(prefix+'-approved-before')).put('/index-grupal.html',new Response('<head><meta name="gscg-release" content="OLD"></head><body>OLD CARD</body>'));
 const ctx=vm.createContext({URL,Response,Headers,Date,AbortController,setTimeout,clearTimeout,caches,fetch:async input=>key(input)==='/release.json'?Response.json({release}):new Response(key(input)==='/index-grupal.html'?'<head><meta name="gscg-release" content="'+release+'"></head><body>NEW CARD</body>':'SCRIPT'),self:{location:{origin},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,cb)=>listeners[name]=cb}});
 vm.runInContext(legacy,ctx);
 for(const name of ['install','activate']){let pending;listeners[name]({waitUntil:promise=>pending=promise});await pending}
 let response;listeners.fetch({request:{url:origin+'/index-grupal.html',method:'GET',mode:'navigate'},respondWith:promise=>response=promise});
 const page=await(await response).text();assert.match(page,/NEW CARD/);assert.doesNotMatch(page,/OLD CARD/);
 console.log('PASS legacy negative control: 70db4e8 auto-promotes before consent; legacy adoption must remain a separate migration check');
}
