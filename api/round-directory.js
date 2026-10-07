import liveControl from '../live-control.js';
import accountBackup from '../account-backup.js';
import {createHash,randomUUID} from 'node:crypto';
import {getDatabase} from './_lib/database.js';
import {readJson,noStore} from './_lib/http.js';
import {handleAppPreflight,isAllowedAppOrigin} from './_lib/cors.js';
import {tournamentDirectoryEnvironment} from './tournament-score-directory.js';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const hash=x=>createHash('sha256').update(x).digest('hex');
const text=(x,n=160)=>String(x??'').trim().slice(0,n);
const pick=(x,keys)=>Object.fromEntries(keys.filter(k=>Object.hasOwn(x||{},k)).map(k=>[k,x[k]]));
export function publicRound(value){
 if(!value||!Array.isArray(value.players)||!value.players.length||value.players.length>6||!text(value.roundId))throw Object.assign(new Error('ROUND_INVALID'),{code:'ROUND_INVALID'});
 const out=pick(value,['schemaVersion','roundId','tournament','playedAt','course','mode','groupLabel','status','officiallyClosedAt','updatedAt','appVersion']);
 for(const key of Object.keys(out))if(key!=='schemaVersion')out[key]=out[key]===null?null:text(out[key],key==='groupLabel'?120:160);
 out.schemaVersion=1;
 out.courseHoles=(value.courseHoles||[]).slice(0,18).map(h=>({hole:Number(h.hole),par:Number(h.par)})).filter(h=>Number.isInteger(h.hole)&&h.hole>=1&&h.hole<=18&&h.par>=3&&h.par<=6);
 out.players=value.players.map(p=>{
 const player={id:text(p.id,80),name:text(p.name,80),tournamentCategory:text(p.tournamentCategory,24),tee:text(p.tee,40),handicap:Number(p.handicap)||0,visualSlot:Number(p.visualSlot)||1};
 player.holes=(Array.isArray(p.holes)?p.holes:[]).slice(0,18).map(h=>{const v={};for(const k of ['hole','par','gross','net','strokeIndex','handicapStrokes','relativeToPar','stablefordPoints','universalesPoints'])if(Object.hasOwn(h,k)&& (Number.isFinite(h[k])||(['gross','net'].includes(k)&&h[k]==='X')))v[k]=h[k];if(h.explicitX===true){v.explicitX=true;v.gross=null;v.net=null}if(h.updatedAt)v.updatedAt=text(h.updatedAt,40);return v}).filter(h=>Number.isInteger(h.hole)&&h.hole>=1&&h.hole<=18);
 player.totals={};for(const k of ['gross','net','par','relativeToPar','stablefordPoints','universalesPoints','holes'])if(Number.isFinite(p.totals?.[k]))player.totals[k]=p.totals[k];return player;
 });return out;
}
export async function ensureRoundDirectory(sql){await sql`CREATE TABLE IF NOT EXISTS gsc_global_rounds (id uuid PRIMARY KEY,device_hash char(64) NOT NULL,client_round_id text NOT NULL,code text NOT NULL UNIQUE,sequence bigint NOT NULL,payload_hash char(64) NOT NULL,snapshot jsonb NOT NULL,event_id uuid,event_kind text,received_at timestamptz NOT NULL DEFAULT now(),UNIQUE(device_hash,client_round_id))`}
export async function handleRoundDirectory(req,res,databaseGetter=getDatabase,fetcher=globalThis.fetch,env=process.env){
 noStore(res);if(handleAppPreflight(req,res))return;if(req.method!=='POST')return res.status(405).json({ok:false,code:'METHOD_NOT_ALLOWED'});
 try{
 const body=await readJson(req,64000);if(Buffer.byteLength(JSON.stringify(body))>64000)return res.status(413).json({ok:false,code:'BODY_TOO_LARGE'});
 const sql=databaseGetter();await ensureRoundDirectory(sql);
 const source=tournamentDirectoryEnvironment(env,req.headers?.host),other=source==='lab'?'production':'lab';
 const peer=source==='lab'?'https://epg-caddy.vercel.app/api/round-directory':'https://golf-sc-gt-lab.vercel.app/api/round-directory';
 const requestPeer=async data=>{const response=await fetcher(peer,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),cache:'no-store',signal:AbortSignal.timeout(8000)});if(!response.ok)throw new Error('PEER_UNAVAILABLE');return response.json()};
 if(body.action==='publish'){
 if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,code:'ORIGIN_FORBIDDEN'});
 const secret=String(req.headers?.authorization||'').replace(/^RoundDevice /,'');if(!/^[a-f0-9]{64}$/.test(secret))return res.status(401).json({ok:false,code:'ROUND_DEVICE_REQUIRED'});
 const snapshot=publicRound(body.snapshot),sequence=Number(body.sequence),mutationId=text(body.mutationId,100);
 if(!Number.isSafeInteger(sequence)||sequence<1||!mutationId)return res.status(400).json({ok:false,code:'ROUND_SEQUENCE_INVALID'});
 const deviceHash=hash(secret),payloadHash=hash(JSON.stringify(snapshot)),eventId=UUID.test(body.eventId||'')?body.eventId:null,eventKind=body.eventKind==='private'?'private':'tournament';
 if(eventId){const table=eventKind==='private'?'live_private_rounds':'live_tournaments';const rows=eventKind==='private'?await sql`SELECT id FROM live_private_rounds WHERE id=${eventId}::uuid AND status IN ('active','finished') AND expires_at>now()`:await sql`SELECT id FROM live_tournaments WHERE id=${eventId}::uuid AND status='active' AND expires_at>now()`;if(!rows.length)return res.status(410).json({ok:false,code:'ROUND_EVENT_EXPIRED'});}
 const id=randomUUID(),code='R'+id.replaceAll('-','').toUpperCase();
 const rows=await sql`INSERT INTO gsc_global_rounds(id,device_hash,client_round_id,code,sequence,payload_hash,snapshot,event_id,event_kind) VALUES (${id}::uuid,${deviceHash},${snapshot.roundId},${code},${sequence},${payloadHash},${JSON.stringify(snapshot)}::jsonb,${eventId}::uuid,${eventId?eventKind:null}) ON CONFLICT(device_hash,client_round_id) DO UPDATE SET sequence=EXCLUDED.sequence,payload_hash=EXCLUDED.payload_hash,snapshot=EXCLUDED.snapshot,event_id=EXCLUDED.event_id,event_kind=EXCLUDED.event_kind,received_at=now() WHERE gsc_global_rounds.sequence<EXCLUDED.sequence RETURNING id,code,sequence,payload_hash,received_at`;
 const row=rows[0]||(await sql`SELECT id,code,sequence,payload_hash,received_at FROM gsc_global_rounds WHERE device_hash=${deviceHash} AND client_round_id=${snapshot.roundId}`)[0];
 if(Number(row.sequence)!==sequence||row.payload_hash!==payloadHash)return res.status(409).json({ok:false,code:'ROUND_STALE_SEQUENCE',sequence:Number(row.sequence)});
 return res.status(200).json({ok:true,id:row.id,code:row.code,sequence:Number(row.sequence),mutationId,payloadHash,requestHash:hash(JSON.stringify(body.snapshot)),receivedAt:row.received_at,source});
 }
 const local=async after=>{if(after&&!UUID.test(after))throw Object.assign(new Error('CURSOR_INVALID'),{code:'CURSOR_INVALID'});return sql`WITH candidates AS (
 SELECT id,code,snapshot,event_id,event_kind,received_at,false AS legacy FROM gsc_global_rounds
 UNION ALL SELECT id,'R'||upper(replace(id::text,'-','')),current_snapshot,tournament_id,'tournament',updated_at,false FROM live_streams WHERE status='active' AND expires_at>now() AND current_snapshot IS NOT NULL
 UNION ALL SELECT id,'R'||upper(replace(id::text,'-','')),current_snapshot,tournament_id,'private',updated_at,false FROM live_private_streams WHERE status='active' AND expires_at>now() AND current_snapshot IS NOT NULL
 UNION ALL SELECT id,'R'||upper(replace(id::text,'-','')),raw_snapshot,NULL::uuid,NULL::text,updated_at,true FROM rounds WHERE raw_snapshot IS NOT NULL
 ) SELECT * FROM candidates r WHERE (${after||null}::uuid IS NULL OR r.id>${after||null}::uuid) AND (r.event_id IS NULL OR (r.event_kind='tournament' AND EXISTS(SELECT 1 FROM live_tournaments e WHERE e.id=r.event_id AND e.status='active' AND e.expires_at>now())) OR (r.event_kind='private' AND EXISTS(SELECT 1 FROM live_private_rounds e WHERE e.id=r.event_id AND e.status IN ('active','finished') AND e.expires_at>now()))) ORDER BY id LIMIT 100`};
 if(body.action==='list-local'||body.action==='list'){
 const cursor=body.cursor||{},rows=await local(cursor[source]),items=rows.flatMap(r=>{try{return [{id:r.id,code:r.code,event_id:r.event_id,event_kind:r.event_kind,received_at:r.received_at,source,snapshot:publicRound(r.legacy?liveControl.buildLiveSnapshot(accountBackup.localRound(r.snapshot),{pars:r.snapshot.course?.definition?.par}):r.snapshot)}]}catch{return []}});let partial=false,peerNext=null,peerMore=false;
 if(body.action==='list'){try{const data=await requestPeer({action:'list-local',cursor});if(!data.ok)throw new Error('PEER_UNAVAILABLE');items.push(...(data.items||[]));peerNext=data.next?.[other]||null;peerMore=!!data.hasMore}catch{partial=true;peerNext=cursor[other]||null}}
 const next={...cursor,[source]:rows.length?rows.at(-1).id:cursor[source]||null,...(body.action==='list'?{[other]:peerNext}:{})};
 return res.status(200).json({ok:true,partial,items,next,hasMore:rows.length===100||body.action==='list'&&(partial||peerMore)});
 }
 return res.status(400).json({ok:false,code:'ROUND_ACTION_UNSUPPORTED'});
 }catch(error){const code=error.code||'ROUND_DIRECTORY_UNAVAILABLE';return res.status(['ROUND_INVALID','CURSOR_INVALID','INVALID_JSON'].includes(code)?400:code==='DATABASE_NOT_CONFIGURED'?503:500).json({ok:false,code})}
}
export default function handler(req,res){return handleRoundDirectory(req,res)}
