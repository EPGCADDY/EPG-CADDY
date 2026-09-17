(function(root){
  'use strict';
  let context=null,active=null,generation=0;
  function prime(){
    try{
      const Constructor=root.AudioContext||root.webkitAudioContext;
      if(!Constructor)return false;
      if(!context||context.state==='closed')context=new Constructor();
      context.resume().catch(()=>{});return true;
    }catch{return false}
  }
  function stop(){generation++;active?.cancel();active=null}
  async function play(transport,{onStart=()=>{},onEnd=()=>{},onError=()=>{}}={}){
    stop();if(!context||context.state!=='running'){transport.cancel();throw new Error('AUDIO_CONTEXT_NOT_READY')}
    const sources=new Set();let stopped=false,done=false,started=false,tail=null,nextTime=context.currentTime,total=0;
    let settleStart;const start=new Promise(resolve=>{settleStart=resolve});
    const cancel=()=>{if(stopped)return;stopped=true;transport.cancel();for(const node of sources){node.onended=null;try{node.stop()}catch{}node.disconnect()}sources.clear();settleStart(false)};
    active={cancel};
    const finish=()=>{if(done&&!sources.size&&!stopped){stopped=true;active=null;transport.cancel();onEnd()}};
    void (async()=>{
      try{
        while(!stopped){
          const record=await transport.next();
          if(stopped)return;
          if(record.type==='audio_end'){
            if(tail!==null||!started)throw new Error('PCM_INCOMPLETE');done=true;finish();return;
          }
          if(record.type!=='audio_chunk'||typeof record.audio!=='string')throw new Error('PCM_STREAM_FAILED');
          let bytes=Uint8Array.from(atob(record.audio),c=>c.charCodeAt(0));
          total+=bytes.length;if(total>24000*2*300)throw new Error('PCM_TOO_LARGE');
          if(tail!==null){const joined=new Uint8Array(bytes.length+1);joined[0]=tail;joined.set(bytes,1);bytes=joined;tail=null}
          if(bytes.length%2){tail=bytes[bytes.length-1];bytes=bytes.subarray(0,bytes.length-1)}
          if(!bytes.length)continue;
          if(context.state!=='running')throw new Error('AUDIO_CONTEXT_INTERRUPTED');
          const audio=context.createBuffer(1,bytes.length/2,24000),samples=audio.getChannelData(0);
          const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
          for(let i=0;i<samples.length;i++)samples[i]=view.getInt16(i*2,true)/32768;
          const node=context.createBufferSource();node.buffer=audio;node.connect(context.destination);sources.add(node);
          node.onended=()=>{sources.delete(node);node.disconnect();finish()};
          nextTime=Math.max(nextTime,context.currentTime+.025);node.start(nextTime);nextTime+=audio.duration;
          if(!started){started=true;onStart();settleStart(true)}
        }
      }catch(error){if(!stopped){cancel();onError(error)}}
    })();
    return start;
  }
  root.GSCUniversalPcm={prime,play,stop,get generation(){return generation},get ready(){return context?.state==='running'}};
  root.document?.addEventListener('visibilitychange',()=>{if(root.document.hidden)stop()});
})(typeof window==='undefined'?globalThis:window);
