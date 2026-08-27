import {createHash} from 'node:crypto';
import {existsSync,readFileSync,statSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const lockPath='CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json';
const outputRoot=resolve('..','output','pdf');

function git(args){
  const result=spawnSync('git',args,{encoding:'utf8'});
  if(result.status!==0)throw new Error(result.stderr.trim()||`git ${args.join(' ')} falló`);
  return result.stdout.trim();
}

function sourceState(){
  const files=git(['ls-files','--cached','--others','--exclude-standard'])
    .split('\n').filter(Boolean).filter(path=>path!==lockPath).sort();
  const digest=createHash('sha256');
  for(const path of files){
    const objectId=process.env.VERCEL
      ?git(['rev-parse',`HEAD:${path}`])
      :git(['hash-object','--',path]);
    digest.update(`${path}\0${objectId}\n`);
  }
  return {files,digest:digest.digest('hex')};
}

function sha256(path){return createHash('sha256').update(readFileSync(path)).digest('hex');}
function fail(messages){
  console.error('FAIL INVENTORY GATE');
  for(const message of messages)console.error(`- ${message}`);
  console.error('- Regenera y guarda los tres inventarios antes de validar, construir o publicar.');
  process.exit(1);
}

if(!existsSync(lockPath))fail([`Falta el sello obligatorio ${lockPath}.`]);
const lock=JSON.parse(readFileSync(lockPath,'utf8'));
const current=sourceState();
const errors=[];
if(lock.sourceDigest!==current.digest)errors.push('Los archivos activos cambiaron después del último guardado de inventarios.');
if(lock.sourceFileCount!==current.files.length)errors.push(`El sello registra ${lock.sourceFileCount} fuentes y existen ${current.files.length}.`);

if(!process.env.VERCEL){
  for(const output of lock.outputs||[]){
    const path=resolve(outputRoot,output.name);
    if(!existsSync(path)){errors.push(`Falta ${output.name}.`);continue;}
    if(statSync(path).size!==output.size)errors.push(`${output.name} cambió de tamaño después del sellado.`);
    if(sha256(path)!==output.sha256)errors.push(`${output.name} no coincide con la versión guardada.`);
  }
}

if(errors.length)fail(errors);
console.log(`PASS INVENTORY GATE: ${current.files.length} fuentes y 3 PDF sellados en ${lock.version}.`);
