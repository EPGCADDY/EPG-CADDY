import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {personalAccessEnabled} from './api/_lib/personal-access-activation.js';
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),true);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),true);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_ENVIRONMENT:'production',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),true);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_ENVIRONMENT:'production',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),false);
assert.equal(personalAccessEnabled({}),false);
console.log('PASS personal activation: explicit environment flag, Production alias preview allowed only by GSC_ENVIRONMENT');

const deployment=JSON.parse(readFileSync(new URL('./vercel.json',import.meta.url)));
assert.equal(deployment.env.GSC_PERSONAL_ACCESS_PRODUCTION_READY,'1');
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',...deployment.env}),true,'Published package explicitly activates Production');
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',...deployment.env}),false,'Package Production flag alone cannot activate Preview without declared environment');
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_ENVIRONMENT:'production',...deployment.env}),true,'Production project alias deployment can activate with declared production environment');
console.log('PASS published activation: versioned Production flag; preview requires declared Production project environment');
