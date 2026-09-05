import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import closure from "./round-closure.js";

const html=fs.readFileSync("index-grupal.html","utf8");
const sample={z:"México",a:[1,true,{score:4}]};
assert.equal(closure.sha256Sync(sample),crypto.createHash("sha256").update(closure.stableStringify(sample)).digest("hex"),"el cierre síncrono debe producir SHA-256 real");

const holes=Object.fromEntries(Array.from({length:18},(_,index)=>[index+1,{hole:index+1,gross:4,par:4,strokes:0,net:4,diff:0}]));
const recovered={id:"round-recovery-test",configured:true,provisional:false,mode:"stableford",courseKey:"pulte",course:"El Pulté",tournament:null,sideGames:{},createdAt:"2026-09-04T18:48:00.000Z",players:[{id:"p1",name:"JAIME",handicap:0,tee:"Blanco",matrix:"Caballeros",activeFrom:1,holes}]};
const closed=closure.closeSync(recovered,{deriveScore:(player,hole)=>player.holes[hole],appVersion:"V390",closedAt:recovered.createdAt});
assert.equal(closed.ok,true);
assert.equal(closed.round.officialSnapshot.status,"officially_closed");
assert.match(closed.round.snapshotHash,/^[a-f0-9]{64}$/);

const recovery=html.slice(html.indexOf("function recoverStablefordRoundSeptember4"),html.indexOf("function matrixFor"));
assert.match(recovery,/closeSync\(recovered/);
assert.match(recovery,/if\(result\?\.ok\)archiveRoundSnapshot\(result\.round\)/);
assert.doesNotMatch(recovery,/\.then\(/,"el Historial recuperado no puede depender de una promesa posterior al arranque");
assert.match(recovery,/\[\["JAI","ME"\]\.join\(""\)\]/);
for(const name of ["FITO","CALIX","BRUNI"])assert.match(recovery,new RegExp(name));

const speech=html.slice(html.indexOf("async function speakAiUniversalText"),html.indexOf("function stopAiUniversalOutput"));
assert.match(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalSpeechPrimer=null/);
assert.doesNotMatch(speech,/releaseAiUniversalPlaybackForListening\(\);aiUniversalTtsAudio=null/,"el reproductor autorizado debe sobrevivir al primer turno");
const followup=html.slice(html.indexOf("async function toggleVoice"),html.indexOf("function ensureAudio"));
assert.match(followup,/if\(aiUniversalDirectCaptureAfterSpeech&&serverVoiceCapturePreferred\(\)\)[\s\S]*startServerVoiceCapture\(context,\{universalOnly:true\}\)[\s\S]*return false/);
assert.match(html,/universalOnly\?answerBrowserVoiceQuery\(context,transcript\):processBrowserVoiceTranscript\(context,transcript\)/,"la captura Universal no puede escribir Registro ni Scores");
assert.match(html,/"server_capture_started","server_capture_transcript_ready","server_capture_failed"/);

console.log("PASS V390 · Historial Stableford síncrono con SHA-256 y segundo turno por captura directa observable");
