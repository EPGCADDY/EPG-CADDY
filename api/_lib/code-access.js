import {personalAccessEnabled} from './personal-access-activation.js';
import {createHash,randomBytes} from 'node:crypto';
import {getDatabase} from './database.js';

export const CODE_COOKIE='gsc_code_session';
const digest=value=>createHash('sha256').update(value).digest('hex');
const error=(code,status=403)=>Object.assign(new Error(code),{code,status});
export const normalizedCode=value=>String(value||'').trim().toUpperCase().replace(/[ -]/g,'');
function enabled(){if(!personalAccessEnabled())throw error('PERSONAL_ACCESS_NOT_ENABLED',503)}
export async function ensureCodeAccess(sql){
  await sql`CREATE TABLE IF NOT EXISTS gsc_entry_codes(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),code_hash char(64) UNIQUE NOT NULL,issuer_id text NOT NULL,role text NOT NULL CHECK(role IN ('player','viewer')),display_name text NOT NULL,event_id uuid,event_kind text CHECK(event_kind IN ('tournament','private')),expires_at timestamptz NOT NULL,consumed_at timestamptz,revoked_at timestamptz,session_hash char(64) UNIQUE,CHECK(role<>'viewer' OR event_id IS NOT NULL))`;
}
export async function issueEntryCode(sql,{issuerId,role,eventId=null,eventKind=null,displayName=''}){
  if(!issuerId||!['player','viewer'].includes(role)||role==='viewer'&&!eventId||eventId&&!['tournament','private'].includes(eventKind))throw error('CODE_ASSIGNMENT_INVALID',400);
  await ensureCodeAccess(sql);const code=randomBytes(10).toString('hex').toUpperCase();
  const rows=await sql`INSERT INTO gsc_entry_codes(code_hash,issuer_id,role,display_name,event_id,event_kind,expires_at) VALUES(${digest(code)},${issuerId},${role},${String(displayName).trim().slice(0,80)|| (role==='player'?'Jugador':'Visitante')},${eventId}::uuid,${eventKind},now()+interval '24 hours') RETURNING id,expires_at`;
  return {id:rows[0].id,code,expiresAt:rows[0].expires_at};
}
export async function redeemEntryCode(sql,value){
  const code=normalizedCode(value);if(!/^[A-F0-9]{20}$/.test(code))throw error('CODE_INVALID_OR_USED',401);
  await ensureCodeAccess(sql);
  const availability=await sql`SELECT c.event_id,e.status AS event_status FROM gsc_entry_codes c LEFT JOIN gsc_personal_events e ON e.event_id=c.event_id AND e.event_kind=c.event_kind WHERE c.code_hash=${digest(code)} AND c.consumed_at IS NULL AND c.revoked_at IS NULL AND c.expires_at>now() LIMIT 1`;
  if(availability[0]?.event_status==='closed')throw error('CODE_EVENT_CLOSED',409);
  const token=randomBytes(32).toString('base64url');
  // One database statement elects one winner, including simultaneous attempts.
  const rows=await sql`WITH claimed AS (
    UPDATE gsc_entry_codes SET consumed_at=now(),session_hash=${digest(token)}
    WHERE code_hash=${digest(code)} AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()
    AND (event_id IS NULL OR EXISTS(SELECT 1 FROM gsc_personal_events e JOIN gsc_personal_members m USING(event_id,event_kind) WHERE e.event_id=gsc_entry_codes.event_id AND e.event_kind=gsc_entry_codes.event_kind AND e.status='active' AND m.account_id=gsc_entry_codes.issuer_id AND m.revoked_at IS NULL AND m.role IN ('organizer','player','scorer')))
    RETURNING id,role,display_name,event_id,event_kind,expires_at
  ), enrolled AS (
    INSERT INTO gsc_personal_members(event_id,event_kind,account_id,role,display_name)
    SELECT event_id,event_kind,'code:'||id::text,role,display_name FROM claimed WHERE event_id IS NOT NULL
    RETURNING account_id
  ) SELECT claimed.* FROM claimed LEFT JOIN enrolled ON enrolled.account_id='code:'||claimed.id::text`;
  if(!rows.length)throw error('CODE_INVALID_OR_USED',401);
  return {...rows[0],token,accountId:'code:'+rows[0].id};
}
export function codeSessionCookie(token,seconds){return `${CODE_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`}
export async function revokeEntryCode(sql,id,issuerId){
  if(!/^[a-f0-9-]{36}$/i.test(String(id||'')))throw error('CODE_ASSIGNMENT_INVALID',400);
  await ensureCodeAccess(sql);
  const rows=await sql`UPDATE gsc_entry_codes SET revoked_at=now() WHERE id=${id}::uuid AND issuer_id=${issuerId} AND revoked_at IS NULL RETURNING id`;
  return rows.length>0;
}
export async function readCodeSession(req,sql){
  const raw=typeof req?.headers?.get==='function'?req.headers.get('cookie'):req?.headers?.cookie;
  const token=String(raw||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(CODE_COOKIE+'='))?.slice(CODE_COOKIE.length+1);
  if(!token)return null;
  if(!/^[A-Za-z0-9_-]{43}$/.test(token))throw error('CODE_SESSION_INVALID',401);
  if(!sql){enabled();sql=getDatabase()}
  await ensureCodeAccess(sql);
  const rows=await sql`SELECT id,role,display_name,event_id,event_kind,expires_at,revoked_at FROM gsc_entry_codes WHERE session_hash=${digest(token)} AND consumed_at IS NOT NULL AND (event_id IS NULL OR EXISTS(SELECT 1 FROM gsc_personal_members m WHERE m.event_id=gsc_entry_codes.event_id AND m.event_kind=gsc_entry_codes.event_kind AND m.account_id=gsc_entry_codes.issuer_id AND m.revoked_at IS NULL AND m.role IN ('organizer','player','scorer')))`;
  if(!rows.length)throw error('CODE_SESSION_INVALID',401);
  const row=rows[0];if(row.revoked_at)throw error('CODE_SESSION_REVOKED',403);if(new Date(row.expires_at)<=new Date())throw error('CODE_SESSION_EXPIRED',410);return {id:'code:'+row.id,name:row.display_name,email:'',codeAccess:true,entryRole:row.role,eventId:row.event_id,eventKind:row.event_kind,expiresAt:row.expires_at};
}
export function codeAccessEnabled(){enabled();return true}
