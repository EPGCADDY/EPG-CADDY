import {handleAppPreflight,isAllowedAppOrigin} from "./_lib/cors.js";
import {computeTrafficRoute} from "./_lib/traffic.js";

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(!isAllowedAppOrigin(req))return res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  }
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const result=await computeTrafficRoute({...body,contextCoordinates:body.contextCoordinates||body.originCoordinates});
    const status=result.ok?200:["TRAFFIC_ORIGIN_REQUIRED","TRAFFIC_DESTINATION_REQUIRED"].includes(result.error)?422:result.error==="TRAFFIC_NOT_CONFIGURED"?503:200;
    return res.status(status).json(result);
  }catch{
    return res.status(200).json({ok:false,error:"TRAFFIC_UNAVAILABLE",message:"No pude consultar tráfico confiable en este momento. Puedes continuar con otra pregunta."});
  }
}
