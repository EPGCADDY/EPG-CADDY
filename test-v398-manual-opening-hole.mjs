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

// Regression: a previous card left p1 selected at hole 5. The new card shows 1.
const vm=await import('node:vm');
const cursorStart=html.indexOf('  const roundChanged=String(manual.dataset.roundId');
const cursorEnd=html.indexOf('  const stable=isStablefordRound()',cursorStart);
assert(cursorStart>0&&cursorEnd>cursorStart);
for(const firstPending of [1,10]){
 const context={round:{id:'NEW'},manual:{dataset:{roundId:'OLD',hole:'5',activePlayerId:'p1'}},roundScoreKeypadState:{playerId:'p1',hole:5,value:''},firstPending,matchLimit:18,preferredManualHole};
 vm.runInNewContext(html.slice(cursorStart,cursorEnd),context);
 assert.equal(context.manual.dataset.hole,String(firstPending));
 assert.equal(context.roundScoreKeypadState,null,'Previous keypad cursor must not write to hole 5');
 assert.equal(context.manual.dataset.activePlayerId,'');
}
const same={round:{id:'SAME'},manual:{dataset:{roundId:'SAME',hole:'1',activePlayerId:'p1'}},roundScoreKeypadState:{playerId:'p1',hole:5,value:''},firstPending:1,matchLimit:18,preferredManualHole};
vm.runInNewContext(html.slice(cursorStart,cursorEnd),same);assert.equal(same.roundScoreKeypadState,null,'Visible hole wins over stale writer cursor');
assert.match(html,/closeRoundScoreKeypad\(\);\n  const startedAt/);
console.log('PASS R24-B9 stale previous-round cursor 5 -> new hole 1/10; displayed hole and writer synchronized');

const repairStart=html.indexOf('function applyAuditedHoleRepairs('),repairEnd=html.indexOf('window.GSCLiveControl?.mount({',repairStart);
const repair={id:'audit-test',roundId:'reported',mapping:{5:1,6:2,7:3,8:4},players:[{id:'p1',gross:{5:5,6:5,7:5,8:5}}]};
const fixture=()=>({id:'reported',players:[{id:'p1',holes:Object.fromEntries([5,6,7,8].map(hole=>[hole,{hole,gross:5,net:3}]))}]});
let writes=0;const repairContext={round:fixture(),document:{getElementById:()=>null},scoreObject:(p,h,g)=>({hole:h,gross:g,net:g-1}),closeRoundScoreKeypad(){},persist(){writes++},render(){},$:()=>({})};
vm.runInNewContext(html.slice(repairStart,repairEnd),repairContext);
assert.equal(repairContext.applyAuditedHoleRepairs([repair]),true);assert.deepEqual(Object.keys(repairContext.round.players[0].holes),['1','2','3','4']);assert.equal(repairContext.round.players[0].holes[1].net,4);assert.equal(repairContext.applyAuditedHoleRepairs([repair]),false);assert.equal(writes,1);
repairContext.round=fixture();repairContext.round.players[0].holes[1]={gross:7};assert.equal(repairContext.applyAuditedHoleRepairs([repair]),false,'Never overwrite a target score');
repairContext.round=fixture();repairContext.round.id='different';assert.equal(repairContext.applyAuditedHoleRepairs([repair]),false,'No other round is reindexed');
console.log('PASS audited hole repair: exact round/roster/Gross, recalculated target Net, idempotent, no target overwrite');
