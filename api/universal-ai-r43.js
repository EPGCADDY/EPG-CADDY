import universalHandler,{summarizeUniversalResponse} from "./universal-ai.js";
import {resolveGatewayToken} from "./_lib/vercel-gateway-auth.js";

const MODELS=["openai/gpt-5.6-sol","anthropic/claude-opus-5","google/gemini-3.1-pro-preview"];

function captureResponse(){
  return {statusCode:200,headers:{},body:null,setHeader(k,v){this.headers[k]=v},status(n){this.statusCode=n;return this},json(v){this.body=v;return this},end(v){this.body=v;return this}};
}
function replay(out,cap){
  for(const [k,v] of Object.entries(cap.headers||{}))out.setHeader(k,v);
  return out.status(cap.statusCode||200).json(cap.body);
}
function cleanHistory(value){
  return Array.isArray(value)?value.slice(-40).flatMap(x=>{const role=x?.role==="assistant"?"assistant":x?.role==="user"?"user":"";const content=String(x?.content||"").trim().slice(0,2400);return role&&content?[{role,content}]:[]}):[];
}

export default async function handler(req,res){
  const cap=captureResponse();
  await universalHandler(req,cap);
  if(cap.statusCode!==502)return replay(res,cap);
  const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
  const query=String(body.query||"").trim().slice(0,4000);
  if(query.length<2)return replay(res,cap);
  const token=await resolveGatewayToken();
  if(!token)return replay(res,cap);
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
  try{
    const upstream=await fetch("https://ai-gateway.vercel.sh/v1/responses",{method:"POST",signal:controller.signal,headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({model:MODELS[0],providerOptions:{gateway:{models:MODELS,tags:["feature:ai-universal","env:preview","lab:r43-fallback"]}},store:false,reasoning:{effort:"low"},max_output_tokens:1400,instructions:"Eres AI UNIVERSAL ∞ dentro de EPG CADDY. Responde en el idioma del usuario de forma directa, precisa y útil. No inventes datos. Esta ruta es un fallback de continuidad después de una transcripción ya completada.",input:[...cleanHistory(body.history),{role:"user",content:query}]})});
    const payload=await upstream.json().catch(()=>null);
    if(!upstream.ok)return replay(res,cap);
    const summary=summarizeUniversalResponse(payload);
    if(!summary.ok)return replay(res,cap);
    res.setHeader("Cache-Control","no-store");
    res.setHeader("X-EPG-AI-Route","R43-GATEWAY-FALLBACK");
    return res.status(200).json({...summary,degraded:true,fallback:"VERCEL_AI_GATEWAY"});
  }catch(error){
    console.warn("r43 universal fallback",error?.name||"UNAVAILABLE");
    return replay(res,cap);
  }finally{clearTimeout(timeout)}
}
