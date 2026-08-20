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
    const rows = await getDatabase()`SELECT current_database() AS database_name, now() AS server_time`;
    return res.status(200).json({ ok: true, database: rows[0]?.database_name || null, serverTime: rows[0]?.server_time || null });
  } catch (error) {
    console.error("database-health", error instanceof Error ? error.message : String(error));
    return res.status(503).json({ ok: false, code: "DATABASE_UNAVAILABLE" });
  }
}
