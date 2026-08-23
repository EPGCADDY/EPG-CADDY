import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/if\(modeHint==="stableford"&&stableford&&!stableford\.configured\)return null;/);
assert.match(html,/function openFreshStablefordSetup\(\)[\s\S]*?round=\{\.\.\.blankRound\(\),mode:"stableford"\};[\s\S]*?localStorage\.setItem\(STABLEFORD_ACTIVE_KEY,JSON\.stringify\(round\)\)/);
assert.doesNotMatch(html,/function openFreshStablefordSetup\(\)[\s\S]*?localStorage\.removeItem\(STABLEFORD_ACTIVE_KEY\)/);

const start=html.indexOf("function openFreshStablefordSetup(){");
const end=html.indexOf("\nfunction openStablefordDataEditor(){",start);
assert.ok(start>0&&end>start,"No se encontró NUEVA RONDA Stableford");
const source=html.slice(start,end);
const storage=new Map([["active",JSON.stringify({configured:true,players:[{name:"JAIME"}]})]]);
const localStorage={setItem:(key,value)=>storage.set(key,value),getItem:key=>storage.get(key)||null};
const initialRound={configured:true,mode:"stableford",players:[{name:"JAIME"}]};
const calls=[];
const harness=new Function("initialRound","blankRound","STABLEFORD_ACTIVE_KEY","localStorage","persist","resetStablefordSetupFields","render","showStablefordSetup",`${source};let round=initialRound;return{run:openFreshStablefordSetup,getRound:()=>round}`)(
  initialRound,
  ()=>({configured:false,players:[],createdAt:"2026-08-23T00:00:00.000Z"}),
  "active",
  localStorage,
  ()=>calls.push("persist"),
  ()=>calls.push("reset"),
  ()=>calls.push("render"),
  ()=>{calls.push("show");return true}
);

assert.equal(harness.run(),true);
assert.deepEqual(harness.getRound().players,[]);
assert.equal(harness.getRound().configured,false);
assert.equal(harness.getRound().mode,"stableford");
assert.deepEqual(JSON.parse(storage.get("active")).players,[]);
assert.deepEqual(calls,["persist","reset","render","show"]);

console.log("PASS V289 · NUEVA RONDA deja Stableford sin nombres y conserva el vacío al reabrir");
