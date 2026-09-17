import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {validateAudio,default as transcribeHandler} from './api/voice-transcribe.js';

let time=1000;
const env={Blob,AbortController,setTimeout,clearTimeout,Date:{now:()=>time}};
vm.runInNewContext(fs.readFileSync('voice-turns.js','utf8'),env);
const {createController}=env.GSCVoiceTurns;
let streams=[],calls=[],states=[],recorders=[],fail=false;
function stream(){const track={stopped:0,stop(){this.stopped++}};const s={track,getTracks:()=>[track],getAudioTracks:()=>[track]};streams.push(s);return s}
class Recorder{
  static isTypeSupported(type){return type==='audio/mp4'}
  constructor(s,options){this.stream=s;this.mimeType=options.mimeType;this.state='inactive';recorders.push(this)}
  start(){this.state='recording'}
  stop(){this.state='inactive';this.ondataavailable?.({data:new Blob([new Uint8Array(1024)],{type:this.mimeType})});queueMicrotask(()=>this.onstop?.())}
}
const deps={Recorder,getUserMedia:async()=>stream(),prepare(){},state(...args){states.push(args)},transcribe:async(blob,id)=>{calls.push(['transcribe',id,blob.type]);if(fail)throw Error('NETWORK');return 'Pregunta '+id},dispatch:async(context,text,id)=>calls.push(['dispatch',id,text])};
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve()};
const control=createController(deps);
for(let i=0;i<100;i++){
  assert.equal(await control.press(i%2?'round':'setup'),true);
  assert.equal(await control.press('round'),false,'duplicate press cannot open another capture');
  time+=1000;assert.equal(control.release(),true);assert.equal(control.release(),false);
  await flush();assert.equal(control.isBusy(),false);assert.ok(streams.at(-1).track.stopped>0);
}
assert.equal(streams.length,100);assert.equal(calls.filter(x=>x[0]==='dispatch').length,100);
assert.equal(new Set(calls.filter(x=>x[0]==='dispatch').map(x=>x[1])).size,100);
await flush();assert.equal(streams.length,100,'audio completion must never open another microphone');
console.log('PASS 100 controlled independent presses: one capture/transcription/dispatch each; tracks stopped; zero automatic reopen');

let permission;
const late=createController({...deps,getUserMedia:()=>new Promise(resolve=>permission=resolve)});
const opening=late.press('setup');late.release();const lateStream=stream();permission(lateStream);await opening;
assert.ok(lateStream.track.stopped);assert.equal(late.isBusy(),false);
const before=calls.length;assert.equal(before,200);
console.log('PASS release before permission resolves stops late stream and sends nothing');

let finishTranscript;
const canceled=createController({...deps,transcribe:()=>new Promise(resolve=>finishTranscript=resolve)});
await canceled.press('round');time+=1000;canceled.release();await flush();canceled.cancel();finishTranscript('Hoyo 1 cuatro');await flush();assert.equal(calls.length,before);
console.log('PASS cancellation during transcription discards late text; no score dispatch');

fail=true;await control.press('round');time+=1000;control.release();await flush();assert.equal(control.isBusy(),false);fail=false;
await control.press('round');time+=1000;control.release();await flush();assert.equal(control.isBusy(),false);
assert.equal(states.some(s=>s[0]==='error'),true);
console.log('PASS failed HTTP turn releases state; following press succeeds');

assert.equal(validateAudio({audio:'!',mediaType:'audio/mp4'}),null);
assert.equal(validateAudio({audio:Buffer.alloc(1024).toString('base64'),mediaType:'text/html'}),null);
assert.ok(validateAudio({audio:Buffer.alloc(1024).toString('base64'),mediaType:'audio/mp4;codecs=mp4a.40.2'}));
const request={method:'POST',headers:{origin:'https://evil.example',host:'app.example'},body:{audio:Buffer.alloc(1024).toString('base64'),mediaType:'audio/mp4'}};
let status=0,result;const res={setHeader(){},status(s){status=s;return this},json(v){result=v;return this}};
await transcribeHandler(request,res);assert.equal(status,403);
request.headers={};request.body.audio='bad';await transcribeHandler(request,res);assert.equal(status,400);
console.log('PASS transcription endpoint rejects foreign origin, malformed base64 and unsupported media');

const html=fs.readFileSync('index-grupal.html','utf8');
const source=html.slice(html.indexOf('function resumeBrowserVoiceConversation('),html.indexOf('function showUniversalSpokenAnswer('));
let reopened=0;const scope={window:{GSCVoiceTurns:{enabled:true}},browserVoiceFollowupContext:'setup',startBrowserVoiceFallback(){reopened++}};
vm.runInNewContext(source,scope);assert.equal(scope.resumeBrowserVoiceConversation(),false);assert.equal(reopened,0);assert.equal(scope.browserVoiceFollowupContext,null);
assert.match(html,/window.GSCVoiceTurns.install\(/);assert.match(html,/processBrowserVoiceTranscript\(context,text\)/);
console.log('PASS production followup function cannot reopen native recognition in PTT mode; official transcript router reused');
console.log('LIMIT: simulated capture and HTTP failures; not physical iPhone or live provider acceptance.');

// Delayed finalization must not inflate the duration of a short press.
class DelayedRecorder extends Recorder{
  stop(){this.state='inactive'}
  finish(){this.ondataavailable?.({data:new Blob([new Uint8Array(1024)],{type:this.mimeType})});this.onstop?.()}
}
let delayedSends=0,buttonBusy=false,denyPermission=false;
const delayed=createController({...deps,Recorder:DelayedRecorder,busy:value=>buttonBusy=value,getUserMedia:async()=>{if(denyPermission)throw Object.assign(Error('denied'),{name:'NotAllowedError'});return stream()},transcribe:async()=>{delayedSends++;return 'Pregunta'}});
await delayed.press('setup');time+=1000;delayed.release();
assert.equal(buttonBusy,true);assert.equal(delayedSends,0);assert.equal(await delayed.press('setup'),false);
recorders.at(-1).finish();await flush();assert.equal(buttonBusy,false);assert.equal(delayedSends,1);
console.log('PASS delayed onstop blocks next capture and transcription until final data arrives');
await delayed.press('setup');time+=50;delayed.release();time+=1000;recorders.at(-1).finish();await flush();
assert.equal(delayedSends,1,'50ms recording remains short even when onstop arrives 1000ms later');assert.equal(buttonBusy,false);
console.log('PASS short press rejected independently of onstop delay');
denyPermission=true;assert.equal(await delayed.press('setup'),false);assert.equal(delayed.isBusy(),false);
denyPermission=false;assert.equal(await delayed.press('setup'),true);delayed.cancel();
console.log('PASS denied permission releases turn; next press obtains a new stream');

const wraps=Object.fromEntries(['setupMicWrap','headerMicWrap'].map(id=>[id,{dataset:{},classList:{toggle(name,on){this[name]=on}}}]));
env.document={querySelectorAll:()=>[],getElementById:id=>wraps[id]||null,addEventListener(){}};
env.navigator={mediaDevices:{getUserMedia:async()=>stream()}};env.MediaRecorder=Recorder;env.addEventListener=()=>{};
const visual=env.GSCVoiceTurns.install({prepare(){},state(){},context:()=> 'round',dispatch(){}});
await visual.press('round');assert.equal(wraps.headerMicWrap.dataset.pttListening,'true');assert.equal(wraps.setupMicWrap.dataset.pttListening,'false');visual.cancel();assert.equal(wraps.headerMicWrap.dataset.pttListening,'false');
await visual.press('setup');assert.equal(wraps.setupMicWrap.dataset.pttListening,'true');visual.cancel();
console.log('PASS installed PTT activates only the recording microphone and resets on cancel');
const showSource=html.slice(html.indexOf('function showUniversalSpokenAnswer('),html.indexOf('async function universalVoiceDeadline('));
const paragraph={},card={appendChild(){}};const showEnv={window:{GSCVoiceTurns:{enabled:true}},voiceContext:'setup',$:id=>id==='universalSpokenAnswerText'?paragraph:id==='universalSpokenAnswer'?card:{}};
vm.runInNewContext(showSource,showEnv);showEnv.showUniversalSpokenAnswer('Respuesta en español');assert.equal(paragraph.hidden,true);assert.equal(card.hidden,true,'Voice-only output must not leave an empty card');
showEnv.window.GSCVoiceTurns.enabled=false;showEnv.showUniversalSpokenAnswer('Respuesta por texto');assert.equal(paragraph.hidden,false);assert.equal(card.hidden,false);
console.log('PASS PTT hides answer text and entire card; text mode restores both');

let heldDispatches=0;
const held=createController({...deps,Recorder:DelayedRecorder,transcribe:async()=>{heldDispatches++;return 'Hoyo 1 cuatro hoyo 2 cinco'}});
await held.press('round');time+=20000;await flush();assert.equal(held.isBusy(),true);assert.equal(heldDispatches,0);
recorders.at(-1).finish();await flush();assert.equal(heldDispatches,0);assert.equal(held.isBusy(),false);
await held.press('round');time+=20000;assert.equal(heldDispatches,0);held.release();recorders.at(-1).finish();await flush();assert.equal(heldDispatches,1);
console.log('PASS 20-second hold sends nothing before release; unexpected recorder stop discards partial audio; next full turn sends once');

// A real timer scheduler under a virtual clock proves there is no auto-submit at 60s.
const pendingTimers=new Map();let timerId=0;
const clockEnv={Blob,AbortController,Date:{now:()=>time},setTimeout:(fn,ms)=>{const id=++timerId;pendingTimers.set(id,{fn,at:time+ms});return id},clearTimeout:id=>pendingTimers.delete(id)};
vm.runInNewContext(fs.readFileSync('voice-turns.js','utf8'),clockEnv);
const longCalls=[];
const sustained=clockEnv.GSCVoiceTurns.createController({...deps,transcribe:async()=>{longCalls.push('sent');return 'hoyo 1 cuatro hoyo 2 cinco hoyo 3 cuatro hoyo 4 seis hoyo 5 tres'},dispatch:async(_c,t)=>longCalls.push(t)});
await sustained.press('round');time+=90000;
for(const [id,timer] of pendingTimers)if(timer.at<=time){pendingTimers.delete(id);timer.fn()}
await flush();assert.deepEqual(longCalls,[]);assert.equal(sustained.isBusy(),true);
sustained.release();await flush();assert.equal(longCalls.length,2);
console.log('PASS 90-second simulated hold: no auto-stop or submit; release sends entire five-hole transcript once');
const rosterHtml=fs.readFileSync('index-grupal.html','utf8');
const rosterSource=rosterHtml.slice(rosterHtml.indexOf('function normalizeExplicitPttRoster('),rosterHtml.indexOf('const discreteVoiceController='));
const normalizeSpeech=v=>v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const normalizeRoster=new Function('normalizeSpeech',rosterSource+';return normalizeExplicitPttRoster')(normalizeSpeech);
assert.equal(normalizeRoster('Jugador número uno nombre Jaime handicap 13 marcas blancas'),'jugador uno jaime handicap 13 marcas blancas');
assert.equal(normalizeRoster('Jugador número uno Jaime handicap 13 marcas blancas jugador número dos Miguel handicap 14 marcas azules'),'jugador uno jaime handicap 13 marcas blancas jugador dos miguel handicap 14 marcas azules');
for(const phrase of ['Jaime 13 blancas','cuál es el handicap del jugador número uno','cuál es la capital de Italia'])assert.equal(normalizeRoster(phrase),null);
console.log('PASS explicit roster command normalizes position separately from name; conversational phrases cannot enter roster adapter');
const setupEnv={normalizeSpeech,normalizeTee:t=>({blancas:'blancas',azules:'azules'}[t]||null),normalizeMatrix:()=>null,stripPulteCourseTokens:t=>t,canonicalPlayerNameKey:normalizeSpeech,draftPlayers:[],handicapRectificationMode:false,rosterAddMode:false};
const setupCode=rosterHtml.slice(rosterHtml.indexOf('const WORD_NUMBERS='),rosterHtml.indexOf('function parseInlineManualRosterPhrase('));
vm.runInNewContext(setupCode+';this.parseRoster=parseSetupTranscript',setupEnv);
const actualRoster=setupEnv.parseRoster(normalizeRoster('Jugador número uno nombre Jaime handicap 13 marcas blancas jugador número dos Miguel handicap 14 marcas azules'));
assert.equal(actualRoster.ok,true);
assert.deepEqual(JSON.parse(JSON.stringify(actualRoster.changes.map(p=>[p.position,p.name,p.handicap,p.tee]))),[[1,'Jaime',13,'blancas'],[2,'Miguel',14,'azules']]);
console.log('PASS actual setup parser receives explicit slots and stores Jaime/Miguel without numero prefixes');

// PTT closures use the same Fish output and never reopen Realtime on failure.
{
 const page=fs.readFileSync('index-grupal.html','utf8');
 const source=page.slice(page.indexOf('async function speakClosure('),page.indexOf('async function speakQuery('));
 for(const success of [true,false]){
  let fish=0,other=0;
  const context=vm.createContext({window:{GSCVoiceTurns:{enabled:true}},clearOperationalMissingPrompt(){},listening:false,micTrack:null,stopMonitorActive:false,speakAuthorized(){other++;return true},speakAiUniversalText:async()=>{fish++;return success},ensureSession:async()=>{other++},ensureAnnouncedState(){},round:{announced:{front:true}},persist(){},console});
  vm.runInContext(source,context);
  assert.equal(await context.speakClosure('Primera vuelta.'),success);
  assert.equal(fish,1);assert.equal(other,0);
  if(!success)assert.equal(context.round.announced.front,false);
 }
 console.log('PASS PTT closure uses Fish only; failed audio retains retry without Cedar');
}
{
 const page=fs.readFileSync('index-grupal.html','utf8');
 const source=page.slice(page.indexOf('const discreteVoiceController='),page.indexOf('for(const context of ["setup","round"])',page.indexOf('const discreteVoiceController=')));
 for(const closure of ['', 'Primera vuelta.']){
  let adapter,writes=0;const spoken=[];
  const context=vm.createContext({window:{GSCVoiceTurns:{install:options=>{adapter=options}}},voiceContext:'round',phase:'idle',browserVoiceFollowupContext:null,parseRoundScoreTranscript:()=>({ok:true,entries:[{hole:9,gross:4}]}),isGeneralConversationIntent:()=>false,applyLiteralScores:()=>{writes++;return {ok:true,closure}},reportVoiceHealth(){},setPrimaryVoiceMatrix(){},speakClosure:async text=>spoken.push(text)});
  vm.runInContext(source,context);assert.equal(await adapter.dispatch('round','hoyo nueve cuatro'),true);assert.equal(writes,1);assert.deepEqual(spoken,closure?[closure]:[]);
 }
 console.log('PASS PTT adapter writes once and announces only a returned turn closure');
}

// Measure release-to-playback without including the user's speaking time.
{
  const {sanitizeVoiceHealth}=await import('./api/voice-health.js');
  let tick=100;
  const clock=env.GSCVoiceTurns.createLatencyClock(()=>tick);
  const measured=createController({...deps,measure:(id,stage)=>clock.mark(id,stage),
    transcribe:async()=>{tick+=1100;return 'Pregunta de prueba'},
    dispatch:async()=>{tick+=4200}});
  fail=false;
  for(let i=0;i<2;i++){
    await measured.press('setup');assert.equal(clock.snapshot(),null);
    tick+=8000;time+=8000;measured.release();await flush();
    const reading=clock.snapshot();
    assert.equal(reading.recordingReadyMs,0);
    assert.equal(reading.transcriptionReadyMs,1100);
    assert.equal(reading.elapsedMs,5300,'Speaking time is excluded');
    clock.mark(reading.turnId,'answerReadyMs');tick+=650;clock.mark(reading.turnId,'audioReadyMs');
    tick+=250;clock.mark(reading.turnId,'audioPlayingMs');
    clock.mark('ptt_0_0','audioPlayingMs');tick+=200;clock.mark(reading.turnId,'audioPlayingMs');
    assert.equal(clock.snapshot().audioPlayingMs,6200,'Duplicate playing events cannot move the first onset');
    const metrics=[];
    const reporter=html.slice(html.indexOf('function reportVoiceHealth('),html.indexOf('\nfunction isGeneralConversationIntent('));
    const ctx={window:{GSCVoiceTurns:{latency:clock},gscgApiUrl:x=>x},Date,voiceContext:'setup',voiceHealthTurn:0,voiceHealthTurnStartedAt:0,
      VOICE_HEALTH_EVENTS:new Set(['browser_fallback_audio_playing']),fetch:async(url,options)=>metrics.push(JSON.parse(options.body))};
    vm.runInNewContext(reporter,ctx);ctx.reportVoiceHealth('browser_fallback_audio_playing');
    const safe=sanitizeVoiceHealth({...metrics[0],query:'private question',audio:'secret',latitude:14.6});
    assert.equal(safe.elapsedMs,6400);assert.equal(safe.transcriptionReadyMs,1100);assert.equal(safe.audioPlayingMs,6200);
    assert.equal(safe.turnId,reading.turnId);assert.equal(safe.query,undefined);assert.equal(safe.audio,undefined);assert.equal(safe.latitude,undefined);
    assert.equal(measured.isBusy(),false);
  }
  const invalid=sanitizeVoiceHealth({event:'browser_fallback_audio_playing',turnId:'private text',audioPlayingMs:Infinity,answerReadyMs:-1});
  assert.equal(invalid.turnId,undefined);assert.equal(invalid.audioPlayingMs,0);assert.equal(invalid.answerReadyMs,0);
  const broken=createController({...deps,measure(){throw Error('metrics failed')}});
  await broken.press('setup');time+=1000;broken.release();await flush();assert.equal(broken.isBusy(),false);
  console.log('PASS measured controller + actual client reporter + server sanitizer: two turns, release origin, transcription, first playback, duplicate/stale events, privacy and non-blocking metrics failures. Simulated timing, not physical latency.');
}
