import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html=readFileSync("index-grupal.html","utf8");
const serviceWorker=readFileSync("service-worker.js","utf8");

assert.match(html,/V355-MICROPHONE-ROUND-CONTINUITY-20260828/);
assert.match(serviceWorker,/gscg-mobile-v355-microphone-round-continuity/);
assert.match(
  html,
  /if\(directHome&&!sfEmergency&&!demoControlManual&&!round\.configured\)openNewRoundDraft\(\)/,
  "El acceso principal no debe ocultar una tarjeta activa detrás de Registro"
);

const startupDecision=(directHome,sfEmergency,demoControlManual,configured)=>
  directHome&&!sfEmergency&&!demoControlManual&&!configured;
assert.equal(startupDecision(true,false,false,true),false,"Una ronda activa permanece montada al reabrir /");
assert.equal(startupDecision(true,false,false,false),true,"Sin ronda activa, / abre Registro");
assert.equal(startupDecision(false,false,false,true),false);

assert.match(html,/window\.addEventListener\("pagehide",\(\)=>\{\s*persist\(\)/);
assert.match(html,/window\.addEventListener\("beforeunload",persist\)/);
assert.match(html,/if\(!round\.configured\)restorePersistedRound\(\)/);
assert.match(html,/function persist\(\)[\s\S]*?archiveRoundSnapshot\(round\)/);
assert.match(html,/function openNewRoundDraft\(\)[\s\S]*?persist\(\);[\s\S]*?openSetup\("new"\)/);

console.log("PASS V355 · ronda activa visible al reabrir; sólo NUEVA RONDA abre Registro; persistencia y restauración conservadas");
