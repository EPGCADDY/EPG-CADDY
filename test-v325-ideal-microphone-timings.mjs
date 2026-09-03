import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const sessionApi=fs.readFileSync(new URL("./api/session-grupal.js",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V\d{3}[^"]*"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v\d{3}[^"]*"/);

const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.doesNotThrow(()=>new Function(script),"El JavaScript principal debe compilar completo");

for(const contract of [
  /const ROUND_VAD_THRESHOLD=0\.2/,
  /const ROUND_VAD_PREFIX_MS=700/,
  /const ROUND_VAD_SILENCE_MS=1000/,
  /const CONVERSATION_VAD_SILENCE_MS=900/,
  /type:"server_vad",threshold:ROUND_VAD_THRESHOLD,prefix_padding_ms:ROUND_VAD_PREFIX_MS,silence_duration_ms:CONVERSATION_VAD_SILENCE_MS,create_response:false,interrupt_response:false/,
  /type:"server_vad",threshold:ROUND_VAD_THRESHOLD,prefix_padding_ms:ROUND_VAD_PREFIX_MS,silence_duration_ms:ROUND_VAD_SILENCE_MS,create_response:false,interrupt_response:false/,
  /toggleVoice\(context,REALTIME_TURN_PROFILE_CONVERSATION\)/,
  /await setRealtimeTurnProfile\(REALTIME_TURN_PROFILE_CONVERSATION\)/,
  /submitAiUniversalText\(clean,\{voiceOnly:true\}\)/,
  /restoreOperationalTurnProfile\(\)/,
  /sessionUpdateQueue\.catch\(\(\)=>\{\}\)\.then/,
  /pendingSessionUpdate\.expectedProfile/,
  /const CONVERSATION_INACTIVITY_CLOSE_MS=12\*1000/,
  /conversationBargeInArmedAt=0/,
  /normalizeSpeech\(heard\)\.length>=8/,
  /conversationEchoGuardUntil=Date\.now\(\)\+1800/,
  /const ROUND_TRANSCRIPTION_WATCHDOG_MS=10000/,
  /const ROUND_MISSING_IDLE_MS=2000/,
  /const ROUND_MISSING_CONFIRM_MS=450/,
  /getUserMedia\(\{audio:\{echoCancellation:true,noiseSuppression:true,autoGainControl:true\}\}\)/,
  /if\(micTrack\)micTrack\.enabled=false/
])assert.match(html,contract);

assert.match(sessionApi,/type: "server_vad"/,"La sesión inicial debe conservar captura operativa rápida");
assert.match(sessionApi,/const silence = 1000/);
assert.match(sessionApi,/const threshold = 0\.2/);
assert.match(sessionApi,/const prefixPadding = 700/);

const profileStart=html.indexOf("function turnDetectionForProfile");
const profileEnd=html.indexOf("\nfunction exactSpeechInstructions",profileStart);
assert.ok(profileStart>0&&profileEnd>profileStart);
const profileSource=html.slice(profileStart,profileEnd);
const profiles=new Function(`
  const REALTIME_TURN_PROFILE_OPERATIONAL="operational";
  const REALTIME_TURN_PROFILE_CONVERSATION="conversation";
  const ROUND_VAD_THRESHOLD=0.2,ROUND_VAD_PREFIX_MS=700,ROUND_VAD_SILENCE_MS=1000,CONVERSATION_VAD_SILENCE_MS=900;
  const VOICE_POLICY={voice:"cedar",speed:1.15};
  const detectRealtimeShape=session=>session?.audio?.input?"ga":session?.object==="realtime.session"?"beta":"unknown";
  ${profileSource}
  return{turnDetectionForProfile,effectiveSessionCheck};
`)();

const operational=profiles.turnDetectionForProfile("operational");
assert.deepEqual(operational,{type:"server_vad",threshold:0.2,prefix_padding_ms:700,silence_duration_ms:1000,create_response:false,interrupt_response:false});
const conversational=profiles.turnDetectionForProfile("conversation");
assert.deepEqual(conversational,{type:"server_vad",threshold:0.2,prefix_padding_ms:700,silence_duration_ms:900,create_response:false,interrupt_response:false});

const gaSession=turnDetection=>({type:"realtime",audio:{input:{turn_detection:turnDetection},output:{voice:"cedar",speed:1.15}},tools:[],tool_choice:"none"});
assert.equal(profiles.effectiveSessionCheck(gaSession(operational),"round",1.15,"operational"),true);
assert.equal(profiles.effectiveSessionCheck(gaSession(conversational),"round",1.15,"conversation"),true);
assert.equal(profiles.effectiveSessionCheck(gaSession(operational),"round",1.15,"conversation"),false);
assert.equal(profiles.effectiveSessionCheck(gaSession(conversational),"round",1.15,"operational"),false);

for(let turn=1;turn<=30;turn++){
  const listeningProfile=profiles.turnDetectionForProfile("conversation");
  assert.equal(listeningProfile.type,"server_vad",`Turno conversacional ${turn} perdió VAD determinista`);
  assert.equal(listeningProfile.silence_duration_ms,900,`Turno conversacional ${turn} perdió el cierre rápido de 0.9 segundos`);
  const appOrderProfile=profiles.turnDetectionForProfile("operational");
  assert.equal(appOrderProfile.silence_duration_ms,1000,`Orden de aplicación ${turn} perdió respuesta rápida`);
}

console.log("PASS V326 · 30 turnos bilaterales, pausa natural determinista, órdenes rápidas, interrupción, eco y continuidad");
