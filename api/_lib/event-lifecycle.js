import {privateRoundCompletion} from './private-round-lifecycle.js';
import {ensurePersonalAccess,eventScope} from './personal-event-access.js';
export async function ensureEventLifecycle(sql,kinds=['tournament','private']){
 await sql`CREATE TABLE IF NOT EXISTS live_private_rounds (LIKE live_tournaments INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES,viewer_access_token text)`;
 await sql`CREATE TABLE IF NOT EXISTS live_private_streams (LIKE live_streams INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)`;
 for(const kind of kinds){
 const scoped=eventScope(sql,kind);
 await scoped`ALTER TABLE live_tournaments ADD COLUMN IF NOT EXISTS completed_at timestamptz,ADD COLUMN IF NOT EXISTS completed_roster text,ADD COLUMN IF NOT EXISTS base_expires_at timestamptz`;
 await scoped`ALTER TABLE live_streams ADD COLUMN IF NOT EXISTS completed_at timestamptz`;
 await scoped`UPDATE live_tournaments SET base_expires_at=expires_at WHERE base_expires_at IS NULL`;
 }
}
export async function refreshEventLifecycles(sql,kinds=['tournament','private']){
 await ensurePersonalAccess(sql);await ensureEventLifecycle(sql,kinds);
 const adminTable=await sql`SELECT to_regclass('gsc_event_admin_grants') AS grants_table`;
 for(const kind of kinds){
 const scoped=eventScope(sql,kind);
 // Use server receive timestamps; corrections/retries never extend an established deadline.
 const streams=await scoped`SELECT id,current_snapshot,updated_at,completed_at,expires_at FROM live_streams WHERE status='active' AND expires_at>now()`;
 for(const stream of streams){const completion=privateRoundCompletion([stream],{expires_at:stream.expires_at,base_expires_at:stream.expires_at,completed_at:stream.completed_at,completed_roster:JSON.stringify((stream.current_snapshot?.players||[]).map(p=>stream.id+'/'+p.id).sort())});if(completion.completedAt)await scoped`UPDATE live_streams SET completed_at=coalesce(completed_at,${completion.completedAt}::timestamptz),expires_at=coalesce(completed_at,${completion.completedAt}::timestamptz)+interval '24 hours' WHERE id=${stream.id}::uuid AND updated_at=${stream.updated_at}::timestamptz AND status='active'`}
 const events=await scoped`SELECT id,revision,completed_at,completed_roster,base_expires_at,expires_at FROM live_tournaments WHERE status IN ('active','finished') AND expires_at>now()`;
 for(const event of events){
 const groups=await scoped`SELECT id,group_label,current_snapshot,updated_at FROM live_streams WHERE tournament_id=${event.id}::uuid AND status='active'`;
 const members=await sql`SELECT group_label,players FROM gsc_personal_members WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND revoked_at IS NULL AND role<>'viewer' UNION ALL SELECT group_label,players FROM gsc_personal_invites WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()`;
 const missing=members.some(m=>(m.players||[]).some(p=>!groups.some(g=>g.group_label===m.group_label&&(g.current_snapshot?.players||[]).some(actual=>actual.id===p.id))));
 const next=privateRoundCompletion(groups,event),completed=event.completed_at||(!missing?next.completedAt:null);
 if(completed){await scoped`UPDATE live_tournaments SET completed_at=coalesce(completed_at,${completed}::timestamptz),completed_roster=coalesce(completed_roster,${next.roster}),expires_at=coalesce(completed_at,${completed}::timestamptz)+interval '24 hours' WHERE id=${event.id}::uuid AND revision=${event.revision} AND status IN ('active','finished')`;
 if(adminTable[0]?.grants_table)await sql`UPDATE gsc_event_admin_grants SET expires_at=${completed}::timestamptz+interval '24 hours' WHERE event_id=${event.id}::uuid AND event_kind=${kind} AND revoked_at IS NULL`;
 }
 }
 const expired=await scoped`UPDATE live_tournaments SET status='revoked',revoked_at=coalesce(revoked_at,now()),updated_at=now() WHERE status IN ('active','finished') AND expires_at<=now() RETURNING id,name`;
 for(const event of expired){await scoped`UPDATE live_streams SET status='revoked',revoked_at=coalesce(revoked_at,now()) WHERE tournament_id=${event.id}::uuid AND status<>'revoked'`;await sql`INSERT INTO gsc_personal_audit(event_id,event_kind,actor_account_id,action,details) VALUES(${event.id}::uuid,${kind},'system','expired',${JSON.stringify({eventName:event.name,reason:'Plazo de conservación vencido'})}::jsonb)`}
 await scoped`UPDATE live_streams SET status='revoked',revoked_at=coalesce(revoked_at,now()) WHERE status='active' AND expires_at<=now()`;
 }
}
