import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const liveHtml = readFileSync('live.html', 'utf8');
const organizerHtml = readFileSync('event-administration.html', 'utf8');
const release = JSON.parse(readFileSync('release.json', 'utf8'));

for (const [name, html] of [['live.html', liveHtml], ['event-administration.html', organizerHtml]]) {
  assert.match(html, /\.player-total small\{[^}]*color:#31ff00[^}]*font-size:9px[^}]*font-weight:900/, `${name}: accumulated-result labels must be green and larger`);
  assert.match(html, /\.player-total b\{[^}]*font-size:15px[^}]*color:#fff[^}]*font-weight:900/, `${name}: accumulated digits must be larger and saturated`);
  assert.match(html, /\.score-live th,\.score-live td\{[^}]*height:39px[^}]*font-size:13px[^}]*color:#fff[^}]*font-weight:900/, `${name}: score table digits must be 25 percent larger and stronger`);
  assert.match(html, /\.score-live th\{color:#31ff00\}/, `${name}: table headers must be green`);
}

const liveJs = readFileSync('live-view.js', 'utf8');
const organizerJs = readFileSync('event-administration-ui.js', 'utf8');

assert.match(liveHtml, /\.group-meta\{[^}]*color:var\(--lime\)[^}]*font-size:11px[^}]*font-weight:900/, 'live.html: course/date meta must be green and larger');
assert.match(organizerHtml, /\.group-meta\{[^}]*color:#31ff00[^}]*font-size:13px[^}]*font-weight:900/, 'event-administration.html: course/date meta must be green and larger');
for (const [name, html] of [['live.html', liveHtml], ['event-administration.html', organizerHtml]]) {
  assert.match(html, /\.gross-mark\.birdie,\.gross-mark\.eagle,\.gross-mark\.albatross\{border:1\.5px solid currentColor;border-radius:50%\}/, `${name}: birdie/eagle/albatross must use scorecard circle nomenclature`);
  assert.match(html, /\.gross-mark\.bogey,\.gross-mark\.double-bogey,\.gross-mark\.triple-bogey\{border:1\.5px solid currentColor;border-radius:0\}/, `${name}: bogey/double/triple bogey must use scorecard square nomenclature`);
}
assert.match(liveJs, /function grossMarkClass\(item\).*if\(diff===-1\)return"birdie";if\(diff===-2\)return"eagle".*if\(diff===1\)return"bogey";if\(diff===2\)return"double-bogey"/s, 'live-view.js: Live gross scores must use scorecard gross-mark classes');
assert.match(organizerJs, /function guestGrossMarkClass\(item\).*if\(diff===-1\)return'birdie';if\(diff===-2\)return'eagle'.*if\(diff===1\)return'bogey';if\(diff===2\)return'double-bogey'/s, 'event-administration-ui.js: Organizer Live gross scores must use scorecard gross-mark classes');
assert.match(liveJs, /<tr class="net-row"><td>NETO<\/td>\$\{numbers\.map\(hole=>\{const item=holes\.get\(hole\);return`<td class="\$\{cellClass\(item,"net"\)\}">\$\{scoreCell\(item,"net"\)\}<\/td>`\}\)\.join\(""\)\}<\/tr>/, 'live-view.js: NETO row must remain calculated from item.net without visual handicap recalc');
assert.match(organizerJs, /<tr class="net-row"><td>NETO<\/td>'\+numbers\.map\(hole=>\{const item=holes\.get\(hole\);return '<td class="'\+guestCellClass\(item,'net'\)\+'">'\+guestScoreCell\(item,'net'\)\+'<\/td>'\}\)\.join\(''\)\+'<\/tr>/s, 'event-administration-ui.js: NETO row must remain calculated from item.net without visual handicap recalc');
assert.match(liveJs, /<small>GROSS<\/small><b>\$\{escapeHtml\(totals\.gross\?\?0\)\}<\/b>.*<small>NETO<\/small><b class="net-total">\$\{escapeHtml\(totals\.net\?\?0\)\}<\/b>/s, 'live-view.js: accumulated gross/net totals must keep snapshot totals');
assert.match(organizerJs, /<small>GROSS<\/small><b>'\+escape\(totals\.gross\?\?0\)\+'<\/b>.*<small>NETO<\/small><b class="net-total">'\+escape\(totals\.net\?\?0\)\+'<\/b>/s, 'event-administration-ui.js: accumulated gross/net totals must keep snapshot totals');
assert.match(liveJs, /<small>\+\/- ACUMULADO<\/small>/, 'live-view.js: accumulated relative result label must be +/- ACUMULADO');
assert.match(organizerJs, /<small>\+\/- ACUMULADO<\/small>/, 'event-administration-ui.js: accumulated relative result label must be +/- ACUMULADO');
assert.doesNotMatch(liveJs, /<small>\+\/- POR<br>HOYO<\/small>/, 'live-view.js: accumulated relative result label must not include POR HOYO');
assert.doesNotMatch(organizerJs, /<small>\+\/- POR<br>HOYO<\/small>/, 'event-administration-ui.js: accumulated relative result label must not include POR HOYO');
assert.match(liveHtml, /\.score-live tr\.net-row td:not\(:first-child\),\.player-total b\.net-total\{color:var\(--lime\)/, 'live.html: NETO row and accumulated net digits must be green');
assert.match(organizerHtml, /\.score-live tr\.net-row td:not\(:first-child\),\.player-total b\.net-total\{color:#31ff00/, 'event-administration.html: Organizer NETO row and accumulated net digits must be green');
assert.doesNotMatch(liveJs, /<small>HCP \$\{escapeHtml\(player\.handicap\)\}/, 'live-view.js: player header must not show handicap/tee text');
assert.doesNotMatch(organizerJs, /<small>HCP '\+escape\(player\.handicap/, 'event-administration-ui.js: organizer live card must not show handicap/tee text');
assert.doesNotMatch(organizerJs, /INVITACIÓN 48H|Jugadores:|Toca la ronda/, 'event-administration-ui.js: compact organizer guest card must show only name and open button');
assert.match(organizerJs, /<h3>'\+escape\(guestGroupTitle\(group\)\)\+'<\/h3><button type="button" data-guest-group-open="/, 'event-administration-ui.js: compact organizer guest card keeps title and ABRIR SCORE CARD');
assert.equal(release.label, 'R235');
assert.match(liveHtml, /live-view\.js\?v=20261008-R235/);
assert.match(organizerHtml, /body\.guest-live-modal-open\{overflow:hidden!important;position:fixed!important/, 'event-administration.html: opening guest Live card must lock the background page scroll');
assert.match(organizerHtml, /dialog\[open\]\.guest-live-dialog\{position:fixed!important;.*overflow:hidden!important.*touch-action:none!important\}/, 'event-administration.html: guest Live dialog must own the viewport and block backdrop touch scroll');
assert.match(organizerHtml, /\.guest-live-scroll\{[^}]*overflow-y:auto!important[^}]*overscroll-behavior:contain!important[^}]*touch-action:pan-y!important/, 'event-administration.html: guest Live card must scroll inside the modal, not the background');
assert.match(organizerJs, /lockGuestLiveScroll\(\).*document\.body\.classList\.add\('guest-live-modal-open'\)/s, 'event-administration-ui.js: guest Live modal must lock the owner page scroll');
assert.match(organizerJs, /data-guest-live-close.*TARJETA LIVE · INVITADO 48H.*guest-live-scroll/s, 'event-administration-ui.js: guest Live modal must include an internal close control and scroll container');

console.log('PASS R231: Live shared card readability, compact organizer cards and scorecard golf nomenclature are enforced.');
