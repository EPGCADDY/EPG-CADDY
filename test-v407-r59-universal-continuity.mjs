import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./candidate-index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");

const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.doesNotThrow(()=>new Function(script),"El JavaScript del candidato debe compilar");

assert.match(api,/UNIVERSAL_TIMEOUT_MS=6_875/);
assert.match(html,/CLIENT_UNIVERSAL_TIMEOUT_MS=8000/);
assert.match(html,/response\.status>=500[^}]+fetch\(endpoint,options\)/,
  "Una falla 5xx transitoria debe tener un reintento dentro del mismo presupuesto");
assert.match(html,/waitForPreferredApprovedFemaleVoice\(timeoutMs=4000\)/);
assert.match(html,/settle\(false\)\},5000\)/,
  "Safari debe recibir margen real para iniciar su sintetizador nativo");
assert.match(html,/setPrimaryVoiceMatrix\("idle",voiceContext,clean\);aiUniversalSetState\(clean\);return false/,
  "Si el audio falla, la respuesta debe permanecer visible");
assert.doesNotMatch(html,/RECUPERANDO CONEXIÓN CON AI UNIVERSAL/,
  "El cliente no debe duplicar el presupuesto con una segunda consulta completa");
assert.match(html,/AI_UNIVERSAL_HISTORY_LIMIT=80/,
  "Debe conservar 40 intercambios completos");

const finishStart=html.indexOf("function finishAiUniversalSpeechTurn");
const finishEnd=html.indexOf("\nfunction preferredApprovedFemaleVoice",finishStart);
const finishSource=html.slice(finishStart,finishEnd);
assert.ok(finishStart>0&&finishEnd>finishStart);
assert.ok(finishSource.indexOf("releaseAiUniversalPlaybackForListening()")<finishSource.indexOf("resumeBrowserVoiceConversationAfterSpeech()"),
  "Safari debe liberar la salida antes de reabrir la entrada");
assert.match(finishSource,/AI_UNIVERSAL_RESUME_DELAY_MS/);
assert.match(html,/speakAiUniversalText\(result\.answer,\{resumeConversation:true\}\)/);
assert.match(html,/speakAiUniversalText\(local\.answer,\{resumeConversation:true\}\)/);

const resumeStart=html.indexOf("function resumeBrowserVoiceConversationAfterSpeech");
const resumeEnd=html.indexOf("\nasync function speakAiUniversalApprovedFemaleVoice",resumeStart);
const resumeSource=html.slice(resumeStart,resumeEnd);
const harness=new Function(`
  let browserVoiceContext="setup",voiceContext="setup",browserVoiceActive=false,browserVoiceRequested=false,browserVoiceRecognition=null;
  let browserVoiceTranscript="",browserVoiceInterim="",browserVoiceCandidates=[],browserVoiceErrored=false,browserVoiceStopping=false,browserVoiceRestartCount=0,browserVoiceTransportRetryCount=0,browserVoiceItemId="",browserVoiceAppliedEntryCount=0;
  let opened=0;
  const setPrimaryVoiceMatrix=()=>{};
  const aiUniversalSetState=()=>{};
  const reportVoiceHealth=()=>{};
  const beginBrowserVoiceRecognition=()=>{opened++;browserVoiceRequested=true;return true};
  ${resumeSource}
  return {
    turn:()=>resumeBrowserVoiceConversationAfterSpeech(),
    finish:()=>{browserVoiceActive=false;browserVoiceRequested=false;browserVoiceRecognition=null},
    opened:()=>opened
  };
`)();
for(let turn=1;turn<=25;turn++){
  assert.equal(harness.turn(),true,`El turno ${turn} debe reabrir la escucha`);
  harness.finish();
}
assert.equal(harness.opened(),25);

for(const contract of [
  "pertinencia directa",
  "fundamento verificable",
  "profundidad suficiente",
  "precisión factual",
  "aplicación práctica",
  "claridad"
])assert.ok(html.includes(contract)&&api.includes(contract),`Falta el criterio de calidad ${contract} en voz o texto`);

assert.match(html,/AI_UNIVERSAL_VOICE_SPEED=1\.15/);
assert.match(html,/utterance\.rate=AI_UNIVERSAL_VOICE_SPEED/);
assert.match(html,/player\.playbackRate=AI_UNIVERSAL_VOICE_SPEED/);
assert.match(html,/target===REALTIME_TURN_PROFILE_CONVERSATION\?AI_UNIVERSAL_VOICE_SPEED:VOICE_POLICY\.speed/);

console.log("PASS R60 · 25 turnos Universal, reintento 5xx, rescate visual, audio iPhone 1.15x y latencia acotada");
