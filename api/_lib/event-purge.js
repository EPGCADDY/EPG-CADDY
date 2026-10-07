import {eventKind,eventScope} from './personal-event-access.js';

export async function purgeExpiredEventArtifacts(sql,value){
 const kind=eventKind(value),scoped=eventScope(sql,kind);
 return scoped`WITH expired AS MATERIALIZED (
  SELECT id FROM live_tournaments
  WHERE status='revoked' AND expires_at<=now()
    AND (completed_at IS NOT NULL OR base_expires_at IS NULL OR base_expires_at<=now())
  ORDER BY expires_at
  LIMIT 100
  FOR UPDATE SKIP LOCKED
 ),
 removed_invites AS (
  DELETE FROM gsc_personal_invites WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired) RETURNING id
 ),
 removed_members AS (
  DELETE FROM gsc_personal_members WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_invites)>=0 RETURNING account_id
 ),
 removed_codes AS (
  DELETE FROM gsc_tournament_entry_codes WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_members)>=0 RETURNING code_hash
 ),
 removed_personal AS (
  DELETE FROM gsc_personal_events WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_codes)>=0 RETURNING event_id
 ),
 removed_grants AS (
  DELETE FROM gsc_event_admin_grants WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_personal)>=0 RETURNING id
 ),
 removed_owners AS (
  DELETE FROM gsc_event_admin_legacy_owners WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_grants)>=0 RETURNING event_id
 ),
 removed_deletions AS (
  DELETE FROM gsc_event_deletions WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_owners)>=0 RETURNING id
 ),
 removed_audit AS (
  DELETE FROM gsc_personal_audit WHERE event_kind=${kind} AND event_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_deletions)>=0 RETURNING id
 ),
 removed_streams AS (
  DELETE FROM live_streams WHERE tournament_id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_audit)>=0 RETURNING id
 ),
 removed_events AS (
  DELETE FROM live_tournaments WHERE id IN(SELECT id FROM expired)
    AND (SELECT count(*) FROM removed_streams)>=0 RETURNING id
 )
 SELECT id FROM removed_events`;
}

export async function permanentlyDeleteEventArtifacts(sql,eventId,value,authorized){
 const kind=eventKind(value),scoped=eventScope(sql,kind);
 const rows=await scoped`WITH authorized AS MATERIALIZED (
  SELECT id FROM live_tournaments
  WHERE id=${eventId}::uuid AND status<>'revoked'
    AND (${authorized.authority!=='delegate'}::boolean OR EXISTS(
      SELECT 1 FROM gsc_event_admin_grants
      WHERE id=${authorized.grantId}::uuid
        AND event_id=${eventId}::uuid AND event_kind=${kind}
        AND recipient_account_id=${authorized.accountId}
        AND redeemed_at IS NOT NULL AND revoked_at IS NULL AND expires_at>now()
        AND (live_tournaments.completed_at IS NULL OR live_tournaments.completed_at+interval '24 hours'>now())
      FOR SHARE
    ))
  FOR UPDATE
 ),
 removed_invites AS (
  DELETE FROM gsc_personal_invites WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized) RETURNING id
 ),
 removed_members AS (
  DELETE FROM gsc_personal_members WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_invites)>=0 RETURNING account_id
 ),
 removed_codes AS (
  DELETE FROM gsc_tournament_entry_codes WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_members)>=0 RETURNING code_hash
 ),
 removed_personal AS (
  DELETE FROM gsc_personal_events WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_codes)>=0 RETURNING event_id
 ),
 removed_grants AS (
  DELETE FROM gsc_event_admin_grants WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_personal)>=0 RETURNING id
 ),
 removed_owners AS (
  DELETE FROM gsc_event_admin_legacy_owners WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_grants)>=0 RETURNING event_id
 ),
 removed_deletions AS (
  DELETE FROM gsc_event_deletions WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_owners)>=0 RETURNING id
 ),
 removed_audit AS (
  DELETE FROM gsc_personal_audit WHERE event_kind=${kind} AND event_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_deletions)>=0 RETURNING id
 ),
 removed_streams AS (
  DELETE FROM live_streams WHERE tournament_id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_audit)>=0 RETURNING id
 ),
 removed_events AS (
  DELETE FROM live_tournaments WHERE id IN(SELECT id FROM authorized)
    AND (SELECT count(*) FROM removed_streams)>=0 RETURNING id
 )
 SELECT id FROM removed_events`;
 return rows.length>0;
}
