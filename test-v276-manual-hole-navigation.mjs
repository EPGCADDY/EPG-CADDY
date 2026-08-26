import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V330-SIDE-GAMES-20260826"/);
assert.match(html,/V276-PREVIOUS-DIRECT-NEXT-20260823/);
assert.match(html,/appVersion:"V307"/);

const start=html.indexOf("function roundManualHoleNavigation");
const end=html.indexOf("\nfunction roundGridStatus",start);
assert.ok(start>0&&end>start,"No se encontró la navegación manual común");
const navigation=new Function("ALL",`${html.slice(start,end)};return roundManualHoleNavigation`)(Array.from({length:18},(_,index)=>index+1));

const first=navigation(1,false);
assert.match(first,/>ANTERIOR<\/button>/);
assert.match(first,/id="roundGridHole"/);
assert.match(first,/>SIGUIENTE<\/button>/);
assert.match(first,/id="roundGridPrevious"[^>]*disabled/);
assert.doesNotMatch(first,/id="roundGridNext"[^>]*disabled/);

const middle=navigation(9,false);
assert.match(middle,/<option value="9" selected>9<\/option>/);
assert.doesNotMatch(middle,/id="roundGridPrevious"[^>]*disabled/);
assert.doesNotMatch(middle,/id="roundGridNext"[^>]*disabled/);

const last=navigation(18,false);
assert.doesNotMatch(last,/id="roundGridPrevious"[^>]*disabled/);
assert.match(last,/id="roundGridNext"[^>]*disabled/);

const locked=navigation(7,true);
assert.match(locked,/id="roundGridPrevious"[^>]*disabled/);
assert.match(locked,/id="roundGridHole"[^>]*disabled/);
assert.match(locked,/id="roundGridNext"[^>]*disabled/);

assert.match(html,/const manualGridDirty=/);
assert.match(html,/PRESIONA ENTER ANTES DE CAMBIAR DE HOYO/);
assert.match(html,/clearOperationalMissingPrompt\(\);manual\.dataset\.hole=String\(next\);render\(\)/);
assert.match(html,/roundGridPrevious"\)\.onclick=\(\)=>navigateManualHole\(selectedHole-1\)/);
assert.match(html,/roundGridNext"\)\.onclick=\(\)=>navigateManualHole\(selectedHole\+1\)/);
assert.match(html,/const saveManualHole=.*applyManualScoreEntries\(entries\)/s,"ENTER debe conservar el escritor operacional único");

console.log("PASS V276 · ANTERIOR, selección directa y SIGUIENTE comparten Control Manual General/Stableford");
