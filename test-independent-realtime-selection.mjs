import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.VOICE_SOURCE||'index-grupal.html','utf8');
const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
async function run(search,fail=false){
 let native=0,sessions=0;
 const env=vm.createContext({console,URLSearchParams,window:{location:{search}},navigator:{userAgent:'iPhone',platform:'iPhone',maxTouchPoints:5},
  REALTIME_TURN_PROFILE_OPERATIONAL:'operational',browserVoiceActive:false,browserVoiceRequested:false,listening:false,voiceContext:'setup',voiceActivationPromise:null,
  setupFinalizeRequested:false,setupLocked:false,activeResponseId:null,stopMonitorActive:false,voiceLastErrorMessage:'',voiceOpening:false,voiceActivationContext:'',
  setMicConnecting(){},recoverRealtimeAfterResumeSync(){},realtimeReusableFor:()=>false,teardownRealtime(){},
  ensureSession:async()=>{sessions++;if(fail)throw new Error('Synthetic transport failure')},realtimeReady:()=>true,setRealtimeTurnProfile:async()=>{},setVoice:v=>{env.listening=v},
  voiceActivationErrorMessage:e=>e.message,fallbackVoiceAvailable:()=>true,shouldUseBrowserVoiceFallback:()=>true,startBrowserVoiceFallback:()=>{native++;return true},
  aiUniversalSetState(){},$:()=>({textContent:''}),primaryVoiceStatusTarget:()=>({textContent:''})
 });
 vm.runInContext(section('function gestureSafeBrowserVoicePreferred(){','function shouldUseBrowserVoiceFallback(')+'\n'+section('async function toggleVoice(', '\nfunction dateSetup'),env);
 const opened=await env.toggleVoice('setup');return{native,sessions,opened,listening:env.listening};
}
assert.deepEqual(await run(''),{native:1,sessions:0,opened:true,listening:false});
assert.deepEqual(await run('?voice_transport=realtime'),{native:0,sessions:1,opened:true,listening:true});
assert.deepEqual(await run('?voice_transport=realtime',true),{native:0,sessions:1,opened:false,listening:false});
console.log('PASS simulated selection: default unchanged; explicit Realtime opens WebRTC; failure stays visible without silently reverting to native recognition. Not a physical voice test.');
