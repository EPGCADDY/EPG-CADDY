import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync('index-grupal.html', 'utf8');
const privateRounds = fs.readFileSync('private-rounds.js', 'utf8');
const liveHub = fs.readFileSync('live-hub.js', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));
const worker = fs.readFileSync('service-worker.js', 'utf8');

assert.match(html, /id="openCardLibrarySetup"[^>]*>VER RONDAS GUARDADAS<\/button>\s*<button class="nr-button secondary" type="button" id="openMyRoundsButton">MI RONDA<\/button>\s*<button class="nr-button secondary account-entry-button" type="button" id="accountBackupButtonSetup"/,
  'MI RONDA appears in Registro after saved rounds and before backup');
assert.match(html, /\$\("openMyRoundsButton"\)\.addEventListener\("click",\(\)=>window\.GSCPrivateRounds\.list\("MI RONDA"\)\)/,
  'Registration opens the private-round list with the requested title');
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
assert.equal(release.label, 'R147.2');
assert.match(worker, /RELEASE_FALLBACK="LABORATORIO-20260930-R147\.2"/);

console.log('PASS R147.2 MI RONDA: Registration → authorized private rounds → private scores; tournament shelf stays separate.');
