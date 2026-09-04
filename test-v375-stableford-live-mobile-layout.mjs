import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url),viewer=require("./live-view.js");
const holes={};
for(let hole=1;hole<=18;hole++)holes[hole]={hole,par:4,gross:hole%3+3,stablefordPoints:hole%4,updatedAt:"2026-09-04T03:30:00Z"};
const players=["JAIME KIRSTE","FITO CORDON","JR CALIX","GIORGI BRUNI"].map((name,index)=>({id:`live-player-${index+1}`,name,handicap:0,tee:"Blanco",holes:Object.values(holes),totals:{}}));
const snapshot={mode:"stableford",course:"EL PULTÉ GOLF",playedAt:"2026-09-04T03:00:00Z",status:"active",courseHoles:Array.from({length:18},(_,index)=>({hole:index+1,par:4,yards:300+index})),players};
const markup=viewer.streamCard({id:"stream-v375",groupLabel:"GRUPO LIVE",snapshot});
const html=fs.readFileSync("live.html","utf8"),worker=fs.readFileSync("service-worker.js","utf8");

for(const required of ["stable-score-shell","stable-fixed","stable-hole-scroll","stable-holes","stable-summary-shell","stable-summary-fixed","stable-summary-scroll","stable-summary-values"])assert.match(markup,new RegExp(required),`falta ${required}`);
assert.doesNotMatch(markup,/class="stable-live"|class="score-scroll stable-scroll"/,"Stableford no puede volver a una tabla única superpuesta");
assert.equal((markup.match(/class="stable-player"/g)||[]).length,players.length,"cada jugador aparece una sola vez en el panel fijo");
assert.equal((markup.match(/class="stable-label">GROSS/g)||[]).length,players.length);
assert.equal((markup.match(/class="stable-label">PUNTOS/g)||[]).length,players.length);
assert.equal((markup.match(/<th>GROSS IN<\/th>/g)||[]).length,1);
assert.ok(markup.indexOf("GROSS IN")<markup.indexOf("GROSS OUT"));
assert.ok(markup.indexOf("PUNTOS IN")<markup.indexOf("PUNTOS OUT"));
assert.doesNotMatch(markup,/NETO|RESULTADO|\+ \/ −/);
assert.match(html,/--stable-player:112px;--stable-label:68px/,"móvil reserva un panel izquierdo compacto y determinista");
assert.match(html,/\.stable-score-shell\{display:grid;grid-template-columns:calc\(var\(--stable-player\) \+ var\(--stable-label\)\) minmax\(0,1fr\)/);
assert.match(html,/\.stable-hole-scroll\{min-width:0;overscroll-behavior-x:contain\}/);
assert.match(html,/\.stable-summary h3\{[^}]*text-align:center/,"PUNTOS permanece fuera del carril desplazable");
assert.doesNotMatch(html,/\.stable-live th:first-child\{position:sticky|\.stable-live th:nth-child\(2\)\{position:sticky/,"Stableford no usa celdas sticky superpuestas");
assert.match(worker,/v375-stableford-live-mobile-layout/);
console.log("PASS V375 · panel fijo Stableford y carriles móviles separados sin superposición");
