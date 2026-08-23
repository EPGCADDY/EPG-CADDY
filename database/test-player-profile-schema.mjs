import fs from "node:fs";
import assert from "node:assert/strict";

const sql=fs.readFileSync(new URL("./002_player_profiles_and_history.sql",import.meta.url),"utf8");

assert.match(sql,/BEGIN;[\s\S]*COMMIT;/);
assert.match(sql,/registration_code varchar\(7\)/);
assert.match(sql,/current_handicap smallint/);
assert.match(sql,/current_tee_key text/);
assert.match(sql,/CREATE UNIQUE INDEX IF NOT EXISTS players_registration_code_uidx/);
assert.match(sql,/CREATE TABLE IF NOT EXISTS player_profile_events/);
for(const token of ["full_name_snapshot","handicap_snapshot","tee_key_snapshot","whatsapp_national_number_snapshot","occurred_at"]){
  assert.ok(sql.includes(token),`Falta historial central: ${token}`);
}

console.log("PASS esquema de perfiles: código único, dato vigente e historial inmutable preparado");
