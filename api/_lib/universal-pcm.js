import {resolveGatewayToken} from './vercel-gateway-auth.js';

// One fixed speaker and one synthesis. No sentence-level speaker switching.
export const UNIVERSAL_PCM_VOICE='onyx';
export const UNIVERSAL_GATEWAY_PCM_MODEL='openai/tts-1';
export async function streamUniversalPcm(text,{emit,signal,fetchImpl=fetch,apiKey=process.env.OPENAI_API_KEY,gatewayToken}={}){
  const input=String(text||'').trim();
  if(!input||input.length>4000)throw new Error('UNIVERSAL_PCM_TEXT_INVALID');
  let response;
  if(apiKey){
    response=await fetchImpl('https://api.openai.com/v1/audio/speech',{method:'POST',signal,
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:'tts-1',voice:UNIVERSAL_PCM_VOICE,input,speed:0.9,response_format:'pcm'})});
    if(response.ok){
      emit({type:'audio_start',voice:UNIVERSAL_PCM_VOICE,sampleRate:24000,format:'pcm_s16le',progressive:true});
      const reader=response.body.getReader();let bytes=0;
      try{while(true){const part=await reader.read();if(part.done)break;if(signal?.aborted)throw new Error('ABORTED');
        bytes+=part.value.length;if(bytes>24_000*2*300)throw new Error('UNIVERSAL_PCM_TOO_LARGE');
        emit({type:'audio_chunk',audio:Buffer.from(part.value).toString('base64')});
      }}finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
      if(!bytes||bytes%2)throw new Error('UNIVERSAL_PCM_INCOMPLETE');
      emit({type:'audio_end'});return {progressive:true,bytes};
    }
    // Only before any sound: preserve both model and speaker through Gateway.
    await response.body?.cancel().catch(()=>{});
  }
  const token=await resolveGatewayToken(gatewayToken);
  if(!token)throw new Error('UNIVERSAL_PCM_NOT_CONFIGURED');
  response=await fetchImpl('https://ai-gateway.vercel.sh/v4/ai/speech-model',{method:'POST',signal,
    headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json','ai-model-id':UNIVERSAL_GATEWAY_PCM_MODEL,
      'ai-gateway-protocol-version':'0.0.1','ai-speech-model-specification-version':'4',
      'ai-gateway-auth-method':process.env.AI_GATEWAY_API_KEY?'api-key':'oidc'},
    body:JSON.stringify({text:input,voice:UNIVERSAL_PCM_VOICE,speed:0.9,outputFormat:'pcm'})});
  if(!response.ok){console.warn('universal-pcm-provider-failure',JSON.stringify({provider:'gateway',model:UNIVERSAL_GATEWAY_PCM_MODEL,status:response.status}));throw new Error('UNIVERSAL_PCM_PROVIDER_UNAVAILABLE');}
  const payload=await response.json(),audio=Buffer.from(String(payload.audio||''),'base64');
  if(!audio.length||audio.length%2||audio.length>24_000*2*300)throw new Error('UNIVERSAL_PCM_INCOMPLETE');
  emit({type:'audio_start',voice:UNIVERSAL_PCM_VOICE,sampleRate:24000,format:'pcm_s16le',progressive:false});
  emit({type:'audio_chunk',audio:audio.toString('base64')});emit({type:'audio_end'});
  return {progressive:false,bytes:audio.length};
}
