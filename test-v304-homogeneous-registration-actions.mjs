import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const stable=fs.readFileSync("stableford.js","utf8");
const release=JSON.parse(fs.readFileSync("mobile-release.json","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

const style=html.match(/<style id="gscg-registration-actions-v304">([\s\S]*?)<\/style>/)?.[1]||"";
const buttonText=(source,id)=>source.match(new RegExp(`id="${id}"[^>]*>([^<]+)<\\/button>`))?.[1]?.trim()||"";
const sharedVocabulary=[
  ["VER RONDA ANTERIOR","previousRoundSetupButton","previousStablefordRoundButton"],
  ["VER RONDAS GUARDADAS","openCardLibrarySetup","openCardLibraryStableford"]
];
const primaryVocabulary=[
  ["REVISAR DATOS","setupOk"],
  ["INICIAR RONDA","startStablefordRound"]
];
const sharedInstructions=["REGISTRO DE JUGADORES"];
const generalInstructions=["REGISTRO DE JUGADORES","COMPLETA LOS DATOS DE CADA JUGADOR","DATOS DE LOS JUGADORES","NOMBRE + CATEGORÍA + HDCP + MARCAS + WHATSAPP OPCIONAL"];
const stablefordInstructions=["SELECCIONA CATEGORÍA","CAMPEONATO · NEGRAS","A · AZULES","B · BLANCAS","C · BLANCAS","D · BLANCAS","SENIOR · BLANCAS","SUPER SENIOR · AMARILLAS","FEMENINA · ROJAS"];

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
for(const [expected,id] of primaryVocabulary){
  assert.equal(buttonText(html,id),expected,`${id} debe conservar el vocabulario vigente`);
}
for(const text of sharedInstructions)assert.ok(html.includes(text),`General perdió la instrucción vigente: ${text}`);
for(const text of generalInstructions)assert.ok(html.includes(text),`General perdió su ejemplo operativo: ${text}`);

for(const text of stablefordInstructions)assert.ok(html.includes(text)||stable.includes(text),`Stableford perdió la interfaz vigente: ${text}`);
assert.match(html,/id="backStablefordSetup"[^>]*>ATRÁS<\/button>/);
assert.match(html,/id="startStablefordRound"[^>]*>INICIAR RONDA<\/button>/);
assert.match(html,/id="previousStablefordRoundButton"[^>]*>VER RONDA ANTERIOR<\/button>/);
assert.match(html,/id="openCardLibraryStableford"[^>]*>VER RONDAS GUARDADAS<\/button>/);
assert.equal(release.buildNumber,307);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v\d{3}[^"]*"/);

console.log("PASS V304 · registro manual vigente: REVISAR DATOS + INICIAR RONDA + VER RONDA ANTERIOR + VER RONDAS GUARDADAS");
