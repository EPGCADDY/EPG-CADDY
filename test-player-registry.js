"use strict";
const assert=require("node:assert/strict");
const registry=require("./player-registry.js");

const legacy=[{name:"Rodrigo Barterechea",whatsapp:"+502 5555 1234",updatedAt:"2026-08-19T10:00:00.000Z"}];
const migrated=registry.migrateDirectory(legacy);
assert.equal(migrated.length,1);
assert.equal(migrated[0].fullName,"Rodrigo Barterechea");
assert.equal(migrated[0].shortName,"Rodrigo");
assert.equal(migrated[0].whatsapp.e164,"+50255551234");
assert.equal(migrated[0].deliveryPreference,"none");
assert.equal(migrated[0].consent.active,false);
assert.deepEqual(registry.canDeliver(migrated[0],"whatsapp"),{ok:false,reason:"NOT_AUTHORIZED"});

const authorized=registry.normalizeProfile({...migrated[0],deliveryPreference:"whatsapp",consent:{active:true,grantedAt:"2026-08-19T11:00:00.000Z",scope:"round-cards",policyVersion:"1"}});
assert.deepEqual(registry.canDeliver(authorized,"whatsapp"),{ok:true,reason:null});
assert.deepEqual(registry.canDeliver(authorized,"email"),{ok:false,reason:"NO_DESTINATION"});

const withdrawn=registry.withdrawConsent(authorized,"2026-08-19T12:00:00.000Z");
assert.equal(withdrawn.consent.active,false);
assert.equal(withdrawn.deliveryPreference,"none");
assert.equal(withdrawn.consent.withdrawnAt,"2026-08-19T12:00:00.000Z");

const profiles=registry.upsertProfiles(migrated,[{id:"p1",name:"Rodrigo Barterechea",whatsapp:"55551234"}],{roundId:"round-1",course:"El Pulté Golf"});
assert.equal(profiles.length,1);
assert.deepEqual(profiles[0].roundIds,["round-1"]);
assert.deepEqual(profiles[0].coursesPlayed,["El Pulté Golf"]);
assert.equal(profiles[0].consent.active,false);

assert.equal(registry.deliveryKey({roundId:"r1",cardVersion:"v1",playerId:"p1",cardType:"global",channel:"whatsapp"}),"r1:v1:p1:global:whatsapp");
console.log("PASS player registry: migration, consent, privacy, history and idempotency");
