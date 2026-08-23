import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V273-SAN-ISIDRO-ALTA-VISTA-OFFICIAL-20260823/);

// El registro manual inicial conserva exactamente seis espacios opcionales.
assert.equal((html.match(/<input[^>]+data-stableford-name="[0-5]"/g)||[]).length,6);

// Una vez iniciada la ronda, las tres vistas Stableford iteran sólo los jugadores registrados.
assert.match(html,/return round\.players\.map\(\(player,index\)=>/);
assert.doesNotMatch(html,/function roundManualPlayerRows\(selectedHole\)\{[\s\S]*?Array\.from\(\{length:6\}/);
assert.match(html,/round\.players\.forEach\(\(player,i\)=>\{card\+=stablefordPlayerBlock\(player,i\+1\)\}\)/);
assert.match(html,/\$\("summaryBody"\)\.innerHTML=round\.players\.map\(p=>/);

// Ejecuta el generador real con grupos de 1 a 6 y comprueba que nunca crea filas adicionales.
const source=html.match(/function roundManualPlayerRows\(selectedHole\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(source,"No se encontró el generador de filas del control manual común");
for(let count=1;count<=6;count++){
  const players=Array.from({length:count},(_,i)=>({id:`p${i+1}`,name:`JUGADOR ${i+1}`,holes:{}}));
  const round={players,officiallyClosedAt:null};
  const factory=new Function("round","manualSegmentValue","manualHoleResult","FRONT","BACK","ALL","escapeHtml",`${source};return roundManualPlayerRows;`);
  const renderRows=factory(round,()=>({count:0,total:0}),()=>({recorded:false,gross:null}),[],[],[],value=>String(value));
  const rendered=renderRows(1);
  assert.equal((rendered.match(/class="round-grid-name"/g)||[]).length,count,`Nombres visibles para ${count} jugadores`);
  assert.equal((rendered.match(/class="round-grid-gross"/g)||[]).length,count,`Gross visibles para ${count} jugadores`);
  assert.doesNotMatch(rendered,new RegExp(`JUGADOR ${count+1}`),`No debe aparecer el jugador ${count+1}`);
}

console.log("PASS V259/V267 · control manual común 1-6 sin filas ocultas adicionales");
