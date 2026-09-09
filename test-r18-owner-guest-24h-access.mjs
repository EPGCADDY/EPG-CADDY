import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { newAccessToken, redeemGuestToken } from "./api/_lib/app-access.js";

const lib=fs.readFileSync("api/_lib/app-access.js","utf8");
const api=fs.readFileSync("api/app-access.js","utf8");
const middleware=fs.readFileSync("middleware.js","utf8");
const app=fs.readFileSync("index-grupal.html","utf8");
const guest=fs.readFileSync("guest-access.js","utf8");
const access=fs.readFileSync("access.html","utf8");
const vercel=JSON.parse(fs.readFileSync("vercel.json","utf8"));

const token=newAccessToken();
assert.match(token,/^[A-Za-z0-9_-]{43}$/);
assert.equal(createHash("sha256").update(token).digest("hex").length,64);
assert.match(lib,/token_hash CHAR\(64\) UNIQUE NOT NULL/);
assert.match(lib,/now\(\)\+interval '24 hours'/);
assert.match(lib,/AND opened_at IS NULL/);
assert.match(lib,/export async function redeemGuestToken/);
assert.match(lib,/revoked_at IS NULL AND expires_at>now\(\)/);
assert.match(lib,/OWNER_NOT_CONFIGURED/);
assert.match(lib,/EPG_OWNER_USER_ID/);
assert.match(lib,/DEFAULT_OWNER_EMAIL="jaimekirste@gmail\.com"/);
assert.match(lib,/DELETE FROM app_access_grants WHERE created_at<=now\(\)-interval '47 hours'/);
assert.doesNotMatch(lib,/first user|primer usuario/i);

assert.match(api,/action==="report"/);
assert.match(api,/action==="cleanup"/);
assert.match(api,/action==="redeem"/);
assert.match(api,/redeemGuestToken\(token\)/);
assert.match(api,/YA UTILIZADO/);
assert.match(lib,/HttpOnly; Secure; SameSite=Lax/);
assert.match(middleware,/OWNER_DATA_FORBIDDEN/);
assert.match(middleware,/\/api\/account-backup/);
assert.match(middleware,/\/api\/sync/);
assert.match(middleware,/gsc_guest_mode=1/);

assert.match(app,/\.\/guest-access\.js/);
assert.match(app,/id="ownerShare24h"[^>]*>INVITAR · 24 H<\/button>/);
assert.match(app,/fetch\("\/api\/app-access\?action=create",\{method:"POST"/);
assert.match(app,/navigator\.share\(payload\)/);
assert.doesNotMatch(app,/ownerShare24h"\)\?\.addEventListener\("click",\(\)=>location\.assign/);
assert.match(guest,/gscg-guest24h:/);
assert.match(guest,/ACTIVIDAD ANÓNIMA REGISTRADA HASTA 48 HORAS/);
assert.match(app,/queueGuestAccessFeedback/);
assert.match(app,/setInterval\(enforceGuestAccess,15000\)/);
assert.match(app,/getRegistrations/);
assert.match(app,/installAppButton/);
assert.match(access,/VER ACTIVIDAD ANÓNIMA/);
assert.match(access,/ABRIÓ:/);
assert.doesNotMatch(access,/item\.name|item\.email|item\.identity/);
assert.deepEqual(vercel.crons,[{path:"/api/app-access?action=cleanup",schedule:"0 * * * *"}]);

let redeemed=false;
const sql=async(parts,...values)=>{
  const query=parts.join("?");
  if(!query.includes("UPDATE app_access_grants SET last_used_at"))return [];
  assert.match(query,/opened_at IS NULL/);
  assert.equal(values[0],createHash("sha256").update(token).digest("hex"));
  if(redeemed)return[];
  redeemed=true;return[{id:"first-device",expires_at:new Date(Date.now()+86_400_000)}];
};
assert.equal((await redeemGuestToken(token,sql))?.id,"first-device");
assert.equal(await redeemGuestToken(token,sql),null);

console.log("PASS acceso propietario/invitado 24h: enlace individual de un solo uso, aislamiento, revocación, bloqueo, feedback anónimo y purga <48h");
