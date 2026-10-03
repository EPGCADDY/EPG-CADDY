import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('shortcuts-ui.js','utf8');
const render=source.slice(source.indexOf('function render()'),source.indexOf('function organizer()'));
let html;
vm.runInNewContext(render+';render()',{hubState:()=>({}),page:()=> 'scorecard',item:(action,label)=>`<button data-shortcut="${action}">${label}</button>`,$:()=>({set innerHTML(value){html=value},querySelectorAll:()=>[]})});
const actions=[...html.matchAll(/data-shortcut="([^"]+)"/g)].map(m=>m[1]);
assert.equal(actions[actions.indexOf('manual')+1],'registration');
assert.equal(actions.filter(a=>a==='registration').length,1);
const dispatch=source.slice(source.indexOf('function act(action)'),source.indexOf('function normalizeCloseControls()'));
let opened=0,closed=0,navigated;
const round={id:'active',scores:[5,4],clock:'unchanged'};
const before=JSON.stringify(round);
vm.runInNewContext(dispatch+';act("registration")',{root:{openRegistrationPreservingActiveRound(){opened++}},page:()=> 'scorecard',hubState:()=>({}),close(){closed++},nav:url=>navigated=url});
assert.equal(opened,1);assert.equal(closed,1);assert.equal(navigated,undefined);assert.equal(JSON.stringify(round),before);
for(const surface of ['manual','hub','standalone']){
 vm.runInNewContext(dispatch+';act("registration")',{root:{},page:()=>surface,hubState:()=>({}),close(){},nav:url=>navigated=url});
 assert.equal(navigated,'/index-grupal.html?manual_action=registration');
}
const app=fs.readFileSync('index-grupal.html','utf8');
assert(app.includes('"registration":()=>openRegistrationPreservingActiveRound()'));
const normalize=source.slice(source.indexOf('function normalizeCloseControls()'),source.indexOf('function start()'));
let closeCalls=0;const button={textContent:'X',label:null,onclick(){closeCalls++},hasAttribute(){return this.label!==null},setAttribute(_,v){this.label=v}};
vm.runInNewContext(normalize+';normalizeCloseControls();normalizeCloseControls()',{root:{document:{querySelectorAll:()=>[button]}}});
assert.equal(button.textContent,'×');assert.equal(button.label,'Cerrar');button.onclick();assert.equal(closeCalls,1);
const admin=fs.readFileSync('event-administration.html','utf8');assert(admin.includes('/shortcuts-ui.js'));assert(admin.includes('data-gsc-menu'));assert(admin.includes('data-gsc-close'));
console.log('PASS R157: Registro follows Manual once; all routes use existing non-destructive opening; close normalization is idempotent and retains action; Administration has shared navigation. Not a visual/browser PASS.');
