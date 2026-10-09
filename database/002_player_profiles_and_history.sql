BEGIN;

ALTER TABLE players
  ADD COLUMN IF NOT EXISTS registration_code varchar(7),
  ADD COLUMN IF NOT EXISTS current_handicap smallint,
  ADD COLUMN IF NOT EXISTS current_tee_key text,
  ADD CONSTRAINT players_registration_code_format CHECK (registration_code IS NULL OR registration_code ~ '^G[A-Z0-9]{6}$'),
  ADD CONSTRAINT players_current_handicap_range CHECK (current_handicap IS NULL OR current_handicap BETWEEN 0 AND 54);

CREATE UNIQUE INDEX IF NOT EXISTS players_registration_code_uidx
  ON players (registration_code)
  WHERE registration_code IS NOT NULL;

CREATE TABLE IF NOT EXISTS player_profile_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  event_type text NOT NULL DEFAULT 'registration' CHECK (event_type IN ('registration','dictation','correction','migration')),
  registration_code_snapshot varchar(7),
  full_name_snapshot text NOT NULL,
  handicap_snapshot smallint CHECK (handicap_snapshot IS NULL OR handicap_snapshot BETWEEN 0 AND 54),
  tee_key_snapshot text,
  whatsapp_country_code_snapshot text,
  whatsapp_national_number_snapshot text,
  actor_id text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  payload_hash text,
  CHECK (registration_code_snapshot IS NULL OR registration_code_snapshot ~ '^G[A-Z0-9]{6}$')
);

CREATE INDEX IF NOT EXISTS player_profile_events_player_idx
  ON player_profile_events (player_id, occurred_at DESC);

COMMIT;
