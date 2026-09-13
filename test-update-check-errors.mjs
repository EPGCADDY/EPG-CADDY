import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=readFileSync('index-grupal.html','utf8');
const code=html.slice(html.indexOf('const CURRENT_APP_BUILD='),html.indexOf('$("mandatoryUpdateButton").addEventListener("click",installMandatoryUpdate)'));
const release='V407-R30-DIGITAL-CARD-SHARE-20260913';
function setup(response){
 const elements=Object.fromEntries(['mandatoryUpdateButton','mandatoryUpdateAction','mandatoryUpdate'].map(id=>[id,{disabled:false,dataset:{},textContent:'',setAttribute(){},classList:{add(){},remove(){}}}]));
 const context=vm.createContext({URL,console:{warn(){}},document:{hidden:false,querySelector:()=>({content:release})},location:{origin:'https://golf-sc-gt-lab.vercel.app',pathname:'/index-grupal.html'},fetch:async()=>{if(response instanceof Error)throw response;return response},$:id=>elements[id]});
 vm.runInContext(code,context);return {context,elements};
}
const valid=r=>({ok:true,status:200,url:'https://golf-sc-gt-lab.vercel.app/index-grupal.html',text:async()=>`<meta name="gscg-release" content="${r}">`});
for(const [name,response,expected] of [
 ['misma versión',valid(release),'ACTUALIZADO'],
 ['nueva versión con HTML compacto',valid('NEXT'),'ACTUALIZAR'],
 ['sesión vencida',{...valid(release),url:'https://golf-sc-gt-lab.vercel.app/access.html'},'INICIAR SESIÓN'],
 ['401',{ok:false,status:401},'INICIAR SESIÓN'],
 ['500',{ok:false,status:500},'REINTENTAR'],
 ['HTML inválido',{...valid(release),text:async()=>'<html>error</html>'},'REINTENTAR'],
 ['sin red',new Error('offline'),'REINTENTAR']]){
 const {context,elements}=setup(response);await vm.runInContext('syncPublishedAppVersion()',context);
 assert.equal(elements.mandatoryUpdateAction.textContent,expected,name);
 assert.equal(elements.mandatoryUpdateButton.disabled,expected==='ACTUALIZADO',name);
 console.log('PASS '+name+' → '+expected);
}
const {context,elements}=setup(valid(release));
await vm.runInContext('syncPublishedAppVersion()',context);
context.fetch=async()=>{throw new Error('offline')};
await vm.runInContext('syncPublishedAppVersion()',context);
assert.equal(elements.mandatoryUpdateAction.textContent,'REINTENTAR');
assert.equal(vm.runInContext('pendingPublishedBuild',context),'');
console.log('PASS una verificación anterior no oculta un fallo posterior');
