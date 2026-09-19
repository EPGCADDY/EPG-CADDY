import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const source=html.slice(html.indexOf('let pendingOwnerInvitation='),html.indexOf('window.GSCLiveControl?.mount'));
function setup(fail=false){
 let handler,requests=0,shares=0,gesture=false,message='';
 const button={textContent:'INVITAR · 24 H',addEventListener:(t,fn)=>handler=fn};
 const status={replaceChildren(node){message=node},append(){}};
 const ctx={$:id=>id==='ownerShare24h'?button:status,document:{createTextNode:x=>x,createElement:()=>({style:{},setAttribute(){},addEventListener(){}})},Date,console,navigator:{share(){assert(gesture,'Share must be invoked in the click gesture');shares++;return Promise.resolve()}},fetch:async()=>{requests++;gesture=false;return {ok:!fail,status:fail?503:201,json:async()=>fail?{code:'DATABASE_NOT_CONFIGURED'}:{url:'https://lab.example/invite/test',expiresAt:new Date(Date.now()+86400000).toISOString()}}}};
 vm.runInNewContext(source,ctx);
 return {async click(){gesture=true;await handler();gesture=false},get requests(){return requests},get shares(){return shares},get message(){return message},button};
}
const ok=setup();await ok.click();assert.equal(ok.requests,1);assert.equal(ok.shares,0);assert.match(ok.button.textContent,/COMPARTIR/);await ok.click();assert.equal(ok.requests,1);assert.equal(ok.shares,1);
const fail=setup(true);await fail.click();assert.match(fail.message,/FALTA CONFIGURAR/);assert.equal(fail.button.disabled,false);assert.equal(fail.button.textContent,'REINTENTAR INVITACIÓN');
console.log('PASS invitation: server failure stays visible, retry enabled, prepared link shared in fresh gesture without duplicate creation');
