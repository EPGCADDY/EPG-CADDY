import { createHash, randomBytes } from "node:crypto";
import { getDatabase } from "./database.js";
import { requireAccountSession } from "./account-auth.js";

export const ACCESS_COOKIE="gscg_app_access";
export const GUEST_MODE_COOKIE="gsc_guest_mode";
const TOKEN_PATTERN=/^[A-Za-z0-9_-]{43}$/;
const DEFAULT_OWNER_EMAIL="jaimekirste@gmail.com";

function cookieValue(req,name){
  const raw=typeof req?.headers?.get==="function"?req.headers.get("cookie"):req?.headers?.cookie;
  const part=String(raw||"").split(";").map(value=>value.trim()).find(value=>value.startsWith(`${name}=`));
  return part?decodeURIComponent(part.slice(name.length+1)):"";
}

function tokenHash(token){return createHash("sha256").update(String(token||"")).digest("hex")}
export function newAccessToken(){return randomBytes(32).toString("base64url")}

export function accessCookie(token,maxAge=172800){return`${ACCESS_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function guestModeCookie(maxAge=172800){return`${GUEST_MODE_COOKIE}=1; Path=/; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function clearAccessCookies(){return[`${ACCESS_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,`${GUEST_MODE_COOKIE}=; Path=/; Secure; SameSite=Lax; Max-Age=0`]}

function ownerConfigured(){return Boolean(String(process.env.EPG_OWNER_USER_ID||"").trim()||String(process.env.EPG_OWNER_EMAIL||DEFAULT_OWNER_EMAIL).trim())}
export function isOwner(user){
  const ownerId=String(process.env.EPG_OWNER_USER_ID||"").trim(),ownerEmail=String(process.env.EPG_OWNER_EMAIL||DEFAULT_OWNER_EMAIL).trim().toLowerCase();
  if(!ownerConfigured())return false;
  return Boolean((ownerId&&user?.id===ownerId)||(ownerEmail&&String(user?.email||"").trim().toLowerCase()===ownerEmail));
}

export async function requireOwner(req){
  if(!ownerConfigured())throw Object.assign(new Error("OWNER_NOT_CONFIGURED"),{code:"OWNER_NOT_CONFIGURED",status:503});
  const normalized=typeof req?.headers?.get==="function"?{headers:{cookie:req.headers.get("cookie")||""}}:req;
  const user=await requireAccountSession(normalized,{ownerOnly:true});
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
    max_uses SMALLINT NOT NULL DEFAULT 5,
    modality TEXT,
    max_players SMALLINT NOT NULL DEFAULT 0,
    holes_used SMALLINT NOT NULL DEFAULT 0,
    annotations_count INTEGER NOT NULL DEFAULT 0,
    current_snapshot JSONB,
    feedback_updated_at TIMESTAMPTZ
  )`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS opened_at TIMESTAMPTZ`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS use_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS max_uses SMALLINT NOT NULL DEFAULT 5`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS modality TEXT`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS max_players SMALLINT NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS holes_used SMALLINT NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS annotations_count INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS current_snapshot JSONB`;
  await sql`ALTER TABLE app_access_grants ADD COLUMN IF NOT EXISTS feedback_updated_at TIMESTAMPTZ`;
  return sql;
}

export async function purgeExpiredAccess(sql=getDatabase()){
  await ensureAccessTable(sql);
  await sql`DELETE FROM app_access_grants WHERE expires_at<=now()`;
}

export async function createGrant(owner,options={},database=getDatabase()){
  const sql=await ensureAccessTable(database);await purgeExpiredAccess(sql);
  const token=newAccessToken(),hash=tokenHash(token);
  const hours=Math.max(1,Math.min(48,Number(options.hours)||48)),maxUses=Math.max(1,Math.min(25,Number(options.maxUses)||5));
  const rows=await sql`INSERT INTO app_access_grants (token_hash,owner_user_id,expires_at,max_uses)
    VALUES (${hash},${owner.id},now()+(${hours}||' hours')::interval,${maxUses}) RETURNING id,expires_at,max_uses`;
  return{id:rows[0].id,token,expiresAt:rows[0].expires_at,maxUses:rows[0].max_uses};
}

export async function validateGuestToken(token,{touch=false,sql:database=null}={}){
  if(!TOKEN_PATTERN.test(String(token||"")))return null;
  const sql=await ensureAccessTable(database||getDatabase()),hash=tokenHash(token);
  const rows=touch
    ?await sql`UPDATE app_access_grants SET last_used_at=now(),opened_at=COALESCE(opened_at,now()),use_count=LEAST(use_count+1,max_uses) WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() RETURNING id,expires_at,use_count,max_uses`
    :await sql`SELECT id,expires_at,use_count,max_uses FROM app_access_grants WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() LIMIT 1`;
  return rows[0]?{id:rows[0].id,expiresAt:rows[0].expires_at,useCount:rows[0].use_count,maxUses:rows[0].max_uses}:null;
}

export async function redeemGuestToken(token,sql=getDatabase()){
  if(!TOKEN_PATTERN.test(String(token||"")))return null;
  await ensureAccessTable(sql);const hash=tokenHash(token);
  const rows=await sql`UPDATE app_access_grants SET last_used_at=now(),opened_at=COALESCE(opened_at,now()),use_count=use_count+1
    WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() AND use_count<max_uses
    RETURNING id,expires_at,use_count,max_uses`;
  return rows[0]?{id:rows[0].id,expiresAt:rows[0].expires_at,useCount:rows[0].use_count,maxUses:rows[0].max_uses}:null;
}

const ALLOWED_MODALITIES=new Set(["general","stableford","match_play","four_ball","universales","practice","skins","wolf","vegas"]);
function boundedText(value,max=120){return String(value??"").trim().replace(/\s+/g," ").slice(0,max)}
function boundedNumber(value,min,max,fallback=null){const number=Number(value);return Number.isFinite(number)&&number>=min&&number<=max?number:fallback}
function sanitizedGuestSnapshot(value={}){
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const players=Array.isArray(value.players)?value.players.slice(0,6).map((player,index)=>{
    const holes=Array.isArray(player?.holes)?player.holes.slice(0,18).map((hole,idx)=>({
      hole:boundedNumber(hole?.hole,1,18,idx+1),
      gross:boundedNumber(hole?.gross,1,30,null),
      net:boundedNumber(hole?.net,-20,40,null),
      par:boundedNumber(hole?.par,3,6,null),
      relativeToPar:boundedNumber(hole?.relativeToPar,-30,30,null),
      stablefordPoints:boundedNumber(hole?.stablefordPoints,0,20,null),
      universalesPoints:boundedNumber(hole?.universalesPoints,0,10,null)
    })).filter(hole=>hole.hole&&Number.isFinite(hole.gross)): [];
    const totals=player?.totals&&typeof player.totals==="object"?{
      holes:boundedNumber(player.totals.holes,0,18,holes.length),
      gross:boundedNumber(player.totals.gross,0,300,null),
      net:boundedNumber(player.totals.net,-50,300,null),
      relativeToPar:boundedNumber(player.totals.relativeToPar,-80,120,null),
      stablefordPoints:boundedNumber(player.totals.stablefordPoints,0,120,null),
      universalesPoints:boundedNumber(player.totals.universalesPoints,0,120,null)
    }:null;
    return{id:boundedText(player?.id||`player-${index+1}`,80),name:boundedText(player?.name||`JUGADOR ${index+1}`,80),holes,totals};
  }).filter(player=>player.name):[];
  if(!players.length)return null;
  return{schemaVersion:1,groupLabel:boundedText(value.groupLabel,80),course:boundedText(value.course,120),mode:boundedText(value.mode,24),updatedAt:boundedText(value.updatedAt,40),players};
}
export async function recordGuestFeedback(token,input={},database=getDatabase()){
  if(!TOKEN_PATTERN.test(String(token||"")))return false;
  const sql=await ensureAccessTable(database),hash=tokenHash(token),rawMode=String(input.modality||"").toLowerCase();
  const modality=ALLOWED_MODALITIES.has(rawMode)?rawMode:null;
  const players=Math.max(0,Math.min(6,Number(input.playerCount)||0));
  const holes=Math.max(0,Math.min(18,Number(input.holesUsed)||0));
  const annotations=Math.max(0,Math.min(108,Number(input.annotationsCount)||0));
  const snapshot=sanitizedGuestSnapshot(input.snapshot);
  const rows=await sql`UPDATE app_access_grants SET
    opened_at=COALESCE(opened_at,now()),last_used_at=now(),
    modality=COALESCE(${modality},modality),max_players=GREATEST(max_players,${players}),
    holes_used=GREATEST(holes_used,${holes}),annotations_count=GREATEST(annotations_count,${annotations}),
    current_snapshot=COALESCE(${snapshot?JSON.stringify(snapshot):null}::jsonb,current_snapshot),
    feedback_updated_at=now()
    WHERE token_hash=${hash} AND revoked_at IS NULL AND expires_at>now() RETURNING id`;
  return Boolean(rows[0]);
}

export async function ownerFeedback(owner,database=getDatabase()){
  const sql=await ensureAccessTable(database);await purgeExpiredAccess(sql);
  return sql`SELECT id,created_at,expires_at,revoked_at,opened_at,last_used_at,use_count,max_uses,modality,max_players,holes_used,annotations_count,current_snapshot,feedback_updated_at
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
