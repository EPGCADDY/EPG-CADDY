import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V330-SIDE-GAMES-20260826"/);
assert.match(worker,/const CACHE_NAME="gscg-mobile-v330-side-games-r1"/);

const script=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
assert.doesNotThrow(()=>new Function(script),"El JavaScript principal V326 debe compilar completo");

for(const contract of [
  /const CONVERSATION_VAD_SILENCE_MS=2200/,
  /const CONVERSATION_INPUT_STALL_MS=15000/,
  /const CONVERSATION_INPUT_HARD_LIMIT_MS=90000/,
  /const CONVERSATION_RESPONSE_STALL_MS=30000/,
  /const CONVERSATION_PLAYBACK_STALL_MS=60000/,
  /silence_duration_ms:CONVERSATION_VAD_SILENCE_MS,create_response:false,interrupt_response:false/,
  /armConversationInputStall\(\{newTurn:true\}\)/,
  /recoverStalledConversationInput\(\)/,
  /armConversationResponseStall\(\)/,
  /MICRÓFONO REINICIADO · TOCA ESCUCHAR Y REPITE LA PREGUNTA/,
  /NO PUDE COMPLETAR ESA RESPUESTA · PUEDES CONTINUAR/,
  /consumo eléctrico de un aire acondicionado/,
  /Ante otro ok false, informa brevemente la limitación y permite continuar/
])assert.match(html,contract);

const profileStart=html.indexOf("function turnDetectionForProfile");
const profileEnd=html.indexOf("\nfunction exactSpeechInstructions",profileStart);
const profileSource=html.slice(profileStart,profileEnd);
const profiles=new Function(`
  const REALTIME_TURN_PROFILE_OPERATIONAL="operational";
  const REALTIME_TURN_PROFILE_CONVERSATION="conversation";
  const ROUND_VAD_THRESHOLD=0.2,ROUND_VAD_PREFIX_MS=700,ROUND_VAD_SILENCE_MS=1000,CONVERSATION_VAD_SILENCE_MS=2200;
  const VOICE_POLICY={voice:"cedar",speed:1.15};
  const detectRealtimeShape=session=>session?.audio?.input?"ga":session?.object==="realtime.session"?"beta":"unknown";
  ${profileSource}
  return{turnDetectionForProfile,effectiveSessionCheck};
`)();

const operational=profiles.turnDetectionForProfile("operational");
const conversation=profiles.turnDetectionForProfile("conversation");
assert.equal(operational.silence_duration_ms,1000);
assert.equal(conversation.type,"server_vad");
assert.equal(conversation.silence_duration_ms,2200);
assert.equal(conversation.create_response,false);
assert.equal(conversation.interrupt_response,false);

const watchdogStart=html.indexOf("function clearConversationInputStall");
const watchdogEnd=html.indexOf("\nfunction scheduleConversationIdleClose",watchdogStart);
assert.ok(watchdogStart>0&&watchdogEnd>watchdogStart);
const watchdogSource=html.slice(watchdogStart,watchdogEnd);

function createWatchdogHarness(){
  return new Function(`
    let conversationInputStallTimer=null,conversationInputStartedAt=0,conversationResponseStallTimer=null;
    let conversationToolTransition=null,activeResponseId=null,speechPlaybackResponseId=null,stopMonitorActive=false;
    let authorizedSpeech=null,listening=true,voiceContext="round",realtimeTurnProfileRequested="conversation";
    const REALTIME_TURN_PROFILE_CONVERSATION="conversation";
    const CONVERSATION_INPUT_STALL_MS=15000,CONVERSATION_INPUT_HARD_LIMIT_MS=90000,CONVERSATION_RESPONSE_STALL_MS=30000,CONVERSATION_PLAYBACK_STALL_MS=60000;
    let timers=[],teardownCount=0,resumeCount=0,states=[];
    const target={textContent:"",classList:{remove(){}}};
    const setTimeout=(fn,delay)=>{const timer={fn,delay,active:true};timers.push(timer);return timer};
    const clearTimeout=timer=>{if(timer)timer.active=false};
    const cancelResponseSafe=()=>{};
    const clearOutputAudioSafe=()=>{};
    const clearSpeechAuthorization=()=>{authorizedSpeech=null};
    const realtimeReady=()=>true;
    const resumeConversationListening=()=>{resumeCount++;return true};
    const setVoice=on=>{listening=on};
    const conversationStatusTarget=()=>target;
    const aiUniversalSetState=value=>states.push(value);
    const reportVoiceHealth=()=>true;
    const teardownRealtime=()=>{teardownCount++;listening=false};
    ${watchdogSource}
    return{
      armConversationInputStall,armConversationResponseStall,
      authorizeConversation(){authorizedSpeech={reason:"conversation"}},
      fireLatest(){const timer=[...timers].reverse().find(item=>item.active);assertTimer(timer);timer.active=false;timer.fn();return timer.delay},
      snapshot(){return{timers:timers.map(({delay,active})=>({delay,active})),teardownCount,resumeCount,state:states.at(-1)||"",status:target.textContent,listening}}
    };
    function assertTimer(timer){if(!timer)throw new Error("No existe temporizador activo")}
  `)();
}

const inputGuard=createWatchdogHarness();
assert.equal(inputGuard.armConversationInputStall({newTurn:true}),true);
assert.equal(inputGuard.fireLatest(),15000);
assert.deepEqual(inputGuard.snapshot(),{
  timers:[{delay:15000,active:false}],
  teardownCount:1,
  resumeCount:0,
  state:"MICRÓFONO REINICIADO · TOCA ESCUCHAR Y REPITE LA PREGUNTA",
  status:"MICRÓFONO REINICIADO · TOCA ESCUCHAR Y REPITE LA PREGUNTA",
  listening:false
});

const responseGuard=createWatchdogHarness();
responseGuard.authorizeConversation();
assert.equal(responseGuard.armConversationResponseStall(),true);
assert.equal(responseGuard.fireLatest(),30000);
assert.equal(responseGuard.snapshot().teardownCount,0);
assert.equal(responseGuard.snapshot().resumeCount,1);
assert.equal(responseGuard.snapshot().state,"NO PUDE COMPLETAR ESA RESPUESTA · PUEDES CONTINUAR");

for(let turn=1;turn<=30;turn++){
  assert.equal(profiles.turnDetectionForProfile("conversation").silence_duration_ms,2200,`Turno ${turn}: la conversación volvió a quedar sin tiempo determinista`);
  assert.equal(profiles.turnDetectionForProfile("operational").silence_duration_ms,1000,`Turno ${turn}: se alteró la captura rápida de órdenes`);
}

console.log("PASS V327 · entrada, generación y reproducción tienen recuperación comprobable");
