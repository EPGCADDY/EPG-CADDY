// Explicit per-environment activation; permissions remain enforced by each service.
export function personalAccessEnabled(env=process.env){
  if(env.GSC_PERSONAL_ACCESS_PRODUCTION_READY==='1')return true;
  if(env.GSC_PERSONAL_ACCESS_LAB_READY==='1')return true;
  return false;
}
