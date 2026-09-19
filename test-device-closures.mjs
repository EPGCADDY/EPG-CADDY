import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync('device-closures.js','utf8');
function setup(voices){
 const spoken=[],timers=new Map(),listeners=new Map(),display={textContent:''};let seq=0;
 const ctx={document:{getElementById:()=>display},speechSynthesis:{getVoices:()=>voices,speak:u=>spoken.push(u),cancel(){},addEventListener:(k,f)=>listeners.set(k,f),removeEventListener:(k,f)=>{if(listeners.get(k)===f)listeners.delete(k)}},SpeechSynthesisUtterance:class{constructor(text){this.text=text}},setTimeout:(fn,ms)=>{timers.set(++seq,{fn,ms});return seq},clearTimeout:id=>timers.delete(id)};
 vm.runInNewContext(source,ctx);return{api:ctx.GSCDeviceClosures,spoken,timers,listeners,display};
}
const local={lang:'es-MX',localService:true};
const a=setup([local]);let p=a.api.speak('Primera vuelta 40'),q=a.api.speak('Segunda vuelta 42');
assert.equal(a.spoken.length,1);a.spoken[0].onstart();a.spoken[0].onend();assert.equal(await p,true);assert.equal(a.spoken.length,2);a.api.cancel();assert.equal(await q,false);
p=a.api.speak('Total 82');a.spoken[2].onend();assert.equal(await p,true);
p=a.api.speak('Sin inicio');[...a.timers.values()].find(t=>t.ms===8000).fn();assert.equal(await p,false);assert.match(a.display.textContent,/Sin inicio/);
const voices=[],b=setup(voices);p=b.api.speak('Primera vuelta 44');assert.equal(b.spoken.length,0);voices.push(local);b.listeners.get('voiceschanged')();assert.equal(b.spoken.length,1);b.spoken[0].onend();assert.equal(await p,true);
const c=setup([{lang:'es-MX',localService:false}]);p=c.api.speak('Primera vuelta 44');[...c.timers.values()][0].fn();assert.equal(await p,false);assert.equal(c.spoken.length,0);assert.match(c.display.textContent,/Primera vuelta 44/);
const d=setup([local]);p=d.api.speak('Resultado');d.spoken[0].onerror({error:'not-allowed'});assert.equal(await p,false);assert.match(d.display.textContent,/bloqueó/);
const e=setup([]);p=e.api.speak('Cancelado');e.api.cancel();assert.equal(await p,false);assert.equal(e.listeners.size,0);assert.equal(e.timers.size,0);
console.log('PASS voz local: carga tardía, rechazo remoto, cola, cancelación, inicio bloqueado, resultado visible y recuperación');
