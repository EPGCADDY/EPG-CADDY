import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";
import {resolveGatewayToken} from "./_lib/vercel-gateway-auth.js";

const MAX_SPEECH_TEXT=4000;
const VOICE="cedar";
const SPEED=1.15;
const GATEWAY_SPEECH_MODELS=[
  {model:"openai/tts-1",voice:"onyx",deliveredVoice:"onyx"},
  {model:"spacexai/grok-tts",voice:"Rex",deliveredVoice:"rex"}
];
const INSTRUCTIONS="Locutor masculino adulto, serio, sobrio y profesional. Español internacional neutro, sin acento regional marcado, sin Spanglish, sin tono comercial ni entusiasmo artificial. Dicción clara, ritmo medio-lento y constante. Lee el contenido completo sin agregar introducciones, comentarios ni despedidas.";

export function sanitizeSpeechRequest(body={}){
  const text=String(body.text||"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g," ").replace(/\s+/g," ").trim().slice(0,MAX_SPEECH_TEXT);
  const language=String(body.language||"es-GT").replace(/[^a-zA-Z-]/g,"").slice(0,12)||"es-GT";
  return{text,language};
}

export function cedarSpeechPayload(text,language="es-GT"){
  return{
    model:"gpt-4o-mini-tts",
    voice:VOICE,
    speed:SPEED,
    response_format:"mp3",
    input:text,
    instructions:`${INSTRUCTIONS} Idioma solicitado: ${language}.`
  };
}

export function cedarGatewayPayload(text,voice="onyx"){
  return{text,voice,outputFormat:"mp3"};
}

async function requestDirectSpeech(apiKey,payload,signal){
  if(!apiKey)return null;
  return fetch("https://api.openai.com/v1/audio/speech",{
    method:"POST",signal,
    headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","OpenAI-Safety-Identifier":"golf-score-card-guatemala-cedar-voice"},
    body:JSON.stringify(payload)
  });
}

async function requestGatewaySpeech(token,text,signal,{model,voice}){
  if(!token)return null;
  return fetch("https://ai-gateway.vercel.sh/v4/ai/speech-model",{
    method:"POST",signal,
    headers:{Authorization:`Bearer ${token}`,"ai-model-id":model,"ai-speech-model-specification-version":"4","Content-Type":"application/json"},
    body:JSON.stringify(cedarGatewayPayload(text,voice))
  });
}

async function gatewayFailure(response){
  const payload=await response?.clone?.().json().catch(()=>null);
  return{
    status:Number(response?.status)||0,
    providerCode:String(payload?.error?.code||payload?.error?.type||"").replace(/[^a-zA-Z0-9_.-]/g,"").slice(0,80)||null,
    providerMessage:String(payload?.error?.message||payload?.message||"").replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ .,;:_-]/g,"").slice(0,180)||null
  };
}

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  }
  const apiKey=process.env.OPENAI_API_KEY,gatewayToken=await resolveGatewayToken();
  if(!apiKey&&!gatewayToken)return res.status(500).json({ok:false,error:"VOICE_NOT_CONFIGURED"});
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const {text,language}=sanitizeSpeechRequest(body);
    if(text.length<2)return res.status(422).json({ok:false,error:"TEXT_REQUIRED"});
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),45_000);
    let upstream,fromGateway=false,gatewayVoice="";
    try{
      upstream=await requestDirectSpeech(apiKey,cedarSpeechPayload(text,language),controller.signal);
      if(!upstream?.ok&&gatewayToken){
        console.warn("cedar speech direct fallback",JSON.stringify({status:upstream?.status||0}));
        for(const candidate of GATEWAY_SPEECH_MODELS){
          upstream=await requestGatewaySpeech(gatewayToken,text,controller.signal,candidate);fromGateway=true;gatewayVoice=candidate.deliveredVoice;
          if(upstream.ok)break;
          console.warn("cedar speech gateway failed",JSON.stringify({...await gatewayFailure(upstream),model:candidate.model}));
        }
      }
    }finally{clearTimeout(timeout)}
    if(!upstream){
      console.warn("cedar speech upstream",JSON.stringify({status:0}));
      return res.status(502).json({ok:false,error:"CEDAR_SPEECH_UNAVAILABLE",retryable:false});
    }
    if(!upstream.ok){
      console.warn("cedar speech upstream",JSON.stringify({status:upstream.status}));
      return res.status(upstream.status===429?503:502).json({ok:false,error:"CEDAR_SPEECH_UNAVAILABLE",retryable:upstream.status===429});
    }
    let audio;
    if(fromGateway){
      const payload=await upstream.json().catch(()=>null);audio=Buffer.from(String(payload?.audio||""),"base64");
    }else audio=Buffer.from(await upstream.arrayBuffer());
    if(!audio.length)return res.status(502).json({ok:false,error:"CEDAR_SPEECH_EMPTY"});
    res.setHeader("Content-Type","audio/mpeg");
    res.setHeader("Content-Length",String(audio.length));
    res.setHeader("X-GSCG-Voice",fromGateway?gatewayVoice:VOICE);
    return res.status(200).send(audio);
  }catch(error){
    console.error("cedar speech",error?.name==="AbortError"?"timeout":"failed");
    return res.status(502).json({ok:false,error:error?.name==="AbortError"?"CEDAR_SPEECH_TIMEOUT":"CEDAR_SPEECH_UNAVAILABLE"});
  }
}
