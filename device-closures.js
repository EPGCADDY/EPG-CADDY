(function(root){
 'use strict';
 let last='',busy=false,queue=[],activeFinish=null,activeUtterance=null;
 const synth=root.speechSynthesis;
 function status(text){const el=root.document?.getElementById('deviceClosureStatus');if(el)el.textContent=text}
 function voice(){
  const voices=(synth?.getVoices()||[]).filter(v=>v.localService===true&&/^es(?:-|_)/i.test(v.lang));
  return voices.find(v=>/^es[-_](MX|GT|US|CO|AR|CL|PE)/i.test(v.lang))||voices[0]||null;
 }
 // Request the device's voice inventory before the first nine-hole closure.
 voice();
 function next(){
  if(busy||!queue.length)return;
  const item=queue.shift();busy=true;last=item.text;
  const chunks=[];let chunk='';
  for(const sentence of item.text.split(/(?<=[.!?])\s+/)){
   if(chunk&&chunk.length+sentence.length+1>180){chunks.push(chunk);chunk=''}
   chunk+=(chunk?' ':'')+sentence;
  }
  if(chunk)chunks.push(chunk);
  let chunkIndex=0;
  let settled=false,voiceTimer=null,startTimer=null,endTimer=null;
  function clean(){root.clearTimeout(voiceTimer);root.clearTimeout(startTimer);root.clearTimeout(endTimer);synth?.removeEventListener?.('voiceschanged',onVoices)}
  function finish(ok,message){if(settled)return;settled=true;clean();activeFinish=null;activeUtterance=null;busy=false;status(`${item.text} ${message||(ok?'Resultado anunciado.':'No se pudo reproducir. Toca el botón de la vuelta que deseas escuchar.')}`);item.resolve(ok);next()}
  activeFinish=()=>finish(false);
  function play(selected){
   if(settled)return;
   root.clearTimeout(voiceTimer);synth.removeEventListener?.('voiceschanged',onVoices);
   const utterance=new root.SpeechSynthesisUtterance(chunks[chunkIndex]);activeUtterance=utterance;
   utterance.voice=selected;utterance.lang=selected.lang;utterance.rate=1;utterance.volume=1;
   status(`${item.text} Preparando voz del dispositivo…`);
   startTimer=root.setTimeout(()=>{synth.cancel();finish(false,'La voz no inició. Toca el botón de la vuelta que deseas escuchar.');},8000);
   utterance.onstart=()=>{root.clearTimeout(startTimer);status(`${item.text} Leyendo resultado…`);endTimer=root.setTimeout(()=>{synth.cancel();finish(false)},120000)};
   utterance.onend=()=>{
    if(settled)return;
    root.clearTimeout(startTimer);root.clearTimeout(endTimer);
    chunkIndex++;
    if(chunkIndex<chunks.length){activeUtterance=null;play(selected)}else finish(true);
   };
   utterance.onerror=event=>finish(false,event?.error==='not-allowed'?'El navegador bloqueó el audio. Toca el botón de la vuelta que deseas escuchar.':undefined);
   try{if(synth.paused)synth.resume();synth.speak(utterance)}catch{finish(false)}
  }
  function onVoices(){const selected=voice();if(selected&&!activeUtterance)play(selected)}
  if(!synth||!root.SpeechSynthesisUtterance){finish(false,'Este navegador no ofrece voz del dispositivo.');return}
  const selected=voice();if(selected){play(selected);return}
  status(`${item.text} Cargando voces del dispositivo…`);
  synth.addEventListener?.('voiceschanged',onVoices);
  voiceTimer=root.setTimeout(()=>{const selected=voice();if(selected)play(selected);else finish(false,'No hay una voz local en español disponible en este navegador.');},2000);
 }
 function speak(text){const clean=String(text||'').trim();if(!clean)return Promise.resolve(false);return new Promise(resolve=>{queue.push({text:clean,resolve});next()})}
 function cancel(){for(const item of queue.splice(0))item.resolve(false);synth?.cancel();if(activeFinish)activeFinish(false)}
 function bindControls(){
  const bind=(id,kind,label)=>root.document?.getElementById(id)?.addEventListener('click',()=>{
    const text=typeof root.GSCRequestedClosureSpeech==='function'?root.GSCRequestedClosureSpeech(kind):'';
    if(text){cancel();speak(text)}else status(`${label}: todavía no hay resultados disponibles.`);
  });
  bind('deviceClosureFront','front','FRONT · 1 - 9');
  bind('deviceClosureBack','back','BACK · 10 - 18');
  bind('deviceClosureTotal','total','Total');
}
 root.GSCDeviceClosures={speak,cancel,bindControls};
})(typeof window!=='undefined'?window:globalThis);
