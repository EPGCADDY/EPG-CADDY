import assert from "node:assert/strict";
import fs from "node:fs";
import analytics from "./historical-analytics.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");
const pages=JSON.parse(fs.readFileSync(new URL("./docs/manual/v311/manual-pages-17-35.json",import.meta.url),"utf8"));
const manual=pages.map(page=>JSON.stringify(page)).join("\n").toUpperCase();

// El usuario ve únicamente el vocabulario oficial y elegante.
for(const term of ["MIGUEL 4","MIGUEL CUATRO","ÁGUILA","BIRDIE","PAR","BOGEY","DOBLE BOGEY","TRIPLE BOGEY","DOBLE PAR"]){
  assert.ok(manual.includes(term),`Falta término oficial en el manual: ${term}`);
}
for(const internalOnly of ["VERDURA","PARINELO","PARASO","PARCUATO","AGUILER"]){
  assert.ok(!manual.includes(internalOnly),`Se publicó una tolerancia interna: ${internalOnly}`);
}
assert.ok(!manual.includes("JAIME"),"El nombre personal JAIME no debe aparecer como ejemplo");
assert.doesNotMatch(html,/\bJAIME\b/i,"Ninguna pantalla operativa debe mostrar JAIME como ejemplo");
assert.doesNotMatch(stable,/\bJAIME\b/i,"Stableford no debe mostrar JAIME como ejemplo");

// Ejecuta el conversor real de términos de golf contra un hoyo par 4.
const golfStart=html.indexOf("function readGolfGrossAt");
const golfEnd=html.indexOf("\nconst QUERY_WORDS",golfStart);
assert.ok(golfStart>0&&golfEnd>golfStart,"No se encontró el conversor real de vocabulario de golf");
const PAR=Array(18).fill(4);
const numberWords={uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9};
const parseSpanishNumberTokens=(tokens,index)=>{
  const raw=tokens[index],value=/^\d+$/.test(raw)?Number(raw):numberWords[raw];
  return Number.isInteger(value)?{value,next:index+1}:null;
};
const readGolfGrossAt=new Function("PAR","parseSpanishNumberTokens",`${html.slice(golfStart,golfEnd)};return readGolfGrossAt`)(PAR,parseSpanishNumberTokens);
const gross=phrase=>readGolfGrossAt(phrase.split(" "),0,1)?.gross;
assert.deepEqual({
  aguila:gross("aguila"),birdie:gross("birdie"),par:gross("par"),bogey:gross("bogey"),
  dobleBogey:gross("doble bogey"),tripleBogey:gross("triple bogey"),doblePar:gross("doble par")
},{aguila:2,birdie:3,par:4,bogey:5,dobleBogey:6,tripleBogey:7,doblePar:8});

// El mapa debe enseñar las intenciones que el código realmente reconoce.
for(const token of ["acumulado","resultado","cuanto","posiciones","ganando","birdies","pendientes","handicap","primera","segunda","hasta"]){
  assert.ok(html.includes(`\"${token}\"`),`El código no contiene la intención documentada: ${token}`);
}
for(const phrase of ["ACUMULADO","CÓMO VAMOS","MARCADOR ACTUAL","¿CUÁNTO HIZO MIGUEL EN EL HOYO 4?","¿QUIÉN VA GANANDO?","¿QUÉ SCORES LE FALTAN A MIGUEL?"]){
  assert.ok(manual.includes(phrase),`El mapa no enseña la frase: ${phrase}`);
}

// Historial: una frase documentada debe obtener respuesta real.
const round={configured:true,createdAt:"2026-08-20T15:00:00Z",mode:"general",course:"El Pulté",players:[{name:"MIGUEL",holes:{1:{gross:4,net:3,par:4,diff:-1}}}]};
const history=analytics.run("reporte del ultimo mes Miguel",[round],{now:new Date("2026-08-25T18:00:00Z")});
assert.equal(history.matched,true);
assert.equal(history.ok,true);
assert.match(history.speech,/Reporte de último mes/);

// Los reportes de Match y Four Ball se documentan en español, nunca Up/Down.
assert.match(html,/replace\(\/\\bUP\\b\/gi,"arriba"\)/);
assert.match(html,/replace\(\/\\bDOWN\\b\/gi,"abajo"\)/);
assert.match(html,/replace\(\/\\bAS\\b\/gi,"empatado"\)/);
for(const page of pages.filter(page=>[61,67,68,72].includes(Number(page.number)))){
  const text=JSON.stringify(page).toUpperCase();
  assert.ok(text.includes("ARRIBA")&&text.includes("ABAJO")&&text.includes("EMPATADO"),`Página ${page.number}: falta nomenclatura hablada en español`);
  assert.doesNotMatch(text,/\bUP\b|\bDOWN\b/);
}

console.log("PASS V311 · mapa detallado de voz, vocabulario oficial y respuestas comprobadas");
