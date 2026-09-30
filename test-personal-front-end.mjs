import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const hub=createRequire(import.meta.url)('./live-hub.js'),prior=globalThis.fetch,token='V'.repeat(43);
let request;
globalThis.fetch=async(url,options)=>{request={url,body:JSON.parse(options.body)};return new Response(JSON.stringify({ok:true,tournament:{id:'legacy'}}))};
try{assert.equal((await hub.read('tournament',token)).tournament.id,'legacy');assert.equal(request.url,'/api/live');assert.equal(request.body.viewerToken,token);globalThis.GSCPersonalEvents={descriptor:value=>value==='personal_test'?{}:null,read:async()=>({ok:true,source:'membership'})};assert.equal((await hub.read('tournament','personal_test')).source,'membership');globalThis.GSCOneUseLive={read:async()=>({ok:true,source:'one-use'})};assert.equal((await hub.read('tournament','oneuse_test')).source,'one-use')}finally{globalThis.fetch=prior;delete globalThis.GSCPersonalEvents;delete globalThis.GSCOneUseLive}
const p={id:'p1',name:'HOMÓNIMO',tournamentCategory:'b',holes:[]},streams=new Map([['one',{id:'one',groupLabel:'GRUPO',snapshot:{personal:true,players:[{...p,participantId:'event:group:p1'}]}}],['two',{id:'two',groupLabel:'GRUPO',snapshot:{personal:true,players:[{...p,id:'p2',participantId:'event:group:p2'}]}}]]);assert.equal(hub.tournamentPlayers(streams).length,2,'Personal participant IDs keep homonyms distinct');
const storage=new Map(),eventId='11111111-1111-4111-8111-111111111111';storage.set('gscg-personal:account-a:golf-score-card-gt-live-control-v1',JSON.stringify({stream:{tournamentId:eventId,publisherSecret:'A'.repeat(43)}}));
const context={localStorage:{getItem:key=>storage.get(key)||null},GSCPersonalEvents:{storageSuffix:()=> 'account-a'}};vm.runInNewContext(await readFile('live-share.js','utf8'),context);assert.equal(context.GSCOneUseLive.publisher('tournament',eventId).publisherSecret,'A'.repeat(43));context.GSCPersonalEvents.storageSuffix=()=> 'account-b';assert.equal(context.GSCOneUseLive.publisher('tournament',eventId),null,'Another account cannot recover a publisher secret from account A storage');
console.log('PASS frontend integration: legacy LIVE read retained, membership and one-use routes, personal homonyms distinct, hub recovers only current account publisher. Explicit fixtures; browser review separate.');
