import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {PGlite} from '@electric-sql/pglite';
import {handlePersonalEvents} from './api/personal-events.js';
import {handleTournamentScoreDirectory} from './api/tournament-score-directory.js';
import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
const db=new PGlite();
for(const f of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(f,'utf8'));
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
let account={id:'creator',name:'Creator'};
await authorizeTestOrganizer(sql,account.id);
async function personal(body){let result,status=200;await handlePersonalEvents({method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877'},body},{setHeader(){},status(n){status=n;return this},json(v){result=v}},()=>sql,async()=>account);return {status,...result}}
const created=[];
for(const course of ['EL PULTÉ GOLF','SAN ISIDRO','MAYAN GOLF']){const event=await personal({action:'create',eventKind:'tournament',name:course,course,playedAt:'2026-10-06',mode:'general',categories:['a']});assert.equal(event.ok,true);created.push(event)}
async function directory(body,fetcher=async()=>({ok:true,json:async()=>({ok:true,events:[]})})){let result;await handleTournamentScoreDirectory({method:'POST',headers:{host:'epg-caddy.vercel.app'},body},{setHeader(){},status(){return this},json(v){result=v}},()=>sql,fetcher,{GSC_ENVIRONMENT:'production'});return result}
const group=await personal({action:'create',eventKind:'private',name:'OTHER CITY GROUP',course:'COUNTRY CLUB',playedAt:'2026-10-06',mode:'general',categories:['a']});assert.equal(group.ok,true);
const result=await directory({action:'list',withCodes:true},async(url,init)=>{assert.equal(JSON.parse(init.body).withCodes,true);return {ok:true,json:async()=>({ok:true,events:[{id:'11111111-1111-4111-8111-111111111111',name:'LAB OTHER DEVICE',status:'active',joinCode:'0123456789'}]})}});
assert.equal(result.events.length,4);assert.equal(result.partial,false);
account={id:'different-device',name:'Other'};
for(const e of result.events.filter(e=>e.source==='production')){assert.match(e.joinCode,/^[A-Z0-9]{10}$/);assert.equal((await personal({action:'inspect-tournament-code',joinCode:e.joinCode})).eventId,e.id)}
const global=await directory({action:'list',withCodes:true,includeGroups:true},async(url,init)=>{assert.equal(JSON.parse(init.body).includeGroups,true);return {ok:true,json:async()=>({ok:true,events:[{id:group.eventId,name:'LAB GROUP SAME ID',status:'active',event_kind:'private',joinCode:'9876543210'}]})}});
assert.equal(global.events.length,5);assert.equal(global.partial,false);
const publicGroup=global.events.find(e=>e.source==='production'&&e.event_kind==='private');assert.equal(publicGroup.id,group.eventId);assert.match(publicGroup.joinCode,/^[A-Z0-9]{10}$/);
assert.equal((await personal({action:'join-code',eventId:group.eventId,eventKind:'private',joinCode:publicGroup.joinCode,players:[{id:'p1',name:'OTHER DEVICE',handicap:10,tournamentCategory:'a'}],groupLabel:'CITY GROUP',mode:'general',course:'COUNTRY CLUB'})).ok,true);
await sql`INSERT INTO live_private_streams(id,round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,expires_at,current_snapshot) SELECT ('00000000-0000-4000-8000-'||lpad(i::text,12,'0'))::uuid,'global-card-'||i,'group','OTHER CITY','{}'::jsonb,md5(i::text)||md5(i::text),md5((i+1000)::text)||md5((i+1000)::text),${group.eventId}::uuid,now()+interval '1 day',${JSON.stringify({course:'COUNTRY CLUB',players:[{id:'p1',name:'OTHER DEVICE',handicap:10,whatsapp:'PRIVATE',holes:[{hole:1,gross:5,net:4}]}]})}::jsonb FROM generate_series(1,101) i`;
const globalRead=await directory({action:'read-local',eventId:group.eventId,eventKind:'private'});assert.equal(globalRead.ok,true);assert.equal(globalRead.kind,'private');assert.equal(globalRead.streams.length,101);assert.ok(globalRead.streams.every(s=>!s.snapshot.players[0].whatsapp));
const peerRead=await directory({action:'read',source:'lab',eventId:group.eventId,eventKind:'private'},async(url,init)=>{assert.equal(JSON.parse(init.body).eventKind,'private');return {ok:true,status:200,json:async()=>globalRead}});assert.equal(peerRead.kind,'private');
const initial=result.events.find(e=>e.source==='production').joinCode;
await sql`UPDATE gsc_tournament_entry_codes SET consumed_at=now(),consumed_account_id='someone' WHERE code=${initial}`;
const updated=await directory({action:'list-local',withCodes:true});assert.equal(updated.events.length,3);assert.ok(updated.events.every(e=>e.joinCode&&e.joinCode!==initial));
const plain=await directory({action:'list-local'});assert.ok(plain.events.every(e=>!e.joinCode));
const ui=await readFile('event-administration-ui.js','utf8'),personalUi=await readFile('personal-events.js','utf8');
const context={cachedLocal:{source:'production'},escape:String};vm.createContext(context);
for(const name of ['administrationRows','scoresHref','administrationCard'])vm.runInContext(ui.match(new RegExp('function '+name+'\\([^]*?\\n\\}'))?.[0]||ui.match(new RegExp('function '+name+'\\([^\\n]*'))[0],context);
const rows=context.administrationRows({ok:false,source:'production',events:[]},global);
assert.equal(rows.length,global.events.filter(e=>e.event_kind==='tournament').length);assert.ok(rows.every(row=>row.event_kind==='tournament'),'Administration lists tournaments only');
for(const row of rows){const card=context.administrationCard(row);assert.ok(card.includes(row.joinCode));assert.ok(card.includes('data-share-event'));assert.ok(card.includes('SCORES · GENERAL'))}
assert.ok(personalUi.includes("withCodes:true"));assert.ok(personalUi.includes("directory.events||[]"));assert.ok(personalUi.includes("if(event.joinCode)return {ok:true,joinCode:event.joinCode}"));
assert.equal(rows.filter(e=>e.event_kind==='private').length,0,'private groups remain in the API directory but not Administration');
await db.close();console.log('PASS R181: global tournaments and groups without admin session; both sources and same-ID collision; group code joins from unrelated device; public group Scores and peer kind; legacy tournament-only directory preserved.');
