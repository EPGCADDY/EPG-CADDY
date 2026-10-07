import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('event-administration-ui.js','utf8');
const helpers=source.slice(source.indexOf('function globalRoundCard('),source.indexOf('async function refresh('));
for(const sourceEnvironment of ['lab','production'])for(const eventKind of ['tournament','private'])for(const ok of [true,false]){
 const group={id:'selected-round',group_label:'Group <test>',source:sourceEnvironment,event_kind:eventKind},sibling={...group,id:'sibling-round'};
 const elements={},requests=[];let content='',closed=0,refreshed=0;
 const context=vm.createContext({cachedLocal:{source:'lab'},cachedDirectory:{groups:[group,sibling]},escape:s=>String(s).replaceAll('<','&lt;'),open:html=>{content=html},$:id=>elements[id]||=(id==='actionDialog'?{close:()=>closed++}:{disabled:false}),call:async(action,payload)=>{requests.push({action,payload});return{ok}},showStatus(){},refresh:async()=>refreshed++});
 vm.runInContext(helpers,context);
 assert.match(context.globalRoundCard(group,[]),/ELIMINAR RONDA/);
 context.removeRound(group);assert.match(content,/CONFIRMAR ELIMINAR RONDA/);assert.equal(requests.length,0);
 elements.cancelRoundDelete.onclick();assert.equal(closed,1);assert.equal(requests.length,0);closed=0;
 context.removeRound(group);elements.confirmRoundStep.onclick();assert.match(content,/CONFIRMACIÓN FINAL/);assert.equal(requests.length,0);
 elements.cancelRoundDelete.onclick();assert.equal(closed,1);assert.equal(requests.length,0);closed=0;
 context.removeRound(group);elements.confirmRoundStep.onclick();const pending=elements.confirmRoundDelete.onclick();await elements.confirmRoundDelete.onclick();await pending;
 assert.equal(requests.length,1,'Double tap sends one request after both confirmations');
 assert.equal(requests[0].action,sourceEnvironment==='lab'?'delete-round':'remote-delete-round');
 assert.equal(requests[0].payload.roundId,group.id);assert.equal(requests[0].payload.eventKind,eventKind);assert.equal(requests[0].payload.confirmedTwice,true);
 assert.equal(closed,ok?1:0);assert.equal(refreshed,ok?1:0);assert.equal(elements.confirmRoundDelete.disabled,ok);
 assert.equal(context.cachedDirectory.groups.some(row=>row.id===group.id),!ok);assert.ok(context.cachedDirectory.groups.some(row=>row.id===sibling.id));
 context.cachedLocal.source='production';assert.doesNotMatch(context.globalRoundCard(group,[]),/data-delete-round/);
}
assert.match(source,/querySelectorAll\('\[data-delete-round\]'\)/);
console.log('PASS R185 round delete UI: every LAB round, both origins/kinds, two confirmations, cancel at either step, one request on double tap, failure retry, exact selection, sibling retained.');
