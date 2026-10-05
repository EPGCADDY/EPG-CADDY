import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('personal-events.js','utf8');
const eventId='11111111-1111-4111-8111-111111111111';
function setup({cancel=false}={}){
 const calls=[],stored=new Map(),assigned=[],selectors=new Map();let mounted=false;
 const make=(selector,values={})=>{if(!selectors.has(selector))selectors.set(selector,{value:'',textContent:'',disabled:false,isConnected:true,focus(){},...values});return selectors.get(selector)};
 const panel={innerHTML:'',setAttribute(){},remove(){this.removed=true;mounted=false},querySelector(selector){return make(selector)},querySelectorAll(){return[]}};
 make('[data-close]');make('#personalRoundCreator',{value:'Jaime Kirste'});make('#personalRoundName',{value:'Ronda de prueba'});make('#personalRoundCourse',{value:'El Pulté'});make('#personalRoundDate',{value:'2026-09-30'});make('h3');make('section',{insertAdjacentHTML(_where,html){panel.innerHTML+=html}});make('[data-status]');make('[data-private-round-code]');make('[data-share-private-round]');make('[data-continue-private-round]');
 const document={activeElement:{focus(){}},body:{appendChild(){mounted=true}},getElementById:id=>id==='gscPersonalDialog'&&mounted?panel:null,createElement:()=>panel,addEventListener(){},removeEventListener(){},visibilityState:'visible'};
 const share=async payload=>{calls.push({type:'share',payload});if(cancel)throw Object.assign(new Error('dismissed'),{name:'AbortError'})};
 const location={origin:'https://golf.example',assign:url=>assigned.push(String(url))};
 const context={document,URL,Intl,Date,Map,Set,Array,JSON,String,Number,Math,Promise,encodeURIComponent,location,navigator:{share,clipboard:{writeText:async text=>calls.push({type:"copy",text})}},localStorage:{getItem:key=>stored.get(key)||null,setItem:(key,value)=>stored.set(key,value)},fetch:async(_url,options)=>{const body=JSON.parse(options.body);calls.push({type:'request',body});const response=body.action==='create'?{ok:true,eventId,eventKind:'private',name:'Ronda de prueba',joinCode:'ABCD234567',viewerToken:'V'.repeat(43),expiresAt:'2026-10-08'}:body.action==='list'?{ok:true,events:[],accountCode:'acct'}:{ok:true,accountCode:'acct',membership:{players:[{id:'p1',name:'Jugador'}],groupLabel:'GRUPO'},tournament:{status:'active',name:'Ronda de prueba',configuration:{mode:'general',playedAt:'2026-09-30'}}};return{ok:true,status:200,json:async()=>response}},GSCLiveControl:{buildLiveSnapshot:()=>({players:[{id:'p1',name:'Jugador'}],groupLabel:'GRUPO'})},GSCOpenAccountLogin(){},GSCPrivateRounds:{openScores(){}},addEventListener(){}};
 context.window=context;vm.runInNewContext(fs.readFileSync('whatsapp-invitations.js','utf8'),context);vm.runInNewContext(source,context);context.GSCPersonalEvents.createPrivate({configured:true,registrationDraft:true,course:'El Pulté',mode:'general',players:[{id:'p1',name:'Jugador'}]});
 return{context,calls,stored,assigned,panel,make};
}
const success=setup();await success.make('[data-create-private]').onclick();
assert.equal(success.make('h3').textContent,'MI GRUPO CREADO');assert.equal(success.make('[data-private-round-code]').textContent,'ABCD234567');
assert.equal(JSON.parse(success.stored.get('golf-score-card-gt-private-round-v1')).joinCode,'ABCD234567');
await success.make('[data-copy-event-code]').onclick();assert.equal(success.calls.find(call=>call.type==='copy').text,'ABCD234567');
await success.make('[data-share-private-round]').onclick();
await success.make('[data-send-invitation]').onclick();
assert.equal(success.calls.find(call=>call.type==='share').payload.text,'GOLF SCORE CARD GT\nTe ha invitado a participar en el grupo de Jaime Kirste.\nAbre este enlace y registra a tus jugadores.\nhttps://golf.example/index-grupal.html?inicio=1\n\nMODALIDAD\nMI GRUPO\n\nCÓDIGO DE INGRESO\nABCD234567');
await success.make('[data-send-code]').onclick();
assert.equal(success.calls.filter(call=>call.type==='share').length,2);
assert.equal(success.calls.filter(call=>call.type==='share')[1].payload.text,'ABCD234567');
await success.make('[data-copy-code]').onclick();assert.equal(success.calls.filter(call=>call.type==='copy').at(-1).text,'ABCD234567');
await success.make('[data-finish-whatsapp]').onclick();
assert.ok(success.panel.removed);
await new Promise(resolve=>setImmediate(resolve));
assert.match(success.assigned[0],/manual_action=personal-scorecard/);
const cancelled=setup({cancel:true});await cancelled.make('[data-create-private]').onclick();await cancelled.make('[data-share-private-round]').onclick();await cancelled.make('[data-send-invitation]').onclick();
assert.equal(cancelled.panel.removed,undefined,'Cancelling the share sheet keeps recovery actions visible');assert.match(cancelled.make('[data-whatsapp-status]').textContent,/COMPARTIR CANCELADO/);
await cancelled.make('[data-continue-private-round]').onclick();assert.ok(cancelled.panel.removed);assert.ok(cancelled.calls.some(call=>call.type==='request'&&call.body.action==='read'));assert.match(cancelled.assigned[0],/manual_action=personal-scorecard/);
console.log('PASS R147 private round share: code → WhatsApp/native recipients → Score Card; cancellation preserves retry and direct continuation.');

const tournament=setup();tournament.context.GSCPersonalEvents.presentCreatedTournament({eventId,name:'Copa Santa Delfina',joinCode:'ABCD234567',configuration:{creatorName:'Jaime Kirste'}});
assert.equal(tournament.make('h3').textContent,'TORNEO CREADO');await tournament.make('[data-share-private-round]').onclick();await tournament.make('[data-send-invitation]').onclick();
assert.equal(tournament.calls.find(call=>call.type==='share').payload.text,'GOLF SCORE CARD GT\nTe ha invitado a participar en el torneo Copa Santa Delfina.\nAbre este enlace y registra a tus jugadores.\nhttps://golf.example/index-grupal.html?inicio=1\n\nMODALIDAD\nTORNEO\n\nCÓDIGO DE INGRESO\nABCD234567');await tournament.make('[data-send-code]').onclick();assert.equal(tournament.calls.filter(call=>call.type==='share')[1].payload.text,'ABCD234567');
console.log('PASS R173 integration: first invitation includes code and standalone copy/share code for group/tournament, cancellation/retry and explicit Score Card return.');
