import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/id="mandatoryUpdateAction">ACTUALIZADO<\/span>/);
assert.match(html,/class="update-version-id" id="appVersionId">V406 · R25<\/span><button type="button" id="mandatoryUpdateButton"/);
assert.match(html,/\.mandatory-update-card\{display:flex;flex-direction:column;align-items:center\}/);
assert.match(html,/\.update-version-id\{[^}]*color:#fff/);
assert.match(html,/mandatoryUpdateAction"\)\.textContent="ACTUALIZAR"/);
assert.match(html,/nextUrl\.searchParams\.set\("app_version",pendingPublishedBuild\)/);
assert.match(worker,/if\(url\.searchParams\.get\("app_version"\)===RELEASE\)\{await promoteCandidate\(\)/);
assert.doesNotMatch(worker,/promoteCandidate\(\).*activate/);

assert.match(html,/@media\(max-width:800px\)\{\.official-round-header #timeText\{display:none!important\}\}/);

console.log("PASS V406-R25 ID SOBRE ACTUALIZAR · ENCABEZADO MÓVIL SIN HORA DUPLICADA");
