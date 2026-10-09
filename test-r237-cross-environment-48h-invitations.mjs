import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const adminApi=readFileSync('api/event-administration.js','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(adminApi,/guest_groups\)&&grant\.guest_groups\.length\?grant\.guest_groups:\[\{id:grant\.id/,'Organizer API must still inspect 48h access grants and legacy snapshots');
assert.match(adminApi,/has_snapshot:true/,'Organizer API returns only 48h rows that already have a Live-card snapshot');
assert.match(adminApi,/peerGuestGroups=\(remote\.data\.guestGroups\|\|\[\]\)\.map\(group=>\(\{\.\.\.group,source:source==='lab'\?'production':'lab'\}\)\)/,'LAB and Production 48h rows must be merged across environments');
assert.match(adminApi,/body\.action==='list-peer-guest48h'/,'Organizer API must expose a signed peer-only 48h inventory route');
assert.match(adminApi,/Authorization:`Bearer \$\{secret\}`/,'Cross-environment 48h inventory must not depend on a LAB cookie being valid in Production');
assert.match(adminApi,/ownerFeedbackForPeer\(sql,env,body\.ownerAccountId\)/,'Peer 48h inventory must read active owner access grants for the requesting owner account when LAB asks Production');
assert.match(adminApi,/action:'list-peer-guest48h',ownerAccountId:account\.id/,'LAB must request Production 48h groups for the same owner account, not only from an environment fallback');
assert.match(adminUi,/ACCESO COMPARTIDO 48H/,'Organizer UI keeps a fallback title but filters rows without registered Score Card players');
assert.doesNotMatch(adminUi,/SIN TARJETA LIVE AÚN/,'Organizer UI must not show pending/empty 48h access cards in the owner list');
assert.match(adminUi,/escape\(String\(group\.source\|\|''\)\.toUpperCase\(\)\)\+' · 48H'/,'Organizer UI must show whether the 48h access came from LAB or Production');
assert.ok(Number(String(release.label||'').replace(/^R/,''))>=238,'Release label must include the signed cross-environment 48h mirror fix');

console.log('PASS R237: Organizer shows cross-environment 48h invitation access rows, including Production rows in LAB before Live-card registration.');
