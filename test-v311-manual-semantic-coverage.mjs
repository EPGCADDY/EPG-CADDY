import assert from "node:assert/strict";
import fs from "node:fs";

const pages=JSON.parse(fs.readFileSync("docs/manual/v311/manual-pages-17-35.json","utf8"));
const matrix=fs.readFileSync("MANUAL_COBERTURA_FUNCIONAL_V311.md","utf8");
const combined=pages.map(page=>JSON.stringify(page)).join("\n").toUpperCase();

assert.equal(pages.length,57,"Deben existir exactamente las páginas funcionales 17–73");
assert.deepEqual(pages.map(page=>Number(page.number)),Array.from({length:57},(_,index)=>index+17));
for(const page of pages){
  assert.equal(page.steps.length,4,`La página ${page.number} debe tener cuatro pasos claros`);
  assert.ok(page.remember.length>=25,`La página ${page.number} debe incluir una regla de recuperación`);
}

const required=[
  "DICTADO","CONTROL MANUAL","GROSS","HDCP","NETO","OUT","IN","TOTAL","TIMER ON","TIMER OFF",
  "RONDA PREVIA","RONDA ACTUAL","NUEVA RONDA","BORRAR SCORES","TARJETA DIGITAL","FINALIZAR RONDA",
  "IMAGEN","PDF TODAS","WHATSAPP","CORRECCIÓN OFICIAL","SHA-256","HISTORIAL","ESTADÍSTICAS",
  "STABLEFORD","RESPALDAR AHORA","RECUPERAR RESPALDO","INSTALAR APP","SIN CONEXIÓN","ACTUALIZACIÓN OBLIGATORIA",
  "MATCH PLAY","FOUR BALL","ENTER","X","MIGUEL","ÁGUILA","BIRDIE","BOGEY","DOBLE BOGEY",
  "TRIPLE BOGEY","DOBLE PAR","ACUMULADO","CÓMO VAMOS","MARCADOR ACTUAL","PRIMERA VUELTA",
  "SEGUNDA VUELTA","QUIÉN VA GANANDO","SCORES LE FALTAN","ÚLTIMO MES","ARRIBA","ABAJO","EMPATADO",
  "MAPA DE CAPACIDADES DE VOZ","QUÉ RESPONDERÁ LA APLICACIÓN","CADDIE DE CONVERSACIÓN UNIVERSAL",
  "EL MISMO CADDIE EN CADA MICRÓFONO","INICIO MUESTRA EL CLIMA POR GPS","¿CÓMO ESTÁ EL CLIMA HOY?","¿POR QUÉ TENGO FRÍO?",
  "CULTURA MAYA","MEDICINAS","VUELOS DE AEROLÍNEA","EL MICRÓFONO NUNCA SE ABRE SOLO"
];
for(const term of required)assert.ok(combined.includes(term),`Falta cobertura semántica: ${term}`);

for(const internalOnly of ["VERDURA","PARINELO","PARASO","PARCUATO","AGUILER"]){
  assert.ok(!combined.includes(internalOnly),`El manual no debe publicar tolerancias internas: ${internalOnly}`);
}
assert.ok(!combined.includes("JAIME"),"El manual de usuario no debe usar JAIME como ejemplo");

for(const section of ["Funciones vigentes","Combinaciones mínimas","Regla de cierre"]){
  assert.ok(matrix.includes(section),`La matriz debe conservar ${section}`);
}

console.log("PASS V311 · 73 páginas funcionales con conversación universal y recuperación de atascos");
