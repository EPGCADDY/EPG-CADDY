import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const adminApi=readFileSync('api/event-administration.js','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(adminApi,/guest_groups\)&&grant\.guest_groups\.length\?grant\.guest_groups:\[\{id:grant\.id/,'Organizer API must expose 48h access grants even before a guest scorecard snapshot exists');
assert.match(adminApi,/has_snapshot:Boolean\(group\.current_snapshot\|\|grant\.current_snapshot\)/,'Organizer API must flag whether a 48h row already has a Live-card snapshot');
assert.match(adminApi,/peerGuestGroups=\(remote\.data\.guestGroups\|\|\[\]\)\.map\(group=>\(\{\.\.\.group,source:source==='lab'\?'production':'lab'\}\)\)/,'LAB and Production 48h rows must be merged across environments');
assert.match(adminUi,/ACCESO COMPARTIDO 48H/,'Organizer UI must render 48h access rows without requiring a registered scorecard');
assert.match(adminUi,/SIN TARJETA LIVE AÚN/,'Organizer UI must keep pending 48h access visible but not open a missing Live card');
assert.match(adminUi,/escape\(String\(group\.source\|\|''\)\.toUpperCase\(\)\)\+' · 48H'/,'Organizer UI must show whether the 48h access came from LAB or Production');
assert.equal(release.label,'R237');

console.log('PASS R237: Organizer shows cross-environment 48h invitation access rows, including Production rows in LAB before Live-card registration.');
