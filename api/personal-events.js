import {refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {tournamentOrganizer,redeemTournamentOrganizer} from './_lib/tournament-organizers.js';
import {personalAccessEnabled} from './_lib/personal-access-activation.js';
import {codeAccessEnabled,issueEntryCode} from './_lib/code-access.js';
import {getDatabase} from './_lib/database.js';
import {requireAccountSession} from './_lib/account-auth.js';
import {readDeviceEventIdentity,createDeviceEventIdentity} from './_lib/device-event-identity.js';
import {isAllowedAppOrigin,handleAppPreflight} from './_lib/cors.js';
import {noStore,readJson} from './_lib/http.js';
import {handleLive} from './live.js';
import {refreshPrivateRoundLifecycle} from './_lib/private-round-lifecycle.js';
import {accessError,viewPersonalEventCode,joinPersonalTournamentCode,eventKind,eventScope,ensurePersonalAccess,personalMember,organizer,assignedPlayers,validateAssignedConfiguration,issuePersonalInvite,consumePersonalInvite,auditPersonal,limitPersonalAccess} from './_lib/personal-event-access.js';

const modes=['general','match_play','four_ball','stableford','universales'];
const categories=['championship','a','b','c','d','female','senior','super_senior'];
export async function resolveEventIdentity(req,res,sql,action,resolver=requireAccountSession){
  const cookie=String(req.headers?.cookie||'');
  if(/(?:^|;\s*)gsc_code_session=/.test(cookie))return resolver(req);
  const device=await readDeviceEventIdentity(req,sql);if(device)return device;
  if(resolver===requireAccountSession&&action==='identity'&&!/session[_-]token|neon.*session|auth.*session/i.test(cookie))return createDeviceEventIdentity(res,sql);
  try{return await resolver(req)}catch(error){
    if(resolver===requireAccountSession&&action==='identity'&&error.code==='ACCOUNT_UNAUTHORIZED')return createDeviceEventIdentity(res,sql);
    throw error;
  }
}
function configuration(body){
  const course=String(body.course||'').trim().slice(0,120),playedAt=String(body.playedAt||'');
  if(!course||!/^\d{4}-\d{2}-\d{2}$/.test(playedAt)||!Number.isFinite(new Date(playedAt).getTime())||new Date(playedAt).toISOString().slice(0,10)!==playedAt||!modes.includes(body.mode))throw accessError('PERSONAL_CONFIGURATION_INVALID',400);
  const selected=[...new Set(body.categories||[])];if(!selected.length||selected.some(c=>!categories.includes(c)))throw accessError('PERSONAL_CONFIGURATION_INVALID',400);
  return{course,playedAt,mode:body.mode,categories:selected,...(body.creatorName?{creatorName:String(body.creatorName).trim().slice(0,120)}:{})};
}
export async function handlePersonalEvents(req,res,database=getDatabase,accountResolver=requireAccountSession){
  noStore(res);res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');
  if(handleAppPreflight(req,res))return;if(req.method!=='POST')return res.status(405).json({ok:false,code:'METHOD_NOT_ALLOWED'});
  try{
    if(!isAllowedAppOrigin(req))throw accessError('ORIGIN_NOT_ALLOWED');
    if(database===getDatabase&&!personalAccessEnabled())throw accessError('PERSONAL_ACCESS_NOT_ENABLED',503);
    const sql=database(),body=await readJson(req,24000),account=await resolveEventIdentity(req,res,sql,body.action,accountResolver);await ensurePersonalAccess(sql);if(['list','read','close','directory'].includes(body.action))await refreshEventLifecycles(sql);await limitPersonalAccess(sql,account,String(body.action||'').slice(0,24));
    if(account.codeAccess&&account.entryRole==='viewer'&&!['identity','list','read','directory','view-code'].includes(body.action))throw accessError('PERSONAL_WRITER_FORBIDDEN');
    if(body.action==='directory'){
      const scoped=eventScope(sql,eventKind(body.eventKind||'tournament'));
      const events=await scoped`SELECT id,name,mode FROM live_tournaments WHERE status IN ('active','finished') AND expires_at>now() ORDER BY updated_at DESC`;
      return res.status(200).json({ok:true,events});
    }
    if(body.action==='identity')return res.status(200).json({ok:true,personalCode:account.id,name:account.name});
    if(body.action==='organizer-status'){try{const permission=await tournamentOrganizer(sql,req,account);return res.status(200).json({ok:true,canCreate:true,owner:permission.owner})}catch(error){if(error.code!=='TOURNAMENT_ORGANIZER_REQUIRED')throw error;return res.status(200).json({ok:true,canCreate:false,accountCode:account.id})}}
    if(body.action==='organizer-redeem')return res.status(200).json(await redeemTournamentOrganizer(sql,account,body.code));
    if(body.action==='view-code')return res.status(200).json(await viewPersonalEventCode(sql,body,account));
    if(body.action==='join-code')return res.status(200).json(await joinPersonalTournamentCode(sql,body,account));
    if(body.action==='redeem')return res.status(200).json(await consumePersonalInvite(sql,body,account));
    if(body.action==='list'){
      const rows=await sql`SELECT e.event_id,e.event_kind,e.status,e.configuration,m.role,m.display_name,m.players,m.group_label FROM gsc_personal_events e JOIN gsc_personal_members m USING(event_id,event_kind) WHERE m.account_id=${account.id} AND m.revoked_at IS NULL`;
      const events=[],aliases=[];for(const row of rows){const scoped=eventScope(sql,row.event_kind),live=await scoped`SELECT id,name,status,viewer_token_hash,expires_at FROM live_tournaments WHERE id=${row.event_id}::uuid`;if(live.length)aliases.push({eventId:row.event_id,eventKind:row.event_kind,hash:live[0].viewer_token_hash,removed:live[0].status==='revoked'||new Date(live[0].expires_at)<=new Date()});if(live.length&&live[0].status!=='revoked'&&new Date(live[0].expires_at)>new Date())events.push({eventId:row.event_id,eventKind:row.event_kind,name:live[0].name,status:row.status,role:row.role,configuration:row.configuration,players:row.players,groupLabel:row.group_label})}
      return res.status(200).json({ok:true,events,aliases,accountCode:account.id});
    }
    const kind=eventKind(body.eventKind||'tournament');
    if(body.action==='create'){
      if(kind==='tournament')await tournamentOrganizer(sql,req,account);
      const config=configuration(body),players=assignedPlayers(body.players,'organizer'),group=String(body.groupLabel||'').trim().slice(0,120);if(players.length&&!group)throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);validateAssignedConfiguration(players,config);let created,status=200;
      await handleLive({...req,body:{action:kind==='private'?'create_private_round':'create_tournament',name:body.name,mode:config.mode,durationDays:8,consent:{confirmed:true}}},{setHeader(){},status(n){status=n;return this},json(value){created=value}},()=>sql,async()=>account);
      if(status!==200)return res.status(status).json(created);
      const id=created.tournamentId;
      await sql`INSERT INTO gsc_personal_events(event_id,event_kind,owner_account_id,configuration) VALUES(${id}::uuid,${kind},${account.id},${JSON.stringify(config)}::jsonb)`;
      await sql`INSERT INTO gsc_personal_members(event_id,event_kind,account_id,role,display_name,group_label,players) VALUES(${id}::uuid,${kind},${account.id},'organizer',${account.name||'Organizador'},${group},${JSON.stringify(players)}::jsonb)`;
      await auditPersonal(sql,id,kind,account,'created',config);return res.status(200).json({...created,eventId:id,eventKind:kind,configuration:config,personal:true});
    }
    const id=body.eventId,member=await personalMember(sql,id,kind,account),scoped=eventScope(sql,kind);if(kind==='private')await refreshPrivateRoundLifecycle(sql);
    if(body.action==='read'){
      const rows=await scoped`SELECT id,name,mode,status,revision,expires_at FROM live_tournaments WHERE id=${id}::uuid`;
      if(!rows.length||rows[0].status==='revoked'||new Date(rows[0].expires_at)<=new Date())throw accessError('LIVE_EXPIRED',410);
      const streams=await scoped`SELECT id,scope,group_label,status,revision,expires_at,updated_at,current_snapshot FROM live_streams WHERE tournament_id=${id}::uuid AND status='active' AND expires_at>now() ORDER BY id LIMIT 100`;
      res.setHeader('Set-Cookie','gsc_personal_context='+encodeURIComponent(JSON.stringify({eventId:id,eventKind:kind,accountId:account.id}))+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=691200');
      return res.status(200).json({ok:true,accountCode:account.id,tournament:{...rows[0],status:member.event_status,configuration:member.configuration},membership:{role:member.role,groupLabel:member.group_label,players:member.players},streams:streams.map(row=>({id:row.id,scope:row.scope,groupLabel:row.group_label,revision:Number(row.revision),snapshot:row.current_snapshot?{...row.current_snapshot,personal:true,players:(row.current_snapshot.players||[]).map(player=>({...player,participantId:id+':'+row.group_label+':'+player.id}))}:null}))});
    }
    if(body.action==='share-code'){
      codeAccessEnabled();if(member.event_status!=='active'||!['organizer','player','scorer'].includes(member.role)||!member.players.length)throw accessError('PERSONAL_WRITER_FORBIDDEN');
      const grant=await issueEntryCode(sql,{issuerId:account.id,role:'viewer',eventId:id,eventKind:kind});
      return res.status(200).json({ok:true,...grant,url:'/code-entry.html?visitor=1'});
    }
    await organizer(sql,id,kind,account);
    if(body.action==='invite')return res.status(200).json(await issuePersonalInvite(sql,{...body,eventKind:kind},account));
    if(body.action==='organization'){
      const members=await sql`SELECT account_id,role,display_name,group_label,players,revoked_at FROM gsc_personal_members WHERE event_id=${id}::uuid AND event_kind=${kind}`;
      const invites=await sql`SELECT id,recipient_account_id,role,display_name,expires_at,consumed_at,revoked_at FROM gsc_personal_invites WHERE event_id=${id}::uuid AND event_kind=${kind}`;
      const history=await sql`SELECT action,details,created_at FROM gsc_personal_audit WHERE event_id=${id}::uuid AND event_kind=${kind} ORDER BY id DESC LIMIT 100`;
      return res.status(200).json({ok:true,members,invites,history});
    }
    if(body.action==='assign'){
      if(member.event_status!=='active')throw accessError('PERSONAL_EVENT_CLOSED',409);
      const target=await personalMember(sql,id,kind,{id:String(body.accountId||account.id)}),players=assignedPlayers(body.players,target.role),group=String(body.groupLabel||'').trim().slice(0,120);if(players.length&&!group)throw accessError('PERSONAL_ASSIGNMENT_INVALID',400);validateAssignedConfiguration(players,member.configuration);
      const applied=await sql`UPDATE gsc_personal_members SET players=${JSON.stringify(players)}::jsonb,group_label=${group} WHERE event_id=${id}::uuid AND event_kind=${kind} AND account_id=${target.account_id} AND gsc_personal_capacity(${id}::uuid,${kind},${JSON.stringify(players)}::jsonb,${group},${target.account_id}) RETURNING account_id`;if(!applied.length)throw accessError('LIVE_TOURNAMENT_CAPACITY_REACHED',409);
      if(target.stream_id)await scoped`UPDATE live_streams SET group_label=${group},selected_player_ids=${JSON.stringify(players.map(player=>player.id))}::jsonb,scope=${players.length===1?'player':'group'} WHERE id=${target.stream_id}::uuid`;
      await auditPersonal(sql,id,kind,account,'assignment_changed',{accountId:target.account_id,before:{group:target.group_label,players:target.players},after:{group,players}});return res.status(200).json({ok:true});
    }
    if(body.action==='revoke'){
      if(body.accountId===account.id)throw accessError('PERSONAL_OWNER_CANNOT_REVOKE_SELF',409);
      if(body.accountId){await sql`UPDATE gsc_personal_members SET revoked_at=now() WHERE event_id=${id}::uuid AND event_kind=${kind} AND account_id=${String(body.accountId)}`;await sql`UPDATE gsc_personal_invites SET revoked_at=now() WHERE event_id=${id}::uuid AND event_kind=${kind} AND recipient_account_id=${String(body.accountId)}`}
      else await sql`UPDATE gsc_personal_invites SET revoked_at=now() WHERE event_id=${id}::uuid AND event_kind=${kind} AND id=${body.inviteId}::uuid`;
      await auditPersonal(sql,id,kind,account,'access_revoked',{accountId:body.accountId||null,inviteId:body.inviteId||null});return res.status(200).json({ok:true});
    }
    if(body.action==='configure'){
      if(member.event_status!=='active')throw accessError('PERSONAL_EVENT_CLOSED',409);const config=configuration(body);
      // A modality change would invalidate the approved sporting engine for existing scores.
      if(config.mode!==member.configuration.mode)throw accessError('PERSONAL_MODE_LOCKED',409);
      const rosters=await sql`SELECT players FROM gsc_personal_members WHERE event_id=${id}::uuid AND event_kind=${kind} AND revoked_at IS NULL UNION ALL SELECT players FROM gsc_personal_invites WHERE event_id=${id}::uuid AND event_kind=${kind} AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>now()`;for(const roster of rosters)validateAssignedConfiguration(roster.players,config);
      await sql`UPDATE gsc_personal_events SET configuration=${JSON.stringify(config)}::jsonb WHERE event_id=${id}::uuid AND event_kind=${kind}`;await auditPersonal(sql,id,kind,account,'configuration_changed',{before:member.configuration,after:config});return res.status(200).json({ok:true,configuration:config});
    }
    if(body.action==='close'){
      await sql`UPDATE gsc_personal_events SET status='closed' WHERE event_id=${id}::uuid AND event_kind=${kind}`;await scoped`UPDATE live_tournaments SET status='finished',completed_at=coalesce(completed_at,now()),expires_at=coalesce(completed_at,now())+interval '24 hours',updated_at=now() WHERE id=${id}::uuid`;await auditPersonal(sql,id,kind,account,'closed');return res.status(200).json({ok:true});
    }
    throw accessError('PERSONAL_ACTION_INVALID',400);
  }catch(error){return res.status(Number(error.status)||(error.code==='ACCOUNT_UNAUTHORIZED'?401:error.code==='ACCOUNT_AUTH_UNAVAILABLE'?503:400)).json({ok:false,code:error.code||'PERSONAL_ACCESS_UNAVAILABLE'})}
}
export default function handler(req,res){return handlePersonalEvents(req,res)}
