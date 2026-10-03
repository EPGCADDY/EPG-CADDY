import {createHash,randomBytes} from 'node:crypto';
import {requireAccountSession} from './account-auth.js';

const hash=value=>createHash('sha256').update(String(value)).digest('hex');
export const accessError=(code,status=403)=>Object.assign(new Error(code),{code,status});
export function eventKind(value){if(!['tournament','private'].includes(value))throw accessError('PERSONAL_EVENT_KIND_INVALID',400);return value}
export function eventScope(sql,kind){eventKind(kind);return kind==='tournament'?sql:(strings,...values)=>{const parts=strings.map(s=>s.replace(/\blive_tournaments\b/g,'live_private_rounds').replace(/\blive_streams\b/g,'live_private_streams'));parts.raw=parts.slice();return sql(parts,...values)}}
export async function ensurePersonalAccess(sql){
  await sql`CREATE TABLE IF NOT EXISTS gsc_personal_events(event_id uuid NOT NULL,event_kind text NOT NULL CHECK(event_kind IN ('tournament','private')),owner_account_id text NOT NULL,status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','closed')),configuration jsonb NOT NULL DEFAULT '{}'::jsonb,PRIMARY KEY(event_id,event_kind))`;
  await sql`CREATE TABLE IF NOT EXISTS gsc_personal_members(event_id uuid NOT NULL,event_kind text NOT NULL,account_id text NOT NULL,role text NOT NULL CHECK(role IN ('organizer','player','scorer','viewer')),display_name text NOT NULL,group_label text NOT NULL DEFAULT '',players jsonb NOT NULL DEFAULT '[]'::jsonb,stream_id uuid,revoked_at timestamptz,PRIMARY KEY(event_id,event_kind,account_id),FOREIGN KEY(event_id,event_kind) REFERENCES gsc_personal_events(event_id,event_kind))`;
  await sql`CREATE TABLE IF NOT EXISTS gsc_personal_invites(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),event_id uuid NOT NULL,event_kind text NOT NULL,recipient_account_id text NOT NULL,code_hash char(64) UNIQUE NOT NULL,role text NOT NULL CHECK(role IN ('player','scorer','viewer')),display_name text NOT NULL,group_label text NOT NULL DEFAULT '',players jsonb NOT NULL DEFAULT '[]'::jsonb,expires_at timestamptz NOT NULL,consumed_at timestamptz,revoked_at timestamptz,FOREIGN KEY(event_id,event_kind) REFERENCES gsc_personal_events(event_id,event_kind))`;
  await sql`CREATE TABLE IF NOT EXISTS gsc_personal_audit(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,event_id uuid NOT NULL,event_kind text NOT NULL,actor_account_id text NOT NULL,action text NOT NULL,details jsonb NOT NULL DEFAULT '{}'::jsonb,created_at timestamptz NOT NULL DEFAULT now())`;
  await sql`ALTER TABLE gsc_personal_events ADD COLUMN IF NOT EXISTS reserved_slots jsonb NOT NULL DEFAULT '[]'::jsonb`;
  await sql`CREATE OR REPLACE FUNCTION gsc_personal_capacity(event uuid,kind text,roster jsonb,grp text,replace_account text DEFAULT NULL) RETURNS boolean LANGUAGE plpgsql VOLATILE AS $fn$
    DECLARE total integer;
    BEGIN
      PERFORM 1 FROM gsc_personal_events WHERE event_id=event AND event_kind=kind AND status='active' FOR UPDATE;
      IF NOT FOUND THEN RETURN false; END IF;
      SELECT count(DISTINCT (group_label,player->>'id')) INTO total FROM (
        SELECT group_label,players FROM gsc_personal_members WHERE event_id=event AND event_kind=kind AND revoked_at IS NULL AND (replace_account IS NULL OR account_id<>replace_account)
        UNION ALL SELECT group_label,players FROM gsc_personal_invites WHERE event_id=event AND event_kind=kind AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()
        UNION ALL SELECT grp,roster
      ) rosters CROSS JOIN LATERAL jsonb_array_elements(players) player;
      RETURN total<=100;
    END $fn$`;
  await sql`CREATE OR REPLACE FUNCTION gsc_personal_can_publish(event uuid,kind text,actor text,stream uuid,snapshot jsonb,selected jsonb,grp text) RETURNS boolean LANGUAGE plpgsql VOLATILE AS $fn$
    DECLARE member gsc_personal_members%ROWTYPE; config jsonb;
    BEGIN
      SELECT configuration INTO config FROM gsc_personal_events WHERE event_id=event AND event_kind=kind AND status='active' FOR SHARE;
      IF NOT FOUND THEN RETURN false; END IF;
      SELECT * INTO member FROM gsc_personal_members WHERE event_id=event AND event_kind=kind AND account_id=actor AND revoked_at IS NULL FOR SHARE;
      IF NOT FOUND OR member.role NOT IN ('organizer','player','scorer') OR member.stream_id IS DISTINCT FROM stream OR member.group_label<>grp OR snapshot->>'mode' IS DISTINCT FROM config->>'mode' THEN RETURN false; END IF;
      IF jsonb_array_length(member.players)=0 OR jsonb_array_length(member.players)<>jsonb_array_length(selected) OR jsonb_array_length(member.players)<>jsonb_array_length(snapshot->'players') THEN RETURN false; END IF;
      RETURN NOT EXISTS(SELECT 1 FROM jsonb_array_elements(member.players) expected WHERE NOT EXISTS(SELECT 1 FROM jsonb_array_elements(snapshot->'players') actual WHERE expected->>'id'=actual->>'id' AND upper(regexp_replace(expected->>'name','[[:space:]]+',' ','g'))=upper(regexp_replace(actual->>'name','[[:space:]]+',' ','g')) AND (expected->>'handicap')::numeric=(actual->>'handicap')::numeric AND expected->>'tournamentCategory'=actual->>'tournamentCategory' AND selected ? (expected->>'id')));
    END $fn$`;
  await sql`CREATE TABLE IF NOT EXISTS gsc_personal_limits(account_id text NOT NULL,action text NOT NULL,minute timestamptz NOT NULL,count integer NOT NULL,PRIMARY KEY(account_id,action,minute))`;
}
export async function limitPersonalAccess(sql,account,action){const maximum=['read','list','identity'].includes(action)?240:120,rows=await sql`INSERT INTO gsc_personal_limits(account_id,action,minute,count) VALUES(${account.id},${action},date_trunc('minute',now()),1) ON CONFLICT(account_id,action,minute) DO UPDATE SET count=gsc_personal_limits.count+1 RETURNING count`;if(rows[0].count>maximum)throw accessError('PERSONAL_RATE_LIMITED',429)}
export async function personalMember(sql,eventId,kind,account){
  const rows=await sql`SELECT m.*,e.owner_account_id,e.status AS event_status,e.configuration FROM gsc_personal_members m JOIN gsc_personal_events e USING(event_id,event_kind) WHERE m.event_id=${eventId}::uuid AND m.event_kind=${kind} AND m.account_id=${account.id} AND m.revoked_at IS NULL LIMIT 1`;
  if(!rows.length)throw accessError('PERSONAL_EVENT_FORBIDDEN');return rows[0];
}
export async function organizer(sql,eventId,kind,account){const member=await personalMember(sql,eventId,kind,account);if(member.role!=='organizer'||member.owner_account_id!==account.id)throw accessError('PERSONAL_ORGANIZER_REQUIRED');return member}
export async function auditPersonal(sql,id,kind,account,action,details={}){await sql`INSERT INTO gsc_personal_audit(event_id,event_kind,actor_account_id,action,details) VALUES(${id}::uuid,${kind},${account.id},${action},${JSON.stringify(details)}::jsonb)`}
export function assignedPlayers(value,role){
  const players=Array.isArray(value)?value:[];
  if(role==='viewer'&&players.length||players.length>6||role==='player'&&players.length!==1||role==='scorer'&&!players.length)throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);
  const result=players.map(p=>({id:String(p.id||'').trim(),name:String(p.name||'').trim().slice(0,80),handicap:typeof p.handicap==='number'?p.handicap:NaN,tournamentCategory:String(p.tournamentCategory||''),...(p.tee===undefined?{}:{tee:String(p.tee)})}));
  if(result.some(p=>!/^[A-Za-z0-9._:-]{1,80}$/.test(p.id)||!p.name||!Number.isInteger(p.handicap)||p.handicap<0||p.handicap>54||!['championship','a','b','c','d','female','senior','super_senior'].includes(p.tournamentCategory))||result.some(p=>p.tee!==undefined&&!['Negro','Azul','Blanco','Rojo','Amarillo'].includes(p.tee))||new Set(result.map(p=>p.id)).size!==result.length)throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);
  return result;
}
export function validateAssignedConfiguration(players,configuration){if(players.some(player=>!configuration.categories?.includes(player.tournamentCategory))||configuration.mode==='stableford'&&(players.some(player=>player.handicap!==0)||new Set(players.map(player=>player.tournamentCategory)).size>1))throw accessError('PERSONAL_ASSIGNMENT_INVALID',400)}
export async function issuePersonalInvite(sql,body,account){
  const kind=eventKind(body.eventKind),id=body.eventId,owner=await organizer(sql,id,kind,account);
  if(owner.event_status!=='active')throw accessError('PERSONAL_EVENT_CLOSED',409);
  const recipient=String(body.recipientAccountId||'').trim(),role=body.role;
  if(!recipient||recipient===owner.owner_account_id||recipient.length>160||!['player','scorer','viewer'].includes(role))throw accessError('PERSONAL_INVITE_INVALID',400);
  const players=assignedPlayers(body.players,role),group=String(body.groupLabel||'').trim().slice(0,120),name=String(body.displayName||'').trim().slice(0,80);
  if(!name||(players.length&&!group))throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);validateAssignedConfiguration(players,owner.configuration);
  // Pending invitations reserve capacity too; guests never count as players.
  const reserved=await sql`SELECT DISTINCT group_label,player->>'id' AS player_id FROM (SELECT group_label,players FROM gsc_personal_members WHERE event_id=${id}::uuid AND event_kind=${kind} AND revoked_at IS NULL UNION ALL SELECT group_label,players FROM gsc_personal_invites WHERE event_id=${id}::uuid AND event_kind=${kind} AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()) rosters CROSS JOIN LATERAL jsonb_array_elements(players) player`;
  const identities=new Set(reserved.map(p=>p.group_label+'\0'+p.player_id));players.forEach(p=>identities.add(group+'\0'+p.id));if(identities.size>100)throw accessError('LIVE_TOURNAMENT_CAPACITY_REACHED',409);
  const code=randomBytes(24).toString('base64url');
  const rows=await sql`INSERT INTO gsc_personal_invites(event_id,event_kind,recipient_account_id,code_hash,role,display_name,group_label,players,expires_at) SELECT ${id}::uuid,${kind},${recipient},${hash(code)},${role},${name},${group},${JSON.stringify(players)}::jsonb,now()+interval '24 hours' WHERE gsc_personal_capacity(${id}::uuid,${kind},${JSON.stringify(players)}::jsonb,${group}) RETURNING id,expires_at`;
  if(!rows.length)throw accessError('LIVE_TOURNAMENT_CAPACITY_REACHED',409);
  await auditPersonal(sql,id,kind,account,'invite_created',{inviteId:rows[0].id,role});
  return{ok:true,inviteId:rows[0].id,code,expiresAt:rows[0].expires_at};
}
export async function consumePersonalInvite(sql,body,account){
  const code=String(body.code||'');if(!/^[A-Za-z0-9_-]{32}$/.test(code))throw accessError('PERSONAL_INVITE_INVALID_OR_USED',410);
  // Recipient identity, first use and membership are one indivisible SQL operation.
  const rows=await sql`WITH consumed AS (UPDATE gsc_personal_invites i SET consumed_at=now() FROM gsc_personal_events e WHERE i.code_hash=${hash(code)} AND i.recipient_account_id=${account.id} AND i.consumed_at IS NULL AND i.revoked_at IS NULL AND i.expires_at>now() AND e.event_id=i.event_id AND e.event_kind=i.event_kind AND e.status='active' RETURNING i.*) INSERT INTO gsc_personal_members(event_id,event_kind,account_id,role,display_name,group_label,players,revoked_at) SELECT event_id,event_kind,recipient_account_id,role,display_name,group_label,players,NULL FROM consumed ON CONFLICT(event_id,event_kind,account_id) DO UPDATE SET role=excluded.role,display_name=excluded.display_name,group_label=excluded.group_label,players=excluded.players,revoked_at=NULL RETURNING event_id,event_kind,role`;
  if(!rows.length)throw accessError('PERSONAL_INVITE_INVALID_OR_USED',410);
  await auditPersonal(sql,rows[0].event_id,rows[0].event_kind,account,'invite_consumed');return{ok:true,eventId:rows[0].event_id,eventKind:rows[0].event_kind,role:rows[0].role};
}

export async function guardPersonalLive(sql,req,body,resolveAccount=requireAccountSession){
  const action=String(body.action||''),kind=action.includes('private')?'private':'tournament',scoped=eventScope(sql,kind);
  if(action.startsWith('create_')||action.startsWith('list_'))return;
  let events=[],stream=null;
  if(action.startsWith('join_')){
    events=body.tournamentId||body.privateRoundId?await scoped`SELECT id FROM live_tournaments WHERE id=${body.tournamentId||body.privateRoundId}::uuid`:await scoped`SELECT id FROM live_tournaments WHERE join_code_hash=${hash(String(body.joinCode||'').trim().toUpperCase())}`;
    const secret=String(req.headers.authorization||'').replace(/^LivePublisher\s+/i,'');
    stream=(await scoped`SELECT * FROM live_streams WHERE publisher_secret_hash=${hash(secret)}`)[0];
  }else if(action==='publish'||action==='publish_private_round'||action==='revoke_stream'||action==='leave_tournament'){
    const secret=String(req.headers.authorization||'').replace(/^LivePublisher\s+/i,'');stream=(await scoped`SELECT * FROM live_streams WHERE publisher_secret_hash=${hash(secret)}`)[0];if(stream?.tournament_id)events=[{id:stream.tournament_id}];
  }else if(action==='read'||action==='read_private_round'){
    if(body.kind==='tournament')events=await scoped`SELECT id FROM live_tournaments WHERE viewer_token_hash=${hash(body.viewerToken||'')}`;
    else{stream=(await scoped`SELECT * FROM live_streams WHERE viewer_token_hash=${hash(body.viewerToken||'')}`)[0];if(stream?.tournament_id)events=[{id:stream.tournament_id}];}
  }else if(action==='revoke_tournament'||action==='revoke_private_round')events=await scoped`SELECT id FROM live_tournaments WHERE organizer_secret_hash=${hash(String(req.headers.authorization||'').replace(/^LivePublisher\s+/i,''))}`;
  if(!events.length)return;
  const policies=await sql`SELECT * FROM gsc_personal_events WHERE event_id=${events[0].id}::uuid AND event_kind=${kind}`;if(!policies.length)return;
  const account=await resolveAccount(req),member=await personalMember(sql,events[0].id,kind,account);
  const writing=!action.startsWith('read');if(writing&&member.event_status!=='active')throw accessError('PERSONAL_EVENT_CLOSED',409);
  if(action.startsWith('revoke_tournament')||action==='revoke_private_round'){await organizer(sql,events[0].id,kind,account);return}
  if(!writing)return;
  if(!['player','scorer','organizer'].includes(member.role)||!member.players.length||!stream)throw accessError('PERSONAL_WRITER_FORBIDDEN');
  const snapshot=body.snapshot||stream.current_snapshot;if(snapshot?.mode!==member.configuration.mode)throw accessError('PERSONAL_MODE_LOCKED',409);const expected=member.players,selected=stream.selected_player_ids||[],actual=(snapshot?.players||[]).filter(p=>selected.includes(p.id));
  if(selected.length!==expected.length||selected.some(id=>!expected.some(p=>p.id===id)))throw accessError('PERSONAL_GROUP_FORBIDDEN');
  if(actual.length!==expected.length||actual.some(p=>!expected.some(e=>e.id===p.id&&e.name.toUpperCase().replace(/\s+/g,' ')===String(p.name).toUpperCase().replace(/\s+/g,' ')&&e.handicap===Number(p.handicap)&&e.tournamentCategory===p.tournamentCategory))||String(body.groupLabel||stream.group_label)!==member.group_label)throw accessError('PERSONAL_GROUP_FORBIDDEN');
  if(member.stream_id&&member.stream_id!==stream.id){const prior=await scoped`SELECT id FROM live_streams WHERE id=${member.stream_id}::uuid AND status='active' AND expires_at>now()`;if(prior.length)throw accessError('PERSONAL_GROUP_FORBIDDEN')}
  // Bind once. Another stream for this group is rejected, including another phone.
  if(action.startsWith('join_')){
    const other=await scoped`SELECT id FROM live_streams WHERE tournament_id=${events[0].id}::uuid AND group_label=${member.group_label} AND id<>${stream.id}::uuid AND status='active' AND expires_at>now()`;if(other.length)throw accessError('PERSONAL_GROUP_ALREADY_CONNECTED',409);
    const bound=await sql`UPDATE gsc_personal_members SET stream_id=${stream.id}::uuid WHERE event_id=${events[0].id}::uuid AND event_kind=${kind} AND account_id=${account.id} AND (stream_id IS NULL OR stream_id=${stream.id}::uuid OR stream_id=${member.stream_id}::uuid) AND revoked_at IS NULL RETURNING stream_id`;if(!bound.length)throw accessError('PERSONAL_GROUP_FORBIDDEN');
  }
  return {accountId:account.id,eventKind:kind};
}

// Context comes only from the authenticated guard, never from request JSON.
// Membership and policy are locked/rechecked in the official publication statement.
export function personalPublishingSql(sql,context){if(!context)return sql;const actorHex=Buffer.from(context.accountId,'utf8').toString('hex'),kind=eventKind(context.eventKind);return(strings,...values)=>{const parts=strings.map(part=>part.replace("WHEN status<>'active'", "WHEN NOT gsc_personal_can_publish(tournament_id,'"+kind+"',convert_from(decode('"+actorHex+"','hex'),'UTF8'),id,filtered_snapshot,selected_player_ids,group_label) THEN 'PERSONAL_EVENT_FORBIDDEN' WHEN status<>'active'"));parts.raw=parts.slice();return sql(parts,...values)}}

export async function guardPersonalShare(sql,req,body,resolveAccount=requireAccountSession){
  const kind=eventKind(body.eventKind),id=body.eventId;
  const policies=await sql`SELECT status FROM gsc_personal_events WHERE event_id=${id}::uuid AND event_kind=${kind}`;if(!policies.length)return;
  if(body.action==='create'||body.action==='revoke'){
    await guardPersonalLive(sql,req,{action:kind==='private'?'publish_private_round':'publish'},resolveAccount);
    // A secret for an unrelated stream must never authorize this event.
    const scoped=eventScope(sql,kind),secret=String(req.headers.authorization||'').replace(/^LivePublisher\s+/i,'');
    const streams=await scoped`SELECT id FROM live_streams WHERE publisher_secret_hash=${hash(secret)} AND tournament_id=${id}::uuid AND status='active' AND expires_at>now()`;if(!streams.length)throw accessError('LIVE_SHARE_PLAYER_REQUIRED');
    return;
  }
  const cookieName='__Host-gsc_live_'+String(id).replaceAll('-','')+'=',token=String(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName))?.slice(cookieName.length)||'';
  const shares=await sql`SELECT g.id,m.account_id,m.revoked_at,m.players FROM gsc_live_shares g LEFT JOIN gsc_personal_members m ON m.event_id=g.event_id AND m.event_kind=g.event_kind AND m.stream_id=g.issuer_stream_id WHERE g.event_id=${id}::uuid AND g.event_kind=${kind} AND (g.code_hash=${hash(body.code||'')} OR EXISTS(SELECT 1 FROM gsc_live_share_sessions session WHERE session.share_id=g.id AND session.token_hash=${hash(token)})) LIMIT 1`;
  if(shares.length&&(!shares[0].account_id||shares[0].revoked_at||!shares[0].players.length))throw accessError('PERSONAL_SHARE_ISSUER_REVOKED',410);
}

// Possession of the organizer-shared tournament code grants only this event/group.
export async function joinPersonalTournamentCode(sql,body,account){
 const code=String(body.joinCode||'').trim().toUpperCase();if(!/^[A-Z0-9]{10}$/.test(code))throw accessError('LIVE_JOIN_CODE_INVALID',400);
 const kind=eventKind(body.eventKind||'tournament'),scoped=eventScope(sql,kind);
 const rows=await scoped`SELECT t.id,t.name,e.configuration FROM live_tournaments t JOIN gsc_personal_events e ON e.event_id=t.id AND e.event_kind=${kind} WHERE t.join_code_hash=${hash(code)}::char(64) AND t.status='active' AND t.expires_at>now() AND e.status='active' LIMIT 1`;
 const event=rows[0];if(!event||body.eventId&&body.eventId!==event.id)throw accessError('LIVE_JOIN_CODE_INVALID',404);
 const players=assignedPlayers(body.players,'scorer'),group=String(body.groupLabel||'').trim().slice(0,120);if(!group)throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);validateAssignedConfiguration(players,event.configuration);
 if(body.mode!==event.configuration.mode)throw accessError('LIVE_TOURNAMENT_MODE_MISMATCH',409);
 const foldCourse=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase();if(body.course&&foldCourse(body.course)!==foldCourse(event.configuration.course))throw accessError('LIVE_TOURNAMENT_COURSE_MISMATCH',409);
 const applied=await sql`INSERT INTO gsc_personal_members(event_id,event_kind,account_id,role,display_name,group_label,players) SELECT ${event.id}::uuid,${kind},${account.id},'scorer',${account.name||group},${group},${JSON.stringify(players)}::jsonb WHERE gsc_personal_capacity(${event.id}::uuid,${kind},${JSON.stringify(players)}::jsonb,${group},${account.id}) ON CONFLICT(event_id,event_kind,account_id) DO UPDATE SET role=CASE WHEN gsc_personal_members.role='organizer' THEN 'organizer' ELSE 'scorer' END,group_label=EXCLUDED.group_label,players=EXCLUDED.players,stream_id=CASE WHEN gsc_personal_members.group_label=EXCLUDED.group_label AND gsc_personal_members.players=EXCLUDED.players THEN gsc_personal_members.stream_id ELSE NULL END WHERE gsc_personal_members.revoked_at IS NULL RETURNING account_id`;
 if(!applied.length)throw accessError('PERSONAL_JOIN_NOT_AVAILABLE',409);
 await auditPersonal(sql,event.id,kind,account,'joined_by_code',{group,players});
 return{ok:true,eventId:event.id,eventKind:kind,name:event.name,configuration:event.configuration};
}

export async function viewPersonalEventCode(sql,body,account){
 const kind=eventKind(body.eventKind||'tournament'),scoped=eventScope(sql,kind),code=String(body.joinCode||'').trim().toUpperCase();
 if(!/^[A-Z0-9]{10}$/.test(code))throw accessError('LIVE_JOIN_CODE_INVALID',400);
 const rows=await scoped`SELECT t.id,t.name FROM live_tournaments t JOIN gsc_personal_events e ON e.event_id=t.id AND e.event_kind=${kind} WHERE t.id=${body.eventId}::uuid AND t.join_code_hash=${hash(code)}::char(64) AND t.status IN ('active','finished') AND t.expires_at>now()`;
 if(!rows.length)throw accessError('LIVE_JOIN_CODE_INVALID',404);
 await sql`INSERT INTO gsc_personal_members(event_id,event_kind,account_id,role,display_name,group_label,players) VALUES(${body.eventId}::uuid,${kind},${account.id},'viewer',${account.name||'Invitado'},'', '[]'::jsonb) ON CONFLICT(event_id,event_kind,account_id) DO NOTHING`;
 await personalMember(sql,body.eventId,kind,account);await auditPersonal(sql,body.eventId,kind,account,'viewed_by_code');
 return{ok:true,eventId:body.eventId,eventKind:kind,name:rows[0].name};
}
