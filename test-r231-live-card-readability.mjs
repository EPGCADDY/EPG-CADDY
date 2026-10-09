import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const liveHtml = readFileSync('live.html', 'utf8');
const organizerHtml = readFileSync('event-administration.html', 'utf8');
const liveJs = readFileSync('live-view.js', 'utf8');
const organizerJs = readFileSync('event-administration-ui.js', 'utf8');
const release = JSON.parse(readFileSync('release.json', 'utf8'));

for (const [name, html] of [['live.html', liveHtml]]) {
  assert.match(html, /\.group-results h2\{[^}]*color:(?:var\(--lime\)|#31ff00)[^}]*font-size:15px[^}]*text-align:center/, `${name}: group accumulated title must be green and readable`);
  assert.match(html, /\.group-results th,\.group-results td\{[^}]*font-size:12px[^}]*font-weight:900/, `${name}: group accumulated digits must be readable and saturated`);
  assert.match(html, /\.score-live th,\.score-live td\{[^}]*height:39px[^}]*font-size:13px[^}]*color:#fff[^}]*font-weight:900/, `${name}: score table digits must be 25 percent larger and stronger`);
  assert.match(html, /\.score-live th\{color:#31ff00\}/, `${name}: table headers must be green`);
}
assert.match(organizerJs, /group-results h2\{[^']*color:#31ff00[^']*font-size:15px[^']*text-align:center/, 'event-administration-ui.js: injected group accumulated title must be green and readable');
assert.match(organizerHtml, /\.score-live th,\.score-live td\{[^}]*height:39px[^}]*font-size:13px[^}]*color:#fff[^}]*font-weight:900/, 'event-administration.html: score table digits must be 25 percent larger and stronger');
assert.match(organizerHtml, /\.score-live th\{color:#31ff00\}/, 'event-administration.html: table headers must be green');

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
assert.match(liveJs, /RESULTADOS DEL GRUPO.*<th>GROSS<\/th><th>NETO<\/th><th>\+\/-<\/th>/s, 'live-view.js: group footer must keep accumulated gross/net/+/- totals');
assert.match(organizerJs, /RESULTADOS DEL GRUPO.*<th>GROSS<\/th><th>NETO<\/th><th>\+\/-<\/th>/s, 'event-administration-ui.js: organizer group footer must keep accumulated gross/net/+/- totals');
assert.doesNotMatch(liveJs, /RESULTADOS ACUMULADOS/, 'live-view.js: accumulated results must not be duplicated inside each player card');
assert.doesNotMatch(organizerJs, /RESULTADOS ACUMULADOS/, 'event-administration-ui.js: accumulated results must not be duplicated inside each player card');
assert.doesNotMatch(liveJs, /<small>\+\/- POR<br>HOYO<\/small>/, 'live-view.js: accumulated relative result label must not include POR HOYO');
assert.doesNotMatch(organizerJs, /<small>\+\/- POR<br>HOYO<\/small>/, 'event-administration-ui.js: accumulated relative result label must not include POR HOYO');
assert.match(liveHtml, /\.score-live tr\.net-row td:not\(:first-child\),\.player-total b\.net-total\{color:var\(--lime\)/, 'live.html: NETO row must be green');
assert.match(liveHtml, /\.group-results \.net-total,\.group-results \.under\{color:var\(--lime\)\}\.group-results \.over\{color:var\(--red\)\}/, 'live.html: group footer net/under green and over red');
assert.match(organizerHtml, /\.score-live tr\.net-row td:not\(:first-child\),\.player-total b\.net-total\{color:#31ff00/, 'event-administration.html: Organizer NETO row must be green');
assert.doesNotMatch(liveJs, /<small>HCP \$\{escapeHtml\(player\.handicap\)\}/, 'live-view.js: player header must not show handicap/tee text');
assert.doesNotMatch(organizerJs, /<small>HCP '\+escape\(player\.handicap/, 'event-administration-ui.js: organizer live card must not show handicap/tee text');
assert.doesNotMatch(organizerJs, /INVITACIÓN 48H|Jugadores:|Toca la ronda/, 'event-administration-ui.js: compact organizer guest card must show only name and open button');
assert.match(organizerJs, /<h3>'\+escape\(guestGroupTitle\(group\)\)\+'<\/h3><p>'\+escape\(String\(group\.source\|\|''\)\.toUpperCase\(\)\)\+' · 48H'/, 'event-administration-ui.js: compact organizer guest card keeps title and 48h source metadata');
assert.ok(Number(String(release.label||'').replace(/^R/,''))>=237,'Release label must be R237 or later for the cross-environment 48h access fix');
assert.match(liveHtml, /live-view\.js\?v=20261009-R246/);
assert.match(organizerHtml, /html body\.gsc-admin-page\{overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important\}html body\.gsc-admin-page main>a\[data-gsc-close\]\{position:fixed!important;.*pointer-events:auto!important\}/, 'event-administration.html: organizer close button must be fixed, tappable and not lock page scroll');
assert.match(organizerHtml, /dialog:has\(\.guest-live-card\)\{touch-action:pan-y!important;-webkit-overflow-scrolling:touch!important\}/, 'event-administration.html: guest Live card dialog must keep vertical touch scroll');

console.log('PASS R231: Live shared card readability, compact organizer cards and scorecard golf nomenclature are enforced.');
