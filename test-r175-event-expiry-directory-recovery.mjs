import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {ensurePersonalAccess,eventScope} from './api/_lib/personal-event-access.js';
import {ensureEventAdministration} from './api/_lib/event-administration.js';
import {ensureEventLifecycle,refreshEventLifecycles} from './api/_lib/event-lifecycle.js';
import {handleTournamentScoreDirectory} from './api/tournament-score-directory.js';

const db=new PGlite();
for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
const sql=async(strings,...values)=>(await db.query(strings.reduce((query,part,index)=>query+(index?'$'+index:'')+part,''),values)).rows;
await ensurePersonalAccess(sql);await ensureEventAdministration(sql);await ensureEventLifecycle(sql);
const snapshot={players:[{id:'player-1',holes:[{hole:1,gross:5},{hole:2,gross:4}]}]};

async function addExpiredEvent({name,manualRevoke=false,deleted=false}){
 const [event]=await sql`INSERT INTO live_tournaments(name,organizer_secret_hash,viewer_token_hash,join_code_hash,status,created_at,expires_at,base_expires_at,revoked_at,last_score_at) VALUES(${name},${name+'-org'},${name+'-view'},${name+'-code'},'revoked',now()-interval '3 days',now()-interval '2 days',now()+interval '5 days',now()-interval '2 days',now()-interval '3 days') RETURNING id`;
 await sql`INSERT INTO gsc_personal_events(event_id,event_kind,owner_account_id,status) VALUES(${event.id}::uuid,'tournament','owner','closed')`;
 await sql`INSERT INTO gsc_personal_audit(event_id,event_kind,actor_account_id,action,details) VALUES(${event.id}::uuid,'tournament','system','expired','{}'::jsonb)`;
 const [stream]=await sql`INSERT INTO live_streams(round_client_id,scope,group_label,selected_player_ids,consent,publisher_secret_hash,viewer_token_hash,tournament_id,current_snapshot,status,last_score_at,expires_at,revoked_at) VALUES(${'round-'+name},'group','GRUPO','["player-1"]','{}',${name+'-pub'},${name+'-stream'},${event.id}::uuid,${JSON.stringify(snapshot)}::jsonb,'revoked',now()-interval '3 days',now()-interval '2 days',now()-interval '2 days') RETURNING id`;
 if(manualRevoke)await sql`INSERT INTO live_events(tournament_id,event_type) VALUES(${event.id}::uuid,'revoked')`;
 if(deleted)await sql`INSERT INTO gsc_event_deletions(event_id,event_kind,event_name,actor_account_id,recipient_name,reason) VALUES(${event.id}::uuid,'tournament',${name},'owner','Owner','deleted manually')`;
 return{eventId:event.id,streamId:stream.id};
}

const recoverable=await addExpiredEvent({name:'FAMILY'}),manual=await addExpiredEvent({name:'MANUAL REVOCATION',manualRevoke:true}),deleted=await addExpiredEvent({name:'MANUAL DELETION',deleted:true});
await refreshEventLifecycles(sql);
const [restored]=await sql`SELECT status,base_expires_at,expires_at FROM live_tournaments WHERE id=${recoverable.eventId}::uuid`;
assert.equal(restored.status,'active','System expiry is reversed only while the original configured deadline is still in the future');
assert.ok(new Date(restored.expires_at)>new Date(),'Recovered tournament remains listable');
const [restoredStream]=await sql`SELECT status,expires_at,current_snapshot FROM live_streams WHERE id=${recoverable.streamId}::uuid`;
assert.equal(restoredStream.status,'active','Scores for an auto-expired tournament are restored');
assert.ok(new Date(restoredStream.expires_at)<=new Date(),'Restoration never extends stream write permission');
assert.equal(restoredStream.current_snapshot.players[0].holes.length,2,'Persisted holes are retained');
const visible=await sql`SELECT id,name FROM live_tournaments WHERE status='active' AND expires_at>now() AND id=${recoverable.eventId}::uuid`;
assert.equal(visible.length,1,'Organizer/global tournament-directory query sees the recovered Family');
const visibleScores=await sql`SELECT id,current_snapshot FROM live_streams WHERE tournament_id=${recoverable.eventId}::uuid AND status='active'`;
assert.equal(visibleScores.length,1,'The active tournament Scores view retains the last published card even after its writer token expires');
async function directoryCall(body){let status=200,payload;await handleTournamentScoreDirectory({method:'POST',headers:{host:'epg-caddy.vercel.app'},body},{setHeader(){},status(code){status=code;return this},json(value){payload=value}},()=>sql,fetch,{});return{status,...payload}}
const directory=await directoryCall({action:'list-local'});assert.ok(directory.events.some(event=>event.id===recoverable.eventId&&event.name==='FAMILY'),'The real directory endpoint lists recovered Family');
const scores=await directoryCall({action:'read-local',eventId:recoverable.eventId});assert.equal(scores.status,200);assert.equal(scores.streams.length,1,'The real Scores endpoint includes the last published card despite writer-token expiry');
for(const id of [manual.eventId,deleted.eventId])assert.equal((await sql`SELECT status FROM live_tournaments WHERE id=${id}::uuid`)[0].status,'revoked','Manual revocation and deletion must never be reversed');
await refreshEventLifecycles(sql);
assert.equal((await sql`SELECT count(*)::int AS n FROM gsc_personal_audit WHERE event_id=${recoverable.eventId}::uuid AND action='expired'`)[0].n,1,'Recovery does not add duplicate expiry receipts');
await db.close();
console.log('PASS R175 expiry recovery: configured lifetime, Family directory visibility and scores restored; manual revoke/delete preserved.');
