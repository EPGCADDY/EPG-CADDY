import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handleLive} from './api/live.js';

// The deployed handler and SQL migrations run unchanged against a disposable DB.
// This is API integration evidence, not evidence of a signed-in browser session.
const db=new PGlite();
await db.exec(await readFile('database/004_live_scorecards.sql','utf8'));
await db.exec(await readFile('database/005_live_tournament_mode.sql','utf8'));
const sql=async(strings,...values)=>(await db.query(strings.reduce((q,s,i)=>q+(i?'$'+i:'')+s,''),values)).rows;
async function call(body,secret='',origin='http://localhost:8877'){
  let status=200,result;
  const req={method:'POST',headers:{host:'localhost:8877',origin,authorization:secret?`LivePublisher ${secret}`:''},body};
  const res={setHeader(){},status(n){status=n;return this},json(value){result=value;return this}};
  await handleLive(req,res,()=>sql);
  return {status,...result};
}
const snapshot={roundId:'official-test-round',mode:'general',course:'CAMPO LAB',groupLabel:'GRUPO LAB',updatedAt:new Date().toISOString(),players:[{id:'p1',name:'UNO',holes:[{hole:1,par:4,gross:5,net:4}]}]};
const consent={confirmed:true,playerIds:['p1']};
const tournament=await call({action:'create_tournament',name:'TORNEO INTEGRACIÓN',mode:'general',consent});
assert.equal(tournament.status,200);
const stream=await call({action:'create_stream',snapshot,scope:'player',selectedPlayerIds:['p1'],consent});
assert.equal(stream.status,200);
const badJoin=await call({action:'join_tournament',joinCode:'ABCDEFGHIJ',groupLabel:'GRUPO LAB'},stream.publisherSecret);
assert.equal(badJoin.code,'LIVE_JOIN_CODE_INVALID');
const joined=await call({action:'join_tournament',joinCode:tournament.joinCode,groupLabel:'GRUPO LAB'},stream.publisherSecret);
assert.equal(joined.status,200);
assert.equal((await call({action:'publish',snapshot,clientMutationId:'guest-write',expectedRevision:0},tournament.viewerToken)).status,401,'A reader token never becomes a writer');
assert.equal((await call({action:'publish',snapshot,clientMutationId:'cross-origin',expectedRevision:0},stream.publisherSecret,'https://untrusted.example')).status,403);
const first=await call({action:'publish',snapshot,clientMutationId:'write-1',expectedRevision:0},stream.publisherSecret);
assert.equal(first.revision,1);
const retry=await call({action:'publish',snapshot,clientMutationId:'write-1',expectedRevision:0},stream.publisherSecret);
assert.equal(retry.duplicate,true);
snapshot.players[0].holes[0].gross=4;
const stale=await call({action:'publish',snapshot,clientMutationId:'write-stale',expectedRevision:0},stream.publisherSecret);
assert.equal(stale.code,'LIVE_REVISION_CONFLICT');
const correction=await call({action:'publish',snapshot,clientMutationId:'write-2',expectedRevision:1},stream.publisherSecret);
assert.equal(correction.revision,2);
const read=await call({action:'read',kind:'tournament',viewerToken:tournament.viewerToken});
assert.equal(read.streams[0].snapshot.players[0].holes[0].gross,4);
assert.equal(read.streams[0].revision,2);
const events=await db.query("SELECT details FROM live_events WHERE stream_id=$1 AND event_type='published' ORDER BY id",[stream.streamId]);
assert.deepEqual(events.rows.map(row=>row.details.mutationId),['write-1','write-2']);
const revoked=await call({action:'revoke_tournament'},tournament.organizerSecret);
assert.equal(revoked.status,200);
assert.equal((await call({action:'read',kind:'tournament',viewerToken:tournament.viewerToken})).code,'LIVE_REVOKED');
await db.close();
console.log('PASS official LIVE API: creation, valid/invalid enrollment, reader denied, origin denied, publish, retry, conflict, correction, persisted scores, event history, revocation. Isolated PGlite only.');
