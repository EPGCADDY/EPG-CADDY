import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const pass=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{encoding:'utf8'});
assert.equal(pass.status,0,pass.stderr||pass.stdout);
assert.match(pass.stdout,/PROJECT_QUALITY_GATE PASS/);

const negative=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{
  encoding:'utf8',
  env:{...process.env,GSCG_GATE_SELF_TEST:'missing-control'}
});
assert.notEqual(negative.status,0,'El candado debe rechazar un control ausente.');
assert.match(negative.stderr,/CONTROL_INEXISTENTE_DE_PRUEBA/);

console.log('PASS project quality gate: camino positivo y prueba negativa de control ausente.');

