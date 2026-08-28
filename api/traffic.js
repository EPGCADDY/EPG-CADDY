import {handleAppPreflight} from "./_lib/cors.js";
import {computeTrafficRoute} from "./_lib/traffic.js";
import {guardAppRequest} from "./_lib/api-guard.js";

export default async function handler(req,res){
  if(handleAppPreflight(req,res))return;
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  }
  if(!(await guardAppRequest(req,res,{scope:"traffic",maximum:30})))return;
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
    const result=await computeTrafficRoute(body);
    const status=result.ok?200:["TRAFFIC_ORIGIN_REQUIRED","TRAFFIC_DESTINATION_REQUIRED"].includes(result.error)?422:result.error==="TRAFFIC_NOT_CONFIGURED"?503:200;
    return res.status(status).json(result);
  }catch{
    return res.status(200).json({ok:false,error:"TRAFFIC_UNAVAILABLE",message:"No pude consultar tráfico confiable en este momento. Puedes continuar con otra pregunta."});
  }
}
