(function(){
  "use strict";
  const TARGET_RATE=24000,SILENCE_MS=1000,NO_SPEECH_MS=8000,MAX_CAPTURE_MS=30000,MIN_SPEECH_MS=180,SETUP_SPEECH_THRESHOLD=.009,ROUND_SPEECH_THRESHOLD=.0045;
  let socket=null,stream=null,context=null,source=null,analyser=null,processor=null,raf=0,pendingAudio=[],audioDonePending=false,speechAt=0,speechStartedAt=0,openedAt=0,stopping=false,requestContext="setup",players="",transcript="";
  let handlers={state:null,transcript:null,error:null};
  function emit(name,value){try{handlers[name]?.(value)}catch{}}
  function available(){return !!(navigator.mediaDevices?.getUserMedia&&window.AudioContext&&window.WebSocket)}
  function release(){cancelAnimationFrame(raf);raf=0;try{processor?.disconnect()}catch{}try{source?.disconnect()}catch{}try{analyser?.disconnect()}catch{}try{stream?.getTracks().forEach(track=>track.stop())}catch{}try{context?.close()}catch{}stream=null;context=null;source=null;analyser=null;processor=null;pendingAudio=[]}
  function downsample(input,fromRate){if(fromRate===TARGET_RATE)return input;const ratio=fromRate/TARGET_RATE,length=Math.max(1,Math.round(input.length/ratio)),output=new Float32Array(length);for(let i=0;i<length;i++){const start=Math.floor(i*ratio),end=Math.min(input.length,Math.floor((i+1)*ratio));let sum=0;for(let j=start;j<end;j++)sum+=input[j];output[i]=sum/Math.max(1,end-start)}return output}
  function pcm16(input){const out=new Int16Array(input.length);for(let i=0;i<input.length;i++){const sample=Math.max(-1,Math.min(1,input[i]));out[i]=sample<0?sample*32768:sample*32767}return new Uint8Array(out.buffer)}
  function sendAudio(bytes){if(socket?.readyState===WebSocket.OPEN)socket.send(bytes);else if(pendingAudio.length<240)pendingAudio.push(bytes)}
  function monitor(){
    if(!stream||stopping)return;
    const values=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(values);let energy=0;for(const value of values)energy+=value*value;const rms=Math.sqrt(energy/values.length),now=performance.now();
    const speechThreshold=requestContext==="round"?ROUND_SPEECH_THRESHOLD:SETUP_SPEECH_THRESHOLD;
    if(rms>=speechThreshold){if(!speechStartedAt)speechStartedAt=now;speechAt=now}
    if(speechStartedAt&&now-speechStartedAt>=MIN_SPEECH_MS&&now-speechAt>=SILENCE_MS){stop(true);return}
    if(!speechStartedAt&&now-openedAt>=NO_SPEECH_MS){stop(true);return}
    if(now-openedAt>=MAX_CAPTURE_MS){stop(true);return}
    raf=requestAnimationFrame(monitor)
  }
  async function connect(){
    const response=await fetch("/api/voice-transcribe",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"stream-token"})}),result=await response.json().catch(()=>({}));
    if(!response.ok||!result.token||!result.url)throw Object.assign(new Error(result.error||"TRANSCRIPTION_UNAVAILABLE"),{code:result.error||"TRANSCRIPTION_UNAVAILABLE"});
    await new Promise((resolve,reject)=>{const ws=new WebSocket(result.url,["ai-gateway-transcription.v1",`ai-gateway-auth.${result.token}`]);const timer=setTimeout(()=>{try{ws.close()}catch{}reject(Object.assign(new Error("TRANSCRIPTION_CONNECT_TIMEOUT"),{code:"TRANSCRIPTION_CONNECT_TIMEOUT"}))},5000);ws.binaryType="arraybuffer";ws.onopen=()=>{clearTimeout(timer);socket=ws;ws.send(JSON.stringify({type:"transcription-stream.start",inputAudioFormat:{type:"audio/pcm",rate:TARGET_RATE},providerOptions:{openai:{language:"es",prompt:prompt()}}}));for(const bytes of pendingAudio)ws.send(bytes);pendingAudio=[];if(audioDonePending){ws.send(JSON.stringify({type:"transcription-stream.audio-done"}));audioDonePending=false}resolve()};ws.onerror=()=>{clearTimeout(timer);reject(Object.assign(new Error("TRANSCRIPTION_UNAVAILABLE"),{code:"TRANSCRIPTION_UNAVAILABLE"}))};ws.onmessage=event=>{if(typeof event.data!=="string")return;let part;try{part=JSON.parse(event.data)}catch{return}if(part.type==="transcript-delta"||part.type==="transcript-partial"||part.type==="transcript-final")transcript=String(part.text||part.transcript||transcript);if(part.type==="error")emit("error",Object.assign(new Error(part.error?.message||"TRANSCRIPTION_UNAVAILABLE"),{code:"TRANSCRIPTION_UNAVAILABLE"}));if(part.type==="finish"){const finalText=String(part.text||transcript).trim();try{ws.close(1000)}catch{}socket=null;release();stopping=false;if(finalText)emit("transcript",finalText);else emit("error",Object.assign(new Error("NO_SPEECH"),{code:"NO_SPEECH"}));emit("state","idle")}};ws.onclose=()=>{if(socket===ws){socket=null;if(stream||stopping){release();stopping=false;emit("error",Object.assign(new Error("TRANSCRIPTION_UNAVAILABLE"),{code:"TRANSCRIPTION_UNAVAILABLE"}));emit("state","idle")}}}})
  }
  function prompt(){const base="Transcribe literalmente en español latinoamericano. Conserva nombres propios, números, hoyos, handicap, colores de marcas, lugares, zonas y preguntas completas. Jessie se escribe Jessie.";return requestContext==="round"?`${base} Vocabulario de golf: hoyo, gross, par, birdie, bogey, doble bogey, triple bogey, eagle, águila, albatros, equis, sin score. Jugadores: ${players||"los registrados"}. El número de hoyo dicho una vez se aplica a todos los jugadores siguientes hasta que se diga otro hoyo.`: `${base} Puede ser registro de jugadores o una pregunta universal, de clima o tráfico.`}
  async function start(options={}){
    if(!available()||stream)return false;requestContext=options.context==="round"?"round":"setup";players=String(options.players||"");stopping=false;pendingAudio=[];audioDonePending=false;transcript="";speechAt=0;speechStartedAt=0;openedAt=0;
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
      context=new AudioContext();await context.resume();source=context.createMediaStreamSource(stream);analyser=context.createAnalyser();analyser.fftSize=2048;processor=context.createScriptProcessor(2048,1,1);source.connect(analyser);source.connect(processor);processor.connect(context.destination);processor.onaudioprocess=event=>{if(stopping)return;sendAudio(pcm16(downsample(event.inputBuffer.getChannelData(0),context.sampleRate)))};
      openedAt=performance.now();emit("state","listening");const connection=connect();monitor();await connection;return true;
    }catch(error){release();emit("error",error);emit("state","idle");return false}
  }
  function stop(process=true){if(!stream||stopping)return false;stopping=true;cancelAnimationFrame(raf);raf=0;try{stream.getTracks().forEach(track=>track.stop())}catch{}if(!process||!speechStartedAt){try{socket?.close(1000)}catch{}socket=null;release();stopping=false;if(process)emit("error",Object.assign(new Error("NO_SPEECH"),{code:"NO_SPEECH"}));emit("state","idle");return true}emit("state","transcribing");audioDonePending=true;try{if(socket?.readyState===WebSocket.OPEN){socket.send(JSON.stringify({type:"transcription-stream.audio-done"}));audioDonePending=false}}catch(error){release();stopping=false;emit("error",error);emit("state","idle")}return true}
  function configure(next={}){handlers={...handlers,...next};return api}
  const api={available,configure,start,stop,get active(){return !!stream},get stopping(){return stopping}};window.GSCServerVoiceCapture=api;
})();
