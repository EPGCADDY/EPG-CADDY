import { getDatabase } from "./_lib/database.js";
import { noStore, readJson, requireSyncToken } from "./_lib/http.js";
import { validateMutation } from "./_lib/sync-validation.js";

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" }); }
  try {
    requireSyncToken(req);
    const mutation = validateMutation(await readJson(req));
    const sql = getDatabase();
    const existing = await sql`SELECT payload_hash, result FROM sync_mutations WHERE client_mutation_id = ${mutation.clientMutationId}`;
    if (existing.length) {
      if (existing[0].payload_hash !== mutation.payloadHash) return res.status(409).json({ ok: false, code: "IDEMPOTENCY_CONFLICT" });
      return res.status(200).json({ ok: true, duplicate: true, result: existing[0].result });
    }
    const result = { accepted: true, entityType: mutation.entityType, entityId: mutation.entityId };
    const inserted = await sql`
      INSERT INTO sync_mutations (client_mutation_id, installation_id, entity_type, entity_id, payload_hash, result)
      VALUES (${mutation.clientMutationId}, ${mutation.installationId}, ${mutation.entityType}, ${mutation.entityId}, ${mutation.payloadHash}, ${JSON.stringify(result)}::jsonb)
      ON CONFLICT (client_mutation_id) DO NOTHING RETURNING client_mutation_id
    `;
    if (!inserted.length) {
      const raced = await sql`SELECT payload_hash, result FROM sync_mutations WHERE client_mutation_id = ${mutation.clientMutationId}`;
      if (!raced.length || raced[0].payload_hash !== mutation.payloadHash) return res.status(409).json({ ok: false, code: "IDEMPOTENCY_CONFLICT" });
      return res.status(200).json({ ok: true, duplicate: true, result: raced[0].result });
    }
    return res.status(201).json({ ok: true, duplicate: false, result });
  } catch (error) {
    const code = error?.code || "SYNC_FAILED";
    const status = code === "UNAUTHORIZED" ? 401 : code === "BODY_TOO_LARGE" ? 413 : code === "DATABASE_NOT_CONFIGURED" || code === "SYNC_AUTH_NOT_CONFIGURED" ? 503 : 400;
    if (status >= 500) console.error("sync", code);
    return res.status(status).json({ ok: false, code });
  }
}

export { validateMutation } from "./_lib/sync-validation.js";
