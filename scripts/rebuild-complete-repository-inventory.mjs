import {createHash} from 'node:crypto';
import {existsSync,mkdirSync,readFileSync,statSync,writeFileSync} from 'node:fs';
import {basename,dirname,extname} from 'node:path';
import {spawnSync} from 'node:child_process';

const inventoryPath='CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V356_INVENTARIO_REPOSITORIO/INVENTARIO_MAESTRO_COMPLETO_V356.md';
const lockPath='CONTROL_PROYECTO_SCIRE/INVENTARIOS_V311.lock.json';
const metaPaths=new Set([inventoryPath,lockPath]);

function gitFiles(){
  const result=spawnSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'});
  if(result.status!==0)throw new Error(result.stderr.trim()||'No se pudo leer el arbol Git.');
  const files=result.stdout.split('\n').filter(Boolean);
  if(!files.includes(inventoryPath))files.push(inventoryPath);
  return [...new Set(files)].sort((a,b)=>a.localeCompare(b,'en'));
}

function sha256(path){
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function words(path){
  return basename(path,extname(path))
    .replace(/^test-/,'')
    .replace(/^page-/,'pagina ')
    .replace(/[_-]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function category(path){
  const extension=extname(path).toLowerCase();
  if(path.startsWith('.github/workflows/'))return 'CI/CD';
  if(path.startsWith('CONTROL_PROYECTO_SCIRE/'))return 'Control SCIRE';
  if(path.startsWith('api/'))return 'Backend/API';
  if(path.startsWith('database/'))return 'Base de datos';
  if(path.startsWith('scripts/'))return 'Automatizacion';
  if(/^test-/.test(basename(path))||path.includes('/test-'))return 'Prueba automatizada';
  if(path.startsWith('docs/manual/'))return 'Manual';
  if(path.startsWith('ROADMAP_IMAGES/'))return 'Evidencia visual';
  if(path.startsWith('assets/'))return 'Activo de marca';
  if(path.startsWith('ios/')||path.startsWith('native/ios/'))return 'Aplicacion iOS';
  if(path.startsWith('android/')||path.startsWith('native/android/'))return 'Aplicacion Android';
  if(['.png','.jpg','.jpeg','.svg','.webp','.ico'].includes(extension))return 'Imagen';
  if(extension==='.pdf')return 'Documento PDF';
  if(extension==='.md')return 'Documentacion';
  if(extension==='.html')return 'Interfaz web';
  if(['.js','.mjs'].includes(extension))return 'JavaScript';
  if(extension==='.json')return 'Datos/configuracion';
  if(extension==='.sql')return 'Base de datos';
  return 'Fuente de producto';
}

function description(path){
  const file=basename(path);
  const extension=extname(path).toLowerCase();
  const label=words(path);
  const exact={
    'AGENTS.md':'Reglas operativas obligatorias para cualquier agente que modifique el proyecto.',
    'README.md':'Entrada general del repositorio, alcance del producto y orientacion de uso.',
    'ROADMAP_OVERALL.md':'Inventario general, historial de versiones, estado y decisiones de arquitectura.',
    'ROADMAP_A_DETALLE.md':'Inventario detallado de cambios, archivos, controles y evidencia reproducible.',
    'audit-project.mjs':'Orquestador de la auditoria maestra y de todos los paquetes de regresion.',
    'package.json':'Metadatos Node, dependencias y comandos reproducibles del proyecto.',
    'vercel.json':'Configuracion de construccion, rutas, funciones y despliegue en Vercel.',
    'service-worker.js':'Cache PWA, actualizacion del shell y funcionamiento sin conexion.',
    'index-grupal.html':'Aplicacion principal Golf Score Card GT para registro, ronda, voz, IA y LIVE.',
    [lockPath]:'Sello global de fuentes y de los tres inventarios PDF; se valida por Git y por inventory-gate.',
    [inventoryPath]:'Este inventario maestro; su integridad queda cubierta por el sello global y el arbol Git.',
  };
  if(exact[path])return exact[path];
  if(path.startsWith('.github/workflows/'))return `Flujo de GitHub Actions para ${label}; automatiza controles y publicacion segura.`;
  if(/^test-/.test(file)||path.includes('/test-'))return `Prueba automatizada de regresion para ${label}; bloquea cambios incompatibles.`;
  if(path.startsWith('api/_lib/'))return `Modulo interno reutilizable del backend para ${label}.`;
  if(path.startsWith('api/'))return `Endpoint serverless del backend para ${label}.`;
  if(path.startsWith('database/')&&extension==='.sql')return `Esquema o migracion SQL para ${label}.`;
  if(path.startsWith('database/'))return `Control automatizado de base de datos para ${label}.`;
  if(path.startsWith('scripts/'))return `Herramienta reproducible de automatizacion para ${label}.`;
  if(/^docs\/manual\/v311\/page-\d+\.png$/.test(path))return `Lamina 4K del Manual de Funciones correspondiente a ${label}.`;
  if(path.startsWith('docs/manual/')&&extension==='.pdf')return `Edicion PDF verificable del Manual de Funciones: ${label}.`;
  if(path.startsWith('docs/manual/'))return `Fuente o activo editorial del Manual de Funciones para ${label}.`;
  if(path.startsWith('ROADMAP_IMAGES/'))return `Evidencia visual inventariada del roadmap: ${label}.`;
  if(path.startsWith('assets/official-logos/'))return `Activo oficial de marca o referencia de uso para ${label}.`;
  if(path.startsWith('assets/'))return `Activo visual o de interfaz para ${label}.`;
  if(path.startsWith('ios/')||path.startsWith('native/ios/'))return `Fuente o configuracion de la aplicacion iOS para ${label}.`;
  if(path.startsWith('android/')||path.startsWith('native/android/'))return `Fuente o configuracion de la aplicacion Android para ${label}.`;
  if(path.startsWith('CONTROL_PROYECTO_SCIRE/'))return `Documento de control, evidencia o trazabilidad SCIRE para ${label}.`;
  if(extension==='.html')return `Interfaz web para ${label}.`;
  if(['.js','.mjs'].includes(extension))return `Modulo JavaScript de producto para ${label}.`;
  if(extension==='.md')return `Documento tecnico u operativo sobre ${label}.`;
  if(extension==='.json')return `Datos estructurados o configuracion para ${label}.`;
  if(extension==='.sql')return `Definicion SQL para ${label}.`;
  if(extension==='.pdf')return `Documento PDF inventariado: ${label}.`;
  if(['.png','.jpg','.jpeg','.svg','.webp','.ico'].includes(extension))return `Activo visual inventariado: ${label}.`;
  return `Archivo fuente inventariado para ${label}.`;
}

function directoryDescription(path){
  const exact={
    '.':'Raiz canonica del repositorio Golf Score Card GT.',
    '.github':'Configuracion de automatizacion y gobierno en GitHub.',
    '.github/workflows':'Flujos CI/CD que bloquean regresiones y publicaciones incompletas.',
    'CONTROL_PROYECTO_SCIRE':'Gobierno, directrices, inventarios, pendientes y evidencia del proyecto.',
    'CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA':'Expedientes cerrados o auditados con evidencia reproducible.',
    'api':'Funciones serverless y servicios del backend.',
    'api/_lib':'Modulos internos compartidos por los endpoints.',
    'database':'Esquemas, migraciones y pruebas de persistencia.',
    'docs':'Documentacion y activos editoriales del producto.',
    'docs/manual':'Manual visual y sus fuentes reproducibles.',
    'docs/manual/v311':'Edicion consolidada V311 del Manual de Funciones.',
    'scripts':'Automatizaciones de construccion, inventario, calidad y empaquetado.',
    'ROADMAP_IMAGES':'Evidencia grafica historica de arquitectura e inventarios.',
    'assets':'Activos visuales y de marca usados por la aplicacion.',
    'ios':'Proyecto fuente de la aplicacion iOS.',
    'android':'Proyecto fuente de la aplicacion Android.',
    'native':'Paquetes nativos generados para distribucion movil.',
  };
  if(exact[path])return exact[path];
  if(path.startsWith('CONTROL_PROYECTO_SCIRE/'))return `Area SCIRE dedicada a ${words(path)}.`;
  if(path.startsWith('docs/manual/'))return `Subcarpeta editorial del manual para ${words(path)}.`;
  if(path.startsWith('native/ios/'))return `Componente del paquete nativo iOS para ${words(path)}.`;
  if(path.startsWith('native/android/'))return `Componente del paquete nativo Android para ${words(path)}.`;
  if(path.startsWith('ios/'))return `Componente de la aplicacion iOS para ${words(path)}.`;
  if(path.startsWith('android/'))return `Componente de la aplicacion Android para ${words(path)}.`;
  return `Carpeta funcional del repositorio para ${words(path)}.`;
}

function nomenclatureErrors(files){
  const errors=[];
  const folded=new Map();
  const reserved=/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;
  for(const path of files){
    if(path!==path.normalize('NFC'))errors.push(`${path}: no usa Unicode NFC.`);
    if(/[\u0000-\u001f\u007f]/.test(path))errors.push(`${path}: contiene caracteres de control.`);
    if(path.split('/').some(part=>!part||part==='.'||part==='..'||part!==part.trim()))errors.push(`${path}: contiene un segmento invalido.`);
    if(path.split('/').some(part=>reserved.test(part)))errors.push(`${path}: contiene un nombre reservado.`);
    const key=path.toLocaleLowerCase('en-US');
    if(folded.has(key)&&folded.get(key)!==path)errors.push(`${path}: colisiona por mayusculas/minusculas con ${folded.get(key)}.`);
    folded.set(key,path);
  }
  return errors;
}

const files=gitFiles();
const errors=nomenclatureErrors(files);
if(errors.length)throw new Error(`Nomenclatura invalida:\n${errors.join('\n')}`);

const directories=new Set(['.']);
for(const path of files){
  let current=dirname(path);
  while(current&&current!=='.'){
    directories.add(current);
    current=dirname(current);
  }
}
const folders=[...directories].sort((a,b)=>a.localeCompare(b,'en'));
const fileDigest=createHash('sha256');
for(const path of files)fileDigest.update(`${path}\n`);
const pathDigest=fileDigest.digest('hex');

const lines=[
  '# INVENTARIO MAESTRO COMPLETO DEL REPOSITORIO · V356',
  '',
  'Cobertura verificable: **100% de las rutas activas detectadas por Git**, incluidos los dos archivos meta de sellado. Cada archivo tiene nombre exacto, categoria, tamano, integridad, descripcion y validacion de nomenclatura; cada carpeta tiene nombre y descripcion. La garantia se limita a esta cobertura objetiva del arbol indicado, no a afirmar ausencia absoluta de defectos futuros.',
  '',
  `- Fecha de corte: 28 de agosto de 2026.`,
  `- Archivos inventariados: **${files.length} de ${files.length}**.`,
  `- Carpetas inventariadas: **${folders.length} de ${folders.length}**.`,
  `- Rutas omitidas: **0**.`,
  `- Duplicados exactos: **0**.`,
  `- Colisiones por mayusculas/minusculas: **0**.`,
  `- Descripciones vacias: **0**.`,
  `- Digest SHA-256 de la lista ordenada de rutas: \`${pathDigest}\`.`,
  `- Metaarchivos: \`${inventoryPath}\` y \`${lockPath}\` se rotulan \`META-GIT-LOCK\` para evitar una huella autorreferencial imposible; ambos quedan protegidos por el arbol del commit y el candado global.`,
  '',
  '<!-- INVENTORY_META '+JSON.stringify({version:'V356-COMPLETE-REPOSITORY-INVENTORY',fileCount:files.length,directoryCount:folders.length,omitted:0,duplicates:0,caseCollisions:0,emptyDescriptions:0,pathDigest})+' -->',
  '',
  '## Reglas de nomenclatura comprobadas',
  '',
  '- La ruta y el nombre base coinciden literalmente con Git.',
  '- Unicode NFC, sin caracteres de control, segmentos vacios, `.` o `..`.',
  '- Sin espacios iniciales/finales ni nombres reservados de sistema.',
  '- Sin rutas duplicadas ni colisiones al ignorar mayusculas/minusculas.',
  '- Cada entrada conserva categoria y descripcion no vacias.',
  '',
  '## Carpetas',
  '',
  '| ID | Ruta exacta | Nombre | Descripcion | Nomenclatura |',
  '|---:|---|---|---|:---:|',
];

folders.forEach((path,index)=>{
  const name=path==='.'?'.':basename(path);
  lines.push(`| D${String(index+1).padStart(3,'0')} | \`${path}\` | \`${name}\` | ${directoryDescription(path)} | OK |`);
});

lines.push('', '## Archivos', '', '| ID | Ruta exacta | Nombre | Categoria | Bytes | SHA-256 / sello | Descripcion | Nomenclatura |', '|---:|---|---|---|---:|---|---|:---:|');
files.forEach((path,index)=>{
  const meta=metaPaths.has(path);
  if(!meta&&!existsSync(path))throw new Error(`Falta el archivo inventariado ${path}.`);
  const size=meta?'META':statSync(path).size;
  const digest=meta?'META-GIT-LOCK':sha256(path);
  lines.push(`| F${String(index+1).padStart(3,'0')} | \`${path}\` | \`${basename(path)}\` | ${category(path)} | ${size} | \`${digest}\` | ${description(path)} | OK |`);
});

lines.push('', '## Cierre de control', '', 'Este documento se regenera con `node scripts/rebuild-complete-repository-inventory.mjs` y se valida con `node test-v356-complete-repository-inventory.mjs`. Cualquier archivo o carpeta nueva, omision, hash alterado, nombre inconsistente o descripcion vacia produce FAIL antes de construir o publicar.', '');
mkdirSync(dirname(inventoryPath),{recursive:true});
writeFileSync(inventoryPath,lines.join('\n'),'utf8');
console.log(`COMPLETE_REPOSITORY_INVENTORY PASS files=${files.length} folders=${folders.length} omitted=0 nomenclature=OK`);
