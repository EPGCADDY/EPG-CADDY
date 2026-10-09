import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {createGrant,deleteGrant,redeemGuestToken,recordGuestFeedback,ownerFeedback} from './api/_lib/app-access.js';

const ui=await readFile('event-administration-ui.js','utf8');
const adminApi=await readFile('api/event-administration.js','utf8');
const appAccess=await readFile('api/_lib/app-access.js','utf8');
const build=await readFile('scripts/build-manual-lab.mjs','utf8');

assert.match(ui,/data-guest-group-delete/,'Each 48h guest card must expose a delete button');
assert.match(ui,/ELIMINAR 48H/,'The 48h delete button must use the red destructive label');
assert.match(ui,/class="danger" data-guest-group-delete/,'The 48h delete button must use the same red danger styling as tournament delete');
assert.match(ui,/function removeGuestGroup\(group\)/,'Organizer must confirm deletion of a 48h invitation');
assert.match(ui,/delete-guest48h/,'Local 48h deletion must call the backend delete action');
assert.match(ui,/remote-delete-guest48h/,'Cross-environment 48h deletion must relay to the peer environment');
assert.match(adminApi,/delete-peer-guest48h/,'Peer API must expose an internal delete action for LAB/Production 48h grants');
assert.match(adminApi,/deleteGrant\(body\.grantId,account,sql\)/,'Local owner deletion must hard-delete the 48h grant');
assert.match(adminApi,/deleteGrant\(grantId,\{id:ownerId\},sql\)/,'Peer deletion must be scoped to the owner account id');
assert.match(appAccess,/DELETE FROM app_access_grants/,'Deleting a 48h invitation must remove the grant row, not merely hide it');
assert.match(build,/test-r249-delete-guest48h-invitation\.mjs/,'R249 regression must run in the mandatory build bank');

const db=new PGlite();
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
const owner={id:'owner-delete-48h'};
const grant=await createGrant(owner,{hours:48,maxUses:5},sql);
assert.ok(await redeemGuestToken(grant.token,sql),'Grant must work before deletion');
assert.equal(await recordGuestFeedback(grant.token,{guestGroupId:'grupo-pepe',playerCount:1,holesUsed:1,snapshot:{groupLabel:'Pepe',players:[{id:'p1',name:'Pepe',holes:[{hole:1,gross:4,net:4,par:4}],totals:{holes:1,gross:4,net:4,relativeToPar:0}}]}},sql),true,'Guest feedback must be saved before deletion');
assert.equal((await ownerFeedback(owner,sql))[0].guest_groups.length,1,'Owner can see the 48h Live group before deletion');
assert.equal(await deleteGrant(grant.id,owner,sql),true,'Owner delete must remove the 48h grant');
assert.equal(await redeemGuestToken(grant.token,sql),null,'Deleted 48h link must stop opening Score Card');
assert.equal(await recordGuestFeedback(grant.token,{guestGroupId:'grupo-pepe',playerCount:1,snapshot:{players:[{name:'Pepe',holes:[]}]}},sql),false,'Deleted 48h link must stop updating Live feedback');
assert.deepEqual(await ownerFeedback(owner,sql),[],'Deleted 48h invitation must leave no organizer Live card trace');
await db.close();

console.log('PASS R249: Organizer can delete 48h guest invitations; link, Score Card feedback and Live cards are fully removed.');
