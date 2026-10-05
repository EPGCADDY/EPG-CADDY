import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('private-rounds.js','utf8'),app=fs.readFileSync('index-grupal.html','utf8');
const fn=source.slice(source.indexOf('  function openGroupScores(value)'),source.indexOf('  async function leaveGroup(value)'));
const round={id:'current',players:[{name:'QA',holes:{1:5}}],timer:{elapsed:100}},before=JSON.stringify(round);
for(const selection of [null,{personal:true,eventKind:'tournament',roundId:'current',id:'foreign'},{personal:true,eventKind:'private',roundId:'other',id:'foreign'},{personal:true,eventKind:'private',roundId:'current',id:'mine',label:'QA'}]){
 let opened,local=0;const context={round:null,ACTIVE:'active',read:()=>selection,scores:item=>opened=item,openScores:value=>{assert.equal(value,round);local++}};
 vm.runInNewContext(fn,context);context.openGroupScores(round);
 if(selection?.eventKind==='private'&&selection.roundId===round.id){assert.equal(opened.id,'mine');assert.equal(opened.personal,true);assert.equal(local,0)}else{assert.equal(opened,undefined);assert.equal(local,1)}
 assert.equal(JSON.stringify(round),before);
}
const handler=app.slice(app.indexOf('$("privateGroupScoresButton").addEventListener'),app.indexOf('function currentRoundReturnPath()'));
assert.doesNotMatch(handler,/openRoundTournament/,'Group button must not open tournament dashboard');
assert.match(source,/item\.personal\?await root\.GSCPersonalEvents\.request\("read",\{eventId:item\.id,eventKind:"private"\}\)/);
assert.match(source,/while\(cursor&&!seen\.has\(cursor\)\)/,'Legacy pagination must retain all groups');
const scores=source.slice(source.indexOf('  async function scores('),source.indexOf('  function open(value)'));
assert.doesNotMatch(scores,/ORGANIZACIÓN|ANOTAR MIS SCORES|COMPARTIR LIVE/);
const html=fs.readFileSync('live-hub.html','utf8'),hub=fs.readFileSync('live-hub.js','utf8');
assert.match(html,/id="hubScoresReturn" data-gsc-close/);assert.match(html,/id="hubPickerClose"/);
assert.match(hub,/if\(privateView\)scoresPageTitle="SCORES MI GRUPO"/);
assert.match(hub,/\$\("hubScoresReturn"\)\.hidden=false/);
for(const file of ['live.html','code-entry.html']){const text=fs.readFileSync(file,'utf8');assert.match(text,/data-gsc-close/);assert.match(text,/\/shortcuts-ui\.js/)}
console.log('PASS R158: dedicated authorized group entry, unrelated membership denied, no mutation, pagination retained, exact group title, X and Menu in Scores directory/Live/code entry/favorite selection.');

const identify=app.slice(app.indexOf('function renderActiveTournamentHeading(){'),app.indexOf('async function renderCreatorTournamentCode(){'));
for(const kind of ['private','tournament'])for(const bound of [true,false]){
 const nodes={};for(const id of ['activeTournamentHeading','activeTournamentHeadingName','activeTournamentHeadingMeta','setupEventIdentification','setupEventIdentificationName','setupEventIdentificationMeta'])nodes[id]={};
 const selection={personal:true,eventKind:kind,roundId:bound?'current':'other',label:'QA EVENT'};
 const context={round,localStorage:{getItem:key=>key==='gsc-tournament-connect-selection-v1'?JSON.stringify(selection):null},window:{GSCScoresUI:{date:()=>''}},$:id=>nodes[id]};
 vm.runInNewContext(identify,context);context.renderActiveTournamentHeading();
 for(const prefix of ['activeTournamentHeading','setupEventIdentification']){assert.equal(nodes[prefix].hidden,!bound);if(bound)assert.equal(nodes[prefix+'Name'].textContent,(kind==='private'?'MI GRUPO':'TORNEO')+' · QA EVENT')}
}
console.log('PASS R158 identification in Inicio and Score Card, exact current membership only.');

// R170: the tournament button shows its own empty-membership screen.
const tournamentOpening=app.slice(app.indexOf('async function openRoundTournament('),app.indexOf('$("roundTournamentScoresButton").addEventListener'));
for(const scenario of ['none','group','foreign-round','empty-membership','joined','network']){
 let notice=0,navigation='',requested=0;const status={textContent:''};
 const selection=scenario==='none'?null:{personal:true,id:'event',roundId:scenario==='foreign-round'?'other':'current',eventKind:scenario==='group'?'private':'tournament'};
 const context={URL,round,location:{origin:'https://example.test',href:'https://example.test/index-grupal.html',assign:url=>navigation=url},persist(){},currentRoundReturnPath:()=>'/index-grupal.html?round_return=1',localStorage:{getItem:()=>JSON.stringify(selection)},$:()=>status,window:{GSCPrivateRounds:{openTournamentUnavailable:()=>notice++},GSCLiveControl:{prepareTournamentScores:async()=>{}},GSCPersonalEvents:{request:async()=>{requested++;return scenario==='network'?{ok:false,code:'NETWORK_ERROR'}:{ok:true,membership:{players:scenario==='joined'?[{id:'player'}]:[]}}},message:()=> 'SIN CONEXIÓN'}}};
 vm.runInNewContext(tournamentOpening+';this.openTournament=openRoundTournament',context);
 await context.openTournament(true,'general');
 assert.equal(JSON.stringify(round),before);
 if(scenario==='joined'){assert.equal(notice,0);assert.match(navigation,/personalEvent=event/)}
 else if(scenario==='network'){assert.equal(notice,0);assert.equal(status.textContent,'SIN CONEXIÓN');assert.equal(navigation,'')}
 else {assert.equal(notice,1);assert.equal(navigation,'')}
}
assert.match(source,/openTournamentUnavailable:.*NO PERTENECES A NINGÚN TORNEO/);
console.log('PASS R170: empty tournament membership screen, unrelated groups and rounds excluded, joined route retained, network error distinct, round unchanged.');
