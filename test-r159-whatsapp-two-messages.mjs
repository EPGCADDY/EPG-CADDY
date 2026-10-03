import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
function setup({native=true,cancel=false,fail=false,storage=new Map()}={}){
 const nodes=new Map(),sent=[],navigated=[];let completed=0,removed=false,pending;
 const node=key=>{if(!nodes.has(key))nodes.set(key,{value:'',textContent:'',disabled:false,focus(){}});return nodes.get(key)};
 const panel={setAttribute(){},querySelector:node,remove(){removed=true}};
 const context={URL,document:{createElement:()=>panel,body:{appendChild(){}}},location:{origin:'https://golf.example',assign:url=>navigated.push(url)},navigator:{},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}};
 if(native)context.navigator.share=async data=>{sent.push(data);if(cancel)throw Object.assign(Error(),{name:'AbortError'});if(fail)throw Error('unavailable');if(pending)await pending};
 vm.runInNewContext(fs.readFileSync('whatsapp-invitations.js','utf8'),context);return {context,nodes,node,sent,navigated,get completed(){return completed},get removed(){return removed},open:(options)=>context.GSCWhatsAppInvitations.open(options,()=>completed++),setPending:value=>pending=value};
}
for(const kind of ['private','tournament']){
 const s=setup();s.open({kind,eventName:'Family',creatorName:'Jaime Kirste',code:'ABCDEF0123456789ABCD'});
 assert.doesNotMatch(s.context.document.createElement().innerHTML,/data-send-code|SON DOS/);
 await s.node('[data-send-invitation]').onclick();assert.equal(s.sent.length,1);
 assert.deepEqual(Object.keys(s.sent[0]),['text']);assert.equal(s.sent[0].text,'GOLF SCORE CARD GT\nTe ha invitado a participar en '+(kind==='tournament'?'el torneo Family':'el grupo de Jaime Kirste')+'.\nCopia y pega el código en la pantalla inicial de registro.\nhttps://golf.example/index-grupal.html?inicio=1\n\nMODALIDAD\n'+(kind==='tournament'?'TORNEO':'MI GRUPO')+'\nCódigo\n\n\nABCDEF0123456789ABCD');
 assert.equal(s.removed,false);s.node('[data-finish-whatsapp]').onclick();assert.equal(s.completed,1);
}
for(const options of [{cancel:true},{fail:true}]){const s=setup(options);s.open({kind:'private',creatorName:'QA',code:'CODE123'});await s.node('[data-send-invitation]').onclick();assert.equal(s.removed,false);assert.equal(s.node('[data-send-invitation]').disabled,false);assert.match(s.node('[data-whatsapp-status]').textContent,/CANCELADO|NO SE PUDO/)}
const blank=setup();blank.open({kind:'private',code:'CODE123'});await blank.node('[data-send-invitation]').onclick();assert.equal(blank.sent.length,0);
const fallback=setup({native:false});fallback.open({kind:'private',creatorName:'QA',code:'CODE123'});await fallback.node('[data-send-invitation]').onclick();assert.equal(fallback.navigated.length,1);assert.equal(new URL(fallback.navigated[0]).searchParams.get('text'),'GOLF SCORE CARD GT\nTe ha invitado a participar en el grupo de QA.\nCopia y pega el código en la pantalla inicial de registro.\nhttps://golf.example/index-grupal.html?inicio=1\n\nMODALIDAD\nMI GRUPO\nCódigo\n\n\nCODE123');
const double=setup();double.open({kind:'private',creatorName:'QA',code:'CODE123'});let done;double.setPending(new Promise(resolve=>done=resolve));const first=double.node('[data-send-invitation]').onclick();await double.node('[data-send-invitation]').onclick();assert.equal(double.sent.length,1);done();await first;
const old=new Map([['gsc-whatsapp-code-pending-v1','old']]);assert.equal(setup({storage:old}).context.GSCWhatsAppInvitations.resume(),false);assert.equal(old.size,0);
console.log('PASS R161 single message: invitation, two blank lines, exact final code; one share; native/fallback; cancellation, error, double tap, missing name; retires old pending stage; no delivery claims.');
