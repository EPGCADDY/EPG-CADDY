import fs from 'node:fs';

const sql=fs.readFileSync(new URL('./001_initial_schema.sql',import.meta.url),'utf8');
const requiredTables=['players','player_contacts','consent_events','rounds','round_players','hole_scores','card_artifacts','deliveries','sync_mutations'];
for(const table of requiredTables)if(!new RegExp(`CREATE TABLE ${table}\\s*\\(`,'i').test(sql))throw new Error(`Falta tabla ${table}`);
for(const token of ['client_mutation_id text PRIMARY KEY','idempotency_key text NOT NULL UNIQUE','officially_closed_at','snapshot_hash','provider_message_id','explicit_x boolean NOT NULL DEFAULT false'])if(!sql.includes(token))throw new Error(`Falta candado SQL: ${token}`);
if(/identity_key text NOT NULL UNIQUE/i.test(sql))throw new Error('Los homónimos no pueden prohibirse con identity_key UNIQUE');
if(!/CHECK \(\(gross IS NULL\) = explicit_x\)/.test(sql))throw new Error('Falta consistencia Gross/X');
if(!/BEGIN;[\s\S]*COMMIT;/.test(sql))throw new Error('La migración debe ser transaccional');
console.log(`PASS esquema central: ${requiredTables.length} tablas y candados críticos`);
