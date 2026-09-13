import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const helpers=html.slice(html.indexOf('let browserVoiceFollowupContext='),html.indexOf('function stopAiUniversalOutput('));
function fixture({rejectPlay=false,stuckFetch=false}={}){
 const nodes=new Map(),events=[],states=[];let tick=null,now=0;
 function element(tag){return {tag,style:{},children:[],setAttribute(k,v){this[k]=v},appendChild(child){this.children.push(child);if(child.id)nodes.set(child.id,child)},insertAdjacentElement(_,child){nodes.set(child.id,child)}}}
 nodes.set('toolbar',element('nav'));
 class Audio {constructor(){Object.assign(this,element('audio'));this.currentTime=0;this.paused=true;this.ended=false;this.muted=true}play(){if(rejectPlay)return Promise.reject(new Error('NotAllowedError'));this.paused=false;this.onplay?.();this.onplaying?.();return Promise.resolve()}pause(){this.paused=true;this.onpause?.()}}
 const env=vm.createContext({AbortController,console,Audio,Date:{now:()=>now},setTimeout,clearTimeout,setInterval:fn=>{tick=fn;return 1},clearInterval:()=>{tick=null},URL:{createObjectURL:()=> 'blob:verified',revokeObjectURL(){}},
 $:id=>nodes.get(id),document:{querySelector:()=>nodes.get('toolbar'),createElement:element},voiceContext:'round',listening:false,browserVoiceRecognition:null,browserVoiceActive:false,browserVoiceRequested:false,startBrowserVoiceFallback:()=>true,aiUniversalMuted:false,aiUniversalSpeechPrimed:false,aiUniversalTtsAudio:null,aiUniversalTtsObjectUrl:'',cedarSpeechServerBlockedUntil:0,CEDAR_SPEECH_RETRY_MS:1000,
 window:{gscgApiUrl:x=>x},reportVoiceHealth:event=>events.push(event),setPrimaryVoiceMatrix:(state,context,message)=>states.push(message||state),aiUniversalSetState:state=>states.push(state),aiUniversalSpeechLanguage:()=> 'es-GT',speakAiUniversalMaleBrowserFallback:async()=>false,
 fetch:async()=>stuckFetch?await new Promise(()=>{}):({ok:true,headers:{get:()=> 'fish'},blob:async()=>({size:12000})})});
 vm.runInContext(helpers,env);return {env,nodes,events,states,advance(ms,time){now+=ms;if(time!==undefined)env.aiUniversalTtsAudio.currentTime=time;tick?.()}};
}
const f=fixture();assert.equal(await f.env.speakAiUniversalText('<b>Respuesta real</b>'),true);
assert.equal(f.nodes.get('universalSpokenAnswerText').textContent,'<b>Respuesta real</b>');
assert.equal(f.nodes.get('universalSpokenAnswerText').innerHTML,undefined);
assert.equal(f.env.aiUniversalTtsAudio.controls,true);assert.equal(f.env.aiUniversalTtsAudio.muted,false);
assert.ok(f.nodes.get('universalSpokenAnswer').children.includes(f.env.aiUniversalTtsAudio));
f.advance(500,.5);assert.ok(f.events.includes('browser_fallback_speech_progress'));
f.env.aiUniversalTtsAudio.onended();assert.ok(f.events.includes('browser_fallback_speech_ended'));assert.match(f.states.at(-1),/LISTO/);
console.log('PASS texto seguro visible, audio adjunto con controles y sin mute, avance y finalización diferenciados');
const blocked=fixture({rejectPlay:true});assert.equal(await blocked.env.speakAiUniversalText('Se puede leer aunque Safari bloquee el audio'),false);assert.match(blocked.nodes.get('universalSpokenAnswerText').textContent,/Se puede leer/);assert.ok(blocked.events.includes('browser_fallback_speech_failed'));console.log('PASS rechazo de reproducción conserva texto y controles, devuelve false');
const stalled=fixture();await stalled.env.speakAiUniversalText('Respuesta que no avanza');stalled.advance(11000,0);assert.ok(stalled.env.aiUniversalTtsAudio.paused);assert.match(stalled.states.at(-1),/NO SE PUDO/);assert.equal(stalled.nodes.get('universalSpokenAnswerText').textContent,'Respuesta que no avanza');console.log('PASS audio sin avance abandona RESPONDIENDO y conserva respuesta');
const controller=new AbortController();await assert.rejects(f.env.universalVoiceDeadline(new Promise(()=>{}),5,controller),/UNIVERSAL_VOICE_TIMEOUT/);assert.equal(controller.signal.aborted,true);console.log('PASS espera bloqueada finaliza y aborta solicitud');
assert.equal(await f.env.universalVoiceDeadline(Promise.resolve('segunda respuesta'),100), 'segunda respuesta');
for(let i=0;i<10;i++){assert.equal(await f.env.speakAiUniversalText('Respuesta '+i),true);f.env.aiUniversalTtsAudio.onended()}
assert.equal(f.nodes.get('universalSpokenAnswerText').textContent,'Respuesta 9');console.log('PASS diez reproducciones simuladas consecutivas');
const timed=fixture();const originalDeadline=timed.env.universalVoiceDeadline;timed.env.universalVoiceDeadline=(operation,_,controller)=>originalDeadline(operation,5,controller);
timed.nodes.set('aiUniversalInput',{value:''});timed.nodes.set('sendAiUniversal',{disabled:false});
Object.assign(timed.env,{aiUniversalTextBusy:false,aiUniversalTextAbortController:null,aiUniversalRulesMode:false,aiUniversalHistory:[],AI_UNIVERSAL_HISTORY_LIMIT:80,aiUniversalRemember(){},routeAiUniversalAppText:()=>({handled:false}),aiUniversalAppContext:()=>({}),fetch:()=>new Promise(()=>{})});
vm.runInContext(html.slice(html.indexOf('async function submitAiUniversalText('),html.indexOf('async function continueConversationAfterTool(')),timed.env);
assert.equal(await timed.env.submitAiUniversalText('Pregunta que queda esperando',{voiceOnly:true}),false);assert.equal(timed.env.aiUniversalTextBusy,false);assert.equal(timed.nodes.get('sendAiUniversal').disabled,false);assert.equal(timed.states.at(-1),'SERVICIO DE RESPUESTAS NO DISPONIBLE');console.log('PASS timeout real del envío libera turno y botón, muestra error');
// Exercise the real audio-ended -> recognition-start -> result -> finalize path.
const turns=fixture();let starts=0,queries=[];const e=turns.env;
Object.assign(e,{browserVoiceContext:'round',browserVoiceStopping:false,browserVoiceErrored:false,browserVoiceRestartCount:0,browserVoiceTransportRetryCount:0,browserVoiceSilenceTimer:null,browserVoiceTranscript:'',browserVoiceInterim:'',browserVoiceCandidates:[],browserVoiceItemId:'',browserVoiceAppliedEntryCount:0,phase:'idle',
 releaseAiUniversalPlaybackForListening(){},fallbackVoiceConstructor:()=>class{start(){starts++;this.onstart?.()}abort(){}stop(){this.onend?.()}},
 clearBrowserVoiceSilenceTimer(){},clearBrowserVoiceFirstResultTimer(){},clearBrowserVoiceStopGuardTimer(){},clearBrowserVoiceRetryTimer(){},
 sealBrowserVoiceProgress:()=>({handled:false}),mergeBrowserVoiceSegments:(a,b)=>[a,b].filter(Boolean).join(' '),selectBrowserVoiceCandidate:(_,__,text)=>({transcript:text,ambiguous:false}),isGeneralConversationIntent:()=>true,
 scheduleBrowserVoiceFirstResultTimeout(){},scheduleBrowserVoiceFinalize(){},browserVoiceAlternativeBeams:()=>[],applyBrowserVoiceProgressiveScore:()=>({applied:false}),restartBrowserVoiceAfterNaturalEnd:()=>false,
 processBrowserVoiceTranscript:async(_,text)=>{queries.push(text);vm.runInContext('browserVoiceFollowupContext="round"',e);await e.speakAiUniversalText('Respuesta '+queries.length)}
});
for(const [start,end] of [['function detachBrowserVoiceRecognition(', 'function browserVoiceTransportFailure('],['function finalizeBrowserVoiceFallback(', 'function restartBrowserVoiceAfterNaturalEnd('],['function stopBrowserVoiceFallback(', 'async function processBrowserVoiceTranscript('],['function beginBrowserVoiceRecognition(', 'function setMicConnecting(']]){const a=html.indexOf(start),b=html.indexOf(end,a);assert.ok(a>=0&&b>a);vm.runInContext(html.slice(a,b),e)}
assert.equal(e.startBrowserVoiceFallback('round'),true);
for(const query of ['Cómo está el clima en Colima México','Y en Madrid España']){const recognition=e.browserVoiceRecognition;recognition.onresult({resultIndex:0,results:[Object.assign([{transcript:query}],{isFinal:true})]});recognition.onend();await new Promise(r=>setImmediate(r));assert.equal(e.browserVoiceRecognition,null,'micrófono cerrado durante respuesta');e.aiUniversalTtsAudio.onended();assert.ok(e.browserVoiceRecognition,'audio finalizado reabre reconocimiento');assert.equal(e.listening,true)}
assert.deepEqual(queries,['Cómo está el clima en Colima México','Y en Madrid España']);assert.equal(starts,3);
vm.runInContext('browserVoiceFollowupContext="round"',e);e.stopBrowserVoiceFallback();e.aiUniversalTtsAudio.onended();assert.equal(starts,3,'Detener cancela reapertura');
console.log('PASS dos preguntas reconocidas, reactivación tras audio y Detener impide reinicio; reconocimiento simulado');
const longText='Esta primera frase contiene información suficiente para comenzar a hablar sin esperar toda la respuesta. '+ 'La explicación adicional permanece íntegra y se reproduce después, conservando el orden y el contexto. '.repeat(3).trim();
const queued=fixture();let finishRest,fetches=0,plays=0,reopens=0;
const extended='Contenido importante. '+ 'Información completa sin omitir palabras. '.repeat(150).trim();
const pieces=queued.env.splitUniversalSpeechText(extended);assert.ok(pieces.every(x=>x.length<=3500));assert.equal(Array.from(pieces).join(' '),extended);
const originalPlay=queued.env.Audio.prototype.play;
queued.env.Audio.prototype.play=function(){plays++;return originalPlay.call(this)};
queued.env.startBrowserVoiceFallback=()=>{reopens++;return true};
queued.env.fetch=async()=>{fetches++;if(fetches===2)await new Promise(resolve=>{finishRest=resolve});return{ok:true,headers:{get:()=> 'fish'},blob:async()=>({size:12000})}};
vm.runInContext('browserVoiceFollowupContext="round"',queued.env);
assert.equal(await queued.env.speakAiUniversalText(longText),true);
assert.equal(fetches,2);assert.equal(plays,1,'First phrase must play while rest is still pending');
assert.equal(queued.nodes.get('universalSpokenAnswerText').textContent,longText);
const oldEnd=queued.env.aiUniversalTtsAudio.onended;oldEnd();oldEnd();assert.equal(reopens,0);
finishRest();await new Promise(resolve=>setImmediate(resolve));assert.equal(plays,2);
oldEnd();assert.equal(plays,2);assert.equal(reopens,0);
queued.env.aiUniversalTtsAudio.onended();assert.equal(reopens,1);
assert.equal(queued.events.filter(x=>x==='browser_fallback_speech_started').length,1);
assert.equal(queued.events.filter(x=>x==='browser_fallback_speech_ended').length,1);
console.log('PASS first phrase starts before remainder; complete text retained, ordered audio, one start/end and no premature microphone reopen. Controlled audio.');
const canceled=fixture();let finishCanceled,calls=0,canceledPlays=0;
const oldPlay=canceled.env.Audio.prototype.play;canceled.env.Audio.prototype.play=function(){canceledPlays++;return oldPlay.call(this)};
canceled.env.fetch=async()=>{calls++;if(calls===2)await new Promise(resolve=>{finishCanceled=resolve});return{ok:true,headers:{get:()=> 'fish'},blob:async()=>({size:12000})}};
await canceled.env.speakAiUniversalText(longText);const endCanceled=canceled.env.aiUniversalTtsAudio.onended;
canceled.env.aiUniversalTtsAudio.gscCancelSpeech();endCanceled();finishCanceled();await new Promise(resolve=>setImmediate(resolve));
assert.equal(canceledPlays,1,'Canceled remainder must never start');
console.log('PASS canceling queued speech prevents late playback. Controlled audio.');
const failedRest=fixture();let requests=0;failedRest.env.fetch=async()=>({ok:++requests===1,status:502,headers:{get:()=> 'fish'},blob:async()=>({size:12000})});
await failedRest.env.speakAiUniversalText(longText);failedRest.env.aiUniversalTtsAudio.onended();await new Promise(resolve=>setImmediate(resolve));
assert.equal(failedRest.nodes.get('universalSpokenAnswerText').textContent,longText);assert.equal(failedRest.states.at(-1),'NO SE PUDO COMPLETAR EL AUDIO');
console.log('PASS remainder failure preserves full text and reports failure, without replaying first phrase. Controlled audio.');
