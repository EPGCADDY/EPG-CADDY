import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {readFile} from 'node:fs/promises';
import {readDeviceEventIdentity} from './api/_lib/device-event-identity.js';
import {resolveEventIdentity,handlePersonalEvents} from './api/personal-events.js';
// Explicit auth-provider fixture: device cookie is not an owner login; this isolated DB test must never call live Neon Auth.
const realFetch=globalThis.fetch;globalThis.fetch=async(url,options)=>String(url).includes('/get-session')?new Response('{}',{status:401}):realFetch(url,options);
const db=new PGlite(),sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
let cookie='';const response={setHeader(name,value){if(name==='Set-Cookie')cookie=value}};
const request={method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877'}};
const owner=await resolveEventIdentity(request,response,sql,'identity');
assert.match(owner.id,/^device:/);assert.match(cookie,/HttpOnly; Secure; SameSite=Lax/);
assert.equal((await readDeviceEventIdentity({...request,headers:{...request.headers,cookie}},sql)).id,owner.id);
assert.equal(await readDeviceEventIdentity({...request,headers:{cookie:'gsc_event_device='+'A'.repeat(43)}},sql),null);
const viewer=await resolveEventIdentity({...request,headers:{cookie:cookie+'; gsc_code_session='+'B'.repeat(43)}},response,sql,'identity',async()=>({id:'viewer',entryRole:'viewer'}));assert.equal(viewer.id,'viewer','Explicit viewer code retains read-only identity');
let recoveredCookie='';const staleCodeResponse={setHeader(name,value){if(name==='Set-Cookie')recoveredCookie=value}};
const recovered=await resolveEventIdentity({...request,headers:{...request.headers,cookie:'gsc_code_session=expired'}},staleCodeResponse,sql,'identity');
assert.match(recovered.id,/^device:/,'Expired code-only sessions recover by creating a device identity');
assert.match(recoveredCookie,/gsc_event_device=/,'Recovered identity must set the device cookie for the next tournament action');
async function call(body,identityCookie){let status=200,result;await handlePersonalEvents(Object.assign(Object.create({method:request.method,headers:{...request.headers,cookie:identityCookie}}),{method:request.method,body}),{setHeader(){},status(n){status=n;return this},json(v){result=v}},()=>sql,async()=>({id:'different-provider-account',name:'Wrong provider identity'}));return{status,...result}}
await authorizeTestOrganizer(sql,owner.id);
const created=await call({action:'create',eventKind:'tournament',name:'Copa Santa Delfina',course:'El Pulté',playedAt:'2026-09-30',mode:'general',categories:['senior'],groupLabel:'Friends',players:[{id:'p1',name:'Jaime',handicap:13,tournamentCategory:'senior'}]},cookie);assert.equal(created.status,200);assert.ok(created.eventId);
const read=await call({action:'read',eventKind:'tournament',eventId:created.eventId},cookie);assert.equal(read.status,200);assert.equal(read.membership.role,'organizer');assert.equal(read.membership.players[0].name,'Jaime');
const otherHeaders={setHeader(name,value){if(name==='Set-Cookie')this.cookie=value}};await resolveEventIdentity(request,otherHeaders,sql,'identity');const denied=await call({action:'read',eventKind:'tournament',eventId:created.eventId},otherHeaders.cookie);assert.equal(denied.code,'PERSONAL_EVENT_FORBIDDEN');
await sql`UPDATE gsc_event_devices SET expires_at=now()-interval '1 second' WHERE id=${owner.id}`;assert.equal(await readDeviceEventIdentity({...request,headers:{cookie}},sql),null);
await db.close();globalThis.fetch=realFetch;console.log('PASS R147.2: no-credential device identity, secure session, persistent owner, create/read tournament with roster, other device denied, viewer remains read-only, expired and forged sessions rejected');
