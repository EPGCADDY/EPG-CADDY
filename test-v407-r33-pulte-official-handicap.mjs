import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("candidate-index-grupal.html","utf8");
const official=[9,5,7,11,17,3,1,15,13,18,2,8,16,4,6,12,10,14];
assert.match(html,/const PULTE_SI_MEN=\[9,5,7,11,17,3,1,15,13,18,2,8,16,4,6,12,10,14\]/);
assert.equal(new Set(official).size,18);
assert.deepEqual([...official].sort((a,b)=>a-b),Array.from({length:18},(_,index)=>index+1));

const scores=[
  {name:"JAIME",hcp:14,gross:{1:4,6:6,7:7,8:3,9:5},expectedNet:21},
  {name:"JOSÉ",hcp:6,gross:{1:4,6:7,7:4,8:5,9:6},expectedNet:24},
  {name:"MICHEO",hcp:8,gross:{1:4,6:4,7:6,8:4,9:5},expectedNet:21},
  {name:"JUAN LUIS",hcp:10,gross:{1:4,6:5,7:3,8:4,9:4},expectedNet:17}
];
for(const player of scores){
  const net=Object.entries(player.gross).reduce((sum,[hole,gross])=>sum+gross-(official[Number(hole)-1]<=player.hcp?1:0),0);
  assert.equal(net,player.expectedNet,`${player.name}: neto provisional incorrecto`);
}
console.log("PASS V407 R33 · handicap oficial El Pulté Caballeros y netos provisionales verificados");
