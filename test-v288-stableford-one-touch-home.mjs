import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");

assert.match(html,/V288-STABLEFORD-ONE-TOUCH-HOME-20260823/);
assert.match(html,/<button class="back-registration-button" id="backToRegistrationButton" aria-label="Atrás: volver a la pantalla principal" title="Volver a la pantalla principal">ATRÁS<\/button>/);
assert.match(html,/function openNewRoundDraft\(\)[\s\S]*?persist\(\);[\s\S]*?if\(sfEmergency\)window\.history\.replaceState\(null,"",window\.location\.pathname\);[\s\S]*?dateSetup\(\);[\s\S]*?openSetup\("new"\);[\s\S]*?return true;/);
assert.match(html,/function openSetup\(mode="new"\)[\s\S]*?renderDraft\(\);[\s\S]*?showStep1\(\);[\s\S]*?\$\("setupOverlay"\)\.classList\.add\("visible"\);/);
assert.match(html,/\$\("backToRegistrationButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openNewRoundDraft\(\):openCurrentRoundDataEditor\(\)\);/);
assert.doesNotMatch(html,/\$\("backToRegistrationButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openStablefordDataEditor\(\)/);

const functionStart=html.indexOf("function openNewRoundDraft(){");
const functionEnd=html.indexOf("\nfunction closeSetup(){",functionStart);
assert.ok(functionStart>0&&functionEnd>functionStart,"No se encontró la transición de regreso al inicio");
const functionSource=html.slice(functionStart,functionEnd);
const calls=[];
const openNewRoundDraft=new Function("persist","sfEmergency","window","dateSetup","openSetup",`${functionSource};return openNewRoundDraft`)(
  ()=>calls.push(["persist"]),
  true,
  {history:{replaceState:(...args)=>calls.push(["replaceState",...args])},location:{pathname:"/index-grupal.html"}},
  ()=>calls.push(["dateSetup"]),
  mode=>calls.push(["openSetup",mode])
);
assert.equal(openNewRoundDraft(),true);
assert.deepEqual(calls,[
  ["persist"],
  ["replaceState",null,"","/index-grupal.html"],
  ["dateSetup"],
  ["openSetup","new"]
]);

console.log("PASS V288 · ATRÁS vuelve de la tarjeta Stableford al inicio en un toque y conserva la ronda");
