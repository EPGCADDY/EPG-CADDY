import { databaseConfigured, getDatabase } from "./_lib/database.js";
import { noStore } from "./_lib/http.js";

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" });
  }
  if (!databaseConfigured()) return res.status(503).json({ ok: false, code: "DATABASE_NOT_CONFIGURED" });
  try {
    const sql = getDatabase();
    const schema = await sql`
      SELECT count(*)::int AS table_count FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY(ARRAY['players','player_contacts','consent_events','rounds','round_players','hole_scores','card_artifacts','deliveries','sync_mutations'])
    `;
    const tableCount = schema[0]?.table_count || 0;
    return res.status(tableCount === 9 ? 200 : 503).json({ ok: tableCount === 9, service: "database", schemaReady: tableCount === 9 });
  } catch (error) {
    console.error("database-health", error instanceof Error ? error.message : String(error));
    return res.status(503).json({ ok: false, code: "DATABASE_UNAVAILABLE" });
  }
}
