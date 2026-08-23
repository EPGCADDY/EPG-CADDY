import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/\.account-backup-button\{position:fixed;/);
assert.match(html,/body\.stableford-mode \.account-backup-button\{position:static;display:block;width:max-content;/);
assert.match(html,/<div class="back-registration-control"><button class="back-registration-button" id="backToRegistrationButton"[\s\S]*?>ATRÁS<\/button><button class="back-registration-button add-player-button/);
assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

console.log("PASS V287 · RESPALDO no traslapa ATRÁS ni + JUGADOR en Stableford");
