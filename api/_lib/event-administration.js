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
 const scoped=eventScope(sql,event.eventKind),rows=await scoped`SELECT id,name,status,expires_at,completed_at ������q�^�