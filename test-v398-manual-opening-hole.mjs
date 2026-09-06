import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const start=html.indexOf("function preferredManualHole");
const end=html.indexOf("\nfunction resetAnnouncementsAfterRemoval",start);
assert.ok(start>0&&end>start,"No se encontró el selector inicial de hoyo");
const preferredManualHole=new Function(`${html.slice(start,end)};return preferredManualHole`)();

for(const mode of ["GENERAL","STABLEFORD","MATCH PLAY","FOUR BALL"]){
  assert.equal(preferredManualHole({roundId:`${mode}-EMPTY`,renderedRoundId:"PREVIOUS",selectedHole:18,firstPending:1,maxHole:18}),1,`${mode}: ronda vacía abre en hoyo 1`);
  assert.equal(preferredManualHole({roundId:`${mode}-PARTIAL`,renderedRoundId:"PREVIOUS",selectedHole:18,firstPending:7,maxHole:18}),7,`${mode}: ronda parcial abre en siguiente hoyo pendiente`);
  assert.equal(preferredManualHole({roundId:mode,renderedRoundId:mode,selectedHole:12,firstPending:7,maxHole:18}),12,`${mode}: conserva navegación manual dentro de la misma ronda`);
}

assert.match(html,/manual\.dataset\.roundId=String\(round\.id\|\|""\)/,"El panel debe quedar asociado a la ronda renderizada");
console.log("PASS V398 · 4 modalidades: vacía→1, parcial→pendiente y navegación interna conservada");
