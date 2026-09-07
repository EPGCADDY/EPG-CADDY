import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const hub=fs.readFileSync("live-hub.html","utf8");
const control=fs.readFileSync("live-control.js","utf8");
const hubJs=fs.readFileSync("live-hub.js","utf8");
const css=fs.readFileSync("gsc-design-system.css","utf8");

assert.match(html,/V406-R5-SIMPLE-TOURNAMENT-LIVE-20260907/);
assert.match(html,/id="tournamentLiveHome"[^>]*aria-label="Ver jugadores de un torneo en vivo"/);
assert.match(control,/const home=\$\("tournamentLiveHome"\);if\(home\)home\.onclick=\(\)=>openHub\(\)/);
assert.match(control,/id="liveOrganizerPanel"/);
assert.match(control,/organizer\.className="gsc-live-organizer-panel hidden"/);
assert.match(control,/viewer\.querySelector\("h2"\)\.textContent="VER TORNEO LIVE"/);
assert.match(hub,/BUSCA · ELIGE · MIRA/);
assert.match(hub,/id="hubTournamentEntry"/);
assert.match(hub,/id="hubTournamentLink"[^>]*placeholder="ENLACE DEL TORNEO"/);
assert.match(hub,/id="hubSearch"[^>]*placeholder="NOMBRE DEL JUGADOR"/);
assert.doesNotMatch(hub,/class="easy"/);
assert.match(hub,/<details class="viewer-tools"><summary>MÁS OPCIONES<\/summary>/);
assert.match(hub,/<details class="viewer-tools"><summary>AGREGAR JUGADOR EXTERNO<\/summary>/);
assert.match(hubJs,/async function openTournamentTyped\(\)/);
assert.match(hubJs,/access\.kind!=="general"/);
assert.match(hubJs,/hubTournamentEntry/);
assert.match(css,/\.viewer-entry\{/);
assert.match(css,/\.viewer-tools summary\{/);

console.log("PASS V406-R5 · entrada infantil directa y administración oculta sin retirar funciones");
