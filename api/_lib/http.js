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

export function noStore(res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
}
