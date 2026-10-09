import assert from 'node:assert/strict';
import handler from './api/voice-speech.js';
const oldFetch=globalThis.fetch,oldKey=process.env.OPENAI_API_KEY,oldGateway=process.env.AI_GATEWAY_API_KEY;
process.env.OPENAI_API_KEY='test';process.env.AI_GATEWAY_API_KEY='test';
try{
 for(const failure of ['404','network','empty','both']){
  const calls=[];
  globalThis.fetch=async(url,opts)=>{
   calls.push(url);const body=JSON.parse(opts.body);assert.equal(body.voice,'onyx');assert.equal(body.speed,.9);
   if(url.includes('ai-gateway')){
    assert.equal(opts.headers['ai-model-id'],'openai/tts-1');
    if(failure==='network')throw new Error('network');
    if(failure==='empty')return new Response(JSON.stringify({audio:''}),{status:200});
    return new Response('{}',{status:404});
   }
   assert.equal(body.model,'tts-1');
   return new Response(failure==='both'?'error':'audio',{status:failure==='both'?429:200});
  };
  const res={headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.statusCode=n;return this},json(x){this.body=x},send(x){this.body=x}};
  await handler({method:'POST',headers:{host:'epg-caddy.vercel.app'},body:{text:'El clima está nublado.'}},res);
  assert.equal(calls.length,2);assert.equal(res.statusCode,failure==='both'?502:200);
  if(failure!=='both'){assert.equal(res.body.toString(),'audio');assert.equal(res.headers['X-GSCG-Voice'],'onyx');assert.equal(res.headers['X-GSCG-Voice-Provider'],'direct')}
 }
 console.log('PASS simulated 404, network, empty audio recover with same voice; exhausted backup returns failure, never false success.');
}finally{globalThis.fetch=oldFetch;for(const [k,v] of [['OPENAI_API_KEY',oldKey],['AI_GATEWAY_API_KEY',oldGateway]]){if(v===undefined)delete process.env[k];else process.env[k]=v}}
