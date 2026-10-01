import assert from 'node:assert/strict';
import {personalAccessEnabled} from './api/_lib/personal-access-activation.js';
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'production',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),true);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_PRODUCTION_READY:'1'}),false);
assert.equal(personalAccessEnabled({VERCEL_ENV:'preview',GSC_PERSONAL_ACCESS_LAB_READY:'1'}),true);
assert.equal(personalAccessEnabled({}),false);
console.log('PASS personal activation: explicit Production flag; LAB flag cannot enable Production; Production flag cannot enable Preview; default denied');
