import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const roadmapOverall='ROADMAP_OVERALL.md';
const roadmapDetail='ROADMAP_A_DETALLE.md';
const requiredRoadmaps=[roadmapOverall,roadmapDetail];
const activation='23 de agosto de 2026, 17:05:00, hora de Guatemala';
const cutoff='línea 185';
const experimentalBranch='lab/update-architecture-d-burnin';
const experimentalLedger='update-lab-d/ROADMAP_UPDATE_LAB_D.md';

function runGit(args){
  const result=spawnSync('git',args,{encoding:'utf8'});
  return result.status===0?result.stdout.trim():'';
}

function normalizeFiles(value){
  return [...new Set(String(value||'').split(/[\n,]+/).map(item=>item.trim()).filter(Boolean))];
}

function changedFiles(){
  if(process.env.ROADMAP_CHANGED_FILES)return normalizeFiles(process.env.ROADMAP_CHANGED_FILES);
  const base=process.argv[2]||process.env.ROADMAP_BASE_SHA||'';
  const head=process.argv[3]||process.env.ROADMAP_HEAD_SHA||'';
  if(base&&head&&!/^0+$/.test(base)){
    const exact=runGit(['diff','--name-only',base,head]);
    if(exact)return normalizeFiles(exact);
  }
  const lastCommit=runGit(['diff','--name-only','HEAD^','HEAD']);
  if(lastCommit)return normalizeFiles(lastCommit);
  const currentCommit=runGit(['show','--pretty=format:','--name-only','HEAD']);
  if(currentCommit)return normalizeFiles(currentCommit);
  const working=[runGit(['diff','--name-only']),runGit(['diff','--cached','--name-only'])].filter(Boolean).join('\n');
  return normalizeFiles(working);
}

function fail(messages){
  console.error('FAIL ROADMAP GATE');
  for(const message of messages)console.error(`- ${message}`);
  process.exit(1);
}

const branch=process.env.VERCEL_GIT_COMMIT_REF||process.env.GITHUB_REF_NAME||'';
const files=changedFiles();

if(branch===experimentalBranch){
  let ledger='';
  try{ledger=readFileSync(experimentalLedger,'utf8')}catch(error){fail([`No se pudo abrir ${experimentalLedger}: ${error.message}`])}
  if(files.length===0)fail(['LAB D sin archivos modificados detectables.']);
  const allowed=file=>file.startsWith('update-lab-d/')||file==='scripts/roadmap-gate.mjs'||file==='middleware.js';
  const forbidden=files.filter(file=>!allowed(file));
  if(forbidden.length)fail([`LAB D intentó tocar archivos fuera del aislamiento: ${forbidden.join(', ')}`]);
  for(const file of files.filter(file=>file.startsWith('update-lab-d/'))){
    if(!ledger.includes(file))fail([`${file} no aparece en ${experimentalLedger}.`]);
  }
  if(files.includes('middleware.js')&&!ledger.includes('middleware.js'))fail(['middleware.js no está registrado en el ledger D.']);
  if(!ledger.includes('5b85c63438b27fce53e2d0f6aa4e371bffc3c263'))fail(['El ledger no conserva el commit baseline R33.']);
  if(!ledger.includes('primeros cinco ciclos'))fail(['El ledger no conserva la regla de descarte en los primeros cinco ciclos.']);
  console.log(`PASS ROADMAP GATE LAB D: ${files.length} modificaciones aisladas y registradas.`);
  process.exit(0);
}

let overall='';
let detail='';
try{
  overall=readFileSync(roadmapOverall,'utf8');
  detail=readFileSync(roadmapDetail,'utf8');
}catch(error){
  fail([`No se pudieron abrir ambos ROADMAPS: ${error.message}`]);
}

if(files.length===0){
  if(process.env.VERCEL)fail(['Vercel no pudo determinar los archivos modificados; publicación bloqueada por seguridad.']);
  console.log('PASS ROADMAP GATE: no hay modificaciones pendientes que registrar.');
  process.exit(0);
}

const errors=[];
for(const roadmap of requiredRoadmaps){
  if(!files.includes(roadmap))errors.push(`${roadmap} no fue actualizado dentro de la misma modificación.`);
}
for(const file of files){
  if(requiredRoadmaps.includes(file))continue;
  if(!overall.includes(file))errors.push(`${file} no aparece en ${roadmapOverall}.`);
  if(!detail.includes(file))errors.push(`${file} no aparece en ${roadmapDetail}.`);
}
for(const [name,content] of [[roadmapOverall,overall],[roadmapDetail,detail]]){
  if(!content.toLowerCase().includes(cutoff))errors.push(`${name} no conserva el punto de corte ${cutoff}.`);
  if(!content.includes(activation))errors.push(`${name} no conserva la fecha y hora de activación.`);
}
if(errors.length)fail(errors);
console.log(`PASS ROADMAP GATE: ${files.length} modificaciones registradas en ambos ROADMAPS.`);
