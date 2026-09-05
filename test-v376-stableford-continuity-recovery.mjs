import assert from "node:assert/strict";
import fs from "node:fs";
import stableford from "./stableford.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const whatsappApi=fs.readFileSync(new URL("./api/whatsapp-card.js",import.meta.url),"utf8");

assert.match(html,/if\(isRecoverableStoredRound\(canonical\)\)return canonical/);
assert.match(html,/latestStoredRound\("stableford"\)/);
assert.match(html,/if\(isRecoverableStoredRound\(round\)\)localStorage\.setItem\(ACTIVE_ROUND_KEY,payload\)/);
assert.match(html,/async function openNewRoundWithAutomaticHistory\(\)[\s\S]*?isRoundComplete\(\)&&!round\.officiallyClosedAt[\s\S]*?await officiallyCloseRound\(\)/);
assert.match(html,/async function openFinalDigitalCard\(\)[\s\S]*?await officiallyCloseRound\(\)/);
assert.doesNotMatch(html,/recoveryPreviewHost/);
assert.doesNotMatch(html,/requestedByEmptyInstalledPreview/);
assert.match(html,/alreadyArchived=readRoundArchive\(\)\.some\(item=>item\?\.id===recoveryId&&item\?\.officiallyClosedAt&&item\?\.officialSnapshot\?\.status==="officially_closed"\)/);
assert.match(html,/GSCRoundClosure\.closeSync\(recovered/);
assert.match(html,/\["GT","🇬🇹","502","Guatemala"\]/);
assert.match(html,/data-stableford-whatsapp-country=/);
assert.doesNotMatch(html,/AUTORIZA RECIBIR TARJETA|data-stableford-whatsapp-consent=/);
assert.match(html,/async function sendFinalCardsToRegisteredWhatsApp\(\)/);
assert.match(html,/await sendFinalCardsToRegisteredWhatsApp\(\)/);
assert.match(whatsappApi,/requireAccountSession\(req\)/);
assert.match(whatsappApi,/WHATSAPP_CLOUD_ACCESS_TOKEN/);
assert.match(whatsappApi,/WHATSAPP_PHONE_NUMBER_ID/);
assert.match(whatsappApi,/type:"image"/);

const par=[4,4,4,4,3,5,5,3,4,3,5,4,4,5,4,4,3,4];
const rounds={
  JAIME:[4,5,4,6,3,6,7,5,5,3,6,4,4,6,5,5,3,4],
  FITO:[5,5,5,3,3,5,6,5,6,3,7,4,4,4,4,5,5,5],
  CALIX:[4,6,3,4,3,7,6,3,6,4,6,6,4,7,6,4,3,6],
  BRUNI:[5,4,6,4,4,7,5,3,4,3,6,4,4,4,5,4,5,6]
};
const expected={JAIME:[85,23],FITO:[84,24],CALIX:[88,20],BRUNI:[83,25]};
for(const [name,scores] of Object.entries(rounds)){
  const gross=scores.reduce((sum,value)=>sum+value,0);
  const points=scores.reduce((sum,value,index)=>sum+stableford.pointsFor(value,par[index]),0);
  assert.deepEqual([gross,points],expected[name],name);
}

console.log("PASS V376 · continuidad Stableford, historial automático y recuperación exacta 04-09-2026");
