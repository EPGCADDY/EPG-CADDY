import { createHash } from "node:crypto";
import { databaseConfigured, getDatabase } from "./database.js";
import { isNativeAppOrigin, requestOrigin } from "./cors.js";

const memoryWindows = new Map();
const WINDOW_MS = 60_000;

function cleanHeader(value, maximum = 180) {
  return String(value || "").replace(/[\r\n]/g, " ").trim().slice(0, maximum);
}

function forwardedHost(req) {
  return cleanHeader(req?.headers?.["x-forwarded-host"] || req?.headers?.host).split(",")[0].trim().toLowerCase();
}

function sameAppOrigin(req) {
  const origin = requestOrigin(req);
  if (!origin) return !process.env.VERCEL || process.env.GSCG_TEST_MODE === "1";
  try {
    const url = new URL(origin);
    return ["https:", "http:"].includes(url.protocol) && url.host.toLowerCase() === forwardedHost(req);
  } catch {
    return false;
  }
}

export function isTrustedAppRequest(req) {
  return isNativeAppOrigin(req) || sameAppOrigin(req);
}

function requestAddress(req) {
  return cleanHeader(req?.headers?.["x-forwarded-for"] || req?.headers?.["x-real-ip"] || "unknown", 96).split(",")[0].trim();
}

function rateKey(req, scope) {
  const salt = process.env.API_RATE_LIMIT_SALT || process.env.OPENAI_API_KEY || process.env.DATABASE_URL || "gscg-local-only";
  return createHash("sha256").update(`${salt}:${scope}:${requestAddress(req)}`).digest("hex");
}

function enforceMemoryLimit(key, maximum) {
  const now = Date.now();
  const current = memoryWindows.get(key);
  const next = !current || now - current.startedAt >= WINDOW_MS
    ? { startedAt: now, count: 1 }
    : { ...current, count: current.count + 1 };
  memoryWindows.set(key, next);
  if (memoryWindows.size > 2_000) {
    for (const [candidate, value] of memoryWindows) if (now - value.startedAt >= WINDOW_MS) memoryWindows.delete(candidate);
  }
  return next.count <= maximum;
}

async function enforceDatabaseLimit(key, maximum) {
  const sql = getDatabase();
  const rows = await sql`
    INSERT INTO live_rate_limits (scope_key_hash, window_started_at, request_count, updated_at)
    VALUES (${key}, date_trunc('minute', now()), 1, now())
    ON CONFLICT (scope_key_hash) DO UPDATE SET
      window_started_at = CASE WHEN live_rate_limits.window_started_at < date_trunc('minute', now()) THEN date_trunc('minute', now()) ELSE live_rate_limits.window_started_at END,
      request_count = CASE WHEN live_rate_limits.window_started_at < date_trunc('minute', now()) THEN 1 ELSE live_rate_limits.request_count + 1 END,
      updated_at = now()
    RETURNING request_count
  `;
  return Number(rows[0]?.request_count) <= maximum;
}

async function allowedByRateLimit(req, scope, maximum) {
  const key = rateKey(req, scope);
  if (process.env.GSCG_TEST_MODE === "1") return enforceMemoryLimit(key, maximum);
  if (databaseConfigured()) return enforceDatabaseLimit(key, maximum);
  if (process.env.VERCEL) throw Object.assign(new Error("API_GUARD_UNAVAILABLE"), { code: "API_GUARD_UNAVAILABLE" });
  return enforceMemoryLimit(key, maximum);
}

export async function guardAppRequest(req, res, { scope, maximum }) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (!isTrustedAppRequest(req)) {
    res.status(403).json({ ok: false, error: "ORIGIN_NOT_ALLOWED" });
    return false;
  }
  try {
    if (await allowedByRateLimit(req, scope, maximum)) return true;
    res.setHeader("Retry-After", "60");
    res.status(429).json({ ok: false, error: "API_RATE_LIMITED", retryable: true });
    return false;
  } catch (error) {
    console.error("api-guard", JSON.stringify({ scope, event: "unavailable", code: String(error?.code || "API_GUARD_UNAVAILABLE") }));
    res.setHeader("Retry-After", "30");
    res.status(503).json({ ok: false, error: "API_GUARD_UNAVAILABLE", retryable: true });
    return false;
  }
}
