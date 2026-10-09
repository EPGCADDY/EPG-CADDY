import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const manual=fs.readFileSync("GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md","utf8");

assert.match(html,/async function autoCloseCompletedRound\(\)/);
assert.match(html,/queueMicrotask\(\(\)=>autoCloseCompletedRound\(\)\)/);
assert.match(html,/async function openFinalDigitalCardWithAutoClose\(\)/);
assert.match(html,/if\(!round\.provisional&&isRoundComplete\(\)&&!round\.officiallyClosedAt\)/);
assert.match(html,/\$\("finalCardButton"\)\.addEventListener\("click",openFinalDigitalCardWithAutoClose\)/);
assert.match(html,/closeButton\.hidden=complete\|\|!!round\.officiallyClosedAt/);
assert.match(html,/navigator\.share\(payload\)/);
for(const label of ["STABLEFORD","MATCH PLAY","FOUR BALL","UNIVERSALES","MEDAL PLAY"]) assert.ok(html.includes(label),label);
for(const label of ["Medal Play","Stableford","Match Play","Four Ball","Universales","Skins","Wolf","Vegas","Dots"]) assert.ok(manual.includes(label),label);
assert.ok(manual.includes("selección múltiple de tres destinatarios"));
console.log("PASS all official cards: direct final share + native WhatsApp contract documented");
