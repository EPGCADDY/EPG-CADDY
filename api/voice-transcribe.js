import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";
import {experimental_transcribe as transcribe} from "ai";
import {gateway} from "@ai-sdk/gateway";

const MAX_AUDIO_BYTES=7_500_000;

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
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
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
