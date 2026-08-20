import { createHash } from "node:crypto";

const ID_PATTERN = /^[A-Za-z0-9._:-]{8,160}$/;

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

export function validateMutation(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Object.assign(new Error("INVALID_MUTATION"), { code: "INVALID_MUTATION" });
  const mutation = { clientMutationId: String(input.clientMutationId || ""), installationId: String(input.installationId || ""), entityType: String(input.entityType || ""), entityId: String(input.entityId || ""), payloadHash: String(input.payloadHash || "").toLowerCase(), payload: input.payload };
  for (const key of ["clientMutationId", "installationId", "entityType", "entityId"]) if (!ID_PATTERN.test(mutation[key])) throw Object.assign(new Error(`INVALID_${key.toUpperCase()}`), { code: "INVALID_MUTATION" });
  if (!/^[a-f0-9]{64}$/.test(mutation.payloadHash)) throw Object.assign(new Error("INVALID_PAYLOAD_HASH"), { code: "INVALID_MUTATION" });
  if (mutation.payload === undefined) throw Object.assign(new Error("MISSING_PAYLOAD"), { code: "INVALID_MUTATION" });
  const actualHash = createHash("sha256").update(stableStringify(mutation.payload)).digest("hex");
  if (actualHash !== mutation.payloadHash) throw Object.assign(new Error("PAYLOAD_HASH_MISMATCH"), { code: "PAYLOAD_HASH_MISMATCH" });
  return mutation;
}
