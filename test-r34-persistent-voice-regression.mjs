import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync("index-grupal.html","utf8");
const assistant=fs.readFileSync("voice-assistant.js","utf8");

// Execute the real external script as the browser does and fire DOMContentLoaded.
let domReady=null;
const browserWindow={
  gestureSafeBrowserVoicePreferred:()=>true,
  addEventListener(type,callback){if(type==="DOMContentLoaded")domReady=callback}
};
vm.runInNewContext(assistant,{window:browserWindow,globalThis:{},module:undefined});
assert.equal(typeof domReady,"function");
domReady();
assert.equal(browserWindow.gestureSafeBrowserVoicePreferred(),false,"iPhone must not force one-shot SpeechRecognition");

const toggle=html.slice(html.indexOf("async function toggleVoice("),html.indexOf("function dateSetup()"));
assert.ok(toggle.includes("await ensureSession()"),"persistent WebRTC must be the primary transport");
assert.ok(toggle.includes("startBrowserVoiceFallback(context)"),"touch-started local fallback must remain available");

const ensure=html.slice(html.indexOf("async function ensureSession("),html.indexOf("async function toggleVoice("));
assert.ok(ensure.indexOf("navigator.mediaDevices.getUserMedia")<ensure.indexOf("fetch(window.gscgApiUrl"),"microphone capture must start before the network wait");
assert.match(ensure,/localPc\.addTrack\(localTrack,localStream\)/);

const responseStopped=html.slice(html.indexOf('if(e.type==="output_audio_buffer.stopped")'),html.indexOf('if(e.type==="output_audio_buffer.cleared")'));
assert.match(responseStopped,/finishedReason==="conversation"[\s\S]*?resumeConversationListening\(\)[\s\S]*?setPrimaryVoiceMatrix\("listening"/);
assert.doesNotMatch(responseStopped,/finishedReason==="conversation"\)\{setVoice\(false\)/);

// Controlled injected-audio track: exercise the real resume function for 100
// consecutive turns and prove that the same live track remains enabled.
const resumeSource=html.slice(html.indexOf("function resumeConversationListening("),html.indexOf("\nfunction handleRealtime"));
const injectedTrack={readyState:"live",enabled:false,pcm:new Float32Array([0,.02,-.03,.04])};
const harness=new Function("injectedTrack",`
  let listening=true,phase="responding",voiceContext="round",scheduled=0;
  const micTrack=injectedTrack;
  const nodes={status:{textContent:""},setupStatus:{textContent:"",classList:{add(){}}}};
  const $=id=>nodes[id];
  const setVoice=on=>{listening=on};
  const scheduleConversationIdleClose=()=>{scheduled++;return true};
  const renderCourseWeather=()=>{};
  const renderSetupWeather=()=>{};
  ${resumeSource}
  return {resumeConversationListening,state:()=>({listening,phase,scheduled,status:nodes.status.textContent,track:micTrack})};
`)(injectedTrack);

for(let turn=1;turn<=100;turn++){
  injectedTrack.enabled=false;
  assert.equal(harness.resumeConversationListening(),true,`turn ${turn} must resume`);
  const state=harness.state();
  assert.equal(state.track,injectedTrack,`turn ${turn} must reuse injected track`);
  assert.equal(state.track.enabled,true,`turn ${turn} must enable injected audio`);
  assert.equal(state.phase,"listening");
  assert.equal(state.status,"ESCUCHANDO");
  assert.equal(state.scheduled,turn);
}

console.log("PASS R34 PERSISTENT VOICE · WebRTC primary, injected live audio reused for 100 turns, RESPONDIENDO→ESCUCHANDO, touch fallback preserved");
