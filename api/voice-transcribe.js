import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";

const MAX_AUDIO_BYTES=7_500_000;
const MIME_EXTENSIONS={"audio/mp4":"m4a","audio/mpeg":"mp3","audio/webm":"webm","audio/wav":"wav","audio/x-m4a":"m4a"};

function safeText(value,max){return String(value||"").replace(/[\r\n]+/g," ").replace(/\s+/g," ").trim().slice(0,max)}
function promptFor(context,players){
  const base="Transcribe literalmente en español latinoamericano. Conserva nombres propios, números, hoyos, handicap, colores de marcas, lugares, zonas y preguntas completas. Jessie se escribe Jessie.";
  if(context==="round")return `${base} Vocabulario de golf: hoyo, gross, par, birdie, bogey, doble bogey, triple bogey, eagle, águila, albatros, equis, sin score. Jugadores: ${players||"los registrados"}.`.slice(0,1000);
  return `${base} Puede ser registro de jugadores o una pregunta universal, de clima o tráfico.`;
}

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST")return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  const apiKey=String(process.env.OPENAI_API_KEY||"").trim();
  if(!apiKey)return res.status(500).json({ok:false,error:"TRANSCRIPTION_NOT_CONFIGURED"});
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const audioBase64=String(body.audioBase64||""),mimeType=safeText(body.mimeType,80).toLowerCase().split(";")[0]||"audio/mp4";
    if(!/^[A-Za-z0-9+/=]+$/.test(audioBase64))return res.status(422).json({ok:false,error:"AUDIO_REQUIRED"});
    const audio=Buffer.from(audioBase64,"base64");
    if(!audio.length||audio.length>MAX_AUDIO_BYTES)return res.status(413).json({ok:false,error:"AUDIO_SIZE_INVALID"});
    const form=new FormData();
    form.set("file",new Blob([audio],{type:mimeType}),`voice.${MIME_EXTENSIONS[mimeType]||"m4a"}`);
    form.set("model","gpt-4o-mini-transcribe");
    form.set("language","es");
    form.set("response_format","json");
    form.set("prompt",promptFor(body.context==="round"?"round":"setup",safeText(body.players,400)));
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25_000);
    let upstream;
    try{upstream=await fetch("https://api.openai.com/v1/audio/transcriptions",{method:"POST",signal:controller.signal,headers:{Authorization:`Bearer ${apiKey}`,"OpenAI-Safety-Identifier":"golf-score-card-guatemala-voice-transcription"},body:form})}finally{clearTimeout(timer)}
    const payload=await upstream.json().catch(()=>null);
    if(!upstream.ok){console.error("voice-transcribe",JSON.stringify({event:"upstream_failed",status:upstream.status}));return res.status(upstream.status===429?503:502).json({ok:false,error:"TRANSCRIPTION_UNAVAILABLE",retryable:upstream.status===429})}
    const transcript=safeText(payload?.text,6000);
    if(!transcript)return res.status(422).json({ok:false,error:"NO_SPEECH"});
    console.info("voice-transcribe",JSON.stringify({event:"completed",context:body.context==="round"?"round":"setup",characters:transcript.length}));
    return res.status(200).json({ok:true,transcript});
  }catch(error){console.error("voice-transcribe",JSON.stringify({event:error?.name==="AbortError"?"timeout":"failed"}));return res.status(502).json({ok:false,error:error?.name==="AbortError"?"TRANSCRIPTION_TIMEOUT":"TRANSCRIPTION_UNAVAILABLE"})}
}
