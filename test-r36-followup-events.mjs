import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.VOICE_SOURCE||'index-grupal.html','utf8');
const section=(from,to)=>{const start=html.indexOf(from);return start<0?'':html.slice(start,html.indexOf(to,start))};
let opened=0;
const env=vm.createContext({console,Date,setInterval:()=>1,clearInterval(){},
 browserVoiceFollowupContext:null,browserVoiceRecognition:null,browserVoiceActive:false,browserVoiceRequested:false,
 listening:false,voiceContext:'round',phase:'idle',reportVoiceHealth(){},setPrimaryVoiceMatrix(){},aiUniversalSetState(){},
 submitAiUniversalText:async()=>true,startBrowserVoiceFallback(context){assert.equal(context,'round');opened++;return true}
});
vm.runInContext(section('function resumeBrowserVoiceConversation(', 'function showUniversalSpokenAnswer(')+section('function monitorUniversalAudio(', 'async function speakAiUniversalText(')+section('async function answerBrowserVoiceQuery(', 'function scheduleBrowserVoiceTransportRetry('),env);
for(let i=0;i<100;i++){
 const before=opened;
 assert.equal(await env.answerBrowserVoiceQuery('round','Pregunta '+i),true);
 const player={currentTime:0,paused:false,ended:false};env.monitorUniversalAudio(player);
 assert.equal(opened,before,'Recognition must not restart before speech ends');
 player.onended();
 assert.equal(opened,before+1,'Speech ended must open next listening turn');
 player.onended();assert.equal(opened,before+1,'Duplicate ended must not open duplicate recognition');
}
console.log('PASS 100 controlled answer → speech-ended → next-listening transitions; zero duplicate opens. No native ASR, audio playback, or iPhone certification.');
