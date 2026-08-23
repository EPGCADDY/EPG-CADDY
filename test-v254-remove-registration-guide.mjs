import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V280-LOCAL-HISTORY-INSIGHTS-20260823/);
assert.match(html,/<div class="voice-prompt"><strong id="playerVoicePrompt">REGISTRO DE JUGADORES<\/strong><\/div>/);
assert.doesNotMatch(html,/player-registration-guide/);
assert.doesNotMatch(html,/1- NOMBRE \/ HDCP - MARCAS - TEES/);
assert.doesNotMatch(html,/2- NOMBRE \/ HDCP - MARCAS - TEES/);
assert.doesNotMatch(html,/3- HASTA 6 JUGADORES/);
assert.match(html,/2 · MANUAL OPCIONAL/);
assert.match(html,/id="detectedPlayers"/);
assert.match(html,/id="setupMicWrap"/);
assert.match(html,/id="setupOk">OK<\/button>/);
assert.match(html,/id="startRoundButton">INICIAR RONDA<\/button>/);

console.log("PASS V254 · eliminadas únicamente las tres falsas casillas de registro");
