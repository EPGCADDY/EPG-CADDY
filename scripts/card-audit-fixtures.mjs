import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import artifacts from "../card-artifacts.js";

const outputDir=path.join(os.tmpdir(),"epg-caddy-iphone-card-audit");
await fs.mkdir(outputDir,{recursive:true});
const pars=Array.from({length:18},(_,index)=>index%3===0?3:index%3===1?4:5);
const categories=["championship","a","senior","b","c",""];
const players=Array.from({length:6},(_,playerIndex)=>({
  id:`p${playerIndex+1}`,name:["EDUARDO CAPMANY","JAIME KIRSTE","RODRIGO MATHEU","RICARDO DÁVILA","ANA MARTÍNEZ","CARLOS DE LEÓN"][playerIndex],
  handicap:[6,13,8,11,19,24][playerIndex],tee:["Blanco","Blanco","Blanco","Blanco","Blanco","Blanco"][playerIndex],
  ...(categories[playerIndex]?{tournamentCategory:categories[playerIndex]}:{}),
  holes:Object.fromEntries(pars.map((par,index)=>{const hole=index+1,gross=par+(playerIndex%3)-1,strokes=index<[6,13,8,11,19,24][playerIndex]?1:0;return[hole,{hole,par,gross,strokes,net:gross-strokes}]}))
}));
const base={status:"officially_closed",sha256:"c".repeat(64),version:12,course:"El Pulté Golf",playedAt:"2026-09-08T14:15:00Z",tournament:{name:"COPA DE PRUEBA VISUAL"},players};
const matchPlayers=players.map((p,i)=>({...p,holes:Object.fromEntries(Object.entries(p.holes).map(([h,s])=>[h,{...s,gross:s.par+(i%2),net:s.par+(i%2)}]))}));
const fourPlayers=players.map((p,i)=>({...p,holes:Object.fromEntries(Object.entries(p.holes).map(([h,s])=>[h,{...s,gross:s.par+(i%2),net:s.par+(i%2)}]))}));
const snapshots={general:{...base,mode:"general"},practice:{...base,mode:"practice"},skins:{...base,mode:"skins",sideGames:{skins:{enabled:true,scoreType:"net",currency:"GTQ",unitValue:10,tiePolicy:"carry",result:{metrics:{completedHoles:18,openCarryUnits:0,moneyTransferred:60,settlementTotal:60,leaderNames:["ANA MARTÍNEZ"]},summaries:players.map((p,i)=>({name:p.name,skins:i===0?6:4,holesWon:i===0?[1,4,7,10,13,16]:[2,5,8,11],balance:i===0?60:-20})),settlements:[{fromName:"CARLOS DE LEÓN",toName:"ANA MARTÍNEZ",amount:20}]}}}},stableford:{...base,mode:"stableford",stablefordCategory:"senior",stablefordRoundNumber:2},match_play:{...base,players:matchPlayers,mode:"match_play",matchPlay:{resultLabel:"MATCH PLAY"}},four_ball:{...base,players:fourPlayers,mode:"four_ball",fourBall:{resultLabel:"FOUR BALL"}},universales:{...base,mode:"universales"}};
for(const [mode,snapshot] of Object.entries(snapshots)){
  const built=artifacts.build(snapshot),cards=[{name:`${mode}-global`,html:built.global.html},{name:`${mode}-personal`,html:built.personal[0].html}];
  for(const card of cards)await fs.writeFile(path.join(outputDir,`${card.name}.html`),card.html);
}
console.log(`GENERADAS ${Object.keys(snapshots).length} MODALIDADES / ${Object.keys(snapshots).length*2} TARJETAS DE AUDITORÍA`);
