import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('index-grupal.html', 'utf8');
const privateRounds = fs.readFileSync('private-rounds.js', 'utf8');
const liveHub = fs.readFileSync('live-hub.js', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));
const worker = fs.readFileSync('service-worker.js', 'utf8');

assert.doesNotMatch(html,/id="openMyRoundsButton"/,'MI RONDA removed from Registration as requested');
const modalities=html.slice(html.indexOf('aria-label="Modalidades"'),html.indexOf('aria-label="Registro manual"'));
assert.doesNotMatch(modalities,/registrationEventButton|openMyRoundSetup|provisionalScorecardButton|CREAR TORNEO|CREAR RONDA/);
assert.match(fs.readFileSync('shortcuts-ui.js','utf8'),/item\("create-round","CREAR MI GRUPO"/);
assert.match(fs.readFileSync('shortcuts-ui.js','utf8'),/item\("create-tournament","CREAR TORNEO"/);
assert.match(privateRounds, /async function list\(title="GRUPOS PARTICULARES"\)[\s\S]*show\(title,/,
  'The existing private-round list accepts a Registration title without changing its default entry');
assert.match(privateRounds, /personal\?\.privateItems\|\|\[\]/,
  'Only private personal events are added to the private-round list');
assert.doesNotMatch(privateRounds, /personal\?\.items\|\|\[\]/,
  'Tournament personal events are not added to MI RONDA');
assert.match(privateRounds, /personalEvent='\+encodeURIComponent\(item\.id\)\+'&personalKind=private/,
  'Selecting a personal round opens its private-event score view directly');
assert.match(liveHub, /state\.tournaments\.filter\(item=>root\.GSCPersonalEvents\?\.descriptor\(item\.token\)\?\.eventKind!=='private'\)/,
  'The tournament shelf excludes private rounds');
assert.match(liveHub, /descriptor\(state\.generalToken\)\)\?\.eventKind==='private'/,
  'Private-event scores use the private score presentation');
assert.match(release.label, /^R\d+$/);
assert.ok(worker.includes('RELEASE_FALLBACK='+JSON.stringify(release.release)));

console.log('PASS R24: creation exclusively in Menu, no duplicated buttons or MI RONDA, private/tournament shelves remain separate.');
