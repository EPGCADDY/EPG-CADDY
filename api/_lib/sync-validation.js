import { createHash } from "node:crypto";

const ID_PATTERN = /^[A-Za-z0-9._:-]{8,160}$/;
const ENTITY_TYPES = new Set(["master-snapshot"]);

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

export function validateMutation(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Object.assign(new Error("INVALID_MUTATION"), { code: "INVALID_MUTATION" });
  const mutation = { clientMutationId: String(input.clientMutationId || ""), installationId: String(input.installationId || ""), entityType: String(input.entityType || ""), entityId: String(input.entityId || ""), schemaVersion: Number(input.schemaVersion), deviceAt: String(input.deviceAt || ""), expectedVersion: input.expectedVersion === null || input.expectedVersion === undefined ? null : Number(input.expectedVersion), payloadHash: String(input.payloadHash || "").toLowerCase(), payload: input.payload };
  for (const key of ["clientMutationId", "installationId", "entityType", "entityId"]) if (!ID_PATTERN.test(mutation[key])) throw Object.assign(new Error(`INVALID_${key.toUpperCase()}`), { code: "INVALID_MUTATION" });
  if (!ENTITY_TYPES.has(mutation.entityType)) throw Object.assign(new Error("UNSUPPORTED_ENTITY_TYPE"), { code: "UNSUPPORTED_ENTITY_TYPE" });
  if (!Number.isInteger(mutation.schemaVersion) || mutation.schemaVersion !== 1) throw Object.assign(new Error("UNSUPPORTED_SCHEMA_VERSION"), { code: "UNSUPPORTED_SCHEMA_VERSION" });
  if (!mutation.deviceAt || !Number.isFinite(Date.parse(mutation.deviceAt))) throw Object.assign(new Error("INVALID_DEVICE_AT"), { code: "INVALID_MUTATION" });
  if (mutation.expectedVersion !== null && (!Number.isInteger(mutation.expectedVersion) || mutation.expectedVersion < 0)) throw Object.assign(new Error("INVALID_EXPECTED_VERSION"), { code: "INVALID_MUTATION" });
  if (!/^[a-f0-9]{64}$/.test(mutation.payloadHash)) throw Object.assign(new Error("INVALID_PAYLOAD_HASH"), { code: "INVALID_MUTATION" });
  if (!mutation.payload || typeof mutation.payload !== "object" || Array.isArray(mutation.payload)) throw Object.assign(new Error("MISSING_PAYLOAD"), { code: "INVALID_MUTATION" });
  if (Number(mutation.payload.schemaVersion) !== mutation.schemaVersion) throw Object.assign(new Error("SCHEMA_VERSION_MISMATCH"), { code: "INVALID_MUTATION" });
  if (!Array.isArray(mutation.payload.profiles) || mutation.payload.profiles.length > 500) throw Object.assign(new Error("INVALID_PROFILES"), { code: "INVALID_MUTATION" });
  if (mutation.payload.round !== undefined && mutation.payload.round !== null) {
    const round = mutation.payload.round;
    if (!round || typeof round !== "object" || Array.isArray(round) || !ID_PATTERN.test(String(round.clientRoundId || ""))) throw Object.assign(new Error("INVALID_ROUND"), { code: "INVALID_MUTATION" });
    if (!Array.isArray(round.players) || round.players.length < 1 || round.players.length > 6) throw Object.assign(new Error("INVALID_ROUND_PLAYERS"), { code: "INVALID_MUTATION" });
    for (const player of round.players) if (!Array.isArray(player?.holes) || player.holes.length > 18) throw Object.assign(new Error("INVALID_HOLES"), { code: "INVALID_MUTATION" });
  }
  const actualHash = createHash("sha256").update(stableStringify(mutation.payload)).digest("hex");
  if (actualHash !== mutation.payloadHash) throw Object.assign(new Error("PAYLOAD_HASH_MISMATCH"), { code: "PAYLOAD_HASH_MISMATCH" });
  return mutation;
}

export { stableStringify, ENTITY_TYPES };
