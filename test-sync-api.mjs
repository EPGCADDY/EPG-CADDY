import assert from "node:assert/strict";
import crypto from "node:crypto";
import { validateMutation, stableStringify } from "./api/_lib/sync-validation.js";

const payload = { schemaVersion: 1, profiles: [], round: { clientRoundId: "round-0001", players: [{ holes: [] }] } };
const stable = stableStringify(payload);
const payloadHash = crypto.createHash("sha256").update(stable).digest("hex");
const valid = validateMutation({ clientMutationId: "mutation-0001", installationId: "installation-0001", entityType: "master-snapshot", entityId: "round-0001", schemaVersion: 1, deviceAt: "2026-08-22T12:00:00Z", expectedVersion: null, payloadHash, payload });
assert.equal(valid.payloadHash, payloadHash);
assert.throws(() => validateMutation({ ...valid, payloadHash: "0".repeat(64) }), /PAYLOAD_HASH_MISMATCH/);
assert.throws(() => validateMutation({ ...valid, clientMutationId: "x" }), /INVALID_CLIENTMUTATIONID/);
assert.throws(() => validateMutation({ ...valid, entityType: "official-round" }), /UNSUPPORTED_ENTITY_TYPE/);
assert.throws(() => validateMutation({ ...valid, schemaVersion: 2 }), /UNSUPPORTED_SCHEMA_VERSION/);
console.log("PASS API central V256: contrato maestro, hash e idempotencia validados");
