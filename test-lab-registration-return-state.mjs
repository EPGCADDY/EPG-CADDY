import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('index-grupal.html','utf8');
function extract(name,next){return source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${next}(`));}
const draft=[{id:'p1',name:'Jugador A',holes:{1:5}},{id:'p2',name:'Jugador B',holes:{1:4}}];
let opened=0,persisted=0;
const ctx=vm.createContext({round:{configured:true,players:structuredClone(draft)},persist(){persisted++},dateSetup(){},openSetup(mode){assert.equal(mode,'new');opened++},clearDraftState(){throw Error('Regreso borró el registro')},draftPlayers:structuredClone(draft)});
vm.runInContext(extract('openRegistrationPreservingActiveRound','ensurePrincipalEntry')+'openRegistrationPreservingActiveRound()',ctx);
assert.equal(opened,1);assert.equal(persisted,1);assert.deepEqual(JSON.parse(JSON.stringify(ctx.draftPlayers)),draft);assert.deepEqual(JSON.parse(JSON.stringify(ctx.round.players)),draft);
const handler=source.match(/\$\("registrationEventButton"\)\?\.addEventListener\("click",(?:async)?\(\)=>\{([\s\S]*?)\}\);/)[1];
const order=[];let nav;
const fields={setupStatus:{textContent:''}};
const eventCtx=vm.createContext({window:{GSCPersonalEvents:{request:async()=>({ok:true,personalCode:'account-a'}),message:code=>code}},sessionStorage:{setItem(){}},draftPlayers:[{name:'Jugador A',tournamentCategory:'senior'}],COURSE_CATALOG:{pulte:{name:'El Pulté'}},draftCourse:'pulte',draftRoundMode:'general',draftTournament:{name:'Evento existente'},$:id=>fields[id],captureVisibleRegistrationValues(){order.push('capture')},syncDraftPlayersFromManualRows(options){assert.equal(options.strict,true);order.push('sync');return true},persistDraftState(){order.push('persist')},URL,location:{origin:'https://lab.example',href:'https://lab.example/index-grupal.html',assign(url){nav=url;order.push('navigate')}}});
await vm.runInContext(`(async()=>{${handler}})()`,eventCtx);assert.deepEqual(order,['capture','sync','persist','navigate']);assert.equal(new URL(nav).searchParams.get('shortcut'),'create');
order.length=0;nav=null;eventCtx.syncDraftPlayersFromManualRows=()=>false;await vm.runInContext(`(async()=>{${handler}})()`,eventCtx);assert.equal(nav,null);assert.deepEqual(order,['capture']);
console.log('PASS: regreso conserva 2 jugadores y scores; creación captura y persiste antes de navegar; registro incompleto no navega. Prueba VM, no navegador/iPhone.');
const hub=fs.readFileSync('live-hub.js','utf8');
const draftFunction=hub.slice(hub.indexOf('  function registrationEventDraft(){'),hub.indexOf('  function setRoundCreateDialogOpen('));
const stored={accountCode:'account-a',players:draft,course:'El Pulté'};
const readContext=vm.createContext({root:{sessionStorage:{getItem:()=>JSON.stringify(stored)},GSCPersonalEvents:{storageSuffix:()=> 'account-a'}}});
vm.runInContext(draftFunction,readContext);assert.equal(vm.runInContext('registrationEventDraft().players.length',readContext),2);
readContext.root.GSCPersonalEvents.storageSuffix=()=> 'account-b';assert.equal(vm.runInContext('registrationEventDraft()',readContext),null);
readContext.root.GSCPersonalEvents.storageSuffix=()=> 'anonymous';assert.equal(vm.runInContext('registrationEventDraft()',readContext),null);
readContext.root.sessionStorage.getItem=()=>'{';assert.equal(vm.runInContext('registrationEventDraft()',readContext),null);
console.log('PASS: borrador del torneo sólo se recupera para su cuenta autenticada; otra cuenta, anónimo y datos inválidos no reciben el grupo.');

const {assignedPlayers}=await import('./api/_lib/personal-event-access.js');
const assigned=assignedPlayers([{id:'p1',name:'Jugador A',handicap:14,tournamentCategory:'senior',tee:'Azul'}],'organizer');
assert.equal(assigned[0].tee,'Azul');
assert.throws(()=>assignedPlayers([{...assigned[0],tee:'INVALIDA'}],'organizer'));
console.log('PASS: escritor conserva marcas registradas y rechaza marcas inválidas.');
const privateHandler=source.match(/\$\("openMyRoundSetup"\)\.addEventListener\("click",\(\)=>\{([\s\S]*?)\}\);/)[1];
let privateConfig;
eventCtx.window.GSCPersonalEvents.createPrivate=config=>{privateConfig=config};eventCtx.round={configured:false,id:'draft-round'};eventCtx.syncDraftPlayersFromManualRows=()=>true;
vm.runInContext(`(()=>{${privateHandler}})()`,eventCtx);assert.equal(privateConfig.registrationDraft,true);assert.equal(privateConfig.course,'El Pulté');assert.equal(privateConfig.players[0].name,'Jugador A');
assert.equal(privateConfig.players[0].tournamentCategory,'senior');
console.log('PASS: ronda privada recibe el Registro actual, incluso antes de iniciar la tarjeta.');
const currentHub=fs.readFileSync('live-hub.js','utf8');
const openFunction=currentHub.slice(currentHub.indexOf('  async function openRoundCreate(){'),currentHub.indexOf('  function roundCreateMessage('));
for(const authorized of [false,true]){
 let shown=0,login=0;
 const ctx={root:{GSCPersonalEvents:{request:async()=>({ok:authorized,code:authorized?undefined:'ACCOUNT_UNAUTHORIZED'}),message:c=>c},GSCOpenAccountLogin(){login++}},setStatus(){},setRoundCreateDialogOpen(){shown++;return true}};
 await vm.runInNewContext(openFunction+'openRoundCreate()',ctx);assert.equal(shown,authorized?1:0);assert.equal(login,authorized?0:1);
}
console.log('PASS: Torneos verifica identidad antes de abrir la captura; una sesión ausente muestra acceso, no un formulario que luego descarta los datos.');
