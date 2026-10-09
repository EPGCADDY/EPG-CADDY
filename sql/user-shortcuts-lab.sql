-- LAB ONLY · user-specific shortcuts for Golf Score Card GT
-- Each shortcut is private to one Neon Auth user.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS user_shortcuts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('scorecard','tournament','board','display')),
  resource_key text NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  tournament_id text,
  stream_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','removed')),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(auth_user_id,kind,resource_key)
);

CREATE INDEX IF NOT EXISTS user_shortcuts_user_active_idx
  ON user_shortcuts(auth_user_id,status,updated_at DESC);

CREATE INDEX IF NOT EXISTS user_shortcuts_expiry_idx
  ON user_shortcuts(expires_at)
  WHERE expires_at IS NOT NULL;
