import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/V273-SAN-ISIDRO-ALTA-VISTA-OFFICIAL-20260823/);
assert.match(html,/for\(let i=0;i<6;i\+\+\)/);
assert.match(html,/data-draft-name=/);
assert.match(html,/data-draft-hcp=/);
assert.match(html,/data-draft-tee=/);
assert.match(html,/<option value="" \$\{staged\.tee\?"":"selected"\}>SELECCIONA<\/option>/);
assert.doesNotMatch(html,/draft-empty-label">DISPONIBLE/);
assert.match(html,/function syncDraftPlayersFromManualRows/);
assert.match(html,/<div class="registration-method-title">1 · DICTADO<\/div>/);
assert.match(html,/<div class="registration-method-action">CLICK MICRÓFONO<\/div>/);
assert.match(html,/<div class="registration-method-title">2 · MANUAL OPCIONAL<\/div>/);
assert.equal((html.match(/<div class="registration-method-fields">NOMBRE \+ HDCP \+ MARCAS<\/div>/g)||[]).length,2);
assert.doesNotMatch(html,/data-draft-code=/);
assert.doesNotMatch(html,/data-draft-whatsapp=/);
assert.doesNotMatch(html,/id="openShareProject"/);
assert.doesNotMatch(html,/id="shareProjectPanel"/);
assert.doesNotMatch(html,/>CÓDIGO<\/span>/);
assert.doesNotMatch(html,/WHATSAPP OPCIONAL/);
assert.doesNotMatch(html,/NO SE RECONOCIÓ · DICTA NOMBRE, HDCP Y MARCAS/);
assert.match(html,/target\.textContent="ERROR"/);

console.log("PASS V262 · registro oficial limitado a Dictado o Manual Opcional: Nombre, HDCP y Marcas");
