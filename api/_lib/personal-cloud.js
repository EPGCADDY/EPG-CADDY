// Account backup only. Tournament databases and private member editions remain isolated.
export function personalCloudOrigin(env=process.env){
 if(env.GSC_MEMBERS_EDITION==='1')return null;
 const lab=env.GSC_ENVIRONMENT==='lab'||env.VERCEL_PROJECT_ID==='prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp';
 if(!lab||!env.GSC_PERSONAL_CLOUD_ORIGIN)return null;
 if(env.GSC_PERSONAL_CLOUD_ORIGIN!=='https://epg-caddy.vercel.app')throw Object.assign(Error('PERSONAL_CLOUD_INVALID'),{code:'PERSONAL_CLOUD_INVALID'});
 return env.GSC_PERSONAL_CLOUD_ORIGIN;
}
export async function relayPersonalCloud(req,res,account,{payload=null,env=process.env,fetcher=fetch}={}){
 const origin=personalCloudOrigin(env);if(!origin)return false;
 const endpoint=payload?'/api/sync':'/api/backup';
 let response,data;
 try{response=await fetcher(origin+endpoint,{method:payload?'POST':'GET',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(20000),headers:{cookie:req.headers.cookie||'',accept:'application/json',...(payload?{'content-type':'application/json',origin}: {})},...(payload?{body:JSON.stringify(payload)}:{})});
 data=await response.json()}catch{throw Object.assign(Error('PERSONAL_CLOUD_UNAVAILABLE'),{code:'PERSONAL_CLOUD_UNAVAILABLE'})}
 if(response.ok&&data.ok&&String(payload?data.accountId:data.account?.id)!==account.id)throw Object.assign(Error('PERSONAL_CLOUD_IDENTITY_MISMATCH'),{code:'PERSONAL_CLOUD_IDENTITY_MISMATCH'});
 res.status(response.status).json(data);return true;
}
