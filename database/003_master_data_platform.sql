BEGIN;

CREATE TABLE IF NOT EXISTS installations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_key text NOT NULL UNIQUE,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  app_version text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS golf_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_key text NOT NULL UNIQUE,
  display_name text NOT NULL,
  definition jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS course_definition_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES golf_courses(id) ON DELETE CASCADE,
  definition jsonb NOT NULL,
  payload_hash text NOT NULL,
  source text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_key text NOT NULL,
  season_year smallint NOT NULL CHECK (season_year BETWEEN 1900 AND 2200),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (name_key, season_year)
);

ALTER TABLE rounds
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS client_round_id text,
  ADD COLUMN IF NOT EXISTS installation_id uuid REFERENCES installations(id),
  ADD COLUMN IF NOT EXISTS course_id uuid REFERENCES golf_courses(id),
  ADD COLUMN IF NOT EXISTS tournament_id uuid REFERENCES tournaments(id),
  ADD COLUMN IF NOT EXISTS game_mode text NOT NULL DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS category_key text,
  ADD COLUMN IF NOT EXISTS series_round_number smallint,
  ADD COLUMN IF NOT EXISTS raw_snapshot jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS rounds_client_round_id_uidx
  ON rounds (client_round_id);

CREATE INDEX IF NOT EXISTS rounds_course_played_idx
  ON rounds (course_id, played_at DESC);

CREATE INDEX IF NOT EXISTS rounds_tournament_id_idx
  ON rounds (tournament_id, played_at DESC)
  WHERE tournament_id IS NOT NULL;

ALTER TABLE round_players
  ADD COLUMN IF NOT EXISTS client_player_id text,
  ADD COLUMN IF NOT EXISTS registration_code_snapshot varchar(7),
  ADD COLUMN IF NOT EXISTS whatsapp_e164_snapshot text;

CREATE INDEX IF NOT EXISTS round_players_client_player_idx
  ON round_players (round_id, client_player_id)
  WHERE client_player_id IS NOT NULL;

ALTER TABLE hole_scores
  ADD COLUMN IF NOT EXISTS stableford_points smallint,
  ADD COLUMN IF NOT EXISTS fairway text,
  ADD COLUMN IF NOT EXISTS green text,
  ADD COLUMN IF NOT EXISTS putts smallint,
  ADD COLUMN IF NOT EXISTS penalties smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS source_updated_at timestamptz;

CREATE TABLE IF NOT EXISTS player_handicap_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  handicap smallint NOT NULL CHECK (handicap BETWEEN 0 AND 54),
  source text NOT NULL,
  round_id uuid REFERENCES rounds(id),
  payload_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (player_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS player_tee_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  tee_key text NOT NULL,
  source text NOT NULL,
  round_id uuid REFERENCES rounds(id),
  payload_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (player_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS player_contact_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  email_snapshot text,
  whatsapp_country_code_snapshot text,
  whatsapp_national_number_snapshot text,
  whatsapp_e164_snapshot text,
  delivery_preference_snapshot delivery_preference NOT NULL DEFAULT 'none',
  source text NOT NULL,
  payload_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (player_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS round_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  payload_hash text NOT NULL,
  status round_status NOT NULL,
  snapshot jsonb NOT NULL,
  device_at timestamptz,
  received_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (round_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS round_lifecycle_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  status round_status NOT NULL,
  source text NOT NULL,
  payload_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (round_id, payload_hash)
);

CREATE TABLE IF NOT EXISTS score_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id),
  hole smallint NOT NULL CHECK (hole BETWEEN 1 AND 18),
  gross smallint CHECK (gross BETWEEN 1 AND 30),
  handicap_strokes smallint CHECK (handicap_strokes BETWEEN 0 AND 3),
  net smallint,
  relative_to_par smallint,
  stableford_points smallint,
  explicit_x boolean NOT NULL DEFAULT false,
  fairway text,
  green text,
  putts smallint,
  penalties smallint NOT NULL DEFAULT 0,
  source text NOT NULL,
  payload_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (round_id, player_id, hole, payload_hash),
  CHECK ((gross IS NULL) = explicit_x)
);

CREATE TABLE IF NOT EXISTS card_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id),
  player_scope_key text NOT NULL,
  type card_type NOT NULL,
  version integer NOT NULL CHECK (version >= 1),
  content_hash text NOT NULL,
  definition jsonb NOT NULL,
  storage_state text NOT NULL DEFAULT 'reconstructible' CHECK (storage_state IN ('reconstructible','stored')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (round_id, player_scope_key, type, version)
);

CREATE TABLE IF NOT EXISTS share_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_event_id text NOT NULL UNIQUE,
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  player_id uuid REFERENCES players(id),
  card_scope text NOT NULL CHECK (card_scope IN ('global','personal','package')),
  state text NOT NULL CHECK (state IN ('PREPARED','CANCELLED','FAILED')),
  fallback boolean NOT NULL DEFAULT false,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS player_handicap_events_timeline_idx
  ON player_handicap_events (player_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS player_tee_events_timeline_idx
  ON player_tee_events (player_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS player_contact_events_timeline_idx
  ON player_contact_events (player_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS round_snapshots_timeline_idx
  ON round_snapshots (round_id, received_at DESC);
CREATE INDEX IF NOT EXISTS score_events_timeline_idx
  ON score_events (round_id, player_id, hole, occurred_at DESC);
CREATE INDEX IF NOT EXISTS card_records_round_idx
  ON card_records (round_id, created_at DESC);
CREATE INDEX IF NOT EXISTS share_events_round_idx
  ON share_events (round_id, occurred_at DESC);

ALTER TABLE sync_mutations
  ADD COLUMN IF NOT EXISTS schema_version integer,
  ADD COLUMN IF NOT EXISTS device_at timestamptz,
  ADD COLUMN IF NOT EXISTS expected_version integer,
  ADD COLUMN IF NOT EXISTS payload jsonb,
  ADD COLUMN IF NOT EXISTS processed_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS player_profile_events_payload_uidx
  ON player_profile_events (player_id, payload_hash)
  WHERE payload_hash IS NOT NULL;

CREATE OR REPLACE FUNCTION gsc_identity_key(value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT lower(regexp_replace(trim(coalesce(value, '')), '[^[:alnum:]]+', ' ', 'g'))
$$;

CREATE OR REPLACE FUNCTION gsc_upsert_player(
  profile jsonb,
  actor text,
  event_at timestamptz DEFAULT now(),
  linked_round_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  v_player_id uuid;
  v_name text := trim(coalesce(profile->>'fullName', profile->>'name', ''));
  v_identity text := coalesce(nullif(profile->>'identityKey', ''), gsc_identity_key(coalesce(profile->>'fullName', profile->>'name', '')));
  v_code text := upper(nullif(profile->>'registrationCode', ''));
  v_first text;
  v_last text;
  v_short text;
  v_hcp smallint;
  v_tee text := nullif(profile->>'teeKey', '');
  v_email text := nullif(lower(profile->>'email'), '');
  v_cc text := coalesce(nullif(profile#>>'{whatsapp,countryCode}', ''), '502');
  v_national text := nullif(profile#>>'{whatsapp,nationalNumber}', '');
  v_e164 text := nullif(profile#>>'{whatsapp,e164}', '');
  v_preference delivery_preference := coalesce(nullif(profile->>'deliveryPreference', '')::delivery_preference, 'none'::delivery_preference);
  v_has_contact boolean := profile ? 'whatsapp' OR profile ? 'email' OR profile ? 'deliveryPreference';
  v_source text := coalesce(nullif(profile->>'source', ''), actor, 'sync');
  v_profile_hash text;
  v_hcp_hash text;
  v_tee_hash text;
  v_contact_hash text;
BEGIN
  IF v_name = '' THEN
    RAISE EXCEPTION 'PLAYER_NAME_REQUIRED' USING ERRCODE = '22023';
  END IF;
  IF v_code IS NOT NULL AND v_code !~ '^G[A-Z0-9]{6}$' THEN
    RAISE EXCEPTION 'INVALID_REGISTRATION_CODE' USING ERRCODE = '22023';
  END IF;
  IF profile ? 'handicap' AND (profile->>'handicap') <> '' THEN
    v_hcp := (profile->>'handicap')::smallint;
    IF v_hcp < 0 OR v_hcp > 54 THEN RAISE EXCEPTION 'INVALID_HANDICAP' USING ERRCODE = '22023'; END IF;
  END IF;

  v_first := split_part(v_name, ' ', 1);
  v_last := trim(substr(v_name, length(v_first) + 1));
  v_short := v_first;

  IF v_code IS NOT NULL THEN
    SELECT id INTO v_player_id FROM players WHERE registration_code = v_code FOR UPDATE;
  END IF;
  IF v_player_id IS NULL THEN
    SELECT id INTO v_player_id
    FROM players
    WHERE identity_key = v_identity AND archived_at IS NULL
    ORDER BY updated_at DESC
    LIMIT 1
    FOR UPDATE;
  END IF;

  IF v_player_id IS NULL THEN
    INSERT INTO players (first_name, last_name, full_name, short_name, identity_key, registration_code, current_handicap, current_tee_key)
    VALUES (v_first, v_last, v_name, v_short, v_identity, v_code, v_hcp, v_tee)
    RETURNING id INTO v_player_id;
  ELSE
    UPDATE players
    SET first_name = v_first,
        last_name = v_last,
        full_name = v_name,
        short_name = v_short,
        identity_key = v_identity,
        registration_code = coalesce(v_code, registration_code),
        current_handicap = CASE WHEN profile ? 'handicap' THEN v_hcp ELSE current_handicap END,
        current_tee_key = CASE WHEN profile ? 'teeKey' THEN v_tee ELSE current_tee_key END,
        updated_at = greatest(coalesce(event_at, now()), updated_at)
    WHERE id = v_player_id;
  END IF;

  IF v_has_contact THEN
    INSERT INTO player_contacts (player_id, email, whatsapp_country_code, whatsapp_national_number, whatsapp_e164, delivery_preference, updated_at)
    VALUES (v_player_id, v_email, v_cc, v_national, v_e164, v_preference, coalesce(event_at, now()))
    ON CONFLICT (player_id) DO UPDATE SET
      email = EXCLUDED.email,
      whatsapp_country_code = EXCLUDED.whatsapp_country_code,
      whatsapp_national_number = EXCLUDED.whatsapp_national_number,
      whatsapp_e164 = EXCLUDED.whatsapp_e164,
      delivery_preference = EXCLUDED.delivery_preference,
      updated_at = EXCLUDED.updated_at;
  END IF;

  v_profile_hash := encode(digest(jsonb_build_object('name', v_name, 'code', v_code, 'handicap', v_hcp, 'tee', v_tee, 'whatsapp', v_e164)::text, 'sha256'), 'hex');
  INSERT INTO player_profile_events (player_id, event_type, registration_code_snapshot, full_name_snapshot, handicap_snapshot, tee_key_snapshot, whatsapp_country_code_snapshot, whatsapp_national_number_snapshot, actor_id, occurred_at, payload_hash)
  VALUES (v_player_id, CASE WHEN v_source = 'dictation' THEN 'dictation' WHEN v_source = 'correction' THEN 'correction' WHEN v_source = 'migration' THEN 'migration' ELSE 'registration' END, v_code, v_name, v_hcp, v_tee, v_cc, v_national, actor, coalesce(event_at, now()), v_profile_hash)
  ON CONFLICT DO NOTHING;

  IF v_hcp IS NOT NULL THEN
    v_hcp_hash := encode(digest(jsonb_build_object('handicap', v_hcp, 'round', linked_round_id)::text, 'sha256'), 'hex');
    INSERT INTO player_handicap_events (player_id, handicap, source, round_id, payload_hash, occurred_at)
    VALUES (v_player_id, v_hcp, v_source, linked_round_id, v_hcp_hash, coalesce(event_at, now()))
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_tee IS NOT NULL THEN
    v_tee_hash := encode(digest(jsonb_build_object('tee', v_tee, 'round', linked_round_id)::text, 'sha256'), 'hex');
    INSERT INTO player_tee_events (player_id, tee_key, source, round_id, payload_hash, occurred_at)
    VALUES (v_player_id, v_tee, v_source, linked_round_id, v_tee_hash, coalesce(event_at, now()))
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_has_contact THEN
    v_contact_hash := encode(digest(jsonb_build_object('email', v_email, 'cc', v_cc, 'national', v_national, 'e164', v_e164, 'preference', v_preference)::text, 'sha256'), 'hex');
    INSERT INTO player_contact_events (player_id, email_snapshot, whatsapp_country_code_snapshot, whatsapp_national_number_snapshot, whatsapp_e164_snapshot, delivery_preference_snapshot, source, payload_hash, occurred_at)
    VALUES (v_player_id, v_email, v_cc, v_national, v_e164, v_preference, v_source, v_contact_hash, coalesce(event_at, now()))
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN v_player_id;
END;
$$;

CREATE OR REPLACE FUNCTION apply_master_sync_mutation(
  p_client_mutation_id text,
  p_installation_key text,
  p_entity_type text,
  p_entity_id text,
  p_payload_hash text,
  p_schema_version integer,
  p_device_at timestamptz,
  p_expected_version integer,
  p_payload jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_existing sync_mutations%ROWTYPE;
  v_installation_id uuid;
  v_round jsonb;
  v_course jsonb;
  v_tournament jsonb;
  v_profile jsonb;
  v_profile_event jsonb;
  v_round_player jsonb;
  v_hole jsonb;
  v_card jsonb;
  v_share jsonb;
  v_course_id uuid;
  v_tournament_id uuid;
  v_round_id uuid;
  v_player_id uuid;
  v_round_status round_status;
  v_played_at timestamptz;
  v_closed_at timestamptz;
  v_score_hash text;
  v_result jsonb;
  v_processed_players integer := 0;
  v_processed_scores integer := 0;
BEGIN
  IF p_entity_type <> 'master-snapshot' THEN
    RAISE EXCEPTION 'UNSUPPORTED_ENTITY_TYPE' USING ERRCODE = '22023';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(p_client_mutation_id, 0));
  SELECT * INTO v_existing FROM sync_mutations WHERE client_mutation_id = p_client_mutation_id;
  IF FOUND THEN
    IF v_existing.payload_hash <> p_payload_hash THEN
      RAISE EXCEPTION 'IDEMPOTENCY_CONFLICT' USING ERRCODE = '23505';
    END IF;
    RETURN jsonb_build_object('accepted', true, 'duplicate', true, 'result', v_existing.result);
  END IF;

  INSERT INTO installations (installation_key, last_seen_at, app_version)
  VALUES (p_installation_key, now(), nullif(p_payload#>>'{round,appVersion}', ''))
  ON CONFLICT (installation_key) DO UPDATE SET last_seen_at = now(), app_version = coalesce(EXCLUDED.app_version, installations.app_version)
  RETURNING id INTO v_installation_id;

  FOR v_profile IN SELECT value FROM jsonb_array_elements(coalesce(p_payload->'profiles', '[]'::jsonb)) LOOP
    FOR v_profile_event IN SELECT value FROM jsonb_array_elements(coalesce(v_profile->'profileHistory', '[]'::jsonb)) LOOP
      PERFORM gsc_upsert_player(v_profile_event || jsonb_build_object('registrationCode', coalesce(v_profile_event->>'registrationCode', v_profile->>'registrationCode')), p_installation_key, coalesce((v_profile_event->>'occurredAt')::timestamptz, p_device_at, now()), NULL);
    END LOOP;
    PERFORM gsc_upsert_player(v_profile, p_installation_key, coalesce((v_profile->>'occurredAt')::timestamptz, p_device_at, now()), NULL);
    v_processed_players := v_processed_players + 1;
  END LOOP;

  v_round := p_payload->'round';
  IF v_round IS NOT NULL AND jsonb_typeof(v_round) = 'object' THEN
    v_course := coalesce(v_round->'course', '{}'::jsonb);
    INSERT INTO golf_courses (course_key, display_name, definition, updated_at)
    VALUES (coalesce(nullif(v_course->>'key', ''), 'unknown'), coalesce(nullif(v_course->>'name', ''), 'CAMPO'), coalesce(v_course->'definition', '{}'::jsonb), now())
    ON CONFLICT (course_key) DO UPDATE SET display_name = EXCLUDED.display_name, definition = EXCLUDED.definition, updated_at = now()
    RETURNING id INTO v_course_id;

    INSERT INTO course_definition_events (course_id, definition, payload_hash, source, occurred_at)
    VALUES (v_course_id, coalesce(v_course->'definition', '{}'::jsonb), encode(digest(coalesce(v_course->'definition', '{}'::jsonb)::text, 'sha256'), 'hex'), p_installation_key, coalesce(p_device_at, now()))
    ON CONFLICT DO NOTHING;

    v_played_at := coalesce((v_round->>'playedAt')::timestamptz, p_device_at, now());
    v_tournament := v_round->'tournament';
    IF v_tournament IS NOT NULL AND nullif(trim(v_tournament->>'name'), '') IS NOT NULL THEN
      INSERT INTO tournaments (name, name_key, season_year, metadata, updated_at)
      VALUES (trim(v_tournament->>'name'), gsc_identity_key(v_tournament->>'name'), extract(year from v_played_at)::smallint, v_tournament, now())
      ON CONFLICT (name_key, season_year) DO UPDATE SET name = EXCLUDED.name, metadata = EXCLUDED.metadata, updated_at = now()
      RETURNING id INTO v_tournament_id;
    END IF;

    v_closed_at := nullif(v_round->>'officiallyClosedAt', '')::timestamptz;
    v_round_status := CASE
      WHEN v_round->>'status' = 'corrected' AND v_closed_at IS NOT NULL THEN 'corrected'::round_status
      WHEN v_closed_at IS NOT NULL THEN 'officially_closed'::round_status
      WHEN v_round->>'status' = 'ready_to_close' THEN 'ready_to_close'::round_status
      ELSE 'active'::round_status
    END;

    INSERT INTO rounds (client_round_id, installation_id, version, status, course_id, course_key, course_name, tournament_id, tournament_name, game_mode, category_key, series_round_number, played_at, officially_closed_at, rules_version, app_version, snapshot_hash, raw_snapshot, updated_at)
    VALUES (v_round->>'clientRoundId', v_installation_id, greatest(1, coalesce((v_round->>'version')::integer, 1)), v_round_status, v_course_id, v_course->>'key', v_course->>'name', v_tournament_id, v_tournament->>'name', coalesce(nullif(v_round->>'mode', ''), 'general'), nullif(v_round->>'categoryKey', ''), nullif(v_round->>'seriesRoundNumber', '')::smallint, v_played_at, v_closed_at, coalesce(nullif(v_round->>'rulesVersion', ''), 'unknown'), coalesce(nullif(v_round->>'appVersion', ''), 'unknown'), nullif(v_round->>'snapshotHash', ''), v_round, now())
    ON CONFLICT (client_round_id) DO UPDATE SET
      installation_id = EXCLUDED.installation_id,
      version = greatest(rounds.version, EXCLUDED.version),
      status = EXCLUDED.status,
      course_id = EXCLUDED.course_id,
      course_key = EXCLUDED.course_key,
      course_name = EXCLUDED.course_name,
      tournament_id = EXCLUDED.tournament_id,
      tournament_name = EXCLUDED.tournament_name,
      game_mode = EXCLUDED.game_mode,
      category_key = EXCLUDED.category_key,
      series_round_number = EXCLUDED.series_round_number,
      officially_closed_at = EXCLUDED.officially_closed_at,
      snapshot_hash = coalesce(EXCLUDED.snapshot_hash, rounds.snapshot_hash),
      raw_snapshot = EXCLUDED.raw_snapshot,
      updated_at = now()
    RETURNING id INTO v_round_id;

    INSERT INTO round_snapshots (round_id, payload_hash, status, snapshot, device_at)
    VALUES (v_round_id, p_payload_hash, v_round_status, v_round, p_device_at)
    ON CONFLICT DO NOTHING;
    INSERT INTO round_lifecycle_events (round_id, status, source, payload_hash, occurred_at)
    VALUES (v_round_id, v_round_status, p_installation_key, encode(digest(jsonb_build_object('status', v_round_status, 'closedAt', v_closed_at)::text, 'sha256'), 'hex'), coalesce(p_device_at, now()))
    ON CONFLICT DO NOTHING;

    FOR v_round_player IN SELECT value FROM jsonb_array_elements(coalesce(v_round->'players', '[]'::jsonb)) LOOP
      v_player_id := gsc_upsert_player(v_round_player, p_installation_key, coalesce((v_round_player->>'updatedAt')::timestamptz, p_device_at, now()), v_round_id);
      v_processed_players := v_processed_players + 1;
      INSERT INTO round_players (round_id, player_id, client_player_id, registration_code_snapshot, visual_slot, display_name, handicap, tee_key, matrix_key, whatsapp_e164_snapshot, active_from)
      VALUES (v_round_id, v_player_id, nullif(v_round_player->>'clientPlayerId', ''), nullif(v_round_player->>'registrationCode', ''), coalesce((v_round_player->>'visualSlot')::smallint, 1), v_round_player->>'fullName', coalesce((v_round_player->>'handicap')::smallint, 0), coalesce(nullif(v_round_player->>'teeKey', ''), 'Blanco'), coalesce(nullif(v_round_player->>'matrixKey', ''), 'Caballeros'), nullif(v_round_player#>>'{whatsapp,e164}', ''), coalesce((v_round_player->>'activeFrom')::smallint, 1))
      ON CONFLICT (round_id, player_id) DO UPDATE SET
        client_player_id = EXCLUDED.client_player_id,
        registration_code_snapshot = EXCLUDED.registration_code_snapshot,
        visual_slot = EXCLUDED.visual_slot,
        display_name = EXCLUDED.display_name,
        handicap = EXCLUDED.handicap,
        tee_key = EXCLUDED.tee_key,
        matrix_key = EXCLUDED.matrix_key,
        whatsapp_e164_snapshot = EXCLUDED.whatsapp_e164_snapshot,
        active_from = EXCLUDED.active_from;

      FOR v_hole IN SELECT value FROM jsonb_array_elements(coalesce(v_round_player->'holes', '[]'::jsonb)) LOOP
        v_score_hash := encode(digest(v_hole::text, 'sha256'), 'hex');
        INSERT INTO hole_scores (round_id, player_id, hole, par, stroke_index, gross, handicap_strokes, net, relative_to_par, stableford_points, explicit_x, fairway, green, putts, penalties, source_updated_at, updated_at)
        VALUES (v_round_id, v_player_id, (v_hole->>'hole')::smallint, (v_hole->>'par')::smallint, coalesce((v_hole->>'strokeIndex')::smallint, (v_hole->>'hole')::smallint), nullif(v_hole->>'gross', '')::smallint, coalesce((v_hole->>'handicapStrokes')::smallint, 0), nullif(v_hole->>'net', '')::smallint, nullif(v_hole->>'relativeToPar', '')::smallint, nullif(v_hole->>'stablefordPoints', '')::smallint, coalesce((v_hole->>'explicitX')::boolean, false), nullif(v_hole->>'fairway', ''), nullif(v_hole->>'green', ''), nullif(v_hole->>'putts', '')::smallint, coalesce((v_hole->>'penalties')::smallint, 0), nullif(v_hole->>'updatedAt', '')::timestamptz, now())
        ON CONFLICT (round_id, player_id, hole) DO UPDATE SET
          par = EXCLUDED.par,
          stroke_index = EXCLUDED.stroke_index,
          gross = EXCLUDED.gross,
          handicap_strokes = EXCLUDED.handicap_strokes,
          net = EXCLUDED.net,
          relative_to_par = EXCLUDED.relative_to_par,
          stableford_points = EXCLUDED.stableford_points,
          explicit_x = EXCLUDED.explicit_x,
          fairway = EXCLUDED.fairway,
          green = EXCLUDED.green,
          putts = EXCLUDED.putts,
          penalties = EXCLUDED.penalties,
          source_updated_at = EXCLUDED.source_updated_at,
          updated_at = now();

        INSERT INTO score_events (round_id, player_id, hole, gross, handicap_strokes, net, relative_to_par, stableford_points, explicit_x, fairway, green, putts, penalties, source, payload_hash, occurred_at)
        VALUES (v_round_id, v_player_id, (v_hole->>'hole')::smallint, nullif(v_hole->>'gross', '')::smallint, coalesce((v_hole->>'handicapStrokes')::smallint, 0), nullif(v_hole->>'net', '')::smallint, nullif(v_hole->>'relativeToPar', '')::smallint, nullif(v_hole->>'stablefordPoints', '')::smallint, coalesce((v_hole->>'explicitX')::boolean, false), nullif(v_hole->>'fairway', ''), nullif(v_hole->>'green', ''), nullif(v_hole->>'putts', '')::smallint, coalesce((v_hole->>'penalties')::smallint, 0), p_installation_key, v_score_hash, coalesce(nullif(v_hole->>'updatedAt', '')::timestamptz, p_device_at, now()))
        ON CONFLICT DO NOTHING;
        v_processed_scores := v_processed_scores + 1;
      END LOOP;
    END LOOP;

    FOR v_card IN SELECT value FROM jsonb_array_elements(coalesce(v_round->'cards', '[]'::jsonb)) LOOP
      v_player_id := NULL;
      IF nullif(v_card->>'clientPlayerId', '') IS NOT NULL THEN
        SELECT rp.player_id INTO v_player_id
        FROM round_players rp
        WHERE rp.round_id = v_round_id AND rp.client_player_id = v_card->>'clientPlayerId'
        LIMIT 1;
      END IF;
      INSERT INTO card_records (round_id, player_id, player_scope_key, type, version, content_hash, definition, storage_state)
      VALUES (v_round_id, v_player_id, coalesce(nullif(v_card->>'clientPlayerId', ''), 'GLOBAL'), CASE WHEN v_card->>'type' = 'personal' THEN 'personal'::card_type ELSE 'global'::card_type END, greatest(1, coalesce((v_card->>'version')::integer, 1)), coalesce(nullif(v_card->>'contentHash', ''), p_payload_hash), v_card, coalesce(nullif(v_card->>'storageState', ''), 'reconstructible'))
      ON CONFLICT (round_id, player_scope_key, type, version) DO UPDATE SET player_id = EXCLUDED.player_id, content_hash = EXCLUDED.content_hash, definition = EXCLUDED.definition, storage_state = EXCLUDED.storage_state;
    END LOOP;

    FOR v_share IN SELECT value FROM jsonb_array_elements(coalesce(v_round->'shareEvents', '[]'::jsonb)) LOOP
      v_player_id := NULL;
      IF nullif(v_share->>'clientPlayerId', '') IS NOT NULL THEN
        SELECT rp.player_id INTO v_player_id
        FROM round_players rp
        WHERE rp.round_id = v_round_id AND rp.client_player_id = v_share->>'clientPlayerId'
        LIMIT 1;
      END IF;
      INSERT INTO share_events (client_event_id, round_id, player_id, card_scope, state, fallback, details, occurred_at)
      VALUES (v_share->>'clientEventId', v_round_id, v_player_id, coalesce(nullif(v_share->>'cardScope', ''), 'global'), coalesce(nullif(v_share->>'state', ''), 'PREPARED'), coalesce((v_share->>'fallback')::boolean, false), v_share, coalesce(nullif(v_share->>'occurredAt', '')::timestamptz, p_device_at, now()))
      ON CONFLICT (client_event_id) DO NOTHING;
    END LOOP;
  END IF;

  v_result := jsonb_build_object(
    'accepted', true,
    'entityType', p_entity_type,
    'entityId', p_entity_id,
    'playersProcessed', v_processed_players,
    'scoresProcessed', v_processed_scores,
    'roundStored', v_round_id IS NOT NULL
  );

  INSERT INTO sync_mutations (client_mutation_id, installation_id, entity_type, entity_id, payload_hash, schema_version, device_at, expected_version, payload, result, processed_at)
  VALUES (p_client_mutation_id, p_installation_key, p_entity_type, p_entity_id, p_payload_hash, p_schema_version, p_device_at, p_expected_version, p_payload, v_result, now());

  RETURN jsonb_build_object('accepted', true, 'duplicate', false, 'result', v_result);
END;
$$;

COMMIT;
