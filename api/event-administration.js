import {getDatabase} from './_lib/database.js';
import {tournamentDirectoryEnvironment} from './tournament-score-directory.js';
import {ensureTournamentOrganizers,issueTournamentOrganizer} from './_lib/tournament-organizers.js';
import {requireOwner} from './_lib/app-access.js';
import {requireAccountSession} from './_lib/account-auth.js';
import {resolveEventIdentity} from './personal-events.js';
import {ensurePersonalAccess,accessError,eventKind,limitPersonalAccess} from './_lib/personal-event-access.js';
import {ensureEventAdministration,eventAdminAuthority,issueEventAdmin,redeemEventAdmin,deleteAdminEvent} from './_lib/event-administration.js';
import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {isAllowedAppOrigin,handleAppPreflight} from './_lib/cors.js';
import {noStore,readJson} from './_lib/http.js';
export async function handleEventAdministration(req,res,database=getDatabase,ownerResolver=requireOwner,identityResolver=requireAccountSession){
 noStore(res);if(handleAppPreflight(req,res))return;
 try{
 if(req.method!=='POST')throw accessError('METHOD_NOT_ALLOWED',405);
 if(!isAllowedAppOrigin(req))throw accessError('ORIGIN_NOT_ALLOWED');
 const sql=database(),body=await readJson(req,4000);let account,owner=false;
 try{account=await ownerResolver(req);owner=true}catch(error){if(!['OWNER_REQUIRED','ACCOUNT_UNAUTHORIZED'].includes(error.code))throw error;account=await resolveEventIdentity(req,res,sql,'list',identityResolver)}
 await ensurePersonalAccess(sql);await ensureEventAdministration(sql);await refreshEventLifecycles(sql);await limitPersonalAccess(sql,account,'event-admin');
 if(String(body.action).startsWith('organizer-')){if(!owner)throw accessError('OWNER_REQUIRED');await ensureTournamentOrganizers(sql);if(body.action==='organizer-issue')return res.status(200).json(await issueTournamentOrganizer(sql,account,body));if(body.action==='organizer-list')return res.status(200).json({ok:true,grants:await sql`SELECT id,recipient_account_id,recipient_name,expires_at,redeemed_at,revoked_at FROM gsc_tournament_organizers ORDER BY created_at DESC`});if(body.action==='organizer-revoke'){await sql`UPDATE gsc_tournament_organizers SET revoked_at=now() WHERE id=${body.grantId}::uuid`;return res.status(200).json({ok:true})}throw accessError('ADMIN_ACTION_INVALID',400)}
 if(body.action==='redeem')return res.status(200).json(await redeemEventAdmin(sql,account,body.code));
 if(body.action==='list'){
 const items=await sql`SELECT id,name,status,expires_at,'tournament' AS event_kind FROM live_tournaments UNION ALL SELECT id,name,status,expires_at,'private' AS event_kind FROM live_private_rounds`;
 const events=[];for(const item of items){try{const authority=await eventAdminAuthority(sql,{eventId:item.id,eventKind:item.event_kind},account,owner);if(item.status!=='revoked'&&new Date(item.expires_at)>new Date())events.push({...item,authority:authority.authority})}catch(error){if(error.code!=='EVENT_ADMIN_REQUIRED')throw error}}
 const receipts=owner?await sql`SELECT * FROM gsc_event_deletions ORDER BY deleted_at DESC LIMIT 200`:await sql`SELECT * FROM gsc_event_deletions WHERE actor_account_id=${account.id} ORDER BY deleted_at DESC LIMIT 200`;
 return res.status(200).json({ok:true,owner,accountCode:account.id,source:tournamentDirectoryEnvironment(process.env,req.headers?.host),events,receipts});
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
