import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const registry=fs.readFileSync(new URL("./player-registry.js",import.meta.url),"utf8");

assert.match(html,/V(?:255-PLAYER-REGISTRATION-BOXES-CODES|256-MASTER-DATA-PLATFORM|257-STABLEFORD-COURSE-SELECTOR-TITLE|258-STABLEFORD-READONLY-MANUAL-PLAN-B|259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS)-20260822/);
assert.match(html,/for\(let i=0;i<6;i\+\+\)/);
assert.match(html,/data-draft-code=/);
assert.match(html,/staged\.registrationCode&&staged\.name\?"readonly":""/);
assert.match(html,/data-draft-name=/);
assert.match(html,/data-draft-hcp=/);
assert.match(html,/data-draft-tee=/);
assert.match(html,/data-draft-whatsapp=/);
assert.match(html,/<option value="" \$\{staged\.tee\?"":"selected"\}>SELECCIONA<\/option>/);
assert.doesNotMatch(html,/draft-empty-label">DISPONIBLE/);
assert.match(html,/function syncDraftPlayersFromManualRows/);
assert.match(html,/function restoreManualDraftByCode/);
assert.match(html,/PERFIL \$\{code\} RECUPERADO/);
assert.match(html,/id="openShareProject">COMPARTIR<\/button>/);
for(const label of ["PERFIL Y CÓDIGO","MARCAS Y HDCP ACTUALES","ÚLTIMA RONDA","ÚLTIMAS TRES RONDAS"]){assert.ok(html.includes(label),`Falta opción ${label}`)}
assert.match(html,/<button type="button" disabled>PROYECTO · AÚN NO DISPONIBLE<\/button>/);
assert.match(html,/NO SE RECONOCIÓ · DICTA NOMBRE, HDCP Y MARCAS/);
assert.match(registry,/const SCHEMA_VERSION=3/);
assert.match(registry,/function generateRegistrationCode/);
assert.match(registry,/profileHistory/);

console.log("PASS V255 · casillas manuales/dictado, selector de marcas, código, historial y proyecto COMPARTIR sin envío");
