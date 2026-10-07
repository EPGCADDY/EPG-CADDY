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
 const eventId=kind==='tournament'?'11111111-1111-4111-8111-111111111111':undefined,s=setup();s.open({kind,eventName:'Family',creatorName:'Jaime Kirste',code:'ABCDEF0123',eventId});
 const messages=s.cont¶»§q«^