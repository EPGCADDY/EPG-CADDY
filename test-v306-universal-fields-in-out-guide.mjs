import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const stableford=require("./stableford.js");
const html=fs.readFileSync("index-grupal.html","utf8");
const legacy=fs.readFileSync("stableford-torneo.html","utf8");
const artifacts=fs.readFileSync("card-artifacts.js","utf8");
const guide=fs.readFileSync("docs/GUIA_OPERATIVA_GOLF_SCORE_CARD_GT_V1.md","utf8");
const compendium=fs.readFileSync("COMPENDIO_FINAL_FUNCIONES_USUARIO.md","utf8");
const builder=fs.readFileSync("tools/build_operational_guide_v1.py","utf8");
const release=JSON.parse(fs.readFileSync("mobile-release.json","utf8"));
const worker=fs.readFileSync("service-worker.js","utf8");

const fields=["pulte","country_club","san_isidro","mayan_golf","hacienda_nueva","alta_vista","la_reunion"];
assert.deepEqual(stableford.ALLOWED_COURSES,fields,"Stableford debe ofrecer los mismos siete campos");
for(const field of fields){
  assert.match(html,new RegExp(`data-stableford-course="${field}"`),`Falta botón Stableford para ${field}`);
  assert.match(html,new RegExp(`<option value="${field}">`),`Falta opción Stableford para ${field}`);
  assert.match(legacy,new RegExp(`<option value="${field}">`),`Falta opción heredada Stableford para ${field}`);
}
assert.match(legacy,/state\.players=.*slice\(0,6\)/s,"La ruta heredada debe admitir seis jugadores");

const expectedNames=["El Pulté","Country Club","San Isidro","Mayan Golf","Hacienda Nueva","Alta Vista","La Reunión"];
for(const name of expectedNames){
  assert.ok(guide.includes(name),`La guía omite ${name}`);
  assert.ok(compendium.includes(name),`El compendio omite ${name}`);
}
assert.match(guide,/Campos disponibles en todas las modalidades/);
assert.match(compendium,/mismos siete campos están disponibles en \*\*Ronda Normal\*\*, \*\*Stableford\*\* y \*\*Score Card - Práctica\*\*/);

const forbiddenPeople=/\b(?:Jaime|Roberto|Ana|Eduardo)\b/i;
assert.doesNotMatch(guide,forbiddenPeople,"La guía no debe usar nombres reales como ejemplos");
assert.doesNotMatch(compendium,forbiddenPeople,"El compendio no debe usar nombres reales como ejemplos");
const generalGuideStart=html.indexOf('<div class="newbie-registration-guide"');
const generalGuideEnd=html.indexOf('id="setupMicWrap"',generalGuideStart);
const generalRegistration=generalGuideStart>=0&&generalGuideEnd>generalGuideStart?html.slice(generalGuideStart,generalGuideEnd):"";
assert.doesNotMatch(generalRegistration,forbiddenPeople,"La guía visible no debe usar nombres reales");
assert.match(generalRegistration,/NOMBRE · 14 · BLANCAS/);

const badOrders=[
  /GROSS OUT<\/th><th>GROSS IN/,
  /PUNTOS OUT<\/th><th>PUNTOS IN/,
  /<th class="sum-col">OUT<\/th>[\s\S]{0,250}<th class="sum-col">IN<\/th>/,
  /\$\{metric\} OUT[\s\S]{0,180}\$\{metric\} IN/,
];
for(const pattern of badOrders){
  assert.doesNotMatch(html,pattern,"La aplicación conserva una variante OUT → IN");
  assert.doesNotMatch(legacy,pattern,"La tarjeta heredada conserva una variante OUT → IN");
}
assert.match(html,/GROSS IN<\/th><th>PUNTOS IN<\/th><th>GROSS OUT<\/th><th>PUNTOS OUT<\/th><th>GROSS TOTAL<\/th><th>PUNTOS TOTAL/);
assert.match(html,/<th class="sum-col">IN<\/th>[\s\S]{0,250}<th class="sum-col">OUT<\/th><th class="sum-col">TOTAL<\/th>/);
assert.match(html,/\$\{metric\} IN[\s\S]{0,180}\$\{metric\} OUT[\s\S]{0,180}\$\{metric\} TOTAL/);
assert.match(legacy,/GROSS IN<\/th><th>PTS IN<\/th><th>GROSS OUT<\/th><th>PTS OUT/);
assert.match(artifacts,/IN: \$\{stats\.front\.points\}[\s\S]*OUT: \$\{stats\.back\.points\}/);
assert.match(artifacts,/"Gross IN"[\s\S]*"Puntos IN"[\s\S]*"Gross OUT"[\s\S]*"Puntos OUT"/);

assert.doesNotMatch(guide,/OUT, IN/);
assert.doesNotMatch(compendium,/OUT, IN/);
assert.match(guide,/## IN\s+Total de los hoyos 1 al 9\.[\s\S]*## OUT\s+Total de los hoyos 10 al 18\./);
assert.match(compendium,/\*\*IN:\*\* total de los hoyos 1 al 9\.[\s\S]*\*\*OUT:\*\* total de los hoyos 10 al 18\./);
assert.match(html,/segunda vuelta\|vuelta dos\|vuelta 2\|regreso\|back\|out\|vta/);
assert.match(html,/primera vuelta\|vuelta uno\|vuelta 1\|ida\|front\|in/);

assert.match(builder,/shd\.set\(qn\("w:val"\), "clear"\)/);
assert.match(builder,/for side in \("top", "bottom", "left", "right"\):[\s\S]*set_paragraph_border\(p, side, BLACK/);
assert.match(builder,/Real-person example detected in guide source/);
assert.match(builder,/Incorrect OUT\/IN order detected in guide source/);

assert.match(html,/gscg-build" content="V306-UNIVERSAL-FIELDS-IN-OUT-GUIDE-20260824"/);
assert.equal(release.buildNumber,306);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v306"/);

console.log("PASS V306 · siete campos universales, IN → OUT → TOTAL, ejemplos genéricos y títulos con marco negro");
