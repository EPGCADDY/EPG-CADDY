import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";

const ALLOWED_EVENTS=new Set(["connection_started","connection_ready","connection_interrupted","connection_failed","speech_started","speech_stopped","transcription_completed","tool_started","tool_ready","followup_created","followup_audio_started","response_stopped","input_recovered","response_recovered","tool_transport_recovered","browser_fallback_started","browser_fallback_transcript_ready","browser_fallback_query_failed"]);
const ALLOWED_TOOLS=new Set(["get_current_weather","get_live_traffic","search_live_web"]);

function boundedInteger(value,max){
  const number=Number(value);
  return Number.isFinite(number)?Math.max(0,Math.min(max,Math.round(number))):0;
}

export function sanitizeVoiceHealth(body={}){
  const event=String(body.event||"");
  if(!ALLOWED_EVENTS.has(event))return null;
  const tool=String(body.tool||"");
  return{
    event,
    build:String(body.build||"").replace(/[^A-Z0-9_-]/gi,"").slice(0,24),
    context:body.context==="setup"?"setup":"round",
    turn:boundedInteger(body.turn,10_000),
    elapsedMs:boundedInteger(body.elapsedMs,180_000),
    ...(ALLOWED_TOOLS.has(tool)?{tool}:{}),
    ...(typeof body.hasResponseId==="boolean"?{hasResponseId:body.hasResponseId}:{}),
    ...(typeof body.followupCreated==="boolean"?{followupCreated:body.followupCreated}:{}),
    ...(typeof body.followupAudioStarted==="boolean"?{followupAudioStarted:body.followupAudioStarted}:{})
  };
}

export default function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  }
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const event=sanitizeVoiceHealth(body);
    if(!event)return res.status(422).json({ok:false,error:"EVENT_NOT_ALLOWED"});
    console.info("voice-health",JSON.stringify(event));
    return res.status(202).json({ok:true});
  }catch{
    return res.status(400).json({ok:false,error:"INVALID_BODY"});
  }
}
