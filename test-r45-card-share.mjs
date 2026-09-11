import fs from "node:fs";import assert from "node:assert/strict";
const index=fs.readFileSync("index-grupal.html","utf8"),middleware=fs.readFileSync("middleware.js","utf8"),api=fs.readFileSync("api/card-share.js","utf8"),viewer=fs.readFileSync("card-share.html","utf8");
assert.match(index,/sendFinalCardToRegisteredWhatsApp/);assert.match(index,/https:\/\/wa\.me\//);assert.match(index,/queueMasterDataSnapshot\("card-share"/);assert.match(index,/action:"create",roundId:round\.id/);
assert.match(api,/action==="read"/);assert.match(api,/action==="create"/);assert.match(api,/card_records/);assert.match(api,/officialSnapshot/);assert.doesNotMatch(api,/live_stream/);
assert.match(middleware,/"\/card-share\.html"/);assert.match(middleware,/path==="\/api\/card-share"/);assert.match(viewer,/GSCCardArtifacts\.build\(data\.snapshot\)\.global/);
console.log("PASS R45 · tarjeta oficial usa enlace propio y WhatsApp registrado; LIVE intacto");
