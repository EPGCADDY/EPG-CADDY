import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

// El nombre aprobado reemplaza completamente los títulos anteriores en la interfaz.
assert.match(html,/id="roundManualTitle"[^>]*>CONTROL MANUAL · \$\{stable\?"STABLEFORD":"GENERAL"\}/);
assert.doesNotMatch(html,/>ANOTACIÓN MANUAL · PLAN B</);
assert.doesNotMatch(html,/>SCORE MANUAL</);

// La columna del nombre crece de 82 px a 103 px (+25.6%) y los tres acumulados se angostan.
assert.match(html,/grid-template-columns:103px 72px 72px \.65fr \.65fr \.75fr/);

// En el resumen inferior sólo la última columna PUNTOS TOTAL usa verde neón.
assert.match(html,/class="stableford-points-total">\$\{t\.count\?t\.points:""\}<\/td>/);
assert.match(html,/body\.stableford-mode \.summary \.stableford-points-total\{color:var\(--lime\);font-weight:900/);

// Regresar a datos permite agregar un jugador sin reemplazar los scores existentes.
assert.match(html,/function openStablefordDataEditor\(\)/);
assert.match(html,/inputs\.forEach\(\(input,i\)=>input\.value=round\.players\[i\]\?\.name\|\|""\)/);
assert.match(html,/stablefordSetupMode==="edit"&&isStablefordRound\(\)/);
assert.match(html,/holes:previous\[i\]\?\.holes\|\|\{\}/);
assert.match(html,/names\.slice\(0,6\)/);

// ATRÁS queda pequeño y en el flujo; nunca tapa la tarjeta ni sus resultados.
assert.match(html,/\.back-registration-control\{position:static;/);
assert.match(html,/>ATRÁS<\/button>/);
assert.doesNotMatch(html,/\.back-registration-control\{position:fixed;/);

// General y Stableford usan una sola política con filtro de modalidad: comparten arquitectura, nunca mezclan rondas.
assert.match(html,/function latestStoredRound\(modeHint\)/);
assert.match(html,/let round=sfEmergency\?\(latestStoredRound\("stableford"\)\|\|blankRound\(\)\):demoControlManual\?\(readStoredRound\(DEMO_CONTROL_MANUAL_KEY\)\|\|blankRound\(\)\):loadRound\(\)/);
assert.match(html,/stableford=readStoredRound\(STABLEFORD_ACTIVE_KEY\)/);
assert.match(html,/\[primary,backup,stableford\]\.filter\(value=>value\?\.configured&&mode\(value\)===modeHint\)\.sort/);
assert.match(html,/readRoundArchive\(\)\.filter\(value=>value\?\.configured&&mode\(value\)===modeHint\)\.sort/);
assert.match(html,/function loadRound\(\)\{return latestStoredRound\("general"\)\|\|blankRound\(\)\}/);
assert.match(html,/if\(round\.mode==="stableford"\)localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,payload\)/);
assert.match(html,/function openFreshStablefordSetup\(\)[\s\S]*?localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,JSON\.stringify\(round\)\)/);
assert.doesNotMatch(html,/function openFreshStablefordSetup\(\)[\s\S]*?localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\);localStorage\.removeItem\(STORAGE_KEY\)/);

console.log("PASS V260/V267 · STABLEFORD, anchos, total neón, alta segura y recuperación única sin mezclar modalidades");
