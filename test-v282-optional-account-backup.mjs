import assert from "node:assert/strict";
import fs from "node:fs";
import accountBackup from "./account-backup.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const accountApi=fs.readFileSync(new URL("./api/account.js",import.meta.url),"utf8");
const authLib=fs.readFileSync(new URL("./api/_lib/account-auth.js",import.meta.url),"utf8");
const syncApi=fs.readFileSync(new URL("./api/sync.js",import.meta.url),"utf8");
const backupApi=fs.readFileSync(new URL("./api/backup.js",import.meta.url),"utf8");

assert.match(html,/V282-NEON-AUTH-BACKUP-RECOVERY-20260823/);
for(const id of ["accountBackupButton","accountBackupOverlay","accountName","accountEmail","accountPassword","accountSignUp","accountSignIn","accountBackupNow","accountRestoreNow","accountSignOut"])assert.match(html,new RegExp(`id="${id}"`));
assert.match(html,/window\.GSC_ACCOUNT_SIGNED_IN=false/);
assert.match(html,/window\.GSC_ACCOUNT_SIGNED_IN!==true/);
assert.match(html,/queueMasterDataSnapshot\("manual-central-backup"\)/);
assert.match(html,/GSCAccountBackup\.recover\(\)/);
assert.match(accountApi,/\/sign-up\/email/);
assert.match(accountApi,/\/sign-in\/email/);
assert.match(authLib,/HttpOnly/);
assert.match(authLib,/SameSite=.*Lax/);
assert.match(syncApi,/requireAccountSession/);
assert.match(syncApi,/authUserId/);
assert.doesNotMatch(syncApi,/requireSyncToken/);
assert.match(backupApi,/metadata->>'authUserId'/);
assert.match(backupApi,/ORDER BY r\.played_at ASC/);

const restored=accountBackup.localRound({clientRoundId:"central-1",version:2,status:"officially_closed",mode:"stableford",categoryKey:"senior",course:{key:"pulte",name:"El Pulté"},tournament:{name:"COPA"},playedAt:"2026-08-23T12:00:00Z",officiallyClosedAt:"2026-08-23T16:00:00Z",players:[{clientPlayerId:"p1",fullName:"JAIME",handicap:14,teeKey:"Blanco",matrixKey:"Caballeros",visualSlot:1,holes:[{hole:1,par:4,gross:5,handicapStrokes:1,net:4,relativeToPar:0,stablefordPoints:2,explicitX:false}]}]});
assert.equal(restored.id,"central-1");
assert.equal(restored.players[0].holes[1].gross,5);
assert.equal(restored.players[0].holes[1].points,2);
assert.equal(restored.officiallyClosedAt,"2026-08-23T16:00:00Z");
assert.equal(accountBackup.mergeRounds([{id:"a",updatedAt:"2026-01-01"}],[{id:"a",updatedAt:"2026-02-01"},{id:"b",updatedAt:"2026-01-15"}]).length,2);

console.log("PASS V282 · cuenta opcional, respaldo autenticado y recuperación central");
