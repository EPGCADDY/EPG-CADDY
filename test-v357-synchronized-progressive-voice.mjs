import assert from "node:assert/strict";
import fs from "node:fs";
import {sanitizeVoiceHealth} from "./api/voice-health.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const audit=fs.readFileSync(new URL("./audit-project.mjs",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V363-EXTERNAL-SERVICE-RECOVERY-20260828"/);
assert.match(html,/gscg-ios-voice-recovery" content="V362-ONE-TOUCH-WATCHDOG-MALE-FALLBACK-20260828"/);
assert.match(html,/gscg-progressive-voice" content="V362-IMMEDIATE-PERSISTENT-SPOKEN-CLOSURE-20260828"/);
assert.match(worker,/gscg-mobile-v363-external-service-recovery/);
assert.match(audit,/test-v357-ios-voice-transport-recovery\.mjs/);
assert.match(audit,/test-v357-synchronized-progressive-voice\.mjs/);

const progressAt=html.indexOf("function applyBrowserVoiceProgressiveScore");
const progressEnd=html.indexOf("\nfunction sealBrowserVoiceProgress",progressAt);
const progress=html.slice(progressAt,progressEnd);
assert.ok(progressAt>0&&progressEnd>progressAt);
assert.match(progress,/applyLiveRoundTranscript\(browserVoiceItemId,clean\)/);
assert.match(progress,/browser_fallback_round_progressive/);
assert.match(progress,/HOYO \$\{hole\} REGISTRADO · ESCUCHANDO/);
assert.ok(progress.indexOf("isGeneralConversationIntent(clean)")<progress.indexOf("applyLiveRoundTranscript"),"Las preguntas generales nunca pueden entrar al escritor de scores");

const beginAt=html.indexOf("function beginBrowserVoiceRecognition");
const beginEnd=html.indexOf("\nfunction startBrowserVoiceFallback",beginAt);
const begin=html.slice(beginAt,beginEnd);
assert.match(begin,/recognition\.continuous=true/);
assert.match(begin,/recognition\.maxAlternatives=5/);
assert.match(begin,/recognition\.onresult=[\s\S]*applyBrowserVoiceProgressiveScore\(context\)[\s\S]*scheduleBrowserVoiceFinalize/);

const finalizeAt=html.indexOf("function finalizeBrowserVoiceFallback");
const finalizeEnd=html.indexOf("\nfunction restartBrowserVoiceAfterNaturalEnd",finalizeAt);
const finalize=html.slice(finalizeAt,finalizeEnd);
assert.match(finalize,/selectBrowserVoiceCandidate\(context,browserVoiceCandidates,primary\)/);
assert.match(finalize,/selection\.ambiguous[\s\S]*rollbackLiveRoundItem/);
assert.match(finalize,/sealBrowserVoiceProgress\(context,transcript\)/);
assert.match(finalize,/browser_fallback_round_applied/);

const processAt=html.indexOf("async function processBrowserVoiceTranscript");
const processEnd=html.indexOf("\nasync function answerBrowserVoiceQuery",processAt);
const process=html.slice(processAt,processEnd);
assert.ok(process.indexOf("parseSetupTranscript(clean)")<process.indexOf("isGeneralConversationIntent(clean)"));
assert.ok(process.indexOf("isGeneralConversationIntent(clean)")<process.indexOf("browser_fallback_setup_rejected"),"Registro debe enrutar preguntas generales antes de rechazar un listado");
assert.ok(process.indexOf("parseRoundScoreTranscript(clean)")<process.indexOf("routeAiUniversalAppText(clean)"),"Score local debe conservar prioridad sobre conversación");

assert.match(html,/if\(!round\.configured\)\{[\s\S]*?else if\(directHome\)openNewRoundDraft\(\)/);
assert.doesNotMatch(html,/if\(directHome&&!sfEmergency&&!demoControlManual\)openNewRoundDraft\(\)/);

assert.deepEqual(
  sanitizeVoiceHealth({event:"browser_fallback_round_progressive",build:"V358",context:"round",entryCount:2,transcript:"PRIVADO",player:"PRIVADO",latitude:0}),
  {event:"browser_fallback_round_progressive",build:"V358",context:"round",turn:0,elapsedMs:0,entryCount:2}
);

console.log("PASS V358 · recuperación iPhone + hoyos visibles durante el dictado + Universal + ronda persistente");
