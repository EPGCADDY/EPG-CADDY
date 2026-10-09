import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source=fs.readFileSync('service-worker.js','utf8');
const middleware=fs.readFileSync('middleware.js','utf8').replace(/import \{ next \} from "@vercel\/functions";/,'').replace('export default async function','async function').replace(/export const config=[\s\S]*$/,'');
const origin='https://installed-lab.example';
const release=source.match(/const RELEASE_FALLBACK="([^"]+)"/)[1];
const card='<meta name="gscg-release" content="'+release+'">CURRENT CARD';
const personal={eventId:'qa-closed-event',eventKind:'tournament',accountId:'qa-account'};
const cookie='gsc_personal_context='+encodeURIComponent(JSON.stringify(personal));
const gate=vm.createContext({URL,Response,next:()=>new Response(card),fetch:async()=>Response.json({accountCode:'qa-account',membership:{role:'player',players:[{id:'qa-player'}]},tournament:{status:'closed'}})});
vm.runInContext(middleware,gate);
gate.request=new Request(origin+'/index-grupal.html',{headers:{cookie}});
const redirected=await vm.runInContext('accessGate(request)',gate);
assert.equal(redirected.status,307);
assert.equal(new URL(redirected.headers.get('location')).pathname,'/live-hub.html');

const stores=new Map(),requests=[];
const key=input=>new URL(typeof input==='string'?input:input.url,origin).pathname;
const open=async name=>{if(!stores.has(name))stores.set(name,new Map());const store=stores.get(name);return {match:async input=>store.get(key(input))?.clone(),put:async(input,response)=>store.set(key(input),response.clone()),keys:async()=>[...store.keys()]}};
const fetch=async input=>{
 const url=new URL(typeof input==='string'?input:input.url,origin);requests.push(url);
 if(url.pathname==='/release.json')return Response.json({release});
 if(url.pathname==='/index-grupal.html'){
  gate.request=new Request(url,{headers:{cookie}});
  const response=await vm.runInContext('accessGate(request)',gate);
  return response.status===307?new Response('<html>LIVE HUB, NOT THE CARD</html>'):response;
 }
 return new Response('SHELL RESOURCE');
};
const context=vm.createContext({URL,Response,Headers,Date,AbortController,fetch,caches:{open,keys:async()=>[...stores.keys()],match:async(input,{cacheName}={})=>(await open(cacheName)).match(input)},setTimeout,clearTimeout,self:{location:{origin},addEventListener(){}}});
vm.runInContext(source,context);
assert.equal(await vm.runInContext('refreshShell()',context),true,'A saved closed personal context must not redirect the updater away from its canonical shell');
const entry=requests.find(url=>url.pathname==='/index-grupal.html');
assert.equal(entry.searchParams.get('inicio'),'1');
assert.equal(entry.searchParams.get('__gscg_build_check'),'1');
const active=[...stores].find(([name])=>name.includes('-active-'))[1];
assert.equal(await active.get('/index-grupal.html').text(),card);
assert.equal(personal.accountId,'qa-account');
console.log('PASS update shell: actual middleware redirects stale personal context; dedicated shell fetch bypasses that redirect and stages the current card under the stable cache key. No account or round data altered.');
