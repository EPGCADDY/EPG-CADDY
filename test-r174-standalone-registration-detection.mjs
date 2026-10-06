import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html=fs.readFileSync("index-grupal.html","utf8");
const source=html.match(/const standaloneApp=\(\)=>([^;]+);/);
assert.ok(source,"La aplicación debe definir standaloneApp");
assert.doesNotMatch(source[1],/matchesigator/,"No debe quedar la expresión truncada que lanzaba TypeError");
function probe(windowValue){
  const app=vm.runInNewContext("()=>("+source[1]+")",{window:windowValue});
  return app();
}
assert.equal(probe({GSC_NATIVE_PLATFORM:{name:"ios"},navigator:{},matchMedia:()=>({matches:false})}),true,"La app nativa debe detectarse");
assert.equal(probe({navigator:{},matchMedia:()=>({matches:true})}),true,"Una PWA instalada debe detectarse");
assert.equal(probe({navigator:{standalone:true},matchMedia:()=>({matches:false})}),true,"Safari instalado debe detectarse");
assert.equal(probe({navigator:{},matchMedia:()=>({matches:false})}),false,"El navegador web normal debe abrir el registro sin lanzar excepción");
assert.equal(probe({navigator:{}}),false,"Debe tolerar matchMedia no disponible");
console.log("PASS R174: detección nativa, PWA, iOS standalone y navegador normal.");
