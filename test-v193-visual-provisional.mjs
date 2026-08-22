import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("./index-grupal.html", import.meta.url), "utf8");
const required = [
  ["build integrado vigente", "V200-STABLEFORD-VOICE-SESSION-READY-20260820"],
  ["seis filas provisionales", "Array.from({length:6}"],
  ["nombres provisionales editables", "provisional-player-name-input"],
  ["resumen provisional de primera vuelta", "GROSS PRIMERA VUELTA"],
  ["resumen provisional de segunda vuelta", "GROSS SEGUNDA VUELTA"],
  ["título autorizado del resumen", "INFORMACIÓN DE RONDA"],
  ["modo sin registro activado por flecha", "provisional:true"],
  ["hora de inicio independiente", "function roundIdleStatus(){return `INICIO ${roundStartText()}`}"],
  ["cronómetro de ronda independiente", "elapsed.textContent=round.configured?`RONDA ${roundElapsedText()}`"],
  ["tipografía homogénea del campo", ".new-round-card .course-option span"],
  ["nombres de campos en mayúsculas", "text-transform:uppercase!important"],
  ["fecha y hora homologadas", ".official-round-header .round-meta #timeText"],
  ["HOYO PAR YDS centrados", ".scorecard .player-block tr:first-child .concept"],
  ["franja del reloj distribuida", "grid-template-columns:minmax(0,1fr) minmax(150px,190px) minmax(0,1fr)!important"],
  ["nomenclatura HDCP MARCAS TEES", "HDCP - MARCAS - TEES"],
];

for (const [label, needle] of required) {
  if (!html.includes(needle)) throw new Error(`FALTA: ${label}`);
}

assert.ok(html.includes('.round-status-row .status{justify-self:start!important'),'La hora de inicio debe permanecer a la izquierda');
assert.ok(html.includes('justify-self:end!important'),'El cronómetro debe permanecer a la derecha');
console.log("PASS visual provisional vigente: resumen completo, encabezado homogéneo, reloj y Country Club oficial");
