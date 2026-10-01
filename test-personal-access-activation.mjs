import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {personalAccessEnabled} from './api/_lib/personal-access-activation.js';
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),true);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),true);
assert.equal(personalAccessEnabled({}),false);
console.log('PASS personal activation: explicit Production flag; LAB flag cannot enable Production; Production flag cannot enable Preview; default denied');

const deployment=JSON.parse(readFileSync(new URL('./vercel.json',import.meta.url)));
assert.equal(deployment.env.GSC_PERSONAL_ACCESS_PRODUCTION_READY,'1');
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',...deployment.env}),true,'Published package explicitly activates Production');
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',...deployment.env}),false,'Package Production flag cannot activate Preview');
console.log('PASS published activation: versioned non-secret Production flag; no database override; Preview remains separately controlled');
