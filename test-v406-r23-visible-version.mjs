import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/class="app-version-id" id="appVersionId">V406 · R23<\/span>/);
assert.match(html,/\.app-version-id\{position:absolute;[^}]*color:#fff/);
assert.match(html,/mandatoryUpdateAction"\)\.textContent="ACTUALIZAR"/);
assert.match(html,/nextUrl\.searchParams\.set\("app_version",pendingPublishedBuild\)/);
assert.match(worker,/if\(url\.searchParams\.get\("app_version"\)===RELEASE\)\{await promoteCandidate\(\)/);
assert.doesNotMatch(worker,/promoteCandidate\(\).*activate/);

console.log("PASS V406-R23 VERSIÓN VISIBLE · ACTUALIZACIÓN EXPLÍCITA");
