import assert from "node:assert/strict";
import {createRequire} from "node:module";
import {normalizeLiveSnapshot,validateScope,validateConsent} from "./api/live.js";

const require=createRequire(import.meta.url),control=require("./live-control.js"),now="2026-09-04T02:25:00Z";
for(const [mode,ids] of [["stableford",["sf1","sf2","sf3","sf4"]],["general",["p1","p2"]]]){
  const round={id:`round-${mode}-share-20260904`,configured:true,provisional:false,mode,course:"EL PULTÉ GOLF",createdAt:now,updatedAt:now,players:ids.map((id,index)=>({id,name:`JUGADOR ${index+1}`,handicap:0,tee:"Blanco",holes:{}}))};
  const snapshot=control.buildLiveSnapshot(round,{course:round.course,pars:Array(18).fill(4),yardages:Array(18).fill(300)}),safe=normalizeLiveSnapshot(snapshot),selected=safe.players.map(player=>player.id);
  assert.equal(safe.players.length,ids.length);
  assert.ok(selected.every(id=>/^live-player-\d+-/.test(id)&&id.length>=8));
  assert.deepEqual(validateScope(safe,"group",selected).selectedPlayerIds,selected);
  assert.equal(validateConsent({confirmed:true,playerIds:selected,confirmedAt:now},selected).confirmed,true);
}
console.log("PASS V374 · GRUPO LIVE acepta IDs reales sf1/p1 y permite crear el enlace privado");
