import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('event-administration-ui.js','utf8'),html=fs.readFileSync('event-administration.html','utf8');
assert.match(html,/body\.gsc-admin-page:has\(#gscWhatsAppInvitation\) main>\[data-gsc-close\]\{visibility:hidden!important\}/);
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
 const context={cachedLocal:{source:'lab'},messages:{},window:{GSCPersonalEvents:{request:async(action,payload)=>{requested={action,...payload};return {ok:!fails,joinCode:'QA12345678',code:'DENIED'}},message:()=> 'ACCESO DENEGADO'},GSCWhatsAppInvitations:{open:options=>{opened++;assert.equal(options.code,'QA12345678');assert.equal(options.eventName,'EPG QA');return true}}}};vm.createContext(context);vm.runInContext(helpers,context);await context.shareEvent(button,{id:'qa-event',name:'EPG QA',event_kind:'tournament',source:'lab'});assert.equal(opened,fails?0:1);assert.equal(requested.eventId,'qa-event');assert.equal(button.disabled,false);assert.equal(status.textContent,fails?'ACCESO DENEGADO':'CÓDIGO QA12345678 · LISTO PARA COMPARTIR');
}
console.log('PASS R167: required dialog CSS, no permission controls, clipboard success/error/duplicate, exact event share and visible denial.');

const directoryHelpers=source.slice(source.indexOf('function administrationRows'),source.indexOf('let refreshSequence'));
const directoryContext={escape:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),encodeURIComponent,cachedLocal:{source:'lab'}};vm.createContext(directoryContext);vm.runInContext(directoryHelpers,directoryContext);
const publicEvents=['lab','production'].flatMap(source=>Array.from({length:20},(_,n)=>({source,id:'event-'+n,name:'Torneo '+n,status:'active'})));
for(const source of ['lab','production']){
 const local={ok:true,source,events:[{id:'event-0',name:'Torneo 0',event_kind:'tournament',authority:'owner'},{id:'private-1',name:'Mi Grupo',event_kind:'private',authority:'creator'}]};
 directoryContext.cachedLocal={source};const rows=directoryContext.administrationRows(local,{ok:true,events:publicEvents});assert.equal(rows.filter(row=>row.event_kind==='tournament').length,40);assert.equal(rows.length,41,'Private group must appear in Administration together with tournaments');
 assert.ok(rows.some(row=>row.event_kind==='private'));assert.equal(rows.filter(row=>row.canAdminister).length,2);assert.equal(rows.filter(row=>row.id==='event-0'&&row.event_kind==='tournament').length,2,'Same ID across environments must remain distinct');
 const ownPrivate=rows.find(row=>row.id==='private-1'&&row.source===source);assert.match(directoryContext.administrationCard(ownPrivate),/ELIMINAR GRUPO/);assert.match(directoryContext.administrationCard(ownPrivate),/directoryEvent=directory_private_/);
 const own=rows.find(row=>row.id==='event-0'&&row.source===source);assert.match(directoryContext.administrationCard(own),/data-delete/);
 const foreign=rows.find(row=>row.id==='event-0'&&row.source!==source);const card=directoryContext.administrationCard(foreign);assert.doesNotMatch(card,/data-share-event|CODE123456/);assert.match(card,/data-delete/);assert.doesNotMatch(card,/<button class="danger" disabled/);assert.match(card,/COMPARTIR · ORGANIZADOR/);assert.match(card,/ELIMINAR TORNEO/);assert.match(card,/directoryEvent=directory_/);assert.doesNotMatch(card,/TORNEO · (LABORATORIO|PRODUCCIÓN)|CONSULTA DE SCORES|ELIMINAR REQUIERE AUTORIZACIÓN DEL ORGANIZADOR/);
 const failed=directoryContext.administrationRows({ok:false},{ok:true,events:publicEvents});assert.equal(failed.length,40);assert.equal(failed.filter(row=>row.canAdminister).length,0);
}
assert.match(source,/LISTA GLOBAL INCOMPLETA/);assert.ok(fs.readFileSync('live-hub.js','utf8').includes("resolveDirectoryEventToken(params.get('directoryEvent'),registeredDirectory)"));
console.log('PASS R171: same 40 global tournament identities plus private owned group in Administration, homonyms and same IDs across origins distinct, foreign actions/codes excluded, failed identity preserves public list, exact Scores target.');
