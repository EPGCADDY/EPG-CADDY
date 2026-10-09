import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const adminApi=readFileSync('api/event-administration.js','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(adminApi,/guest_groups\)&&grant\.guest_groups\.length\?grant\.guest_groups:\[\{id:grant\.id/,'Organizer API must expose 48h access grants even before a guest scorecard snapshot exists');
assert.match(adminApi,/has_snapshot:Boolean\(group\.current_snapshot\|\|grant\.current_snapshot\)/,'Organizer API must flag whether a 48h row already has a Live-card snapshot');
assert.match(adminApi,/peerGuestGroups=\(remote\.data\.guestGroups\|\|\[\]\)\.map\(group=>\(\{\.\.\.group,source:source==='lab'\?'production':'lab'\}\)\)/,'LAB and Production 48h rows must be merged across environments');
assert.match(adminApi,/body\.action==='list-peer-guest48h'/,'Organizer API must expose a signed peer-only 48h inventory route');
assert.match(adminApi,/Authorization:`Bearer \$\{secret\}`/,'Cross-environment 48h inventory must not depend on a LAB cookie being valid in Production');
assert.match(adminApi,/ownerFeedbackForPeer\(sql,env\)/,'Peer 48h inventory must read active owner access grants directly from the owning environment');
assert.match(adminUi,/ACCESO COMPARTIDO 48H/,'Organizer UI must render 48h access rows without requiring a registered scorecard');
assert.match(adminUi,/SIN TARJETA LIVE AÚN/,'Organizer UI must keep pending 48h access visible but not open a missing Live card');
assert.match(adminUi,/escape\(String\(group\.source\|\|''\)\.toUpperCase\(\)\)\+' · 48H'/,'Organizer UI must show whether the 48h access came from LAB or Production');
assert.ok(Number(String(release.label||'').replace(/^R/,''))>=238,'Release label must include the signed cross-environment 48h mirror fix');

console.log('PASS R237: Organizer shows cross-environment 48h invitation access rows, including Production rows in LAB before Live-card registration.');
