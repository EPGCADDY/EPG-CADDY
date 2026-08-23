import assert from "node:assert/strict";
import master from "./master-data-sync.js";

const profiles=[{id:"player-jaime",registrationCode:"GABC123",fullName:"Jaime López",handicap:12,tee:"Blanco",whatsapp:{countryCode:"502",nationalNumber:"55555555"},profileHistory:[{fullName:"Jaime López",handicap:14,tee:"Azul",occurredAt:"2026-01-01T00:00:00Z"}]}];
const round={id:"round_20260822_demo",configured:true,version:2,courseKey:"pulte",course:"El Pulté",tournament:{name:"Copa Prueba"},createdAt:"2026-08-22T12:00:00Z",players:[{id:"p1",name:"Jaime López",handicap:12,tee:"Blanco",matrix:"Caballeros",slot:1,holes:{1:{hole:1,par:4,si:3,gross:5,strokes:1,net:4,diff:0,updatedAt:"2026-08-22T12:10:00Z"}}}]};
const payload=master.build({round,profiles,courseData:{par:[4],siMen:[3],siWomen:[3],tees:{Blanco:{label:"BLANCAS",yds:[384],total:5819,rating:68.7,slope:126}}},capturedAt:"2026-08-22T12:11:00Z",reason:"score"});

assert.equal(payload.schemaVersion,1);
assert.equal(payload.profiles[0].registrationCode,"GABC123");
assert.equal(payload.profiles[0].profileHistory[0].handicap,14);
assert.equal(payload.round.clientRoundId,round.id);
assert.equal(payload.round.course.definition.tees.Blanco.yardages[0],384);
assert.equal(payload.round.players[0].registrationCode,"GABC123");
assert.deepEqual(payload.round.players[0].whatsapp,{countryCode:"502",nationalNumber:"55555555",e164:"+50255555555"});
assert.deepEqual(payload.round.players[0].holes[0],{hole:1,par:4,strokeIndex:3,gross:5,handicapStrokes:1,net:4,relativeToPar:0,stablefordPoints:null,explicitX:false,fairway:null,green:null,putts:null,penalties:0,updatedAt:"2026-08-22T12:10:00.000Z"});

const old={clientMutationId:"old",entityType:"master-snapshot",entityId:round.id,state:"pending"};
const sending={clientMutationId:"sending",entityType:"master-snapshot",entityId:round.id,state:"sending"};
const fresh={clientMutationId:"fresh",entityType:"master-snapshot",entityId:round.id,state:"pending"};
assert.deepEqual(master.coalesce([old,sending],fresh).map(x=>x.clientMutationId),["sending","fresh"]);
assert.equal(master.validAck({ok:true,payloadHash:"abc",serverAt:"2026-08-22T12:12:00Z"},{payloadHash:"abc"}),true);
assert.equal(master.validAck({ok:true,payloadHash:"bad",serverAt:"2026-08-22T12:12:00Z"},{payloadHash:"abc"}),false);

console.log("PASS V256 · paquete maestro normalizado, historial, scores y cola compactada");
