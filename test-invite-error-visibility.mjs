import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import handler from './api/app-access.js';
const html=readFileSync(process.argv[2]||'index-grupal.html','utf8');
const start=html.indexOf('$("ownerShare24h")?.addEventListener("click",async()=>{');
const end=html.indexOf('window.GSCLiveControl?.mount',start);
assert.ok(start>0&&end>start);
const block=html.slice(start,end);
async function run(code,{shareError=false}={}){
 let click,requests=0,shares=0;
 const button={textContent:'INVITAR · 24 H',disabled:false,addEventListener(_event,fn){click=fn}};
 const status={textContent:'',classList:{remove(){},add(){}}};
 const timers=[];
 vm.runInNewContext(block,{$:id=>id==='ownerShare24h'?button:status,
 fetch:async()=>{requests++;return {ok:!code,json:async()=>code?{code}:{url:'https://example.test/invite/simulated'}}},
 navigator:{share:async()=>{shares++;if(shareError)throw Object.assign(new Error('secret'),{name:'NotAllowedError'})}},
 setTimeout:fn=>timers.push(fn),console});
 await click();for(const fn of timers)fn();
 assert.equal(button.disabled,false);
 return {button,status,requests,shares};
}
const missing=await run('DATABASE_NOT_CONFIGURED');
assert.match(missing.status.textContent,/INVITACIONES NO CONFIGURADAS/,'HTTP error must remain visible after timers');
assert.equal(missing.shares,0);
for(const code of ['ACCOUNT_UNAUTHORIZED','OWNER_REQUIRED','UNKNOWN_PRIVATE_DETAIL']){
 const result=await run(code);assert.ok(result.status.textContent);assert.equal(result.shares,0);
 assert.ok(!result.status.textContent.includes('UNKNOWN_PRIVATE_DETAIL'));
}
const share=await run(null,{shareError:true});assert.match(share.status.textContent,/CREADA.*COMPARTIR/);
const success=await run(null);assert.equal(success.shares,1);assert.equal(success.status.textContent,'');
console.log('PASS client: server failure remains visible; creation and share errors distinguished; safe messages; button usable. DOM/network/share simulated.');
const saved={fetch:globalThis.fetch,db:process.env.DATABASE_URL,email:process.env.EPG_OWNER_EMAIL};
const warnings=[];const warn=console.warn;
delete process.env.DATABASE_URL;process.env.EPG_OWNER_EMAIL='owner@example.test';
globalThis.fetch=async()=>({ok:true,json:async()=>({user:{id:'simulated-owner',email:'owner@example.test'}})});
console.warn=(...args)=>warnings.push(args);
try{
 const res={setHeader(){},status(code){this.statusCode=code;return this},json(body){this.body=body;return this}};
 await handler({method:'POST',query:{action:'create'},headers:{host:'example.test',origin:'https://example.test'}},res);
 assert.equal(res.statusCode,503);assert.equal(res.body.code,'DATABASE_NOT_CONFIGURED');
 assert.ok(JSON.stringify(warnings).includes('DATABASE_NOT_CONFIGURED'));
 assert.ok(!JSON.stringify(warnings).includes('owner@example.test'));
 console.log('PASS actual API handler: missing database is 503 with safe diagnostic; simulated owner; zero database access.');
}finally{
 globalThis.fetch=saved.fetch;console.warn=warn;
 for(const [name,value] of [['DATABASE_URL',saved.db],['EPG_OWNER_EMAIL',saved.email]])if(value===undefined)delete process.env[name];else process.env[name]=value;
}
