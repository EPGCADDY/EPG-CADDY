import {ensureEventLifecycle,refreshEventLifecycles} from './_lib/event-lifecycle.js';
import {personalAccessEnabled} from './_lib/personal-access-activation.js';
import {refreshPrivateRoundLifecycle} from "./_lib/private-round-lifecycle.js";
import { createHash, randomBytes } from "node:crypto";
import { getDatabase } from "./_lib/database.js";
import { handleAppPreflight, isAllowedAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";
import {requireAccountSession} from './_lib/account-auth.js';
import {readDeviceEventIdentity} from './_lib/device-event-identity.js';
import {tournamentOrganizer} from './_lib/tournament-organizers.js';
import {ensurePersonalAccess,guardPersonalLive,personalPublishingSql} from './_lib/personal-event-access.js';

const LIVE_POLICY_VERSION="gsc-gt-live-v1";
const LIVE_UPSTREAM_URL="https://epg-caddy.vercel.app/api/live";

async function proxyLiveToProduction(req,res){
  const host=String(req?.headers?.["x-forwarded-host"]||req?.headers?.host||"").split(",")[0].trim().toLowerCase();
  if(host==="epg-caddy.vercel.app"||host.includes("lab")||host.startsWith("golf-sc-gt-")||process.env.VERCEL_PROJECT_ID==="prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp"||/^(localhost|127\.0\.0\.1)(:|$)/.test(host)||process.env.GSC_ENVIRONMENT==="lab")throw liveError("DATABASE_NOT_CONFIGURED",503);
  const headers={"content-type":"application/json"};
  if(req?.headers?.authorization)headers.authorization=String(req.headers.authorization);
  const body=typeof req.body==="string"?req.body:JSON.stringify(req.body||{});
  const upstream=await fetch(LIVE_UPSTREAM_URL,{method:"POST",headers,body,cache:"no-store"});
  const text=await upstream.text();
  res.status(upstream.status);
  const type=upstream.headers.get("content-type");if(type)res.setHeader("content-type",type);
  return res.send(text);
}

const MAX_TOURNAMENT_PLAYERS=100;
const TOKEN_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
const SECRET_PATTERN=/^[A-Za-z0-9_-]{40,100}$/;
// Score Card keeps stable legacy player IDs such as p1..p6. They are valid
// client identifiers inside an authenticated, private LIVE snapshot.
const ID_PATTERN=/^[A-Za-z0-9._:-]{1,160}$/;
const UUID_PATTERN=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONTROL_ACTIONS=new Set(["create_stream","publish","revoke_stream","create_tournament","join_tournament","join_tournament_by_id","leave_tournament","revoke_tournament"]);

// Separate tables prevent private rounds from appearing in any tournament client.
export function privateRoundSql(sql){return(strings,...values)=>{const mapped=strings.map(part=>part.replace(/\blive_tournaments\b/g,"live_private_rounds").replace(/\blive_streams\b/g,"live_private_streams").replace(/\blive_events\b/g,"live_private_events"));mapped.raw=mapped.slice();return sql(mapped,...values)}}
async function ensurePrivateRoundTables(sql){
  await sql`CREATE TABLE IF NOT EXISTS live_private_rounds (LIKE live_tournaments INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES, viewer_access_token text)`;
  await sql`CREATE TABLE IF NOT EXISTS live_private_streams (LIKE live_streams INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)`;
  await sql`CREATE TABLE IF NOT EXISTS live_private_events (LIKE live_events INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES INCLUDING IDENTITY)`;
  await sql`ALTER TABLE live_private_rounds ADD COLUMN IF NOT EXISTS completed_at timestamptz, ADD COLUMN IF NOT EXISTS completed_roster text, ADD COLUMN IF NOT EXISTS base_expires_at timestamptz`;
  await sql`UPDATE live_private_rounds SET base_expires_at=expires_at WHERE base_expires_at IS NULL`;
  // Owner-authorized retirement of the two identified Cuates test rounds; recoverable.
  await sql`UPDATE live_private_rounds SET status='revoked',revoked_at=coalesce(revoked_at,now()),updated_at=now() WHERE id IN ('b6aabdee-065f-4f62-9f9a-499832263857'::uuid,'ba15e650-c8a3-4f8e-a937-b87e0d26edaf'::uuid) AND name='Cuates' AND status='active'`;
}
export async function privateRoundAction(sql,req,body,action){
  await ensurePrivateRoundTables(sql);await refreshPrivateRoundLifecycle(sql);const scoped=privateRoundSql(sql);
  if(action==="create_private_round"){
    const result=await createTournament(scoped,req,body);
    await sql`UPDATE live_private_rounds SET viewer_access_token=${result.viewerToken} WHERE id=${result.tournamentId}::uuid`;
    return{...result,kind:"private_round",privateRoundId:result.tournamentId};
  }
  if(action==="list_private_rounds"){
    await rateLimit(sql,req,"list-private-rounds",tokenHash(requestAddress(req)),120);
    const rows=await sql`SELECT id,name,mode,expires_at FROM live_private_rounds WHERE status='active' AND expires_at>now() ORDER BY updated_at DESC`;
    return{ok:true,rounds:rows.map(row=>({id:row.id,name:row.name,mode:row.mode,expiresAt:row.expires_at}))};
  }
  if(action==="join_private_round"){
    const id=cleanText(body.privateRoundId,50),code=cleanText(body.joinCode,20).toUpperCase();
    if(!UUID_PATTERN.test(id)||!/^[A-HJ-NP-Z2-9]{10}$/.test(code))throw liveError("PRIVATE_ROUND_CODE_INVALID",401);
    await rateLimit(sql,req,"private-code",tokenHash(requestAddress(req)),30);
    const rows=await sql`SELECT id,name,viewer_access_token FROM live_private_rounds WHERE id=${id}::uuid AND join_code_hash=${tokenHash(code)}::char(64) AND status='active' AND expires_at>now() LIMIT 1`;
    if(!rows.length||!rows[0].viewer_access_token)throw liveError("PRIVATE_ROUND_CODE_INVALID",401);
    const result=await joinTournament(scoped,req,body);
    await refreshPrivateRoundLifecycle(sql);
    return{...result,kind:"private_round",name:rows[0].name,viewerToken:rows[0].viewer_access_token};
  }
  if(action==="create_private_stream")return createStream(scoped,req,body);
  if(action==="join_private_round_by_id"){
    body={...body,tournamentId:body.tournamentId||body.privateRoundId};
    const policies=await sql`SELECT event_id FROM gsc_personal_events WHERE event_id=${body.tournamentId}::uuid AND event_kind='private'`;
    if(!policies.length)throw liveError('PERSONAL_EVENT_FORBIDDEN',403);
    const result=await joinTournamentById(scoped,req,body),rows=await sql`SELECT name,viewer_access_token FROM live_private_rounds WHERE id=${body.tournamentId}::uuid`;
    return{...result,kind:'private_round',name:rows[0].name,viewerToken:rows[0].viewer_access_token};
  }
  if(action==="publish_private_round"){
    const secret=authorizationSecret(req);if(!SECRET_PATTERN.test(secret))throw liveError("LIVE_PUBLISHER_UNAUTHORIZED",401);
    const eligible=await sql`SELECT stream.id FROM live_private_streams stream LEFT JOIN live_private_rounds round ON round.id=stream.tournament_id WHERE stream.publisher_secret_hash=${tokenHash(secret)}::char(64) AND (stream.tournament_id IS NULL OR (round.status='active' AND round.expires_at>now())) LIMIT 1`;
    if(!eligible.length)throw liveError("LIVE_NOT_ACTIVE",410);
    const result=await publish(scoped,req,body);await refreshPrivateRoundLifecycle(sql);return result;
  }
  if(action==="read_private_round")return readLive(scoped,req,body);
  if(action==="revoke_private_round")return revokeTournament(scoped,req);
  throw liveError("LIVE_ACTION_UNSUPPORTED",404);
}

function liveError(code,status=400){return Object.assign(new Error(code),{code,status})}
function cleanText(value,max=120){return String(value??"").trim().replace(/\s+/g," ").slice(0,max)}
function tokenHash(value){return createHash("sha256").update(String(value||"")).digest("hex")}
function newToken(){return randomBytes(32).toString("base64url")}
function newJoinCode(){
  const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",bytes=randomBytes(10);
  return Array.from(bytes,(value,index)=>alphabet[(value+index)%alphabet.length]).join("");
}
function authorizationSecret(req){
  const value=String(req?.headers?.authorization||"").trim(),match=value.match(/^LivePublisher\s+([A-Za-z0-9_-]{40,100})$/i);
  return match?.[1]||"";
}
function requestAddress(req){return cleanText(String(req?.headers?.["x-forwarded-for"]||req?.headers?.["x-real-ip"]||"unknown").split(",")[0],80)}
function groupKey(value){return cleanText(value,120).toLocaleLowerCase("es").replace(/\s+/g," ")}
function boundedInteger(value,min,max,fallback){const number=Number(value);return Number.isInteger(number)&&number>=min&&number<=max?number:fallback}
function isoDate(value,fallback=new Date().toISOString()){
  const date=new Date(value||fallback);if(!Number.isFinite(date.getTime()))throw liveError("LIVE_INVALID_DATE");return date.toISOString();
}
function safeHole(value){
  const hole=boundedInteger(value?.hole,1,18,null);if(!hole)return null;
  const explicitX=String(value?.status||"").toLowerCase()==="x"||value?.explicitX===true;
  const gross=explicitX?null:boundedInteger(value?.gross,1,30,null);
  if(!explicitX&&gross===null)return null;
  return{
    hole,
    par:boundedInteger(value?.par,3,6,null),
    strokeIndex:boundedInteger(value?.strokeIndex??value?.si,1,18,null),
    gross,
    handicapStrokes:boundedInteger(value?.handicapStrokes??value?.strokes,0,3,0),
    net:explicitX?null:boundedInteger(value?.net,-10,30,gross),
    relativeToPar:explicitX?null:boundedInteger(value?.relativeToPar??value?.diff,-20,30,null),
    stablefordPoints:boundedInteger(value?.stablefordPoints,0,20,null),
    universalesPoints:boundedInteger(value?.universalesPoints,0,6,null),
    explicitX,
    updatedAt:isoDate(value?.updatedAt)
  };
}
function safeTotals(value){
  return{
    holes:boundedInteger(value?.holes,0,18,0),
    gross:boundedInteger(value?.gross,0,540,0),
    net:boundedInteger(value?.net,-100,540,0),
    par:boundedInteger(value?.par,0,108,0),
    relativeToPar:boundedInteger(value?.relativeToPar,-108,432,0),
    stablefordPoints:boundedInteger(value?.stablefordPoints,0,360,null),
    universalesPoints:boundedInteger(value?.universalesPoints,0,108,null)
  };
}
function safePlayer(value,index){
  const id=cleanText(value?.id,80),name=cleanText(value?.name,80);
  if(!ID_PATTERN.test(id)||!name)throw liveError("LIVE_INVALID_PLAYER");
  const rawHoles=Array.isArray(value?.holes)?value.holes:[];if(rawHoles.length>18)throw liveError("LIVE_INVALID_HOLES");
  const byHole=new Map();for(const raw of rawHoles){const hole=safeHole(raw);if(hole)byHole.set(hole.hole,hole)}
  return{
    id,
    name,
    tournamentCategory:["championship","a","b","c","d","female","senior","super_senior"].includes(cleanText(value?.tournamentCategory,24))?cleanText(value.tournamentCategory,24):"",
    handicap:boundedInteger(value?.handicap,0,54,0),
    tee:cleanText(value?.tee,40)||"—",
    visualSlot:boundedInteger(value?.visualSlot,1,6,index+1),
    holes:[...byHole.values()].sort((left,right)=>left.hole-right.hole),
    totals:safeTotals(value?.totals)
  };
}

export function normalizeLiveSnapshot(value){
  if(!value||typeof value!=="object"||Array.isArray(value))throw liveError("LIVE_INVALID_SNAPSHOT");
  const rawPlayers=Array.isArray(value.players)?value.players:[];if(rawPlayers.length<1||rawPlayers.length>6)throw liveError("LIVE_INVALID_PLAYERS");
  const roundId=cleanText(value.roundId,160),players=rawPlayers.map(safePlayer);
  if(new Set(players.map(player=>player.id)).size!==players.length)throw liveError("LIVE_INVALID_PLAYERS");
  const courseHoles=(Array.isArray(value.courseHoles)?value.courseHoles:[]).slice(0,18).map((item,index)=>({hole:boundedInteger(item?.hole,1,18,index+1),par:boundedInteger(item?.par,3,6,null)})).filter(item=>item.par!==null);
  if(!ID_PATTERN.test(roundId)||players.length<1)throw liveError("LIVE_INVALID_SNAPSHOT");
  return{
    schemaVersion:1,
    appVersion:"V353",
    roundId,
    groupLabel:cleanText(value.groupLabel,120)||`GRUPO ${players[0].name}`,
    course:cleanText(value.course,120)||"CAMPO",
    courseHoles,
    tournament:cleanText(value.tournament,120)||null,
    mode:["general","match_play","four_ball","stableford","universales"].includes(value.mode)?value.mode:"general",
    status:["active","officially_closed","corrected","finished"].includes(value.status)?value.status:"active",
    playedAt:isoDate(value.playedAt),
    updatedAt:isoDate(value.updatedAt),
    officiallyClosedAt:value.officiallyClosedAt?isoDate(value.officiallyClosedAt):null,
    players
  };
}

function validateScope(snapshot,scope,selected){
  const normalizedScope=scope==="player"?"player":"group",ids=[...new Set((Array.isArray(selected)?selected:[]).map(value=>cleanText(value,80)).filter(Boolean))],available=new Set(snapshot.players.map(player=>player.id));
  if(normalizedScope==="player"&&ids.length!==1)throw liveError("LIVE_PLAYER_SCOPE_REQUIRED");
  if(normalizedScope==="group"&&(ids.length!==snapshot.players.length||ids.some(id=>!available.has(id))))throw liveError("LIVE_GROUP_CONSENT_REQUIRED");
  if(ids.some(id=>!available.has(id)))throw liveError("LIVE_INVALID_PLAYER_SCOPE");
  return{scope:normalizedScope,selectedPlayerIds:ids};
}
function validateConsent(value,selectedPlayerIds){
  if(value?.confirmed!==true)throw liveError("LIVE_CONSENT_REQUIRED");
  const consentIds=[...new Set((Array.isArray(value?.playerIds)?value.playerIds:[]).map(item=>cleanText(item,80)).filter(Boolean))];
  if(consentIds.length!==selectedPlayerIds.length||selectedPlayerIds.some(id=>!consentIds.includes(id)))throw liveError("LIVE_CONSENT_REQUIRED");
  return{confirmed:true,playerIds:consentIds,policyVersion:LIVE_POLICY_VERSION,confirmedAt:isoDate(value?.confirmedAt),authority:cleanText(value?.authority,40)||"scorekeeper"};
}
function filterSnapshot(snapshot,selectedPlayerIds){const allowed=new Set(selectedPlayerIds);return{...snapshot,players:snapshot.players.filter(player=>allowed.has(player.id))}}
function publicStream(row){return{id:row.id,scope:row.scope,groupLabel:row.group_label,status:row.status,revision:Number(row.revision)||0,expiresAt:row.expires_at,updatedAt:row.updated_at,snapshot:row.current_snapshot||null}}

async function rateLimit(sql,req,scope,secretHash,maximum){
  const key=tokenHash(`${scope}:${secretHash}:${requestAddress(req)}`),rows=await sql`
    INSERT INTO live_rate_limits (scope_key_hash, window_started_at, request_count, updated_at)
    VALUES (${key}, date_trunc('minute', now()), 1, now())
    ON CONFLICT (scope_key_hash) DO UPDATE SET
      window_started_at = CASE WHEN live_rate_limits.window_started_at < date_trunc('minute', now()) THEN date_trunc('minute', now()) ELSE live_rate_limits.window_started_at END,
      request_count = CASE WHEN live_rate_limits.window_started_at < date_trunc('minute', now()) THEN 1 ELSE live_rate_limits.request_count + 1 END,
      updated_at = now()
    RETURNING request_count
  `;
  if(Number(rows[0]?.request_count)>maximum)throw liveError("LIVE_RATE_LIMITED",429);
}

async function createStream(sql,req,body){
  const snapshot=normalizeLiveSnapshot(body.snapshot),scope=validateScope(snapshot,body.scope,body.selectedPlayerIds),consent=validateConsent(body.consent,scope.selectedPlayerIds),publisherSecret=newToken(),viewerToken=newToken(),hours=boundedInteger(body.durationHours,4,72,24),filtered=filterSnapshot(snapshot,scope.selectedPlayerIds),groupLabel=cleanText(body.groupLabel,120)||filtered.groupLabel;
  await rateLimit(sql,req,"create",tokenHash(requestAddress(req)),20);
  const rows=await sql`
    INSERT INTO live_streams (round_client_id, scope, group_label, selected_player_ids, consent, publisher_secret_hash, viewer_token_hash, current_snapshot, device_at, last_score_at, expires_at)
    VALUES (${snapshot.roundId}, ${scope.scope}, ${groupLabel}, ${JSON.stringify(scope.selectedPlayerIds)}::jsonb, ${JSON.stringify(consent)}::jsonb, ${tokenHash(publisherSecret)}, ${tokenHash(viewerToken)}, ${JSON.stringify(filtered)}::jsonb, ${snapshot.updatedAt}::timestamptz, CASE WHEN gsc_score_fingerprint(${JSON.stringify(filtered)}::jsonb)<>'[]'::jsonb THEN now() ELSE NULL END, now() + interval '24 hours')
    RETURNING id, revision, expires_at, created_at
  `;
  const row=rows[0];
  await sql`INSERT INTO live_events (stream_id, event_type, actor_hash, details) VALUES (${row.id}, 'created', ${tokenHash(publisherSecret)}, ${JSON.stringify({scope:scope.scope,policyVersion:LIVE_POLICY_VERSION})}::jsonb)`;
  return{ok:true,kind:"stream",streamId:row.id,publisherSecret,viewerToken,revision:Number(row.revision)||0,expiresAt:row.expires_at,serverAt:row.created_at};
}

async function publish(sql,req,body){
  const secret=authorizationSecret(req);if(!SECRET_PATTERN.test(secret))throw liveError("LIVE_PUBLISHER_UNAUTHORIZED",401);
  await rateLimit(sql,req,"publish",tokenHash(secret),180);
  const snapshot=normalizeLiveSnapshot(body.snapshot),mutationId=cleanText(body.clientMutationId,160),expected=boundedInteger(body.expectedRevision,0,Number.MAX_SAFE_INTEGER,null);
  if(!ID_PATTERN.test(mutationId)||expected===null)throw liveError("LIVE_INVALID_MUTATION");
  const secretHash=tokenHash(secret),snapshotJson=JSON.stringify(snapshot),rows=await sql`
    WITH candidate AS MATERIALIZED (
      SELECT *
      FROM live_streams
      WHERE publisher_secret_hash=${secretHash}::char(64)
      FOR UPDATE
    ),
    prepared AS (
      SELECT candidate.*, tournament_guard.id AS locked_tournament_id,
        visible.visible_players,
        capacity.other_players,
        jsonb_set(${snapshotJson}::jsonb, '{players}', visible.visible_players, true) AS filtered_snapshot
      FROM candidate
      LEFT JOIN LATERAL (
        SELECT tournament.id
        FROM live_tournaments AS tournament
        WHERE tournament.id=candidate.tournament_id
        FOR UPDATE
      ) AS tournament_guard ON true
      CROSS JOIN LATERAL (
        SELECT coalesce(jsonb_agg(listed.player ORDER BY listed.ordinal), '[]'::jsonb) AS visible_players
        FROM jsonb_array_elements(coalesce(${snapshotJson}::jsonb->'players', '[]'::jsonb)) WITH ORDINALITY AS listed(player,ordinal)
        WHERE candidate.selected_player_ids ? (listed.player->>'id')
      ) AS visible
      CROSS JOIN LATERAL (
        SELECT coalesce(sum(jsonb_array_length(coalesce(other.current_snapshot->'players','[]'::jsonb))),0)::integer AS other_players
        FROM live_streams AS other
        WHERE other.tournament_id=candidate.tournament_id AND other.id<>candidate.id
          AND other.status='active' AND other.expires_at>now()
      ) AS capacity
    ),
    decision AS (
      SELECT prepared.*,
        CASE
          WHEN status<>'active' OR expires_at<=now() THEN 'LIVE_NOT_ACTIVE'
          WHEN last_mutation_id=${mutationId}::text THEN 'DUPLICATE'
          WHEN revision<>${expected}::bigint THEN 'LIVE_REVISION_CONFLICT'
          WHEN jsonb_array_length(visible_players)<>jsonb_array_length(selected_player_ids) THEN 'LIVE_PLAYER_SCOPE_MISMATCH'
          WHEN tournament_id IS NOT NULL AND other_players+jsonb_array_length(visible_players)>${MAX_TOURNAMENT_PLAYERS} THEN 'LIVE_TOURNAMENT_CAPACITY_REACHED'
          ELSE 'APPLY'
        END AS outcome_code
      FROM prepared
    ),
    updated AS (
      UPDATE live_streams AS stream
      SET current_snapshot=decision.filtered_snapshot,
          last_score_at=CASE WHEN gsc_score_fingerprint(decision.filtered_snapshot)<>'[]'::jsonb AND gsc_score_fingerprint(decision.filtered_snapshot) IS DISTINCT FROM gsc_score_fingerprint(decision.current_snapshot) THEN now() ELSE decision.last_score_at END,
          revision=decision.revision+1,
          last_mutation_id=${mutationId}::text,
          last_mutation_result=jsonb_build_object(
            'accepted',true,
            'duplicate',false,
            'revision',decision.revision+1,
            'streamId',decision.id,
            'serverAt',now()
          ),
          device_at=${snapshot.updatedAt}::timestamptz,
          updated_at=now()
      FROM decision
      WHERE stream.id=decision.id AND decision.outcome_code='APPLY'
      RETURNING stream.id,stream.tournament_id,stream.revision,stream.last_score_at,stream.last_mutation_result AS result
    ),
    tournament_bump AS (
      UPDATE live_tournaments AS tournament
      SET revision=tournament.revision+1,updated_at=now(),last_score_at=greatest(tournament.last_score_at,updated.last_score_at)
      FROM updated
      WHERE tournament.id=updated.tournament_id AND tournament.status='active'
      RETURNING tournament.id
    ),
    event_log AS (
      INSERT INTO live_events (stream_id,tournament_id,event_type,actor_hash,details)
      SELECT updated.id,updated.tournament_id,'published',${secretHash}::char(64),jsonb_build_object('revision',updated.revision,'mutationId',${mutationId}::text)
      FROM updated
      RETURNING id
    ),
    effects AS (
      SELECT (SELECT count(*) FROM tournament_bump)+(SELECT count(*) FROM event_log) AS completed
    )
    SELECT coalesce(
      (SELECT result FROM updated),
      (SELECT CASE
        WHEN outcome_code='DUPLICATE' THEN coalesce(last_mutation_result,jsonb_build_object('accepted',true,'revision',revision,'streamId',id,'serverAt',now()))||jsonb_build_object('duplicate',true)
        ELSE jsonb_build_object('accepted',false,'code',outcome_code,'revision',revision)
      END FROM decision),
      jsonb_build_object('accepted',false,'code','LIVE_PUBLISHER_UNAUTHORIZED')
    ) AS applied
    FROM effects
  `,applied=rows[0]?.applied||{};
  if(!applied.accepted)throw liveError(String(applied.code||"LIVE_PUBLISH_FAILED"),applied.code==="LIVE_PUBLISHER_UNAUTHORIZED"?401:["LIVE_REVISION_CONFLICT","LIVE_TOURNAMENT_CAPACITY_REACHED"].includes(applied.code)?409:410);
  return{ok:true,...applied};
}

async function revokeStream(sql,req){
  const secret=authorizationSecret(req);if(!SECRET_PATTERN.test(secret))throw liveError("LIVE_PUBLISHER_UNAUTHORIZED",401);
  await rateLimit(sql,req,"control",tokenHash(secret),30);
  const rows=await sql`
    UPDATE live_streams SET status='revoked', current_snapshot=NULL, revoked_at=now(), updated_at=now()
    WHERE publisher_secret_hash=${tokenHash(secret)} AND status='active'
    RETURNING id, tournament_id
  `;
  if(!rows.length)throw liveError("LIVE_NOT_ACTIVE",410);
  await sql`INSERT INTO live_events (stream_id, tournament_id, event_type, actor_hash) VALUES (${rows[0].id}, ${rows[0].tournament_id}, 'revoked', ${tokenHash(secret)})`;
  return{ok:true,revoked:true};
}

async function createTournament(sql,req,body){
  const name=cleanText(body.name,120);if(!name)throw liveError("LIVE_TOURNAMENT_NAME_REQUIRED");
  const mode=["general","match_play","four_ball","stableford","universales"].includes(body.mode)?body.mode:"general";
  if(body?.consent?.confirmed!==true)throw liveError("LIVE_CONSENT_REQUIRED");
  await rateLimit(sql,req,"create-tournament",tokenHash(requestAddress(req)),10);
  const organizerSecret=newToken(),viewerToken=newToken(),joinCode=newJoinCode(),days=boundedInteger(body.durationDays,1,8,2),rows=await sql`
    INSERT INTO live_tournaments (name, mode, organizer_secret_hash, viewer_token_hash, join_code_hash, expires_at)
    VALUES (${name}, ${mode}, ${tokenHash(organizerSecret)}, ${tokenHash(viewerToken)}, ${tokenHash(joinCode)}, now() + interval '24 hours')
    RETURNING id, revision, expires_at, created_at
  `,row=rows[0];
  await sql`INSERT INTO live_events (tournament_id, event_type, actor_hash, details) VALUES (${row.id}, 'created', ${tokenHash(organizerSecret)}, ${JSON.stringify({policyVersion:LIVE_POLICY_VERSION})}::jsonb)`;
  return{ok:true,kind:"tournament",tournamentId:row.id,name,mode,organizerSecret,viewerToken,joinCode,revision:Number(row.revision)||0,expiresAt:row.expires_at,serverAt:row.created_at};
}

async function listActiveTournaments(sql,req){
  await rateLimit(sql,req,"list-active-tournaments",tokenHash(requestAddress(req)),120);
  const rows=await sql`
    SELECT id,name,mode,expires_at,updated_at
    FROM live_tournaments
    WHERE status='active' AND expires_at>now()
    ORDER BY updated_at DESC
    LIMIT 50
  `;
  return{ok:true,kind:"active_tournaments",tournaments:rows.map(row=>({id:row.id,name:row.name,mode:row.mode,expiresAt:row.expires_at,updatedAt:row.updated_at})),serverAt:new Date().toISOString()};
}

async function joinTournamentById(sql,req,body){
  const secret=authorizationSecret(req),tournamentId=cleanText(body.tournamentId,50),groupLabel=cleanText(body.groupLabel,120);
  if(!SECRET_PATTERN.test(secret)||!UUID_PATTERN.test(tournamentId))throw liveError("LIVE_JOIN_UNAUTHORIZED",401);
  if(!groupLabel)throw liveError("LIVE_GROUP_LABEL_REQUIRED");
  await rateLimit(sql,req,"join",tokenHash(secret),30);
  const secretHash=tokenHash(secret),rows=await sql`
    WITH tournament AS MATERIALIZED (
      SELECT id,mode FROM live_tournaments
      WHERE id=${tournamentId}::uuid AND status='active' AND expires_at>now()
      LIMIT 1 FOR UPDATE
    ),
    candidate AS MATERIALIZED (
      SELECT id,current_snapshot,tournament_id FROM live_streams
      WHERE publisher_secret_hash=${secretHash}::char(64)
      LIMIT 1 FOR UPDATE
    ),
    decision AS MATERIALIZED (
      SELECT tournament.id AS tournament_id,candidate.id AS stream_id,
        CASE
          WHEN tournament.id IS NULL THEN 'LIVE_TOURNAMENT_NOT_ACTIVE'
          WHEN candidate.id IS NULL OR NOT EXISTS (SELECT 1 FROM live_streams active WHERE active.id=candidate.id AND active.status='active' AND active.expires_at>now()) THEN 'LIVE_NOT_ACTIVE'
          WHEN candidate.tournament_id=tournament.id THEN 'ALREADY_JOINED'
          WHEN coalesce(candidate.current_snapshot->>'mode','general')<>tournament.mode THEN 'LIVE_TOURNAMENT_MODE_MISMATCH'
          WHEN (SELECT coalesce(sum(jsonb_array_length(coalesce(active.current_snapshot->'players','[]'::jsonb))),0) FROM live_streams active WHERE active.tournament_id=tournament.id AND active.id<>candidate.id AND active.status='active' AND active.expires_at>now())+jsonb_array_length(coalesce(candidate.current_snapshot->'players','[]'::jsonb))>${MAX_TOURNAMENT_PLAYERS} THEN 'LIVE_TOURNAMENT_CAPACITY_REACHED'
          ELSE 'APPLY'
        END AS outcome_code
      FROM (VALUES (1)) seed(one) LEFT JOIN tournament ON true LEFT JOIN candidate ON true
    ),
    updated AS (
      UPDATE live_streams stream SET tournament_id=decision.tournament_id,group_label=${groupLabel}::text,updated_at=now()
      FROM decision WHERE stream.id=decision.stream_id AND decision.outcome_code='APPLY'
      RETURNING stream.id,stream.tournament_id,stream.group_label
    ),
    tournament_bump AS (
      UPDATE live_tournaments tournament SET revision=tournament.revision+1,updated_at=now()
      FROM updated WHERE tournament.id=updated.tournament_id RETURNING tournament.id
    ),
    event_log AS (
      INSERT INTO live_events (stream_id,tournament_id,event_type,actor_hash,details)
      SELECT updated.id,updated.tournament_id,'joined_tournament',${secretHash}::char(64),jsonb_build_object('groupLabel',updated.group_label)
      FROM updated RETURNING id
    )
    SELECT coalesce(
      (SELECT jsonb_build_object('applied',true,'streamId',id,'tournamentId',tournament_id,'groupLabel',group_label) FROM updated),
      (SELECT jsonb_build_object('applied',outcome_code='ALREADY_JOINED','alreadyJoined',outcome_code='ALREADY_JOINED','streamId',stream_id,'tournamentId',tournament_id,'groupLabel',${groupLabel}::text,'code',outcome_code) FROM decision)
    ) AS applied
  `,applied=rows[0]?.applied||{};
  if(!applied.applied){const code=String(applied.code||"LIVE_JOIN_FAILED");throw liveError(code,["LIVE_TOURNAMENT_CAPACITY_REACHED","LIVE_TOURNAMENT_MODE_MISMATCH"].includes(code)?409:["LIVE_NOT_ACTIVE","LIVE_TOURNAMENT_NOT_ACTIVE"].includes(code)?410:400)}
  return{ok:true,joined:true,alreadyJoined:!!applied.alreadyJoined,tournamentId:applied.tournamentId,groupLabel:applied.groupLabel};
}

async function joinTournament(sql,req,body){
  const secret=authorizationSecret(req),joinCode=cleanText(body.joinCode,20).toUpperCase(),groupLabel=cleanText(body.groupLabel,120);
  if(!SECRET_PATTERN.test(secret)||joinCode.length!==10)throw liveError("LIVE_JOIN_UNAUTHORIZED",401);
  if(!groupLabel)throw liveError("LIVE_GROUP_LABEL_REQUIRED");
  await rateLimit(sql,req,"join",tokenHash(secret),30);
  const secretHash=tokenHash(secret),rows=await sql`
    WITH tournament AS MATERIALIZED (
      SELECT id,mode
      FROM live_tournaments
      WHERE join_code_hash=${tokenHash(joinCode)}::char(64) AND status='active' AND expires_at>now()
      LIMIT 1
      FOR UPDATE
    ),
    candidate AS MATERIALIZED (
      SELECT id,group_label,current_snapshot
      FROM live_streams
      WHERE publisher_secret_hash=${secretHash}::char(64)
      LIMIT 1
      FOR UPDATE
    ),
    decision AS MATERIALIZED (
      SELECT tournament.id AS tournament_id,candidate.id AS stream_id,
        CASE
          WHEN tournament.id IS NULL THEN 'LIVE_JOIN_CODE_INVALID'
          WHEN candidate.id IS NULL OR NOT EXISTS (
            SELECT 1 FROM live_streams active WHERE active.id=candidate.id AND active.status='active' AND active.expires_at>now()
          ) THEN 'LIVE_NOT_ACTIVE'
          WHEN coalesce(candidate.current_snapshot->>'mode','general')<>tournament.mode THEN 'LIVE_TOURNAMENT_MODE_MISMATCH'
          WHEN (
            SELECT coalesce(sum(jsonb_array_length(coalesce(active.current_snapshot->'players','[]'::jsonb))),0)
            FROM live_streams active
            WHERE active.tournament_id=tournament.id AND active.id<>candidate.id
              AND active.status='active' AND active.expires_at>now()
          )+jsonb_array_length(coalesce(candidate.current_snapshot->'players','[]'::jsonb))>${MAX_TOURNAMENT_PLAYERS} THEN 'LIVE_TOURNAMENT_CAPACITY_REACHED'
          ELSE 'APPLY'
        END AS outcome_code
      FROM (VALUES (1)) AS seed(one)
      LEFT JOIN tournament ON true
      LEFT JOIN candidate ON true
    ),
    updated AS (
      UPDATE live_streams AS stream
      SET tournament_id=decision.tournament_id,group_label=${groupLabel}::text,updated_at=now()
      FROM decision
      WHERE stream.id=decision.stream_id AND decision.outcome_code='APPLY'
      RETURNING stream.id,stream.tournament_id,stream.group_label
    ),
    tournament_bump AS (
      UPDATE live_tournaments AS tournament
      SET revision=tournament.revision+1,updated_at=now()
      FROM updated
      WHERE tournament.id=updated.tournament_id
      RETURNING tournament.id
    ),
    event_log AS (
      INSERT INTO live_events (stream_id,tournament_id,event_type,actor_hash,details)
      SELECT updated.id,updated.tournament_id,'joined_tournament',${secretHash}::char(64),jsonb_build_object('groupLabel',updated.group_label)
      FROM updated
      RETURNING id
    ),
    effects AS (
      SELECT (SELECT count(*) FROM tournament_bump)+(SELECT count(*) FROM event_log) AS completed
    )
    SELECT coalesce(
      (SELECT jsonb_build_object('applied',true,'streamId',id,'tournamentId',tournament_id,'groupLabel',group_label) FROM updated),
      (SELECT jsonb_build_object('applied',false,'code',outcome_code) FROM decision)
    ) AS applied
    FROM effects
  `,applied=rows[0]?.applied||{};
  if(!applied.applied){const code=String(applied.code||"LIVE_JOIN_FAILED");throw liveError(code,code==="LIVE_JOIN_CODE_INVALID"?404:["LIVE_TOURNAMENT_CAPACITY_REACHED","LIVE_TOURNAMENT_MODE_MISMATCH"].includes(code)?409:code==="LIVE_NOT_ACTIVE"?410:400)}
  return{ok:true,joined:true,tournamentId:applied.tournamentId,groupLabel:applied.groupLabel};
}

async function leaveTournament(sql,req){
  const secret=authorizationSecret(req);if(!SECRET_PATTERN.test(secret))throw liveError("LIVE_PUBLISHER_UNAUTHORIZED",401);
  const rows=await sql`UPDATE live_streams SET tournament_id=NULL,updated_at=now() WHERE publisher_secret_hash=${tokenHash(secret)} AND tournament_id IS NOT NULL RETURNING id,tournament_id`;
  if(!rows.length)return{ok:true,left:false};
  await sql`UPDATE live_tournaments SET revision=revision+1,updated_at=now() WHERE id=${rows[0].tournament_id}`;
  await sql`INSERT INTO live_events (stream_id, tournament_id, event_type, actor_hash) VALUES (${rows[0].id}, ${rows[0].tournament_id}, 'left_tournament', ${tokenHash(secret)})`;
  return{ok:true,left:true};
}

async function revokeTournament(sql,req){
  const secret=authorizationSecret(req);if(!SECRET_PATTERN.test(secret))throw liveError("LIVE_ORGANIZER_UNAUTHORIZED",401);
  const rows=await sql`UPDATE live_tournaments SET status='revoked',revoked_at=now(),updated_at=now() WHERE organizer_secret_hash=${tokenHash(secret)} AND status='active' RETURNING id`;
  if(!rows.length)throw liveError("LIVE_TOURNAMENT_NOT_ACTIVE",410);
  await sql`UPDATE live_streams SET tournament_id=NULL,updated_at=now() WHERE tournament_id=${rows[0].id}`;
  await sql`INSERT INTO live_events (tournament_id, event_type, actor_hash) VALUES (${rows[0].id}, 'revoked', ${tokenHash(secret)})`;
  return{ok:true,revoked:true};
}

async function readStream(sql,req,body,viewerToken){
  const hash=tokenHash(viewerToken);await rateLimit(sql,req,"read-stream",hash,240);
  const rows=await sql`SELECT id,scope,group_label,status,revision,expires_at,updated_at,current_snapshot FROM live_streams WHERE viewer_token_hash=${hash} LIMIT 1`;
  if(!rows.length)throw liveError("LIVE_LINK_INVALID",404);const row=rows[0];
  if(row.status==="revoked")throw liveError("LIVE_REVOKED",410);if(new Date(row.expires_at)<=new Date())throw liveError("LIVE_EXPIRED",410);
  if(body.sinceRevision!==null&&body.sinceRevision!==undefined&&Number(body.sinceRevision)===Number(row.revision))return{ok:true,kind:"stream",unchanged:true,revision:Number(row.revision),serverAt:new Date().toISOString()};
  return{ok:true,kind:"stream",stream:publicStream(row),serverAt:new Date().toISOString()};
}

async function readTournament(sql,req,body,viewerToken){
  const hash=tokenHash(viewerToken);await rateLimit(sql,req,"read-tournament",hash,240);
  const tournaments=await sql`SELECT id,name,mode,status,revision,expires_at,updated_at FROM live_tournaments WHERE viewer_token_hash=${hash} LIMIT 1`;
  if(!tournaments.length)throw liveError("LIVE_LINK_INVALID",404);const tournament=tournaments[0];
  if(tournament.status==="revoked")throw liveError("LIVE_REVOKED",410);if(new Date(tournament.expires_at)<=new Date())throw liveError("LIVE_EXPIRED",410);
  const cursor=cleanText(body.cursor,50);if(cursor&&!UUID_PATTERN.test(cursor))throw liveError("LIVE_INVALID_CURSOR");
  if(!cursor&&body.sinceRevision!==null&&body.sinceRevision!==undefined&&Number(body.sinceRevision)===Number(tournament.revision))return{ok:true,kind:"tournament",unchanged:true,revision:Number(tournament.revision),serverAt:new Date().toISOString()};
  const limit=boundedInteger(body.limit,1,50,25),rows=await sql`
    SELECT id,scope,group_label,status,revision,expires_at,updated_at,current_snapshot
    FROM live_streams
    WHERE tournament_id=${tournament.id} AND status='active' AND expires_at>now()
      AND (${cursor||null}::uuid IS NULL OR id>${cursor||null}::uuid)
    ORDER BY id ASC
    LIMIT ${limit+1}
  `,hasMore=rows.length>limit,page=rows.slice(0,limit);
  return{ok:true,kind:"tournament",tournament:{id:tournament.id,name:tournament.name,mode:tournament.mode,status:tournament.status,revision:Number(tournament.revision),expiresAt:tournament.expires_at,updatedAt:tournament.updated_at},streams:page.map(publicStream),nextCursor:hasMore?page.at(-1)?.id:null,serverAt:new Date().toISOString()};
}

async function readLive(sql,req,body){
  const viewerToken=cleanText(body.viewerToken,100);if(!TOKEN_PATTERN.test(viewerToken))throw liveError("LIVE_LINK_INVALID",404);
  return body.kind==="tournament"?readTournament(sql,req,body,viewerToken):readStream(sql,req,body,viewerToken);
}

// Dependency injection is module-only for isolated integration tests. HTTP clients
// cannot choose a database; the deployed handler always uses getDatabase.
export async function handleLive(req,res,databaseGetter=getDatabase,accountResolver=requireAccountSession){
  noStore(res);res.setHeader("X-Content-Type-Options","nosniff");res.setHeader("Referrer-Policy","no-referrer");
  if(handleAppPreflight(req,res))return;
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"})}
  try{
    const body=await readJson(req,600_000),action=cleanText(body.action,40).toLowerCase();
    const privateAction=["create_private_round","list_private_rounds","join_private_round","join_private_round_by_id","create_private_stream","publish_private_round","read_private_round","revoke_private_round"].includes(action);
    if((CONTROL_ACTIONS.has(action)||privateAction)&&!isAllowedAppOrigin(req))throw liveError("ORIGIN_NOT_ALLOWED",403);
    let sql;
    try{sql=databaseGetter()}catch(error){
      if(String(error?.code||"")==="DATABASE_NOT_CONFIGURED")return await proxyLiveToProduction(req,res);
      throw error;
    }
    await ensureEventLifecycle(sql);
    if(action==='create_tournament'){let account;try{account=await accountResolver(req)}catch(error){account=await readDeviceEventIdentity(req,sql);if(!account)throw liveError('TOURNAMENT_ORGANIZER_REQUIRED',403)}await tournamentOrganizer(sql,req,account)}
    const personalEnabled=personalAccessEnabled()||accountResolver!==requireAccountSession;
    if(personalEnabled){await ensurePersonalAccess(sql);await refreshEventLifecycles(sql);const context=await guardPersonalLive(sql,req,body,accountResolver);sql=personalPublishingSql(sql,context)}
    const result=privateAction?await privateRoundAction(sql,req,body,action):action==="create_stream"?await createStream(sql,req,body):action==="publish"?await publish(sql,req,body):action==="revoke_stream"?await revokeStream(sql,req):action==="create_tournament"?await createTournament(sql,req,body):action==="join_tournament"?await joinTournament(sql,req,body):action==="join_tournament_by_id"?await joinTournamentById(sql,req,body):action==="leave_tournament"?await leaveTournament(sql,req):action==="revoke_tournament"?await revokeTournament(sql,req):action==="list_active_tournaments"?await listActiveTournaments(sql,req):action==="read"?await readLive(sql,req,body):null;
    if(personalEnabled&&result&&(action==='list_active_tournaments'||action==='list_private_rounds')){
      let account=null;try{account=await accountResolver(req)}catch{}
      const kind=action==='list_private_rounds'?'private':'tournament',policies=await sql`SELECT e.event_id,m.account_id FROM gsc_personal_events e LEFT JOIN gsc_personal_members m ON m.event_id=e.event_id AND m.event_kind=e.event_kind AND m.account_id=${account?.id||''} AND m.revoked_at IS NULL WHERE e.event_kind=${kind}`;
      const forbidden=new Set(policies.filter(p=>!p.account_id).map(p=>p.event_id)),key=action==='list_private_rounds'?'rounds':'tournaments';result[key]=result[key].filter(event=>!forbidden.has(event.id));
    }
    if(result&&(action==='publish'||action==='publish_private_round'))await refreshEventLifecycles(sql);
    if(!result)throw liveError("LIVE_ACTION_UNSUPPORTED",404);
    return res.status(200).json(result);
  }catch(error){
    const code=String(error?.code||"LIVE_REQUEST_FAILED"),status=Number(error?.status)||(["DATABASE_NOT_CONFIGURED","DATABASE_MIGRATION_REQUIRED"].includes(code)||String(error?.message||"").includes("does not exist")?503:400);
    if(status>=500)console.error("live",code);
    if(status===429)res.setHeader("Retry-After","60");
    return res.status(status).json({ok:false,code});
  }
}

export default async function handler(req,res){return handleLive(req,res)}

export { LIVE_POLICY_VERSION, TOKEN_PATTERN, ID_PATTERN, filterSnapshot, validateScope, validateConsent, newJoinCode, tokenHash, groupKey };
