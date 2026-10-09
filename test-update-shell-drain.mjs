import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('service-worker.js','utf8');
const release=source.match(/const RELEASE_FALLBACK="([^"]+)"/)[1];
const stores=new Map(),listeners={},queue=[];
let active=0,peak=0,drained=0,claimed=false;
const key=input=>new URL(typeof input==='string'?input:input.url,'https://update-test.example').pathname;
const open=async name=>{if(!stores.has(name))stores.set(name,new Map());const data=stores.get(name);return{match:async input=>data.get(key(input))?.clone(),put:async(input,response)=>data.set(key(input),response.clone()),keys:async()=>[...data.keys()]}};
const caches={open,keys:async()=>[...stores.keys()],match:async(input,{cacheName}={})=>(await open(cacheName)).match(input)};
const fetch=async input=>{
 const path=key(input);
 if(path==='/release.json')return Response.json({release});
 if(active>=6)await new Promise(resolve=>queue.push(resolve));
 active++;peak=Math.max(peak,active);
 const response=new Response(path==='/index-grupal.html'?'<meta name="gscg-release" content="'+release+'">COMPLETE CARD':'SHELL ASSET');
 const consume=response.arrayBuffer.bind(response);
 response.arrayBuffer=async()=>{try{return await consume()}finally{drained++;active--;queue.shift()?.()}};
 return response;
};
const context=vm.createContext({URL,Response,Headers,Date,AbortController,caches,fetch,setTimeout:(callback,ms)=>{const timer=setTimeout(callback,ms);timer.unref();return timer},clearTimeout,self:{location:{origin:'https://update-test.example'},clients:{claim:async()=>claimed=true},skipWaiting:async()=>{},addEventListener:(name,callback)=>listeners[name]=callback}});
vm.runInContext(source,context);
async function lifecycle(name){let pending;listeners[name]({waitUntil:value=>pending=value});let timeout;try{await Promise.race([pending,new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('SHELL DEADLOCK: six unread responses exhausted the connection pool')),1000)})])}finally{clearTimeout(timeout)}}
await lifecycle('install');await lifecycle('activate');
assert.equal(active,0);assert.ok(drained>40);assert.ok(peak<=6);assert.equal(claimed,true);
const approved=[...stores].find(([name])=>name.includes('-approved-'))?.[1];
assert.match(await approved.get('/index-grupal.html').text(),/COMPLETE CARD/);
assert.ok(approved.has('/round-navigation.js'));
console.log('PASS shell download: six-connection pool drains every response before staging; complete cold install activates without deadlock');
