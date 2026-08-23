import { getDatabase } from "./_lib/database.js";
import { noStore, readJson, requireSyncToken } from "./_lib/http.js";
import { validateMutation } from "./_lib/sync-validation.js";

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" }); }
  try {
    requireSyncToken(req);
    const mutation = validateMutation(await readJson(req, 1_500_000));
    const sql = getDatabase();
    const rows = await sql`
      SELECT apply_master_sync_mutation(
        ${mutation.clientMutationId},
        ${mutation.installationId},
        ${mutation.entityType},
        ${mutation.entityId},
        ${mutation.payloadHash},
        ${mutation.schemaVersion},
        ${mutation.deviceAt}::timestamptz,
        ${mutation.expectedVersion},
        ${JSON.stringify(mutation.payload)}::jsonb
      ) AS applied
    `;
    const applied = rows[0]?.applied;
    if (!applied?.accepted) throw Object.assign(new Error("SYNC_NOT_APPLIED"), { code: "SYNC_NOT_APPLIED" });
    const serverAt = new Date().toISOString();
    return res.status(applied.duplicate ? 200 : 201).json({ ok: true, duplicate: Boolean(applied.duplicate), payloadHash: mutation.payloadHash, serverAt, result: applied.result });
  } catch (error) {
    const rawCode = error?.code || "SYNC_FAILED";
    const message = String(error?.message || "");
    const code = message.includes("IDEMPOTENCY_CONFLICT") ? "IDEMPOTENCY_CONFLICT" : rawCode === "42883" ? "DATABASE_MIGRATION_REQUIRED" : rawCode;
    const status = code === "UNAUTHORIZED" ? 401 : code === "IDEMPOTENCY_CONFLICT" ? 409 : code === "BODY_TOO_LARGE" ? 413 : code === "DATABASE_NOT_CONFIGURED" || code === "SYNC_AUTH_NOT_CONFIGURED" || code === "DATABASE_MIGRATION_REQUIRED" ? 503 : 400;
    if (status >= 500) console.error("sync", code);
    return res.status(status).json({ ok: false, code });
  }
}

export { validateMutation } from "./_lib/sync-validation.js";
