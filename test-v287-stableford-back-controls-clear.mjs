import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.doesNotMatch(html,/\.account-backup-button\{position:fixed;/);
assert.match(html,/\.account-entry-control\{position:static;/);
assert.match(html,/id="accountBackupButtonStableford"[^>]*data-account-entry>REGÍSTRATE<\/button>/);
assert.match(html,/<div class="back-registration-control"><button class="back-registration-button" id="backToRegistrationButton"[\s\S]*?>ATRÁS<\/button><button class="back-registration-button add-player-button/);
assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

console.log("PASS V305 · REGÍSTRATE permanece en flujo y no traslapa ATRÁS ni + JUGADOR");
