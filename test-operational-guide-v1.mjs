import {existsSync, readFileSync, statSync} from 'node:fs';

const sourcePath='docs/GUIA_OPERATIVA_GOLF_SCORE_CARD_GT_V1.md';
const documentPath='docs/GUIA_OPERATIVA_GOLF_SCORE_CARD_GT_V1.docx';
const builderPath='tools/build_operational_guide_v1.py';

function fail(message){
  console.error(`FAIL guía operativa 1.0: ${message}`);
  process.exit(1);
}

for(const file of [sourcePath,documentPath,builderPath]){
  if(!existsSync(file))fail(`falta ${file}`);
}

const source=readFileSync(sourcePath,'utf8');
const builder=readFileSync(builderPath,'utf8');

const retiredTerm=['BIBLIO','TECA'].join('');
if(new RegExp(`\\b${retiredTerm}(?: DE TARJETAS)?\\b`,'i').test(source)){
  fail('reapareció el vocabulario visible retirado');
}

const requiredText=[
  '# GUÍA OPERATIVA',
  '# PARTE I · EMPEZAR SIN COMPLICACIONES',
  '# PARTE II · REGISTRAR JUGADORES',
  '# PARTE III · DURANTE LA RONDA',
  '# PARTE IV · CERRAR, GUARDAR Y COMPARTIR',
  '# PARTE V · SOLUCIÓN DE ATRANCONES',
  '# GUÍA DE EMERGENCIA DE UNA PÁGINA',
  '# GLOSARIO OPERATIVO',
  '# LISTA FINAL ANTES DE GUARDAR',
  'HISTORIAL DE TARJETAS',
  'REGÍSTRATE · RESPALDO Y RECUPERACIÓN',
];
for(const text of requiredText){
  if(!source.includes(text))fail(`falta el bloque obligatorio: ${text}`);
}

const normalStart=source.indexOf('## 6. RONDA NORMAL · REGISTRO POR VOZ');
const stablefordStart=source.indexOf('## 8. STABLEFORD · REGISTRO CORRECTO');
const confirmationStart=source.indexOf('## 9. CONFIRMACIÓN ANTES DE JUGAR');
if(normalStart<0||stablefordStart<0||confirmationStart<0)fail('no se pudieron aislar ambos registros');

const normal=source.slice(normalStart,stablefordStart);
for(const item of ['1. Nombre.','2. HDCP.','3. Marcas.']){
  if(!normal.includes(item))fail(`Registro General incompleto: ${item}`);
}

const stableford=source.slice(stablefordStart,confirmationStart);
for(const item of ['1-# JUGADOR','2-NOMBRE','HASTA 6 JUGADORES','3-OK']){
  if(!stableford.includes(item))fail(`Registro Stableford incompleto: ${item}`);
}
if(!stableford.includes('Solamente necesita la posición y el nombre.')){
  fail('Stableford no declara su formato Scratch real');
}
if(!stableford.includes('No digas')||!stableford.includes('HDCP;')||!stableford.includes('marcas;')){
  fail('Stableford no advierte que HDCP y marcas no se dictan');
}

for(const item of ['TIMER ON / TIMER OFF','Di **Stop**','FALTA NOMBRE','X · SIN SCORE']){
  if(!source.includes(item))fail(`falta vocabulario operativo: ${item}`);
}

if(!builder.includes('golf-score-card-gt-official-master-1254.jpeg')){
  fail('el constructor no usa el logo maestro oficial');
}
if(!builder.includes('audit_document')||!builder.includes('Retired visible term detected')){
  fail('el constructor no conserva su auditoría interna');
}
if(statSync(documentPath).size<250000)fail('el DOCX parece incompleto o perdió el logo oficial');

console.log('PASS guía operativa 1.0: contenido, vocabulario, registros, logo y artefacto');
