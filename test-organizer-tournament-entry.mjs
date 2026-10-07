import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const menu=fs.readFileSync('shortcuts-ui.js','utf8'),html=fs.readFileSync('live-hub.html','utf8'),code=fs.readFileSync('live-hub.js','utf8'),personal=fs.readFileSync('personal-events.js','utf8');
assert.match(menu,/item\("organizer","ORGANIZADOR"/);assert.match(menu,/item\('create-tournament','CREAR TORNEO'/);assert.match(menu,/shortcut=create/);
assert.match(html,/<label for="hubRoundName">TORNEO<\/label>/);assert.match(html,/<label for="hubRoundCourse">CLUB<\/label><select/);assert.match(html,/<details><summary>CATEGORÍAS<\/summary>/);assert.match(html,/id="hubRoundDate"[^>]*readonly/);assert.match(html,/id="hubRoundCreator"/);assert.match(code,/creatorName,players:/);assert.match(personal,/ID DE TORNEO/);
console.log('PASS Menu Organizador: creation form, club/categories dropdowns, automatic date, creator and code result.');

const keySource=personal.slice(personal.indexOf(' function personalStorageKey('),personal.indexOf(' async function openAssignedCard('));const scope={root:{}};vm.runInNewContext(keySource,scope);assert.equal(scope.personalStorageKey('a','card'),'gscg-personal:a:card');scope.root.GSC_PERSONAL_ACCOUNT='a';assert.equal(scope.personalStorageKey('a','card'),'card');assert.equal(scope.personalStorageKey('b','card'),'gscg-personal:b:card');console.log('PASS creator/join storage: unscoped and already scoped registration use one account prefix.');

assert.match(personal,/membership\?\.role==='organizer'.*index-grupal\.html\?inicio=1/,'Empty creator returns to registration without auto-enrollment');console.log('PASS empty organizer continues to Registration; assigning the group still requires explicit event selection.');


const createdActions=personal.slice(personal.indexOf('async function continueToCreatedPrivateCard('),personal.indexOf(' function presentCreatedTournament('));
function createdActionHarness(eventKind){
 const calls={copied:'',opened:null,closed:0,shareCallback:'unset',markup:''},heading={textContent:''},output={textContent:''},copy={onclick:null,textContent:''},share={onclick:null},continueAction=eventKind==='tournament'?null:{onclick:null},section={insertAdjacentHTML(_where,html){calls.markup+=html}},panel={querySelector(selector){return selector==='h3'?heading:selector==='section'?section:selector==='[data-private-round-code]'?output:selector==='[data-copy-event-code]'?copy:selector==='[data-share-private-round]'?share:selector==='[data-continue-private-round]'?continueAction:null}};
 const context={root:{navigator:{clipboard:{writeText:async value=>calls.copied=value}},GSCWhatsAppInvitations:{open:(_options,onComplete)=>calls.shareCallback=onComplete},location:{origin:'https://example.test',assign(){calls.assigned=true}}},status(){},close(){calls.closed++},openAssignedCard:async event=>calls.opened=event,URL};
 vm.runInNewContext(createdActions,context);
 context.installCreatedPrivateRoundActions(panel,{joinCode:'JOIN123456',eventId:'event-1',name:'Torneo prueba'},eventKind);
 return{calls,heading,output,copy,share,continueAction};
}
const tournamentActions=createdActionHarness('tournament');
assert.match(tournamentActions.calls.markup,/CÓDIGO INGRESO/,'Tournament creation names the copy action CÓDIGO INGRESO');
assert.doesNotMatch(tournamentActions.calls.markup,/CONTINUAR AL SCORE CARD/,'Tournament confirmation has no direct Score Card button');
assert.equal(tournamentActions.continueAction,null,'Tournament cannot bind a direct navigation action');
tournamentActions.share.onclick();
assert.equal(tournamentActions.calls.shareCallback,undefined,'Returning from tournament sharing cannot navigate directly to the Score Card');
await tournamentActions.copy.onclick();
assert.equal(tournamentActions.calls.copied,'JOIN123456','CÓDIGO INGRESO copies the tournament join code');
assert.equal(tournamentActions.calls.opened,null,'Copying the code does not assign or open any Score Card');
assert.equal(tournamentActions.calls.closed,0,'Copying the code leaves the confirmation screen open');
const groupActions=createdActionHarness('private');
assert.match(groupActions.calls.markup,/COPIAR CÓDIGO/,'Private group copy wording is preserved');
assert.match(groupActions.calls.markup,/CONTINUAR AL SCORE CARD/,'Private group continuation is preserved');
console.log('PASS R189 tournament creation: no direct Score Card continuation; CÓDIGO INGRESO copies only; private group flow unchanged.');
