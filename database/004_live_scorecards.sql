BEGIN;

CREATE TABLE IF NOT EXISTS live_tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  organizer_secret_hash char(64) NOT NULL UNIQUE,
  viewer_token_hash char(64) NOT NULL UNIQUE,
  join_code_hash char(64) NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','finished','revoked')),
  revision bigint NOT NULL DEFAULT 0 CHECK (revision >= 0),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

CREATE TABLE IF NOT EXISTS live_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_client_id text NOT NULL CHECK (char_length(round_client_id) BETWEEN 8 AND 160),
  scope text NOT NULL CHECK (scope IN ('player','group')),
  group_label text NOT NULL CHECK (char_length(group_label) BETWEEN 1 AND 120),
  selected_player_ids jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(selected_player_ids) = 'array'),
  consent jsonb NOT NULL CHECK (jsonb_typeof(consent) = 'object'),
  publisher_secret_hash char(64) NOT NULL UNIQUE,
  viewer_token_hash char(64) NOT NULL UNIQUE,
  tournament_id uuid REFERENCES live_tournaments(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','finished','revoked')),
  revision bigint NOT NULL DEFAULT 0 CHECK (revision >= 0),
  current_snapshot jsonb,
  last_mutation_id text,
  last_mutation_result jsonb,
  device_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

CREATE TABLE IF NOT EXISTS live_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stream_id uuid REFERENCES live_streams(id) ON DELETE CASCADE,
  tournament_id uuid REFERENCES live_tournaments(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('created','published','joined_tournament','left_tournament','finished','revoked')),
  actor_hash char(64),
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  CHECK (stream_id IS NOT NULL OR tournament_id IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS live_rate_limits (
  scope_key_hash char(64) PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS live_streams_tournament_page_idx
  ON live_streams (tournament_id, id)
  WHERE tournament_id IS NOT NULL AND status = 'active';
CREATE INDEX IF NOT EXISTS live_streams_round_idx
  ON live_streams (round_client_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS live_streams_expiry_idx
  ON live_streams (expires_at);
CREATE INDEX IF NOT EXISTS live_tournaments_expiry_idx
  ON live_tournaments (expires_at);
CREATE INDEX IF NOT EXISTS live_events_stream_timeline_idx
  ON live_events (stream_id, occurred_at DESC)
  WHERE stream_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS live_events_tournament_timeline_idx
  ON live_events (tournament_id, occurred_at DESC)
  WHERE tournament_id IS NOT NULL;

COMMIT;
