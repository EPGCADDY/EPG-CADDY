import fs from "node:fs";
import assert from "node:assert/strict";
const hub=fs.readFileSync("live-hub.js","utf8");
const ui=fs.readFileSync("shortcuts-ui.js","utf8");
assert(hub.includes('$("hubBack").onclick=()=>{const url=new URL("/index-grupal.html"'),"VOLVER A MI SCORE CARD debe navegar directo");
assert(!hub.includes('$("hubBack").onclick=()=>{root.close();setTimeout(()=>root.history.back(),100)}'),"No usar history.back para volver al Score Card");
for(const id of ["hubShowGeneral","hubShowCategories","hubShowIndividual","hubAddToBoard","hubTournamentHome"])assert(hub.includes(id),"Falta destino "+id);
for(const label of ["MI SCORE CARD","CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MI TABLERO"])assert(ui.includes(label),"Falta atajo "+label);
console.log("PASS LAB deterministic tournament navigation");