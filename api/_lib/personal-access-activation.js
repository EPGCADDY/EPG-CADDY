// Explicit per-environment activation; permissions remain enforced by each service.
export function personalAccessEnabled(env=process.env){
  const declared=String(env.GSC_ENVIRONMENT||env.GSC_APP_ENVIRONMENT||'').toLowerCase();
  if(declared==='production')return env.GSC_PERSONAL_ACCESS_PRODUCTION_READY==='1';
  if(['lab','laboratorio','laboratory'].includes(declared))return env.GSC_PERSONAL_ACCESS_LAB_READY==='1';
  return env.VERCEL_ENV==='production'
    ? env.GSC_PERSONAL_ACCESS_PRODUCTION_READY==='1'
    : env.GSC_PERSONAL_ACCESS_LAB_READY==='1';
}
