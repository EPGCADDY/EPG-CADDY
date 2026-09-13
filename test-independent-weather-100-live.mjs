// Opt-in live provider integration. No microphone, AI model, shared DB, or iPhone simulation.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import handler from './api/universal-ai.js';
const places=['Manzanillo Colima','Guadalajara Jalisco','Monterrey Nuevo León','Mérida Yucatán','Tepic Nayarit'];
const prompts=['Cómo está el clima en','Qué clima hace en','Dime el clima en','Cuál es el clima en','Qué temperatura hace en','Dime la temperatura en','Cómo está el tiempo meteorológico en','Quiero saber el clima en','Me puedes decir el clima en','Por favor dime el clima en','Consulta el clima en','Qué tal está el clima en','Necesito conocer el clima en','Puedes consultar el clima en','Me interesa el clima en','Cuéntame cómo está el clima en','Infórmame del clima en','Dame información del clima en','Me dices la temperatura en','Quisiera saber cómo está el clima en'];
const questions=places.flatMap(place=>prompts.map(prompt=>({place,query:`${prompt} ${place}`})));
if(process.env.LIVE_WEATHER!=='1'){console.log('SKIP live weather: set LIVE_WEATHER=1');process.exit(0)}
const nativeFetch=globalThis.fetch;globalThis.fetch=(url,options={})=>nativeFetch(url,{...options,signal:AbortSignal.timeout(20000)});
const results=process.env.RESUME_WEATHER==='1'?JSON.parse(fs.readFileSync('docs/quality/INDEPENDENT_WEATHER_100_LIVE.json','utf8')).results:[];
const pending=questions.filter(q=>!results.some(r=>r.query===q.query&&r.pass));
for(const question of pending){
 const started=Date.now();let status=200,body;
 try{
  await handler({method:'POST',headers:{},body:{query:question.query,responseMode:'voice',history:[{role:'user',content:'Cuántos habitantes tiene la ciudad de Colima y el estado de Colima'}],appContext:{course:'El Pulté Golf, Guatemala'}}},{setHeader(){},status(value){status=value;return this},json(value){body=value;return this}});
  assert.equal(status,200);assert.equal(body.ok,true);assert.ok(body.answer.includes(question.place.split(' ')[0]));assert.match(body.answer,/México/);assert.doesNotMatch(body.answer,/Guatemala|Pulté/);
  results.push({...question,pass:true,status,elapsedMs:Date.now()-started,answer:body.answer});
 }catch(error){results.push({...question,pass:false,status,elapsedMs:Date.now()-started,error:String(error),body})}
 const duplicates=results.findIndex(r=>r.query===question.query);if(duplicates<results.length-1){const latest=results.pop();latest.previousAttempt=results[duplicates];results[duplicates]=latest;}
 if(results.length%10===0)console.log(`LIVE ${results.length}/100 PASS=${results.filter(r=>r.pass).length}`);
 fs.writeFileSync('docs/quality/INDEPENDENT_WEATHER_100_LIVE.json',JSON.stringify({at:new Date().toISOString(),scope:'100 text queries through local real handler and live Open-Meteo; not ASR, TTS, iPhone or independent ChatGPT benchmark',results},null,2)+'\n');
}
assert.equal(results.length,100);assert.equal(new Set(results.map(r=>r.query)).size,100);assert.equal(results.filter(r=>!r.pass).length,0);console.log('PASS 100/100 live provider queries');
