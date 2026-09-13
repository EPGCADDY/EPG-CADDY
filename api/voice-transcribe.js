import {handleAppPreflight,isAllowedAppOrigin} from './_lib/cors.js';
import {resolveGatewayToken} from './_lib/vercel-gateway-auth.js';

export const MAX_AUDIO_BYTES=3_000_000;
const TYPES=new Set(['audio/mp4','audio/webm','audio/ogg','audio/wav','audio/mpeg']);
export function validateAudio(body){
  const mediaType=String(body?.mediaType||'').split(';')[0].toLowerCase();
  const audio=body?.audio;
  if(!TYPES.has(mediaType)||typeof audio!=='string'||!audio.length||audio.length>4_000_000||audio.length%4||!/^[A-Za-z0-9+/]+={0,2}$/.test(audio))return null;
  const bytes=Buffer.from(audio,'base64');
  if(bytes.length<512||bytes.length>MAX_AUDIO_BYTES||bytes.toString('base64')!==audio)return null;
  return {audio,mediaType};
}
export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false,error:'METHOD_NOT_ALLOWED'})}
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:'ORIGIN_FORBIDDEN'});
  let body=req.body;try{if(typeof body==='string')body=JSON.parse(body)}catch{return res.status(400).json({ok:false,error:'INVALID_AUDIO'})}
  const input=validateAudio(body);
  if(!input)return res.status(400).json({ok:false,error:'INVALID_AUDIO'});
  const turnId=String(body.turnId||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);
  const started=Date.now();
  try{
    const token=await resolveGatewayToken();
    if(!token)return res.status(503).json({ok:false,error:'TRANSCRIPTION_UNAVAILABLE',turnId});
    const authMethod=String(process.env.AI_GATEWAY_API_KEY||'').trim()?'api-key':'oidc';
    const response=await fetch('https://ai-gateway.vercel.sh/v4/ai/transcription-model',{
      method:'POST',signal:AbortSignal.timeout(30000),
      headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json','ai-gateway-protocol-version':'0.0.1','ai-gateway-auth-method':authMethod,'ai-transcription-model-specification-version':'4','ai-model-id':'openai/whisper-1'},
      body:JSON.stringify({...input,language:'es',prompt:'Transcribe literalmente el audio en español. Conserva preguntas, nombres, números y términos de golf. No respondas la pregunta ni añadas contenido.'})
    });
    const payload=await response.json().catch(()=>({}));
    console.info('voice-turn',JSON.stringify({turnId,stage:'transcription',status:response.status,elapsedMs:Date.now()-started}));
    if(!response.ok)return res.status(503).json({ok:false,error:'TRANSCRIPTION_UNAVAILABLE',turnId});
    const text=String(payload.text||'').trim();
    if(!text||text.length>4000)return res.status(422).json({ok:false,error:'NO_TRANSCRIPT',turnId});
    return res.status(200).json({ok:true,text,turnId});
  }catch{
    console.warn('voice-turn',JSON.stringify({turnId,stage:'transcription',status:503,elapsedMs:Date.now()-started}));
    return res.status(503).json({ok:false,error:'TRANSCRIPTION_UNAVAILABLE',turnId});
  }
}
