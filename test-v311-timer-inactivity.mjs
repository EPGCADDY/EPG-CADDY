import assert from "node:assert/strict";
import fs from "node:fs";
import timer from "./timer-inactivity.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const mobileBuild=fs.readFileSync(new URL("./scripts/build-mobile-web.mjs",import.meta.url),"utf8");
const start=Date.parse("2026-08-25T12:00:00.000Z");
const active={configured:true,endedAt:null,createdAt:new Date(start).toISOString(),timerLastInstructionAt:new Date(start).toISOString()};

assert.equal(timer.LIMIT_MS,30*60*1000);
assert.equal(timer.shouldStop(active,start+timer.LIMIT_MS-1),false);
assert.equal(timer.shouldStop(active,start+timer.LIMIT_MS),true);
assert.equal(timer.shouldStop({...active,endedAt:new Date(start+1000).toISOString()},start+timer.LIMIT_MS),false);
assert.equal(timer.remainingMs(active,start+5*60*1000),25*60*1000);
for(const token of ["scheduleRoundTimerIdleShutdown","noteRoundTimerInstruction","TIMER OFF · 30 MIN SIN INSTRUCCIONES","timerLastInstructionAt"]){
  assert.ok(html.includes(token),`Falta integración del apagado por inactividad: ${token}`);
}
assert.match(worker,/\/timer-inactivity\.js/);
assert.match(mobileBuild,/"timer-inactivity\.js"/);

console.log("PASS V311 · todos los TIMER se apagan tras 30 minutos sin instrucciones");
