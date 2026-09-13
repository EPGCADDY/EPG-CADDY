// Controlled Preview-only calls using the deployment's own server credentials.
// No user session, identifiers, audio, tokens or private round data are recorded.
if(process.env.VERCEL_GIT_COMMIT_REF!=='fix-r31-universal-plain')process.exit(0);
const {default:handler}=await import('../api/universal-ai.js');
const questions=[
 'Cómo está el clima ahorita?',
 'Cuál es la mejor terapia para un dolor en el dorsal ancho derecho?',
 'Qué precio puede tener en el mercado un BMW 2002 TII del año 1975 que está en buen estado y es de agencia?',
 'Cómo reinicio un iPhone 11?'
];
const results=await Promise.all(questions.map((query,index)=>({query,index})).filter(x=>x.index===2||x.index===3).map(async({query,index})=>{
 const started=Date.now();let status=0,body;
 const req={method:'POST',headers:{},body:{query,history:[],responseMode:'voice',appContext:{course:'El Pulté Golf, Guatemala',weatherOrigin:{location:'El Pulté Golf, Guatemala',latitude:14.6164777,longitude:-90.4210559}}}};
 const res={setHeader(){},status(n){status=n;return this},json(value){body=value;return this}};
 await handler(req,res);
 const result={case:index+1,query,status,elapsedMs:Date.now()-started,answer:body?.answer||null,error:body?.error||null,sources:body?.sources||[],degraded:!!body?.degraded};
 console.log('UNIVERSAL_BENCHMARK '+JSON.stringify(result));return result;
}));
console.log('UNIVERSAL_BENCHMARK_SUMMARY '+JSON.stringify({answered:results.filter(x=>x.status===200&&x.answer).length,total:results.length,quality:'REQUIRES_HUMAN_COMPARISON_NOT_AUTOMATIC_PASS'}));
