import {privateRoundCompletion} from './private-round-lifecycle.js';
import {purgeExpiredEventArtifacts} from './event-purge.js';
import {ensureEventAdministration} from './event-administration.js';
import {ensurePersonalAccess,eventScope} from './personal-event-access.js';
export async function ensureEventLifecycle(sql,kinds=['tournament','private']){
 await sql`CREATE TABLE IF NOT EXISTS live_private_rounds (LIKE live_tournaments INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES,viewer_access_token text)`;
 await sql`CREATE TABLE IF NOT EXISTS live_private_streams (LIKE live_streams INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)`;
 await sql`CREATE OR REPLACE FUNCTION gsc_score_fingerprint(snapshot jsonb) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$ SELECT coalesce(jsonb_agg(jsonb_build_array(p->>'id',h->'hole',h->'gross',coalesce(h->'explicitX','false'::jsonb)) ORDER BY p->>'id',(h->>'hole')::integer),'[]'::jsonb) FROM jsonb_array_elements(coalesce(snapshot->'players','[]'::jsonb)) p CROSS JOIN LATERAL jsonb_array_elements(coalesce(p->'holes','[]'::jsonb)) h WHERE (h->>'hole')::integer BETWEEN 1 AND 18 AND (coalesce((h->>'gross')::numeric,0)>0 OR h->>'explicitX'='true') $$`;
 for(const kind of kinds){
 const scoped=eventScope(sql,kind);
 await scoped`ALTER TABLE live_tournaments ADD COLUMN IF NOT EXISTS completed_at timestamptz,ADD COLUMN IF NOT EXISTS completed_roster text,ADD COLUMN IF NOT EXISTS base_expires_at timestamptz,ADD COLUMN IF NOT EXISTS la������q�^�