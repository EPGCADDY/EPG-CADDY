import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import "./match-play.js";
import "./four-ball.js";
import artifacts from "./card-artifacts.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/function releaseAiUniversalPlaybackForListening\(\)\{[\s\S]{0,700}aiUniversalTtsObjectUrl=""[\s\S]{0,100}return true/,"El micrófono principal debe conservar la liberación V378 antes de escuchar");
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
assert.match(html,/id="sendFinalCard" hidden>ENVIAR TARJETA DIGITAL<\/button><button class="screen-back-button" id="closeFinalCard">ATRÁS<\/button>/);
assert.match(html,/closeButton\.hidden=!!round\.officiallyClosedAt/,"FINALIZAR RONDA debe estar visible antes del cierre y desaparecer sólo después");
assert.match(html,/\$\("sendFinalCard"\)\.addEventListener\("click",shareOfficialArtifactImage\)/);
assert.match(html,/prepareFinalCardShare\(\)[\s\S]{0,900}GSCCardFileExport\.png\(item\)/,"El envío principal debe preparar un PNG real antes del toque");
assert.match(html,/const actions=\$\("artifactActions"\),sendButton=\$\("sendFinalCard"\);actions\.hidden=true/);
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

const shareStart=html.indexOf("function shareOfficialArtifactImage(){"),shareEnd=html.indexOf("\nfunction openFinalDigitalCard(){",shareStart),shareSource=html.slice(shareStart,shareEnd);
assert.ok(shareStart>0&&shareEnd>shareStart,"La función visible de envío debe existir");
assert.doesNotMatch(shareSource,/async function shareOfficialArtifactImage|await\s+window\.GSCCardFileExport\.png/,"El toque no puede gastar la activación del usuario generando el PNG");
assert.match(html,/async function prepareFinalCardShare\(\)[\s\S]{0,900}await window\.GSCCardFileExport\.png\(item\)/,"El PNG debe prepararse antes del toque");
const actionsAt=html.indexOf('<div class="artifact-actions" id="artifactActions" hidden>'),actionsEnd=html.indexOf('</div>',actionsAt),statusAt=html.indexOf('id="artifactShareStatus"');
assert.ok(statusAt>actionsEnd,"El resultado del envío debe ser visible fuera del panel oculto");
const preparedItem=artifacts.build({...base,mode:"universales",players:["JAIME","JUAN LUIS","JUGADOR 3","JUGADOR 4"].map((name,index)=>({id:`p${index+1}`,name,handicap:0,tee:"Blanco",holes}))}).global,preparedBlob=new Blob(["png"],{type:"image/png"});
let activation=true,shareCalls=0,statusText="",buttonText="",buttonDisabled=false;
const button={get disabled(){return buttonDisabled},set disabled(value){buttonDisabled=value},get textContent(){return buttonText},set textContent(value){buttonText=value}},shareStatus={get textContent(){return statusText},set textContent(value){statusText=value}};
class FakeFile{constructor(parts,name,options){this.parts=parts;this.name=name;this.type=options.type}}
const context={prepared:{id:"round:hash:1",item:preparedItem,blob:preparedBlob},navigator:{canShare:()=>true,share:()=>{assert.equal(activation,true,"navigator.share debe comenzar dentro del toque");shareCalls+=1;return Promise.resolve()}},File:FakeFile,Promise,URL,document:{},console,setTimeout,recordShareEvent:()=>true,officialArtifactShareText:()=>"TARJETA OFICIAL",prepareFinalCardShare:()=>false,$:id=>id==="sendFinalCard"?button:shareStatus,finalCardShareIdentity:()=>"round:hash:1"};
vm.runInNewContext(`let finalCardPreparedShare=prepared;${shareSource};this.runShare=shareOfficialArtifactImage`,context);
const sharePromise=context.runShare();activation=false;const shareResult=await sharePromise;
assert.equal(shareCalls,1);assert.equal(shareResult.ok,true);assert.equal(buttonDisabled,false);assert.equal(buttonText,"ENVIAR TARJETA DIGITAL");assert.equal(statusText,"IMAGEN PNG ENTREGADA A LA APP ELEGIDA");

console.log("PASS V397/R29 · 8 artefactos; PNG preparado antes del toque; hoja nativa con activación vigente; estado visible");
