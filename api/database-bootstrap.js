import { createHash, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { getDatabase } from "./_lib/database.js";
import { noStore } from "./_lib/http.js";

const EXPECTED_HASH = "412f14f53ed63f4d5da7e95db2a42d8e88aa44397b7b1d292bdee2a3bfcc8d02";

function authorized(req) {
  const token = String(req.headers["x-bootstrap-token"] || "");
  const actual = createHash("sha256").update(token).digest("hex");
  return token.length === 64 && timingSafeEqual(Buffer.from(actual), Buffer.from(EXPECTED_HASH));
}

function statements() {
  const source = readFileSync(new URL("../database/001_initial_schema.sql", import.meta.url), "utf8");
  return source.replace(/^\s*(BEGIN|COMMIT);\s*$/gim, "").split(";").map(statement => statement.trim()).filter(Boolean);
}

export default async function handler(req, res) {
  noStore(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "METHOD_NOT_ALLOWED" });
  }
  if (!authorized(req)) return res.status(401).json({ ok: false, code: "UNAUTHORIZED" });
  try {
    const sql = getDatabase();
    const before = await sql`SELECT to_regclass('public.players') AS players`;
    if (!before[0]?.players) await sql.transaction(statements().map(statement => sql.query(statement)));
    const rows = await sql`
      SELECT count(*)::int AS table_count FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY(ARRAY['players','player_contacts','consent_events','rounds','round_players','hole_scores','card_artifacts','deliveries','sync_mutations'])
    `;
    const tableCount = rows[0]?.table_count || 0;
    return res.status(tableCount === 9 ? 200 : 500).json({ ok: tableCount === 9, tableCount });
  } catch (error) {
    console.error("database-bootstrap", error instanceof Error ? error.message : String(error));
    return res.status(500).json({ ok: false, code: "BOOTSTRAP_FAILED" });
  }
}
