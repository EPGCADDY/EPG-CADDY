import assert from "node:assert/strict";
import { requireSyncToken } from "./api/_lib/http.js";

const previous=process.env.SYNC_API_TOKEN;
process.env.SYNC_API_TOKEN="test-secret-token";
assert.doesNotThrow(()=>requireSyncToken({headers:{"x-sync-token":"test-secret-token"}}));
assert.doesNotThrow(()=>requireSyncToken({headers:{cookie:"other=x; gscg_sync_session=test-secret-token"}}));
assert.throws(()=>requireSyncToken({headers:{"x-sync-token":"bad"}}),/UNAUTHORIZED/);
delete process.env.SYNC_API_TOKEN;
assert.throws(()=>requireSyncToken({headers:{}}),/SYNC_AUTH_NOT_CONFIGURED/);
if(previous===undefined)delete process.env.SYNC_API_TOKEN;else process.env.SYNC_API_TOKEN=previous;

console.log("PASS autenticación sync: encabezado o sesión HttpOnly, comparación segura");
