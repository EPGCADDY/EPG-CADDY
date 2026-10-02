import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('index-grupal.html', 'utf8');
const privateRounds = fs.readFileSync('private-rounds.js', 'utf8');
const liveHub = fs.readFileSync('live-hub.js', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));
const worker = fs.readFileSync('service-worker.js', 'utf8');

assert.doesNotMatch(html,/id="openMyRoundsButton"/,'MI RONDA removed from Registration as requested');
const modalities=html.slice(html.indexOf('aria-label="Modalidades"'),html.indexOf('aria-label="Registro manual"'));
assert.match(modalities,/id="registrationEventButton"/);assert.match(modalities,/id="openMyRoundSetup"/);
assert.equal((html.match(/id="registrationEventButton"/g)||[]).length,1);assert.equal((html.match(/id="openMyRoundSetup"/g)||[]).length,1);
assert.match(privateRounds, /async function list\(title="RONDAS PARTICULARES"\)[\s\S]*show\(title,/,
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
assert.match(release.label, /^R147\.2(?:\.\d+)*$/);
assert.ok(worker.includes('RELEASE_FALLBACK='+JSON.stringify(release.release)));

console.log('PASS R24: creation inside Modalidades, no duplicated buttons or MI RONDA, private/tournament shelves remain separate.');
