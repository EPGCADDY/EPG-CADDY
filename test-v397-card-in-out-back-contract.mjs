import assert from "node:assert/strict";
import fs from "node:fs";
import "./match-play.js";
import "./four-ball.js";
import artifacts from "./card-artifacts.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const holes=Object.fromEntries(Array.from({length:18},(_,index)=>{
  const hole=index+1,gross=hole<=9?4:5,net=gross;
  return[hole,{hole,par:4,gross,net,strokes:0,status:null,points:hole<=9?2:1}];
}));
const players=["JAIME","FITO"].map((name,index)=>({id:`p${index+1}`,name,handicap:0,tee:"Blanco",holes}));
const base={status:"officially_closed",sha256:"c".repeat(64),version:1,course:"El Pulté",tournament:{name:"AUDITORÍA V397"},playedAt:"2026-09-06T18:00:00.000Z",players};
const cases=[
  ["GENERAL",{...base,mode:"general"}],
  ["STABLEFORD",{...base,mode:"stableford",stablefordCategory:"senior",stablefordRoundNumber:1}],
  ["MATCH PLAY",{...base,mode:"match_play",matchPlay:{resultLabel:"MATCH EMPATADO",decidedAt:18}}],
  ["FOUR BALL",{...base,mode:"four_ball",fourBall:{resultLabel:"PAREJA VERDE",decidedAt:18}}]
];

for(const [label,snapshot] of cases){
  const generated=artifacts.build(snapshot);
  for(const [kind,item] of [["GLOBAL",generated.global],["PERSONAL",generated.personal[0]]]){
    assert.match(item.html,/GROSS IN<br>1–9<\/th><th>GROSS OUT<br>10–18<\/th><th>GROSS TOTAL<br>1–18/);
    assert.match(item.html,/<td>36<\/td><td>45<\/td><td>81<\/td>/,`${label} ${kind}: IN=36, OUT=45, TOTAL=81`);
    if(label==="STABLEFORD")assert.match(item.html,/<td>18<\/td><td>9<\/td><td class="points">27<\/td>/);
  }
}

assert.doesNotMatch(html,/id="librarySendDigital"/);
assert.match(html,/id="artifactViewerBack"/);
assert.match(html,/id="artifactViewerSend"/);
assert.match(html,/id="sendFinalCard">ENVIAR TARJETA DIGITAL<\/button><button class="screen-back-button" id="closeFinalCard">ATRÁS<\/button>/);
assert.match(html,/\$\("sendFinalCard"\)\.addEventListener\("click",\(\)=>shareOfficialArtifact\(officialArtifacts\(\)\.global\)\)/);
assert.match(html,/const actions=\$\("artifactActions"\);actions\.hidden=true/);
assert.match(html,/window\.opener\.focus\(\);window\.close\(\)/);
assert.match(html,/GSCCardFileExport\.png\(item\)/);
assert.match(html,/navigator\.canShare/);
assert.match(html,/round\.configured&&!round\.provisional/);
assert.match(html,/<th>GROSS IN<\/th><th>GROSS OUT<\/th><th>GROSS TOTAL<\/th>/);
assert.match(html,/<th>PUNTOS IN<\/th><th>PUNTOS OUT<\/th><th>PUNTOS TOTAL<\/th>/);
assert.match(html,/FRONT\.map[\s\S]{0,180}<th class="sum-col">IN<\/th>\$\{BACK\.map[\s\S]{0,180}<th class="sum-col">OUT<\/th><th class="sum-col">TOTAL<\/th>/,"La tabla principal debe colocar IN después del hoyo 9 y OUT después del hoyo 18");
assert.match(html,/\$\{metric\} IN<\/b><b[^>]*>\$\{metric\} OUT<\/b><b[^>]*>\$\{metric\} TOTAL<\/b>/,"El control manual debe rotular el primer acumulado como IN y el segundo como OUT");
assert.doesNotMatch(html,/\$\{metric\} OUT<\/b><b[^>]*>\$\{metric\} IN<\/b>/,"El control manual no puede volver a invertir OUT e IN");
assert.equal((html.match(/>REGÍSTRATE<\/button>/g)||[]).length,1,"REGÍSTRATE debe existir una sola vez");
assert.match(html,/id="accountBackupButtonSetup"[^>]*data-account-entry>REGÍSTRATE<\/button>/,"REGÍSTRATE debe permanecer únicamente en la pantalla principal");
assert.doesNotMatch(html,/id="accountBackupButton"(?:\s|>)/,"La tarjeta operativa no puede mostrar REGÍSTRATE");
assert.doesNotMatch(html,/id="accountBackupButtonStableford"(?:\s|>)/,"Stableford no puede mostrar REGÍSTRATE dentro de su tarjeta");
assert.match(html,/if\(back\)back\.classList\.toggle\("hidden",!round\.configured\)/,"Práctica debe mostrar ATRÁS");
assert.match(html,/isStablefordRound\(\)\|\|round\.provisional\?openNewRoundDraft\(\):openCurrentRoundDataEditor\(\)/,"ATRÁS de Práctica debe volver a principal");

console.log("PASS V397 · 8 artefactos con IN 1–9, OUT 10–18, TOTAL 1–18; visor con ATRÁS + ENVÍO; REGÍSTRATE sólo en principal");
