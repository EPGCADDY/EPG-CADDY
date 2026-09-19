import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";
import {resolveGatewayToken} from "./_lib/vercel-gateway-auth.js";

const MAX_SPEECH_TEXT=4000;
const VOICE="onyx";
const GATEWAY_VOICE="onyx";
const SPEED=.9;
const GATEWAY_SPEECH_MODEL="openai/tts-1";

export function sanitizeSpeechRequest(body={}){
  const text=String(body.text||"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g," ").replace(/\s+/g," ").trim().slice(0,MAX_SPEECH_TEXT);
  const language=String(body.language||"es-GT").replace(/[^a-zA-Z-]/g,"").slice(0,12)||"es-GT";
  return{text,language};
}

export function cedarSpeechPayload(text,language="es-GT"){
  return{
    model:"tts-1",
    voice:VOICE,
    speed:SPEED,
    response_format:"mp3",
    input:text
  };
}

export function cedarGatewayPayload(text){
  // tts-1 uses a fixed speaker; language follows the input text. Instructions
  // and language overrides are not supported by this model.
  return{text,voice:VOICE,speed:SPEED,outputFormat:"mp3"};
}

async function requestDirectSpeech(apiKey,payload,signal){
  if(!apiKey)return null;
  return fetch("https://api.openai.com/v1/audio/speech",{
    method:"POST",signal,
    headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","OpenAI-Safety-Identifier":"golf-score-card-guatemala-cedar-voice"},
    body:JSON.stringify(payload)
  });
}

async function requestGatewaySpeech(token,text,language,signal){
  if(!token)return null;
  const authMethod=String(process.env.AI_GATEWAY_API_KEY||"").trim()?"api-key":"oidc";
  return fetch("https://ai-gateway.vercel.sh/v4/ai/speech-model",{
    method:"POST",signal,
    headers:{
      Authorization:`Bearer ${token}`,
      "ai-gateway-protocol-version":"0.0.1",
      "ai-gateway-auth-method":authMethod,
      "ai-model-id":GATEWAY_SPEECH_MODEL,
      "ai-speech-model-specification-version":"4",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(cedarGatewayPayload(text,language))
  });
}

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  }
  const gatewayToken=await resolveGatewayToken().catch(()=>null);
  const apiKey=String(process.env.OPENAI_API_KEY||"").trim();
  if(!gatewayToken&&!apiKey)return res.status(500).json({ok:false,error:"APPROVED_VOICE_NOT_CONFIGURED"});
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const {text,language}=sanitizeSpeechRequest(body);
    if(text.length<2)return res.status(422).json({ok:false,error:"TEXT_REQUIRED"});
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),22_500);
    let audio=null,provider=null;
    try{
      // One complete, fixed-voice recording. Fail over before delivering any audio.
      for(const route of ['gateway','direct']){
        if(route==='gateway'&&!gatewayToken||route==='direct'&&!apiKey)continue;
        const attempt=new AbortController();
        const signal=AbortSignal.any([controller.signal,attempt.signal]);
        const attemptTimer=setTimeout(()=>attempt.abort(),route==='gateway'&&apiKey?8000:22000);
        try{
          const upstream=route==='gateway'
            ?await requestGatewaySpeech(gatewayToken,text,language,signal)
            :await requestDirectSpeech(apiKey,cedarSpeechPayload(text,language),signal);
          if(!upstream?.ok){
            console.warn('voice-provider-failure',JSON.stringify({provider:route,status:upstream?.status||0,voice:VOICE}));
            await upstream?.body?.cancel().catch(()=>{});
            continue;
          }
          const candidate=route==='gateway'
            ?Buffer.from(String((await upstream.json())?.audio||''),'base64')
            :Buffer.from(await upstream.arrayBuffer());
          if(!candidate.length||candidate.length>8_000_000)throw new Error('INVALID_AUDIO');
          audio=candidate;provider=route;break;
        }catch(error){
          console.warn('voice-provider-failure',JSON.stringify({provider:route,reason:signal.aborted?'timeout':'transport_or_audio',voice:VOICE}));
        }finally{clearTimeout(attemptTimer)}
        if(controller.signal.aborted)break;
      }
    }finally{clearTimeout(timeout)}
    if(!audio){
      console.error('voice-unavailable',JSON.stringify({voice:VOICE,gatewayConfigured:Boolean(gatewayToken),backupConfigured:Boolean(apiKey)}));
      return res.status(502).json({ok:false,error:'CEDAR_SPEECH_UNAVAILABLE',retryable:true});
    }
    res.setHeader('X-GSCG-Voice-Provider',provider);
    console.info("cedar spanish speech gateway",JSON.stringify({model:GATEWAY_SPEECH_MODEL,language:"es-419",speed:SPEED,locked:true}));
    res.setHeader("Content-Type","audio/mpeg");
    res.setHeader("Content-Length",String(audio.length));
    res.setHeader("X-GSCG-Voice",GATEWAY_VOICE);
    return res.status(200).send(audio);
  }catch(error){
    console.error("cedar speech",error?.name==="AbortError"?"timeout":"failed");
    return res.status(502).json({ok:false,error:error?.name==="AbortError"?"CEDAR_SPEECH_TIMEOUT":"CEDAR_SPEECH_UNAVAILABLE"});
  }
}
