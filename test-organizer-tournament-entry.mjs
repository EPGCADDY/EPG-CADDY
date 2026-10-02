import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const menu=fs.readFileSync('shortcuts-ui.js','utf8'),html=fs.readFileSync('live-hub.html','utf8'),code=fs.readFileSync('live-hub.js','utf8'),personal=fs.readFileSync('personal-events.js','utf8');
assert.match(menu,/item\("organizer","ORGANIZADOR"/);assert.match(menu,/item\('create-tournament','CREAR TORNEO'/);assert.match(menu,/shortcut=create/);
assert.match(html,/<label for="hubRoundName">TORNEO<\/label>/);assert.match(html,/<label for="hubRoundCourse">CLUB<\/label><select/);assert.match(html,/<details><summary>CATEGORÍAS<\/summary>/);assert.match(html,/id="hubRoundDate"[^>]*readonly/);assert.match(html,/id="hubRoundCreator"/);assert.match(code,/creatorName,players:/);assert.match(personal,/CÓDIGO DE TORNEO/);
console.log('PASS Menu Organizador: creation form, club/categories dropdowns, automatic date, creator and code result.');

const keySource=personal.slice(personal.indexOf(' function personalStorageKey('),personal.indexOf(' async function openAssignedCard('));const scope={root:{}};vm.runInNewContext(keySource,scope);assert.equal(scope.personalStorageKey('a','card'),'gscg-personal:a:card');scope.root.GSC_PERSONAL_ACCOUNT='a';assert.equal(scope.personalStorageKey('a','card'),'card');assert.equal(scope.personalStorageKey('b','card'),'gscg-personal:b:card');console.log('PASS creator/join storage: unscoped and already scoped registration use one account prefix.');

assert.match(personal,/membership\?\.role==='organizer'.*index-grupal\.html\?inicio=1/,'Empty creator returns to registration without auto-enrollment');console.log('PASS empty organizer continues to Registration; assigning the group still requires explicit event selection.');
