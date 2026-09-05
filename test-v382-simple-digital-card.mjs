import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");

assert.match(html,/<div class="digital-card-sent" id="digitalCardSent"[^>]*>TARJETA ENVIADA EXITOSAMENTE<\/div>/);
assert.match(html,/@keyframes digitalCardSentThreeBlinks/);
assert.match(html,/async function openFinalDigitalCard\(\)[\s\S]*?const delivery=await sendFinalCardsToRegisteredWhatsApp\(\);[\s\S]*?if\(!delivery\.ok\)return false;[\s\S]*?await blinkDigitalCardSentSuccess\(\);[\s\S]*?return clearActiveRoundAfterDelivery\(\)/);
const digitalFlow=html.match(/async function openFinalDigitalCard\(\)[\s\S]*?\n}/)?.[0]||"";
assert.doesNotMatch(digitalFlow,/finalCardOverlay/);
assert.match(html,/if\(!isRoundComplete\(\)\)\{setDigitalCardStatus\("COMPLETA LOS 18 HOYOS PARA ENVIAR LA TARJETA"\);return false}/);
assert.match(html,/AGREGA LOS NÚMEROS DE WHATSAPP PARA ENVIAR/);
assert.match(html,/function clearActiveRoundAfterDelivery\(\)[\s\S]*?archiveRoundSnapshot\(round\)[\s\S]*?localStorage\.setItem\(DELIVERED_ROUND_CLEAR_KEY,marker\)/);
assert.doesNotMatch(html,/localStorage\.removeItem\(ACTIVE_ROUND_KEY\)/);
assert.match(worker,/v382-simple-digital-card/);

console.log("PASS V382 · Tarjeta Digital envía sin pantalla intermedia, confirma con tres destellos y limpia sólo tras éxito");
