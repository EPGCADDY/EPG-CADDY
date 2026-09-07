import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync('index-grupal.html','utf8');
assert.match(html,/id="clearAllRegistration">BORRAR TODO<\/button>/);
assert.match(html,/function clearAllRegistrationPlayers\(\)\{[\s\S]*?draftPlayers=\[\];[\s\S]*?manualDraftRows=Array\.from\(\{length:6\},\(\)=>emptyManualDraftRow\(\)\);[\s\S]*?clearDraftState\(\);[\s\S]*?renderDraft\(\);/);
assert.match(html,/\$\("clearAllRegistration"\)\.addEventListener\("click",clearAllRegistrationPlayers\)/);
assert.doesNotMatch(html,/function clearAllRegistrationPlayers\(\)[\s\S]*?localStorage\.removeItem\(ROUND_ARCHIVE_KEY\)/);
assert.match(html,/document\.body\?\.classList\.add\("gsc-final-card-open"\)/);
assert.match(html,/document\.body\?\.classList\.remove\("gsc-final-card-open"\)/);
for(const control of ['live-support-link','ai-universal-launch','golf-rules-launch','skins-launch','gsc-live-launch','mandatory-update'])assert.match(html,new RegExp(`body\\.gsc-final-card-open \\.${control}`));
assert.match(html,/#finalCardOverlay \.final-card-panel\{width:100%;min-width:0/);
assert.match(html,/#finalCardOverlay \.final-card-shell\{width:100%;max-width:100%;overflow-x:auto/);
assert.match(html,/#finalCardOverlay \.final-card-head>div\{display:grid;grid-template-columns:1fr/);
console.log('PASS V405 · BORRAR TODO limita el borrado al Registro y Tarjeta Digital móvil queda aislada, apilada y desplazable.');
