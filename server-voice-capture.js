(function(){
  "use strict";
  const SILENCE_MS=1000,NO_SPEECH_MS=8000,MAX_CAPTURE_MS=30000,MIN_SPEECH_MS=180;
  let recorder=null,stream=null,context=null,source=null,analyser=null,raf=0,chunks=[],speechAt=0,speechStartedAt=0,openedAt=0,stopping=false,requestContext="setup",players="";
  let handlers={state:null,transcript:null,error:null};
  function emit(name,value){try{handlers[name]?.(value)}catch{}}
  function supportedMime(){const options=["audio/mp4;codecs=mp4a.40.2","audio/mp4","audio/webm;codecs=opus","audio/webm"];return options.find(value=>window.MediaRecorder?.isTypeSupported?.(value))||""}
  function available(){return !!(navigator.mediaDevices?.getUserMedia&&window.MediaRecorder&&window.AudioContext)}
  function release(){cancelAnimationFrame(raf);raf=0;try{source?.disconnect()}catch{}try{analyser?.disconnect()}catch{}try{stream?.getTracks().forEach(track=>track.stop())}catch{}try{context?.close()}catch{}stream=null;context=null;source=null;analyser=null;recorder=null}
  function toBase64(buffer){const bytes=new Uint8Array(buffer);let binary="";for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(binary)}
  function monitor(){
    if(!recorder||recorder.state!=="recording")return;
    const values=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(values);let energy=0;for(const value of values)energy+=value*value;const rms=Math.sqrt(energy/values.length),now=performance.now();
    if(rms>=.009){if(!speechStartedAt)speechStartedAt=now;speechAt=now}
    if(speechStartedAt&&now-speechStartedAt>=MIN_SPEECH_MS&&now-speechAt>=SILENCE_MS){stop(true);return}
    if(!speechStartedAt&&now-openedAt>=NO_SPEECH_MS){stop(true);return}
    if(now-openedAt>=MAX_CAPTURE_MS){stop(true);return}
    raf=requestAnimationFrame(monitor)
  }
  async function upload(blob){
    if(!speechStartedAt)throw Object.assign(new Error("NO_SPEECH"),{code:"NO_SPEECH"});
    emit("state","transcribing");
    const payload={audioBase64:toBase64(await blob.arrayBuffer()),mimeType:blob.type||"audio/mp4",context:requestContext,players};
    const response=await fetch("/api/voice-transcribe",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}),result=await response.json().catch(()=>({}));
    if(!response.ok||!result.transcript)throw Object.assign(new Error(result.error||"TRANSCRIPTION_UNAVAILABLE"),{code:result.error||"TRANSCRIPTION_UNAVAILABLE"});
    emit("transcript",String(result.transcript).trim());
  }
  async function start(options={}){
    if(!available()||recorder)return false;requestContext=options.context==="round"?"round":"setup";players=String(options.players||"");stopping=false;chunks=[];speechAt=0;speechStartedAt=0;openedAt=0;
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
      context=new AudioContext();await context.resume();source=context.createMediaStreamSource(stream);analyser=context.createAnalyser();analyser.fftSize=2048;source.connect(analyser);
      const mimeType=supportedMime();recorder=new MediaRecorder(stream,mimeType?{mimeType}:undefined);recorder.ondataavailable=event=>{if(event.data?.size)chunks.push(event.data)};
      recorder.onerror=event=>{emit("error",event.error||new Error("AUDIO_CAPTURE"));release()};
      recorder.onstop=async()=>{const type=recorder?.mimeType||mimeType||"audio/mp4",blob=new Blob(chunks,{type});release();try{await upload(blob)}catch(error){emit("error",error)}finally{stopping=false;emit("state","idle")}};
      recorder.start(250);openedAt=performance.now();emit("state","listening");monitor();return true;
    }catch(error){release();emit("error",error);emit("state","idle");return false}
  }
  function stop(process=true){if(!recorder||stopping)return false;stopping=true;cancelAnimationFrame(raf);raf=0;if(!process)speechStartedAt=0;try{recorder.stop()}catch(error){release();emit("error",error);emit("state","idle")}return true}
  function configure(next={}){handlers={...handlers,...next};return api}
  const api={available,configure,start,stop,get active(){return !!recorder},get stopping(){return stopping}};window.GSCServerVoiceCapture=api;
})();
