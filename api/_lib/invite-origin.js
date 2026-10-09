export function inviteOrigin(env=process.env){
  if(env.VERCEL_ENV==="preview"){
    const host=String(env.VERCEL_URL||"").trim();
    if(!/^[a-z0-9-]+\.vercel\.app$/i.test(host))throw Object.assign(new Error("PREVIEW_ORIGIN_NOT_CONFIGURED"),{code:"PREVIEW_ORIGIN_NOT_CONFIGURED",status:503});
    return `https://${host}`;
  }
  const lab=env.VERCEL_PROJECT_ID==="prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp"||env.GSC_ENVIRONMENT==="lab";
  if(lab)return "https://golf-sc-gt-lab.vercel.app";
  if(env.VERCEL_PROJECT_ID==="prj_d0fwQinspgOKpVKoKjmsJOaR2qr1")return "https://epg-caddy.vercel.app";
  return String(env.APP_PUBLIC_ORIGIN||"https://golf-sc-gt-lab.vercel.app").replace(/\/$/,"");
}
