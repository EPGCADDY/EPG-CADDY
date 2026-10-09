import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
assert.match(html,/body:has\(\.overlay\.visible\) \.mandatory-update,[\s\S]*?\{display:none!important\}/,"Los overlays deben ocultar el control global de actualización");
assert.match(html,/body\.gsc-setup-open:not\(\.gsc-history-open\):has\(#setupOverlay\.visible\) \.mandatory-update\{display:block!important\}/,"Registro no puede reactivar ACTUALIZAR encima de Historial");
assert.doesNotMatch(html,/body\.gsc-setup-open:has\(#setupOverlay\.visible\) \.mandatory-update\{display:block!important\}/,"La excepción antigua vuelve a causar el traslape físico");
console.log("PASS V407-R24B: Historial aísla ACTUALIZAR/ACTUALIZADO sin tapar ATRÁS");
