import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const worker=fs.readFileSync("service-worker.js","utf8");
assert.match(html,/V364-EXPLICIT-NEW-ROUND-ENTRY-20260828/);
assert.match(html,/const explicitNewRound=startupParams\.get\("nueva_ronda"\)==="1"/);
assert.match(html,/if\(explicitNewRound\|\|directHome\)\{\s*openNewRoundDraft\(\);\s*\}else if\(sfEmergency\)\{[\s\S]*?openFreshStablefordSetup\(\);[\s\S]*?\}else if\(!isRecoverableStoredRound\(round\)\)/);
const start=html.indexOf("function openNewRoundDraft(){"),end=html.indexOf("function closeSetup(){",start),source=html.slice(start,end);
assert.ok(start>0&&end>start);
assert.match(source,/if\(round\.configured\)\{persist\(\);archiveRoundSnapshot\(round\)\}/,"NUEVA RONDA debe conservar la ronda anterior únicamente en Historial");
assert.match(source,/for\(const key of \[ACTIVE_ROUND_KEY,STORAGE_KEY,STORAGE_BACKUP_KEY,MATCH_PLAY_ACTIVE_KEY,FOUR_BALL_ACTIVE_KEY,STABLEFORD_ACTIVE_KEY\]\)\{try\{localStorage\.removeItem\(key\)\}/,"NUEVA RONDA debe limpiar todas las claves activas");
assert.match(source,/clearDraftState\(\);[\s\S]*?round=blankRound\(\);[\s\S]*?draftPlayers=\[\]/,"NUEVA RONDA debe dejar cero scores y cero jugadores");
assert.match(source,/render\(\);[\s\S]*?dateSetup\(\);[\s\S]*?openSetup\("new"\)/,"NUEVA RONDA debe volver a Registro");
assert.match(worker,/gscg-mobile-v363-recorded-mobile-behavior-v364-explicit-new-round-entry-v365-active-round-recovery-v366-principal-entry-recovery-v367-universal-voice-in-place-v368-canonical-home-entry/);
console.log("V364_EXPLICIT_NEW_ROUND_ENTRY PASS external_contract=ready");
