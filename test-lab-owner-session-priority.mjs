import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import handler from './api/app-access.js';
const priorFetch=globalThis.fetch,priorEmail=process.env.EPG_OWNER_EMAIL,priorId=process.env.EPG_OWNER_USER_ID;
const req={method:'GET',query:{action:'status'},headers:{host:'golf-sc-gt-lab.vercel.app',cookie:'gsc_guest_mode=1'}};
const response=()=>({headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.statusCode=n;return this},json(v){this.body=v;return this}});
try{
 process.env.EPG_OWNER_EMAIL='owner-fixture@example.com';delete process.env.EPG_OWNER_USER_ID;
 globalThis.fetch=async()=>new Response(JSON.stringify({user:{id:'owner-fixture',email:'owner-fixture@example.com'}}));
 let res=response();await handler(req,res);assert.equal(res.statusCode,200);assert.equal(res.body.role,'owner');assert(res.headers['Set-Cookie'].some(c=>c.startsWith('gsc_guest_mode=;')&&c.includes('Max-Age=0')));
 globalThis.fetch=async()=>new Response(JSON.stringify({user:{id:'other-fixture',email:'other-fixture@example.com'}}));
 res=response();await handler(req,res);assert.equal(res.statusCode,401);assert.equal(res.headers['Set-Cookie'],undefined);
 globalThis.fetch=async()=>{throw Error('fixture unavailable')};res=response();await handler(req,res);assert.equal(res.statusCode,401);assert.equal(res.headers['Set-Cookie'],undefined);
}finally{globalThis.fetch=priorFetch;if(priorEmail===undefined)delete process.env.EPG_OWNER_EMAIL;else process.env.EPG_OWNER_EMAIL=priorEmail;if(priorId===undefined)delete process.env.EPG_OWNER_USER_ID;else process.env.EPG_OWNER_USER_ID=priorId}
const source=fs.readFileSync('auth-gate.js','utf8'),init=source.slice(source.indexOf('async function init(){'),source.indexOf('if(document.readyState==='));
for(const search of ['', '?inicio=1', '?source=guest24h']){
 const navigation=[],requests=[],document={cookie:'gsc_guest_mode=1'},ctx={document,window:{},URLSearchParams,location:{pathname:'/index-grupal.html',search,replace:url=>navigation.push(url)},isGuest:()=>true,show(){},fetch:async url=>{requests.push(url);return{ok:true,json:async()=>({ok:true})}}};
 await vm.runInNewContext(init+'init()',ctx);
 assert.deepEqual(navigation,[],'Public app entry must never redirect to an owner login');
 assert.deepEqual(requests,[],'Public app entry must not request owner status or account session');
}
console.log('PASS owner status handler remains available for privileged API actions; ordinary app entry never checks owner credentials or redirects.');
