import { getDatabase } from "./_lib/database.js";
import { requireAccountSession } from "./_lib/account-auth.js";
import { handleAppPreflight } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";
import { validateMutation } from "./_lib/sync-validation.js";
import {eventScope} from './_lib/personal-event-access.js';

export async function applyEventBoundMutation(sql,mutation){
 const id=mutation.payload?.round?.personalEventId||null,kind=mutation.payload?.round?.personalEventKind||'tournament';
 if(id&&!/^[0-9a-f-]{36}$/i.test(id)||!['private','tournament'].includes(kind))throw Object.assign(new Error('INVALID_EVENT_BINDING'),{code:'INVALID_MUTATION'});
 const scoped=eventScope(sql,kind);
 const rows=await scoped`WITH active_event AS MATERIALIZED (SELECT id FROM live_tournaments WHERE id=${id}::uuid AND status IN ('active','finished') AND expires_at>now() FOR SHARE)
 SELECT apply_master_sync_mutation(${mutation.clientMutationId},${mutation.installationId},${mutation.entityType},${mutation.entityId},${mutation.payloadHash},${mutation.schemaVersion},${mutation.deviceAt}::timestamptz,${mutation.expectedVersion},${JSON.stringify(mutation.payload)}::jsonb) AS applied
 WHERE ${id}::uuid IS NULL OR EXISTS(SELECT 1 FROM active_event)`;
 if(!rows.length)throw Object.assign(new Error('EVENT_REMOVED'),{code:'EVENT_REMOVED'});
 return rows[0]?.applied;
}

export default async function handler(req, res) {
  noStore(res);
  if(handleAppPreflight(req,res))return;
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" }); }
  try {
    const account = await requireAccountSession(req);
    const mutation = validateMutation(await readJson(req, 1_500_000));
    const sql = getDatabase();
    const accountMetadata = JSON.stringify({ authUserId: account.id, authEmail: account.email, authName: account.name, claimedAt: new Date().toISOString() });
    const linked = await sql`
      INSERT INTO installations (installation_key, last_seen_at, app_version, metadata)
      VALUES (${mutation.installationId}, now(), ${String(mutation.payload?.appVersion || mutation.payload?.round?.appVersion || "") || null}, ${accountMetadata}::jsonb)
      ON CONFLICT (installation_key) DO UPDATE SET
        last_seen_at = now(),
        app_version = coalesce(EXCLUDED.app_version, installations.app_version),
        metadata = installations.metadata || EXCLUDED.metadata
      WHERE installations.metadata->>'authUserId' IS NULL
         OR installations.metadata->>'authUserId' = ${account.id}
      RETURNING id
    `;
    if (!linked.length) throw Object.assign(new Error("INSTALLATION_ACCOUNT_CONFLICT"), { code: "INSTALLATION_ACCOUNT_CONFLICT" });
    const applied = await applyEventBoundMutation(sql,mutation);
    if (!applied?.accepted) throw Object.assign(new Error("SYNC_NOT_APPLIED"), { code: "SYNC_NOT_APPLIED" });
    const serverAt = new Date().toISOString();
    return res.status(applied.duplicate ? 200 : 201).json({ ok: true, duplicate: Boolean(applied.duplicate), payloadHash: mutation.payloadHash, serverAt, result: applied.result });
  } catch (error) {
    const rawCode = error?.code || "SYNC_FAILED";
    const message = String(error?.message || "");
    const code = message.includes("IDEMPOTENCY_CONFLICT") ? "IDEMPOTENCY_CONFLICT" : rawCode === "42883" ? "DATABASE_MIGRATION_REQUIRED" : rawCode;
    const status = code === "ACCOUNT_UNAUTHORIZED" ? 401 : code === "IDEMPOTENCY_CONFLICT" || code === "INSTALLATION_ACCOUNT_CONFLICT" ? 409 : code === "BODY_TOO_LARGE" ? 413 : code === "DATABASE_NOT_CONFIGURED" || code === "ACCOUNT_AUTH_UNAVAILABLE" || code === "DATABASE_MIGRATION_REQUIRED" ? 503 : 400;
    if (status >= 500) console.error("sync", code);
    return res.status(status).json({ ok: false, code });
  }
}

export { validateMutation } from "./_lib/sync-validation.js";
