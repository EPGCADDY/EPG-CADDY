import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,statSync} from 'node:fs';
import {basename,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';

const inventoryPath='CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V356_INVENTARIO_REPOSITORIO/INVENTARIO_MAESTRO_COMPLETO_V356.md';
const lockPath='CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json';
const metaPaths=new Set([inventoryPath,lockPath]);
const source=readFileSync(inventoryPath,'utf8');

const git=spawnSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'});
assert.equal(git.status,0,git.stderr);
const files=[...new Set(git.stdout.split('\n').filter(Boolean))].sort((a,b)=>a.localeCompare(b,'en'));
assert.ok(files.includes(inventoryPath),'El inventario debe formar parte del arbol Git.');

const folders=new Set(['.']);
for(const path of files){
  let current=dirname(path);
  while(current&&current!=='.'){
    folders.add(current);
    current=dirname(current);
  }
}

const folderRows=new Map();
const fileRows=new Map();
for(const line of source.split('\n')){
  let match=line.match(/^\| D\d{3} \| `([^`]+)` \| `([^`]+)` \| ([^|]+) \| OK \|$/);
  if(match){
    assert.ok(!folderRows.has(match[1]),`Carpeta duplicada: ${match[1]}`);
    folderRows.set(match[1],{name:match[2],description:match[3].trim()});
    continue;
  }
  match=line.match(/^\| F\d{3} \| `([^`]+)` \| `([^`]+)` \| ([^|]+) \| ([^|]+) \| `([^`]+)` \| ([^|]+) \| OK \|$/);
  if(match){
    assert.ok(!fileRows.has(match[1]),`Archivo duplicado: ${match[1]}`);
    fileRows.set(match[1],{name:match[2],category:match[3].trim(),bytes:match[4].trim(),digest:match[5],description:match[6].trim()});
  }
}

assert.deepEqual([...fileRows.keys()].sort((a,b)=>a.localeCompare(b,'en')),files,'La lista de archivos debe coincidir 1:1 con Git.');
assert.deepEqual([...folderRows.keys()].sort((a,b)=>a.localeCompare(b,'en')),[...folders].sort((a,b)=>a.localeCompare(b,'en')),'La lista de carpetas debe coincidir 1:1 con el arbol.');

const folded=new Set();
for(const path of files){
  const row=fileRows.get(path);
  assert.equal(row.name,basename(path),`Nombre base incorrecto: ${path}`);
  assert.ok(row.category.length>=4,`Categoria vacia: ${path}`);
  assert.ok(row.description.length>=20,`Descripcion insuficiente: ${path}`);
  assert.equal(path,path.normalize('NFC'),`Unicode no normalizado: ${path}`);
  assert.ok(!/[\u0000-\u001f\u007f]/.test(path),`Caracter de control: ${path}`);
  assert.ok(!path.split('/').some(part=>!part||part==='.'||part==='..'||part!==part.trim()),`Segmento invalido: ${path}`);
  const key=path.toLocaleLowerCase('en-US');
  assert.ok(!folded.has(key),`Colision de mayusculas/minusculas: ${path}`);
  folded.add(key);
  if(metaPaths.has(path)){
    assert.equal(row.bytes,'META',`Bytes meta incorrectos: ${path}`);
    assert.equal(row.digest,'META-GIT-LOCK',`Sello meta incorrecto: ${path}`);
  }else{
    let bytes=readFileSync(path);
    let digest=createHash('sha256').update(bytes).digest('hex');
    if(process.env.VERCEL&&(Number(row.bytes)!==statSync(path).size||row.digest!==digest)){
      const committed=spawnSync('git',['show',`HEAD:${path}`],{encoding:null,maxBuffer:128*1024*1024});
      assert.equal(committed.status,0,`No se pudo leer el blob Git de ${path}.`);
      bytes=committed.stdout;
      digest=createHash('sha256').update(bytes).digest('hex');
    }
    assert.equal(Number(row.bytes),bytes.length,`Tamano incorrecto: ${path}`);
    assert.equal(row.digest,digest,`SHA-256 incorrecto: ${path}`);
  }
}

for(const [path,row] of folderRows){
  assert.equal(row.name,path==='.'?'.':basename(path),`Nombre de carpeta incorrecto: ${path}`);
  assert.ok(row.description.length>=20,`Descripcion de carpeta insuficiente: ${path}`);
}

assert.ok(source.includes(`Archivos inventariados: **${files.length} de ${files.length}**.`),'Conteo de archivos incorrecto.');
assert.ok(source.includes(`Carpetas inventariadas: **${folders.size} de ${folders.size}**.`),'Conteo de carpetas incorrecto.');
assert.ok(source.includes('Rutas omitidas: **0**.'),'No consta cero omisiones.');
assert.ok(source.includes('Descripciones vacias: **0**.'),'No consta cero descripciones vacias.');

console.log(`PASS V356 COMPLETE REPOSITORY INVENTORY: files=${files.length}/${files.length} folders=${folders.size}/${folders.size} omitted=0 descriptions=100% nomenclature=100%`);
