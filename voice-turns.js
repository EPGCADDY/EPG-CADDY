(function(root){
  'use strict';
  // One capture and one HTTP transcription per press. Never restart automatically.
  function createController(deps){
    let current=null,sequence=0;
    const state=(turn,value,message)=>{if(current===turn)deps.state(value,message,turn.context)};
    const stopTracks=turn=>{for(const track of turn.stream?.getTracks()||[])track.stop();turn.stream=null};
    const cancel=()=>{
      const turn=current;if(!turn)return;
      current=null;clearTimeout(turn.timer);turn.abort.abort();
      if(turn.recorder){turn.recorder.onstop=null;turn.recorder.onerror=null;turn.recorder.ondataavailable=null;try{if(turn.recorder.state!=='inactive')turn.recorder.stop()}catch{}}
      stopTracks(turn);deps.busy?.(false);deps.cancel?.();deps.state('idle','MANTÉN PRESIONADO PARA HABLAR',turn.context);
    };
    async function send(turn){
      clearTimeout(turn.timer);stopTracks(turn);
      if(current!==turn)return;
      const blob=new Blob(turn.chunks,{type:turn.recorder.mimeType});turn.chunks=[];
      if(blob.size<512||(turn.stoppedAt??Date.now())-turn.started<250){state(turn,'error','GRABACIÓN MUY CORTA · MANTÉN PRESIONADO PARA HABLAR');current=null;deps.busy?.(false);return}
      if(blob.size>3_000_000){state(turn,'error','GRABACIÓN DEMASIADO GRANDE · HAZ UNA PREGUNTA MÁS CORTA');current=null;deps.busy?.(false);return}
      state(turn,'responding','TRANSCRIBIENDO');
      turn.timer=setTimeout(()=>{if(current===turn){turn.abort.abort();state(turn,'error','NO SE PUDO TRANSCRIBIR · VUELVE A PRESIONAR');current=null;deps.busy?.(false)}},35000);
      try{
        const text=await deps.transcribe(blob,turn.id,turn.abort.signal);
        if(current!==turn)return;
        clearTimeout(turn.timer);
        if(!String(text||'').trim())throw Error('NO_TRANSCRIPT');
        state(turn,'responding','PREPARANDO RESPUESTA');
        await deps.dispatch(turn.context,text,turn.id);
        if(current===turn){current=null;deps.busy?.(false)};
      }catch(error){if(current===turn){state(turn,'error',error?.message==='ACCESS_REQUIRED'?'SESIÓN VENCIDA · VUELVE A ENTRAR':'NO SE PUDO COMPLETAR LA PREGUNTA · VUELVE A PRESIONAR');current=null;deps.busy?.(false)}}
      finally{clearTimeout(turn.timer);stopTracks(turn)}
    }
    async function press(context){
      if(current)return false;
      const turn={id:`ptt_${Date.now()}_${++sequence}`,context,held:true,abort:new AbortController(),chunks:[],stream:null,recorder:null,timer:null,started:0};current=turn;
      try{
        deps.prepare(context);state(turn,'idle','PERMITE EL MICRÓFONO Y MANTÉN PRESIONADO');
        const stream=await deps.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
        if(current!==turn||!turn.held){for(const track of stream.getTracks())track.stop();return false}
        turn.stream=stream;
        const type=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(value=>deps.Recorder.isTypeSupported(value));
        turn.recorder=type?new deps.Recorder(stream,{mimeType:type,audioBitsPerSecond:64000}):new deps.Recorder(stream);
        turn.recorder.ondataavailable=event=>{if(current===turn&&event.data?.size)turn.chunks.push(event.data)};
        turn.recorder.onstop=()=>void send(turn);
        turn.recorder.onerror=()=>{if(current===turn){cancel();deps.state('error','NO SE PUDO GRABAR · VUELVE A PRESIONAR',context)}};
        for(const track of stream.getAudioTracks())track.onended=()=>{if(current===turn&&turn.held){cancel();deps.state('error','GRABACIÓN INTERRUMPIDA · VUELVE A PRESIONAR',context)}};
        turn.started=Date.now();turn.recorder.start();state(turn,'listening','ESCUCHANDO · SUELTA PARA ENVIAR');
        turn.timer=setTimeout(()=>release(),60000);return true;
      }catch(error){if(current===turn){cancel();deps.state('error',error?.name==='NotAllowedError'?'PERMITE EL MICRÓFONO PARA GRABAR':'MICRÓFONO NO DISPONIBLE',context)}return false}
    }
    function release(){
      const turn=current;if(!turn||!turn.held)return false;turn.held=false;
      if(!turn.recorder){cancel();return false}
      turn.stoppedAt=Date.now();clearTimeout(turn.timer);deps.busy?.(true);state(turn,'responding','ENVIANDO GRABACIÓN');
      turn.timer=setTimeout(()=>{if(current===turn){cancel();deps.state('error','NO SE PUDO CERRAR LA GRABACIÓN · VUELVE A PRESIONAR',turn.context)}},5000);
      try{turn.recorder.stop()}catch{cancel();return false}
      stopTracks(turn);return true;
    }
    return {press,release,cancel,isBusy:()=>!!current};
  }
  function install(adapters){
    const controller=createController({...adapters,busy:on=>{for(const button of document.querySelectorAll('#setupMic,#headerMic,#listenAiUniversal,#openAiUniversal')){button.disabled=on;button.setAttribute('aria-disabled',String(on))}},Recorder:root.MediaRecorder,getUserMedia:constraints=>navigator.mediaDevices.getUserMedia(constraints),
      transcribe:async(blob,turnId,signal)=>{
        const bytes=new Uint8Array(await blob.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
        const response=await fetch(root.gscgApiUrl('/api/voice-transcribe'),{method:'POST',credentials:'include',signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({audio:btoa(binary),mediaType:blob.type,turnId})});
        if(response.status===401)throw Error('ACCESS_REQUIRED');
        const result=await response.json();if(!response.ok||!result.ok)throw Error('TRANSCRIPTION_FAILED');return result.text;
      }});
    const selector='#setupMicWrap,#headerMicWrap,#listenAiUniversal,#openAiUniversal';
    let heldId=null;
    const target=event=>event.target?.closest?.(selector);
    const context=element=>element.id==='setupMicWrap'?'setup':element.id==='headerMicWrap'?'round':adapters.context();
    document.addEventListener('pointerdown',event=>{const element=target(event);if(!element||event.button!==0)return;event.preventDefault();event.stopImmediatePropagation();if(heldId!==null||controller.isBusy())return;heldId=event.pointerId;element.setPointerCapture?.(event.pointerId);void controller.press(context(element))},true);
    document.addEventListener('pointerup',event=>{if(event.pointerId!==heldId)return;event.preventDefault();event.stopImmediatePropagation();heldId=null;controller.release()},true);
    document.addEventListener('pointercancel',event=>{if(event.pointerId!==heldId)return;heldId=null;controller.cancel()},true);
    document.addEventListener('lostpointercapture',event=>{if(event.pointerId!==heldId)return;heldId=null;controller.cancel()},true);
    document.addEventListener('click',event=>{if(target(event)){event.preventDefault();event.stopImmediatePropagation()}},true);
    document.addEventListener('contextmenu',event=>{if(target(event))event.preventDefault()},true);
    document.addEventListener('keydown',event=>{if(!target(event)||![' ','Enter'].includes(event.key))return;event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)void controller.press(context(target(event)))},true);
    document.addEventListener('keyup',event=>{if(target(event)&&[' ','Enter'].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();controller.release()}},true);
    const cancel=()=>{heldId=null;controller.cancel()};
    root.addEventListener('pagehide',cancel);root.addEventListener('blur',cancel);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel()});
    document.getElementById('stopAiUniversal')?.addEventListener('click',cancel,true);
    for(const element of document.querySelectorAll(selector)){
      element.style.touchAction='none';element.style.webkitUserSelect='none';element.style.webkitTouchCallout='none';
      const button=element.matches('button')?element:element.querySelector('button');
      button?.setAttribute('aria-label','Mantén presionado para hablar; suelta para enviar');
      if(element.id==='listenAiUniversal')element.textContent='MANTÉN PARA HABLAR';
    }
    return controller;
  }
  root.GSCVoiceTurns={enabled:true,createController,install};
})(typeof window!=='undefined'?window:globalThis);
