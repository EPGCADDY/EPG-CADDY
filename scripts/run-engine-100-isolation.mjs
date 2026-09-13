import fs from 'node:fs';
if(process.env.VERCEL_ENV!=='preview'||process.env.VERCEL_GIT_COMMIT_REF!=='test-r34-engine-isolation')process.exit(0);
const {default:handler}=await import('../api/universal-ai.js');
const bank=JSON.parse(fs.readFileSync('docs/quality/ENGINE_100_BANK.json','utf8')).cases;
const histories=new Map(),results=[];
for(const item of bank){
 let status=0,body=null;const started=Date.now();
 const history=histories.get(item.conversationId)||[];
 try{
  await handler({method:'POST',headers:{},body:{query:item.question,history,responseMode:'voice',appContext:{course:'El Pulté Golf, Guatemala'}}},{setHeader(){},status(n){status=n;return this},json(value){body=value;return this}});
 }catch(error){body={error:String(error?.message||error)}}
 const record={id:item.id,question:item.question,conversationId:item.conversationId||null,referenceAnswer:item.referenceAnswer,referenceProvenance:'Imported ChatGPT-web bank; independent review pending',status,answer:body?.answer||null,error:body?.error||null,sources:body?.sources||[],elapsedMs:Date.now()-started,passedTransport:status===200&&!!body?.answer,qualityPass:null};
 results.push(record);console.log('ENGINE_CASE '+JSON.stringify(record));
 if(item.conversationId&&record.passedTransport)histories.set(item.conversationId,[...history,{role:'user',content:item.question},{role:'assistant',content:body.answer}].slice(-80));
}
console.log('ENGINE_COMPLETE '+JSON.stringify({total:results.length,answered:results.filter(x=>x.passedTransport).length,failed:results.filter(x=>!x.passedTransport).length,physical:false,ASR:false,TTS:false,qualityApproved:false,commit:process.env.VERCEL_GIT_COMMIT_SHA}));
