import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('auth-gate.js','utf8');
function setup(cookie){
 const nodes=new Map(),requests=[],navigation=[];
 function element(){return{hidden:false,disabled:false,textContent:'',value:'',style:{},classList:{add(){},remove(){}},setAttribute(){},addEventListener(type,fn){this[type]=fn}}}
 const document={cookie,readyState:'complete',getElementById:id=>nodes.get(id),createElement:element,head:{appendChild(el){nodes.set(el.id,el)}},body:{appendChild(el){nodes.set(el.id,el);for(const match of el.innerHTML.matchAll(/id="([^"]+)"/g))nodes.set(match[1],element())}},documentElement:{style:{removeProperty(){}}}};
 const window={dispatchEvent(){}};
 const context={document,window,location:{pathname:'/live-hub.html',search:'',replace:url=>navigation.push(url),assign:url=>navigation.push(url)},URLSearchParams,CustomEvent:class{},fetch:async(url,options)=>{requests.push({url,options});return{ok:true,json:async()=>({ok:true,user:{id:'test-account'}})}}};
 vm.runInNewContext(source,context);return{window,nodes,requests,navigation,document};
}
const guest=setup('gsc_guest_mode=1');
assert.equal(guest.requests.length,0,'guest must not request blocked account session');
guest.window.GSCOpenAccountLogin();
assert.equal(guest.nodes.get('gscAccountChoices').hidden,true);
assert.equal(guest.nodes.get('gscGuestChoices').hidden,false);
await guest.nodes.get('gscAuthSignIn').click();
assert.equal(guest.requests.length,0,'guest credentials must never hit account API');
await guest.nodes.get('gscGuestContinue').click();
assert.deepEqual(guest.navigation,['/index-grupal.html?source=guest24h']);
await guest.nodes.get('gscGuestAccount').click();
assert.equal(guest.requests.length,0,'choosing account must preserve guest grant before login');
assert.equal(guest.nodes.get('gscAccountChoices').hidden,false);
guest.nodes.get('gscAuthEmail').value='fixture@example.com';
guest.nodes.get('gscAuthPassword').value='fixture-passphrase';
await guest.nodes.get('gscAuthSignIn').click();
assert.equal(guest.requests[0].url,'/api/account?action=signin');
assert.equal(guest.requests[0].options.credentials,'include');
assert.deepEqual(guest.navigation,['/index-grupal.html?source=guest24h','/live-hub.html']);
const user=setup('');await new Promise(resolve=>setImmediate(resolve));
user.window.GSCOpenAccountLogin();
assert.equal(user.nodes.get('gscAccountChoices').hidden,false);
assert.equal(user.nodes.get('gscGuestChoices').hidden,true);
assert.equal(user.requests[0].url,'/api/account?action=session');
console.log('PASS guest entry: cookie recognized in portal, no blocked login, preserved invitation until authenticated reload, personal account unchanged.');
