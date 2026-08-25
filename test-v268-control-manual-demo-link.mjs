import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

// V268 fue sustituida por V269 cuando la demostración incorporó Ronda previa.
// Esta prueba histórica evita que vuelvan a publicarse enlaces o llaves obsoletas.
assert.doesNotMatch(html,/V268-CONTROL-MANUAL-DEMO-20260823/);
assert.doesNotMatch(html,/demo_control_manual"\)==="v268"/);
assert.doesNotMatch(html,/golf-score-card-guatemala-demo-control-manual-v268/);
assert.doesNotMatch(html,/demo-control-manual-v268/);

assert.match(html,/<meta name="gscg-demo-link" content="V269-OPERATIONAL-MATRIX-DEMO-20260823">/);
assert.match(html,/const demoControlManual=startupParams\.get\("demo_control_manual"\)==="v269"/);
assert.match(html,/const DEMO_CONTROL_MANUAL_KEY="golf-score-card-guatemala-demo-control-manual-v269"/);
assert.match(html,/function controlManualDemoRound\(/);
assert.match(html,/demo-control-manual-previous-v269/);
assert.match(html,/demo-control-manual-current-v269/);

console.log("PASS V268 RETIRADA · enlace y almacenamiento sustituidos por V269");
