import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
import assert from 'node:assert/strict';
import {createHash,randomBytes} from 'node:crypto';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handlePersonalEvents} from './api/personal-events.js';
import {handleEventAdministration} from './api/event-administration.js';
const administrationUi=await readFile('event-administration-ui.js','utf8');assert.match(administrationUi,/const deleting=.*data-delete/,'Every event card renders a delete control');assert.match(administrationUi,/aria-label=.*escape\(e\.name\)/,'Delete control names its round for assistive technology');
const db=new PGlite();for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
let account={id:'creator',name:'Creador'},globalOwner=false;
const identity=async()=>account,owner=async()=>{if(!globalOwner)throw Object.assign(new Error('OWNER_REQUIRED'),{code:'OWNER_REQUIRED',status:403});return account};
async function call(handler,body){let status=200,result;await handler({method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877'},body},{setHeader(){},status(n){status=n;return this},json(v){result=v}},()=>sql,...(handler===handlePersonalEvents?[identity]:[owner,identity]));return{status,...result}}
await authorizeTestOrganizer(sql,'creator');
const config={course:'EL PULTÉ GOLF',playedAt:'2026-10-02',mode:'general',categories:['a']};
for(const kind of ['private','tournament']){
 account={id:'creator',name:'Creador'};const created=await call(handlePersonalEvents,{action:'create',eventKind:kind,name:'PRUEBA '+kind,...config});assert.equal(created.status,200);const event={eventId:created.eventId,eventKind:kind};
 const grant=await call(handleEventAdministration,{action:'issue',...event,recipientAccountId:'chosen',recipientName:'Organizador elegido'});assert.equal(grant.status,200);
 account={id:'outsider',name:'Otro jugador'};assert.equal((await call(handleEventAdministration,{action:'redeem',code:grant.code})).code,'ADMIN_CODE_INVALID');assert.equal((await call(handleEventAdministration,{action:'delete',...event,confirmName:created.name,reason:'Prueba'})).code,'EVENT_ADMIN_REQUIRED');
 account={id:'chosen',name:'Organizador elegido'};assert.equal((await call(handleEventAdministration,{action:'redeem',code:grant.code})).status,200);assert.equal((await call(handleEventAdministration,{action:'redeem',code:grant.code})).code,'ADMIN_CODE_INVALID');assert.equal((await call(handleEventAdministration,{action:'issue',...event,recipientAccountId:'outsider',recipientName:'Otro'})).code,'EVENT_OWNER_REQUIRED');assert.equal((await call(handleEventAdministration,{action:'delete',...event,confirmName:'incorrecto',reason:'Prueba'})).code,'EVENT_NAME_CONFIRMATION_REQUIRED');
 const deleted=await call(handleEventAdministration,{action:'delete',...event,confirmName:created.name,reason:'Prueba autorizada'});assert.equal(deleted.status,200);assert.equal((await sql`SELECT count(*)::int AS n FROM live_tournaments WHERE id=${created.eventId}::uuid`)[0].n,0,'Manual deletion physically removes the LIVE round');assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_events WHERE event_id=${created.eventId}::uuid`)[0].n,0,'Manual deletion physically removes personal event data');assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_members WHERE event_id=${created.eventId}::uuid`)[0].n,0,'Manual deletion physically removes member data');assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_audit WHERE event_id=${created.eventId}::uuid`)[0].n,0,'Manual deletion physically removes event audit');assert.equal((await call(handleEventAdministration,{action:'delete',...event,confirmName:created.name,reason:'Otra vez'})).status,404);
 globalOwner=true;account={id:'app-owner',name:'Propietario'};const receipts=await call(handleEventAdministration,{action:'list'});assert.deepEqual(receipts.receipts,[],'Deleted rounds leave no retained deletion receipt');globalOwner=false;
}
account={id:'creator',name:'Creador'};const c=await call(handlePersonalEvents,{action:'create',eventKind:'tournament',name:'VENCIMIENTO',...config}),event={eventId:c.eventId,eventKind:'tournament'};
const grant=await call(handleEventAdministration,{action:'issue',...event,recipientAccountId:'chosen',recipientName:'Delegado'});account={id:'chosen',name:'Delegado'};await call(handleEventAdministration,{action:'redeem',code:grant.code});await sql`UPDATE gsc_event_admin_grants SET expires_at=now()+interval '1 minute' WHERE id=${grant.grantId}::uuid`;await sql`UPDATE live_tournaments SET completed_at=now(),expires_at=now()+interval '1 day' WHERE id=${c.eventId}::uuid`;assert.equal((await call(handleEventAdministration,{action:'list'})).status,200);const deadline=await sql`SELECT expires_at FROM gsc_event_admin_grants WHERE id=${grant.grantId}::uuid`;assert.ok(new Date(deadline[0].expires_at)-Date.now()>86300000,'Completion must set delegate expiry to finish +24h, not original deadline');await sql`UPDATE live_tournaments SET completed_at=now()-interval '24 hours',expires_at=now()+interval '1 day' WHERE id=${c.eventId}::uuid`;
assert.equal((await call(handleEventAdministration,{action:'delete',...event,confirmName:c.name,reason:'Vencido'})).status,404);
account={id:'creator',name:'Creador'};const unfinished=await call(handlePersonalEvents,{action:'create',eventKind:'tournament',name:'INCOMPLETO',...config});globalOwner=true;account={id:'app-owner',name:'Propietario'};assert.equal((await call(handleEventAdministration,{action:'delete',eventId:unfinished.eventId,eventKind:'tournament',confirmName:unfinished.name,reason:'Control pleno del propietario'})).status,200);
const legacySecret=randomBytes(32).toString('base64url'),legacyHash=createHash('sha256').update(legacySecret).digest('hex'),wrongSecret=randomBytes(32).toString('base64url');
const [legacy]=await sql`INSERT INTO live_tournaments(name,mode,organizer_secret_hash,viewer_token_hash,join_code_hash,expires_at) VALUES('TORNEO LEGADO','general',${legacyHash},${createHash('sha256').update(randomBytes(32)).digest('hex')},${createHash('sha256').update(randomBytes(32)).digest('hex')},now()+interval '1 day') RETURNING id`;
account={id:'legacy-owner',name:'Organizador anterior'};globalOwner=false;
const legacyEvent={eventId:legacy.id,eventKind:'tournament'};
assert.equal((await call(handleEventAdministration,{action:'claim-legacy',...legacyEvent,organizerSecret:wrongSecret})).code,'EVENT_OWNER_PROOF_INVALID','Wrong legacy secret cannot claim ownership');
assert.equal((await call(handleEventAdministration,{action:'delete',...legacyEvent,confirmName:'TORNEO LEGADO',reason:'Sin reclamar'})).code,'EVENT_ADMIN_REQUIRED','Legacy tournament is not deletable before proof');
assert.equal((await call(handleEventAdministration,{action:'claim-legacy',...legacyEvent,organizerSecret:legacySecret})).status,200,'Legacy organizer secret recovers ownership');
assert.equal((await call(handleEventAdministration,{action:'claim-legacy',...legacyEvent,organizerSecret:legacySecret})).status,200,'Claim is idempotent for the same owner');
assert.ok((await call(handleEventAdministration,{action:'list'})).events.some(e=>e.id===legacy.id),'Claimed legacy tournament appears in the organizer list');
account={id:'other-device',name:'Otro dispositivo'};
assert.equal((await call(handleEventAdministration,{action:'claim-legacy',...legacyEvent,organizerSecret:legacySecret})).code,'EVENT_ADMIN_REQUIRED','A second account cannot take an existing claim');
assert.equal((await call(handleEventAdministration,{action:'delete',...legacyEvent,confirmName:'TORNEO LEGADO',reason:'No soy dueño'})).code,'EVENT_ADMIN_REQUIRED');
account={id:'legacy-owner',name:'Organizador anterior'};
assert.equal((await call(handleEventAdministration,{action:'delete',...legacyEvent,confirmName:'TORNEO LEGADO',reason:'Eliminación autorizada'})).status,200,'Claimed legacy owner can delete with the normal receipt');
const adminUi=await readFile('event-administration-ui.js','utf8'),personalUi=await readFile('personal-events.js','utf8'),scoreCard=await readFile('live-hub.js','utf8');
assert.ok(adminUi.includes("const deleteLabel='ELIMINAR '+kind"),'Administration uses the event-specific delete label');
assert.ok(!adminUi.includes('ELIMINAR · ORGANIZADOR')&&!personalUi.includes('ELIMINAR · ORGANIZADOR'),'Legacy organizer label is removed');
assert.ok(personalUi.includes('async function administrationEvents(){await claimLegacyOwnedTournament();'),'Admin list first recovers the legacy owner');
assert.ok(scoreCard.includes('administrationEvents=await root.GSCPersonalEvents?.administrationEvents?.()||[]'),'Score Card loads recovered administration authority');
assert.ok(scoreCard.includes("button.textContent=authority?.event_kind==='private'?'ELIMINAR GRUPO':'ELIMINAR TORNEO'"),'Score Card exposes the proper delete label');
await db.close();console.log('PASS event administration: owner full access; creator own event; recipient-bound single redemption; other player denied; delegates cannot delegate; name required; deletion receipt; exact 24h expiry; owner retained.');

// R152: one confirmation, no typed name/reason, no deletion before its click.
const uiSource=await readFile('event-administration-ui.js','utf8');
const returnTargetSource=uiSource.match(/function preserveReturnTarget\(\)\{[^\n]*\}/)?.[0];assert.ok(returnTargetSource,'Admin back link must use the preserved round destination');
for(const [search,expected] of [['?returnTo=%2Findex-grupal.html%3FpersonalEvent%3Devent-a%26personalKind%3Dprivate%26personalAccount%3Daccount-a%26round_return%3D1','/index-grupal.html?personalEvent=event-a&personalKind=private&personalAccount=account-a&round_return=1'],['?returnTo=https%3A%2F%2Fevil.example%2Findex-grupal.html','/fallback'],['?returnTo=%2Flive-hub.html','/fallback']]){const link={href:'/fallback'},context={URL,URLSearchParams,document:{querySelector:()=>link},location:{origin:'https://lab.example',search}};vm.createContext(context);vm.runInContext(returnTargetSource+';preserveReturnTarget();',context);assert.equal(link.href,expected,'Admin return preserves the active round only on the same origin and scorecard path')}
const removeSource=uiSource.match(/function remove\(e\)\{[^\n]*\}/)[0];
for(const ok of [true,false]){
 const button={disabled:false},cancel={};let content='',requests=[],closed=0,refreshed=0;
 const context={cachedLocal:{source:'lab'},open:html=>{content=html},escape:s=>String(s).replaceAll('<','&lt;'),$:id=>id==='confirmDelete'?button:id==='cancelDelete'?cancel:{close:()=>closed++},event:e=>({eventId:e.id,eventKind:e.event_kind}),call:async(action,payload)=>{requests.push({action,payload});return {ok}},showStatus(){},refresh:async()=>{refreshed++}};
 vm.createContext(context);vm.runInContext(removeSource,context);context.remove({id:'selected-id',event_kind:'tournament',source:'lab',name:'Evento <ejemplo>'});
 assert.match(content,/CONFIRMA ELIMINAR/);assert.match(content,/¿DESEAS ELIMINAR ESTE TORNEO/);assert.equal(typeof cancel.onclick,'function');assert.match(content,/Evento &lt;ejemplo>/);assert.doesNotMatch(content,/<input|Escribe exactamente|Motivo|confirmName/);assert.equal(requests.length,0,'opening confirmation never deletes');cancel.onclick();assert.equal(closed,1,'Cancel closes without deletion');assert.equal(requests.length,0);closed=0;
 await button.onclick();assert.equal(requests.length,1);assert.equal(requests[0].action,'delete');assert.equal(requests[0].payload.eventId,'selected-id');assert.equal(requests[0].payload.confirmName,'Evento <ejemplo>');assert.ok(requests[0].payload.reason);assert.equal(closed,ok?1:0);assert.equal(refreshed,ok?1:0);assert.equal(button.disabled,ok);
}
console.log('PASS R152 single deletion confirmation: selected event; no text fields; one request on click; error stays visible and enables retry.');
