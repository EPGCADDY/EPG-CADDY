import {getVercelOidcToken} from "@vercel/oidc";

export async function resolveGatewayToken(explicitToken,options={}){
  if(explicitToken!==undefined)return String(explicitToken||"").trim();
  const env=options.env||process.env;
  const configured=String(env.AI_GATEWAY_API_KEY||env.VERCEL_OIDC_TOKEN||"").trim();
  if(configured)return configured;
  try{
    return String(await (options.oidcGetter||getVercelOidcToken)()||"").trim();
  }catch(error){
    console.warn("gateway oidc unavailable",JSON.stringify({code:String(error?.code||error?.name||"UNAVAILABLE").replace(/[^a-zA-Z0-9_.-]/g,"").slice(0,80)||"UNAVAILABLE"}));
    return "";
  }
}
