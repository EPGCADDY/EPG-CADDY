(function(){
  "use strict";
  const TARGET_RATE=24000,SILENCE_MS=1000,NO_SPEECH_MS=8000,MAX_CAPTURE_MS=30000,MIN_SPEECH_MS=180,SETUP_SPEECH_THRESHOLD=.009,ROUND_SPEECH_THRESHOLD=.0045;
  let stream=null,context=null,source=null,analyser=null,processor=null,raf=0,capturedAudio=[],speechAt=0,speechStartedAt=0,openedAt=0,stopping=false,requestContext="setup",players="";
  let handlers={state:null,transcript:null,error:null};
  function emit(name,value){try{handlers[name]?.(value)}catch{}}
  function audioContextConstructor(){return window.AudioContext||window.webkitAudioContext||null}
  function available(){return !!(navigator.mediaDevices?.getUserMedia&&audioContextConstructor())}
  function release(){cancelAnimationFrame(raf);raf=0;try{processor?.disconnect()}catch{}try{source?.disconnect()}catch{}try{analyser?.disconnect()}catch{}try{stream?.getTracks().forEach(track=>track.stop())}catch{}try{context?.close()}catch{}stream=null;context=null;source=null;analyser=null;processor=null}
  function downsample(input,fromRate){if(fromRate===TARGET_RATE)return input;const ratio=fromRate/TARGET_RATE,length=Math.max(1,Math.round(input.length/ratio)),output=new Float32Array(length);for(let i=0;i<length;i++){const start=Math.floor(i*ratio),end=Math.min(input.length,Math.floor((i+1)*ratio));let sum=0;for(let j=start;j<end;j++)sum+=input[j];output[i]=sum/Math.max(1,end-start)}return output}
  function pcm16(input){const out=new Int16Array(input.length);for(let i=0;i<input.length;i++){const sample=Math.max(-1,Math.min(1,input[i]));out[i]=sample<0?sample*32768:sample*32767}return new Uint8Array(out.buffer)}
  function sendAudio(bytes){if(capturedAudio.length<360)capturedAudio.push(bytes)}
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
  function wavBytes(chunks){const length=chunks.reduce((sum,part)=>sum+part.length,0),buffer=new ArrayBuffer(44+length),view=new DataView(buffer),bytes=new Uint8Array(buffer);const word=(offset,value)=>{for(let i=0;i<value.length;i++)bytes[offset+i]=value.charCodeAt(i)};word(0,"RIFF");view.setUint32(4,36+length,true);word(8,"WAVE");word(12,"fmt ");view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,TARGET_RATE,true);view.setUint32(28,TARGET_RATE*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);word(36,"data");view.setUint32(40,length,true);let offset=44;for(const part of chunks){bytes.set(part,offset);offset+=part.length}return bytes}
  function base64(bytes){let binary="";for(let offset=0;offset<bytes.length;offset+=0x8000)binary+=String.fromCharCode(...bytes.subarray(offset,offset+0x8000));return btoa(binary)}
  async function transcribeCapturedAudio(chunks){
    const response=await fetch("/api/voice-transcribe",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({audioBase64:base64(wavBytes(chunks)),mimeType:"audio/wav",context:requestContext,players})}),result=await response.json().catch(()=>({}));
    if(!response.ok||!result.transcript)throw Object.assign(new Error(result.error||"TRANSCRIPTION_UNAVAILABLE"),{code:result.error||"TRANSCRIPTION_UNAVAILABLE"});return String(result.transcript).trim()
  }
  async function start(options={}){
    if(!available()||stream)return false;requestContext=options.context==="round"?"round":"setup";players=String(options.players||"");stopping=false;capturedAudio=[];speechAt=0;speechStartedAt=0;openedAt=0;
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
      const AudioContextClass=audioContextConstructor();context=new AudioContextClass();await context.resume();source=context.createMediaStreamSource(stream);analyser=context.createAnalyser();analyser.fftSize=2048;processor=context.createScriptProcessor(2048,1,1);source.connect(analyser);source.connect(processor);processor.connect(context.destination);processor.onaudioprocess=event=>{if(stopping)return;sendAudio(pcm16(downsample(event.inputBuffer.getChannelData(0),context.sampleRate)))};
      openedAt=performance.now();emit("state","listening");monitor();return true;
    }catch(error){release();emit("error",error);emit("state","idle");return false}
  }
  function stop(process=true){if(!stream||stopping)return false;stopping=true;cancelAnimationFrame(raf);raf=0;const chunks=capturedAudio.slice();release();capturedAudio=[];if(!process||!speechStartedAt){stopping=false;if(process)emit("error",Object.assign(new Error("NO_SPEECH"),{code:"NO_SPEECH"}));emit("state","idle");return true}emit("state","transcribing");void transcribeCapturedAudio(chunks).then(finalText=>{stopping=false;if(finalText)emit("transcript",finalText);else emit("error",Object.assign(new Error("NO_SPEECH"),{code:"NO_SPEECH"}));emit("state","idle")}).catch(error=>{stopping=false;emit("error",error);emit("state","idle")});return true}
  function configure(next={}){handlers={...handlers,...next};return api}
  const api={available,configure,start,stop,get active(){return !!stream},get stopping(){return stopping}};window.GSCServerVoiceCapture=api;
})();
