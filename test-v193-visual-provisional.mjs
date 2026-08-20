import fs from "node:fs";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const required = [
  ["versión V196", "V196-COUNTRY-CLUB-OFFICIAL-20260820"],
  ["seis filas provisionales", "Array.from({length:6}"],
  ["nombres provisionales editables", "provisional-player-name-input"],
  ["resumen sólo Gross", "TOTALES GROSS PROVISIONALES"],
  ["modo sin registro activado por flecha", "provisional:true"],
  ["cronómetro Inicio/Ronda", "INICIO ${roundStartText()} · RONDA ${roundElapsedText()}"],
  ["tipografía homogénea del campo", ".new-round-card .course-option span"],
  ["nombres de campos en mayúsculas", "text-transform:uppercase!important"],
  ["fecha y hora homologadas", ".official-round-header .round-meta #timeText"],
  ["HOYO PAR YDS centrados", ".scorecard .player-block tr:first-child .concept"],
  ["franja del reloj distribuida", "column-gap:clamp(32px,8vw,110px)!important"],
  ["nomenclatura HDCP MARCAS TEES", "HDCP - MARCAS - TEES"],
];

for (const [label, needle] of required) {
  if (!html.includes(needle)) throw new Error(`FALTA: ${label}`);
}

assert.ok(html.includes('justify-content:space-between!important'),'La franja del reloj debe usar los extremos laterales disponibles');
assert.ok(html.includes('padding:0 8px!important'),'La franja móvil no debe desperdiciar espacio lateral');
console.log("PASS V196: encabezado homogéneo, columnas centradas, reloj a todo el ancho y Country Club oficial");
