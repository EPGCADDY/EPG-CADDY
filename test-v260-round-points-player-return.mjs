import assert from "node:assert/strict";
import fs from "node:fs";
// R24: la lista enriquecida mantiene el límite operativo de seis jugadores.

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

// El nombre aprobado reemplaza completamente los títulos anteriores en la interfaz.
assert.match(html,/id="roundManualTitle"[^>]*>CONTROL MANUAL · \$\{stable\?"STABLEFORD":"GENERAL"\}/);
assert.doesNotMatch(html,/>ANOTACIÓN MANUAL · PLAN B</);
assert.doesNotMatch(html,/>SCORE MANUAL</);

// La retícula conserva seis columnas y permite que nombre, score y acumulados respiren sin desbordar móvil.
assert.match(html,/\.round-player-grid\{display:grid!important;grid-template-columns:minmax\(116px,1\.3fr\) 72px minmax\(88px,1fr\) repeat\(3,minmax\(76px,\.8fr\)\)!important/);
assert.match(html,/@media\(max-width:800px\)[\s\S]*\.round-player-grid\{min-width:0!important;grid-template-columns:minmax\(70px,1\.2fr\) 36px minmax\(58px,1fr\) repeat\(3,minmax\(40px,\.72fr\)\)!important/);

// En el resumen inferior sólo la última columna PUNTOS TOTAL usa verde neón.
assert.match(html,/class="stableford-points-total">\$\{t\.count\?t\.points:""\}<\/td>/);
assert.match(html,/body\.stableford-mode \.summary \.stableford-points-total\{color:var\(--lime\);font-weight:900/);

// Regresar a datos permite agregar un jugador sin reemplazar los scores existentes.
assert.match(html,/function openStablefordDataEditor\(\)/);
assert.match(html,/inputs\.forEach\(\(input,i\)=>input\.value=round\.players\[i\]\?\.name\|\|""\)/);
assert.match(html,/stablefordSetupMode==="edit"&&isStablefordRound\(\)/);
assert.match(html,/holes:previous\[i\]\?\.holes\|\|\{\}/);
assert.match(html,/entries\.slice\(0,6\)/);

// ATRÁS queda pequeño y en el flujo; nunca tapa la tarjeta ni sus resultados.
assert.match(html,/\.round-secondary-actions\{position:static;/);
assert.match(html,/>ATRÁS<\/button>/);
assert.doesNotMatch(html,/\.round-secondary-actions\{position:fixed;/);

// General y Stableford usan una sola política con filtro de modalidad: comparten arquitectura, nunca mezclan rondas.
assert.match(html,/function latestStoredRound\(modeHint\)/);
assert.match(html,/let round=sfEmergency\?\(latestStoredRound\("stableford"\)\|\|blankRound\(\)\):demoControlManual\?\(readStoredRound\(DEMO_CONTROL_MANUAL_KEY\)\|\|blankRound\(\)\):loadRound\(\)/);
assert.match(html,/stableford=readStoredRound\(STABLEFORD_ACTIVE_KEY\)/);
assert.match(html,/\[primary,backup,stableford,matchPlay,fourBall\]\.filter\(value=>isRecoverableStoredRound\(value,modeHint\)\)\.sort/);
assert.match(html,/readRoundArchive\(\)\.filter\(value=>isRecoverableStoredRound\(value,modeHint\)\)\.sort/);
assert.match(html,/const ACTIVE_ROUND_KEY="golf-score-card-guatemala-active-round-v1"/);
assert.match(html,/function loadRound\(\)\{[\s\S]*?const canonical=readStoredRound\(ACTIVE_ROUND_KEY\)[\s\S]*?return canonical/);
assert.match(html,/const candidates=\[latestStoredRound\("general"\),latestStoredRound\("stableford"\),latestStoredRound\("match_play"\),latestStoredRound\("four_ball"\)\]/);
assert.match(html,/localStorage\.setItem\(ACTIVE_ROUND_KEY,JSON\.stringify\(migrated\)\)/);
assert.match(html,/localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
assert.match(html,/if\(round\.mode==="stableford"\)localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,payload\)/);
assert.match(html,/function openFreshStablefordSetup\(\)[\s\S]*?localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,JSON\.stringify\(round\)\)/);
assert.doesNotMatch(html,/function openFreshStablefordSetup\(\)[\s\S]*?localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\);localStorage\.removeItem\(STORAGE_KEY\)/);

console.log("PASS V260/V267 · STABLEFORD, anchos, total neón, alta segura y recuperación única sin mezclar modalidades");
