import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const adminApi=readFileSync('api/event-administration.js','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');
const build=readFileSync('scripts/build-manual-lab.mjs','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(adminApi,/if\(!Array\.isArray\(snapshot\?\.players\)\|\|!snapshot\.players\.some\(player=>String\(player\?\.name\|\|''\)\.trim\(\)\)\)continue;/,'Backend must omit empty 48h access grants without a real Score Card snapshot');
assert.match(adminUi,/function visibleGuestGroups\(groups=\[\]\)/,'Organizer UI must filter 48h rows before rendering');
assert.match(adminUi,/guestGroups=visibleGuestGroups\(/,'Organizer must render only visible guest 48h groups');
assert.doesNotMatch(adminUi,/SIN TARJETA LIVE AÚN/,'Organizer must not expose pending 48h invitation cards without Live data');
assert.match(adminUi,/return first\|\|'ACCESO COMPARTIDO 48H'/,'Visible 48h card title must still come from the first Score Card player, e.g. CHINITO');
assert.match(build,/test-r242-guest48h-only-live-groups\.mjs/,'R242 regression must run in the mandatory build bank');
assert.equal(release.label,'R242','Release label must publish R242');

console.log('PASS R242: Organizer shows only 48h guest groups with a real Live Score Card and keeps the first player as title.');
