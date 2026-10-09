import assert from "node:assert/strict";
import {createRequire} from "node:module";
const require=createRequire(import.meta.url), viewer=require("./live-view.js");
const serverSnapshot={mode:"general",course:"LAB",players:[{id:"p1",name:"LAB",handicap:0,holes:[],totals:{gross:0,net:0}}]};

// Shared cards must select point summaries by mode, including old snapshots
// whose absent point fields were normalized to zero.
for(const mode of ['general','four_ball','stableford','universales']){
  for(const points of [0,6]){
    const snapshot={...serverSnapshot,mode,players:serverSnapshot.players.map(p=>({...p,totals:{...p.totals,stablefordPoints:points,universalesPoints:points}}))};
    const card=viewer.streamCard({id:'mode-regression',snapshot});
    assert.equal(card.includes('<small>PUNTOS UNIVERSALES</small>'),mode==='universales',`Universales summary in ${mode}`);
    assert.equal(card.includes('<small>PUNTOS</small>'),mode==='stableford',`Stableford summary in ${mode}`);
    assert(card.includes('<small>GROSS</small>')&&card.includes('<small>NETO</small>'));
  }
}
console.log('PASS LIVE point summaries follow round mode, including legacy zero values');
