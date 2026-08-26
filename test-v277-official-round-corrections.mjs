import assert from "node:assert/strict";
import fs from "node:fs";
import "./round-closure.js";
import artifacts from "./card-artifacts.js";
import masterSync from "./master-data-sync.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/gscg-build" content="V325-IDEAL-MICROPHONE-TIMINGS-20260826"/);
assert.match(html,/V277-ORIGINAL-REASON-VERSIONED-CORRECTION-20260823/);
assert.match(html,/id="openOfficialCorrection">CORREGIR RONDA/);
assert.match(html,/id="openOriginalGlobal">ABRIR ORIGINAL/);
assert.match(html,/id="officialCorrectionOverlay"/);
assert.match(html,/MOTIVO OBLIGATORIO/);
assert.match(html,/RESPONSABLE OBLIGATORIO/);
assert.match(html,/GSCRoundClosure\.correct\(round,\{changes,reason,authorizedBy,appVersion:"V307"\}\)/);
assert.match(html,/CORRECCIÓN V\$\{round\.officialVersion\} GUARDADA · ORIGINAL PRESERVADO/);
assert.match(html,/isStablefordRound\(\)\?\{\.\.\.correctedScore,points:GSCStableford\.pointsFor/);
assert.match(html,/appVersion:"V307"/);
assert.equal(masterSync.APP_VERSION,"V283");

const holes=Object.fromEntries(Array.from({length:18},(_,index)=>{const hole=index+1,par=hole%3===0?3:hole%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2,strokes:0,net:par,diff:0}]}));
const snapshot={roundId:"round-v277",status:"officially_closed",mode:"stableford",sha256:"a".repeat(64),version:1,course:"El Pulté",playedAt:"2026-08-23T12:00:00Z",stablefordCategory:"senior",players:[{id:"p1",name:"JAIME",handicap:0,tee:"Blanco",holes}]};
const closed={id:"round-v277",configured:true,officiallyClosedAt:"2026-08-23T16:00:00Z",officialSnapshot:snapshot,players:snapshot.players};

const missingReason=await globalThis.GSCRoundClosure.correct(closed,{changes:[{playerId:"p1",hole:1,gross:3}],authorizedBy:"JAIME"});
assert.equal(missingReason.code,"REASON_REQUIRED");
const corrected=await globalThis.GSCRoundClosure.correct(closed,{changes:[{playerId:"p1",hole:1,gross:3}],reason:"SCORE VERIFICADO",authorizedBy:"JAIME",correctedAt:"2026-08-23T17:00:00Z",appVersion:"V280"});
assert.equal(corrected.ok,true);
assert.equal(corrected.snapshot.status,"corrected");
assert.equal(corrected.snapshot.version,2);
assert.equal(corrected.snapshot.players[0].holes[1].points,3);
assert.equal(corrected.round.officialVersions.length,2);
assert.equal(corrected.round.officialVersions[0].sha256,snapshot.sha256);
assert.notEqual(corrected.snapshot.sha256,snapshot.sha256);
assert.equal(corrected.snapshot.correction.reason,"SCORE VERIFICADO");
assert.equal(corrected.snapshot.correction.authorizedBy,"JAIME");

const generated=artifacts.build(corrected.snapshot);
assert.match(generated.global.html,/Tarjeta Global Stableford corregida/);
assert.match(generated.personal[0].html,/Tarjeta personal Stableford corregida/);
assert.equal(generated.personal[0].stats.points,37);

console.log("PASS V277 · corrección oficial versionada, original preservado y recálculo General/Stableford");
