import fs from "node:fs";
import {resolveGatewayToken} from "../api/_lib/vercel-gateway-auth.js";

if(process.env.VERCEL_ENV!=="preview"||process.env.VERCEL_GIT_COMMIT_REF!=="fix-r34-weather-second-turn")process.exit(0);

const [{default:universalAi,requestUniversalResponse},{default:voiceSpeech}]=await Promise.all([
  import("../api/universal-ai.js"),
  import("../api/voice-speech.js")
]);
const bank=JSON.parse(fs.readFileSync("docs/quality/UNIVERSAL_100_REFERENCE_BANK.json","utf8"));
const startedAt=new Date().toISOString();

function responseCapture(){
  let status=200,body=null,bytes=null,headers={};
  return{
    res:{setHeader(name,value){headers[String(name).toLowerCase()]=String(value)},status(value){status=value;return this},json(value){body=value;return this},send(value){bytes=Buffer.from(value||[]);return this},end(value){bytes=Buffer.from(value||[]);return this}},
    read:()=>({status,body,bytes,headers})
  };
}
async function callSpeech(text){
  let last;
  for(let attempt=1;attempt<=2;attempt++){
    const capture=responseCapture(),before=Date.now();
    await voiceSpeech({method:"POST",headers:{},body:{text,language:"es-GT"}},capture.res);
    last={...capture.read(),elapsedMs:Date.now()-before,attempt};
    if(last.status===200&&last.bytes?.length>1000)return last;
    if(attempt<2)await new Promise(resolve=>setTimeout(resolve,800));
  }
  return last;
}
async function transcribe(audio){
  const token=await resolveGatewayToken();
  if(!token)return{status:500,text:"",error:"GATEWAY_TOKEN_MISSING",elapsedMs:0};
  const authMethod=String(process.env.AI_GATEWAY_API_KEY||"").trim()?"api-key":"oidc";
  const before=Date.now(),response=await fetch("https://ai-gateway.vercel.sh/v4/ai/transcription-model",{method:"POST",headers:{Authorization:`Bearer ${token}`,"ai-gateway-protocol-version":"0.0.1","ai-gateway-auth-method":authMethod,"ai-transcription-model-specification-version":"4","ai-model-id":"openai/whisper-1","Content-Type":"application/json"},body:JSON.stringify({audio:Buffer.from(audio).toString("base64"),mediaType:"audio/mpeg",language:"es",prompt:"Transcribe literalmente una pregunta de propósito general en español. Conserva nombres, números y términos de golf."})});
  const payload=await response.json().catch(()=>({}));
  return{status:response.status,text:String(payload?.text||"").trim(),error:payload?.error?.code||payload?.error?.message||null,elapsedMs:Date.now()-before};
}
async function callAi(query,history){
  const capture=responseCapture(),before=Date.now();
  await universalAi({method:"POST",headers:{},body:{query,history,responseMode:"voice",appContext:{course:"El Pulté Golf, Guatemala"}}},capture.res);
  const result=capture.read();
  return{status:result.status,answer:String(result.body?.answer||"").trim(),sources:result.body?.sources||[],error:result.body?.error||null,degraded:!!result.body?.degraded,elapsedMs:Date.now()-before};
}
function words(value){return String(value||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"").replace(/[^a-z0-9]+/g," ").trim().split(/\s+/).filter(word=>word.length>1)}
function transcriptRecall(expected,actual){const a=new Set(words(actual)),e=words(expected);return e.length?e.filter(word=>a.has(word)).length/e.length:0}
function responseText(payload){return String(payload?.output_text||(payload?.output||[]).flatMap(item=>item?.content||[]).map(item=>item?.text||item?.output_text||"").join(" ")).trim()}
async function grade(record){
  if(!record.transportPass)return{qualityScore:0,qualityPass:false,criteria:{},reason:"Falló el flujo técnico completo"};
  const gatewayToken=await resolveGatewayToken();
  const result=await requestUniversalResponse({
    reasoning:{effort:"low"},store:false,tools:[],tool_choice:"none",max_output_tokens:550,
    instructions:"Eres un evaluador estricto e independiente. Compara la respuesta candidata con la referencia de ChatGPT y los hechos esperados. Devuelve exclusivamente JSON válido con esta forma: {\"scores\":{\"comprension\":0,\"exactitud\":0,\"relevancia\":0,\"profundidad\":0,\"claridad\":0,\"continuidad\":0,\"reconoce_incertidumbre\":0},\"reason\":\"máximo 160 caracteres\"}. Cada nota es entera de 0 a 5. Para casos independientes, continuidad vale 5 si no rompe contexto; para preguntas que no requieren incertidumbre, reconoce_incertidumbre vale 5 si no inventa.",
    input:[{role:"user",content:JSON.stringify({question:record.question,referenceAnswer:record.referenceAnswer,expectedFacts:record.expectedFacts,conversationId:record.conversationId,turn:record.turn,candidateAnswer:record.answer})}]
  },{apiKey:String(process.env.OPENAI_API_KEY||"").trim(),gatewayToken,deadlineMs:Date.now()+25_000,label:`universal quality ${record.id}`});
  if(!result.ok)return{qualityScore:0,qualityPass:false,criteria:{},reason:`JUDGE_${result.status||503}`};
  let parsed;try{parsed=JSON.parse(responseText(result.payload).replace(/^```(?:json)?\s*|\s*```$/g,""))}catch{return{qualityScore:0,qualityPass:false,criteria:{},reason:"JUDGE_INVALID_JSON"}}
  const names=["comprension","exactitud","relevancia","profundidad","claridad","continuidad","reconoce_incertidumbre"],criteria={};
  for(const name of names)criteria[name]=Math.max(0,Math.min(5,Math.round(Number(parsed?.scores?.[name])||0)));
  const qualityScore=Math.round(names.reduce((sum,name)=>sum+criteria[name],0)/(names.length*5)*100);
  return{qualityScore,qualityPass:qualityScore>=80&&names.every(name=>criteria[name]>=3),criteria,reason:String(parsed?.reason||"").slice(0,180)};
}

const histories=new Map(),results=[];
async function runCase(item){
  const totalStart=Date.now(),history=item.conversationId?(histories.get(item.conversationId)||[]):[];
  try{
    const inputAudio=await callSpeech(item.question);
    if(inputAudio.status!==200)throw new Error(`INPUT_SPEECH_${inputAudio.status}`);
    const recognition=await transcribe(inputAudio.bytes);
    if(recognition.status!==200||!recognition.text)throw new Error(`TRANSCRIPTION_${recognition.status}`);
    const ai=await callAi(recognition.text,history);
    if(ai.status!==200||!ai.answer)throw new Error(`UNIVERSAL_AI_${ai.status}`);
    const outputAudio=await callSpeech(ai.answer);
    const recall=transcriptRecall(item.question,recognition.text);
    const stages={inputAudio:inputAudio.status===200,recognition:recognition.status===200&&!!recognition.text,ai:ai.status===200&&!!ai.answer,written:!!ai.answer,spoken:outputAudio.status===200&&outputAudio.bytes?.length>1000};
    const transportPass=Object.values(stages).every(Boolean)&&recall>=0.6;
    const record={id:item.id,category:item.category,question:item.question,referenceAnswer:item.referenceAnswer,expectedFacts:item.expectedFacts,conversationId:item.conversationId||null,turn:item.turn||null,recognizedText:recognition.text,transcriptRecall:Number(recall.toFixed(3)),answer:ai.answer,sources:ai.sources,inputAudioBytes:inputAudio.bytes.length,outputAudioBytes:outputAudio.bytes?.length||0,timingMs:{inputAudio:inputAudio.elapsedMs,recognition:recognition.elapsedMs,ai:ai.elapsedMs,outputAudio:outputAudio.elapsedMs,total:Date.now()-totalStart},stages,transportPass,qualityScore:null,qualityPass:null,error:outputAudio.status===200?null:`OUTPUT_SPEECH_${outputAudio.status}`};
    results.push(record);
    if(item.conversationId){const next=[...history,{role:"user",content:recognition.text},{role:"assistant",content:ai.answer}].slice(-80);histories.set(item.conversationId,next)}
  }catch(error){results.push({id:item.id,category:item.category,question:item.question,referenceAnswer:item.referenceAnswer,expectedFacts:item.expectedFacts,conversationId:item.conversationId||null,turn:item.turn||null,transportPass:false,qualityScore:null,qualityPass:null,error:String(error?.message||error),timingMs:{total:Date.now()-totalStart}})}
}

const chained=new Map(),jobs=[];
for(const item of bank.cases){if(item.conversationId){if(!chained.has(item.conversationId))chained.set(item.conversationId,[]);chained.get(item.conversationId).push(item)}else jobs.push([item])}
for(const chain of chained.values())jobs.push(chain.sort((a,b)=>(a.turn||0)-(b.turn||0)));
let cursor=0;
async function worker(){while(cursor<jobs.length){const job=jobs[cursor++];for(const item of job)await runCase(item)}}
await Promise.all(Array.from({length:4},()=>worker()));
results.sort((a,b)=>Number(a.id)-Number(b.id));
let gradeCursor=0;async function gradeWorker(){while(gradeCursor<results.length){const item=results[gradeCursor++],assessment=await grade(item);Object.assign(item,assessment);console.log("UNIVERSAL_100_ROW "+JSON.stringify({id:item.id,category:item.category,question:item.question,referenceAnswer:item.referenceAnswer,recognizedText:item.recognizedText,answer:item.answer,criteria:item.criteria,qualityScore:item.qualityScore,qualityPass:item.qualityPass,transportPass:item.transportPass,timingMs:item.timingMs,error:item.error,reason:item.reason}))}}
await Promise.all(Array.from({length:4},()=>gradeWorker()));
const transportPassed=results.filter(item=>item.transportPass).length,qualityPassed=results.filter(item=>item.qualityPass).length,errorCounts=Object.fromEntries(Object.entries(results.reduce((counts,item)=>{const key=item.error||"NONE";counts[key]=(counts[key]||0)+1;return counts},{})).sort((a,b)=>b[1]-a[1]));
const responseTimes=results.map(item=>(item.timingMs?.ai||0)+(item.timingMs?.outputAudio||0)).filter(Boolean).sort((a,b)=>a-b),averageResponseMs=Math.round(responseTimes.reduce((sum,value)=>sum+value,0)/(responseTimes.length||1)),p95ResponseMs=responseTimes[Math.max(0,Math.ceil(responseTimes.length*.95)-1)]||0;
const artifact={schema:"epg-caddy-universal-benchmark-results/v2",startedAt,completedAt:new Date().toISOString(),commit:process.env.VERCEL_GIT_COMMIT_SHA||null,deployment:process.env.VERCEL_URL||null,method:"injected synthetic speech audio -> Vercel Gateway transcription -> EPG Universal AI -> written answer -> approved speech audio",physicalIphone:"PENDING",qualityComparison:"COMPARED_WITH_CHATGPT_REFERENCE",summary:{total:results.length,transportPassed,transportFailed:results.length-transportPassed,qualityPassed,qualityFailed:results.length-qualityPassed,acceptancePass:transportPassed===100&&qualityPassed>=90,averageResponseMs,p95ResponseMs,vadSilenceMs:275,browserSilenceMs:300,errorCounts},results};
fs.mkdirSync("assets/official-logos",{recursive:true});
fs.writeFileSync("assets/official-logos/universal-100-results.json",JSON.stringify(artifact,null,2));
console.log("UNIVERSAL_100_COMPLETE "+JSON.stringify(artifact.summary));
