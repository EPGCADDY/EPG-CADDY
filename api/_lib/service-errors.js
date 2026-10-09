export function serviceErrorCode(error,fallback='SERVICE_UNAVAILABLE'){
 const text=[error?.code,error?.message,error?.cause?.message].filter(Boolean).join(' ');
 if(/\b402\b|exceeded the quota|quota/i.test(text))return'DATABASE_QUOTA_EXCEEDED';
 return error?.code||fallback;
}

export function serviceErrorStatus(error,code){
 if(error?.status)return error.status;
 if(code==='DATABASE_NOT_CONFIGURED'||code==='DATABASE_QUOTA_EXCEEDED')return 503;
 return 500;
}
