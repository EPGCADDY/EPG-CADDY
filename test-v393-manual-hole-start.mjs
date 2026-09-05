import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8"),start=html.indexOf("function syncRoundManualHole("),end=html.indexOf("function operationalTargetHoleForEntries",start);
assert.ok(start>0&&end>start,"falta sincronización del hoyo manual por ronda");
const source=html.slice(start,end),ALL=Array.from({length:18},(_,index)=>index+1);
const build=(round,complete)=>new Function("round","ALL","operationalHoleComplete",`${source};return syncRoundManualHole`)(round,ALL,complete);

let round={id:"round-empty",createdAt:"2026-09-05T18:00:00Z"};
const reused={dataset:{hole:"18",roundId:"round-previous"}};
assert.equal(build(round,()=>false)(reused,18),1);
round={id:"round-with-scores",createdAt:"2026-09-05T18:05:00Z"};
assert.equal(build(round,hole=>hole<=5)({dataset:{hole:"18",roundId:"round-previous"}},18),6);
assert.equal(build(round,hole=>hole<=4)({dataset:{}},18),5);
assert.equal(build(round,hole=>hole<=5)({dataset:{hole:"3",roundId:"round-with-scores"}},18),3);
assert.match(html,/selectedHole=syncRoundManualHole\(manual,matchLimit\)/);
console.log("PASS V393 · Control Manual inicia en 1 o en el primer hoyo pendiente y nunca hereda 18 de otra ronda");
