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
