import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const appAccess=readFileSync('api/_lib/app-access.js','utf8');
const adminApi=readFileSync('api/event-administration.js','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');
const scorecard=readFileSync('index-grupal.html','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(appAccess,/CREATE TABLE IF NOT EXISTS app_access_guest_groups/,'48h guest feedback must persist separate guest-group rows');
assert.match(appAccess,/UNIQUE\(grant_id,group_key\)/,'Each 48h guest group must be keyed independently under the shared grant');
assert.match(appAccess,/guest_groups:/,'Owner feedback must attach guest_groups to each 48h grant');
assert.match(scorecard,/function guestAccessGroupId\(\)/,'Guest Score Card must generate a stable per-device guest group id');
assert.match(scorecard,/guestGroupId:guestAccessGroupId\(\)/,'Guest feedback payload must identify the group separately from the shared link');
assert.match(adminApi,/import \{requireOwner,ownerFeedback(?:,[^}]*)?\} from '\.\/_lib\/app-access\.js'/,'Organizer API must read 48h owner feedback');
assert.match(adminApi,/guestGroups:\[...mergedGuestGroups\.values\(\)\]/,'Organizer API list must return merged guestGroups');
assert.match(adminUi,/GRUPOS INVITADOS 48H/,'Organizer UI must render the 48h guest groups section');
assert.match(adminUi,/function guestGroupCard\(group\)/,'Organizer UI must render an individual card for each 48h guest group');
assert.match(adminUi,/current_snapshot/,'Organizer guest group card must use the score-card snapshot');
assert.match(adminUi,/GUEST_48H_ADMIN_BLOCKED/,'Guest 48h mode must remain blocked from Organizer');
const releaseNumber=Number(String(release.label||'').replace(/^R/,''));
assert.ok(releaseNumber>=227,'Release label must remain at R227 or later');
assert.match(release.release,/^202610(08|09)-R\d+$/,'Release id must remain in the project release format');

console.log('PASS R227 guest 48h groups: Organizer shows individual invited groups while guests stay blocked from Organizer.');
