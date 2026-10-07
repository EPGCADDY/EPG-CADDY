import {createHash,randomBytes} from 'node:crypto';
import {accessError,eventKind,eventScope} from './personal-event-access.js';
import {permanentlyDeleteEventArtifacts} from './event-purge.js';
const hash=s=>createHash('sha256').update(String(s)).digest('hex');
export async function ensureEventAdministration(sql){
 await sql`CREATE TABLE IF NOT EXISTS gsc_event_admin_grants(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),event_id uuid NOT NULL,event_kind text NOT NULL,issuer_account_id text NOT NULL,recipient_account_id text NOT NULL,recipient_name text NOT NULL,code_hash char(64) UNIQUE NOT NULL,redeemed_at timestamptz,revoked_at timestamptz,created_at timestamptz NOT NULL DEFAULT now(),expires_at timestamptz NOT NULL)`;
 await sql`CREATE TABLE IF NOT EXISTS gsc_event_deletions(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,event_id uuid NOT NULL,event_kind text NOT NULL,event_name text NOT NULL,actor_account_id text NOT NULL,grant_id uuid,recipient_name text NOT NULL,reason text NOT NULL,deleted_at timestamptz NOT NULL DEFAULT now(),UNIQUE(event_id,event_kind))`;
 await sql`CREATE TABLE IF NOT EXISTS gsc_event_admin_legacy_owners(event_id uuid NOT NULL,event_kind text NOT NULL,owner_account_id text NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(event_id,event_kind))`;
}
export async function eventAdminAuthority(sql,event,account,owner=false){
 const scoped=eventScope(sql,event.eventKind),rows=await scoped`SELECT id,name,status,expires_at,completed_at FROM live_tournaments WHERE id=${event.eventId}::uuid`;
 if(!rows.length)throw accessError('EVENT_NOT_FOUND',404);
 if(owner)return {...rows[0],authority:'owner',grantId:null,recipientName:account.name||'Propietario'};
 const creators=await sql`SELECT owner_account_id FROM gsc_personal_events WHERE event_id=${event.eventId}::uuid AND event_kind=${event.eventKind} AND owner_account_id=${account.id}`;
 if(creators.length)return {...rows[0],authority:'creator',grantId:null,recipientName:account.name||'Creador'};
 const legacy=await sql`SELECT owner_account_id FROM gsc_event_admin_legacy_owners WHERE event_id=${event.eventId}::uuid AND event_kind=${event.eventKind} AND owner_account_id=${account.id}`;
 if(legacy.length)return {...rows[0],authority:'legacy_creator',grantId:null,recipientName:account.name||'Organizador'};
 const grants=await sql`SELECT id,recipient_name FROM gsc_event_admin_grants WHERE event_id=${event.eventId}::uuid AND event_kind=${event.eventKind} AND recipient_account_id=${account.id} AND redeemed_at IS NOT NULL AND revoked_at IS NULL AND expires_at>now() AND (${rows[0].completed_at}::timestamptz IS NULL OR ${rows[0].completed_at}::timestamptz+interval '24 hours'>now()) LIMIT 1`;
 if(!grants.length)throw accessError('EVENT_ADMIN_REQUIRED');
 return {...rows[0],authority:'delegate',grantId:grants[0].id,recipientName:grants[0].recipient_name};
}
export async function claimLegacyEvent(sql,event,account,organizerSecret){
 const secret=String(organizerSecret||'');
 if(!/^[A-Za-z0-9_-]{32,128}$/.test(secret))throw accessError('EVENT_OWNER_PROOF_INVALID',403);
 const scoped=eventScope(sql,event.eventKind),events=await scoped`SELECT id,name FROM live_tournaments WHERE id=${event.eventId}::uuid AND organizer_secret_hash=${hash(secret)} AND status<>'revoked'`;
 if(!events.length)throw accessError('EVENT_OWNER_PROOF_INVALID',403);
 await sql`INSERT INTO gsc_event_admin_legacy_owners(event_id,event_kind,owner_account_id) VALUES(${event.eventId}::uuid,${event.eventKind},${account.id}) ON CONFLICT(event_id,event_kind) DO NOTHING`;
 const claims=await sql`SELECT owner_account_id FROM gsc_event_admin_legacy_owners WHERE event_id=${event.eventId}::uuid AND event_kind=${event.eventKind}`;
 if(claims[0]?.owner_account_id!==account.id)throw accessError('EVENT_ADMIN_REQUIRED',403);
 return{ok:true,eventId:event.eventId,eventKind:event.eventKind,name:events[0].name};
}
export async function issueEventAdmin(sql,event,account,owner,body){
 const authority=await eventAdminAuthority(sql,event,account,owner);
 if(authority.authority==='delegate')throw accessError('EVENT_OWNER_REQUIRED');
 if(authority.status==='revoked'||new Date(authority.expires_at)<=new Date())throw accessError('LIVE_EXPIRED',410);
 const recipient=String(body.recipientAccountId||'').trim(),name=String(body.recipientName||'').trim();
 if(!recipient||recipient.length>160||!name||name.length>120||recipient===account.id)throw accessError('ADMIN_RECIPIENT_REQUIRED',400);
 const code=randomBytes(24).toString('base64url'),rows=await sql`INSERT INTO gsc_event_admin_grants(event_id,event_kind,issuer_account_id,recipient_account_id,recipient_name,code_hash,expires_at) VALUES(${event.eventId}::uuid,${event.eventKind},${account.id},${recipient},${name},${hash(code)},${authority.completed_at?new Date(new Date(authority.completed_at).getTime()+86400000).toISOString():authority.expires_at}::timestamptz) RETURNING id,expires_at`;
 return{ok:true,code,grantId:rows[0].id,codeLabel:'ADM-'+rows[0].id,expiresAt:rows[0].expires_at};
}
export async function redeemEventAdmin(sql,account,code){
 if(!/^[A-Za-z0-9_-]{32}$/.test(String(code)))throw accessError('ADMIN_CODE_INVALID',400);
 const grants=await sql`SELECT * FROM gsc_event_admin_grants WHERE code_hash=${hash(code)} AND recipient_account_id=${account.id} AND redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>now() LIMIT 1`;
 if(!grants.length)throw accessError('ADMIN_CODE_INVALID');
 const grant=grants[0],scoped=eventScope(sql,grant.event_kind),rows=await scoped`SELECT id FROM live_tournaments WHERE id=${grant.event_id}::uuid AND status<>'revoked' AND expires_at>now() AND (completed_at IS NULL OR completed_at+interval '24 hours'>now())`;
 if(!rows.length)throw accessError('LIVE_EXPIRED',410);
 const redeemed=await sql`UPDATE gsc_event_admin_grants SET redeemed_at=now() WHERE id=${grant.id}::uuid AND redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>now() RETURNING id`;
 if(!redeemed.length)throw accessError('ADMIN_CODE_INVALID');
 return{ok:true,eventId:grant.event_id,eventKind:grant.event_kind,codeLabel:'ADM-'+grant.id};
}
export async function deleteAdminEvent(sql,event,account,owner,body){
 const authority=await eventAdminAuthority(sql,event,account,owner);
 if(String(body.confirmName||'').trim()!==authority.name)throw accessError('EVENT_NAME_CONFIRMATION_REQUIRED',400);
 const reason=String(body.reason||'').trim().slice(0,500);
 if(!reason)throw accessError('EVENT_DELETE_REASON_REQUIRED',400);
 const removed=await permanentlyDeleteEventArtifacts(sql,event.eventId,event.eventKind,{...authority,accountId:account.id});
 if(!removed)throw accessError('EVENT_DELETE_NOT_AVAILABLE',409);
 return{ok:true,deleted:true};
}
