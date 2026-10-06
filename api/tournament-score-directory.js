import {getDatabase} from './_lib/database.js';
import {ensurePersonalAccess,availableTournamentEntryCode,eventKind,eventScope} from './_lib/personal-event-access.js';
import {ensureEventLifecycle} from './_lib/event-lifecycle.js';
import {noStore,readJson} from './_lib/http.js';

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ALLOWED_SNAPSHOT=new Set(['schemaVersion','roundId','tournament','playedAt','course','courseHoles','players','mode','groupLabel','status','officiallyClosedAt','updatedAt','appVersion']);
const ALLOWED_PLAYER=new Set(['id','name','handicap','tournamentCategory','tee','holes','totals','visualSlot']);
const pick=(object,keys)=>Object.fromEntries([...keys].filter(key=>object&&Object.hasOwn(object,key)).map(key=>[key,object[key]]));
const safeStream=row=>({...row,current_snapshot:pick(row.current_snapshot,ALLOWED_SNAPSHOT).players?.map?{...pick(row.current_snapshot,ALLOWED_SNAPSHOT),players:row.current_snapshot.players.map(player=>pick(player,ALLOWED_PLAYER))}:pick(row.current_snapshot,ALLOWED_SNAPSHOT)});
export function tournamentDirectoryEnvironment(env=process.env,requestHost=''){
 const hosts=[requestHost,env.VERCEL_URL,env.VERCEL_BRANCH_URL].map(value=>Array.isArray(value)?value[0]:String(value||'')).map(value=>value.toLowerCase().split(',')[0].trim().replace('https://','').replace('http://','').split('/')[0].split(':')[0]);
 const isLabHost=host=>host==='golf-sc-gt-lab.vercel.app'||host.startsWith('golf-sc-gt-lab-');
 return env.VERCEL_PROJECT_ID==='prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp'||String(env.GSC_ENVIRONMENT||'').trim().toLowerCase()==='lab'||hosts.some(isLabHost)?'lab':'production';
}
export function tournamentDirectoryPeerUrl(env=process.env,requestHost=''){return tournamentDirectoryEnvironment(env,requestHost)==='lab'?'https://epg-caddy.vercel.app/api/tournament-score-directory':'https://golf-sc-gt-lab.vercel.app/api/tournament-score-directory'}

export async function handleTournamentScoreDirectory(req,res,databaseGetter=getDatabase,fetcher=globalThis.fetch,env=process.env){
 noStore(res);res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 if(req.method!=='POST')return res.status(405).json({ok:false,code:'METHOD_NOT_ALLOWED'});
 try{
  const body=await readJson(req,8000),action=String(body.action||'list'),sql=databaseGetter(),requestHost=req.headers?.['x-forwarded-host']||req.headers?.host||'',source=tournamentDirectoryEnvironment(env,requestHost);
  const withCodes=body.withCodes===true,includeGroups=body.includeGroups===true;
  const localRows=async()=>{
   const tournaments=await sql`SELECT id,name,status FROM live_tournaments WHERE status='active' AND expires_at>now() ORDER BY updated_at DESC`;
   if(!includeGroups)return tournaments;
   await ensureEventLifecycle(sql,['private']);
   const groups=await sql`SELECT id,name,status FROM live_private_rounds WHERE status IN ('active','finished') AND expires_at>now() ORDER BY updated_at DESC`;
   return [...tournaments.map(row=>({...row,event_kind:'tournament'})),...groups.map(row=>({...row,event_kind:'private'}))];
  };
  const attachCodes=async rows=>{if(!withCodes)return rows;await ensurePersonalAccess(sql);return Promise.all(rows.map(async row=>{try{return {...row,...await availableTournamentEntryCode(sql,row.id,row.event_kind||'tournament')}}catch(error){return {...row,codeError:error.code||'TOURNAMENT_CODE_NOT_AVAILABLE'}}}))};
  if(action==='list'){
   const rows=await attachCodes(await localRows());
   let peer=[],partial=false;try{const response=await fetcher(tournamentDirectoryPeerUrl(env,requestHost),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list-local',...(withCodes?{withCodes:true}:{}),...(includeGroups?{includeGroups:true}:{})}),cache:'no-store'});if(response.ok){const result=await response.json();if(result.ok){peer=result.events||[];partial=!!result.partial}else partial=true}else partial=true}catch{partial=true}
   const peerSource=source==='lab'?'production':'lab';
   const merged=new Map();for(const row of rows)merged.set(`${source}:${row.event_kind||'tournament'}:${row.id}`,{...row,source});for(const row of peer)merged.set(`${peerSource}:${row.event_kind||'tournament'}:${row.id}`,{...row,source:peerSource});
   return res.status(200).json({ok:true,partial:partial||withCodes&&[...merged.values()].some(row=>!row.joinCode),events:[...merged.values()]});
  }
  if(action==='list-local'){
   const rows=await attachCodes(await localRows());
   return res.status(200).json({ok:true,...(withCodes?{partial:rows.some(row=>!row.joinCode)}:{}),events:rows.map(row=>({...row,source}))});
  }
  if(action==='read-local'||action==='read'){
   const kind=eventKind(body.eventKind||'tournament'),scoped=eventScope(sql,kind);
   if(kind==='private')await ensureEventLifecycle(sql,['private']);
   const eventId=String(body.eventId||'');if(!UUID.test(eventId))return res.status(400).json({ok:false,code:'LIVE_INVALID_TOURNAMENT'});
   if(action==='read'&&body.source!==source){const response=await fetcher(tournamentDirectoryPeerUrl(env,requestHost),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'read-local',eventId,eventKind:kind}),cache:'no-store'});const data=await response.json().catch(()=>null);return res.status(response.status).json(data||{ok:false,code:'TOURNAMENT_DIRECTORY_UNAVAILABLE'})}
   const tournaments=await scoped`SELECT id,name,mode,status,revision,expires_at,updated_at FROM live_tournaments WHERE id=${eventId}::uuid AND (status='active' OR (${kind}='private' AND status='finished')) AND expires_at>now()`;
   if(!tournaments.length)return res.status(410).json({ok:false,code:'LIVE_EXPIRED'});
   const rows=await scoped`SELECT id,scope,group_label,status,revision,expires_at,updated_at,current_snapshot FROM live_streams WHERE tournament_id=${eventId}::uuid AND status='active' ORDER BY id`;
   const tournament=tournaments[0];return res.status(200).json({ok:true,kind,tournament:{...tournament,revision:Number(tournament.revision)},streams:rows.map(row=>{const safe=safeStream(row);return{id:safe.id,scope:safe.scope,groupLabel:safe.group_label,status:safe.status,revision:Number(safe.revision)||0,expiresAt:safe.expires_at,updatedAt:safe.updated_at,snapshot:safe.current_snapshot}})});
  }
  return res.status(400).json({ok:false,code:'LIVE_ACTION_UNSUPPORTED'});
 }catch(error){return res.status(error.code==='DATABASE_NOT_CONFIGURED'?503:500).json({ok:false,code:error.code||'TOURNAMENT_DIRECTORY_UNAVAILABLE'})}
}
export default function handler(req,res){return handleTournamentScoreDirectory(req,res)}
