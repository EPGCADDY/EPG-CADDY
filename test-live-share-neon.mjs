// Explicit candidate branch only; never uses DATABASE_URL or the default branch.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import {neon} from '@neondatabase/serverless';
import {ensureLiveShares,createLiveShare,redeemLiveShare,readLiveShare,revokeLiveShare,shareCookie} from './api/_lib/live-share.js';
const url=readFileSync('/tmp/gsc-r144-candidate-database-url','utf8').trim();
assert.ok(['ep-fragrant-pine-av6xi8hy.c-11.us-east-1.aws.neon.tech','ep-fragrant-pine-av6xi8hy-pooler.c-11.us-east-1.aws.neon.tech'].includes(new URL(url).hostname),'Candidate endpoint must match branch br-small-mouse-av0f24o9');
const sql=neon(url),hash=v=>createHash('sha256').update(v).digest('hex');
await ensureLiveShares(sql);
await sql`CREATE TABLE IF NOT EXISTS live_private_rounds (LIKE live_tournaments INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES, viewer_access_token text)`;
await sql`CREATE TABLE IF NOT EXISTS live_private_streams (LIKE live_streams INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)`;
const eventId=randomUUID(),streamId=randomUUID(),secret=randomBytes(32).toString('base64url'),req={headers:{authorization:'LivePublisher '+secret}};
await sql`INSERT INTO live_tournaments(id,name,organizer_secret_hash,viewer_token_hash,join_code_hash,expires_at) VALUES(${eventId}::uuid,'R144 NEON TEST',${hash(randomUUID())},${hash(randomUUID())},${hash(randomUUID())},now()+interval '1 hour')`;
await sql`INSERT INTO live_streams(id,round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,expires_at,current_snapshot) VALUES(${streamId}::uuid,${'r144-'+randomUUID()},'group','TEST',${'{}'}::jsonb,${hash(secret)},${hash(randomUUID())},${eventId}::uuid,now()+interval '1 hour',${JSON.stringify({players:[{id:'fixture-p1',name:'PRUEBA R144',holes:[]}]})}::jsonb)`;
await assert.rejects(createLiveShare(sql,{headers:{}},{eventId,eventKind:'tournament'}),/PLAYER_REQUIRED/);
const issued=await createLiveShare(sql,req,{eventId,eventKind:'tournament'});
// Separate Neon HTTP requests race on PostgreSQL's real row lock.
const results=await Promise.allSettled(Array.from({length:8},()=>redeemLiveShare(neon(url),{eventId,eventKind:'tournament',code:issued.code})));
assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
assert.equal(results.filter(r=>r.status==='rejected').length,7);
assert.ok(results.filter(r=>r.status==='rejected').every(r=>r.reason.code==='LIVE_SHARE_CODE_INVALID_OR_USED'));
const token=results.find(r=>r.status==='fulfilled').value.token,viewer={headers:{cookie:shareCookie(eventId,token)}};
assert.equal((await readLiveShare(sql,viewer,{eventId,eventKind:'tournament'})).streams.length,1);
await assert.rejects(createLiveShare(sql,viewer,{eventId,eventKind:'tournament'}),/PLAYER_REQUIRED/);
await revokeLiveShare(sql,req,{eventId,eventKind:'tournament',shareId:issued.shareId});
await assert.rejects(readLiveShare(sql,viewer,{eventId,eventKind:'tournament'}),/SESSION_REQUIRED/);
await sql`INSERT INTO live_private_rounds(id,name,organizer_secret_hash,viewer_token_hash,join_code_hash,expires_at) VALUES(${eventId}::uuid,'R144 PRIVATE TEST',${hash(randomUUID())},${hash(randomUUID())},${hash(randomUUID())},now()+interval '1 hour')`;
await sql`INSERT INTO live_private_streams(id,round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,expires_at,current_snapshot) VALUES(${streamId}::uuid,${'r144-'+randomUUID()},'group','TEST',${'{}'}::jsonb,${hash(secret)},${hash(randomUUID())},${eventId}::uuid,now()+interval '1 hour',${JSON.stringify({players:[{id:'fixture-p1',name:'PRUEBA PRIVADA',holes:[]}]})}::jsonb)`;
const privateIssued=await createLiveShare(sql,req,{eventId,eventKind:'private'}),session=await redeemLiveShare(sql,{eventId,eventKind:'private',code:privateIssued.code});
const privateViewer={headers:{cookie:shareCookie(eventId,session.token)}};
assert.equal((await readLiveShare(sql,privateViewer,{eventId,eventKind:'private'})).streams.length,1);
await assert.rejects(readLiveShare(sql,privateViewer,{eventId,eventKind:'tournament'}),/SESSION_REQUIRED/);
await revokeLiveShare(sql,req,{eventId,eventKind:'private',shareId:privateIssued.shareId});
// Retain expired synthetic evidence in candidate branch only; no destructive cleanup.
await sql`UPDATE live_tournaments SET status='revoked' WHERE id=${eventId}::uuid`;
await sql`UPDATE live_private_rounds SET status='revoked' WHERE id=${eventId}::uuid`;
console.log('PASS Neon candidate br-small-mouse-av0f24o9: eight simultaneous requests, one consumption/session, seven used-code rejections; enrolled publisher, read-only session, revocation and private/tournament isolation. No production writes.');
