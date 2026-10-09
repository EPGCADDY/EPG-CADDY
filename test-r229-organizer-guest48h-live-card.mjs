import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const adminUi=readFileSync('event-administration-ui.js','utf8');
const adminHtml=readFileSync('event-administration.html','utf8');
const release=JSON.parse(readFileSync('release.json','utf8'));

assert.match(adminUi,/data-guest-group-open/,'Organizer guest 48h rows must open a full card instead of staying as text-only summaries');
assert.match(adminUi,/function openGuestGroupLive\(group\)/,'Organizer must have a dedicated 48h guest Live-card opener');
assert.match(adminUi,/data-guest-live-close/,'Guest Live card must include an internal close button visible inside the opened Score Card');
assert.match(adminUi,/aria-label="Cerrar tarjeta Live">×<\/button>/,'Guest Live card close action must use the same boxed X graphic language as the rest of the app');
assert.match(adminUi,/\.guest-live-close\{[^']*width:54px[^']*height:54px[^']*border:2px solid #31ff00[^']*font:400 28px\/50px Arial/s,'Guest Live close X must keep the same size and boxed style as the app close control');
assert.match(adminUi,/actionDialog'\)\.close\(\)/,'Guest Live close button must close the opened card dialog');
assert.match(adminUi,/function guestGroupLiveCard\(group\)/,'Organizer must render a complete Live-style card for each invited group');
assert.match(adminUi,/function guestPlayerLiveCard\(player,snapshot,index=0\)/,'Organizer Live card must render player score tables');
assert.match(adminUi,/return first\|\|'ACCESO COMPARTIDO 48H'/,'Organizer compact card title must come from the first Score Card player when a snapshot exists, or from the pending 48h access label');
assert.doesNotMatch(adminUi,/return snapshot\.groupLabel\|\|/,'Organizer compact card must not use the guest group label as title');
assert.match(adminUi,/>ABRIR TARJETA LIVE</,'Guest group row must expose the explicit Live-card action');
assert.doesNotMatch(adminUi,/RESULTADOS ACUMULADOS/,'Organizer Live card must not duplicate accumulated results inside each player card');
assert.match(adminUi,/RESULTADOS DEL GRUPO/,'Organizer Live card must include the group cumulative results footer');
assert.match(adminUi,/\+\/- POR<br>HOYO/,'Organizer Live card must use +/- POR HOYO label');
assert.doesNotMatch(adminUi,/players\.map\(guestGroupPlayerLine\)/,'Organizer must not render the old bullet-only player summary as the main view');
assert.match(adminHtml,/dialog:has\(\.guest-live-card\)/,'Organizer dialog must expand for Live-style guest cards on mobile');
assert.match(adminHtml,/\.score-live\{min-width:1040px/,'Organizer Live-style card must preserve the 18-hole horizontal table');
assert.match(adminHtml,/\.player-title strong\{[^}]*color:#31ff00[^}]*text-transform:uppercase[^}]*text-decoration:none/s,'Organizer guest card player names must be green uppercase and not underlined');
const releaseNumber=Number(String(release.label||'').replace(/^R/,''));
assert.ok(releaseNumber>=229,'Release label must be R229 or later for organizer guest Live-card opening');

console.log('PASS R229: Organizer guest 48h groups open a full Live-style digital card with accumulated results.');
