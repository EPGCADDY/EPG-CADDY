import fs from 'node:fs';
import assert from 'node:assert/strict';
import handler from './api/universal-ai.js';
const bank=JSON.parse(fs.readFileSync('docs/quality/R35_BANCO_100_PREGUNTAS.json','utf8')).questions;
const regressions=[
 'Explícame por qué se produce la lluvia','Qué significa tener temperatura corporal alta','Qué es el tráfico de influencias','Cuál es la diferencia entre clima y tiempo meteorológico',
 'Cómo se forma la lluvia ácida','Por qué cambia el clima a lo largo de miles de años','Qué es la temperatura absoluta','Cómo se mide la temperatura de una estrella',
 'Qué significa congestión nasal','Explícame el tráfico de datos en internet','Cuál es la diferencia entre lluvia y precipitación','Qué causa la congestión pulmonar',
 'Cómo funciona un pronóstico meteorológico','Compara el clima tropical y el clima desértico','Qué es el viento solar','Qué es el tráfico de personas',
 'Por qué aumenta la temperatura de un procesador','Cómo se genera viento dentro de un huracán','Define temperatura de fusión','Qué significa ETA en una aplicación de transporte'
];
const questions=[...bank.filter(q=>q.id!=='Q072').slice(0,80).map(q=>q.question),...regressions];
assert.equal(questions.length,100);assert.equal(new Set(questions).size,100);
const nativeFetch=globalThis.fetch,oldKey=process.env.OPENAI_API_KEY;
process.env.OPENAI_API_KEY='synthetic-routing-test';let current='',received='';
try{
 globalThis.fetch=async(url,options)=>{
  const body=JSON.parse(options.body||'{}');assert.equal(body.model,'gpt-5.6','Question diverted away from general model: '+current);
  received=body.input.at(-1).content;assert.equal(received,current);
  return {ok:true,status:200,json:async()=>({output:[{type:'message',content:[{type:'output_text',text:'Respuesta simulada para verificar enrutamiento.'}]}]})};
 };
 for(const query of questions){
  current=query;received='';let status=200,result;
  await handler({method:'POST',headers:{},body:{query,responseMode:'voice'}},{setHeader(){},status(n){status=n;return this},json(body){result=body;return this}});
  assert.equal(status,200,query);assert.equal(result.ok,true,query);assert.equal(received,query);
 }
 console.log('PASS 100/100 diverse written questions reach general model unchanged. Model replies mocked: not an AI-quality, ASR, TTS or iPhone benchmark.');
}finally{globalThis.fetch=nativeFetch;if(oldKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=oldKey}
