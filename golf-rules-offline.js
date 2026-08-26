(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCGolfRulesOffline=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const STORAGE_KEY="gscg-official-golf-rules-cache-v1";
  const MAX_ENTRIES=24;
  const MAX_AGE_MS=90*24*60*60*1000;
  const OFFICIAL_DOMAINS=["usga.org","randa.org"];
  const STOP_WORDS=new Set(["a","al","algo","como","con","cual","cuando","de","del","donde","el","ella","en","es","esta","este","la","las","lo","los","me","mi","para","por","puedo","que","se","si","sin","su","un","una","y"]);

  function officialUrl(value){
    try{
      const url=new URL(String(value||""));
      if(url.protocol!=="https:")return false;
      const host=url.hostname.toLowerCase().replace(/^www\./,"");
      return OFFICIAL_DOMAINS.some(domain=>host===domain||host.endsWith(`.${domain}`));
    }catch{return false}
  }

  function tokens(value){
    return[...new Set(String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(/\s+/).filter(token=>token.length>2&&!STOP_WORDS.has(token)))].slice(0,36);
  }

  function safeRead(storage){
    try{
      const value=JSON.parse(storage?.getItem?.(STORAGE_KEY)||"[]");
      return Array.isArray(value)?value:[];
    }catch{return[]}
  }

  function safeWrite(storage,entries){
    try{storage?.setItem?.(STORAGE_KEY,JSON.stringify(entries.slice(0,MAX_ENTRIES)));return true}catch{return false}
  }

  function modeKey(context){return String(context?.mode||"").trim().toLowerCase().slice(0,40)}

  function sanitizeResult(result){
    if(!result?.ok||result?.scoreChanged!==false)return null;
    const answer=String(result.answer||"").trim().slice(0,6000);
    const sources=Array.isArray(result.sources)?result.sources.filter(source=>officialUrl(source?.url)).slice(0,6).map(source=>({title:String(source.title||"Fuente oficial USGA / The R&A").slice(0,120),url:String(source.url)})):[];
    if(answer.length<20||!sources.length)return null;
    return{answer,sources,authority:"USGA / The R&A",edition:String(result.edition||"Rules of Golf 2023").slice(0,80),clarificationsUpdated:String(result.clarificationsUpdated||"").slice(0,20),scoreChanged:false};
  }

  function save(storage,query,result,context={},now=Date.now()){
    const queryTokens=tokens(query),clean=sanitizeResult(result);
    if(queryTokens.length<2||!clean)return false;
    const entry={tokens:queryTokens,mode:modeKey(context),savedAt:new Date(now).toISOString(),...clean};
    const signature=`${entry.mode}|${entry.tokens.join("|")}`;
    const current=safeRead(storage).filter(item=>`${item?.mode||""}|${Array.isArray(item?.tokens)?item.tokens.join("|"):""}`!==signature);
    return safeWrite(storage,[entry,...current]);
  }

  function similarity(left,right){
    const a=new Set(left),b=new Set(right),shared=[...a].filter(token=>b.has(token)).length;
    if(shared<2)return 0;
    return shared/Math.min(a.size,b.size);
  }

  function find(storage,query,context={},now=Date.now()){
    const queryTokens=tokens(query),wantedMode=modeKey(context);
    if(queryTokens.length<2)return null;
    const current=safeRead(storage),fresh=current.filter(item=>{
      const saved=Date.parse(String(item?.savedAt||""));
      return Number.isFinite(saved)&&now-saved>=0&&now-saved<=MAX_AGE_MS&&sanitizeResult({ok:true,...item})
    });
    if(fresh.length!==current.length)safeWrite(storage,fresh);
    let best=null,bestScore=0;
    for(const item of fresh){
      const itemMode=String(item.mode||"");
      if(wantedMode&&itemMode&&wantedMode!==itemMode)continue;
      const score=similarity(queryTokens,Array.isArray(item.tokens)?item.tokens:[]);
      if(score>bestScore){best=item;bestScore=score}
    }
    if(!best||bestScore<0.6)return null;
    const clean=sanitizeResult({ok:true,...best});
    return clean?{ok:true,...clean,savedAt:best.savedAt,offline:true,matchConfidence:Number(bestScore.toFixed(2))}:null;
  }

  return{STORAGE_KEY,MAX_ENTRIES,MAX_AGE_MS,officialUrl,tokens,save,find};
});
