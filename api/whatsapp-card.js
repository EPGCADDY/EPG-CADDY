import { requireAccountSession } from "./_lib/account-auth.js";
import { noStore, readJson } from "./_lib/http.js";

const digits=value=>String(value||"").replace(/\D/g,"");
const clean=(value,max=160)=>String(value||"").trim().replace(/\s+/g," ").slice(0,max);

async function graphRequest(path,options={}){
  const token=process.env.WHATSAPP_CLOUD_ACCESS_TOKEN,version=process.env.WHATSAPP_GRAPH_VERSION||"v23.0";
  const response=await fetch(`https://graph.facebook.com/${version}/${path}`,{...options,headers:{Authorization:`Bearer ${token}`,...options.headers}});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok)throw Object.assign(new Error(payload?.error?.message||"WHATSAPP_UPSTREAM_ERROR"),{status:502,code:payload?.error?.code||"WHATSAPP_UPSTREAM_ERROR"});
  return payload;
}

export default async function handler(req,res){
  noStore(res);
  if(req.method!=="POST")return res.status(405).json({ok:false,error:"METHOD_NOT_ALLOWED"});
  try{
    await requireAccountSession(req);
    const phoneId=clean(process.env.WHATSAPP_PHONE_NUMBER_ID,80),token=process.env.WHATSAPP_CLOUD_ACCESS_TOKEN;
    if(!phoneId||!token)return res.status(503).json({ok:false,error:"WHATSAPP_NOT_CONFIGURED"});
    const body=await readJson(req,6_000_000),to=digits(body?.to),imageBase64=String(body?.imageBase64||"");
    if(to.length<7||to.length>15)return res.status(400).json({ok:false,error:"WHATSAPP_INVALID_DESTINATION"});
    if(!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(imageBase64)||imageBase64.length>5_500_000)return res.status(400).json({ok:false,error:"WHATSAPP_INVALID_CARD"});
    const bytes=Buffer.from(imageBase64.split(",")[1],"base64"),form=new FormData();
    form.append("messaging_product","whatsapp");form.append("type","image/png");form.append("file",new Blob([bytes],{type:"image/png"}),clean(body?.filename,120)||"tarjeta-digital-final.png");
    const uploaded=await graphRequest(`${phoneId}/media`,{method:"POST",body:form});
    const sent=await graphRequest(`${phoneId}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",recipient_type:"individual",to,type:"image",image:{id:uploaded.id,caption:clean(body?.caption,900)}})});
    return res.status(200).json({ok:true,messageId:sent?.messages?.[0]?.id||null,playerId:clean(body?.playerId,80),roundId:clean(body?.roundId,160),cardVersion:Number(body?.cardVersion)||1});
  }catch(error){
    const status=Number(error?.status)||500;
    return res.status(status).json({ok:false,error:clean(error?.code||error?.message||"WHATSAPP_SEND_FAILED",160)});
  }
}
