import {getDatabase} from './_lib/database.js';
import {noStore,readJson} from './_lib/http.js';

const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ALLOWED_SNAPSHOT=new Set(['schemaVersion','roundId','tournament','playedAt','course','courseHoles','players','mode','groupLabel','status','officiallyClosedAt','updatedAt','appVersion']);
const ALLOWED_PLAYER=new Set(['id','name','handicap','tournamentCategory','tee','holes','totals','visualSlot']);
const pick=(object,keys)=>Object.fromEntries([...keys].filter(key=>object&&Object.hasOwn(object,key)).map(key=>[key,object[key]]));
const safeStream=row=>({...row,current_snapshot:pick(row.current_snapshot,ALLOWED_SNAPSHOT).players?.map?{...pick(row.current_snapshot,ALLOWED_SNAPSHOT),players:row.current_snapshot.players.map(player=>pick(player,ALLOWED_PLAYER))}:pick(row.current_snapshot,ALLOWED_SNAPSHOT)});
export function tournamentDirectoryEnvironment(env=process.env){return env.VERCEL_PROJECT_ID==='prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp'||env.GSC_ENVIRONMENT==='lab'?'lab':'production'}
export function tournamentDirectoryPeerUrl(env=process.env){return tournamentDirectoryEnvironment(env)==='lab'?'https://epg-caddy.vercel.app/api/tournament-score-directory':'https://golf-sc-gt-lab.vercel.app/api/tournament-score-directory'}

export async function handleTournamentScoreDirectory(req,res,databaseGetter=getDatabase,fetcher=globalThis.fetch,env=process.env){
 noStore(res);res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 if(req.method!=='POST')return res.status(405).json({ok:false,code:'METHOD_NOT_ALLOWED'});
 try{
  const body=await readJson(req,8000),action=String(body.action||'list'),sql=databaseGetter(),source=tournamentDirectoryEnvironment(env);
  if(action==='list'){
   const rows=await sql`SELECT id,name,status FROM live_tournaments WHERE status='active' AND expires_at>now() ORDER BY updated_at DESC`;
   let peer=[],partial=false;try{const response=await fetcher(tournamentDirectoryPeerUrl(env),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list-local'}),cache:'no-store'});if(response.ok){const result=await response.json();if(result.ok)peer=result.events||[];else partial=true}else partial=true}catch{partial=true}
   return res.status(200).json({ok:true,partial,events:[...rows.map(row=>({...row,source})),...peer.filter(row=>row.source!==source)]});
  }
  if(action==='list-local'){
   const rows=await sql`SELECT id,name,status FROM live_tournaments WHERE status='active' AND expires_at>now() ORDER BY updated_at DESC`;
   return res.status(200).json({ok:true,events:rows.map(row=>({...row,source}))});
  }
  if(action==='read-local'||action==='read'){
   const eventId=String(body.eventId||'');if(!UUID.test(eventId))return res.status(400).json({ok:false,code:'LIVE_INVALID_TOURNAMENT'});
   if(action==='read'&&body.source!==source){const response=await fetcher(tournamentDirectoryPeerUrl(env),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'read-local',eventId}),cache:'no-store'});const data=await response.json().catch(()=>null);return res.status(response.status).json(data||{ok:false,code:'TOURNAMENT_DIRECTORY_UNAVAILABLE'})}
   const tournaments=await sql`SELECT id,name,mode,status,revision,expires_at,updated_at FROM live_tournaments WHERE id=${eventId}::uuid AND status='active' AND expires_at>now()`;
   if(!tournaments.length)return res.status(410).json({ok:false,code:'LIVE_EXPIRED'});
   const rows=await sql`SELECT id,scope,group_label,status,revision,expires_at,updated_at,current_snapshot FROM live_streams WHERE tournament_id=${eventId}::uuid AND status='active' AND expires_at>now() ORDER BY id LIMIT 100`;
   const tournament=tournaments[0];return res.status(200).json({ok:true,kind:'tournament',tournament:{...tournament,revision:Number(tournament.revision)},streams:rows.map(row=>{const safe=safeStream(row);return{id:safe.id,scope:safe.scope,groupLabel:safe.group_label,status:safe.status,revision:Number(safe.revision)||0,expiresAt:safe.expires_at,updatedAt:safe.updated_at,snapshot:safe.current_snapshot}})});
  }
  return res.status(400).json({ok:false,code:'LIVE_ACTION_UNSUPPORTED'});
 }catch(error){return res.status(error.code==='DATABASE_NOT_CONFIGURED'?503:500).json({ok:false,code:error.code||'TOURNAMENT_DIRECTORY_UNAVAILABLE'})}
}
export default function handler(req,res){return handleTournamentScoreDirectory(req,res)}
