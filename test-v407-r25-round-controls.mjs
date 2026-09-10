import assert from "node:assert/strict";
import fs from "node:fs";
import registry from "./player-registry.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/id="clearScoresOnly"[^>]*>BORRAR SCORES</);
assert.match(html,/id="clearRoundScores"[^>]*>BORRAR TODO</);
assert.match(html,/function clearOnlyRoundScores\(\)[\s\S]*player\.holes=\{\}[\s\S]*JUGADORES Y RONDA CONSERVADOS/);
assert.match(html,/id="resetClockButton"[^>]*>RESET</);
assert.match(html,/function resetRoundClock\(\)[\s\S]*createdAt=now[\s\S]*00:00:00/);
assert.match(html,/function normalizeHandicapValue\(value,fallback=0\)[\s\S]*Number\.isSafeInteger/);
assert.match(html,/if\(h>=0\)[\s\S]*return-\(base/);
assert.doesNotMatch(html,/data-draft-hcp[^>]*(?:min="0"|max="54")/);
assert.match(html,/function captureVisibleRegistrationValues\(\)[\s\S]*data-draft-name[\s\S]*data-draft-whatsapp/);
assert.match(html,/autocomplete="name"/);
assert.match(html,/autocomplete="tel-national"/);
for(const handicap of [-73,-3,-2,-1,0,54,73])assert.equal(registry.normalizeHandicap(handicap),handicap);
assert.match(worker,/V407-R28-PULTE-HANDICAP-HOTFIX-20260910/);
assert.match(html,/captureVisibleRegistrationValues\(\);syncDraftPlayersFromManualRows\(\{strict:false,renderAfter:false\}\);persistDraftState\(\)/);
assert.doesNotMatch(html,/hcp<0\|\|hcp>54/);
assert.match(html,/\$\("setupOk"\)\.addEventListener\("click",[\s\S]*?resetSetupCapture\(\);renderDraft\(\);showStep2\(\);speakSetupConfirmation\(\)/);
assert.doesNotMatch(html,/\$\("setupOk"\)\.addEventListener\("click",[\s\S]{0,400}?requestSetupFinalize\(\)/);
console.log("PASS V407 R25 · borrados separados, handicap entero firmado, reset de cronómetro y autocompletado iPhone");
