BEGIN;

ALTER TABLE live_tournaments
  ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'general';

ALTER TABLE live_tournaments
  DROP CONSTRAINT IF EXISTS live_tournaments_mode_check;

ALTER TABLE live_tournaments
  ADD CONSTRAINT live_tournaments_mode_check
  CHECK (mode IN ('general','match_play','four_ball','stableford','universales'));

COMMIT;
