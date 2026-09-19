(function(root){
 'use strict';
 let last='',busy=false,queue=[],activeFinish=null;
 function status(text){const el=root.document?.getElementById('deviceClosureStatus');if(el)el.textContent=text}
 function voice(){return root.speechSynthesis?.getVoices().find(v=>v.localService&&/^es(?:-|_)/i.test(v.lang))||null}
 function next(){
  if(busy||!queue.length)return;
  const item=queue.shift();
  last=item.text;
  const selected=voice();
  if(!selected||!root.SpeechSynthesisUtterance){status('Para los anuncios, activa una voz española del dispositivo.');item.resolve(false);next();return}
  busy=true;last=item.text;
  const utterance=new root.SpeechSynthesisUtterance(item.text);utterance.voice=selected;utterance.lang=selected.lang;utterance.rate=1;
  let settled=false;
  const timer=root.setTimeout(()=>{root.speechSynthesis.cancel();finish(false)},60000);
  function finish(ok){if(settled)return;settled=true;root.clearTimeout(timer);activeFinish=null;busy=false;status(ok?'Resultado anunciado':'No se pudo anunciar. Puedes tocar REPETIR RESULTADO.');item.resolve(ok);next()}
  activeFinish=finish;
  utterance.onend=()=>finish(true);utterance.onerror=()=>finish(false);
  try{root.speechSynthesis.speak(utterance)}catch{finish(false)}
 }
 function speak(text){const clean=String(text||'').trim();if(!clean)return Promise.resolve(false);return new Promise(resolve=>{queue.push({text:clean,resolve});next()})}
 function cancel(){for(const item of queue.splice(0))item.resolve(false);root.speechSynthesis?.cancel();if(activeFinish)activeFinish(false)}
 function bindControls(){root.document?.getElementById('deviceClosureRepeat')?.addEventListener('click',()=>{if(last)speak(last);else status('Todavía no hay un cierre para repetir.')});}
 root.GSCDeviceClosures={speak,cancel,bindControls};
})(typeof window!=='undefined'?window:globalThis);
