import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
import assert from 'node:assert/strict';
import {createHash,randomBytes} from 'node:crypto';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handlePersonalEvents,resolveEventIdentity} from './api/personal-events.js';
import {createDeviceEventIdentity} from './api/_lib/device-event-identity.js';
import {handleEventAdministration} from './api/event-administration.js';
import {eventScope} from './api/_lib/personal-event-access.js';
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
 const deleted=await call(handleEventAdministration,{action:'delete',...event,confirmName:created.name,reason:'Prueba autorizada'});assert.equal(deleted.status,200);assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_events WHERE event_id=${created.eventId}::uuid`)[0].n,0,'Deletion physically removes the personal event');assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_members WHERE event_id=${created.eventId}::uuid`)[0].n,0);assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_event_admin_grants WHERE event_id=${created.eventId}::uuid`)[0].n,0);assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_audit WHERE event_id=${created.eventId}::uuid`)[0].n,0);assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_event_deletions WHERE event_id=${created.eventId}::uuid`)[0].n,0,'No deletion archive is retained');assert.equal(deleted.receipt.grant_id,grant.grantId);assert.equal(deleted.receipt.actor_account_id,'chosen');assert.equal(deleted.receipt.recipient_name,'Organizador elegido');assert.equal((await call(handleEventAdministration,{action:'delete',...event,confirmName:created.name,reason:'Otra vez'})).status,404);
 globalOwner=true;account={id:'app-owner',name:'Propietario'};const receipts=await call(handleEventAdministration,{action:'list'});assert.equal(receipts.receipts.some(r=>r.event_id===created.eventId),false);globalOwner=false;
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
// R185: delete only the selected published round, after explicit double confirmation.
for(const kind of ['tournament','private']){
 const scoped=eventScope(sql,kind);
 const [parent]=await scoped`INSERT INTO live_tournaments(name,organizer_secret_hash,viewer_token_hash,join_code_hash,expires_at) VALUES('ROUND PARENT',${'round-org-'+kind},${'round-view-'+kind},${'round-join-'+kind},now()+interval '1 day') RETURNING id`;
 await sql`INSERT INTO gsc_personal_events(event_id,event_kind,owner_account_id) VALUES(${parent.id}::uuid,${kind},'round-organizer')`;
 const createStream=async(label,eventId)=>(await scoped`INSERT INTO live_streams(round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,current_snapshot,expires_at) VALUES(${'round-'+label+'-'+kind},'group',${label},'{}',${'pub-'+label+'-'+kind},${'viewer-'+label+'-'+kind},${eventId}::uuid,'{}',now()+interval '1 day') RETURNING id`)[0];
 const independent=await createStream('Independent',null),selected=await createStream('Selected',parent.id),sibling=await createStream('Sibling',parent.id);
 const payload=(stream,label)=>({action:'delete-round',roundId:stream.id,eventKind:kind,confirmLabel:label,confirmedTwice:true});
 globalOwner=false;account={id:'outsider',name:'Other'};
 assert.equal((await call(handleEventAdministration,payload(independent,'Independent'))).code,'ROUND_ADMIN_REQUIRED');
 assert.equal((await call(handleEventAdministration,payload(selected,'Selected'))).code,'EVENT_ADMIN_REQUIRED');
 globalOwner=true;account={id:'app-owner',name:'Propietario'};
 assert.equal((await call(handleEventAdministration,{...payload(independent,'Independent'),confirmedTwice:false})).code,'ROUND_DOUBLE_CONFIRMATION_REQUIRED');
 assert.equal((await call(handleEventAdministration,payload(independent,'wrong'))).code,'ROUND_DOUBLE_CONFIRMATION_REQUIRED');
 assert.equal((await call(handleEventAdministration,payload(independent,'Independent'))).status,200);
 assert.equal((await call(handleEventAdministration,payload(independent,'Independent'))).status,404);
 globalOwner=false;account={id:'round-organizer',name:'Organizer'};
 assert.equal((await call(handleEventAdministration,payload(selected,'Selected'))).status,200);
 assert.equal((await scoped`SELECT count(*)::int AS n FROM live_streams WHERE id=${sibling.id}::uuid`)[0].n,1,'Sibling round remains');
 assert.equal((await scoped`SELECT count(*)::int AS n FROM live_tournaments WHERE id=${parent.id}::uuid`)[0].n,1,'Parent event remains');
}
globalOwner=true;account={id:'app-owner',name:'Propietario'};
let relayed;
const relayId='11111111-1111-4111-8111-111111111111';let relayStatus,relayResult;
await handleEventAdministration({method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877',cookie:'owner-session'},body:{action:'remote-delete-round',source:'lab',roundId:relayId,eventKind:'private',confirmLabel:'GROUP',confirmedTwice:true}},{setHeader(){},status(n){relayStatus=n;return this},json(v){relayResult=v}},()=>sql,owner,identity,async(url,options)=>{relayed={url,options};return Response.json({ok:true,roundId:relayId})},{});
assert.equal(relayStatus,200);assert.equal(relayResult.ok,true);assert.equal(relayed.url,'https://golf-sc-gt-lab.vercel.app/api/event-administration');assert.equal(relayed.options.headers.Cookie,'owner-session');assert.deepEqual(JSON.parse(relayed.options.body),{action:'delete-round',roundId:relayId,eventKind:'private',confirmLabel:'GROUP',confirmedTwice:true});
console.log('PASS R185 round deletion: owner independent; organizer selected group; outsiders denied; double confirmation required; sibling/event retained; replay denied; exact authenticated peer target.');

// R189: an expired owner/code session must fall back only to a valid device identity.
globalOwner=false;account={id:'creator',name:'Creador'};
const deviceRes={setHeader(name,value){if(name==='Set-Cookie')this.cookie=value}};
const device=await createDeviceEventIdentity(deviceRes,sql);
const deviceCreated=await call(handlePersonalEvents,{action:'create',eventKind:'tournament',name:'TORNEO IDENTIDAD DISPOSITIVO',...config});
assert.equal(deviceCreated.status,200);
await sql`UPDATE gsc_personal_events SET owner_account_id=${device.id} WHERE event_id=${deviceCreated.eventId}::uuid`;
const cookie=`gsc_code_session=expired; ${deviceRes.cookie.split(';')[0]}`;
const unauthorized=async()=>{throw Object.assign(new Error('ACCOUNT_UNAUTHORIZED'),{code:'ACCOUNT_UNAUTHORIZED',status:401})};
let recoveredStatus=200,recoveredBody;
await handleEventAdministration(
 {method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877',cookie},body:{action:'delete',eventId:deviceCreated.eventId,eventKind:'tournament',confirmName:deviceCreated.name,reason:'Confirmación del organizador'}},
 {setHeader(){},status(n){recoveredStatus=n;return this},json(value){recoveredBody=value}},
 ()=>sql,owner,(req)=>resolveEventIdentity(req,{setHeader(){}},sql,'delete',unauthorized)
);
assert.equal(recoveredStatus,200,JSON.stringify(recoveredBody));
assert.equal(recoveredBody.ok,true,'valid device owner deletes without a fresh owner login');
console.log('PASS R189 stale owner session recovery: valid device owner can delete in the same confirmation; unrelated identities remain denied.');

await db.close();console.log('PASS event administration: owner full access; creator own event; recipient-bound single redemption; other player denied; delegates cannot delegate; name required; physical deletion without archive; exact 24h expiry; owner retained.');

// R152: one confirmation, no typed name/reason, no deletion before its click.
const uiSource=await readFile('event-administration-ui.js','utf8');
const returnTargetSource=uiSource.match(/function preserveReturnTarget\(\)\{[^\n]*\}/)?.[0];assert.ok(returnTargetSource,'Admin back link must use the preserved round destination');
for(const [search,expected] of [['?returnTo=%2Findex-grupal.html%3FpersonalEvent%3Devent-a%26personalKind%3Dprivate%26personalAccount%3Daccount-a%26round_return%3D1','/index-grupal.html?personalEvent=event-a&personalKind=private&personalAccount=account-a&round_return=1'],['?returnTo=https%3A%2F%2Fevil.example%2Findex-grupal.html','/fallback'],['?returnTo=%2Flive-hub.html','/fallback']]){const link={href:'/fallback'},context={URL,URLSearchParams,document:{querySelector:()=>link},location:{origin:'https://lab.example',search}};vm.createContext(context);vm.runInContext(returnTargetSource+';preserveReturnTarget();',context);assert.equal(link.href,expected,'Admin return preserves the active round only on the same origin and scorecard path')}
const removeSource=uiSource.match(/function remove\(e\)\{[^\n]*\}/)[0];
for(const ok of [true,false]){
 const button={disabled:false},cancel={};let content='',requests=[],closed=0,refreshed=0;
 const context={cachedLocal:{source:'lab'},cachedDirectory:{},window:{},open:html=>{content=html},escape:s=>String(s).replaceAll('<','&lt;'),$:id=>id==='confirmDelete'?button:id==='cancelDelete'?cancel:{close:()=>closed++},event:e=>({eventId:e.id,eventKind:e.event_kind}),call:async(action,payload)=>{requests.push({action,payload});return {ok}},showStatus(){},refresh:async()=>{refreshed++}};
 vm.createContext(context);vm.runInContext(removeSource,context);context.remove({id:'selected-id',event_kind:'tournament',source:'lab',name:'Evento <ejemplo>'});
 assert.match(content,/CONFIRMA ELIMINAR/);assert.match(content,/¿DESEAS ELIMINAR ESTE TORNEO/);assert.equal(typeof cancel.onclick,'function');assert.match(content,/Evento &lt;ejemplo>/);assert.doesNotMatch(content,/<input|Escribe exactamente|Motivo|confirmName/);assert.equal(requests.length,0,'opening confirmation never deletes');cancel.onclick();assert.equal(closed,1,'Cancel closes without deletion');assert.equal(requests.length,0);closed=0;
 await button.onclick();assert.equal(requests.length,1);assert.equal(requests[0].action,'delete');assert.equal(requests[0].payload.eventId,'selected-id');assert.equal(requests[0].payload.confirmName,'Evento <ejemplo>');assert.ok(requests[0].payload.reason);assert.equal(closed,ok?1:0);assert.equal(refreshed,ok?1:0);assert.equal(button.disabled,ok);
}
console.log('PASS R152 single deletion confirmation: selected event; no text fields; one request on click; error stays visible and enables retry.');

// R183: event cards keep their title, Scores, code and actions while hiding environment and permission copy.
const cardStart=uiSource.indexOf('function administrationCard(e){');const cardEnd=uiSource.indexOf('\n}',cardStart)+2;const cardSource=uiSource.slice(cardStart,cardEnd);assert.ok(cardSource.startsWith('function administrationCard(e){'),'Event administration card renderer must remain available');
const cardContext={escape:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),scoresHref:(_e,monitor)=>'/live-hub.html?monitor='+monitor,cachedLocal:{source:'lab'}};
vm.createContext(cardContext);vm.runInContext(cardSource+';this.renderAdministrationCard=administrationCard;',cardContext);
for(const canAdminister of [false,true]){const markup=cardContext.renderAdministrationCard({id:'event-1',source:'production',event_kind:'tournament',name:'Friends',canAdminister,joinCode:'ABC123'});assert.match(markup,/<h3>Friends<\/h3>/);assert.match(markup,/SCORES · GENERAL/);assert.match(markup,/SCORES · CATEGORÍAS/);assert.match(markup,/ID DE TORNEO/);assert.match(markup,/COMPARTIR/);assert.match(markup,/ELIMINAR/);assert.doesNotMatch(markup,/TORNEO · PRODUCCIÓN|CONSULTA DE SCORES|ELIMINAR REQUIERE AUTORIZACIÓN DEL ORGANIZADOR/)}
console.log('PASS R183 event administration cards: title, Scores, code and actions retained; metadata removed.');


