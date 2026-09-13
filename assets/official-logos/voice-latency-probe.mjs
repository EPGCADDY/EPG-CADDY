import speech from '../../api/voice-speech.js';
const samples=[
'En Manzanillo, Colima, el clima puede cambiar durante el día. Esta frase es una muestra fija para comparar el tiempo de síntesis del audio; no es un pronóstico ni un dato meteorológico actual.',
'Una respuesta hablada debe comenzar pronto y conservar toda su explicación. Esta segunda frase permite comprobar que el resto del audio se prepara mientras empieza la primera parte, sin eliminar ninguna palabra.',
'Para continuar la conversación, termina la primera respuesta y escucha la siguiente pregunta. La reproducción debe mantener el orden de las frases y terminar sin duplicados ni interrupciones inesperadas.'
];
async function measure(text){let status=0,bytes=0,error=null;const start=Date.now();await speech({method:'POST',headers:{},body:{text,language:'es-GT'}},{setHeader(){},status(n){status=n;return this},json(v){error=v.error;return this},send(b){bytes=b.length;return this}});return{status,bytes,error,ms:Date.now()-start}}
for(let i=0;i<samples.length;i++){const text=samples[i];const matches=Array.from(text.slice(0,121).matchAll(/[.!?;:,]["”»]?\s+/g));const end=matches.map(m=>m.index+m[0].trimEnd().length).find(n=>n>=40)||text.lastIndexOf(' ',120);const first=text.slice(0,end),rest=text.slice(end).trimStart();let baseline,parts;if(i%2){parts=await Promise.all([measure(first),measure(rest)]);baseline=await measure(text)}else{baseline=await measure(text);parts=await Promise.all([measure(first),measure(rest)])}console.log('VOICE_LATENCY_PROBE '+JSON.stringify({trial:i+1,baseline,first:parts[0],rest:parts[1],ratio:parts[0].ms/baseline.ms,firstCharacters:first.length,allWordsPreserved:first+' '+rest===text,browserPlayback:false}));}
console.log('VOICE_LATENCY_PROBE_COMPLETE');
