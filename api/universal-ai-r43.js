import originalHandler,{sanitizeUniversalHistory} from "./universal-ai.js";
import {resolveGatewayToken} from "./_lib/vercel-gateway-auth.js";

const GATEWAY_MODELS=["openai/gpt-5.6-sol","anthropic/claude-opus-5","google/gemini-3.1-pro-preview"];
const AI_FAILURES=new Set(["UNIVERSAL_AI_UNAVAILABLE","UNIVERSAL_AI_RATE_LIMITED","UNIVERSAL_AI_CREDIT_EXHAUSTED","EMPTY_UNIVERSAL_RESPONSE"]);
const FALLBACK_TIMEOUT_MS=12_000;

function responseText(payload){
  return(payload?.output||[])
    .filter(item=>item?.type==="message")
    .flatMap(item=>item.content||[])
    .filter(item=>item?.type==="output_text")
    .map(item=>String(item.text||"").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function captureResponse(){
  return{
    headers:new Map(),
    statusCode:200,
    body:undefined,
    setHeader(name,value){this.headers.set(String(name).toLowerCase(),value);return this},
    status(code){this.statusCode=Number(code)||200;return this},
    json(value){this.body=value;return this},
    end(value){this.body=value;return this},
    send(value){this.body=value;return this}
  };
}

function forwardCaptured(res,captured){
  for(const [name,value] of captured.headers){
    if(name!=="content-length")res.setHeader(name,value);
  }
  return res.status(captured.statusCode||200).json(captured.body);
}

async function gatewayFallback(req,res,captured){
  const token=await resolveGatewayToken();
  if(!token){
    console.warn("universal r43 fallback",JSON.stringify({result:"NO_GATEWAY_TOKEN",originalStatus:captured.statusCode,error:captured.body?.error||null}));
    return forwardCaptured(res,captured);
  }
  const body=typeof req.body==="string"?JSON.parse(req.body||"{}"):req.body||{};
  const query=String(body.query||"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").trim().slice(0,4000);
  const history=sanitizeUniversalHistory(body.history);
  const responseMode=body.responseMode==="voice"?"voice":"text";
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),FALLBACK_TIMEOUT_MS);
  try{
    const upstream=await fetch("https://ai-gateway.vercel.sh/v1/responses",{
      method:"POST",
      signal:controller.signal,
      headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
      body:JSON.stringify({
        model:GATEWAY_MODELS[0],
        providerOptions:{gateway:{models:GATEWAY_MODELS,tags:["feature:ai-universal-r43","env:lab"]}},
        store:false,
        max_output_tokens:responseMode==="voice"?900:1400,
        instructions:[
          "Eres AI UNIVERSAL dentro de EPG CADDY.",
          "Responde directamente en el idioma del usuario, con prioridad al español latinoamericano.",
          "Conserva el contexto recibido y no inventes datos.",
          "Si la consulta requiere información en tiempo real y no dispones de una herramienta confiable, indícalo claramente en vez de fabricar una respuesta.",
          responseMode==="voice"?"La respuesta será escuchada: usa texto natural sin Markdown y evita URLs.":"Responde con texto claro y conciso; evita URLs salvo necesidad estricta."
        ].join(" "),
        input:[...history,{role:"user",content:query}]
      })
    });
    const payload=await upstream.json().catch(()=>null);
    const answer=responseText(payload);
    if(upstream.ok&&answer){
      console.info("universal r43 fallback",JSON.stringify({result:"RECOVERED",status:upstream.status||200,model:String(payload?.model||GATEWAY_MODELS[0]),originalStatus:captured.statusCode,originalError:captured.body?.error||null}));
      res.setHeader("Cache-Control","no-store");
      res.setHeader("X-EPG-AI-Fallback","R43");
      return res.status(200).json({ok:true,answer,sources:[],degraded:true,mode:"GATEWAY_R43",model:String(payload?.model||GATEWAY_MODELS[0])});
    }
    console.warn("universal r43 fallback",JSON.stringify({result:"GATEWAY_FAILED",status:upstream.status||0,originalStatus:captured.statusCode,originalError:captured.body?.error||null}));
    return forwardCaptured(res,captured);
  }catch(error){
    console.warn("universal r43 fallback",JSON.stringify({result:error?.name==="AbortError"?"TIMEOUT":"NETWORK",originalStatus:captured.statusCode,originalError:captured.body?.error||null}));
    return forwardCaptured(res,captured);
  }finally{
    clearTimeout(timeout);
  }
}

export default async function handler(req,res){
  const captured=captureResponse();
  await originalHandler(req,captured);
  const error=String(captured.body?.error||"");
  const shouldFallback=(captured.statusCode===502||captured.statusCode===503)&&AI_FAILURES.has(error);
  if(!shouldFallback)return forwardCaptured(res,captured);
  return gatewayFallback(req,res,captured);
}
