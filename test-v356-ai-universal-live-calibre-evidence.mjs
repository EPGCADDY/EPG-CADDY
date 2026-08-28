import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const report='CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/V356_AI_UNIVERSAL_CALIBRE/REPORTE_BATERIA_CALIBRE_AI_UNIVERSAL_V356.md';
const text=readFileSync(report,'utf8');
for(const token of ['Resultado general:** `FAIL`','0/8 = 0%','1/9 = 11.11%','429 credit_balance_exhausted','LOCAL_GOLF_STRATEGY','Producción permanece intacta'])assert.ok(text.includes(token),token);
for(const path of ['ROADMAP_OVERALL.md','ROADMAP_A_DETALLE.md','CONTROL_PROYECTO_SCIRE/MAPA_MAESTRO_DE_ARCHIVOS.md','CONTROL_PROYECTO_SCIRE/03_CASOS_TERMINADOS_Y_EVIDENCIA/CASOS_TERMINADOS.md','GOLF_SCORE_CARD_GT_PENDING_MATRIX.md','CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md','CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/REGISTRO_REINCIDENCIAS_CALIDAD.md']){
  const content=readFileSync(path,'utf8');
  assert.ok(content.includes('V356_AI_UNIVERSAL_CALIBRE'),`${path} folder`);
  assert.ok(content.includes('REPORTE_BATERIA_CALIBRE_AI_UNIVERSAL_V356.md'),`${path} report`);
}
console.log('PASS V356 AI Universal live calibre evidence: FAIL preserved until funded provider and live rebattery');
