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
for(const event of [recoverable,manual,deleted]){
 for(const table of ['live_tournaments','live_streams','live_events','gsc_personal_events','gsc_personal_audit','gsc_event_deletions']){const column=table==='live_tournaments'?'id':table==='live_streams'||table==='live_events'?'tournament_id':'event_id';assert.equal((await db.query('SELECT count(*)::int AS n FROM '+table+' WHERE '+column+'=$1',[event.eventId])).rows[0].n,0,'No revoked event survives in '+table)}
 let status=200,payload;await handleTournamentScoreDirectory({method:'POST',headers:{host:'epg-caddy.vercel.app'},body:{action:'read-local',eventId:event.eventId}},{setHeader(){},status(n){status=n;return this},json(v){payload=v}},()=>sql,fetch,{});assert.equal(status,410);assert.equal(payload.code,'LIVE_EXPIRED');
}
await refreshEventLifecycles(sql);
assert.equal((await sql`SELECT count(*)::int AS n FROM live_tournaments`)[0].n,0,'Refresh never restores removed events');
await db.close();
console.log('PASS deletion permanence: manual and automatic removal leave no directory, scores, stream or archive record; refresh cannot restore them.');
