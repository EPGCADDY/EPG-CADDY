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
const handler=source.match(/async function createTournamentFromMenu\(\)\{([^\n]*)\}/)[1];
const order=[];let nav;
const fields={setupStatus:{textContent:''}};
const eventCtx=vm.createContext({manualDraftRows:[{name:'Jugador A',category:'senior',tee:'Blanco',handicap:'14'}],window:{GSCPersonalEvents:{request:async()=>({ok:true,personalCode:'account-a'}),message:code=>code}},sessionStorage:{setItem(key,value){eventCtx.savedDraft=JSON.parse(value)}},rosterEditMode:true,round:{configured:true,id:'active-round',players:structuredClone(draft)},draftPlayers:[{name:'Jugador A',tournamentCategory:'senior'}],COURSE_CATALOG:{pulte:{name:'El Pulté'}},draftCourse:'pulte',draftRoundMode:'general',draftTournament:{name:'Evento existente'},$:id=>fields[id],captureVisibleRegistrationValues(){order.push('capture')},syncDraftPlayersFromManualRows(options){assert.equal(options.strict,true);order.push('sync');return true},persistDraftState(){order.push('persist')},URL,location:{origin:'https://lab.example',href:'https://lab.example/?inicio=1&source=pwa&_vercel_share=qa',assign(url){nav=url;order.push('navigate')}}});
vm.runInContext(extract('menuCreationHasCompleteRoster','createPrivateRoundFromMenu'),eventCtx);
vm.runInContext(extract('currentRoundReturnPath','openRoundTournament').replace(/async\s*$/, ''),eventCtx);
await vm.runInContext(`(async()=>{${handler}})()`,eventCtx);assert.equal(eventCtx.savedDraft.roundId,'active-round');const returnUrl=new URL(eventCtx.savedDraft.returnTo,'https://lab.example');assert.equal(returnUrl.pathname,'/index-grupal.html');assert.equal(returnUrl.searchParams.get('round_return'),'1');assert.equal(returnUrl.searchParams.has('inicio'),false);assert.equal(returnUrl.searchParams.has('source'),false);assert.equal(returnUrl.searchParams.get('_vercel_share'),'qa');assert.deepEqual(JSON.parse(JSON.stringify(eventCtx.round.players)),draft);assert.deepEqual(order,['capture','sync','persist','navigate']);assert.equal(new URL(nav).searchParams.get('shortcut'),'create');
eventCtx.rosterEditMode=false;await vm.runInContext(`(async()=>{${handler}})()`,eventCtx);assert.equal(eventCtx.savedDraft.roundId,undefined);assert.equal(eventCtx.savedDraft.returnTo,undefined);
order.length=0;nav=null;eventCtx.syncDraftPlayersFromManualRows=()=>false;await vm.runInContext(`(async()=>{${handler}})()`,eventCtx);assert.equal(nav,null);assert.deepEqual(order,['capture']);
console.log('PASS: regreso conserva 2 jugadores y scores; creación captura y persiste antes de navegar; registro incompleto no navega. Prueba VM, no navegador/iPhone.');

const resumeFn=source.slice(source.indexOf('function reopenRegistrationAfterBackground('),source.indexOf('function ensurePrincipalEntry('));
assert.ok(resumeFn.includes('!directHome||!appWasBackgrounded||!isRecoverableStoredRound(round)'));
let resumeOpened=0;const resumeRound={configured:true,players:structuredClone(draft)};
const resumeCtx=vm.createContext({directHome:true,appWasBackgrounded:true,round:resumeRound,isRecoverableStoredRound:value=>!!value?.configured,openRegistrationPreservingActiveRound(){resumeOpened++}});
assert.equal(vm.runInContext(resumeFn+'reopenRegistrationAfterBackground()',resumeCtx),true);
assert.equal(resumeOpened,1);assert.equal(resumeCtx.appWasBackgrounded,false);
assert.deepEqual(JSON.parse(JSON.stringify(resumeCtx.round.players)),draft,'Reabrir Registro debe conservar jugadores y scores');
for(const state of [{directHome:false,hidden:true,configured:true},{directHome:true,hidden:false,configured:true},{directHome:true,hidden:true,configured:false}]){
 let opened=0;const ctx=vm.createContext({directHome:state.directHome,appWasBackgrounded:state.hidden,round:{configured:state.configured},isRecoverableStoredRound:value=>!!value?.configured,openRegistrationPreservingActiveRound(){opened++}});
 assert.equal(vm.runInContext(resumeFn+'reopenRegistrationAfterBackground()',ctx),false);
 assert.equal(opened,0,'La reanudación sólo aplica a PWA instalada con ronda activa');
}
const lifecycle=source.slice(source.indexOf('document.addEventListener("visibilitychange"'),source.indexOf('window.addEventListener("beforeunload"'));
assert.equal(lifecycle.split('if(!reopenRegistrationAfterBackground())ensurePrincipalEntry();').length-1,3,'Visibilidad, pageshow y focus deben cubrir la reactivación');
console.log('PASS: al reabrir la PWA con ronda activa muestra Registro, conserva jugadores y scores; rutas web y rondas vacías no cambian.');

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
const privateHandler=source.match(/function createPrivateRoundFromMenu\(\)\{([^\n]*)\}/)[1];
let privateConfig;
eventCtx.window.GSCPersonalEvents.createPrivate=config=>{privateConfig=config};eventCtx.round={configured:false,id:'draft-round'};eventCtx.syncDraftPlayersFromManualRows=()=>true;
vm.runInContext(`(()=>{${privateHandler}})()`,eventCtx);assert.equal(privateConfig.registrationDraft,true);assert.equal(privateConfig.course,'El Pulté');assert.equal(privateConfig.players[0].name,'Jugador A');
assert.equal(privateConfig.players[0].tournamentCategory,'senior');
console.log('PASS: ronda privada recibe el Registro actual, incluso antes de iniciar la tarjeta.');
const currentHub=fs.readFileSync('live-hub.js','utf8');
const openFunction=currentHub.slice(currentHub.indexOf('  async function openRoundCreate(){'),currentHub.indexOf('  function roundCreateMessage('));
for(const authorized of [false,true]){
 let shown=0,login=0;
 const ctx={root:{GSCPersonalEvents:{request:async()=>({ok:authorized,canCreate:authorized,code:authorized?undefined:'ACCOUNT_UNAUTHORIZED'}),message:c=>c},GSCOpenAccountLogin(){login++}},setStatus(){},setRoundCreateDialogOpen(){shown++;return true}};
 await vm.runInNewContext(openFunction+'openRoundCreate()',ctx);assert.equal(shown,1);assert.equal(login,0);
}
console.log('PASS: Torneos abre la captura directamente; crear no muestra autorización adicional antes del alta.');
