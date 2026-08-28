import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const root='CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V356_TRAFICO_CLIMA';
const pngPath=`${root}/REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356_4K.png`;
const svgPath=`${root}/FUENTE_REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356_4K.svg`;
const manifestPath=`${root}/MANIFIESTO_REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356.md`;
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');
const png=readFileSync(pngPath),svg=readFileSync(svgPath),manifest=readFileSync(manifestPath,'utf8');

assert.equal(png.toString('hex',0,8),'89504e470d0a1a0a','PNG signature');
assert.equal(png.readUInt32BE(16),2160,'4K portrait width');
assert.equal(png.readUInt32BE(20),4320,'4K portrait height');
let offset=8,density=null;
while(offset<png.length){const length=png.readUInt32BE(offset),type=png.toString('ascii',offset+4,offset+8);if(type==='pHYs'){density={x:png.readUInt32BE(offset+8),y:png.readUInt32BE(offset+12),unit:png[offset+16]};break;}offset+=12+length;}
assert.deepEqual(density,{x:11811,y:11811,unit:1},'300 dpi metadata');
assert.equal(sha256(png),'6e513e163793a55cabd3248f64eb07551d9d98a3f979ff88978f945a65ba5ca4','sealed PNG');
assert.equal(sha256(svg),'1a641e71dfbdf731097492dd2c761e4b49e350b9cf50913f35f2faf58078cc2d','sealed SVG');
for(const token of ['30 de 32 criterios','93.75%','Producción: intacta','no equivale a 100%','RC-027',sha256(png),sha256(svg)])assert.ok(manifest.includes(token),`manifest token ${token}`);
for(const path of ['ROADMAP_OVERALL.md','ROADMAP_A_DETALLE.md','CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md','CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/CASOS_TERMINADOS.md']){
  const content=readFileSync(path,'utf8');
  for(const token of ['V356_TRAFICO_CLIMA','REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356_4K.png','FUENTE_REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356_4K.svg','MANIFIESTO_REPORTE_CONFIABILIDAD_TRAFICO_CLIMA_V356.md'])assert.ok(content.includes(token),`${path} ${token}`);
}
console.log('PASS V356 traffic/weather report evidence: 4K 300dpi hashes double inventory production intact');
