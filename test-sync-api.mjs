import assert from "node:assert/strict";
import crypto from "node:crypto";
import { validateMutation } from "./api/_lib/sync-validation.js";

const payload = { round: { id: "round-001", score: 87 }, players: ["Jaime", "Diego"] };
const stable = JSON.stringify({ players: ["Jaime", "Diego"], round: { id: "round-001", score: 87 } });
const payloadHash = crypto.createHash("sha256").update(stable).digest("hex");
const valid = validateMutation({ clientMutationId: "mutation-0001", installationId: "installation-0001", entityType: "official-round", entityId: "round-0001", payloadHash, payload });
assert.equal(valid.payloadHash, payloadHash);
assert.throws(() => validateMutation({ ...valid, payloadHash: "0".repeat(64) }), /PAYLOAD_HASH_MISMATCH/);
assert.throws(() => validateMutation({ ...valid, clientMutationId: "x" }), /INVALID_CLIENTMUTATIONID/);
console.log("PASS API central: validación, hash e idempotencia preparada");
