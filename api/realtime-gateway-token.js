import {gateway} from "@ai-sdk/gateway";
import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";

const MODEL="openai/gpt-realtime-2.1";

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST")return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  try{
    const secret=await gateway.experimental_realtime.getToken({model:MODEL,expiresAfterSeconds:300});
    return res.status(200).json({ok:true,model:MODEL,token:secret.token,url:secret.url,expiresAt:secret.expiresAt||null});
  }catch(error){
    console.error("gateway-realtime-token",JSON.stringify({event:"failed",code:String(error?.statusCode||error?.name||"UNAVAILABLE").slice(0,80)}));
    return res.status(503).json({ok:false,error:"GATEWAY_REALTIME_UNAVAILABLE"});
  }
}
