import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createServer } from 'node:http';
import {firstUniversalSpeechChunk} from './api/_lib/universal-response-stream.js';

// Real HTTP streaming + actual transport code; answer and speech providers simulated.
const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const readerSource=html.slice(html.indexOf('async function readUniversalVoiceResponse('),html.indexOf('async function submitAiUniversalText('));
const context=vm.createContext({TextDecoder,Uint8Array,Blob,atob});
const readResponse=new Function(`${readerSource}; return readUniversalVoiceResponse;`)();
let speechCalls=0,releaseSpeech,signalSpeechStarted;
let result={ok:true,answer:'En Manzanillo está despejado, con 28 grados.',sources:[]};
let answerStatus=200,speechFailure=false;
const source=readFileSync(new URL('./api/universal-voice-response.js',import.meta.url),'utf8')
  .replace("import universalAnswer from './universal-ai.js';",'const universalAnswer=globalThis.__universalTransportTest.answer;')
  .replace("import approvedSpeech from './voice-speech.js';",'const approvedSpeech=globalThis.__universalTransportTest.speech;')
  .replace("'./_lib/universal-response-stream.js'",JSON.stringify(new URL('./api/_lib/universal-response-stream.js',import.meta.url).href));
globalThis.__universalTransportTest={
  answer:async(req,res)=>{res.setHeader('Cache-Control','no-store');return res.status(answerStatus).json(result);},
  speech:async(req,res)=>{
    speechCalls++;
    assert.equal(req.body.text,firstUniversalSpeechChunk(result.answer.trim()));
    assert.equal(req.headers.origin,'https://example.test');
    signalSpeechStarted?.();
    await new Promise(resolve=>{releaseSpeech=resolve});
    if(speechFailure)return res.status(502).json({ok:false});
    res.setHeader('X-GSCG-Voice','s2.1-es-419');
    return res.status(200).send(Buffer.from('SIMULATED_MP3'));
  }
};
const {default:handler}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
delete globalThis.__universalTransportTest;
const server=createServer(async(req,res)=>{
  const parts=[];for await(const part of req)parts.push(part);req.body=JSON.parse(Buffer.concat(parts).toString());
  res.status=code=>{res.statusCode=code;return res};
  res.json=body=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(body));return res};
  try{await handler(req,res)}catch(error){res.destroy(error)}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}`;
let requests=0;
const request=async()=>{requests++;return fetch(url,{method:'POST',headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify({query:'¿Cómo está el clima?',responseMode:'voice'})})};
try{
  for(let turn=1;turn<=2;turn++){
    const speechStarted=new Promise(resolve=>{signalSpeechStarted=resolve});
    const response=await request();await speechStarted;
    const {result:received,prefetchedSpeech}=await readResponse(response);
    assert.equal(received.answer,result.answer,'Text must arrive before speech provider completes');
    let settled=false;prefetchedSpeech.then(()=>{settled=true});await Promise.resolve();
    assert.equal(settled,false,'Audio must remain pending while provider is held');
    releaseSpeech();const audio=await prefetchedSpeech;
    assert.equal(audio.ok,true);assert.equal(await audio.blob.text(),'SIMULATED_MP3');
    assert.equal(audio.deliveredVoice,'s2.1-es-419');
  }
  assert.equal(requests,2,'One browser request for each answer+audio turn');
  assert.equal(speechCalls,2,'Exactly one synthesis per short answer');
  console.log('PASS real local HTTP, simulated providers: text arrives before audio; two turns use two requests, not four.');
  speechFailure=true;
  const failed=await readResponse(await request());releaseSpeech();
  assert.equal((await failed.prefetchedSpeech).ok,false);assert.equal(failed.result.answer,result.answer);
  console.log('PASS: failed audio preserves written answer.');
  speechFailure=false;
  const interruptedController=new AbortController();
  const interruptedStarted=new Promise(resolve=>{signalSpeechStarted=resolve});
  const interrupted=await readResponse(await fetch(url,{method:'POST',signal:interruptedController.signal,
    headers:{Origin:'https://example.test','Content-Type':'application/json'},body:JSON.stringify({responseMode:'voice'})}));
  await interruptedStarted;interruptedController.abort();
  assert.equal((await interrupted.prefetchedSpeech).ok,false);releaseSpeech();
  console.log('PASS: canceling a real HTTP request settles pending audio as failure.');
  const previousCalls=speechCalls;
  result={ok:true,answer:'Respuesta extensa. '.repeat(30),sources:[]};
  const long=await readResponse(await request());releaseSpeech();
  const longAudio=await long.prefetchedSpeech;assert.equal(longAudio.ok,true);
  assert.equal(longAudio.text,firstUniversalSpeechChunk(result.answer.trim()));assert.equal(speechCalls,previousCalls+1);
  answerStatus=403;result={ok:false,error:'ORIGIN_NOT_ALLOWED'};
  const denied=await request();assert.equal(denied.status,403);assert.equal((await readResponse(denied)).result.error,'ORIGIN_NOT_ALLOWED');assert.equal(speechCalls,previousCalls+1);
  console.log('PASS: long answers prefetch only their first fragment; denied answers never synthesize.');
  const truncated=new Response('{"type":"answer","result":{"ok":true,"answer":"Texto"}}\n',{headers:{'Content-Type':'application/x-ndjson'}});
  assert.equal((await (await readResponse(truncated)).prefetchedSpeech).ok,false);
  console.log('PASS: truncated audio stream settles as failure. No real voice or iPhone latency claimed.');
  let playbackCount=0,extraSpeechRequests=0;
  const onsetMarks=[];
  Object.assign(context,{
    AbortController,URL,aiUniversalMuted:false,cedarSpeechServerBlockedUntil:0,
    aiUniversalTtsAudio:null,aiUniversalTtsObjectUrl:null,voiceContext:'setup',
    aiUniversalSpeechPrimed:false,browserVoiceFollowupContext:null,CEDAR_SPEECH_RETRY_MS:1000,
    Audio:class{pause(){}async play(){playbackCount++;this.onplay?.();this.onplaying?.()}},
    showUniversalSpokenAnswer(){},aiUniversalSetState(){},setPrimaryVoiceMatrix(){},reportVoiceHealth(){},
    monitorUniversalAudio(){return()=>{}},universalVoiceDeadline:promise=>promise,
    window:{gscgApiUrl:path=>path,GSCVoiceTurns:{latency:{snapshot:()=>({turnId:'ptt_1_1'}),mark:(id,stage)=>onsetMarks.push(stage)}}},aiUniversalSpeechLanguage:()=> 'es-419',
    speakAiUniversalMaleBrowserFallback:async()=>false,
    fetch:async()=>{extraSpeechRequests++;throw new Error('Duplicate speech request')}
  });
  vm.runInContext(html.slice(html.indexOf('function splitUniversalSpeechText('),html.indexOf('function stopAiUniversalOutput(')),context);
  const speak=vm.runInContext('speakAiUniversalText',context);
  for(let turn=1;turn<=2;turn++){
    assert.equal(await speak(`Respuesta ${turn}.`,{prefetchedSpeech:Promise.resolve({ok:true,blob:new Blob(['SIMULATED_MP3']),deliveredVoice:'s2.1-es-419'})}),true);
  }
  assert.equal(playbackCount,2);assert.equal(extraSpeechRequests,0);
  assert.deepEqual(onsetMarks,['audioReadyMs','audioPlayingMs','audioReadyMs','audioPlayingMs']);
  context.aiUniversalTtsAudio.gscCancelSpeech();
  console.log('PASS actual client function with simulated Audio: both turns play; zero duplicate speech requests.');
  const longText='Una oración inicial suficientemente larga para comprobar que el primer audio se reproduce una sola vez. '+'El resto continúa en el segundo fragmento. '.repeat(10);
  const split=vm.runInContext('splitUniversalSpeechText',context),parts=split(longText.trim());
  context.fetch=async(_url,options)=>{extraSpeechRequests++;assert.equal(JSON.parse(options.body).text,parts[1]);return new Response('SECOND_AUDIO',{headers:{'X-GSCG-Voice':'s2.1-es-419'}})};
  context.monitorUniversalAudio=player=>{player.onended=()=>{};return()=>{}};
  assert.equal(await speak(longText,{prefetchedSpeech:Promise.resolve({ok:true,text:parts[0],blob:new Blob(['FIRST_AUDIO']),deliveredVoice:'s2.1-es-419'})}),true);
  context.aiUniversalTtsAudio.onended();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(playbackCount,4);assert.equal(extraSpeechRequests,1);
  context.aiUniversalTtsAudio.onended();context.aiUniversalTtsAudio.gscCancelSpeech();
  console.log('PASS long answer client playback: first and remaining audio play in order; no repeated first fragment.');
  extraSpeechRequests=0;context.fetch=async()=>{extraSpeechRequests++;throw new Error('Duplicate speech request')};
  const baselinePath=process.argv[2];
  if(baselinePath){
    const old=readFileSync(baselinePath,'utf8');
    vm.runInContext(old.slice(old.indexOf('function splitUniversalSpeechText('),old.indexOf('function stopAiUniversalOutput(')),context);
    const before=vm.runInContext('speakAiUniversalText',context);
    assert.equal(await before('Respuesta anterior.',{prefetchedSpeech:Promise.resolve({ok:true,blob:new Blob(['SIMULATED_MP3'])})}),false);
    assert.equal(extraSpeechRequests,1);
    console.log('BEFORE/AFTER verified: base requests speech again; changed client consumes delivered audio without that request.');
  }
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve))}
