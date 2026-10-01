import assert from 'node:assert/strict';
import accessGate from './middleware.js';
const prior=globalThis.fetch;let calls=0;globalThis.fetch=async()=>{calls++;return new Response(JSON.stringify({ok:false,code:'ACCESS_REQUIRED'}),{status:401})};
try{
 for(const path of ['/index-grupal.html','/live-hub.html','/live-hub.js','/live-share.js','/scores-ui.js','/scores-ui.css','/gsc-design-system.css']){
  const result=await accessGate(new Request('https://lab.example'+path));assert.equal(result.headers.get('x-middleware-next'),'1',path+' opens without an app login');
 }
 assert.equal(calls,0,'public app entry must not call app-access status');
 const context=encodeURIComponent(JSON.stringify({eventId:'saved-event',eventKind:'tournament',accountId:'device:test'}));
 globalThis.fetch=async()=>{calls++;return Response.json({ok:true,accountCode:'device:test',membership:{role:'viewer',players:[]},tournament:{status:'active'}})};
 const home=await accessGate(new Request('https://lab.example/index-grupal.html?inicio=1',{headers:{cookie:'gsc_personal_context='+context}}));
 assert.equal(home.headers.get('x-middleware-next'),'1','Explicit Inicio must not reopen a previously viewed tournament');
 const installed=await accessGate(new Request('https://lab.example/index-grupal.html?source=pwa',{headers:{cookie:'gsc_personal_context='+context}}));assert.equal(installed.headers.get('x-middleware-next'),'1','Installed launch must not reopen the previous Scores monitor');
 const restored=await accessGate(new Request('https://lab.example/index-grupal.html',{headers:{cookie:'gsc_personal_context='+context}}));
 assert.match(restored.headers.get('location'),/live-hub\.html\?personalEvent=saved-event/,'Implicit personal return keeps its authorized event');
 globalThis.fetch=async()=>new Response(JSON.stringify({ok:false,code:'ACCESS_REQUIRED'}),{status:401});
 const api=await accessGate(new Request('https://lab.example/api/live-share',{method:'POST'}));assert.equal(api.headers.get('x-middleware-next'),'1');
 const sync=await accessGate(new Request('https://lab.example/api/sync',{method:'POST'}));assert.equal(sync.status,401,'protected sync API remains behind its own account/event checks');
 console.log('PASS middleware: Registration and Scores open without owner sign-in; private APIs remain protected');
}finally{globalThis.fetch=prior}
