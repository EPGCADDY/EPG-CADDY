import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('personal-events.js','utf8');
const eventId='11111111-1111-4111-8111-111111111111';
function setup({cancel=false}={}){
 const calls=[],stored=new Map(),assigned=[];
 const selectors=new Map();
 const make=(selector,values={})=>{if(!selectors.has(selector))selectors.set(selector,{value:'',textContent:'',disabled:false,isConnected:true,focus(){},...values});return selectors.get(selector)};
 let mounted=false;
 const panel={innerHTML:'',setAttribute(){},remove(){this.removed=true;mounted=false},querySelector(selector){return make(selector)},querySelectorAll(){return[]}};
 make('[data-close]');make('#personalRoundName',{value:'Ronda de prueba'});make('#personalRoundCourse',{value:'El Pulté'});make('#personalRoundDate',{value:'2026-09-30'});
 make('h3');make('section',{insertAdjacentHTML(_where,html){panel.innerHTML+=html}});make('[data-status]');make('[data-private-round-code]');make('[data-share-private-round]');make('[data-continue-private-round]');
 let activePanel=panel;
 const document={body:{appendChild(){mounted=true}},getElementById:id=>id==='gscPersonalDialog'&&mounted?activePanel:null,createElement:()=>panel,addEventListener(){},removeEventListener(){},visibilityState:'visible'};
 const share=async payload=>{calls.push({type:'share',payload});if(cancel)throw Object.assign(new Error('dismissed'),{name:'AbortError'})};
 const location={origin:'https://golf.example',assign:url=>assigned.push(url)};
 const context={document,URL,Intl,Date,Map,Set,Array,JSON,String,Number,Math,Promise,encodeURIComponent,location,navigator:{share},localStorage:{getItem:key=>stored.get(key)||null,setItem:(key,value)=>stored.set(key,value)},fetch:async(_url,options)=>{const body=JSON.parse(options.body);calls.push({type:'request',body});const response=body.action==='create'?{ok:true,eventId,eventKind:'private',name:'Ronda de prueba',joinCode:'ABCD234567',viewerToken:'V'.repeat(43),expiresAt:'2026-10-08'}:body.action==='list'?{ok:true,events:[],accountCode:'acct'}:{ok:true,accountCode:'acct',membership:{players:[{id:'p1',name:'Jugador'}]},tournament:{status:'active',name:'Ronda de prueba',configuration:{mode:'general',playedAt:'2026-09-30'}}};return{ok:true,status:200,json:async()=>response}},GSCLiveControl:{buildLiveSnapshot:()=>({players:[{id:'p1',name:'Jugador'}],groupLabel:'GRUPO'})},GSCOpenAccountLogin(){},GSCPrivateRounds:{openScores(){}},addEventListener(){}};
 context.window=context;
 vm.runInNewContext(source,context);
 context.GSCPersonalEvents.createPrivate({configured:true,registrationDraft:true,course:'El Pulté',mode:'general',players:[{id:'p1',name:'Jugador'}]});
 const createButton=make('[data-create-private]');
 return{context,calls,stored,assigned,panel,make,createButton};
}

const success=setup();
await success.make('[data-create-private]').onclick();
assert.equal(success.make('h3').textContent,'RONDA PRIVADA CREADA');
assert.equal(success.make('[data-private-round-code]').textContent,'ABCD234567');
assert.equal(JSON.parse(success.stored.get('golf-score-card-gt-private-round-v1')).joinCode,'ABCD234567');
await success.make('[data-share-private-round]').onclick();
const share=success.calls.find(call=>call.type==='share').payload;
assert.match(share.text,/ABCD234567/);
assert.equal(share.url,'https://golf.example/index-grupal.html?inicio=1');
assert.ok(success.panel.removed,'Share sheet completion closes the creation dialog');
assert.ok(success.calls.some(call=>call.type==='request'&&call.body.action==='read'&&call.body.eventId===eventId),'After sharing, the created private event opens its Score Card');
assert.match(success.assigned[0],/manual_action=personal-scorecard/);

const cancelled=setup({cancel:true});
await cancelled.make('[data-create-private]').onclick();
await cancelled.make('[data-share-private-round]').onclick();
assert.equal(cancelled.panel.removed,undefined,'Cancelling the share sheet keeps a recovery action visible');
assert.match(cancelled.make('[data-status]').textContent,/COMPARTIR CANCELADO/);
await cancelled.make('[data-continue-private-round]').onclick();
assert.ok(cancelled.panel.removed,'The user can continue directly to Score Card after cancelling share');
assert.ok(cancelled.calls.some(call=>call.type==='request'&&call.body.action==='read'));
assert.match(cancelled.assigned[0],/manual_action=personal-scorecard/);

console.log('PASS R147 private round share: generated code is offered to WhatsApp/native recipients, successful share closes creation dialog and opens Score Card; cancellation preserves retry and direct continuation.');
