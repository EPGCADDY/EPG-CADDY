import fs from "node:fs";
import assert from "node:assert/strict";

const sql=fs.readFileSync(new URL("./003_master_data_platform.sql",import.meta.url),"utf8");

for(const table of [
  "installations","golf_courses","course_definition_events","tournaments",
  "player_handicap_events","player_tee_events","player_contact_events",
  "round_snapshots","round_lifecycle_events","score_events","card_records","share_events"
])assert.match(sql,new RegExp(`CREATE TABLE IF NOT EXISTS ${table}\\s*\\(`,"i"),`Falta rubro ${table}`);

for(const column of ["client_round_id","game_mode","category_key","series_round_number","stableford_points","source_updated_at","payload jsonb","processed_at"]){
  assert.ok(sql.includes(column),`Falta dato maestro ${column}`);
}

assert.match(sql,/CREATE OR REPLACE FUNCTION gsc_upsert_player/);
assert.match(sql,/CREATE OR REPLACE FUNCTION apply_master_sync_mutation/);
assert.match(sql,/pg_advisory_xact_lock/);
assert.match(sql,/IF v_existing\.payload_hash <> p_payload_hash/);
assert.match(sql,/ON CONFLICT \(round_id, player_id, hole\) DO UPDATE/);
assert.match(sql,/INSERT INTO score_events/);
assert.match(sql,/INSERT INTO round_snapshots/);
assert.match(sql,/jsonb_array_elements\(coalesce\(v_profile->'profileHistory'/);
assert.match(sql,/BEGIN;[\s\S]*COMMIT;/);

console.log("PASS esquema V256 · base maestra por rubros e historial append-only");
