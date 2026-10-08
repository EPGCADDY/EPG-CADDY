import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const missing='11111111-1111-4111-8111-111111111111';
const stream='22222222-2222-4222-8222-222222222222';
const data=new Map([
 ['gsc-personal-events-v1',JSON.stringify({['personal_'+missing]:{eventId:missing,eventKind:'tournament',source:'production'}})],
 ['gsc-tournament-connect-selection-v1',JSON.stringify({id:missing,eventKind:'tournament',roundId:'round-local'})],
 ['golf-score-card-guatemala-active-round-v1',JSON.stringify({id:'round-local',personalEventId:missing,players:[{name:'Jaime'}]})],
 ['golf-score-card-guatemala-round-archive-v1',JSON.stringify([{id:'round-local',personalEventId:missing,players:[{name:'Jaime'}]}])],
 ['golf-score-card-gt-live-hub-v1:account',JSON.stringify({generalToken:'personal_'+missing,tournaments:[{token:'personal_'+missing}],follows:[{token:'directory_'+missing}]})],
 ['golf-score-card-gt-live-control-v1',JSON.stringify({stream:{streamId:stream,tournamentId:missing,roundId:'round-local'},tournamentOwned:{tournamentId:missing,joinCode:'LOCALCODE'}})]
]);
const notifications=[],calls=[];
const context={
 location:{hostname:'epg-caddy.vercel.app'},
 localStorage:{get length(){return data.size},key:i=>[...data.keys()][i],getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)},
 document:{addEventListener(){}},
 dispatchEvent:event=>notifications.push(event),
 CustomEvent:class{constructor(type,options={}){this.type=type;this.detail=options.detail}},
 URL,
 URLSearchParams,
 TextEncoder,
 fetch:async(_url,options)=>{
  const body=JSON.parse(options.body);
  calls.push(body);
  if(body.action==='identity')return {ok:true,json:async()=>({ok:true,personalCode:'account'})};
  assert.equal(body.action,'list');
  assert.deepEqual(body.knownEvents.map(item=>item.eventId),[missing]);
  return {ok:true,json:async()=>({ok:true,events:[],aliases:[],removedEvents:[{eventId:missing,eventKind:'tournament'}],removedStreams:[],accountCode:'account'})};
 }
};
vm.createContext(context);
vm.runInContext(await readFile('personal-events.js','utf8'),context);

const result=await context.GSCPersonalEvents.sync();
assert.equal(result.ok,true);
assert.equal(data.has('golf-score-card-guatemala-active-round-v1'),true);
assert.equal(JSON.parse(data.get('golf-score-card-guatemala-active-round-v1')).personalEventId,missing);
assert.equal(data.has('gsc-tournament-connect-selection-v1'),true);
assert.equal(JSON.parse(data.get('golf-score-card-guatemala-round-archive-v1'))[0].id,'round-local');
assert.equal(JSON.parse(data.get('golf-score-card-gt-live-hub-v1:account')).tournaments[0].token,'personal_'+missing);
assert.equal(JSON.parse(data.get('golf-score-card-gt-live-control-v1')).tournamentOwned.joinCode,'LOCALCODE');
assert.equal(notifications.length,0);
assert.equal(calls.filter(call=>call.action==='list').length,1);

console.log('PASS R215 personal sync: missing event in remote list does not purge local tournament, active Score Card, archive or codes.');
