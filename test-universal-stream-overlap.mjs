import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readUniversalProviderResponse,firstUniversalSpeechChunk} from './api/_lib/universal-response-stream.js';
const encoder=new TextEncoder();
const event=value=>encoder.encode(`data: ${JSON.stringify(value)}\r\n\r\n`);
const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const split=new Function(html.slice(html.indexOf('function splitUniversalSpeechText('),html.indexOf('async function speakAiUniversalText('))+';return splitUniversalSpeechText')();
const sample='La explicación comienza con una oración completa que se puede preparar para escuchar sin esperar todo el resto. '+ 'El contenido adicional conserva todos los detalles de la respuesta original. '.repeat(8);
for(const value of [sample,'Respuesta breve.', 'x'.repeat(4000), 'x'.repeat(300)+' palabra '.repeat(500),...Array.from({length:450},(_,i)=>sample.slice(0,i+1))]){
  assert.equal(firstUniversalSpeechChunk(value),split(value)[0]);
}
const finalPayload={output:[{type:'message',content:[{type:'output_text',text:'Español: acción.'}]}],provider_metadata:{gateway:{routing:{speed:'fast'}}}};
const bytes=Buffer.concat([event({type:'response.output_text.delta',delta:'Español: acción.'}),event({type:'response.completed',response:finalPayload})]);
let deltas='';
const fragmented=new Response(new ReadableStream({start(c){for(const byte of bytes)c.enqueue(new Uint8Array([byte]));c.close()}}),{headers:{'content-type':'text/event-stream'}});
assert.deepEqual(await readUniversalProviderResponse(fragmented,delta=>{deltas+=delta}),finalPayload);
assert.equal(deltas,'Español: acción.');
await assert.rejects(readUniversalProviderResponse(new Response('data: {"type":"response.output_text.delta","delta":"No definitivo"}\n\n',{headers:{'content-type':'text/event-stream'}}),()=>{}),/INCOMPLETE/);

const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
process.env.OPENAI_API_KEY='simulated-provider';
let speechStarted,releaseSpeech,spoken=[];
globalThis.__overlapSpeech=async(req,res)=>{
  spoken.push(req.body.text);speechStarted?.();
  await new Promise(resolve=>{releaseSpeech=resolve});
  res.setHeader('X-GSCG-Voice','s2.1-es-419');res.status(200).send(Buffer.from(req.body.text));
};
const source=readFileSync(new URL('./api/universal-voice-response.js',import.meta.url),'utf8')
  .replace("'./universal-ai.js'",JSON.stringify(new URL('./api/universal-ai.js',import.meta.url).href))
  .replace("'./_lib/universal-pcm.js'",JSON.stringify(new URL('./api/_lib/universal-pcm.js',import.meta.url).href))
  .replace("import approvedSpeech from './voice-speech.js';",'const approvedSpeech=globalThis.__overlapSpeech;')
  .replace("'./_lib/universal-response-stream.js'",JSON.stringify(new URL('./api/_lib/universal-response-stream.js',import.meta.url).href));
const {default:handler}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
delete globalThis.__overlapSpeech;
try{
  for(let turn=0;turn<3;turn++){
    let finishModel;
    const actualText=turn===2?'El texto definitivo conserva toda la explicación. '+sample:sample;
    const callsBefore=spoken.length;
    const started=new Promise(resolve=>{speechStarted=resolve});
    globalThis.fetch=async(_url,options)=>{
      assert.notEqual(JSON.parse(options.body).stream,true);
      return await new Promise(resolve=>{finishModel=()=>resolve(new Response(JSON.stringify({output:[{type:'message',content:[{type:'output_text',text:actualText}]}]}),{headers:{'content-type':'application/json'}}))});
    };
    const records=[];
    const res={headers:{},setHeader(k,v){this.headers[k]=v},status(code){this.statusCode=code;return this},write(value){records.push(JSON.parse(value))},flushHeaders(){},json(body){this.body=body},end(){this.ended=true}};
    const pending=handler({method:'POST',headers:{host:'epg-caddy.vercel.app'},body:{query:'Cómo funciona una conversación?',responseMode:'voice'}},res);
    for(let i=0;i<50&&!finishModel;i++)await new Promise(resolve=>setImmediate(resolve));
    assert.equal(typeof finishModel,'function');assert.equal(spoken.length,callsBefore,'No speculative fragment may synthesize a second speaker');
    finishModel();await started;
    assert.equal(records[0].result.answer,actualText.trim());releaseSpeech();await pending;
    assert.equal(records[1].ok,true);
    assert.equal(Buffer.from(records[1].audio,'base64').toString(),actualText.trim());
    assert.equal(spoken.length,callsBefore+1,'Exactly one synthesis includes the entire answer');
  }
  console.log('PASS: three real handler turns with simulated providers synthesize the entire verified answer exactly once; no speculative or second speaker request.');
}finally{
  globalThis.fetch=originalFetch;
  if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey;
}
console.log('PASS: fragmented UTF-8 SSE, final payload/metadata, truncated stream failure and 454 browser/server split comparisons. Physical latency and fixed speaker identity remain unverified.');
