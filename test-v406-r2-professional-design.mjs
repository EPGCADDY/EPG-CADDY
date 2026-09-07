import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const hub=fs.readFileSync("live-hub.html","utf8");
const css=fs.readFileSync("gsc-design-system.css","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/V406-R4-MOBILE-CONTROLS-20260907/);
assert.doesNotMatch(html,/href="\/gsc-design-system\.css"/,"Registro no debe depender de una hoja de sobreescritura externa");
assert.match(hub,/href="\/gsc-design-system\.css"/);
assert.match(worker,/v406-r4-mobile-controls/);
assert.match(worker,/"\/gsc-design-system\.css"/);
assert.doesNotMatch(hub,/<style[\s>]/,"TORNEO LIVE debe tener una sola hoja CSS canónica");
assert.doesNotMatch(css,/!important/,"el sistema visual canónico no acepta parches !important");
assert.match(css,/--control-compact:44px/);
assert.match(css,/\.easy\{display:none\}/);
assert.match(html,/grid-template-areas:"slot name category" "\. hcp tee"/);
assert.match(html,/\.new-round-card \.draft-name-input,\.new-round-card \.draft-category-select,\.new-round-card \.draft-hcp-input,\.new-round-card \.draft-tee-select\{[^}]*height:48px[^}]*font-size:16px/);
const registrationBlock=html.slice(html.indexOf("/* V262:"),html.indexOf("</style>",html.indexOf("/* V262:")));
assert.doesNotMatch(registrationBlock,/\.draft-edit-row\{[^}]*!important/,"Registro no acepta una retícula remendada");

console.log("PASS V406-R2 · CSS canónico LIVE, Registro móvil consolidado y Torneo Live simplificado");
