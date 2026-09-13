import fs from "node:fs";
import {execFileSync} from "node:child_process";
import {createHash} from "node:crypto";
import {resolveGatewayToken} from "../api/_lib/vercel-gateway-auth.js";

if(process.env.VERCEL_ENV!=="preview"||process.env.VERCEL_GIT_COMMIT_REF!=="test-r36-audio-sequential")process.exit(0);

if(!String(process.env.VERCEL_URL||'').startsWith('golf-sc-gt-')){console.log('SERIAL_AUDIO_SKIPPED_NON_LAB');process.exit(0)}
execFileSync('npm',['install','--prefix','/tmp/r36-audio-decoder','--no-audit','--no-fund','--ignore-scripts','mpg123-decoder@1.0.3'],{stdio:'inherit'});
const {MPEGDecoder}=await import('/tmp/r36-audio-decoder/node_modules/mpg123-decoder/index.js');
const audioDir='assets/official-logos/r36-audio-bank';fs.mkdirSync(audioDir,{recursive:true});
async function signalEvidence(bytes,id,kind){
 const decoder=new MPEGDecoder();await decoder.ready;
 try{const d=decoder.decode(new Uint8Array(bytes||[]));let sum=0,count=0,peak=0;
 for(const channel of d.channelData)for(const value of channel){sum+=value*value;peak=Math.max(peak,Math.abs(value));count++}
 const rms=count?Math.sqrt(sum/count):0,path=`${audioDir}/${id}-${kind}.mp3`;
 fs.writeFileSync(path,bytes||Buffer.alloc(0));
 return {durationSeconds:d.samplesDecoded/d.sampleRate,rms,peak,samples:d.samplesDecoded,decodeErrors:d.errors?.length||0,nonSilent:rms>0.0001&&d.samplesDecoded>0,path,sha256:createHash('sha256').update(bytes||Buffer.alloc(0)).digest('hex')};
 }finally{decoder.free()}
}
const [{default:universalAi},{default:voiceSpeech}]=await Promise.all([
  import("../api/universal-ai.js"),
  import("../api/voice-speech.js")
]);
const bank=JSON.parse(fs.readFileSync("docs/quality/ENGINE_100_BANK.json","utf8"));
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
  const before=Date.now(),response=await fetch("https://ai-gateway.vercel.sh/v4/ai/transcription-model",{method:"POST",signal:AbortSignal.timeout(30000),headers:{Authorization:`Bearer ${token}`,"ai-gateway-protocol-version":"0.0.1","ai-gateway-auth-method":authMethod,"ai-transcription-model-specification-version":"4","ai-model-id":"openai/whisper-1","Content-Type":"application/json"},body:JSON.stringify({audio:Buffer.from(audio).toString("base64"),mediaType:"audio/mpeg",language:"es",prompt:"Transcribe literalmente una pregunta de propósito general en español. Conserva nombres, números y términos de golf."})});
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
    const inputSignal=await signalEvidence(inputAudio.bytes,item.id,"input"),outputSignal=await signalEvidence(outputAudio.bytes,item.id,"output");
    const stages={inputAudio:inputAudio.status===200,recognition:recognition.status===200&&!!recognition.text,ai:ai.status===200&&!!ai.answer,written:!!ai.answer,audioDecoded:outputAudio.status===200&&outputSignal.nonSilent&&outputSignal.decodeErrors===0};
    const transportPass=Object.values(stages).every(Boolean)&&inputSignal.nonSilent;
    const record={id:item.id,category:item.category,question:item.question,referenceAnswer:item.referenceAnswer,expectedFacts:item.expectedFacts,conversationId:item.conversationId||null,turn:item.turn||null,recognizedText:recognition.text,transcriptRecall:Number(recall.toFixed(3)),answer:ai.answer,sources:ai.sources,inputAudioBytes:inputAudio.bytes.length,outputAudioBytes:outputAudio.bytes?.length||0,timingMs:{inputAudio:inputAudio.elapsedMs,recognition:recognition.elapsedMs,ai:ai.elapsedMs,outputAudio:outputAudio.elapsedMs,total:Date.now()-totalStart},stages,inputSignal,outputSignal,playback:false,transportPass,qualityScore:null,qualityPass:null,error:outputAudio.status===200?null:`OUTPUT_SPEECH_${outputAudio.status}`};
    results.push(record);console.log("SERIAL_AUDIO_CASE "+JSON.stringify(record));
    if(item.conversationId){const next=[...history,{role:"user",content:recognition.text},{role:"assistant",content:ai.answer}].slice(-80);histories.set(item.conversationId,next)}
  }catch(error){results.push({id:item.id,category:item.category,question:item.question,referenceAnswer:item.referenceAnswer,expectedFacts:item.expectedFacts,conversationId:item.conversationId||null,turn:item.turn||null,transportPass:false,qualityScore:null,qualityPass:null,error:String(error?.message||error),timingMs:{total:Date.now()-totalStart}})}
}

for(const item of bank.cases){
 const before=results.length;await runCase(item);
 if(results.length!==before+1)throw Error('CASE_COUNT_MISMATCH');
 if(!results.at(-1).answer)console.log('SERIAL_AUDIO_CASE '+JSON.stringify(results.at(-1)));
}
results.sort((a,b)=>Number(a.id)-Number(b.id));
const transportPassed=results.filter(item=>item.transportPass).length,errorCounts=Object.fromEntries(Object.entries(results.reduce((counts,item)=>{const key=item.error||"NONE";counts[key]=(counts[key]||0)+1;return counts},{})).sort((a,b)=>b[1]-a[1]));
const artifact={schema:"epg-caddy-universal-benchmark-results/v1",startedAt,completedAt:new Date().toISOString(),commit:process.env.VERCEL_GIT_COMMIT_SHA||null,deployment:process.env.VERCEL_URL||null,method:"synthetic speech audio -> Vercel Gateway transcription -> EPG Universal AI -> written answer -> approved speech audio",physicalIphone:"PENDING",qualityComparison:"PENDING_CHATGPT_REVIEW",concurrency:1,browserPlayback:false,decoder:"mpg123-decoder@1.0.3",summary:{total:results.length,transportPassed,transportFailed:results.length-transportPassed,errorCounts},results};
fs.mkdirSync("assets/official-logos",{recursive:true});
fs.writeFileSync("assets/official-logos/r36-serial-audio-results.json",JSON.stringify(artifact,null,2));
console.log("SERIAL_AUDIO_COMPLETE "+JSON.stringify(artifact.summary));
