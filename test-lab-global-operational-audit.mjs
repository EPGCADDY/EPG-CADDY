import fs from "node:fs";
import assert from "node:assert/strict";
import artifacts from "./card-artifacts.js";
import "./match-play.js";
import "./four-ball.js";
import universales from "./universales.js";

const app=fs.readFileSync("index-grupal.html","utf8");
const shortcuts=fs.readFileSync("shortcuts-ui.js","utf8");
const hub=fs.readFileSync("live-hub.js","utf8");
const sw=fs.readFileSync("service-worker.js","utf8");
const manual=fs.readFileSync("manual.html","utf8");

const holes=Object.fromEntries(Array.from({length:18},(_,i)=>{const h=i+1,par=[4,4,4,4,3,5,4,3,5,4,4,3,5,4,4,3,5,4][i],gross=par+(i%3===0?0:1);return[h,{hole:h,par,gross,net:gross,strokes:0,status:null,points:Math.max(0,2-(gross-par))}]}));
const makePlayers=n=>Array.from({length:n},(_,i)=>({id:`p${i+1}`,name:`JUGADOR ${i+1}`,handicap:i+5,tee:"Blanco",tournamentCategory:i===0?"a":"",holes}));
const base={status:"officially_closed",sha256:"d".repeat(64),version:1,course:"El Pulté Golf",tournament:{name:"AUDITORÍA LAB"},playedAt:"2026-09-20T16:00:00Z"};

const cases=[
  ["general",{...base,mode:"general",players:makePlayers(4)}],
  ["stableford",{...base,mode:"stableford",stablefordCategory:"senior",stablefordRoundNumber:1,players:makePlayers(4)}],
  ["match_play",{...base,mode:"match_play",matchPlay:{resultLabel:"MATCH EMPATADO",decidedAt:18},players:makePlayers(2)}],
  ["four_ball",{...base,mode:"four_ball",fourBall:{resultLabel:"TEAM · NETO 72",decidedAt:18},players:makePlayers(4)}],
  ["universales",{...base,mode:"universales",players:makePlayers(4)}]
];
for(const [mode,snapshot] of cases){
  const out=artifacts.build(snapshot);
  assert(out.global?.html,mode+": falta tarjeta global");
  assert.equal(out.personal.length,snapshot.players.length,mode+": cantidad de tarjetas personales incorrecta");
  for(const item of [out.global,...out.personal])assert.match(item.html,/GROSS/,mode+": tarjeta sin GROSS");
}
assert.equal(universales.distribute([3,4,5,6]).total,12,"Universales debe repartir 12 puntos");

for(const token of ["GENERAL","STABLEFORD","MATCH PLAY","FOUR BALL","UNIVERSALES"])assert(app.includes(token),"Falta modalidad activa "+token);
for(const removed of ["id=\"dotsRoundButton\"","id=\"wolfRoundButton\"","id=\"vegasRoundButton\""])assert(!app.includes(removed),"No debe reaparecer función retirada "+removed);

for(const token of ["MI SCORE CARD","CENTRO DE TORNEOS","GENERAL","CATEGORÍAS","BUSCAR JUGADOR","MIS FAVORITOS"])assert(shortcuts.includes(token),"Atajos incompleto: "+token);
assert(shortcuts.includes("z-index:2147483000!important"),"ATAJOS debe quedar visible sobre overlays");
for(const id of ["hubShowGeneral","hubShowCategories","hubShowIndividual","hubAddToBoard","hubTournamentHome"])assert(hub.includes(id),"Torneos: falta destino "+id);

for(const token of ["card-artifacts.js","four-ball.js","universales.js","stableford.js","shortcuts-ui.js","live-hub.html"])assert(sw.includes(token),"Service Worker no incluye "+token);

assert(manual.includes("PANTALLAS REALES")&&manual.includes("MANUAL_GOLF_SCORE_CARD_GT_IPHONE_01_INICIO_4K.png")&&manual.includes("MANUAL_GOLF_SCORE_CARD_GT_IPHONE_02_REGISTRO_4K.png"),"Manual R4 no contiene pantallas reales");
assert(manual.includes("Four Ball · TEAM")&&manual.includes("NETO TEAM"),"Manual Four Ball incompleto");
assert(manual.includes("ATAJOS siempre contigo"),"Manual Atajos incompleto");

console.log("PASS AUDITORÍA GLOBAL LAB · 5 MODALIDADES ACTIVAS · TARJETAS GLOBAL/PERSONAL · TORNEOS · ATAJOS · PWA · MANUAL R4");
