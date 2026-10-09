import fs from 'node:fs';
if(process.env.VERCEL_ENV!=='preview'||process.env.VERCEL_GIT_COMMIT_REF!=='test-r36-engine-targeted')process.exit(0);
const {default:handler}=await import('../api/universal-ai.js');
const {default:speech}=await import('../api/voice-speech.js');
const questions=[
['costs','Una empresa reduce costos un 20% y luego aumenta el precio un 20%. ¿El precio final vuelve al original?'],
['prices','Un producto cuesta 100; su precio baja 20% y después sube 20%. ¿Cuánto cuesta?'],
['colima','Cómo está el clima en la ciudad de Colima México'],
['madrid','¿Y en Madrid España?'],
['mexico','¿Y en Ciudad de México?'],
['retinol','¿Qué tal funciona el retinol para la crema facial?'],
['leather','¿Cuál es la mejor manera de hidratar un cincho de cuero que se está rajando?'],
['orchids','¿Cada cuánto vuelven a florecer las orquídeas en maceta?'],
['iphone','¿Cómo reinicio un iPhone 11?']
].slice(0,2);
let history=[];
for(const [id,query] of questions){
 const chain=['colima','madrid','mexico'].includes(id);
 if(!chain)history=[];
 let status=0,body=null,audioStatus=0,audioBytes=0;
 const start=Date.now();
 try{await handler({method:'POST',headers:{},body:{query,history,responseMode:'voice',appContext:{course:'El Pulté Golf, Guatemala',weatherOrigin:{location:'El Pulté Golf, Guatemala',latitude:14.5,longitude:-90.5}}}},{setHeader(){},status(n){status=n;return this},json(v){body=v;return this}});}catch(e){body={error:String(e.message)}}
 const textMs=Date.now()-start;
 if(status===200&&body?.answer){const audioStart=Date.now();try{await speech({method:'POST',headers:{},body:{text:body.answer,language:'es-GT'}},{setHeader(){},status(n){audioStatus=n;return this},json(){return this},send(bytes){audioStatus=audioStatus||200;audioBytes=bytes.length;return this}})}catch{};body.audioMs=Date.now()-audioStart; if(chain)history.push({role:'user',content:query},{role:'assistant',content:body.answer});}
 console.log('TARGETED_CASE '+JSON.stringify({id,query,status,answer:body?.answer,error:body?.error,textMs,audioStatus,audioBytes,audioMs:body?.audioMs,totalMs:Date.now()-start,physical:false,playback:false,ASR:false}));
}
console.log('TARGETED_COMPLETE '+JSON.stringify({count:questions.length,commit:process.env.VERCEL_GIT_COMMIT_SHA,acceptance:false}));

const sample="El retinol funciona bien para mejorar líneas finas, manchas, textura y acné leve, pero los resultados son graduales y suelen requerir varias semanas o meses. Empieza con una concentración baja, dos noches por semana, usando una cantidad del tamaño de un guisante y luego crema hidratante; aumenta poco a poco si no causa irritación. Puede provocar resequedad, ardor o descamación, así que úsalo de noche y aplica protector solar de amplio espectro SPF 30 o más cada mañana. Evítalo durante el embarazo y consulta a un dermatólogo si tienes rosácea, eczema o piel muy sensible.", split=sample.indexOf('. ')+1, head=sample.slice(0,split), tail=sample.slice(split).trim();
async function timeSpeech(text){
 let status=0,bytes=0;const start=Date.now();
 try{await speech({method:'POST',headers:{},body:{text,language:'es-GT'}},{setHeader(){},status(n){status=n;return this},json(){return this},send(b){status=status||200;bytes=b.length;return this}})}catch{}
 return {status,bytes,elapsedMs:Date.now()-start};
}
for(let i=0;i<3;i++){
 let full,first,rest;
 if(i%2===0){full=await timeSpeech(sample);[first,rest]=await Promise.all([timeSpeech(head),timeSpeech(tail)]);}
 else{[first,rest]=await Promise.all([timeSpeech(head),timeSpeech(tail)]);full=await timeSpeech(sample);}
 console.log('TTS_LATENCY_PAIR '+JSON.stringify({trial:i+1,full,first,rest,initialRatio:first.elapsedMs/full.elapsedMs,sameText:head+' '+tail===sample,playback:false,applicationChanged:false}));
}
console.log('TTS_LATENCY_COMPLETE');

