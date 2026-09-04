import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);

// Campo y modalidad son decisiones distintas en la Tarjeta Oficial.
assert.match(html,/<div class="field-title course-selection-title">SELECCIONA CAMPO<\/div><div class="course-options" id="courseOptions"/);
assert.match(html,/<div class="field-title">SELECCIONA MODALIDAD<\/div>/);
assert.match(html,/id="normalRoundButton"[^>]*>[\s\S]*?<span>RONDA NORMAL<\/span>/);
assert.match(html,/<div class="stableford-mode-option" id="stablefordModeOption"><\/div>/);
assert.match(html,/\$\("courseOptions"\)\.innerHTML=Object\.entries\(COURSE_CATALOG\)[\s\S]*?\.join\(""\);\$\("stablefordModeOption"\)\.innerHTML=stableOption/);
assert.match(html,/aria-label="Seleccionar modalidad Stableford"/);

// Stableford permanece neutral en General y sólo se marca dentro de su propio registro.
const neutralRule=html.match(/\.stable-course-option\{[^}]+\}/)?.[0]||"";
assert.match(neutralRule,/color:#fff/);
assert.match(neutralRule,/border:1px solid #4b4f50/);
assert.doesNotMatch(neutralRule,/color:var\(--lime\)/);
assert.doesNotMatch(neutralRule,/background:var\(--lime\)/);
const neutralDot=html.match(/\.stable-course-dot\{display:grid;[^}]+\}/)?.[0]||"";
assert.match(neutralDot,/background:transparent/);
assert.doesNotMatch(neutralDot,/background:var\(--lime\)/);

// El registro oficial contiene exactamente las dos vías autorizadas.
assert.match(html,/class="newbie-guide-title">DICTA ASÍ:<\/div>/);
assert.match(html,/<div>MIGUEL · 14 · BLANCAS<\/div>[\s\S]*?<div>LUEGO TOCA OK<\/div>/);
assert.match(html,/>2 · MANUAL OPCIONAL<\/div>/);
assert.match(html,/<section class="game-mode-column" aria-label="Modalidades existentes">[\s\S]*?<div class="stableford-mode-option" id="stablefordModeOption"><\/div>\s*<div class="provisional-mode-option"><button[^>]+id="provisionalScorecardButton"[^>]*>[\s\S]*?SCORE CARD - PRÁCTICA[\s\S]*?<\/button><\/div>[\s\S]*?<section class="skins-config" id="skinsConfig"[\s\S]*?<div class="setup-facts"/);
assert.equal((html.match(/id="provisionalScorecardButton"/g)||[]).length,1);
assert.doesNotMatch(html,/class="provisional-entry"|class="provisional-entry-button"/);
assert.equal((html.match(/>NOMBRE \+ HDCP \+ MARCAS<\/div>/g)||[]).length,1);
assert.doesNotMatch(html,/data-draft-code=/);
assert.match(html,/data-draft-whatsapp=/);
assert.match(html,/data-stableford-whatsapp=/);
assert.match(html,/data-stableford-whatsapp-country=/);
assert.doesNotMatch(html,/AUTORIZA RECIBIR TARJETA/);
assert.doesNotMatch(html,/id="openShareProject"|id="shareProjectPanel"/);

// Nombres autorizados dentro de Stableford dentro del control operacional común.
assert.match(html,/id="roundManualTitle"[^>]*>CONTROL MANUAL · \$\{stable\?"STABLEFORD":"GENERAL"\}<\/div>/);
assert.match(html,/\$\("summaryTitle"\)\.textContent="PUNTOS"/);
assert.match(html,/\$\("finalSummaryTitle"\)\.textContent=isStablefordRound\(\)\?"PUNTOS":isMatchPlayRound\(\)\?"RESULTADO MATCH PLAY":"INFORMACIÓN DE RONDA"/);

console.log("PASS V262 · campo separado, modalidad Stableford neutral y registro Dictado/Manual Opcional depurado");
