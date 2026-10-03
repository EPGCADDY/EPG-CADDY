import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
function setup({native=true,cancel=false,fail=false}={}){
 const nodes=new Map(),sent=[],navigated=[];let completed=0,removed=false,pending;
 const node=key=>{if(!nodes.has(key))nodes.set(key,{value:'',textContent:'',disabled:false,focus(){}});return nodes.get(key)};
 const panel={setAttribute(){},querySelector:node,remove(){removed=true}};
 const context={document:{createElement:()=>panel,body:{appendChild(){}}},location:{assign:url=>navigated.push(url)},navigator:{}};
 if(native)context.navigator.share=async data=>{sent.push(data);if(cancel)throw Object.assign(Error(),{name:'AbortError'});if(fail)throw Error('unavailable');if(pending)await pending};
 vm.runInNewContext(fs.readFileSync('whatsapp-invitations.js','utf8'),context);return {context,nodes,node,sent,navigated,get completed(){return completed},get removed(){return removed},open:(options)=>context.GSCWhatsAppInvitations.open(options,()=>completed++),setPending:value=>pending=value};
}
for(const kind of ['private','tournament']){
 const s=setup();s.open({kind,creatorName:'Jaime Kirste',code:'ABCDEF0123456789ABCD'});
 await s.node('[data-send-code]').onclick();assert.equal(s.sent.length,0,'Second send is locked before first');
 await s.node('[data-send-invitation]').onclick();assert.equal(s.sent.length,1);assert.match(s.sent[0].text,/Jaime Kirste/);assert.doesNotMatch(s.sent[0].text,/ABCDEF|http/);assert.equal(s.removed,false);assert.equal(s.node('[data-send-code]').disabled,false);
 await s.node('[data-send-code]').onclick();assert.equal(s.sent[1].text,'ABCDEF0123456789ABCD');assert.deepEqual(Object.keys(s.sent[1]),['text']);
 s.node('#whatsappCreator').value='Jessie';s.node('#whatsappCreator').oninput();assert.equal(s.node('[data-send-code]').disabled,true,'Editing first message requires sharing it again');
 s.node('[data-finish-whatsapp]').onclick();assert.equal(s.completed,1);assert.equal(s.removed,true);
}
for(const options of [{cancel:true},{fail:true}]){
 const s=setup(options);s.open({kind:'private',creatorName:'QA',code:'1234567890'});await s.node('[data-send-invitation]').onclick();assert.equal(s.node('[data-send-code]').disabled,true);assert.equal(s.removed,false);assert.equal(s.node('[data-send-invitation]').disabled,false);assert.match(s.node('[data-whatsapp-status]').textContent,/CANCELADO|NO SE PUDO/);
}
const blank=setup();blank.open({kind:'private',code:'1234567890'});await blank.node('[data-send-invitation]').onclick();assert.equal(blank.sent.length,0);assert.match(blank.node('[data-whatsapp-status]').textContent,/NOMBRE DEL CREADOR/);
const fallback=setup({native:false});fallback.open({kind:'private',creatorName:'QA',code:'ABCDEF0123456789ABCD'});await fallback.node('[data-send-invitation]').onclick();await fallback.node('[data-send-code]').onclick();assert.equal(new URL(fallback.navigated[1]).searchParams.get('text'),'ABCDEF0123456789ABCD');assert.equal(fallback.completed,0,'Opening WhatsApp never claims delivery or closes source');
const double=setup();double.open({kind:'private',creatorName:'QA',code:'1234567890'});let done;double.setPending(new Promise(resolve=>done=resolve));const first=double.node('[data-send-invitation]').onclick();await double.node('[data-send-invitation]').onclick();assert.equal(double.sent.length,1);done();await first;
console.log('PASS R159 two WhatsApp messages: full code only; sender name; stage order; cancellation; error; double tap; missing creator; fallback; no automatic send or delivery claims.');
