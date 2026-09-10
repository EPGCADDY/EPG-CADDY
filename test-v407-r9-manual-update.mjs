import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const successor=fs.readFileSync("candidate-index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/meta name="gscg-release" content="V407-R32-MANUAL-CANDIDATE-TWO-COLUMNS-20260910"/);
assert.match(worker,/const RELEASE="V407-R34-HARDENED-UPDATE-MICROPHONE-20260910"/);
assert.match(worker,/async function approvedNavigationWithManualUpdate\(request\)/,"La copia almacenada debe recibir el control manual de recuperación");
assert.match(worker,/gsc-update-recovery[\s\S]*?mandatory-update\{display:block!important\}/,"R24 almacenada debe mostrar ACTUALIZAR en Registro");
assert.match(worker,/return await approvedNavigationWithManualUpdate\(request\)/,"La navegación almacenada debe usar el puente manual");
assert.doesNotMatch(worker,/approvedNavigationWithManualUpdate[\s\S]{0,900}?location\.reload|approvedNavigationWithManualUpdate[\s\S]{0,900}?clients\.claim\(\).*navigate/,"El puente no puede instalar ni navegar automáticamente");
assert.match(html,/class="mandatory-update" id="mandatoryUpdate"/);
assert.match(html,/aria-disabled="true" disabled><span id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/function showCurrentBuild\(\)[\s\S]*?button\.disabled=true[\s\S]*?classList\.remove\("available"\)/);
assert.match(successor,/function showMandatoryUpdate\(build,manifest=null\)[\s\S]*?button\.disabled=false[\s\S]*?classList\.add\("available"\)/);
assert.match(successor,/if\(published===CURRENT_APP_BUILD\)showCurrentBuild\(\);else showMandatoryUpdate\(published,manifest\)/);
assert.match(successor,/navigator\.serviceWorker\.ready/);
assert.match(successor,/messageWorker\(worker,\{type:"PROMOTE_BUILD",build:pendingPublishedBuild,candidateSha256:pendingPublishedManifest\.candidateSha256\}\)/);
assert.doesNotMatch(successor,/async function installMandatoryUpdate\(\)[\s\S]{0,900}?\.unregister\(\)/);
assert.doesNotMatch(successor,/async function installMandatoryUpdate\(\)[\s\S]{0,900}?caches\.delete/);
assert.match(successor,/nextUrl\.searchParams\.set\("update_check",String\(Date\.now\(\)\)\)/);
assert.match(worker,/const CANDIDATE_ENTRY="\/candidate-index-grupal\.html"/);
assert.match(worker,/async function promoteCandidate\(expectedCandidateSha256=""\)/);
assert.match(worker,/self\.addEventListener\("activate",event=>event\.waitUntil\(ensureApprovedShell\(\)\.then\(\(\)=>self\.clients\.claim\(\)\)\)\)/);
assert.doesNotMatch(worker,/client\.navigate/);
assert.match(html,/const categoryLabel=normalizeTournamentCategory\(p\.tournamentCategory\)\?tournamentCategoryLabel\(p\.tournamentCategory\):""/);
assert.match(html,/categoryLabel\?`<span class="player-category">\$\{escapeHtml\(categoryLabel\)\}<\/span>`:""/);
assert.match(html,/\.scorecard \.universales-row \.concept,\.scorecard \.universales-row td\{color:var\(--red\);font-weight:900\}/);
assert.match(html,/function manualRowHasData\(row\)\{return !!\(String\(row\?\.name\|\|""\)\.trim\(\)\|\|String\(row\?\.handicap\?\?""\)\.trim\(\)\)\}/);

console.log("PASS V407-R18 · actualización, categorías, puntos rojos y encabezado móvil");
