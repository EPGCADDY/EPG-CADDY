import assert from 'node:assert/strict';
import handler from './api/account.js';
import middleware from './middleware.js';
const originalFetch=globalThis.fetch;
const cookie='gsc_guest_mode=1; gscg_app_access=fixture';
const host='golf-sc-gt-lab.vercel.app';
function res(){return{headers:{},setHeader(k,v){this.headers[k]=v},status(s){this.statusCode=s;return this},json(v){this.body=v;return this}}}
const req={method:'POST',query:{action:'signin'},headers:{host,origin:'https://'+host,cookie},body:{email:'fixture@example.com',password:'fixture-password'}};
try{
 const blocked=await middleware(new Request('https://'+host+'/api/account?action=session',{headers:{cookie}}));
 assert.equal(blocked.status,403);
 const allowed=await middleware(new Request('https://'+host+'/api/account?action=signin',{method:'POST',headers:{cookie}}));
 assert.equal(allowed.headers.get('x-middleware-next'),'1');
 globalThis.fetch=async()=>new Response(JSON.stringify({code:'INVALID_EMAIL_OR_PASSWORD'}),{status:401,headers:{'content-type':'application/json'}});
 let response=res();await handler(req,response);assert.equal(response.statusCode,401);assert.equal(response.headers['Set-Cookie'],undefined,'failure must retain invitation');
 globalThis.fetch=async()=>{throw Error('fixture outage')};response=res();await handler(req,response);assert.equal(response.statusCode,503);assert.equal(response.headers['Set-Cookie'],undefined);
 globalThis.fetch=async()=>new Response(JSON.stringify({user:{id:'fixture-account'},session:{userId:'fixture-account'}}),{headers:{'content-type':'application/json','set-cookie':'session=fixture; Domain=auth.example; Path=/; HttpOnly; Secure'}});
 response=res();await handler(req,response);assert.equal(response.statusCode,200);
 const cookies=response.headers['Set-Cookie'];assert(cookies.some(c=>c.startsWith('session=fixture;')));assert(cookies.some(c=>c.startsWith('gsc_guest_mode=;')&&c.includes('Max-Age=0')));assert(cookies.some(c=>c.startsWith('gscg_app_access=;')&&c.includes('Max-Age=0')));
 globalThis.fetch=async()=>new Response('{}',{headers:{'content-type':'application/json'}});response=res();await handler(req,response);assert.equal(response.statusCode,503);assert.equal(response.body.code,'ACCOUNT_AUTH_UNAVAILABLE');
}finally{globalThis.fetch=originalFetch}
console.log('PASS real guest login handlers: GET account forbidden, explicit sign-in allowed, invalid/outage retains invitation, valid account clears guest only after authentication.');
