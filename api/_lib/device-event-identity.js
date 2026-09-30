import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {getDatabase} from './database.js';

export const DEVICE_EVENT_COOKIE='gsc_event_device';
const hash=value=>createHash('sha256').update(value).digest('hex');
async function ensure(sql){await sql`CREATE TABLE IF NOT EXISTS gsc_event_devices(id text PRIMARY KEY,session_hash char(64) UNIQUE NOT NULL,expires_at timestamptz NOT NULL)`}
export async function readDeviceEventIdentity(req,sql){
  const raw=typeof req?.headers?.get==='function'?req.headers.get('cookie'):req?.headers?.cookie;
  const token=String(raw||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(DEVICE_EVENT_COOKIE+'='))?.slice(DEVICE_EVENT_COOKIE.length+1);
  if(!token||!/^[A-Za-z0-9_-]{43}$/.test(token))return null;
  sql ||= getDatabase();
  await ensure(sql);
  const rows=await sql`SELECT id FROM gsc_event_devices WHERE session_hash=${hash(token)} AND expires_at>now()`;
  return rows.length?{id:rows[0].id,name:'Organizador',deviceEvent:true}:null;
}
export async function createDeviceEventIdentity(res,sql){
  await ensure(sql);const token=randomBytes(32).toString('base64url'),id='device:'+randomUUID();
  await sql`INSERT INTO gsc_event_devices(id,session_hash,expires_at) VALUES(${id},${hash(token)},now()+interval '90 days')`;
  res.setHeader('Set-Cookie',`${DEVICE_EVENT_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=7776000`);
  return{id,name:'Organizador',deviceEvent:true};
}
