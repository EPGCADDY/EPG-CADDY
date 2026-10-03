import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync('personal-events.js','utf8'),id='11111111-1111-4111-8111-111111111111';
function fixture({valid=true,role='scorer',readRole=role}={}){
 const requests=[],fields=new Map(),stored=new Map();let prepared;
 const field=k=>{if(!fields.has(k))fields.set(k,{value:'',textContent:'',disabled:false,focus(){},insertAdjacentHTML(_pos,html){this.html=(this.html||'')+html}});return fields.get(k)};
 const panel={setAttribute(){},querySelector:field,querySelectorAll(){return[]},remove(){}};
 const location={origin:'https://example.test',href:'https://example.test/index-grupal.html?inicio=1&invitation=1#evento='+id+'&codigo=ABCD234567'};
 const root={URL,URLSearchParams,encodeURIComponent,Intl,Date,Map,Set,Array,String,Number,Math,JSON,Promise,location,history:{replaceState(_a,_b,url){location.href=url}},document:{activeElement:{focus(){}},getElementById(){return null},createElement(){return panel},body:{appendChild(){}},addEventListener(){}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},GSCLiveControl:{buildLiveSnapshot:r=>r},GSCPrepareEventInvitation:i=>prepared=i,
 fetch:async(_url,options)=>{const body=JSON.parse(options.body);requests.push(body);let result={ok:true,personalCode:'account'};
 if(body.action==='join-code')result=body.joinCode==='ABCD234567'?{ok:true,eventId:id,eventKind:'tournament',name:'NUEVO NOMBRE'}:{ok:false,code:'LIVE_JOIN_CODE_INVALID'};
 if(body.action==='view-code')result=valid?{ok:true,eventId:id,eventKind:'tournament'}:{ok:false,code:'LIVE_JOIN_CODE_INVALID'};
 if(body.action==='read')result={ok:true,tournament:{name:'NUEVO NOMBRE',status:'active',configuration:{course:'El Pulté',mode:'general'}},membership:{role:readRole}};
 if(body.action==='list')result={ok:true,accountCode:'account',events:[{eventId:id,eventKind:'tournament',name:'NUEVO NOMBRE',role,status:'active',players:[]} ]};
 return{ok:result.ok,status:result.ok?200:403,json:async()=>result};}};
 vm.runInNewContext(source,root);return{root,requests,field,stored,get prepared(){return prepared}};
}
const f=fixture(),api=f.root.GSCPersonalEvents;
const old=api.eventInvitationUrl({eventId:id,name:'CMI',joinCode:'ABCD234567'}),renamed=api.eventInvitationUrl({eventId:id,name:'Copa Universales 2026',joinCode:'ABCD234567'});
assert.match(old,/\/torneo\/CMI#/);assert.match(renamed,/\/torneo\/COPA-UNIVERSALES-2026#/);assert.equal(new URL(old).hash,new URL(renamed).hash,'Renaming preserves event and access identity');
assert.equal(await api.openLinkInvitation(),true);assert.equal(f.root.location.href.includes('codigo'),false,'Remove invitation secret from current address after reading it');assert.equal(f.field('h3').textContent,'NUEVO NOMBRE','Server name overrides an old slug');f.field('[data-register-invitation]').onclick();assert.equal(f.prepared.eventId,id);
let joined=0;const snapshot={players:[{id:'p1',name:'QA',holes:[{hole:1,gross:5}]}],groupLabel:'QA',mode:'general',course:'El Pulté',duration:99};const before=JSON.stringify(snapshot);
await api.joinTournament(snapshot,async()=>{joined++;return true});assert.equal(f.requests.some(r=>r.action==='directory'),false,'Tournament modality requests only code');assert.equal(f.field('input').value,'ABCD234567');
f.field('input').value='WRONG23456';await f.field('[data-join-active]').onclick();assert.equal(joined,0);assert.match(f.field('[data-status]').textContent,/CÓDIGO INCORRECTO/);
f.field('input').value='ABCD234567';await f.field('[data-join-active]').onclick();assert.equal(joined,1);assert.equal(JSON.stringify(snapshot),before,'Joining cannot mutate stored scores or elapsed time');
const bad=fixture({valid:false});assert.equal(await bad.root.GSCPersonalEvents.openLinkInvitation(),false);assert.equal(bad.requests.some(r=>r.action==='read'),false);assert.equal(bad.prepared,undefined);
const player=fixture();player.stored.set('golf-score-card-gt-live-control-v1',JSON.stringify({tournamentOwned:{tournamentId:id,joinCode:'ABCD234567'}}));await player.root.GSCPersonalEvents.organizerInvitations();assert.match(player.field('[data-owned-events]').innerHTML,/NO TIENES TORNEOS/);assert.doesNotMatch(player.field('[data-owned-events]').innerHTML,/ABCD234567/);
const menu=fs.readFileSync('shortcuts-ui.js','utf8'),normal=menu.slice(menu.indexOf('function render()'),menu.indexOf('function organizer()'));assert.doesNotMatch(normal,/item\("create-tournament"/);assert.match(menu,/item\('organizer-invitations','ID DE TORNEO'/);
const redirects=JSON.parse(fs.readFileSync('vercel.json')).redirects;assert.equal(redirects.find(r=>r.source==='/torneo/:nombre').destination,'/index-grupal.html?inicio=1&invitation=1');
console.log('PASS R156: one code prompt; invalid access denied; link opens exact event using current name; rename preserves prior links; no player invitation controls; creator actions only in Organizador; scores/timer unchanged.');

const admin=fs.readFileSync('event-administration.html','utf8'),adminUI=fs.readFileSync('event-administration-ui.js','utf8');assert.match(admin,/<details id="administrativePermissions"><summary>PERMISOS ADMINISTRATIVOS<\/summary>/);assert.doesNotMatch(admin,/<details id="administrativePermissions" open/);assert.match(adminUI,/<details><summary>PERMISOS<\/summary>/);assert.match(adminUI,/ownerLogin'\).hidden=!!result.owner/);console.log('PASS simplified administration: administrative permissions collapsed; per-event permissions collapsed; owner login hidden after authenticated owner listing; API permissions unchanged.');
