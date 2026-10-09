import assert from 'node:assert/strict';
import fs from 'node:fs';

const invitations = fs.readFileSync('whatsapp-invitations.js', 'utf8');
const personal = fs.readFileSync('personal-events.js', 'utf8');
const liveControl = fs.readFileSync('live-control.js', 'utf8');
const liveShare = fs.readFileSync('live-share.js', 'utf8');
const liveShareApi = fs.readFileSync('api/_lib/live-share.js', 'utf8');
const html = fs.readFileSync('index-grupal.html', 'utf8');
const release = JSON.parse(fs.readFileSync('release.json', 'utf8'));
const sw = fs.readFileSync('service-worker.js', 'utf8');

assert.match(release.label, /^R\d+$/);
assert.match(release.release, /^2026100[89]-R\d+$/);
assert.match(html, /<meta name="gscg-release" content="2026100[89]-R\d+">/);
assert.match(html, /VERSIÓN R\d+/);
assert.match(html, /personal-events\.js\?v=2026100[89]-R\d+/);
assert.match(sw, /r\d+-/);
assert.match(sw, /RELEASE_FALLBACK="2026100[89]-R\d+"/);

assert.match(invitations, /function registrationUrl\(source,code\)/);
assert.match(invitations, /url\.searchParams\.set\('codigo',value\)/);
assert.match(invitations, /registrationUrl\(source,value\)/);
assert.match(invitations, /el código ya va cargado/);
assert.doesNotMatch(invitations, /const direct=kind==='tournament'&&eventId,link=direct\?tournamentInvitationUrl\(name,eventId,value,source\):registrationUrl\(source\)/);

assert.match(personal, /let linkInvitation=null,startupJoinCode=''/);
assert.match(personal, /function loadStartupJoinCode\(\)/);
assert.match(personal, /url\.searchParams\.get\('codigo'\)\|\|url\.searchParams\.get\('code'\)/);
assert.match(personal, /if\(prefill\)root\.setTimeout\?\.\(\(\)=>button\.click\(\),80\)/);
assert.match(personal, /else\{const prefill=consumeStartupJoinCode\(\);if\(prefill\)panel\.querySelector\('input'\)\.value=prefill\}/);
assert.match(personal, /startupJoinCode=loadStartupJoinCode\(\)/);

assert.match(liveControl, /const on=\(id,handler\)=>\{const element=\$\(id\);if\(element\)element\.onclick=handler\}/);
assert.match(liveControl, /const organizerToggle=\$\("liveOrganizerToggle"\);if\(organizerToggle\)organizerToggle\.onclick=/);
assert.match(liveControl, /GSCOneUseLive\.share\(enrolled\.kind,enrolled\.stream\.tournamentId,snapshot\.tournament\|\|'LIVE',\{eventKind:enrolled\.kind,forceStream:true\}\)/);
assert.match(liveShare, /coded=!!personal&&!event\?\.forceStream/);
assert.match(liveShareApi, /g\.issuer_stream_id/);
assert.match(liveShareApi, /AND id=\$\{sessions\[0\]\.issuer_stream_id\}::uuid/);

console.log('PASS R226 WhatsApp entry link carries code, auto-prefills entry, and guest Live panel guards missing organizer controls');
