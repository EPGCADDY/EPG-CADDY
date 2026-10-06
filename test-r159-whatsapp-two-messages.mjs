import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
function setup({native=true,cancel=false,fail=false,storage=new Map()}={}){
 const nodes=new Map(),sent=[],navigated=[],copied=[];let completed=0,removed=false;
 const node=key=>{if(!nodes.has(key))nodes.set(key,{value:'',textContent:'',disabled:false,hidden:false,focus(){}});return nodes.get(key)};
 const panel={setAttribute(){},querySelector:node,remove(){removed=true}};
 const context={URL,document:{createElement:()=>panel,body:{appendChild(){}}},location:{origin:'https://golf.example',assign:url=>navigated.push(url)},navigator:{clipboard:{writeText:async value=>copied.push(value)}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}};
 if(native)context.navigator.share=async data=>{sent.push(data);if(cancel)throw Object.assign(Error(),{name:'AbortError'});if(fail)throw Error('unavailable')};
 vm.runInNewContext(fs.readFileSync('whatsapp-invitations.js','utf8'),context);return {context,nodes,node,sent,navigated,copied,get completed(){return completed},get removed(){return removed},open:(options)=>context.GSCWhatsAppInvitations.open(options,()=>completed++ )};
}
for(const kind of ['private','tournament']){
 const s=setup();s.open({kind,eventName:'Family',creatorName:'Jaime Kirste',code:'ABCDEF0123'});
 const messages=s.context.GSCWhatsAppInvitations.messages(kind,kind==='tournament'?'Family':'Jaime Kirste','ABCDEF0123');assert.equal(messages.length,2);assert.match(messages[0],/https:\/\/golf\.example\/index-grupal\.html\?inicio=1/);assert.ok(messages[0].endsWith('\n\nCÓDIGO DE INGRESO\nABCDEF0123'));assert.equal(s.node('[data-send-code]').hidden,false);assert.equal(s.node('[data-copy-code]').hidden,false);assert.equal(messages[1],'ABCDEF0123');
 await s.node('[data-send-invitation]').onclick();assert.equal(s.sent.length,1);assert.equal(s.sent[0].text,messages[0]);assert.equal(s.node('[data-send-code]').hidden,false);
 await s.node('[data-send-code]').onclick();assert.equal(s.sent.length,2);assert.equal(s.sent[1].text,'ABCDEF0123');
 await s.node('[data-copy-code]').onclick();assert.deepEqual(s.copied,['ABCDEF0123']);assert.match(s.node('[data-whatsapp-status]').textContent,/ABCDEF0123/);
 s.node('[data-finish-whatsapp]').onclick();assert.equal(s.completed,1);
}
for(const options of [{cancel:true},{fail:true}]){const s=setup(options);s.open({kind:'private',creatorName:'QA',code:'CODE123'});await s.node('[data-send-invitation]').onclick();assert.equal(s.removed,false);assert.equal(s.node('[data-send-invitation]').disabled,false);assert.match(s.node('[data-whatsapp-status]').textContent,/CANCELADO|NO SE PUDO/)}
const blank=setup();blank.open({kind:'private',code:'CODE123'});await blank.node('[data-send-invitation]').onclick();assert.equal(blank.sent.length,0);
const fallback=setup({native:false});fallback.open({kind:'private',creatorName:'QA',code:'CODE123'});await fallback.node('[data-send-invitation]').onclick();assert.match(new URL(fallback.navigated[0]).searchParams.get('text'),/MI GRUPO/);assert.ok(new URL(fallback.navigated[0]).searchParams.get('text').endsWith('\nCODE123'));await fallback.node('[data-send-code]').onclick();assert.equal(new URL(fallback.navigated[1]).searchParams.get('text'),'CODE123');
const old=new Map([['gsc-whatsapp-code-pending-v1','old']]);assert.equal(setup({storage:old}).context.GSCWhatsAppInvitations.resume(),false);assert.equal(old.size,0);
console.log('PASS R173 WhatsApp: first invitation contains URL and code; optional code-only share and copy are available immediately; tournament and group; cancellation, failure, blank creator, fallback and resume.');

const deployedIndex=fs.readFileSync('index-grupal.html','utf8');
const handlerMarker='$("copyCreatorTournamentCode").onclick=()=>{';
const handlerStart=deployedIndex.indexOf(handlerMarker),handlerEnd=deployedIndex.indexOf('};',handlerStart)+2;
assert.ok(handlerStart>=0&&handlerEnd>handlerStart,'Group ID share handler exists');
const deployedGroupHandler=deployedIndex.slice(handlerStart,handlerEnd);
assert.match(deployedGroupHandler,/window\.location\.assign\(link\)/,'WhatsApp must stay in the current browsing context');
assert.doesNotMatch(deployedGroupHandler,/window\.open\s*\(/,'Group sharing must not create a blank tab');
const groupNodes=new Map([['copyCreatorTournamentCode',{textContent:'W2RE4FG8GH',onclick:null}],['creatorTournamentCodeStatus',{textContent:''}]]);
const groupCopied=[],groupNavigated=[],groupOpened=[];
const groupContext={
  $:id=>groupNodes.get(id),
  navigator:{clipboard:{writeText:async code=>groupCopied.push(code)}},
  window:{location:{assign:url=>groupNavigated.push(url)},open:(...args)=>groupOpened.push(args)},
  owned:{name:'FRIENDS',joinCode:'W2RE4FG8GH'},
  selection:{label:'FRIENDS'},
  encodeURIComponent
};
vm.runInNewContext(deployedGroupHandler,groupContext);
groupNodes.get('copyCreatorTournamentCode').onclick();
await Promise.resolve();
assert.deepEqual(groupCopied,['W2RE4FG8GH']);
assert.equal(new URL(groupNavigated[0]).origin,'https://wa.me');
assert.equal(new URL(groupNavigated[0]).searchParams.get('text'),'Grupo FRIENDS\\nCódigo: W2RE4FG8GH');
assert.deepEqual(groupOpened,[]);
assert.equal(groupNodes.get('creatorTournamentCodeStatus').textContent,'CÓDIGO COPIADO · COMPARTIR EN WHATSAPP');
