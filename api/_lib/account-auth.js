const DEFAULT_NEON_AUTH_URL="https://ep-dawn-hall-av9jmqel.neonauth.c-11.us-east-1.aws.neon.tech/neondb/auth";

export function neonAuthUrl(){
  return String(process.env.NEON_AUTH_URL||DEFAULT_NEON_AUTH_URL).replace(/\/$/,"");
}

export async function neonAuthRequest(path,{method="GET",cookie="",body=null}={}){
  const base=neonAuthUrl();
  const headers={Accept:"application/json",Origin:new URL(base).origin};
  if(cookie)headers.Cookie=String(cookie);
  if(body!==null)headers["Content-Type"]="application/json";
  return fetch(`${base}${path}`,{
    method,
    headers,
    redirect:"manual",
    cache:"no-store",
    body:body===null?undefined:JSON.stringify(body)
  });
}

export async function requireAccountSession(req){
  let response;
  try{response=await neonAuthRequest("/get-session",{cookie:req.headers.cookie||""})}
  catch{throw Object.assign(new Error("ACCOUNT_AUTH_UNAVAILABLE"),{code:"ACCOUNT_AUTH_UNAVAILABLE"})}
  if(!response.ok)throw Object.assign(new Error("ACCOUNT_UNAUTHORIZED"),{code:"ACCOUNT_UNAUTHORIZED"});
  const raw=await response.json().catch(()=>null),data=raw?.data||raw,user=data?.user,session=data?.session;
  const id=String(user?.id||session?.userId||"").trim();
  if(!id)throw Object.assign(new Error("ACCOUNT_UNAUTHORIZED"),{code:"ACCOUNT_UNAUTHORIZED"});
  return{id,email:String(user?.email||"").trim().toLowerCase(),name:String(user?.name||"").trim()};
}

export function authCookies(response){
  const values=typeof response?.headers?.getSetCookie==="function"?response.headers.getSetCookie():[];
  if(values.length)return values;
  const combined=response?.headers?.get?.("set-cookie");
  return combined?combined.split(/,(?=\s*[^;,=]+=[^;,]+)/g):[];
}

export function sameOriginAuthCookie(value,{native=false}={}){
  const parts=String(value||"").split(";").map(part=>part.trim()).filter(Boolean);
  if(!parts.length)return"";
  const retained=parts.slice(1).filter(part=>!/^(domain|path|samesite)=/i.test(part)&&!/^secure$/i.test(part)&&!/^httponly$/i.test(part));
  return[parts[0],...retained,"Path=/","HttpOnly","Secure",`SameSite=${native?"None":"Lax"}`].join("; ");
}
