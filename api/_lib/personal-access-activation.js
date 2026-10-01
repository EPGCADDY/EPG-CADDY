// Explicit per-environment activation; permissions remain enforced by each service.
export function personalAccessEnabled(env=process.env){
  return env.VERCEL_ENV==='production'
    ? env.GSC_PERSONAL_ACCESS_PRODUCTION_READY==='1'
    : env.GSC_PERSONAL_ACCESS_LAB_READY==='1';
}
