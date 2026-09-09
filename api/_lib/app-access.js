import { createHash, randomBytes } from "node:crypto";
import { getDatabase } from "./database.js";
import { requireAccountSession } from "./account-auth.js";

export const ACCESS_COOKIE="gscg_app_access";
export const GUEST_MODE_COOKIE="gsc_guest_mode";
const TOKEN_PATTERN=/^[A-Za-z0-9_-]{43}$/;

function cookieValue(req,name){
  const raw=typeof req?.headers?.get==="function"?req.headers.get("cookie"):req?.headers?.cookie;
  const part=String(raw||"").split(";").map(value=>value.trim()).find(value=>value.startsWith(`${name}=`));
  return part?decodeURIComponent(part.slice(name.length+1)):"";
}

function tokenHash(token){return createHash("sha256").update(String(token||"")).digest("hex")}
export function newAccessToken(){return randomBytes(32).toString("base64url")}

export function accessCookie(token,maxAge=86400){return`${ACCESS_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function guestModeCookie(maxAge=86400){return`${GUEST_MODE_COOKIE}=1; Path=/; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function clearAccessCookies(){return[`${ACCESS_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,`${GUEST_MODE_COOKIE}=; Path=/; Secure; SameSite=Lax; Max-Age=0`]}

function ownerConfigured(){return Boolean(String(process.env.EPG_OWNER_USER_ID||"").trim()||String(process.env.EPG_OWNER_EMAIL||"").trim())}
export function isOwner(user){
  const ownerId=String(process.env.EPG_OWNER_USER_ID||"").trim(),ownerEmail=String(process.env.EPG_OWNER_EMAIL||"").trim().toLowerCase();
  if(!ownerConfigured())return false;
  return Boolean((ownerId&&user?.id===ownerId)||(ownerEmail&&user?.email===ownerEmail));
}

export async function requireOwner(req){
  if(!ownerConfigured())throw Object.assign(new Error("OWNER_NOT_CONFIGURED"),{code:"OWNER_NOT_CONFIGURED",status:503});
  const normalized=typeof req?.headers?.get==="function"?{headers:{cookie:req.headers.get("cookie")||""}}:req;
  const user=await requireAccountSession(normalized);
  if(!isOwner(user))throw Object.assign(new Error("OWNER_REQUIRED"),{code:"OWNER_REQUIRED",status:403});
  return user;
}

export async function ensureAccessTable(sql=getDatabase()){
  await sql`CREATE TABLE IF NOT EXISTS app_access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash CHAR(64) UNIQUE NOT NULL,
    owner_user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    use_count INTEGER NOT NULL DEFAULT 0,
    modality TEXT,
    max_players SMALLINT NOT NULL DEFAULT 0,
    holes_used SMALLINT NOT NULL DEFAULT 0,
    annotations_count INTEGER NOT NULL DEFAULT 0,
    feedback_updated_at TIMESTAMPTZ
  )`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS opened_at TIMESTAMPTZ`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS use_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS modality TEXT`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS max_players SMALLINT NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS holes_used SMALLINT NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS annotations_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS feedback_updated_at TIMESTAMPTZ`;
  return sql;
}

export async function purgeExpiredAccess(sql=getDatabase()){
  await ensureAccessTable(sql);
  await sql`DELETE FROM app_access_grants WHERE created_at<=now()-interval '47 hours'`;
}

export async function createGrant(owner){
  const sql=await ensureAccessTable();await purgeExpiredAccess(sql);
  const token=newAccessToken(),hash=tokenHash(token);
  const rows=await sql`INSERT INTO app_access_grants (token_hash,owner_user_id,expires_at)
    VALUES (${hash},${owner.id},now()+interval '24 hours') RETURNING id,expires_at`;
  return{id:rows[0].id,token,expiresAt:rows[0].expires_at};
}

export async function validateGuestToken(token,{touch=false}={}){
  if(!TOKEN_PATTERN.test(String(token||"")))return null;
  const sql=await ensureAccessTable(),hash=tokenHash(token);
  const rows=touch
    ?await sql`UPDATE app_access_grants SET last_used_at=now(),opened_at=COALESCE(opened_at,now()),use_count=use_count+1 WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() RETURNING id,expires_at`
    :await sql`SELECT id,expires_at FROM app_access_grants WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() LIMIT 1`;
  return rows[0]?{id:rows[0].id,expiresAt:rows[0].expires_at}:null;
}

export async function redeemGuestToken(token,sql=getDatabase()){
  if(!TOKEN_PATTERN.test(String(token||"")))return null;
  await ensureAccessTable(sql);const hash=tokenHash(token);
  const rows=await sql`UPDATE app_access_grants SET last_used_at=now(),opened_at=now(),use_count=1
    WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() AND opened_at IS NULL
    RETURNING id,expires_at`;
  return rows[0]?{id:rows[0].id,expiresAt:rows[0].expires_at}:null;
}

const ALLOWED_MODALITIES=new Set(["general","stableford","match_play","four_ball","universales","practice","skins","wolf","vegas"]);
export async function recordGuestFeedback(token,input={}){
  if(!TOKEN_PATTERN.test(String(token||"")))return false;
  const sql=await ensureAccessTable(),hash=tokenHash(token),rawMode=String(input.modality||"").toLowerCase();
  const modality=ALLOWED_MODALITIES.has(rawMode)?rawMode:null;
  const players=Math.max(0,Math.min(6,Number(input.playerCount)||0));
  const holes=Math.max(0,Math.min(18,Number(input.holesUsed)||0));
  const annotations=Math.max(0,Math.min(108,Number(input.annotationsCount)||0));
  const rows=await sql`UPDATE app_access_grants SET
    opened_at=COALESCE(opened_at,now()),last_used_at=now(),use_count=use_count+1,
    modality=COALESCE(${modality},modality),max_players=GREATEST(max_players,${players}),
    holes_used=GREATEST(holes_used,${holes}),annotations_count=GREATEST(annotations_count,${annotations}),
    feedback_updated_at=now()
    WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() RETURNING id`;
  return Boolean(rows[0]);
}

export async function ownerFeedback(owner){
  const sql=await ensureAccessTable();await purgeExpiredAccess(sql);
  return sql`SELECT id,created_at,expires_at,revoked_at,opened_at,last_used_at,use_count,modality,max_players,holes_used,annotations_count,feedback_updated_at
    FROM app_access_grants WHERE owner_user_id=${owner.id} AND created_at>now()-interval '48 hours' ORDER BY created_at DESC`;
}

export async function resolveAppAccess(req){
  try{const owner=await requireOwner(req);return{ok:true,role:"owner",owner,canShare:true}}
  catch(error){if(error?.code==="OWNER_NOT_CONFIGURED")return{ok:false,role:"none",code:error.code}}
  const token=cookieValue(req,ACCESS_COOKIE),grant=await validateGuestToken(token);
  return grant?{ok:true,role:"guest",grant,canShare:false}:{ok:false,role:"none",code:"ACCESS_REQUIRED"};
}

export async function revokeGrant(id,owner){
  const sql=await ensureAccessTable();
  const rows=await sql`UPDATE app_access_grants SET revoked_at=now() WHERE id=${String(id||"")}::uuid AND owner_user_id=${owner.id} AND revoked_at IS NULL RETURNING id`;
  return Boolean(rows[0]);
}

