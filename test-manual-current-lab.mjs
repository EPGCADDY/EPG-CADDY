import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("manual.html","utf8");
const sheetMatches=[...html.matchAll(/<section class="sheet[^"]*" id="([^"]+)">([\s\S]*?)<\/section>/g)];
assert.equal(sheetMatches.length,75,"El Manual LAB vigente debe contener exactamente 75 hojas");
const ids=sheetMatches.map(match=>match[1]);
assert.equal(new Set(ids).size,75,"Las 75 hojas deben tener IDs únicos");

const hrefs=[...html.matchAll(/href="#([^"]+)"/g)].map(match=>match[1]);
const allowed=new Set(["indice","portada",...ids]);
const broken=[...new Set(hrefs.filter(id=>!allowed.has(id)))];
assert.deepEqual(broken,[],"No puede haber anclas internas rotas");

for(let index=0;index<sheetMatches.length;index+=1){
  const [,_id,body]=sheetMatches[index];
  const nav=body.match(/<div class="sheet-nav">([\s\S]*?)<\/div>/);
  assert.ok(nav,`Falta navegación en hoja ${_id}`);
  const destinations=[...nav[1].matchAll(/href="#([^"]+)"/g)].map(match=>match[1]);
  const expected=[index===0?"indice":ids[index-1],"indice",index===ids.length-1?"indice":ids[index+1]];
  assert.deepEqual(destinations,expected,`ANTERIOR/ÍNDICE/SIGUIENTE incorrecto en ${_id}`);
}

for(const retired of ["FINALIZAR RONDA","MI TABLERO","AI UNIVERSAL","MICRÓFONO","WOLF","VEGAS","DOTS"]){
  assert.ok(!html.toUpperCase().includes(retired),`El Manual vigente no debe reintroducir: ${retired}`);
}
for(const required of [
  "CIERRE AUTOMÁTICO","TARJETA DIGITAL FINAL","COMPARTIR TARJETA","ENVIAR A JUGADORES",
  "AUDIO DE RESULTADOS","MIS TORNEOS","MONITOR DEL TORNEO EN VIVO",
  "VER RESULTADOS POR CATEGORÍA","BUSCAR JUGADOR","TABLERO DE MIS FAVORITOS",
  "MEDAL PLAY","STABLEFORD","MATCH PLAY","FOUR BALL","SCORE CARD - PRÁCTICA","SKINS","UNIVERSALES"
]){
  assert.ok(html.toUpperCase().includes(required),`Falta función vigente: ${required}`);
}
assert.ok(html.includes('href="#torneos"><b>T01–T10</b>'),"El índice debe abrir Torneos dentro del mismo manual");
const screenSources=[...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(match=>match[1]);
const nonRealArtwork=screenSources.filter(src=>/\/docs\/manual\/layout\/|\.svg$/i.test(src));
assert.deepEqual(nonRealArtwork,[],"El manual vigente no debe presentar láminas o SVG diseñados como pantallas de la aplicación");
const realScreenSources=screenSources.filter(src=>/\/docs\/manual\/current\/.*\.(?:png|webp|jpe?g)$/i.test(src));
assert.ok(realScreenSources.length>=60,"El manual debe conservar las capturas reales actuales de LAB");
console.log("MANUAL_CURRENT_LAB_GATE PASS sheets=75 navigation=sequential retired=0 nonRealArtwork=0 realScreens>=60");
