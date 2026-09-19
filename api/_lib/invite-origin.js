export function inviteOrigin(env=process.env){
  if(env.VERCEL_ENV==="preview"){
    const host=String(env.VERCEL_URL||"").trim();
    if(!/^[a-z0-9-]+\.vercel\.app$/i.test(host))throw Object.assign(new Error("PREVIEW_ORIGIN_NOT_CONFIGURED"),{code:"PREVIEW_ORIGIN_NOT_CONFIGURED",status:503});
    return `https://${host}`;
  }
  return String(env.APP_PUBLIC_ORIGIN||"https://golf-sc-gt-lab.vercel.app").replace(/\/$/,"");
}
