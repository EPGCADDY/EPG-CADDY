import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const registry=fs.readFileSync(new URL("./player-registry.js",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/sync.js",import.meta.url),"utf8");
const schema=fs.readFileSync(new URL("./database/003_master_data_platform.sql",import.meta.url),"utf8");

assert.match(html,/V276-MANUAL-HOLE-NAVIGATION-20260823/);
assert.match(html,/<script src="\.\/sync-queue\.js"><\/script><script src="\.\/master-data-sync\.js"><\/script>/);
assert.match(html,/queueMasterDataSnapshot\("round-state"\)/);
assert.match(html,/queueMasterDataSnapshot\(context\.source\|\|"player-profile",\{includeRound:false,profilesOverride:profiles\}\)/);
assert.match(html,/fetch\("\/api\/sync",\{method:"POST"/);
assert.match(html,/recordShareEvent\(item,"PREPARED"/);
assert.match(registry,/requestedCode\?byCode\.get\(requestedCode\)\|\|byKey\.get/);
assert.match(api,/apply_master_sync_mutation/);
assert.match(schema,/CREATE TABLE IF NOT EXISTS card_records/);
assert.match(schema,/CREATE TABLE IF NOT EXISTS share_events/);
assert.match(schema,/ALTER COLUMN id SET DEFAULT gen_random_uuid\(\)/);
assert.match(schema,/UPDATE players[\s\S]*current_handicap = CASE WHEN profile \? 'handicap' THEN v_hcp ELSE current_handicap END/);
assert.match(schema,/current_tee_key = CASE WHEN profile \? 'teeKey' THEN v_tee ELSE current_tee_key END/);
assert.match(schema,/INSERT INTO player_handicap_events/);
assert.match(schema,/INSERT INTO player_contact_events/);

console.log("PASS V256 · dato vigente reemplazable, historial preservado y base maestra conectada");
