(function(root,factory){'use strict';const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.GSCDirectoryAutoRefresh=api})(typeof globalThis!=='undefined'?globalThis:this,function(root){'use strict';
 function create({refresh,onState=()=>{},delay=60000,timeout=8000,quotaDelay=300000}){
  let running=false,timer=null,busy=false,controller=null,lastUpdated=null,pending=false,nextDelay=delay;
  const visible=()=>root.document?.visibilityState!=='hidden';
  const schedule=()=>{root.clearTimeout(timer);timer=null;if(running&&visible())timer=root.setTimeout(tick,nextDelay)};
  async function tick(){
   if(!running||!visible()||busy)return;
   if(root.navigator?.onLine===false){nextDelay=delay;onState({ok:false,lastUpdated});schedule();return}
   busy=true;controller=new root.AbortController();const active=controller;let deadline;
   try{
    const expired=new Promise(resolve=>{deadline=root.setTimeout(()=>{active.abort();resolve({ok:false})},timeout)});
    const result=await Promise.race([Promise.resolve().then(()=>refresh(active.signal)),expired]);
    if(running&&visible()){const ok=!!result?.ok;if(ok)lastUpdated=new Date().toISOString();nextDelay=result?.code==='DATABASE_QUOTA_EXCEEDED'?quotaDelay:delay;onState({ok,lastUpdated,partial:!!result?.partial,code:result?.code})}
   }catch{nextDelay=delay;if(running&&visible())onState({ok:false,lastUpdated})}
   finally{root.clearTimeout(deadline);controller=null;busy=false;if(pending&&running&&visible()){pending=false;void tick()}else schedule()}
  }
  function resume(){if(!running||!visible())return;root.clearTimeout(timer);timer=null;if(busy){pending=true;return}void tick()}
  function visibility(){if(visible())resume();else{root.clearTimeout(timer);timer=null;controller?.abort()}}
  function pause(){root.clearTimeout(timer);timer=null;controller?.abort()}
  function start({immediate=true}={}){if(running)return;running=true;root.document?.addEventListener('visibilitychange',visibility);for(const name of ['online','focus','pageshow'])root.addEventListener?.(name,resume);root.addEventListener?.('pagehide',pause);if(immediate)resume();else schedule()}
  function stop(){running=false;pending=false;pause();root.document?.removeEventListener('visibilitychange',visibility);for(const name of ['online','focus','pageshow'])root.removeEventListener?.(name,resume);root.removeEventListener?.('pagehide',pause)}
  return{start,stop,refresh:resume};
 }
 return{create};
});
