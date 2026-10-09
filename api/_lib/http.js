import { timingSafeEqual } from "node:crypto";

export async function readJson(req, maxBytes = 256_000) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  let raw = typeof req.body === "string" ? req.body : "";
  if (!raw) {
    for await (const chunk of req) {
      raw += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
      if (Buffer.byteLength(raw, "utf8") > maxBytes) throw Object.assign(new Error("BODY_TOO_LARGE"), { code: "BODY_TOO_LARGE" });
    }
  }
  if (!raw.trim()) throw Object.assign(new Error("EMPTY_BODY"), { code: "EMPTY_BODY" });
  try { return JSON.parse(raw); }
  catch { throw Object.assign(new Error("INVALID_JSON"), { code: "INVALID_JSON" }); }
}

export function requireSyncToken(req) {
  const expected = process.env.SYNC_API_TOKEN;
  if (!expected) throw Object.assign(new Error("SYNC_AUTH_NOT_CONFIGURED"), { code: "SYNC_AUTH_NOT_CONFIGURED" });
  const cookieHeader = String(req.headers.cookie || ""), cookie = cookieHeader.split(";").map(part => part.trim()).find(part => part.startsWith("gscg_sync_session="));
  const supplied = String(req.headers["x-sync-token"] || (cookie ? decodeURIComponent(cookie.slice("gscg_sync_session=".length)) : ""));
  const expectedBytes = Buffer.from(String(expected)), suppliedBytes = Buffer.from(supplied);
  if (!supplied || expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) throw Object.assign(new Error("UNAUTHORIZED"), { code: "UNAUTHORIZED" });
}

export function noStore(res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
}
