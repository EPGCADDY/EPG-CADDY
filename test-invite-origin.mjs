import assert from 'node:assert/strict';
import {inviteOrigin} from './api/_lib/invite-origin.js';
assert.equal(inviteOrigin({VERCEL_ENV:'preview',VERCEL_URL:'golf-lab-123.vercel.app',APP_PUBLIC_ORIGIN:'https://golf-sc-gt-lab.vercel.app'}),'https://golf-lab-123.vercel.app');
assert.equal(inviteOrigin({VERCEL_ENV:'production',APP_PUBLIC_ORIGIN:'https://golf-sc-gt-lab.vercel.app/'}),'https://golf-sc-gt-lab.vercel.app');
assert.throws(()=>inviteOrigin({VERCEL_ENV:'preview'}),/PREVIEW_ORIGIN_NOT_CONFIGURED/);
assert.throws(()=>inviteOrigin({VERCEL_ENV:'preview',VERCEL_URL:'evil.example/path'}),/PREVIEW_ORIGIN_NOT_CONFIGURED/);
console.log('PASS invitation destination: Preview isolated, production unchanged, invalid host rejected');

assert.equal(inviteOrigin({VERCEL_ENV:"production",VERCEL_PROJECT_ID:"prj_d0fwQinspgOKpVKoKjmsJOaR2qr1"}),"https://epg-caddy.vercel.app");
assert.equal(inviteOrigin({VERCEL_ENV:"production",VERCEL_PROJECT_ID:"prj_d0fwQinspgOKpVKoKjmsJOaR2qr1",APP_PUBLIC_ORIGIN:"https://golf-sc-gt-lab.vercel.app"}),"https://epg-caddy.vercel.app");
assert.equal(inviteOrigin({VERCEL_ENV:"production",VERCEL_PROJECT_ID:"prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp",APP_PUBLIC_ORIGIN:"https://epg-caddy.vercel.app"}),"https://golf-sc-gt-lab.vercel.app");
console.log("PASS fixed project invitation origins: Production and LAB remain separate");
