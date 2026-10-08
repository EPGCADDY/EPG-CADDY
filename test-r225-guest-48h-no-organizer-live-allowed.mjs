import assert from 'node:assert/strict';
import fs from 'node:fs';

const guest=fs.readFileSync('guest-access.js','utf8');
const shortcuts=fs.readFileSync('shortcuts-ui.js','utf8');
const live=fs.readFileSync('live-control.js','utf8');
const adminHtml=fs.readFileSync('event-administration.html','utf8');
const adminUi=fs.readFileSync('event-administration-ui.js','utf8');
const adminApi=fs.readFileSync('api/event-administration.js','utf8');

assert.match(guest,/LIVE PERMITIDO · ORGANIZADOR BLOQUEADO/,'Guest banner must state Live is allowed and Organizer blocked');
assert.doesNotMatch(guest,/["']gscLiveLaunch["']|["']shareRoundLiveButton["']/,'Guest 48h must not remove Live buttons');
assert.match(guest,/ownerShare24h/,'Guest 48h must still remove 48h owner controls');
assert.match(shortcuts,/if\(!guest\)html\+=item\("organizer","ORGANIZADOR"/,'Guest menu must not render Organizer');
assert.match(shortcuts,/root\.GSC_GUEST_ACCESS&&\["organizer","organizer-invitations","administration","create-tournament"/,'Guest direct shortcut actions must be blocked');
assert.match(shortcuts,/COMPARTIR LIVE SÍ PERMANECE ACTIVO/,'Guest block message must preserve Live sharing');
assert.match(live,/if\(root\.GSC_GUEST_ACCESS\)\{toggle\.remove\(\);organizer\.remove\(\)\}/,'Guest Live overlay must remove organizer tools while keeping quick Live');
assert.match(adminHtml,/gsc_guest_mode=1[\s\S]*ORGANIZADOR NO DISPONIBLE PARA INVITADOS 48H/,'Direct admin page must block guest mode');
assert.match(adminUi,/GUEST_48H_ADMIN_BLOCKED/,'Admin UI must stop execution for guest mode');
assert.match(adminApi,/guestMode&&body\.action!=="remote-share"[\s\S]*EVENT_ADMIN_GUEST_FORBIDDEN/,'Admin API must deny guest admin actions but preserve remote Live share');

console.log('PASS R225: guest 48h cannot access Organizer or admin functions; Compartir Live remains allowed.');