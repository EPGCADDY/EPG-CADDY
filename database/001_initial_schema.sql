BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE delivery_preference AS ENUM ('email','whatsapp','both','none');
CREATE TYPE consent_action AS ENUM ('granted','withdrawn');
CREATE TYPE round_status AS ENUM ('active','ready_to_close','officially_closed','corrected');
CREATE TYPE card_type AS ENUM ('global','personal');
CREATE TYPE delivery_channel AS ENUM ('email','whatsapp');
CREATE TYPE delivery_status AS ENUM ('not_authorized','no_destination','pending','prepared','sending','delivered','failed','cancelled');

CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL DEFAULT '',
  full_name text NOT NULL,
  short_name text NOT NULL,
  identity_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE player_contacts (
  player_id uuid PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  email text,
  whatsapp_country_code text,
  whatsapp_national_number text,
  whatsapp_e164 text,
  delivery_preference delivery_preference NOT NULL DEFAULT 'none',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (email IS NULL OR position('@' in email) > 1),
  CHECK (whatsapp_e164 IS NULL OR whatsapp_e164 ~ '^\+[1-9][0-9]{7,14}$')
);

CREATE TABLE consent_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  action consent_action NOT NULL,
  scope text NOT NULL,
  policy_version text NOT NULL,
  channel delivery_channel,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_id text NOT NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE rounds (
  id uuid PRIMARY KEY,
  parent_round_id uuid REFERENCES rounds(id),
  version integer NOT NULL DEFAULT 1 CHECK (version >= 1),
  status round_status NOT NULL DEFAULT 'active',
  course_key text NOT NULL,
  course_name text NOT NULL,
  tournament_name text,
  played_at timestamptz NOT NULL,
  officially_closed_at timestamptz,
  correction_label text,
  rules_version text NOT NULL,
  app_version text NOT NULL,
  snapshot_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, version),
  CHECK ((status IN ('officially_closed','corrected')) = (officially_closed_at IS NOT NULL))
);

CREATE TABLE round_players (
  round_id uuid NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id),
  visual_slot smallint NOT NULL CHECK (visual_slot BETWEEN 1 AND 6),
  display_name text NOT NULL,
  handicap smallint NOT NULL CHECK (handicap BETWEEN 0 AND 54),
  tee_key text NOT NULL,
  matrix_key text NOT NULL,
  active_from smallint NOT NULL DEFAULT 1 CHECK (active_from BETWEEN 1 AND 18),
  final_position smallint,
  PRIMARY KEY (round_id, player_id),
  UNIQUE (round_id, visual_slot)
);

CREATE TABLE hole_scores (
  round_id uuid NOT NULL,
  player_id uuid NOT NULL,
  hole smallint NOT NULL CHECK (hole BETWEEN 1 AND 18),
  par smallint NOT NULL CHECK (par BETWEEN 3 AND 6),
  stroke_index smallint NOT NULL CHECK (stroke_index BETWEEN 1 AND 18),
  gross smallint CHECK (gross BETWEEN 1 AND 30),
  handicap_strokes smallint CHECK (handicap_strokes BETWEEN 0 AND 3),
  net smallint,
  relative_to_par smallint,
  explicit_x boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (round_id, player_id, hole),
  FOREIGN KEY (round_id, player_id) REFERENCES round_players(round_id, player_id) ON DELETE CASCADE,
  CHECK ((gross IS NULL) = explicit_x),
  CHECK (explicit_x OR net = gross - handicap_strokes)
);

CREATE TABLE card_artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL REFERENCES rounds(id),
  player_id uuid REFERENCES players(id),
  type card_type NOT NULL,
  version integer NOT NULL CHECK (version >= 1),
  corrected boolean NOT NULL DEFAULT false,
  storage_key text NOT NULL,
  mime_type text NOT NULL,
  sha256 text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (round_id, player_id, type, version)
);

CREATE TABLE deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE,
  round_id uuid NOT NULL REFERENCES rounds(id),
  artifact_id uuid NOT NULL REFERENCES card_artifacts(id),
  player_id uuid NOT NULL REFERENCES players(id),
  channel delivery_channel NOT NULL,
  status delivery_status NOT NULL,
  provider_message_id text,
  attempted_at timestamptz,
  delivered_at timestamptz,
  error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sync_mutations (
  client_mutation_id text PRIMARY KEY,
  installation_id text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  payload_hash text NOT NULL,
  result jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX players_identity_key_idx ON players (identity_key);
CREATE INDEX rounds_played_at_idx ON rounds (played_at DESC);
CREATE INDEX rounds_tournament_idx ON rounds (lower(tournament_name), played_at) WHERE tournament_name IS NOT NULL;
CREATE INDEX round_players_player_idx ON round_players (player_id, round_id);
CREATE INDEX hole_scores_round_idx ON hole_scores (round_id, hole);
CREATE INDEX consent_events_player_idx ON consent_events (player_id, occurred_at DESC);
CREATE INDEX deliveries_player_idx ON deliveries (player_id, created_at DESC);
CREATE UNIQUE INDEX card_artifacts_global_version_idx ON card_artifacts (round_id, type, version) WHERE player_id IS NULL;
CREATE UNIQUE INDEX card_artifacts_personal_version_idx ON card_artifacts (round_id, player_id, type, version) WHERE player_id IS NOT NULL;

COMMIT;
