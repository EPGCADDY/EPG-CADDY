import assert from 'node:assert/strict';
import handler,{liveShareDeploymentReady} from './api/live-share.js';
const call=async req=>{const res={headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.statusCode=n;return this},json(value){this.value=value;return this}};await handler(req,res);return res};
const keys=['GSC_LIVE_SHARE_LAB_READY','VERCEL_PROJECT_ID','GSC_ENVIRONMENT'],saved=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
process.env.VERCEL_PROJECT_ID='prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp';process.env.GSC_ENVIRONMENT='lab';delete process.env.GSC_LIVE_SHARE_LAB_READY;
try{const denied=await call({method:'POST',headers:{host:'golf-sc-gt-lab.vercel.app'},body:{action:'create'}});assert.equal(denied.statusCode,503);assert.equal(denied.value.code,'LAB_DATABASE_ISOLATION_REQUIRED');assert.equal(denied.headers['Cache-Control'],'no-store, max-age=0');assert.equal((await call({method:'POST',headers:{host:'lab.example',origin:'https://other.example'},body:{action:'create'}})).statusCode,403);assert.equal((await call({method:'GET',headers:{host:'lab.example'}})).statusCode,405);console.log('PASS LIVE-share handler: isolated LAB activation required, no-store, cross-origin rejection and POST only')}finally{for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key]}}

const production={VERCEL_PROJECT_ID:"prj_d0fwQinspgOKpVKoKjmsJOaR2qr1",VERCEL_ENV:"production"};
assert.equal(liveShareDeploymentReady(production),true);
assert.equal(liveShareDeploymentReady({...production,VERCEL_ENV:"preview"}),false);
assert.equal(liveShareDeploymentReady({...production,GSC_ENVIRONMENT:"lab"}),false);
assert.equal(liveShareDeploymentReady({GSC_LIVE_SHARE_LAB_READY:"1"}),false);
assert.equal(liveShareDeploymentReady({VERCEL_PROJECT_ID:"prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp",GSC_LIVE_SHARE_LAB_READY:"1"}),true);
console.log("PASS official Production activation; unknown and Preview rejected; LAB activation retained");
