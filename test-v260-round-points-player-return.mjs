import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V261-REGISTRATION-SIMPLIFIED-STABLEFORD-LABELS-20260822/);

// El nombre aprobado reemplaza completamente los títulos anteriores en la interfaz.
assert.match(html,/id="stablefordRoundPointsTitle"[^>]*>STABLEFORD</);
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

// La flecha queda elevada y ya no tapa TARJETA DIGITAL ni su leyenda.
assert.match(html,/\.back-registration-control\{left:18px;bottom:96px;font-size:7px\}/);

// General y Stableford conservan estados separados: un enlace limpio nunca restaura Stableford.
assert.match(html,/let round=sfEmergency\?blankRound\(\):loadRound\(\)/);
assert.match(html,/if\(primary&&primary\.mode!=="stableford"\)return primary/);
assert.match(html,/if\(backup&&backup\.mode!=="stableford"\)/);
assert.match(html,/readRoundArchive\(\)\.filter\(value=>value\.mode!=="stableford"\)/);
assert.match(html,/if\(round\.mode==="stableford"\)localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,payload\)/);
assert.match(html,/try\{localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)\}catch\{\}/);
assert.doesNotMatch(html,/localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\);localStorage\.removeItem\(STORAGE_KEY\)/);

console.log("PASS V260/V261 · STABLEFORD, anchos, total neón, alta segura y rutas General/Stableford aisladas");
