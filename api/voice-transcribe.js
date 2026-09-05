import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";
import {experimental_transcribe as transcribe} from "ai";
import {gateway} from "@ai-sdk/gateway";

const MAX_AUDIO_BYTES=7_500_000;
const STREAM_MODELS=["openai/gpt-realtime-whisper","google/gemini-3.5-transcribe-live","spacexai/grok-stt"];

function safeText(value,max){return String(value||"").replace(/[\r\n]+/g," ").replace(/\s+/g," ").trim().slice(0,max)}
function promptFor(context,players){
  const base="Transcribe literalmente en español latinoamericano. Conserva nombres propios, números, hoyos, handicap, colores de marcas, lugares, zonas y preguntas completas. Jessie se escribe Jessie.";
  if(context==="round")return `${base} Vocabulario de golf: hoyo, gross, par, birdie, bogey, doble bogey, triple bogey, eagle, águila, albatros, equis, sin score. Jugadores: ${players||"los registrados"}. El número de hoyo dicho una vez se aplica a todos los jugadores siguientes hasta que se diga otro hoyo.`.slice(0,1000);
  return `${base} Puede ser registro de jugadores o una pregunta universal, de clima o tráfico.`;
}

async function mintStreamSecret(){
  let failure;
  for(const model of STREAM_MODELS)try{
    const secret=await gateway.experimental_transcription.getToken({model,expiresAfterSeconds:300});
    return{...secret,model};
  }catch(error){failure=error;console.warn("voice-transcribe-token",JSON.stringify({event:"provider_unavailable",model,status:Number(error?.statusCode)||undefined}))}
  throw failure||new Error("TRANSCRIPTION_UNAVAILABLE");
}

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  try{
    if(req.method==="GET"&&req.query?.health==="stream-token"&&process.env.VERCEL_ENV!=="production"){
      const started=Date.now(),secret=await mintStreamSecret();
      return res.status(200).json({ok:true,model:secret.model,tokenLatencyMs:Date.now()-started});
    }
    if(req.method!=="POST")return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    if(body.action==="stream-token"){
      const secret=await mintStreamSecret();
      return res.status(200).json({ok:true,model:secret.model,token:secret.token,url:secret.url,expiresAt:secret.expiresAt||null});
    }
    const audioBase64=String(body.audioBase64||""),mimeType=safeText(body.mimeType,80).toLowerCase().split(";")[0]||"audio/mp4";
    if(!/^[A-Za-z0-9+/=]+$/.test(audioBase64))return res.status(422).json({ok:false,error:"AUDIO_REQUIRED"});
    const audio=Buffer.from(audioBase64,"base64");
    if(!audio.length||audio.length>MAX_AUDIO_BYTES)return res.status(413).json({ok:false,error:"AUDIO_SIZE_INVALID"});
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25_000);
    let result;
    try{
      result=await transcribe({
        model:gateway.transcriptionModel("openai/gpt-4o-mini-transcribe"),
        audio,
        abortSignal:controller.signal,
        maxRetries:1,
        providerOptions:{openai:{language:"es",prompt:promptFor(body.context==="round"?"round":"setup",safeText(body.players,400))}}
      });
    }finally{clearTimeout(timer)}
    const transcript=safeText(result?.text,6000);
    if(!transcript)return res.status(422).json({ok:false,error:"NO_SPEECH"});
    console.info("voice-transcribe",JSON.stringify({event:"completed",context:body.context==="round"?"round":"setup",characters:transcript.length}));
    return res.status(200).json({ok:true,transcript});
  }catch(error){console.error("voice-transcribe",JSON.stringify({event:error?.name==="AbortError"?"timeout":"gateway_failed",status:Number(error?.statusCode)||undefined}));return res.status(503).json({ok:false,error:error?.name==="AbortError"?"TRANSCRIPTION_TIMEOUT":"TRANSCRIPTION_UNAVAILABLE",retryable:true})}
}
