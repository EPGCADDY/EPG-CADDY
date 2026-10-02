import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const personal=fs.readFileSync('personal-events.js','utf8'),hub=fs.readFileSync('live-hub.js','utf8'),app=fs.readFileSync('index-grupal.html','utf8');
const privateSource=personal.slice(personal.indexOf(' async function createPrivate(round'),personal.indexOf(' function personalStorageKey'));
const fields=new Map();const field=s=>{if(!fields.has(s))fields.set(s,{value:'',textContent:'',disabled:false,isConnected:true,innerHTML:''});return fields.get(s)};
let writes=0,created=0,releaseRequest;
const panel={querySelector:field},context={root:{localStorage:{setItem(){}},GSCLiveControl:{}},dialog:()=>panel,escape:String,Intl,Date,labels:{a:'A'},status(){},sync:async()=>({ok:false}),request:async()=>{writes++;return new Promise(resolve=>releaseRequest=resolve)},close(){},installCreatedPrivateRoundActions(_panel,result){created++;assert.equal(result.joinCode,'CODE234567')}};
vm.runInNewContext(privateSource,context);await context.createPrivate(null,{course:'El Pulté'});
await field('[data-create-private]').onclick();assert.equal(writes,0);assert.match(field('[data-status]').textContent,/NOMBRE/);
field('#personalRoundName').value='Santa Delfina';field('#personalRoundCourse').value='El Pulté';field('#personalRoundDate').value='2026-10-02';
const pending=field('[data-create-private]').onclick();assert.equal(field('[data-create-private]').disabled,true);assert.match(field('[data-status]').textContent,/CREANDO/);await field('[data-create-private]').onclick();assert.equal(writes,1,'Second tap cannot create a second event');releaseRequest({ok:true,eventId:'event',joinCode:'CODE234567'});await pending;assert.equal(created,1,'Creation code remains available even when list refresh fails');
const openSource=hub.slice(hub.indexOf('  function setRoundCreateDialogOpen('),hub.indexOf('  async function openRoundCreate('));
const name={value:'Santa Delfina'},creator={value:'Jaime'},dialog={hidden:false,setAttribute(){}};const preserve={$:id=>({'hubRoundCreateDialog':dialog,'hubRoundName':name,'hubRoundCreator':creator}[id]),root:{document:{body:{classList:{toggle(){}}}}}};
vm.runInNewContext(openSource,preserve);assert.equal(preserve.setRoundCreateDialogOpen(true),true);assert.equal(name.value,'Santa Delfina');assert.equal(creator.value,'Jaime','Late startup cannot reset an already open form');
const menuSource=app.slice(app.indexOf('function menuCreationHasCompleteRoster'),app.indexOf('$("newRoundButton").addEventListener',app.indexOf('function menuCreationHasCompleteRoster')));
let openedConfig,openedDefaults,persisted=0;
const menuContext={manualDraftRows:[{name:'Jaime',category:'',tee:'',handicap:''}],persistDraftState(){persisted++},captureVisibleRegistrationValues(){menuContext.manualDraftRows[0].name="QA visible draft"},window:{GSCPersonalEvents:{createPrivate(config,defaults){openedConfig=config;openedDefaults=defaults}}},COURSE_CATALOG:{pulte:{name:'El Pulté'}},draftCourse:'pulte',draftRoundMode:'general'};
vm.runInNewContext(menuSource+';createPrivateRoundFromMenu()',menuContext);assert.equal(menuContext.manualDraftRows[0].name,'QA visible draft','Capture visible values before checking incomplete roster');assert.equal(openedConfig,null);assert.equal(openedDefaults.course,'El Pulté');assert.equal(persisted,1,'Incomplete roster remains saved while creation opens');

assert.match(app,/if\(!menuCreationHasCompleteRoster\(\)\)\{persistDraftState\(\);window\.GSCPersonalEvents\.createPrivate\(null,/,'Incomplete registration still opens creation, preserving its draft');
assert.match(fs.readFileSync('shortcuts-ui.js','utf8'),/item\("create-round","CREAR MI GRUPO"/);
assert.match(hub,/root\.GSCPersonalEvents\.request\("create",/,'Tournament uses the identity-prepared request');
assert.match(hub,/\}root\.GSCPersonalEvents\.presentCreatedTournament\(result/,'Creation code is presented even without a shelf refresh');
console.log('PASS R24-B5: named forms preserved; incomplete roster can open creation; missing fields reported; double tap creates once; share code survives failed refresh; private menu label correct.');

const draftStore=new Map();const draftContext={manualDraftRows:[{name:'QA incomplete',category:'',handicap:'',tee:''}],draftPlayers:[],draftTournament:null,draftCourse:'pulte',draftRoundMode:'general',activeDraftStorageKey:()=>"draft",activeDraftGameKey:()=>null,manualRowHasData:r=>Boolean(r?.name),localStorage:{setItem:(k,v)=>draftStore.set(k,v),getItem:k=>draftStore.get(k),removeItem:k=>draftStore.delete(k)},COURSE_CATALOG:{pulte:{}},normalizePlayer:p=>p,normalizeTournament:p=>p,draftSideGames:()=>({}),window:{GSCSkins:{normalizeConfig:p=>p}},draftSkins:{},Date,emptyManualDraftRow:()=>({name:'',category:'',handicap:'',tee:''}),manualRowFromPlayer:p=>p};
const saveSource=app.slice(app.indexOf('function persistDraftState(){'),app.indexOf('function loadDraftState(){'));
const seedSource=app.slice(app.indexOf('function seedManualDraftRowsFromPlayers('),app.indexOf('function manualRowHasData('));
vm.runInNewContext(saveSource+seedSource+';persistDraftState();manualDraftRows=[];seedManualDraftRowsFromPlayers(true)',draftContext);
assert.equal(draftContext.manualDraftRows[0].name,'QA incomplete','Incomplete raw rows survive reload without becoming official players');assert.equal(draftContext.draftPlayers.length,0);
console.log('PASS incomplete raw registration persists and restores without inventing handicap/category/tee');

const groupSource=fs.readFileSync('private-rounds.js','utf8');const groupFunction=groupSource.slice(groupSource.indexOf('  function openGroupScores(value)'),groupSource.indexOf('  function openScores(value)'));
let groupTitle,groupHtml,boundRows;const groupSnapshot={course:'El Pulté',playedAt:'2026-10-02',players:[{id:'p1',name:'QA group',handicap:14,holes:[{hole:1,gross:5,net:4}],totals:{gross:5,net:4,relativeToPar:0}}]};
const groupContext={round:null,read(){throw Error('explicit current round required')},ACTIVE:'active',show:(title,html)=>{groupTitle=title;groupHtml=html},escape:String,Math,root:{GSCLiveControl:{buildLiveSnapshot:r=>{assert.equal(r.id,'current-group');return groupSnapshot}},GSCScoresUI:{date:v=>v,bindRows:(_target,rows)=>boundRows=rows}},dialog:{querySelector:()=>({})}};
vm.runInNewContext(groupFunction,groupContext);groupContext.openGroupScores({configured:true,id:'current-group',players:[{}],personalEventKind:'tournament'});assert.equal(groupTitle,'SCORES MI GRUPO');assert.match(groupHtml,/5<\/td><td style="color:#31ff00">4/);assert.equal(boundRows[0].player.holes[0].net,4);assert.equal(boundRows[0].snapshot,groupSnapshot,'18-score detail receives full official snapshot');assert.match(app,/privateGroupScoresButton.*openGroupScores\(round\)/);
console.log('PASS own group Scores works for tournament card without private enrollment; official totals and full 18-hole detail bound');

assert.match(app, /id="registrationJoinRound"[^>]*>[\s\S]*?<span>MI GRUPO<\/span>/);

assert.match(personal, /id="personalRoundDate" type="text" readonly/);
assert.match(fs.readFileSync("live-hub.html","utf8"), /id="hubRoundDate" type="text" readonly/);
