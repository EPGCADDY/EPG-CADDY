const NATIVE_ORIGINS=new Set(["capacitor://localhost","ionic://localhost","http://localhost","https://localhost"]);

export function requestOrigin(req){return String(req?.headers?.origin||"").replace(/\/$/,"")}

export function isNativeAppOrigin(req){return NATIVE_ORIGINS.has(requestOrigin(req))}

export function isSameAppOrigin(req){
  const origin=requestOrigin(req);if(!origin)return !process.env.VERCEL||process.env.GSCG_TEST_MODE==="1";
  try{const forwarded=String(req.headers["x-forwarded-host"]||req.headers.host||"").split(",")[0].trim(),url=new URL(origin);return ["https:","http:"].includes(url.protocol)&&url.host===forwarded}
  catch{return false}
}

export function isAllowedAppOrigin(req){return isSameAppOrigin(req)||isNativeAppOrigin(req)}

export function applyAppCors(req,res){
  const origin=requestOrigin(req);if(!NATIVE_ORIGINS.has(origin))return false;
  res.setHeader("Access-Control-Allow-Origin",origin);
  res.setHeader("Access-Control-Allow-Credentials","true");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization, X-GSCG-Context, X-GSCG-Players");
  res.setHeader("Access-Control-Max-Age","86400");
  res.setHeader("Vary","Origin");
  return true;
}

export function handleAppPreflight(req,res){
  if(req.method!=="OPTIONS")return false;
  if(!isAllowedAppOrigin(req)){res.status(403).json({ok:false,error:"ORIGIN_NOT_ALLOWED"});return true}
  applyAppCors(req,res);
  res.status(204).end();return true;
}
