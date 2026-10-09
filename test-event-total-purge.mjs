import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const data=new Map([
 ['gsc-personal-events-v1',JSON.stringify({personal_deleted:{eventId:'deleted',eventKind:'tournament'},personal_kept:{eventId:'kept',eventKind:'tournament'}})],
 ['gsc-tournament-connect-selection-v1',JSON.stringify({id:'deleted',eventKind:'tournament',roundId:'round-deleted'})],
 ['golf-score-card-guatemala-active-round-v1',JSON.stringify({id:'round-deleted',personalEventId:'deleted',players:[{name:'Deleted player'}]})],
 ['golf-score-card-guatemala-round-archive-v1',JSON.stringify([{id:'round-deleted',players:[{name:'Deleted player'}]},{id:'round-kept',players:[{name:'Kept player'}]}])],
 ['golf-score-card-gt-live-hub-v1:account',JSON.stringify({generalToken:'personal_deleted',tournaments:[{token:'personal_deleted'},{token:'personal_kept'}],follows:[{token:'directory_lab_deleted'}]})],
 ['golf-score-card-gt-live-control-v1',JSON.stringify({stream:{tournamentId:'deleted',roundId:'round-deleted'},tournamentOwned:{tournamentId:'deleted',joinCode:'REMOVED'}})],
 ['golf-score-card-guatemala-master-sync-queue-v1',JSON.stringify([{entityId:'round-deleted',payload:{round:{clientRoundId:'round-deleted'}}},{entityId:'round-kept',payload:{round:{clientRoundId:'round-kept'}}}])],
 ['golf-score-card-guatemala-player-registry-v2',JSON.stringify([{id:'player-independent',name:'Kept profile'}])]
]);
const notifications=[],context={localStorage:{get length(){return data.size},key:i=>[...data.keys()][i],getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)},document:{addEventListener(){}},dispatchEvent:event=>notifications.push(event),CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail}},URL,URLSearchParams,TextEncoder};
vm.createContext(context);vm.runInContext(await readFile('personal-events.js','utf8'),context);
context.GSCPersonalEvents.purgeDeletedEvents([{eventId:'deleted',eventKind:'tournament'}]);
assert.equal(data.has('golf-score-card-guatemala-active-round-v1'),false);
assert.equal(data.has('gsc-tournament-connect-selection-v1'),false);
assert.deepEqual(JSON.parse(data.get('golf-score-card-guatemala-round-archive-v1')).map(item=>item.id),['round-kept']);
assert.deepEqual(JSON.parse(data.get('golf-score-card-gt-live-hub-v1:account')).tournaments.map(item=>item.token),['personal_kept']);
assert.deepEqual(JSON.parse(data.get('golf-score-card-guatemala-master-sync-queue-v1')).map(item=>item.entityId),['round-kept']);
assert.equal(JSON.stringify([...data.values()]).includes('Deleted player'),false);
assert.equal(JSON.stringify([...data.values()]).includes('REMOVED'),false);
assert.ok(data.get('golf-score-card-guatemala-player-registry-v2').includes('Kept profile'));
assert.deepEqual(Array.from(notifications[0].detail.roundIds),['round-deleted']);
console.log('PASS total client purge: ID, saved list, follows, active Score Card, local archive, codes and sync queue cleared; unrelated round/profile retained.');

const {PGlite}=await import('@electric-sql/pglite');
const {ensurePersonalAccess}=await import('./api/_lib/personal-event-access.js');
const {ensureEventLifecycle,ensureEventPurge,refreshEventLifecycles}=await import('./api/_lib/event-lifecycle.js');
const db=new PGlite();for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
const sql=async(strings,...values)=>(await db.query(strings.reduce((query,part,index)=>query+(index?'$'+index:'')+part,''),values)).rows;
await ensurePersonalAccess(sql);await ensureEventLifecycle(sql);await ensureEventPurge(sql);
const installedPersonal=await sql`SELECT oid,xmin::text AS revision FROM pg_proc WHERE proname IN ('gsc_personal_capacity','gsc_personal_can_publish') ORDER BY oid`;
await ensurePersonalAccess(sql);
assert.deepEqual(await sql`SELECT oid,xmin::text AS revision FROM pg_proc WHERE proname IN ('gsc_personal_capacity','gsc_personal_can_publish') ORDER BY oid`,installedPersonal,'Repeated polling must not redefine installed access functions');
console.log('PASS personal access initialization: function definitions remain unchanged across repeated requests.');
await db.exec(`CREATE TABLE gsc_live_shares(id uuid PRIMARY KEY,event_id uuid,event_kind text,issuer_stream_id uuid);CREATE TABLE gsc_live_share_sessions(share_id uuid REFERENCES gsc_live_shares(id));CREATE TABLE user_shortcuts(tournament_id text,stream_id text);CREATE TABLE tournaments(id uuid PRIMARY KEY);CREATE TABLE rounds(id uuid PRIMARY KEY,client_round_id text,tournament_id uuid,parent_round_id uuid);CREATE TABLE round_snapshots(round_id uuid REFERENCES rounds(id) ON DELETE CASCADE);CREATE TABLE card_artifacts(round_id uuid REFERENCES rounds(id));CREATE TABLE deliveries(round_id uuid REFERENCES rounds(id));CREATE TABLE player_handicap_events(round_id uuid REFERENCES rounds(id));CREATE TABLE player_tee_events(round_id uuid REFERENCES rounds(id));CREATE TABLE sync_mutations(entity_id text);`);
for(const automatic of [false,true]){
 const [event]=await sql`INSERT INTO live_tournaments(name,organizer_secret_hash,viewer_token_hash,join_code_hash,expires_at,completed_at) VALUES('PURGE',${'org-'+automatic},${'view-'+automatic},${'join-'+automatic},now()+interval '1 day',${automatic?new Date(Date.now()-86400001).toISOString():null}::timestamptz) RETURNING id`;
 const [stream]=await sql`INSERT INTO live_streams(round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,current_snapshot,expires_at) VALUES(${'round-'+automatic},'group','GROUP','{}',${'pub-'+automatic},${'stream-'+automatic},${event.id}::uuid,'{}',now()+interval '1 day') RETURNING id`;
 const roundId=event.id,shareId=stream.id;
 await sql`INSERT INTO gsc_personal_events(event_id,event_kind,owner_account_id) VALUES(${event.id}::uuid,'tournament','owner')`;
 await sql`INSERT INTO tournaments(id) VALUES(${event.id}::uuid)`;
 await sql`INSERT INTO rounds(id,client_round_id,tournament_id) VALUES(${roundId}::uuid,${'round-'+automatic},${event.id}::uuid)`;
 for(const table of ['round_snapshots','card_artifacts','deliveries','player_handicap_events','player_tee_events'])await db.query('INSERT INTO '+table+'(round_id) VALUES($1)',[roundId]);
 await sql`INSERT INTO sync_mutations(entity_id) VALUES(${'round-'+automatic})`;
 await sql`INSERT INTO gsc_live_shares(id,event_id,event_kind,issuer_stream_id) VALUES(${shareId}::uuid,${event.id}::uuid,'tournament',${stream.id}::uuid)`;
 await sql`INSERT INTO gsc_live_share_sessions(share_id) VALUES(${shareId}::uuid)`;
 await sql`INSERT INTO user_shortcuts(tournament_id,stream_id) VALUES(${event.id},${stream.id})`;
 await sql`INSERT INTO live_events(tournament_id,stream_id,event_type) VALUES(${event.id}::uuid,${stream.id}::uuid,'created')`;
 if(automatic)await refreshEventLifecycles(sql);else await sql`SELECT gsc_purge_event(${event.id}::uuid,'tournament')`;
 for(const table of ['live_tournaments','live_streams','live_events','gsc_personal_events','gsc_live_shares','gsc_live_share_sessions','user_shortcuts','rounds','tournaments','round_snapshots','card_artifacts','deliveries','player_handicap_events','player_tee_events','sync_mutations'])assert.equal((await db.query('SELECT count(*)::int AS n FROM '+table)).rows[0].n,0,`${automatic?'Auto':'Manual'} deletion empties ${table}`);
}
await db.close();console.log('PASS physical purge: manual/expiry remove shares, sessions, shortcuts, published scores, central cards, snapshots, round histories and pending mutations.');

const {applyEventBoundMutation}=await import('./api/sync.js');
const syncDb=new PGlite();await syncDb.exec(`CREATE TABLE live_tournaments(id uuid PRIMARY KEY,status text,expires_at timestamptz);CREATE TABLE accepted_mutations(id text);CREATE FUNCTION apply_master_sync_mutation(text,text,text,text,text,integer,timestamptz,integer,jsonb) RETURNS jsonb LANGUAGE plpgsql AS $$BEGIN INSERT INTO accepted_mutations(id) VALUES($1);RETURN '{"accepted":true}'::jsonb;END$$;`);
const syncSql=async(strings,...values)=>(await syncDb.query(strings.reduce((query,part,index)=>query+(index?'$'+index:'')+part,''),values)).rows;
const id='11111111-1111-4111-8111-111111111111',mutation={clientMutationId:'mutation-removed',installationId:'device-test',entityType:'master-snapshot',entityId:'round-test',payloadHash:'a'.repeat(64),schemaVersion:1,deviceAt:new Date().toISOString(),expectedVersion:1,payload:{round:{personalEventId:id,personalEventKind:'tournament'}}};
await assert.rejects(applyEventBoundMutation(syncSql,mutation),error=>error.code==='EVENT_REMOVED');assert.equal((await syncDb.query('SELECT * FROM accepted_mutations')).rows.length,0,'Queued upload cannot recreate a physically deleted event');
await syncDb.query("INSERT INTO live_tournaments VALUES($1,'active',now()+interval '1 day')",[id]);assert.equal((await applyEventBoundMutation(syncSql,mutation)).accepted,true);
await syncDb.close();console.log('PASS anti-restoration: queued central upload for a removed event rejected; active event upload retained under shared row lock.');
