// Read Responses SSE without exposing provisional text to the client.
export async function readUniversalProviderResponse(response,onTextDelta){
  if(!response.ok||typeof onTextDelta!=="function"||!String(response.headers?.get?.("content-type")||"").includes("text/event-stream"))return response.json().catch(()=>null);
  const reader=response.body.getReader(),decoder=new TextDecoder();let buffer="";
  try{
    while(true){
      const part=await reader.read();buffer+=decoder.decode(part.value,{stream:!part.done});
      if(buffer.length>2_000_000)throw new Error("UNIVERSAL_STREAM_TOO_LARGE");
      let boundary;
      while((boundary=/\r?\n\r?\n/.exec(buffer))){
        const record=buffer.slice(0,boundary.index);buffer=buffer.slice(boundary.index+boundary[0].length);
        const data=record.split(/\r?\n/).filter(line=>line.startsWith("data:")).map(line=>line.slice(5).trimStart()).join("\n");
        if(!data||data==="[DONE]")continue;
        const event=JSON.parse(data);
        if(event.type==="response.output_text.delta"&&typeof event.delta==="string")onTextDelta(event.delta);
        if(event.type==="response.completed"&&event.response)return event.response;
        if(["response.failed","response.incomplete","error"].includes(event.type))throw new Error("UNIVERSAL_STREAM_FAILED");
      }
      if(part.done)throw new Error("UNIVERSAL_STREAM_INCOMPLETE");
    }
  }finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
}

// Same first-fragment boundaries as the approved browser splitter.
export function firstUniversalSpeechChunk(text){
  if(text.length<260)return text;
  for(const match of text.matchAll(/[.!?]["”»]?\s+/g)){
    const end=match.index+match[0].trimEnd().length;
    if(end<70)continue;
    if(end>240||text.length-end<60)break;
    return text.slice(0,end);
  }
  let end=0;
  for(const match of text.slice(0,241).matchAll(/[,;:]\s+/g)){const boundary=match.index+1;if(boundary>=70)end=boundary}
  if(!end)end=text.lastIndexOf(" ",240);
  if(end>0)return text.slice(0,end);
  if(text.length<=3500)return text;
  const boundary=text.lastIndexOf(" ",3500);
  return text.slice(0,boundary>0?boundary:3500);
}
