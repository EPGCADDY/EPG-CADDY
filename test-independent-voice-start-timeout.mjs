// Controlled lifecycle simulation: no native microphone, ASR, AI or speaker.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.VOICE_SOURCE||'index-grupal.html','utf8');
function section(a,b){const start=html.indexOf(a),end=html.indexOf(b,start);assert.ok(start>=0&&end>start);return html.slice(start,end)}
const timers=new Map(),states=[],events=[],queries=[],nodes=new Map();let now=0,id=0,starts=0,aborts=0,stallNext=false;
const node=()=>({style:{},classList:{add(){},remove(){}},setAttribute(){},appendChild(child){if(child.id)nodes.set(child.id,child)},insertAdjacentElement(_,child){nodes.set(child.id,child)}});
nodes.set('toolbar',node());nodes.set('aiUniversalInput',{value:''});nodes.set('sendAiUniversal',{disabled:false});
class Recognition{start(){starts++;if(!stallNext)this.onstart?.();stallNext=false}stop(){/* injected missing onend */}abort(){aborts++}}
class Audio{constructor(){Object.assign(this,node(),{currentTime:0,paused:true,ended:false})}play(){this.paused=false;this.onplay?.();this.onplaying?.();return Promise.resolve()}pause(){this.paused=true;this.onpause?.()}removeAttribute(){}load(){}}
const env=vm.createContext({console,AbortController,Audio,Math,Date:{now:()=>now},URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},
 setTimeout:(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id},clearTimeout:key=>timers.delete(key),setInterval:()=>0,clearInterval(){},
 $:key=>nodes.get(key),document:{querySelector:()=>nodes.get('toolbar'),createElement:node},window:{gscgApiUrl:p=>p},
 voiceContext:'round',browserVoiceContext:'round',phase:'idle',listening:false,browserVoiceRecognition:null,browserVoiceRequested:false,browserVoiceActive:false,
 browserVoiceStopping:false,browserVoiceErrored:false,browserVoiceTranscript:'',browserVoiceInterim:'',browserVoiceCandidates:[],browserVoiceItemId:'',browserVoiceAppliedEntryCount:0,browserVoiceRestartCount:0,browserVoiceTransportRetryCount:0,
 browserVoiceSilenceTimer:null,browserVoiceFirstResultTimer:null,browserVoiceStopGuardTimer:null,browserVoiceRetryTimer:null,
 BROWSER_VOICE_FIRST_RESULT_TIMEOUT_MS:8000,BROWSER_VOICE_STOP_GUARD_MS:1200,BROWSER_VOICE_SILENCE_MS:1200,
 aiUniversalMuted:false,aiUniversalSpeechPrimed:false,aiUniversalSpeechPrimer:null,aiUniversalTtsAudio:null,aiUniversalTtsObjectUrl:'',cedarSpeechServerBlockedUntil:0,CEDAR_SPEECH_RETRY_MS:1000,
 aiUniversalTextBusy:false,aiUniversalTextAbortController:null,aiUniversalRulesMode:false,aiUniversalHistory:[],AI_UNIVERSAL_HISTORY_LIMIT:80,
 aiUniversalRemember(role,content){env.aiUniversalHistory.push({role,content})},routeAiUniversalAppText:()=>({handled:false}),aiUniversalAppContext:()=>({}),
 reportVoiceHealth:e=>events.push(e),setPrimaryVoiceMatrix:(state,context,message)=>states.push(message||state),aiUniversalSetState:state=>states.push(state),
 fallbackVoiceConstructor:()=>Recognition,aiUniversalSpeechLanguage:()=> 'es-GT',speakAiUniversalMaleBrowserFallback:async()=>false,
 sealBrowserVoiceProgress:()=>({handled:false}),mergeBrowserVoiceSegments:(a,b)=>[a,b].filter(Boolean).join(' '),selectBrowserVoiceCandidate:(_,__,text)=>({transcript:text,ambiguous:false}),isGeneralConversationIntent:()=>true,
 browserVoiceAlternativeBeams:()=>[],applyBrowserVoiceProgressiveScore:()=>({applied:false}),restartBrowserVoiceAfterNaturalEnd:()=>false,
 fetch:async(path,options)=>path==='/api/universal-ai'?{ok:true,json:async()=>({ok:true,answer:'Respuesta '+JSON.parse(options.body).query,sources:[]})}:{ok:true,headers:{get:()=> 'fish'},blob:async()=>({size:1000})},
 processBrowserVoiceTranscript:async(context,text)=>{queries.push(text);return env.answerBrowserVoiceQuery(context,text)}
});
vm.runInContext([
 section('function releaseAiUniversalPlaybackForListening(', 'function preferredMaleBrowserVoice('),
 section('let browserVoiceFollowupContext=', 'function stopAiUniversalOutput('),
 section('async function submitAiUniversalText(', 'async function continueConversationAfterTool('),
 section('function clearBrowserVoiceSilenceTimer(', 'function browserVoiceCombinedTranscript('),
 section('function finalizeBrowserVoiceFallback(', 'function restartBrowserVoiceAfterNaturalEnd('),
 section('function stopBrowserVoiceFallback(', 'async function processBrowserVoiceTranscript('),
 section('async function answerBrowserVoiceQuery(', 'function scheduleBrowserVoiceTransportRetry('),
 section('function beginBrowserVoiceRecognition(', 'function setMicConnecting(')
].join('\n'),env);
function advance(ms){const target=now+ms;for(;;){const next=[...timers.entries()].filter(([,v])=>v.at<=target).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;timers.delete(next[0]);now=next[1].at;next[1].fn()}now=target}
async function ask(text){const rec=env.browserVoiceRecognition;assert.ok(rec);rec.onresult({resultIndex:0,results:[Object.assign([{transcript:text}],{isFinal:true})]});rec.onend();await new Promise(r=>setImmediate(r));assert.equal(nodes.get('universalSpokenAnswerText').textContent,'Respuesta '+text);assert.equal(env.aiUniversalTtsAudio.paused,false);assert.equal(env.aiUniversalTextBusy,false)}
assert.equal(env.startBrowserVoiceFallback('round'),true);
await ask('Primera pregunta');console.log('PASS simulation: first question has written answer and playback start');
stallNext=true;env.aiUniversalTtsAudio.onended();
const stuck=env.browserVoiceRecognition,lateStart=stuck.onstart;
assert.equal(env.browserVoiceRequested,true);assert.equal(env.listening,false);
advance(9201);
assert.equal(env.browserVoiceRecognition,null,'Second listening without onstart must release capture within 9.2 seconds');
assert.equal(env.browserVoiceRequested,false);assert.equal(env.phase,'idle');assert.match(states.at(-1),/NO ESCUCHÉ/);
lateStart();assert.equal(env.browserVoiceRecognition,null,'Late callback must not resurrect released capture');
assert.ok(aborts>0);assert.ok(events.includes('browser_fallback_no_result_timeout'));
console.log('PASS simulation: missing onstart AND onend releases capture within 9.2 seconds, visible recovery, late callback ignored');
assert.equal(env.startBrowserVoiceFallback('round'),true);await ask('Segunda pregunta');env.aiUniversalTtsAudio.onended();assert.equal(env.listening,true);
await ask('Tercera pregunta');env.aiUniversalTtsAudio.onended();assert.equal(env.listening,true);
console.log('PASS simulation: after manual recovery, two consecutive questions have written answers, playback starts and listening resumes');
env.stopBrowserVoiceFallback();const stopStarts=starts;advance(20000);assert.equal(starts,stopStarts);assert.equal(env.browserVoiceRecognition,null);
console.log('PASS simulation: manual retry responds and resumes listening; Stop cancels timer without restarting');
