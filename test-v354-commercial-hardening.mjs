import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { guardAppRequest } from "./api/_lib/api-guard.js";

function response() {
  return {
    headers: {}, statusCode: 200, body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    end() { return this; }
  };
}

const previous = Object.fromEntries(["VERCEL", "GSCG_TEST_MODE", "DATABASE_URL", "OPENAI_API_KEY"].map(key => [key, process.env[key]]));
try {
  process.env.VERCEL = "1";
  delete process.env.GSCG_TEST_MODE;
  delete process.env.DATABASE_URL;
  delete process.env.OPENAI_API_KEY;

  let res = response();
  assert.equal(await guardAppRequest({ headers: { host: "epg-caddy.vercel.app" } }, res, { scope: "test-origin", maximum: 2 }), false);
  assert.equal(res.statusCode, 403);

  res = response();
  assert.equal(await guardAppRequest({ headers: { host: "epg-caddy.vercel.app", origin: "https://epg-caddy.vercel.app" } }, res, { scope: "test-closed", maximum: 2 }), false);
  assert.equal(res.statusCode, 503);

  process.env.GSCG_TEST_MODE = "1";
  const req = { headers: { host: "epg-caddy.vercel.app", origin: "https://epg-caddy.vercel.app", "x-forwarded-for": "203.0.113.7" } };
  assert.equal(await guardAppRequest(req, response(), { scope: "test-quota", maximum: 2 }), true);
  assert.equal(await guardAppRequest(req, response(), { scope: "test-quota", maximum: 2 }), true);
  res = response();
  assert.equal(await guardAppRequest(req, res, { scope: "test-quota", maximum: 2 }), false);
  assert.equal(res.statusCode, 429);
  assert.equal(res.headers["Retry-After"], "60");
} finally {
  for (const [key, value] of Object.entries(previous)) value === undefined ? delete process.env[key] : process.env[key] = value;
}

for (const file of ["session", "session-grupal", "research", "universal-ai", "weather", "traffic", "golf-rules", "voice-health", "account"]) {
  const source = readFileSync(`api/${file}.js`, "utf8");
  assert.match(source, /guardAppRequest/);
}
const account = readFileSync("api/account.js", "utf8");
assert.match(account, /new URL\(req\.url/);
assert.doesNotMatch(account, /req\.query/);
const session = readFileSync("api/session-grupal.js", "utf8");
assert.match(session, /MAX_SDP_BYTES\s*=\s*512_000/);
assert.match(session, /status\(413\)/);
assert.match(readFileSync("api/session.js", "utf8"), /SESSION_ENDPOINT_RETIRED/);
assert.match(readFileSync("api/score.js", "utf8"), /LEGACY_SCORE_WRITER_RETIRED/);
assert.match(readFileSync("index-grupal.html", "utf8"), /V(?:354-COMMERCIAL-P0-HARDENING|355-MICROPHONE-ROUND-CONTINUITY)-20260828/);
assert.match(readFileSync("service-worker.js", "utf8"), /gscg-mobile-v(?:354-commercial-p0|355-microphone-round-continuity)/);

const databaseHealth = readFileSync("api/database-health.js", "utf8");
assert.doesNotMatch(databaseHealth, /current_database|server_time|database:\s*rows|tableCount\s*}/);

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
assert.match(vercel.installCommand, /npm ci --omit=dev/);
assert.match(vercel.buildCommand, /GSCG_TEST_MODE=1/);
const globalHeaders = Object.fromEntries(vercel.headers.find(item => item.source === "/(.*)").headers.map(item => [item.key, item.value]));
for (const key of ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Cross-Origin-Opener-Policy", "Cross-Origin-Resource-Policy", "X-DNS-Prefetch-Control", "Referrer-Policy", "Permissions-Policy", "Content-Security-Policy"]) assert.ok(globalHeaders[key], `Falta ${key}`);

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(readFileSync("package-lock.json", "utf8"));
assert.equal(packageJson.engines.node, "24.x");
assert.equal(packageJson.dependencies["@neondatabase/serverless"], "1.0.2");
assert.ok(packageLock.lockfileVersion >= 3);
const lockHash = createHash("sha256").update(readFileSync("package-lock.json")).digest("hex");
const sbom = JSON.parse(readFileSync("sbom.cdx.json", "utf8"));
assert.equal(sbom.bomFormat, "CycloneDX");
assert.equal(sbom.specVersion, "1.6");
assert.equal(sbom.metadata.properties.find(item => item.name === "gscg:package-lock-sha256")?.value, lockHash);

const candidate = spawnSync(process.execPath, ["scripts/commercial-readiness-gate.mjs"], { encoding: "utf8", env: { ...process.env, VERCEL_ENV: "preview", VERCEL_TARGET_ENV: "preview" } });
assert.equal(candidate.status, 0, candidate.stderr || candidate.stdout);
assert.match(candidate.stdout, /profile=candidate pendingExternal=11/);
const production = spawnSync(process.execPath, ["scripts/commercial-readiness-gate.mjs"], { encoding: "utf8", env: { ...process.env, GSCG_COMMERCIAL_RELEASE: "1" } });
assert.notEqual(production.status, 0);
assert.match(production.stderr, /Publicación comercial bloqueada/);

const projectGate = readFileSync("scripts/project-quality-gate.mjs", "utf8");
assert.match(projectGate, /scripts\/inventory-gate\.mjs/);
const masterAudit = readFileSync("audit-project.mjs", "utf8");
assert.match(masterAudit, /test-v351-r1-hole1-voice-score-render\.mjs/);
assert.match(masterAudit, /test-v351-r5-voice-score-matrix\.mjs/);
const legacyHttp = readFileSync("api/_lib/http.js", "utf8");
assert.doesNotMatch(legacyHttp, /SYNC_AUTH_NOT_CONFIGURED|SYNC_API_TOKEN|requireSyncToken/);

console.log("PASS V354: hardening comercial, cuotas, build reproducible, SBOM y bloqueo de Producción");
