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
  ["BIBLIOTECA","openCardLibrarySetup","openCardLibraryStableford"]
];
const sharedInstructions=["REGISTRO DE JUGADORES","DICTA O ESCRIBE:","1-NOMBRE","2-HDCP","3-MARCAS","DE CADA JUGADOR","4-OK"];
const microphonePath='M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21H8v2h8v-2h-3v-3.08A7 7 0 0 0 19 11h-2Z';

assert.ok(style,"Falta el sistema visual V304");
assert.match(style,/#setupStep1>\.nr-button,[\s\S]*?#stablefordSetupOverlay \.stableford-setup-card>\.nr-button/);
assert.match(style,/font-family:Arial,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important/);
assert.match(style,/font-size:18px!important/);
assert.match(style,/font-weight:900!important/);
assert.match(style,/#setupOk,[\s\S]*?#startStablefordRound\{[\s\S]*?height:72px!important/);
assert.match(style,/#startStablefordRound:disabled\{[\s\S]*?border:2px solid var\(--lime\)!important[\s\S]*?background:#081d04!important[\s\S]*?color:var\(--lime\)!important[\s\S]*?opacity:1!important/);
assert.match(style,/@media\(max-width:800px\)\{[\s\S]*?font-size:14px!important[\s\S]*?#setupOk,[\s\S]*?#startStablefordRound\{[\s\S]*?height:64px!important/);
assert.doesNotMatch(style,/color:#737778/);
assert.match(html,/<style id="gscg-registration-actions-v304">[\s\S]*?<\/style>\s*<\/head>/,"El contrato hermano debe ser la última regla visual del encabezado");
for(const [expected,generalId,stablefordId] of sharedVocabulary){
  assert.equal(buttonText(html,generalId),expected,`${generalId} debe usar vocabulario hermano`);
  assert.equal(buttonText(html,stablefordId),expected,`${stablefordId} debe usar vocabulario hermano`);
}
for(const text of sharedInstructions){
  assert.ok(html.includes(text),`General perdió la instrucción hermana: ${text}`);
  assert.ok(stable.includes(text),`Stableford perdió la instrucción hermana: ${text}`);
}
assert.ok(html.includes(microphonePath),"General perdió el SVG oficial del micrófono");
assert.ok(stable.includes(microphonePath),"Stableford perdió el SVG oficial del micrófono");
assert.match(html,/id="setupMicWrap"[\s\S]*?class="setup-mic-icon"/);
assert.match(stable,/id="stablefordSetupMicWrap"[\s\S]*?class="setup-mic-icon"/);
assert.match(html,/\.registration-method \.nr-mic\{width:120px;height:120px;/);
assert.match(html,/\.registration-method \.nr-mic\{width:112px;height:112px;/);
assert.equal(release.buildNumber,304);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v304"/);

console.log("PASS V304 · filtro hermano: vocabulario, guía, micrófono, tipografía, tamaño, brillo y estados");
