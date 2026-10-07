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
  DELETE FROM gsc_event_admin_legacy_owners WHERE event_kind=${kind} AND event_id IN(SELECT id F������q�^�