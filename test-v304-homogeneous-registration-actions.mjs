import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const stable=fs.readFileSync("stableford.js","utf8");
const release=JSON.parse(fs.readFileSync("mobile-release.json","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

const style=html.match(/<style id="gscg-registration-actions-v304">([\s\S]*?)<\/style>/)?.[1]||"";
const buttonText=(source,id)=>source.match(new RegExp(`id="${id}"[^>]*>([^<]+)<\\/button>`))?.[1]?.trim()||"";
const sharedVocabulary=[
  ["OK","setupOk","startStablefordRound"],
  ["RONDA PREVIA","previousRoundSetupButton","previousStablefordRoundButton"],
  ["HISTORIAL","openCardLibrarySetup","openCardLibraryStableford"]
];
const sharedInstructions=["REGISTRO DE JUGADORES"];
const generalInstructions=["JUGADOR NÚMERO UNO · MIGUEL · HANDICAP 14 · MARCAS BLANCAS","JUGADOR NÚMERO DOS · NOMBRE + HANDICAP + MARCAS","HASTA 6 JUGADORES","LUEGO TOCA OK"];
const stablefordInstructions=["SELECCIONA CATEGORÍA","CAMPEONATO · NEGRAS","A · AZULES","B · BLANCAS","C · BLANCAS","D · BLANCAS","SENIOR · BLANCAS","SUPER SENIOR · AMARILLAS","FEMENINA · ROJAS"];
const microphonePath='M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21H8v2h8v-2h-3v-3.08A7 7 0 0 0 19 11h-2Z';

assert.ok(style,"Falta el sistema visual V304");
assert.match(style,/#setupStep1>\.nr-button,[\s\S]*?#stablefordSetupOverlay \.stableford-setup-card>\.nr-button/);
assert.match(style,/font-family:Arial,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important/);
assert.match(style,/font-size:18px!important/);
assert.match(style,/font-weight:900!important/);
assert.match(style,/#setupOk,[\s\S]*?#startStablefordRound\{[\s\S]*?height:72px!important/);
assert.match(style,/#setupOk:disabled,[\s\S]*?#startStablefordRound:disabled\{[\s\S]*?border:2px solid var\(--lime\)!important[\s\S]*?background:#081d04!important[\s\S]*?color:var\(--lime\)!important[\s\S]*?opacity:1!important/);
assert.match(style,/@media\(max-width:800px\)\{[\s\S]*?font-size:14px!important[\s\S]*?#setupOk,[\s\S]*?#startStablefordRound\{[\s\S]*?height:64px!important/);
assert.doesNotMatch(style,/color:#737778/);
assert.match(html,/<style id="gscg-registration-actions-v304">[\s\S]*?<\/style>\s*<style id="gscg-navigation-homogeneity-v305">/,"El contrato hermano debe conservar prioridad antes del filtro V305");
for(const [expected,generalId,stablefordId] of sharedVocabulary){
  assert.equal(buttonText(html,generalId),expected,`${generalId} debe usar vocabulario hermano`);
  assert.equal(buttonText(html,stablefordId),expected,`${stablefordId} debe usar vocabulario hermano`);
}
for(const text of sharedInstructions)assert.ok(html.includes(text),`General perdió la instrucción vigente: ${text}`);
for(const text of generalInstructions)assert.ok(html.includes(text),`General perdió su ejemplo operativo: ${text}`);

for(const text of stablefordInstructions)assert.ok(html.includes(text)||stable.includes(text),`Stableford perdió la interfaz vigente: ${text}`);
assert.match(html,/id="backStablefordSetup"[^>]*>ATRÁS<\/button>/);
assert.match(html,/id="startStablefordRound"[^>]*>OK<\/button>/);
assert.match(html,/id="previousStablefordRoundButton"[^>]*>RONDA PREVIA<\/button>/);
assert.match(html,/id="openCardLibraryStableford"[^>]*>HISTORIAL<\/button>/);
assert.equal(release.buildNumber,307);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v\d{3}[^"]*"/);

console.log("PASS V304 · registro vigente: vocabulario, categorías, navegación, tipografía, tamaño, brillo y estados");
