import assert from "node:assert/strict";
import fs from "node:fs";
import searchApi from "./manual-search.js";

const html=fs.readFileSync(new URL("./manual.html",import.meta.url),"utf8");
const details=JSON.parse(fs.readFileSync(new URL("./docs/manual/v311/manual-pages-17-35.json",import.meta.url),"utf8"));
const overrides=JSON.parse(fs.readFileSync(new URL("./docs/manual/v311/manual-pages-bets-live-data.json",import.meta.url),"utf8"));
const detailMap=new Map(details.map(detail=>[detail.number,detail]));
for(const detail of overrides)detailMap.set(detail.number,detail);
const baseTitles=[
  "PORTADA","CONFIGURA LA RONDA","REGISTRA JUGADORES","CONFIRMA LA RONDA","CONFIGURA STABLEFORD",
  "SCORE CARD - PRÁCTICA","RONDA GENERAL","CONTROL MANUAL","MATCH PLAY","FOUR BALL","EL PULTÉ GOLF",
  "GUATEMALA COUNTRY CLUB","SAN ISIDRO","MAYAN GOLF","HACIENDA NUEVA COUNTRY CLUB",
  "ALTA VISTA GOLF & TENNIS CLUB","LA REUNIÓN GOLF RESORT"
];
const entries=baseTitles.map((title,index)=>({number:String(index).padStart(2,"0"),title,searchText:index===7?"corregir borrar cambiar score bogey par gross enter":""}));
for(const detail of [...detailMap.values()].sort((a,b)=>Number(a.number)-Number(b.number)))entries.push({number:detail.number,title:detail.title,searchText:JSON.stringify(detail)});

const first=query=>searchApi.search(query,entries,{limit:8})[0]?.number;
const pages=query=>searchApi.search(query,entries,{limit:8}).map(item=>item.number);

assert.equal(first("Quiero jugar Stableford"),"04");
assert.equal(first("Cómo borro un bogey que fue par"),"07");
assert.equal(first("Cómo corrijo un bogey que fue par"),"21");
assert.equal(first("Cómo pregunto el acumulado"),"23");
assert.equal(first("No puedo finalizar la ronda"),"30");
assert.ok(pages("Quiero consultar yardas slope rating").some(page=>Number(page)>=10&&Number(page)<=16));
assert.ok(pages("Qué puedo decirle a la aplicación").includes("57"));
assert.equal(first("Puedo platicar de cualquier tema"),"62");
assert.ok(["62","63"].includes(first("¿Puedo preguntar de medicinas, vuelos y cultura?")));
assert.ok(["60","62"].includes(first("¿Funciona en todos los micrófonos?")));
assert.equal(first("¿Cómo se juega Vegas?"),"49");
assert.equal(first("¿Quién es el Wolf?"),"46");
assert.equal(first("¿Cómo funcionan los Skins?"),"43");
assert.equal(first("¿Cuál es el tráfico y la ETA?"),"64");
assert.equal(first("¿A qué hora puede llover?"),"67");

for(const required of ["manualSearch","manualSearchResults","categoryIndex","manual-search.js","Quiero jugar Stableford","Cómo corrijo un bogey que fue par"]){
  assert.ok(html.includes(required),`Falta el componente de búsqueda: ${required}`);
}
for(const category of ["EMPEZAR Y REGISTRAR","MODALIDADES Y APUESTAS","ANOTAR Y CORREGIR","PREGUNTAR Y ESCUCHAR","FINALIZAR, GUARDAR Y RECUPERAR","CLIMA Y TRÁFICO","INFORMACIÓN DE CAMPOS"]){
  assert.ok(html.includes(category),`Falta categoría del índice: ${category}`);
}

console.log("PASS V334 · índice temático y lupa alineados con el nuevo orden didáctico");
