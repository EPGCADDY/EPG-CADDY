import fs from "node:fs";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const required = [
  ["versión V194", "V194-HEADER-FAMILY-COLUMN-CENTER-20260820"],
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

console.log("PASS V194: familia del encabezado y columnas HOYO/PAR/YDS centradas");
