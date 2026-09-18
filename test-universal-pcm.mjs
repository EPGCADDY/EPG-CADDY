import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {streamUniversalPcm} from './api/_lib/universal-pcm.js';

const events=[];let upstream,requests=0;
const running=streamUniversalPcm('Primera respuesta.',{apiKey:'simulated',emit:e=>events.push(e),fetchImpl:async(url,request)=>{
  requests++;const body=JSON.parse(request.body);assert.equal(body.model,'tts-1');assert.equal(body.voice,'onyx');assert.equal(body.speed,0.9);assert.equal(body.instructions,undefined);assert.equal(body.response_format,'pcm');
  return new Response(new ReadableStream({start(c){upstream=c;c.enqueue(new Uint8Array([0,0,0,64]))}}));
}});
await new Promise(r=>setImmediate(r));
assert.equal(events[0].type,'audio_start');assert.equal(events[1].type,'audio_chunk');
assert(!events.some(e=>e.type==='audio_end'),'Audio must arrive while provider remains unfinished');
upstream.enqueue(new Uint8Array([0,128]));upstream.close();await running;
assert.equal(events.at(-1).type,'audio_end');assert.equal(requests,1);
console.log('PASS simulated provider: first PCM delivered before generation completes; one synthesis, fixed Onyx.');

let nodes=[],starts=0,ends=0,errors=0,pendingRead,transportCanceled=0;
class Context{
  state='running';currentTime=0;destination={};resume(){return Promise.resolve()}
  createBuffer(channels,length,rate){const data=new Float32Array(length);return{duration:length/rate,getChannelData:()=>data}}
  createBufferSource(){const n={connect(){},disconnect(){},start(){starts++},stop(){this.stopped=true}};nodes.push(n);return n}
}
const context=vm.createContext({AudioContext:Context,Uint8Array,DataView,atob,console});
vm.runInContext(readFileSync('universal-pcm-player.js','utf8'),context);
const player=context.GSCUniversalPcm;assert.equal(player.prime(),true);
function transport(){let count=0;return{next:async()=>{
  count++;if(count===1)return{type:'audio_chunk',audio:Buffer.from([0,0,0,64]).toString('base64')};
  return new Promise(r=>{pendingRead=r});
},cancel(){transportCanceled++}}}
for(let turn=0;turn<2;turn++){
  assert.equal(await player.play(transport(),{onEnd:()=>ends++,onError:()=>errors++}),true);
  assert.equal(starts,turn+1);assert.equal(ends,turn);
  pendingRead({type:'audio_end'});await new Promise(r=>setImmediate(r));
  nodes.at(-1).onended();assert.equal(ends,turn+1);
  nodes.at(-1).onended();assert.equal(ends,turn+1,'Duplicate ended must not finish twice');
}
assert.equal(await player.play(transport()),true);const old=nodes.at(-1);player.stop();
assert.equal(old.stopped,true);pendingRead({type:'audio_chunk',audio:'AAAAAA=='});await new Promise(r=>setImmediate(r));
assert.equal(starts,3,'Canceled turn cannot schedule new audio');
assert.equal(await player.play(transport(),{onError:()=>errors++}),true);
pendingRead({type:'audio_error'});await new Promise(r=>setImmediate(r));assert.equal(errors,1);assert(nodes.at(-1).stopped);
console.log('PASS actual PCM player with simulated AudioContext: early playback, two turns, single completion, cancellation, error stops audio.');

let fallback=[];
await streamUniversalPcm('Segunda respuesta.',{apiKey:'',gatewayToken:'simulated',emit:e=>fallback.push(e),fetchImpl:async(url,request)=>{
  const b=JSON.parse(request.body);assert.equal(b.voice,'onyx');assert.equal(b.outputFormat,'pcm');
  assert.equal(request.headers['ai-model-id'],'openai/tts-1','Gateway must use its published speech catalog');
  assert.equal(b.instructions,undefined,'TTS-1 does not support instructions');
  return Response.json({audio:'AAAAAA=='});
}});
assert.equal(fallback[0].progressive,false);assert.equal(fallback[0].voice,'onyx');
console.log('PASS Gateway buffered fallback keeps fixed voice and explicitly reports progressive=false. No live-provider/iPhone latency claimed.');

// Actual composed handler + actual browser decoder, providers simulated.
const html=readFileSync('index-grupal.html','utf8');
const decode=new Function(html.slice(html.indexOf('async function readUniversalVoiceResponse('),html.indexOf('async function submitAiUniversalText('))+';return readUniversalVoiceResponse')();
let source=readFileSync('api/universal-voice-response.js','utf8')
 .replace("import universalAnswer from './universal-ai.js';","const universalAnswer=async(req,res)=>res.status(200).json({ok:true,answer:'Respuesta completa.',sources:[]});")
 .replace("import approvedSpeech from './voice-speech.js';","const approvedSpeech=()=>{throw new Error('Unexpected legacy voice')};")
 .replace("'./_lib/universal-pcm.js'",JSON.stringify(new URL('./api/_lib/universal-pcm.js',import.meta.url).href));
const handler=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
const oldFetch=globalThis.fetch,oldKey=process.env.OPENAI_API_KEY;
try{
 process.env.OPENAI_API_KEY='simulated';
 for(let turn=0;turn<2;turn++){
  let provider;globalThis.fetch=async()=>new Response(new ReadableStream({start(c){provider=c;c.enqueue(new Uint8Array([0,0,0,64]))}}));
  let sink;const stream=new ReadableStream({start(c){sink=c}});
  const res={headers:{},setHeader(k,v){this.headers[k]=v},status(){return this},write(line){sink.enqueue(new TextEncoder().encode(line))},end(){sink.close()}};
  const task=handler({method:'POST',headers:{},body:{responseMode:'voice',progressiveAudio:true}},res);
  const response=new Response(stream,{headers:{'Content-Type':'application/x-ndjson'}});
  const parsed=await decode(response);assert.equal(parsed.result.answer,'Respuesta completa.');
  assert.equal(parsed.prefetchedSpeech.pcmTransport,true);
  const transport=await parsed.prefetchedSpeech;assert.equal(transport.ok,true);
  assert.equal((await transport.next()).type,'audio_chunk');
  provider.close();assert.equal((await transport.next()).type,'audio_end');transport.cancel();await task;
 }
}finally{globalThis.fetch=oldFetch;if(oldKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=oldKey}
console.log('PASS two composed handler/decoder turns: complete written answer, PCM before provider end, fixed voice and clean close.');
