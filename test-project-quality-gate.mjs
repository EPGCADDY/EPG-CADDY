import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

assert.match(readFileSync('.gitignore','utf8'),/(?:^|\n)\.vercel\/(?:\n|$)/);

const pass=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{encoding:'utf8'});
assert.equal(pass.status,0,pass.stderr||pass.stdout);
assert.match(pass.stdout,/PROJECT_QUALITY_GATE PASS/);

const head=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim();
const vercelPass=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{
  encoding:'utf8',
  env:{...process.env,VERCEL:'1',GSCG_INVENTORY_WORKTREE:'1',VERCEL_GIT_REPO_OWNER:'EPGCADDY',VERCEL_GIT_REPO_SLUG:'EPG-CADDY',VERCEL_GIT_COMMIT_SHA:head}
});
assert.equal(vercelPass.status,0,vercelPass.stderr||vercelPass.stdout);

const wrongVercelRepo=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{
  encoding:'utf8',
  env:{...process.env,VERCEL:'1',GSCG_INVENTORY_WORKTREE:'1',VERCEL_GIT_REPO_OWNER:'OTRO',VERCEL_GIT_REPO_SLUG:'REPOSITORIO',VERCEL_GIT_COMMIT_SHA:head}
});
assert.notEqual(wrongVercelRepo.status,0,'El candado debe rechazar un repositorio Vercel distinto.');
assert.match(wrongVercelRepo.stderr,/Repositorio Vercel inesperado/);

const negative=spawnSync(process.execPath,['scripts/project-quality-gate.mjs'],{
  encoding:'utf8',
  env:{...process.env,GSCG_GATE_SELF_TEST:'missing-control'}
});
assert.notEqual(negative.status,0,'El candado debe rechazar un control ausente.');
assert.match(negative.stderr,/CONTROL_INEXISTENTE_DE_PRUEBA/);

console.log('PASS project quality gate: local, Vercel separado y pruebas negativas.');
