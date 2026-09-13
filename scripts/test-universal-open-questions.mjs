// Synthetic queries only. Uses Preview server credentials without exposing them.
if(process.env.VERCEL_ENV!=="preview"||process.env.VERCEL_GIT_COMMIT_REF!=="test-universal-open-questions")process.exit(0);
const {default:answerHandler}=await import('../api/universal-ai.js');
const {default:speechHandler}=await import('../api/voice-speech.js');
const cases=[
 {id:'retinol',query:'Qué tal funciona el retinol para la crema facial',audio:true},
 {id:'retinol-followup',query:'¿Y si me arde después de ponérmela?',previous:'retinol'},
 {id:'leather',query:'Cuál es la mejor manera de hidratar un cincho de cuero que se está rajando su piel?',audio:true},
 {id:'leather-followup',query:'¿Y si se está pelando como una capita de plástico?',previous:'leather'},
 {id:'orchid',query:'Cada cuanto retoñen, las orquídeas en maceta',audio:true},
 {id:'orchid-followup',query:'La mía tiene hojas verdes pero lleva un año sin flores. ¿Qué reviso primero?',previous:'orchid'},
 {id:'probability',query:'Si una moneda justa ha caído cara cinco veces seguidas, ¿ahora es más probable que salga cruz?'},
 {id:'percentages',query:'Si algo costaba 100, bajó veinte por ciento y luego subió veinte por ciento, ¿regresó al precio inicial? Explícamelo fácil.'},
 {id:'tides',query:'¿Por qué hay dos mareas altas al día si sólo tenemos una Luna? Explícamelo sin tecnicismos.'}
];
const saved=new Map();
for(const item of cases){
 const previous=saved.get(item.previous),history=previous?[{role:'user',content:previous.query},{role:'assistant',content:previous.answer}]:[];
 const started=Date.now();let status=0,body;
 const req={method:'POST',headers:{},body:{query:item.query,history,responseMode:'voice',appContext:{course:'El Pulté Golf, Guatemala'}}};
 const res={setHeader(){},status(n){status=n;return this},json(value){body=value;return this}};
 await answerHandler(req,res);
 const result={id:item.id,query:item.query,historyTurns:history.length,status,elapsedMs:Date.now()-started,answer:body?.answer||null,error:body?.error||null,sources:body?.sources||[],degraded:!!body?.degraded};
 console.log('OPEN_QUESTIONS_ANSWER '+JSON.stringify(result));
 if(result.answer)saved.set(item.id,result);
 if(item.audio&&result.answer){
  let speechStatus=200,audioBytes=0,speechError=null;const startedAudio=Date.now();
  const speechRes={setHeader(){},status(n){speechStatus=n;return this},json(value){speechError=value?.error||'JSON_RESPONSE';return this},send(value){audioBytes=value?.length||0;return this},end(value){audioBytes=value?.length||0;return this}};
  await speechHandler({method:'POST',headers:{},body:{text:result.answer,language:'es-GT'}},speechRes);
  console.log('OPEN_QUESTIONS_AUDIO '+JSON.stringify({id:item.id,status:speechStatus,audioBytes,error:speechError,elapsedMs:Date.now()-startedAudio,physicalPlayback:'NOT_TESTED'}));
 }
}
console.log('OPEN_QUESTIONS_COMPLETE '+JSON.stringify({answered:saved.size,total:cases.length,comparison:'REQUIRES_CONTENT_REVIEW',iphone:'NOT_TESTED'}));
