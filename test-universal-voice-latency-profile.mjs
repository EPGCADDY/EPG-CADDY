import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import handler,{universalResponseProfile as profile,requestUniversalResponse} from './api/universal-ai.js';

const query='Cómo funciona el botox para el dorsal ancho?';
const standard={reasoningEffort:'low',maxOutputTokens:1400,depth:'standard'};
const deep={reasoningEffort:'medium',maxOutputTokens:3200,depth:'deep'};
if(process.argv[2]){
  const source=readFileSync(process.argv[2],'utf8');
  const profileSource=source.slice(source.indexOf('const BRIEF_QUERY='),source.indexOf('function retryAfterMs(')).replace('export function','function');
  const previous=new Function(`${profileSource}; return universalResponseProfile;`)();
  assert.deepEqual(previous(query,{responseMode:'voice'}),deep);
  console.log('BEFORE: exact reported question selected medium/deep, 1600 voice output tokens.');
}
for(const question of [query,'¿CÓMO FUNCIONA un motor eléctrico?','Como funciona una tarjeta de crédito?']){
  assert.deepEqual(profile(question,{responseMode:'voice'}),standard);
}
assert.deepEqual(profile(query),deep,'Text mode retains its original policy');
for(const question of [
  'Cómo funciona el botox con detalle',
  'Cómo funciona el botox a fondo',
  'Cómo funciona el botox y cuáles son los riesgos',
  'Compara las opciones y analiza sus ventajas y desventajas',
  'Cómo funciona '+ 'un mecanismo complejo '.repeat(10)
])assert.deepEqual(profile(question,{responseMode:'voice'}),deep,question);
assert.equal(profile('Gracias',{responseMode:'voice'}).depth,'brief');

const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
const requests=[];
process.env.OPENAI_API_KEY='simulated-test-only';
globalThis.fetch=async(_url,options)=>{
  requests.push(JSON.parse(options.body));
  return{ok:true,status:200,json:async()=>({output:[{type:'message',content:[{type:'output_text',text:'Respuesta de prueba simulada.'}]}]})};
};
try{
  for(const question of [query,'¿Cómo funciona un motor eléctrico?']){
    const res={statusCode:0,setHeader(){},status(code){this.statusCode=code;return this},json(body){this.body=body;return this}};
    await handler({method:'POST',headers:{host:'epg-caddy.vercel.app'},body:{query:question,responseMode:'voice',history:[]}},res);
    assert.equal(res.statusCode,200);assert.equal(res.body.ok,true);
  }
  assert.equal(requests.length,2);
  for(const body of requests){
    assert.equal(body.service_tier,'priority','Spoken requests use priority without changing model or reasoning');
    assert.equal(body.reasoning.effort,'low');assert.equal(body.max_output_tokens,700);
    assert.equal(body.tool_choice,'auto');
    assert.ok(body.tools.some(tool=>tool.type==='web_search'));
    assert.match(body.instructions,/no deduzcas un diagnóstico/);
    assert.match(body.instructions,/señala riesgos o necesidad profesional/);
    assert.match(body.instructions,/No ejecutes ni afirmes cambios de scores/);
  }
}finally{
  globalThis.fetch=originalFetch;
  if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey;
}
for(const latencySensitive of [true,false]){
  let directBody,gatewayBody;
  const payload={model:'openai/gpt-5.6-sol',output:[],provider_metadata:{gateway:{routing:{speed:'fast'}}}};
  const direct=await requestUniversalResponse({input:query,reasoning:{effort:'low'}},{apiKey:'simulated',latencySensitive,
    fetchImpl:async(_url,options)=>{directBody=JSON.parse(options.body);return{ok:true,status:200,json:async()=>payload}}});
  assert.equal(direct.ok,true);assert.equal(directBody.model,'gpt-5.6');
  assert.equal(directBody.service_tier,latencySensitive?'priority':undefined);
  const gateway=await requestUniversalResponse({input:query,reasoning:{effort:'low'}},{apiKey:'',gatewayToken:'simulated',latencySensitive,
    fetchImpl:async(_url,options)=>{gatewayBody=JSON.parse(options.body);return{ok:true,status:200,json:async()=>payload}}});
  assert.equal(gateway.ok,true);assert.equal(gatewayBody.model,'openai/gpt-5.6-sol');
  assert.equal(gatewayBody.providerOptions.gateway.speed,latencySensitive?'fast':undefined);
  assert.equal(gatewayBody.providerOptions.gateway.allowFallbackFromFast,undefined,'Retain documented automatic base-tier fallback');
  assert.deepEqual(gatewayBody.providerOptions.gateway.models,['openai/gpt-5.6-sol','anthropic/claude-opus-5','google/gemini-3.1-pro-preview']);
  assert.deepEqual(gatewayBody.reasoning,{effort:'low'});
}
console.log('PASS: voice requests priority/fast; text keeps its serving policy; models, reasoning and gateway fallbacks unchanged.');
console.log('PASS: two actual handler turns with simulated provider use low/700; explicit detail, risk, text policy and medical safeguards preserved.');
console.log('No real provider timing, medical answer quality or physical iPhone audio is certified by this test.');
