import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('event-administration-ui.js','utf8'),html=fs.readFileSync('event-administration.html','utf8');
assert.match(html,/href="\/scores-ui.css"/);
assert.doesNotMatch(html,/administrativePermissions|organizerPermissions|ACTIVAR MI PERMISO/);
assert.doesNotMatch(source,/data-grants|data-revoke|function grants|function organizers/);
const helpers=source.slice(source.indexOf('function eventStatus'),source.indexOf('let requestedEventOpened'));
for(const fails of [false,true]){
 let copied='',resolveWrite;const status={textContent:''},button={disabled:false,textContent:'COPIAR ID',closest:()=>({querySelector:()=>status})};
 const context={navigator:{clipboard:{writeText:code=>{copied=code;return new Promise((resolve,reject)=>{resolveWrite=()=>fails?reject(Error('denied')):resolve()})}}},messages:{},window:{}};vm.createContext(context);vm.runInContext(helpers,context);
 const pending=context.copyTournamentId(button,'QA12345678');assert.equal(button.disabled,true);assert.equal(button.textContent,'COPIANDO…');assert.notEqual(status.textContent,'ID COPIADO');await context.copyTournamentId(button,'DUPLICATE');assert.equal(copied,'QA12345678');resolveWrite();await pending;
 assert.equal(button.disabled,false);assert.equal(status.textContent,fails?'NO SE PUDO COPIAR · REINTENTA':'ID COPIADO');assert.equal(button.textContent,fails?'COPIAR ID':'ID COPIADO ✓');
}
for(const fails of [false,true]){
 const status={textContent:''},button={disabled:false,closest:()=>({querySelector:()=>status})};let opened=0,requested;
 const context={messages:{},window:{GSCPersonalEvents:{request:async(action,payload)=>{requested={action,...payload};return {ok:!fails,joinCode:'QA12345678',code:'DENIED'}},message:()=> 'ACCESO DENEGADO'},GSCWhatsAppInvitations:{open:options=>{opened++;assert.equal(options.code,'QA12345678');assert.equal(options.eventName,'EPG QA');return true}}}};vm.createContext(context);vm.runInContext(helpers,context);await context.shareTournament(button,{id:'qa-event',name:'EPG QA'});assert.equal(opened,fails?0:1);assert.equal(requested.eventId,'qa-event');assert.equal(button.disabled,false);assert.equal(status.textContent,fails?'ACCESO DENEGADO':'');
}
console.log('PASS R167: required dialog CSS, no permission controls, clipboard success/error/duplicate, exact event share and visible denial.');
