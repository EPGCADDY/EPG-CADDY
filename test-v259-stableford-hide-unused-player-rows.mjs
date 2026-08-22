import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V(?:259-STABLEFORD-HIDE-UNUSED-PLAYER-ROWS|260-STABLEFORD-ROUND-POINTS-PLAYER-RETURN|261-REGISTRATION-SIMPLIFIED-STABLEFORD-LABELS)-20260822/);

// El registro manual inicial conserva exactamente seis espacios opcionales.
assert.equal((html.match(/<input[^>]+data-stableford-name="[0-5]"/g)||[]).length,6);

// Una vez iniciada la ronda, las tres vistas Stableford iteran sólo los jugadores registrados.
assert.match(html,/return round\.players\.map\(\(p,i\)=>/);
assert.doesNotMatch(html,/function stablefordManualPlayerRows\(selectedHole\)\{[\s\S]*?Array\.from\(\{length:6\}/);
assert.match(html,/round\.players\.forEach\(\(player,i\)=>\{card\+=stablefordPlayerBlock\(player,i\+1\)\}\)/);
assert.match(html,/\$\("summaryBody"\)\.innerHTML=round\.players\.map\(p=>/);

// Ejecuta el generador real con grupos de 1 a 6 y comprueba que nunca crea filas adicionales.
const source=html.match(/function stablefordManualPlayerRows\(selectedHole\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(source,"No se encontró el generador de filas manuales Stableford");
for(let count=1;count<=6;count++){
  const players=Array.from({length:count},(_,i)=>({name:`JUGADOR ${i+1}`,holes:{}}));
  const round={players};
  const stablefordTotals=()=>({count:0,points:0});
  const GSCStableford={holeResult:()=>({recorded:false,gross:null})};
  const factory=new Function("round","stablefordTotals","FRONT","BACK","ALL","GSCStableford","PAR","escapeHtml",`${source};return stablefordManualPlayerRows;`);
  const renderRows=factory(round,stablefordTotals,[],[],[],GSCStableford,Array(18).fill(4),value=>String(value));
  const rendered=renderRows(1);
  assert.equal((rendered.match(/class="sfGridName"/g)||[]).length,count,`Nombres visibles para ${count} jugadores`);
  assert.equal((rendered.match(/class="sfGridGross"/g)||[]).length,count,`Gross visibles para ${count} jugadores`);
  assert.doesNotMatch(rendered,new RegExp(`placeholder="JUGADOR ${count+1}"`),`No debe aparecer el jugador ${count+1}`);
}

console.log("PASS V259 · registro manual 1-6; filas no registradas invisibles en Plan B, tarjeta y resumen");
