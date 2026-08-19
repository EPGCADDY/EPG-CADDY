import fs from 'node:fs';

const html=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const manual=fs.readFileSync(new URL('./GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md',import.meta.url),'utf8');
const build=html.match(/gscg-build" content="V(\d+)-/i)?.[1];
const documented=manual.match(/\*\*Versión documentada:\*\* V(\d+)/i)?.[1];
if(!build||!documented)throw new Error('No se pudo identificar la versión de código o manual');
if(build!==documented)throw new Error(`Manual desincronizado: código V${build}, manual V${documented}`);
if(!manual.includes(`App V${build}`))throw new Error(`Falta App V${build} en el historial del manual`);
console.log(`PASS sincronización código/manual V${build}`);
