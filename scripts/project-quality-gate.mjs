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
if(gateIds.length!==11||new Set(gateIds).size!==11)errors.push('La matriz debe conservar once puertas únicas G0-01…G0-11.');
for(const id of ['G0-02','G0-03','G0-04','G0-05','G0-06','G0-07','G0-08','G0-09','G0-10','G0-11']){
  if(!gateIds.includes(id))errors.push(`Falta la puerta ${id}.`);
}

const remote=git(['remote','get-url','origin']);
if(!/github\.com[/:]EPGCADDY\/EPG-CADDY(?:\.git)?$/i.test(remote))errors.push(`Origen canónico inesperado: ${remote||'ausente'}`);
const baseline=matrix.canonical?.productionBaselineCommit||'';
const originMain=git(['rev-parse','origin/main']);
if(!baseline||originMain!==baseline)errors.push(`Producción/origin main no coincide con la base protegida ${baseline||'ausente'}.`);

for(const path of ['ROADMAP_OVERALL.md','ROADMAP_A_DETALLE.md','GOLF_SCORE_CARD_GT_PENDING_MATRIX.md','audit-project.mjs','scripts/roadmap-gate.mjs','scripts/inventory-gate.mjs']){
  if(!existsSync(path))errors.push(`Falta archivo de control del proyecto: ${path}`);
}

if(errors.length)fail(errors);
console.log(`PROJECT_QUALITY_GATE PASS controls=${controls.length} inputs=7 gates=11 production=${baseline.slice(0,12)}`);

