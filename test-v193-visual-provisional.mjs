import fs from "node:fs";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const required = [
  ["versión V193", "V193-PROVISIONAL-SIX-GROSS-20260820"],
  ["seis filas provisionales", "Array.from({length:6}"],
  ["nombres provisionales editables", "provisional-player-name-input"],
  ["resumen sólo Gross", "TOTALES GROSS PROVISIONALES"],
  ["modo sin registro activado por flecha", "provisional:true"],
  ["cronómetro Inicio/Ronda", "INICIO ${roundStartText()} · RONDA ${roundElapsedText()}"],
  ["tipografía homogénea del campo", ".new-round-card .course-option span"],
  ["nombres de campos en mayúsculas", "text-transform:uppercase!important"],
];

for (const [label, needle] of required) {
  if (!html.includes(needle)) throw new Error(`FALTA: ${label}`);
}

console.log("PASS V193: tarjeta en sucio y sistema visual homogéneo");
