import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const syncApi=readFileSync("api/sync.js","utf8"),http=readFileSync("api/_lib/http.js","utf8");
assert.match(syncApi,/requireAccountSession/);
assert.doesNotMatch(syncApi,/requireSyncToken|SYNC_API_TOKEN|SYNC_AUTH_NOT_CONFIGURED/);
assert.doesNotMatch(http,/requireSyncToken|SYNC_API_TOKEN|SYNC_AUTH_NOT_CONFIGURED|gscg_sync_session/);

console.log("PASS autenticación sync: sesión de cuenta Neon; mecanismo legado eliminado");
