import vm from "node:vm";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {privateRoundAction,privateRoundSql} from './api/live.js';
const id='a9a8fae1-4444-4444-8888-123456789abc',secret='A'.repeat(43),calls=[];
let allow=false;
const sql=async(strings,...values)=>{const query=strings.join('?');calls.push({query,values});if(query.includes('RETURNING request_count'))return[{request_count:1}];if(query.includes('SELECT id,name,viewer_access_token'))return allow?[{id,name:'Golf amigos',viewer_access_token:'V'.repeat(43)}]:[];if(query.includes('AS applied'))return[{applied:{applied:true,tournamentId:id,groupLabel:'GRUPO JK'}}];if(query.includes('INSERT INTO live_private_rounds'))return[{id,revision:0,expires_at:'2026-10-07',created_at:'2026-09-29'}];if(query.includes('SELECT id,name,mode,expires_at'))return[{id,name:'Golf amigos',mode:'general',expires_at:'2026-10-07',viewer_access_token:secret,join_code_hash:secret}];return[]};
const req={headers:{authorization:'LivePublisher '+secret,host:'localhost'}};
await assert.rejects(privateRoundAction(sql,req,{privateRoundId:id,joinCode:'ABCDEFGH23',groupLabel:'GRUPO JK'},'join_private_round'),/PRIVATE_ROUND_CODE_INVALID/);
assert.ok(!calls.some(c=>c.query.includes('AS applied')),'Wrong code must not modify membership');
allow=true;const joined=await privateRoundAction(sql,req,{privateRoundId:id,joinCode:'ABCDEFGH23',groupLabel:'GRUPO JK'},'join_private_round');assert.equal(joined.viewerToken,'V'.repeat(43));assert.equal(joined.tournamentId,id);
const list=await privateRoundAction(sql,req,{},'list_private_rounds');assert.equal(list.rounds.length,1);assert.ok(!JSON.stringify(list).includes(secret),'Public listing cannot disclose credentials');
const created=await privateRoundAction(sql,req,{name:'Golf amigos',mode:'general',consent:{confirmed:true}},'create_private_round');assert.match(created.joinCode,/^[A-HJ-NP-Z2-9]{10}$/);assert.equal(created.privateRoundId,id);
const dataQueries=calls.filter(c=>!c.query.startsWith('CREATE TABLE'));
assert.ok(dataQueries.every(c=>!/(?:FROM|INTO|UPDATE) live_(?:tournaments|streams|events)\b/.test(c.query)),'Private writes/reads must never access tournament tables');
let mapped;await privateRoundSql(async(s,...v)=>{mapped={query:s.join('?'),values:v}})`SELECT * FROM live_streams WHERE tournament_id=${id}`;assert.equal(mapped.values[0],id);assert.match(mapped.query,/live_private_streams/);
const require=createRequire(import.meta.url),store=new Map(),clientCalls=[];
globalThis.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
globalThis.document={getElementById:()=>null};
let clientAllow=false;
globalThis.fetch=async(url,options)=>{const body=JSON.parse(options.body);clientCalls.push(body);const value=body.action==='create_private_stream'?{ok:true,streamId:'stream-private',publisherSecret:secret,viewerToken:'S'.repeat(43),revision:0}:body.action==='join_private_round'?(clientAllow?{ok:true,tournamentId:id,name:'Golf amigos',viewerToken:'V'.repeat(43)}:{ok:false,code:'PRIVATE_ROUND_CODE_INVALID'}):{ok:true,revision:1};return{ok:true,status:200,json:async()=>value}};
const control=require('./live-control.js'),round={id:'round-private-0001',configured:true,mode:'general',players:[{id:'p1',name:'JK',handicap:14,holes:{1:{hole:1,par:4,gross:5,net:4}}}]};
assert.equal((await control.connectPrivateRound(id,'BADCODE123',round)).ok,false);assert.equal(store.get(control.STORAGE_KEY),undefined,'Rejected join must preserve prior state');
clientAllow=true;assert.equal((await control.connectPrivateRound(id,'ABCDEFGH23',round)).ok,true);assert.equal(JSON.parse(store.get(control.STORAGE_KEY)).privateStream.privateRound,true);
control.onRoundPersisted(round);await new Promise(resolve=>setTimeout(resolve,450));assert.ok(clientCalls.some(c=>c.action==='publish_private_round'),'Official writer must publish Scores to private storage');assert.ok(!clientCalls.some(c=>c.action==='join_tournament_by_id'||c.action==='publish'),'Private Scores cannot go to tournaments');
// A prior tournament stream must not receive edits made in an active private round.
const priorState=JSON.parse(store.get(control.STORAGE_KEY));
priorState.stream={roundId:round.id,streamId:'previous-tournament',publisherSecret:secret,viewerToken:'T'.repeat(43),revision:0,tournamentId:'previous-event'};
store.set(control.STORAGE_KEY,JSON.stringify(priorState));clientCalls.length=0;
round.players[0].holes[1].gross=6;control.onRoundPersisted(round);
await new Promise(resolve=>setTimeout(resolve,450));
assert.ok(clientCalls.some(c=>c.action==='publish_private_round'&&c.snapshot.players[0].totals.gross===6),'Private correction must reach its own writer');
assert.ok(!clientCalls.some(c=>c.action==='publish'),'A previous tournament connection must not receive private corrections');
const table=fs.readFileSync('private-rounds.js','utf8');for(const heading of ['NOMBRE','HDCP','HOYO','GROSS','NETO','+/−'])assert.ok(table.includes('<th>'+heading+'</th>'));
assert.ok(!table.includes("escape(group)+'<br>'"));assert.ok(!table.includes('SCORES ACTUALIZADOS'));assert.ok(!table.includes('En Torneos abre'));assert.ok(table.includes('GSCWhatsAppInvitations.open'));
console.log('PASS R140: isolated SQL, wrong-code rejection, selected-round binding, private membership persistence, official writer and score columns');
// Scores-only entry: no creator code, and signed results retain their requested colors.
const nodes={'h2':{outerHTML:''},'.group-scores-heading':{outerHTML:''},'section':{classList:{add(){}},appendChild(){}},'[data-scores]':{innerHTML:''},'[data-status]':{textContent:''},'[data-close]':{}};
const panel={style:{},setAttribute(){},remove(){},querySelector:key=>nodes[key],innerHTML:''};
const scoreContext={document:{createElement:()=>panel,body:{appendChild(){}}},localStorage:{getItem:key=>JSON.stringify(key.includes('private-round')?{id:'private',name:'Cuates',creator:true,joinCode:'SECRET1234',viewerToken:'viewer',roundId:'active',expiresAt:'2099-01-01'}:{id:'active'})},GSCLiveControl:{request:async()=>({ok:true,streams:[{snapshot:{players:[{name:'Jaime',handicap:13,holes:[{hole:3}],totals:{gross:15,net:12,relativeToPar:-2}},{name:'Jessie',handicap:38,holes:[{hole:3}],totals:{gross:18,net:14,relativeToPar:2}}]}}]})},setTimeout:()=>0,clearTimeout(){}};
vm.runInNewContext(fs.readFileSync('private-rounds.js','utf8'),scoreContext);
await scoreContext.GSCPrivateRounds.openScores({id:'active'});
assert.doesNotMatch(panel.innerHTML,/SECRET1234|CÓDIGO PARA COMPARTIR|COMPARTIR CÓDIGO/);
assert.match(nodes['[data-scores]'].innerHTML,/class="private-score-under">-2/);
assert.match(nodes['[data-scores]'].innerHTML,/class="private-score-over">\+2/);
console.log('PASS R141: Scores-only creator view hides code; negative green and positive red');
// Sharing a legacy private round must use its publisher API even though the
// personal-events module is present, and successful sharing returns to the card.
{
 const shareStorage=new Map([['golf-score-card-gt-live-control-v1',JSON.stringify({version:1,privateStream:{tournamentId:id,publisherSecret:secret}})]]),shareCalls=[];
 const elements=new Map();let sharePanelRemoved=false,privatePanelClosed=0;
 const element=()=>({appendChild(){},textContent:'',href:'',onclick:null,focus(){},addEventListener(){}});
 const sharePanel={id:'gscOneUseShare',className:'',innerHTML:'',setAttribute(){},remove(){sharePanelRemoved=true},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector)}};
 const shareContext={URL,URLSearchParams,encodeURIComponent,localStorage:{getItem:key=>shareStorage.get(key)||null,setItem:(key,value)=>shareStorage.set(key,value)},location:{origin:'https://gsc.example',href:'https://gsc.example/live-hub.html'},document:{activeElement:element(),getElementById:key=>key==='gscOneUseShare'&&!sharePanelRemoved?sharePanel:null,createElement:()=>sharePanel,body:{appendChild(){}},addEventListener(){},removeEventListener(){}},navigator:{share:async()=>{},clipboard:{writeText:async()=>{}}},setTimeout:()=>0,clearTimeout(){},GSCPrivateRounds:{close(){privatePanelClosed++}},GSCPersonalEvents:{storageSuffix:()=> 'anonymous',descriptor:()=>null,request:async()=>{throw Error('legacy private event must not call personal-events')}} ,fetch:async(url,options)=>{shareCalls.push({url,body:JSON.parse(options.body)});return{ok:true,json:async()=>({ok:true,code:'ABCD23456789',name:'Golf amigos'})}}};
 vm.runInNewContext(fs.readFileSync('live-share.js','utf8'),shareContext);
 const result=await shareContext.GSCOneUseLive.share('private',id,'Golf amigos');assert.equal(result.ok,true);assert.equal(shareCalls[0].url,'/api/live-share');assert.equal(shareCalls[0].body.action,'create');
 await elements.get('[data-native-share]').onclick();assert.equal(sharePanelRemoved,true);assert.equal(privatePanelClosed,1,'Successful share returns to the Score Card');
}
// The code-only share action also closes its overlay only after successful send;
// cancel keeps it open so the owner can retry or continue manually.
async function verifyCodeShare(share){
 let removed=false;const nodes=new Map();const panel={style:{},innerHTML:'',setAttribute(){},remove(){removed=true},querySelector(selector){if(!nodes.has(selector))nodes.set(selector,{appendChild(){},textContent:'',onclick:null,classList:{add(){} }});return nodes.get(selector)}};
 const context={document:{createElement:()=>panel,body:{appendChild(){}},getElementById:()=>null},localStorage:{getItem:key=>JSON.stringify(key.includes('private-round')?{id:'private',name:'Cuates',creator:true,joinCode:'ABCD234567',viewerToken:'viewer',roundId:'active',expiresAt:'2099-01-01'}:{id:'active'})},GSCLiveControl:{request:async()=>({ok:true,streams:[]})},navigator:{share},GSCWhatsAppInvitations:{open(options,onComplete){context.invitationOptions=options;context.completeInvitation=onComplete;return true}},setTimeout:()=>1,clearTimeout(){}};
 vm.runInNewContext(fs.readFileSync('private-rounds.js','utf8'),context);await context.GSCPrivateRounds.open({id:'active',configured:true});await nodes.get('#privateShare').onclick();return{removed,panel,nodes};
}
const sharedCode=await verifyCodeShare(async()=>{});assert.equal(sharedCode.removed,false,'Two-message sharing stays available');
const cancelledCode=await verifyCodeShare(async()=>{const error=new Error('cancel');error.name='AbortError';throw error});assert.equal(cancelledCode.removed,false);
const privateRoundStyle=fs.readFileSync('scores-ui.css','utf8');assert.match(privateRoundStyle,/clamp\(15px,4vw,18px\)/);assert.match(privateRoundStyle,/font-size:clamp\(11px,2\.85vw,14px\)/);
console.log('PASS R147.2 regressions: legacy COMPARTIR LIVE API selection; native-share success closes overlays to Score Card; cancel preserves retry; private Scores type is larger');
// Closed personal rounds remain in the authorized history, without duplicating legacy rows.
const buttons=new Map();nodes['[data-rounds]']={innerHTML:'',querySelector:key=>{if(!buttons.has(key))buttons.set(key,{});return buttons.get(key)}};
scoreContext.GSCLiveControl.request=async()=>({ok:true,rounds:[{id:'same',name:'Legacy'}]});
scoreContext.GSCPersonalEvents={sync:async()=>({ok:true,privateItems:[{label:'Closed personal',event:{eventId:'closed',status:'closed'}},{label:'Personal version',event:{eventId:'same',status:'active'}}]}),descriptor:()=>({eventId:'closed',eventKind:'private'})};
scoreContext.location={assign:url=>{scoreContext.destination=url}};
await scoreContext.GSCPrivateRounds.list();assert.match(nodes['[data-rounds]'].innerHTML,/Closed personal/);assert.match(nodes['[data-rounds]'].innerHTML,/Personal version/);assert.doesNotMatch(nodes['[data-rounds]'].innerHTML,/Legacy/);buttons.get('#private-closed').onclick();assert.equal(scoreContext.destination,'/live-hub.html?personalEvent=closed&personalKind=private');
console.log('PASS personal private history: closed authorized event retained, duplicates merged, membership route used.');
