import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import artifacts from "../card-artifacts.js";

const outputDir=path.join(os.tmpdir(),"epg-caddy-iphone-card-audit");
await fs.mkdir(outputDir,{recursive:true});
const pars=Array.from({length:18},(_,index)=>index%3===0?3:index%3===1?4:5);
const categories=["championship","a","senior",""];
const players=Array.from({length:4},(_,playerIndex)=>({
  id:`p${playerIndex+1}`,name:["ANA MARTÍNEZ","CARLOS DE LEÓN","SOFÍA RAMÍREZ","JOSÉ LÓPEZ"][playerIndex],
  handicap:[8,14,19,24][playerIndex],tee:["Azul","Blanco","Rojo","Amarillo"][playerIndex],
  ...(categories[playerIndex]?{tournamentCategory:categories[playerIndex]}:{}),
  holes:Object.fromEntries(pars.map((par,index)=>{const hole=index+1,gross=par+(playerIndex%3)-1,strokes=index<[8,14,19,24][playerIndex]?1:0;return[hole,{hole,par,gross,strokes,net:gross-strokes}]}))
}));
const base={status:"officially_closed",sha256:"c".repeat(64),version:12,course:"El Pulté Golf",playedAt:"2026-09-08T14:15:00Z",tournament:{name:"COPA DE PRUEBA VISUAL"},players};
const snapshots={general:{...base,mode:"general"},stableford:{...base,mode:"stableford",stablefordCategory:"senior",stablefordRoundNumber:2},match_play:{...base,mode:"match_play",matchPlay:{resultLabel:"ANA 2 ARRIBA"}},four_ball:{...base,mode:"four_ball",fourBall:{resultLabel:"PAREJA VERDE 1 ARRIBA"}},universales:{...base,mode:"universales"}};
for(const [mode,snapshot] of Object.entries(snapshots)){
  const built=artifacts.build(snapshot),cards=[{name:`${mode}-global`,html:built.global.html},{name:`${mode}-personal`,html:built.personal[0].html}];
  for(const card of cards)await fs.writeFile(path.join(outputDir,`${card.name}.html`),card.html);
}
console.log("GENERADAS 10 TARJETAS DE AUDITORÍA");
