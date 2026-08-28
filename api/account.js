import { authCookies, neonAuthRequest, sameOriginAuthCookie } from "./_lib/account-auth.js";
import { handleAppPreflight, isNativeAppOrigin } from "./_lib/cors.js";
import { noStore, readJson } from "./_lib/http.js";
import { guardAppRequest } from "./_lib/api-guard.js";

const ACTIONS={
  session:{method:"GET",path:"/get-session"},
  signup:{method:"POST",path:"/sign-up/email"},
  signin:{method:"POST",path:"/sign-in/email"},
  signout:{method:"POST",path:"/sign-out"}
};

function credentials(value,signup=false){
  const email=String(value?.email||"").trim().toLowerCase(),password=String(value?.password||"");
  if(!/^\S+@\S+\.\S+$/.test(email))throw Object.assign(new Error("EMAIL_INVALID"),{code:"EMAIL_INVALID"});
  if(password.length<8||password.length>128)throw Object.assign(new Error("PASSWORD_INVALID"),{code:"PASSWORD_INVALID"});
  return signup?{name:String(value?.name||email.split("@")[0]).trim().slice(0,80)||"Jugador",email,password}:{email,password};
}

export default async function handler(req,res){
  noStore(res);
  if(handleAppPreflight(req,res))return;
  const action=String(req.query?.action||"").toLowerCase(),route=ACTIONS[action];
  if(!route||req.method!==route.method){res.setHeader("Allow",route?.method||"GET, POST");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"})}
  try{
    if(req.method!=="GET"&&!(await guardAppRequest(req,res,{scope:`account-${action}`,maximum:action==="signout"?30:10})))return;
    let body=null;
    if(action==="signup"||action==="signin")body=credentials(await readJson(req,32_000),action==="signup");
    else if(action==="signout")body={};
    const upstream=await neonAuthRequest(route.path,{method:route.method,cookie:req.headers.cookie||"",body});
    const native=isNativeAppOrigin(req),cookies=authCookies(upstream).map(value=>sameOriginAuthCookie(value,{native})).filter(Boolean);if(cookies.length)res.setHeader("Set-Cookie",cookies);
    const raw=await upstream.json().catch(()=>({})),data=raw?.data||raw;
    if(!upstream.ok)return res.status(upstream.status).json({ok:false,code:String(data?.code||"ACCOUNT_REQUEST_FAILED"),message:String(data?.message||"")});
    return res.status(200).json({ok:true,user:data?.user||null,session:data?.session||null});
  }catch(error){
    const code=String(error?.code||"ACCOUNT_REQUEST_FAILED"),status=["EMAIL_INVALID","PASSWORD_INVALID","EMPTY_BODY","INVALID_JSON"].includes(code)?400:503;
    return res.status(status).json({ok:false,code});
  }
}
