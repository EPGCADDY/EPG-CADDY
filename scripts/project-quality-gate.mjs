import {existsSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const controlRoot='CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES';
const matrixPath=`${controlRoot}/MATRIZ_GATE_0_PROYECTO.json`;
const simulatedMissing=process.env.GSCG_GATE_SELF_TEST==='missing-control';

function fail(messages){
  console.error('PROJECT_QUALITY_GATE FAIL');
  for(const message of messages)console.error(`- ${message}`);
  process.exit(1);
}

function git(args){
  const result=spawnSync('git',args,{encoding:'utf8'});
  if(result.status!==0)return '';
  return result.stdout.trim();
}

const errors=[];
if(!existsSync(matrixPath))fail([`Falta ${matrixPath}.`]);
let matrix;
try{matrix=JSON.parse(readFileSync(matrixPath,'utf8'));}
catch(error){fail([`${matrixPath} no es JSON válido: ${error.message}`]);}

const controls=[...(matrix.requiredControls||[])];
if(simulatedMissing)controls.push('CONTROL_INEXISTENTE_DE_PRUEBA.md');
for(const path of controls){if(!existsSync(path))errors.push(`Falta control obligatorio: ${path}`);}

if(matrix.logic!=='all')errors.push('La lógica del cierre debe ser AND/all.');
if(!Array.isArray(matrix.inputs)||matrix.inputs.length!==7)errors.push('Gate 0 debe cerrar exactamente siete entradas.');
const gateIds=(matrix.gates||[]).map(gate=>gate.id);
if(gateIds.length!==12||new Set(gateIds).size!==12)errors.push('La matriz debe conservar doce puertas únicas G0-01…G0-12.');
for(const id of ['G0-02','G0-03','G0-04','G0-05','G0-06','G0-07','G0-08','G0-09','G0-10','G0-11','G0-12']){
  if(!gateIds.includes(id))errors.push(`Falta la puerta ${id}.`);
}
const physicalPolicy=matrix.physicalVerificationPolicy||{};
if(physicalPolicy.mandatory!==true||physicalPolicy.coveragePercent!==100||physicalPolicy.samplingAllowed!==false||physicalPolicy.automaticEvidenceIsComplementaryOnly!==true||physicalPolicy.unverifiedItemResult!=="BLOCK_VERSION")errors.push('Falta la norma bloqueante de revisión física del 100% de cambios.');

const expectedRepository='EPGCADDY/EPG-CADDY';
const remote=git(['remote','get-url','origin']);
const isVercel=Boolean(process.env.VERCEL);
let vercelHeadMatches=false;
if(isVercel){
  const owner=process.env.VERCEL_GIT_REPO_OWNER||'';
  const slug=process.env.VERCEL_GIT_REPO_SLUG||'';
  const exposedRepository=owner&&slug?`${owner}/${slug}`:'';
  if(exposedRepository&&exposedRepository.toLowerCase()!==expectedRepository.toLowerCase()){
    errors.push(`Repositorio Vercel inesperado: ${exposedRepository}.`);
  }
  const exposedCommit=process.env.VERCEL_GIT_COMMIT_SHA||'';
  const head=git(['rev-parse','HEAD']);
  vercelHeadMatches=Boolean(exposedCommit&&head&&exposedCommit===head);
  if(exposedCommit&&head&&exposedCommit!==head)errors.push(`Vercel declara ${exposedCommit}, pero HEAD es ${head}.`);
}else if(!/github\.com[/:]EPGCADDY\/EPG-CADDY(?:\.git)?$/i.test(remote)){
  errors.push(`Origen canónico inesperado: ${remote||'ausente'}`);
}
const baseline=matrix.canonical?.productionBaselineCommit||'';
let protectedMain=git(['rev-parse','origin/main']);
if(!protectedMain){
  const canonicalUrl=matrix.canonical?.repository||'https://github.com/EPGCADDY/EPG-CADDY';
  protectedMain=git(['ls-remote',canonicalUrl,'refs/heads/main']).split(/\s+/)[0]||'';
}
const mainObjectAvailable=protectedMain&&spawnSync('git',['cat-file','-e',`${protectedMain}^{commit}`]).status===0;
const verifiedMain=mainObjectAvailable?protectedMain:git(['rev-parse','HEAD']);
const baselineIsAncestor=isVercel
  ? Boolean(baseline&&vercelHeadMatches)
  : Boolean(baseline&&verifiedMain&&spawnSync(
      'git',['merge-base','--is-ancestor',baseline,verifiedMain],{encoding:'utf8'}
    ).status===0);
if(!baselineIsAncestor){
  errors.push(`Producción/main no desciende de la base protegida ${baseline||'ausente'}; recibido ${verifiedMain||'ausente'}.`);
}

for(const path of ['ROADMAP_OVERALL.md','ROADMAP_A_DETALLE.md','GOLF_SCORE_CARD_GT_PENDING_MATRIX.md','audit-project.mjs','scripts/roadmap-gate.mjs','scripts/inventory-gate.mjs']){
  if(!existsSync(path))errors.push(`Falta archivo de control del proyecto: ${path}`);
}

if(errors.length)fail(errors);
console.log(`PROJECT_QUALITY_GATE PASS controls=${controls.length} inputs=7 gates=12 physical=100% baseline=${baseline.slice(0,12)} production=${verifiedMain.slice(0,12)}`);
