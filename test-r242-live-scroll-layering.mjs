import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const liveHtml=readFileSync('live.html','utf8');
const adminUi=readFileSync('event-administration-ui.js','utf8');

for(const source of [liveHtml,adminUi]){
  assert.match(source,/\.score-scroll\{[^}]*position:relative/, 'Live score scroll must own its layer');
  assert.match(source,/\.score-scroll\{[^}]*z-index:3/, 'Live score scroll must sit above lower card content');
  assert.match(source,/\.score-scroll\{[^}]*overflow-x:auto/, 'Live score scroll must remain horizontally scrollable');
  assert.match(source,/\.score-scroll\{[^}]*overflow-y:hidden/, 'Live score scroll must not expose a competing vertical layer');
  assert.match(source,/\.score-scroll\{[^}]*overscroll-behavior:contain/, 'Live score scroll must contain overscroll');
  assert.match(source,/\.score-scroll\{[^}]*touch-action:pan-x/, 'Live score scroll must reserve horizontal touch gestures');
  assert.match(source,/\.player-live\{[^}]*z-index:2[^}]*contain:paint/, 'Each player Live block must isolate painting above lower result content');
  assert.match(source,/\.group-results\{[^}]*position:relative[^}]*z-index:1/, 'Lower group results must stay behind player score tables');
}

assert.match(liveHtml,/\.group-card,\.match-live-pair\{position:relative;isolation:isolate\}/, 'Shared Live cards must isolate score tables from lower content');
assert.match(adminUi,/ensureGuestLiveScrollLayer\(\)/, 'Organizer 48H Live cards must install the layer guard');
assert.match(adminUi,/dialog:has\(\.guest-live-card\)\{overscroll-behavior:contain\}/, 'Organizer dialog must contain scroll chaining');

console.log('PASS R242: Live shared and organizer 48H score tables keep independent scroll/layers');
