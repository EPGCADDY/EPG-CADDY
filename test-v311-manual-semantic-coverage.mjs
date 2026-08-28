import assert from "node:assert/strict";
import fs from "node:fs";

const pages=JSON.parse(fs.readFileSync("docs/manual/v311/manual-pages-17-35.json","utf8"));
const overrides=JSON.parse(fs.readFileSync("docs/manual/v311/manual-pages-bets-live-data.json","utf8"));
const matrix=fs.readFileSync("MANUAL_COBERTURA_FUNCIONAL_V311.md","utf8");
const pageMap=new Map(pages.map(page=>[page.number,page]));
for(const page of overrides)pageMap.set(page.number,page);
const effectivePages=[...pageMap.values()].sort((a,b)=>Number(a.number)-Number(b.number));
const combined=effectivePages.map(page=>JSON.stringify(page)).join("\n").toUpperCase();

assert.equal(pages.length,57,"Deben existir exactamente las páginas funcionales 17–73");
assert.deepEqual(pages.map(page=>Number(page.number)),Array.from({length:57},(_,index)=>index+17));
const expectedStepTitles=["QUÉ ES","TÚ HACES","LA APP HACE","RESULTADO"];
for(const page of effectivePages){
  assert.equal(page.steps.length,4,`La página ${page.number} debe tener cuatro pasos claros`);
  assert.ok(page.remember.length>=25,`La página ${page.number} debe incluir una regla de recuperación`);
  assert.deepEqual(page.steps.map(step=>step[0]),expectedStepTitles,`La página ${page.number} debe enseñar en orden infantil`);
  for(const field of ["commonError","recovery","glossary","scoreSeparation","example"]){
    assert.ok(page[field],`La página ${page.number} debe incluir el bloque didáctico ${field}`);
  }
}

const required=[
  "CONTROL MANUAL","GROSS","HDCP","NETO","OUT","IN","TOTAL","TIMER ON","TIMER OFF",
  "RONDA PREVIA","RONDA ACTUAL","NUEVA RONDA","BORRAR SCORES","TARJETA DIGITAL","FINALIZAR RONDA",
  "IMAGEN","PDF TODAS","WHATSAPP","CORRECCIÓN OFICIAL","HISTORIAL","ESTADÍSTICAS",
  "STABLEFORD","RESPALDAR AHORA","RECUPERAR RESPALDO","INSTALAR APP","SIN CONEXIÓN",
  "MATCH PLAY","FOUR BALL","ENTER","X","MIGUEL","ÁGUILA","BIRDIE","BOGEY",
  "PRIMERA VUELTA","SEGUNDA VUELTA","ARRIBA","ABAJO","EMPATADO",
  "AI UNIVERSAL ∞","LOS 200 TEMAS DE PRUEBA SON EJEMPLOS, NUNCA LÍMITES",
  "ESCUCHAR","DETENER","REPETIR","SILENCIAR","CONTINUAR","EL MICRÓFONO NUNCA SE ABRE SOLO","ESCUCHANDO","RESPONDIENDO",
  "VEGAS","WOLF","SKINS","DOTS","NASSAU","BINGO BANGO BONGO","SNAKE",
  "TRÁFICO ACTUAL","TRÁFICO FUTURO","GOOGLE MAPS ROUTES","ETA","CLIMA ACTUAL","PRONÓSTICO","OPEN-METEO",
  "USGA","THE R&A","REGLA LOCAL"
];
for(const term of required)assert.ok(combined.includes(term),`Falta cobertura semántica: ${term}`);

for(const internalOnly of ["VERDURA","PARINELO","PARASO","PARCUATO","AGUILER"]){
  assert.ok(!combined.includes(internalOnly),`El manual no debe publicar tolerancias internas: ${internalOnly}`);
}
assert.ok(!combined.includes("JAIME"),"El manual de usuario no debe usar JAIME como ejemplo");

for(const section of ["Funciones vigentes","Combinaciones mínimas","Regla de cierre"]){
  assert.ok(matrix.includes(section),`La matriz debe conservar ${section}`);
}

console.log("PASS V334 · 57 páginas funcionales ordenadas, didácticas y con recuperación explícita");
