import {getDatabase} from './_lib/database.js';
import {tournamentDirectoryEnvironment,tournamentDirectoryPeerUrl} from './tournament-score-directory.js';
import {ensureTournamentOrganizers,issueTournamentOrganizer} from './_lib/tournament-organizers.js';
import {requireOwner} from './_lib/app-access.js';
import {requireAccountSession} from './_lib/account-auth.js';
import {resolveEventIdentity} from './personal-events.js';
import {ensurePersonalAccess,accessError,eventKind,limitPersonalAccess} from './_lib/personal-event-access.js';
import {ensureEventAdministration,eventAdminAuthority,issueEventAdmin,redeemEventAdmin,deleteAdminEvent,deleteAdminRound,claimLegacyEvent} from './_lib/event-administration.js';
import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {isAllowedAppOrigin,handleAppPreflight} from './_lib/cors.js';
import {noStore,readJson} from './_lib/http.js';
export async function handleEventAdministration(req,res,database=getDatabase,ownerResolver=requireOwner,identityResolver=requireAccountSession,fetcher=globalThis.fetch,env=process.env){
 noStore(res);if(handleAppPreflight(req,res))return;
 try{
 if(req.method!=='POST')throw accessError('METHOD_NOT_ALLOWED',405);
 if(!isAllowedAppOrigin(req))throw accessError('ORIGIN_NOT_ALLOWED');
 const sql=database(),body=await readJson(req,4000),guestMode=String(req.headers?.cookie||"").split(";").some(value=>value.trim()==="gsc_guest_mode=1");let account,owner=false;
 if(guestMode&&body.action!=="remote-share")throw accessError('EVENT_ADMIN_GUEST_FORBIDDEN',403);
 try{account=await ownerResolver(req);owner=true}catch(error){if(!['OWNER_REQUIRED','ACCOUNT_UNAUTHORIZED'].includes(error.code))throw error;account=await resolveEventIdentity(req,res,sql,'list',identityResolver)}
 await ensurePersonalAccess(sql);await ensureEventAdministration(sql);await refreshEventLifecycles(sql);await limitPersonalAccess(sql,account,'event-admin');
 const requestHost=req.headers?.['x-forwarded-host']||req.headers?.host||'',source=tournamentDirectoryEnvironment(env,requestHost),peerUrl=tournamentDirectoryPeerUrl(env,requestHost);
 const relay=async(path,payload)=>{const base=peerUrl.replace(/\/api\/tournament-score-directory\/?$/,'');const response=await fetcher(base+path,{method:'POST',headers:{'content-type':'application/json',...(req.headers?.cookie?{Cookie:req.headers.cookie}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000)});let data;try{data=await response.json()}catch{data={ok:false,code:'PEER_RESPONSE_INVALID'}}return{status:response.status,data}};
 if(body.action==='delete-round'||body.action==='remote-delete-round'){
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(body.roundId||'')))throw accessError('ROUND_ID_INVALID',400);
  const kind=eventKind(body.eventKind);
  if(body.action==='remote-delete-round'){
   if(!['lab','production'].includes(body.source)||body.source===source)throw accessError('EVENT_SOURCE_INVALID',400);
   const result=await relay('/api/event-administration',{action:'delete-round',roundId:body.roundId,eventKind:kind,confirmLabel:body.confirmLabel,confirmedTwice:body.confirmedTwice});return res.status(result.status).json(result.data);
  }
  return res.status(200).json(await deleteAdminRound(sql,{roundId:body.roundId,eventKind:kind},account,owner,body));
 }
 if(body.action==='remote-delete'||body.action==='remote-share'||body.action==='remote-claim-legacy'){
  const target=String(body.source||'');if(!['lab','production'].includes(target)||target===source)throw accessError('EVENT_SOURCE_INVALID',400);
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(body.eventId||'')))throw accessError('EVENT_ID_INVALID',400);
  const path=body.action==='remote-share'?'/api/personal-events':'/api/event-administration';
  const action=body.action==='remote-delete'?{action:'delete',eventId:body.eventId,eventKind:body.eventKind,confirmName:body.confirmName,reason:body.reason}:body.action==='remote-claim-legacy'?{action:'claim-legacy',eventId:body.eventId,eventKind:body.eventKind,organizerSecret:body.organizerSecret}:{action:'share-code',eventId:body.eventId,eventKind:body.eventKind};
  const result=await relay(path,action);return res.status(result.status).json(result.data);
 }
 if(body.action==='claim-legacy')return res.status(200).json(await claimLegacyEvent(sql,{eventId:body.eventId,eventKind:eventKind(body.eventKind)},account,body.organizerSecret));
 if(String(body.action).startsWith('organizer-')){if(!owner)throw accessError('OWNER_REQUIRED');await ensureTournamentOrganizers(sql);if(body.action==='organizer-issue')return res.status(200).json(await issueTournamentOrganizer(sql,account,body));if(body.action==='organizer-list')return res.status(200).json({ok:true,grants:await sql`SELECT id,recipient_account_id,recipient_name,expires_at,redeemed_at,revoked_at FROM gsc_tournament_organizers ORDER BY created_at DESC`});if(body.action==='organizer-revoke'){await sql`UPDATE gsc_tournament_organizers SET revoked_at=now() WHERE id=${body.grantId}::uuid`;return res.status(200).json({ok:true})}throw accessError('ADMIN_ACTION_INVALID',400)}
 if(body.action==='redeem')return res.status(200).json(await redeemEventAdmin(sql,account,body.code));
 if(body.action==='list'||body.action==='list-local'){
 const items=await sql`SELECT id,name,status,expires_at,'tournament' AS event_kind FROM live_tournaments UNION ALL SELECT id,name,status,expires_at,'private' AS event_kind FROM live_private_rounds`;
 const events=[];for(const item of items){try{const authority=await eventAdminAuthority(sql,{eventId:item.id,eventKind:item.event_kind},account,owner);if(item.status!=='revoked'&&new Date(item.expires_at)>new Date())events.push({...item,authority:authority.authority,source})}catch(error){if(error.code!=='EVENT_ADMIN_REQUIRED')throw error;if(item.status!=='revoked'&&new Date(item.expires_at)>new Date())events.push({...item,authority:null,canAdminister:false,source})}}
 const receipts=owner?await sql`SELECT * FROM gsc_event_deletions ORDER BY deleted_at DESC LIMIT 200`:await sql`SELECT * FROM gsc_event_deletions WHERE actor_account_id=${account.id} ORDER BY deleted_at DESC LIMIT 200`;
 if(body.action==='list-local')return res.status(200).json({ok:true,owner,accountCode:account.id,source,events,receipts});
 let partial=false,peerEvents=[];try{const remote=await relay('/api/event-administration',{action:'list-local'});if(remote.status===200&&remote.data?.ok)peerEvents=(remote.data.events||[]).map(event=>({...event,source:source==='lab'?'production':'lab'}));else partial=true}catch{partial=true}
 const merged=new Map();for(const item of events)merged.set(`${source}:${item.event_kind}:${item.id}`,item);for(const item of peerEvents)merged.set(`${item.source}:${item.event_kind}:${item.id}`,item);
 return res.status(200).json({ok:true,owner,accountCode:account.id,source,events:[...merged.values()],receipts,partial});
 }
 const event={eventId:body.eventId,eventKind:eventKind(body.eventKind)};
 if(body.action==='issue')return res.status(200).json(await issueEventAdmin(sql,event,account,owner,body));
 if(body.action==='delete')return res.status(200).json(await deleteAdminEvent(sql,event,account,owner,body));
 const authority=await eventAdminAuthority(sql,event,account,owner);if(authority.authority==='delegate')throw accessError('EVENT_OWNER_REQUIRED');
 if(body.action==='grants')return res.status(200).json({ok:true,grants:await sql`SELECT id,recipient_account_id,recipient_name,expires_at,redeemed_at,revoked_at FROM gsc_event_admin_grants WHERE event_id=${event.eventId}::uuid AND event_kind=${event.eventKind} ORDER BY created_at DESC`});
 if(body.action==='revoke'){await sql`UPDATE gsc_event_admin_grants SET revoked_at=now() WHERE id=${body.grantId}::uuid AND event_id=${event.eventId}::uuid AND event_kind=${event.eventKind}`;return res.status(200).json({ok:true})}
 throw accessError('ADMIN_ACTION_INVALID',400);
 }catch(error){return res.status(error.status||400).json({ok:false,code:error.code||'ADMIN_UNAVAILABLE'})}
}
export default function handler(req,res){return handleEventAdministration(req,res)}
