import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.VOICE_SOURCE||'index-grupal.html','utf8');
const extract=(from,to)=>html.slice(html.indexOf(from),html.indexOf(to,html.indexOf(from)));
const timers=new Map(), events=[], states=[];let next=0,held=true,aborts=0;
const recognition={stop(){/* Browser fails to emit onend; capture remains held. */},abort(){held=false;aborts++;this.onend?.()},onend(){throw Error('stale callback must be detached')}};
const env=vm.createContext({console,setTimeout:fn=>{timers.set(++next,fn);return next},clearTimeout:id=>timers.delete(id),
 browserVoiceRecognition:recognition,browserVoiceSilenceTimer:null,browserVoiceFirstResultTimer:null,browserVoiceStopGuardTimer:null,browserVoiceRetryTimer:null,
 browserVoiceStopping:false,browserVoiceTranscript:'',browserVoiceInterim:'',browserVoiceCandidates:[],browserVoiceErrored:false,
 browserVoiceRequested:true,browserVoiceActive:true,browserVoiceRestartCount:0,browserVoiceTransportRetryCount:0,listening:true,phase:'listening',
 BROWSER_VOICE_STOP_GUARD_MS:1200,BROWSER_VOICE_MAX_TRANSPORT_RETRIES:2,BROWSER_VOICE_TRANSPORT_RETRY_MS:250,
 mergeBrowserVoiceSegments:()=>'',selectBrowserVoiceCandidate:()=>({transcript:'',ambiguous:false}),
 setPrimaryVoiceMatrix:(...args)=>states.push(args),reportVoiceHealth:(...args)=>events.push(args),$:()=>({classList:{remove(){}}}),
 beginBrowserVoiceRecognition(){assert.equal(held,false,'new recognition must not compete with old capture');return true}
});
vm.runInContext(extract('function clearBrowserVoiceSilenceTimer(', 'function scheduleBrowserVoiceFinalize(')+'\n'+extract('function finalizeBrowserVoiceFallback(', 'function restartBrowserVoiceAfterNaturalEnd(')+'\n'+extract('function scheduleBrowserVoiceTransportRetry(', 'function beginBrowserVoiceRecognition('),env);
env.stopBrowserVoiceRecognitionSafely(recognition,'setup');
for(const fn of [...timers.values()])fn();
assert.equal(held,false,'FAIL: stop guard discards recognition while capture remains held');
assert.equal(aborts,1);assert.equal(env.browserVoiceRecognition,null);assert.equal(env.listening,false);
assert.equal(env.phase,'idle','timeout must leave internal listening phase');
assert.match(states.at(-1)[2],/NO ESCUCHÉ/);
console.log('PASS controlled simulation: stop without onend releases capture, detaches stale callbacks and leaves listening');
held=true;aborts=0;timers.clear();env.browserVoiceRecognition=recognition;env.browserVoiceStopping=false;
assert.equal(env.scheduleBrowserVoiceTransportRetry(recognition,'setup',{error:'network'}),true);
assert.equal(held,false,'FAIL: retry starts while old capture is held');
for(const fn of [...timers.values()])fn();assert.equal(aborts,1);
console.log('PASS controlled simulation: failed transport releases old capture before retry');
const bank=JSON.parse(fs.readFileSync('docs/quality/R35_BANCO_100_PREGUNTAS.json','utf8')).questions;
const delivered=[];
env.mergeBrowserVoiceSegments=(a,b)=>a||b;
env.selectBrowserVoiceCandidate=(_,choices,primary)=>({transcript:primary,ambiguous:false});
env.processBrowserVoiceTranscript=async(context,query)=>{assert.equal(held,false,'capture must be released before dispatch to conversation');delivered.push({context,query})};
for(const question of bank){
 held=true;aborts=0;timers.clear();
 Object.assign(env,{browserVoiceRecognition:recognition,browserVoiceTranscript:question.question,browserVoiceInterim:'',browserVoiceErrored:false,browserVoiceStopping:false,listening:true,phase:'listening'});
 env.stopBrowserVoiceRecognitionSafely(recognition,'setup');
 for(const fn of [...timers.values()])fn();
 assert.equal(held,false);assert.equal(aborts,1);assert.equal(env.browserVoiceRecognition,null);assert.equal(env.phase,'idle');
 assert.equal(delivered.at(-1).query,question.question);
 assert.equal(recognition.onend,null);assert.equal(recognition.onresult,null);
}
assert.equal(delivered.length,100);
console.log('PASS 100 controlled capture-finalization cycles; original questions preserved; zero leaked captures or duplicate dispatches. NOT ASR, AI quality, TTS or physical-device certification.');
