import {privateRoundCompletion} from './private-round-lifecycle.js';
import {ensurePersonalAccess,eventScope} from './personal-event-access.js';
export async function ensureEventPurge(sql){
 await sql`CREATE OR REPLACE FUNCTION gsc_purge_cards(client_rounds text[]) RETURNS void LANGUAGE plpgsql AS $fn$
 DECLARE tab text; master_rounds uuid[]; master_tournaments uuid[];
 BEGIN
  IF to_regclass('rounds') IS NOT NULL THEN
   SELECT array_agg(id),array_agg(DISTINCT tournament_id) INTO master_rounds,master_tournaments FROM rounds WHERE client_round_id=ANY(coalesce(client_rounds,ARRAY[]::text[]));
   FOREACH tab IN ARRAY ARRAY['deliveries','card_artifacts','player_handicap_events','player_tee_events'] LOOP
    IF to_regclass(tab) IS NOT NULL THEN EXECUTE format('DELETE FROM %I WHERE round_id=ANY($1)',tab) USING master_rounds; END IF;
   END LOOP;
   UPDATE rounds SET parent_round_id=NULL WHERE parent_round_id=ANY(master_rounds);
   DELETE FROM rounds WHERE id=ANY(master_rounds);
   DELETE FROM tournaments WHERE id=ANY(master_tournaments) AND NOT EXISTS(SELECT 1 FROM rounds WHERE tournament_id=tournaments.id);
  END IF;
  IF to_regclass('sync_mutations') IS NOT NULL THEN DELETE FROM sync_mutations WHERE entity_id=ANY(client_rounds); END IF;
 END $fn$`;
 await sql`CREATE OR REPLACE FUNCTION gsc_purge_stream(stream uuid,kind text) RETURNS void LANGUAGE plpgsql AS $fn$
 DECLARE streams text; history text; client_round text;
 BEGIN
  IF kind NOT IN ('tournament','private') THEN RAISE EXCEPTION 'PERSONAL_EVENT_KIND_INVALID'; END IF;
  streams:=CASE WHEN kind='private' THEN 'live_private_streams' ELSE 'live_streams' END;
  history:=CASE WHEN kind='private' THEN 'live_private_events' ELSE 'live_events' END;
  EXECUTE format('SELECT round_client_id FROM %I WHERE id=$1',streams) INTO client_round USING stream;
  PERFORM gsc_purge_cards(ARRAY[client_round]);
  IF to_regclass('gsc_live_shares') IS NOT NULL THEN
   DELETE FROM gsc_live_share_sessions WHERE share_id IN(SELECT id FROM gsc_live_shares WHERE issuer_stream_id=stream AND event_kind=kind);
   DELETE FROM gsc_live_shares WHERE issuer_stream_id=stream AND event_kind=kind;
  END IF;
  IF to_regclass('user_shortcuts') IS NOT NULL THEN DELETE FROM user_shortcuts WHERE stream_id=stream::text; END IF;
  IF to_regclass(history) IS NOT NULL THEN EXECUTE format('DELETE FROM %I WHERE stream_id=$1',history) USING stream; END IF;
  DELETE FROM gsc_personal_members WHERE stream_id=stream AND event_kind=kind;
  EXECUTE format('DELETE FROM %I WHERE id=$1',streams) USING stream;
 END $fn$`;
 await sql`CREATE OR REPLACE FUNCTION gsc_purge_event(event uuid,kind text) RETURNS void LANGUAGE plpgsql AS $fn$
 DECLARE tab text; rounds text; streams text; history text; client_rounds text[]; master_rounds uuid[]; master_tournaments uuid[];
 BEGIN
  IF kind NOT IN ('tournament','private') THEN RAISE EXCEPTION 'PERSONAL_EVENT_KIND_INVALID'; END IF;
  rounds:=CASE WHEN kind='private' THEN 'live_private_rounds' ELSE 'live_tournaments' END;
  streams:=CASE WHEN kind='private' THEN 'live_private_streams' ELSE 'live_streams' END;
  history:=CASE WHEN kind='private' THEN 'live_private_events' ELSE 'live_events' END;
  EXECUTE format('SELECT array_agg(DISTINCT round_client_id) FROM %I WHERE tournament_id=$1',streams) INTO client_rounds USING event;
  PERFORM gsc_purge_cards(client_rounds);
  IF to_regclass('gsc_live_share_sessions') IS NOT NULL AND to_regclass('gsc_live_shares') IS NOT NULL THEN
   DELETE FROM gsc_live_share_sessions WHERE share_id IN(SELECT id FROM gsc_live_shares WHERE event_id=event AND event_kind=kind);
  END IF;
  FOREACH tab IN ARRAY ARRAY['gsc_live_shares','gsc_entry_codes','gsc_event_admin_grants','gsc_event_admin_legacy_owners','gsc_event_deletions','gsc_personal_audit','gsc_personal_invites','gsc_personal_members','gsc_tournament_entry_codes','gsc_personal_events'] LOOP
   IF to_regclass(tab) IS NOT NULL THEN EXECUTE format('DELETE FROM %I WHERE event_id=$1 AND event_kind=$2',tab) USING event,kind; END IF;
  END LOOP;
  IF to_regclass('user_shortcuts') IS NOT NULL THEN
   EXECUTE format('DELETE FROM user_shortcuts WHERE tournament_id=$1::text OR stream_id IN(SELECT id::text FROM %I WHERE tournament_id=$1)',streams) USING event;
  END IF;
  IF to_regclass(history) IS NOT NULL THEN EXECUTE format('DELETE FROM %I WHERE tournament_id=$1 OR stream_id IN(SELECT id FROM %I WHERE tournament_id=$1)',history,streams) USING event; END IF;
  EXECUTE format('DELETE FROM %I WHERE tournament_id=$1',streams) USING event;
  EXECUTE format('DELETE FROM %I WHERE id=$1',rounds) USING event;
 END $fn$`;
}
export async function ensureEventLifecycle(sql,kinds=['tournament','private']){
 await sql`CREATE TABLE IF NOT EXISTS live_private_rounds (LIKE live_tournaments INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES,viewer_access_token text)`;
 await sql`CREATE TABLE IF NOT EXISTS live_private_streams (LIKE live_streams INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)`;
 await sql`CREATE OR REPLACE FUNCTION gsc_score_fingerprint(snapshot jsonb) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$ SELECT coalesce(jsonb_agg(jsonb_build_array(p->>'id',h->'hole',h->'gross',coalesce(h->'explicitX','false'::jsonb)) ORDER BY p->>'id',(h->>'hole')::integer),'[]'::jsonb) FROM jsonb_array_elements(coalesce(snapshot->'players','[]'::jsonb)) p CROSS JOIN LATERAL jsonb_array_elements(coalesce(p->'holes','[]'::jsonb)) h WHERE (h->>'hole')::integer BETWEEN 1 AND 18 AND (coalesce((h->>'gross')::numeric,0)>0 OR h->>'explicitX'='true') $$`;
 for(const kind of kinds){
 const scoped=eventScope(sql,kind);
 await scoped`ALTER TABLE live_tournaments ADD COLUMN IF NOT EXISTS completed_at timestamptz,ADD COLUMN IF NOT EXISTS completed_roster text,ADD COLUMN IF NOT EXISTS base_expires_at timestamptz,ADD COLUMN IF NOT EXISTS last_score_at timestamptz`;
 await scoped`ALTER TABLE live_streams ADD COLUMN IF NOT EXISTS completed_at timestamptz,ADD COLUMN IF NOT EXISTS last_score_at timestamptz`;
 await scoped`UPDATE live_streams SET last_score_at=updated_at WHERE last_score_at IS NULL AND gsc_score_fingerprint(current_snapshot)<>'[]'::jsonb`;
 await scoped`UPDATE live_tournaments SET base_expires_at=expires_at WHERE base_expires_at IS NULL`;
 }
}
export async function refreshEventLifecycles(sql,kinds=['tournament','private']){
 await ensurePersonalAccess(sql);await ensureEventLifecycle(sql,kinds);
 await ensureEventPurge(sql);
 const adminTable=await sql`SELECT to_regclass('gsc_event_admin_grants') AS grants_table,to_regclass('gsc_event_deletions') AS deletions_table`;
 for(const kind of kinds){
 const scoped=eventScope(sql,kind);
 // Use server receive timestamps; corrections/retries never extend an established deadline.
 const streams=await scoped`SELECT id,current_snapshot,updated_at,created_at,last_score_at,completed_at,expires_at FROM live_streams WHERE status='active' AND expires_at>now()`;
 for(const stream of streams){const completion=privateRoundCompletion([stream],{...stream,completed_roster:JSON.stringify((stream.current_snapshot?.players||[]).map(p=>stream.id+'/'+p.id).sort())});await scoped`UPDATE live_streams SET completed_at=coalesce(completed_at,${completion.completedAt}::timestamptz),expires_at=${completion.expiresAt}::timestamptz WHERE id=${stream.id}::uuid AND updated_at=${stream.updated_at}::timestamptz AND status='active'`}

 const events=await scoped`SELECT id,revision,created_at,last_score_at,completed_at,completed_roster,base_expires_at,expires_at FROM live_tournaments WHERE status IN ('active','finished')`;
 for(const event of events){
 const groups=await scoped`SELECT id,group_label,current_snapshot,updated_at,last_score_at FROM live_streams WHERE tournament_id=${event.id}::uuid AND status='active'`;
 const members=await sql`SELECT group_label,players FROM gsc_personal_members WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND revoked_at IS NULL AND role<>'viewer' UNION ALL SELECT group_label,players FROM gsc_personal_invites WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()`;
 const missing=members.some(m=>(m.players||[]).some(p=>!groups.some(g=>g.group_label===m.group_label&&(g.current_snapshot?.players||[]).some(actual=>actual.id===p.id))));
 const next=privateRoundCompletion(groups,event),completed=event.completed_at||(!missing?next.completedAt:null);
 if(completed){await scoped`UPDATE live_tournaments SET completed_at=coalesce(completed_at,${completed}::timestamptz),completed_roster=coalesce(completed_roster,${next.roster}),expires_at=coalesce(completed_at,${completed}::timestamptz)+interval '24 hours' WHERE id=${event.id}::uuid AND revision=${event.revision} AND status IN ('active','finished')`;
 if(adminTable[0]?.grants_table)await sql`UPDATE gsc_event_admin_grants SET expires_at=${completed}::timestamptz+interval '24 hours' WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND revoked_at IS NULL`;
 }else{const last=groups.reduce((at,g)=>Math.max(at,new Date(g.last_score_at).getTime()||0),new Date(event.last_score_at).getTime()||0),anchor=last||new Date(event.created_at).getTime(),expiresAt=new Date(Math.max(new Date(event.base_expires_at||event.expires_at).getTime(),anchor+86400000)).toISOString();await scoped`UPDATE live_tournaments SET last_score_at=${last?new Date(last).toISOString():null}::timestamptz,expires_at=${expiresAt}::timestamptz WHERE id=${event.id}::uuid AND revision=${event.revision} AND completed_at IS NULL AND status IN ('active','finished')`}
 }
 const expired=await scoped`UPDATE live_tournaments SET status='revoked',revoked_at=coalesce(revoked_at,now()),updated_at=now() WHERE status IN ('active','finished') AND expires_at<=now() RETURNING id,name`;
 for(const event of expired){await sql`UPDATE gsc_personal_events SET status='closed' WHERE event_id=${event.id}::uuid AND event_kind=${kind}`;await scoped`UPDATE live_streams SET status='revoked',revoked_at=coalesce(revoked_at,now()) WHERE tournament_id=${event.id}::uuid AND status<>'revoked'`;await sql`INSERT INTO gsc_personal_audit(event_id,event_kind,actor_account_id,action,details) VALUES(${event.id}::uuid,${kind},'system','expired',${JSON.stringify({eventName:event.name,reason:'Plazo de conservación vencido'})}::jsonb)`}
 await scoped`UPDATE live_streams SET status='revoked',revoked_at=coalesce(revoked_at,now()) WHERE status='active' AND expires_at<=now() AND NOT EXISTS(SELECT 1 FROM live_tournaments event WHERE event.id=live_streams.tournament_id AND event.status='active' AND event.expires_at>now())`;
 const removed=await scoped`SELECT id FROM live_tournaments WHERE status='revoked'`;
 for(const event of removed)await sql`SELECT gsc_purge_event(${event.id}::uuid,${kind})`;
 const removedStreams=await scoped`SELECT id FROM live_streams WHERE status='revoked'`;for(const stream of removedStreams)await sql`SELECT gsc_purge_stream(${stream.id}::uuid,${kind})`;
 }
}
