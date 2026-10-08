import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {isAllowedAppOrigin,applyAppCors} from './api/_lib/cors.js';

for(const origin of ['https://epg-caddy.vercel.app','https://golf-sc-gt-lab.vercel.app']){
 const headers={};const req={headers:{origin,host:'golf-sc-gt-lab.vercel.app'}};
 const res={setHeader:(name,value)=>headers[name]=value};
 assert.equal(isAllowedAppOrigin(req),true,'official peer app origin is allowed');
 assert.equal(applyAppCors(req,res),true);
 assert.equal(headers['Access-Control-Allow-Origin'],origin);
 assert.equal(headers['Access-Control-Allow-Credentials'],'true');
}
assert.equal(isAllowedAppOrigin({headers:{origin:'https://attacker.example',host:'golf-sc-gt-lab.vercel.app'}}),false,'unrelated origins remain blocked');

const storage=new Map(),calls=[];
const root={location:{hostname:'epg-caddy.vercel.app'},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key),get length(){return storage.size},key:index=>[...storage.keys()][index]},document:{addEventListener(){},getElementById(){return null}},fetch:async(url,init)=>{
 calls.push({url,init});const remote=String(url).startsWith('https://golf-sc-gt-lab.vercel.app/'),body=JSON.parse(init.body);
 if(body.action==='identity')return remote?{ok:true,status:200,json:async()=>({ok:true,personalCode:'lab-device'})}:{ok:false,status:503,json:async()=>({ok:false,code:'PERSONAL_ACCESS_NOT_ENABLED'})};
 if(body.action==='join-code')return remote?{ok:true,status:200,json:async()=>({ok:true,eventId:'11111111-1111-4111-8111-111111111111',eventKind:'tournament',name:'LAB CUP',configuration:{course:'EL PULTÉ GOLF',mode:'general'},accountCode:'lab-device'})}:{ok:false,status:404,json:async()=>({ok:false,code:'LIVE_JOIN_CODE_INVALID'})};
 if(body.action==='read')return remote?{ok:true,status:200,json:async()=>({ok:true,accountCode:'lab-device'})}:{ok:false,status:404,json:async()=>({ok:false,code:'LIVE_JOIN_CODE_INVALID'})};
 return{ok:true,status:200,json:async()=>({ok:true,events:[],aliases:[],removedEvents:[],removedStreams:[],accountCode:remote?'lab-device':'production-device'})};
}};
root.CustomEvent=class{};
const context=vm.createContext(root);vm.runInContext(await readFile('personal-events.js','utf8'),context);
const api=context.GSCPersonalEvents;
storage.set('gsc-tournament-entry-draft-v1',JSON.stringify({eventId:'11111111-1111-4111-8111-111111111111',joinCode:'2D98C92183',eventKind:'tournament'}));
const joined=await api.joinPendingRegistration({players:[{id:'p1',name:'Jugador',handicap:10,tournamentCategory:'a'}],groupLabel:'MI GRUPO',mode:'general',course:'EL PULTÉ GOLF'});
assert.equal(joined.ok,true);assert.equal(joined.source,'lab');
assert.ok(calls.some(call=>call.url==='https://golf-sc-gt-lab.vercel.app/api/personal-events'&&call.init.credentials==='include'),'cross-environment request sends peer session credentials');
assert.equal(api.descriptor('personal_11111111-1111-4111-8111-111111111111').source,'lab','source survives registration');
const read=await api.request('read',{eventId:joined.eventId,eventKind:'tournament'});
assert.equal(read.ok,true);assert.equal(calls.at(-1).url,'https://golf-sc-gt-lab.vercel.app/api/personal-events','later event reads return to the owning environment');
console.log('PASS R191 cross-environment tournament entry: local personal access disabled retries the peer, peer identity uses credentials, and event reads stay on the owner environment.');
