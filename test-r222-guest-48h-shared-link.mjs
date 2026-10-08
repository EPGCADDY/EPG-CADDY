import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {createGrant,redeemGuestToken,validateGuestToken,purgeExpiredAccess,recordGuestFeedback,ownerFeedback} from './api/_lib/app-access.js';

const db=new PGlite();
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;

const grant=await createGrant({id:'owner-fire-test'},{hours:48,maxUses:5},sql);
assert.equal(grant.maxUses,5,'Shared fire-test link must be capped to five openings');
assert.match(grant.token,/^[A-Za-z0-9_-]{43}$/,'Invite token must remain URL safe');
const expiresInHours=(new Date(grant.expiresAt).getTime()-Date.now())/36e5;
assert(expiresInHours>47.5&&expiresInHours<=48.1,'Shared fire-test link must expire in 48 hours');

for(let index=1;index<=5;index++){
  const redeemed=await redeemGuestToken(grant.token,sql);
  assert.equal(redeemed.useCount,index,`Redeem ${index} must consume one shared opening`);
  assert.equal(redeemed.maxUses,5);
}
assert.equal(await redeemGuestToken(grant.token,sql),null,'Sixth independent opening must be blocked');
const activeInDb=await validateGuestToken(grant.token,{touch:false,sql});
assert.equal(activeInDb.useCount,5,'Existing redeemed sessions remain valid until the 48h expiration');
const saved=await recordGuestFeedback(grant.token,{modality:'general',playerCount:4,holesUsed:3,annotationsCount:12,snapshot:{groupLabel:'Grupo Jaime 1',course:'El Pulte',mode:'general',players:[{id:'p1',name:'Jaime',holes:[{hole:1,gross:4,net:4,par:4}],totals:{holes:1,gross:4,net:4,relativeToPar:0}}]}},sql);
assert.equal(saved,true,'Guest group must publish its score-card snapshot to the owner report');
const report=await ownerFeedback({id:'owner-fire-test'},sql);
assert.equal(report[0].current_snapshot.groupLabel,'Grupo Jaime 1','Owner report must show each guest group independently');
assert.equal(report[0].current_snapshot.players[0].name,'Jaime','Owner report must include the group score-card players');
assert.equal(report[0].use_count,5,'Telemetry must not consume additional shared-link openings');

await sql`UPDATE app_access_grants SET expires_at=now()-interval '1 second' WHERE id=${grant.id}::uuid`;
await purgeExpiredAccess(sql);
const remaining=await sql`SELECT id FROM app_access_grants WHERE id=${grant.id}::uuid`;
assert.equal(remaining.length,0,'Expired shared fire-test link must be auto-deleted by cleanup');
await db.close();

console.log('PASS R222 guest access: one shared 48h link, five controlled openings, expired grant auto-deletes.');
