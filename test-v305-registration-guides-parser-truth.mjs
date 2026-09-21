import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

for(const text of [
  "REGISTRO DE JUGADORES",
  "COMPLETA LOS DATOS DE CADA JUGADOR",
  "DATOS DE LOS JUGADORES",
  "NOMBRE + CATEGORÍA + HDCP + MARCAS + WHATSAPP OPCIONAL"
]) assert.ok(html.includes(text),`Falta Registro General vigente: ${text}`);

assert.doesNotMatch(html,/DICTA ASÍ:/,"El Registro General LAB no debe mostrar guía de dictado retirada");
assert.doesNotMatch(stable,/DICTA ASÍ:/,"Stableford LAB no debe mostrar guía de dictado retirada");
assert.doesNotMatch(stable,/stablefordSetupMicWrap/,"Stableford LAB no debe reinsertar micrófono retirado");
assert.doesNotMatch(stable,/stablefordParseSetupTranscript/,"Stableford LAB no debe reinsertar parser de voz retirado");

const expectedCategories=[
  ["championship","CAMPEONATO · NEGRAS"],
  ["a","A · AZULES"],
  ["b","B · BLANCAS"],
  ["c","C · BLANCAS"],
  ["d","D · BLANCAS"],
  ["senior","SENIOR · BLANCAS"],
  ["super_senior","SUPER SENIOR · AMARILLAS"],
  ["female","FEMENINA · ROJAS"]
];
for(const [key,label] of expectedCategories){
  assert.match(html,new RegExp(`data-stableford-category="${key}"[^>]*>${label}`),`Falta categoría Stableford ${label}`);
}
assert.match(stable,/championship:Object\.freeze\(\{key:"championship",label:"CAMPEONATO",handicap:0,tee:"Negro"/);
assert.match(stable,/female:Object\.freeze\(\{key:"female",label:"FEMENINA",handicap:0,tee:"Rojo"/);

for(const [id,label] of [
  ["backStablefordSetup","ATRÁS"],
  ["startStablefordRound","OK"],
  ["previousStablefordRoundButton","RONDA PREVIA"],
  ["openCardLibraryStableford","HISTORIAL"]
]) assert.match(html,new RegExp(`id="${id}"[^>]*>${label}<\\/button>`),`Falta control Stableford ${label}`);

for(const id of ["setupOk","startStablefordRound"]){
  assert.match(html,new RegExp(`id="${id}"`),`Falta control ${id}`);
}
assert.match(html,/#setupOk:disabled,[\s\S]*?#startStablefordRound:disabled\{/);

console.log("PASS V305 LAB · registro manual visible, ocho categorías Stableford, navegación y sin guía de voz retirada");
