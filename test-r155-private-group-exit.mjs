import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('private-rounds.js','utf8'),app=fs.readFileSync('index-grupal.html','utf8');
const scores=source.slice(source.indexOf('  function openScores(value)'),source.indexOf('  async function list('));
const value={id:'card',configured:true,players:[{id:'p',holes:{1:{gross:5,net:4}}}],timer:{elapsed:3900}},before=JSON.stringify(value);
let shown;const empty={round:null,ACTIVE:'active',read:()=>null,saved:()=>null,scores(){throw Error('No group must not render personal card as group')},show:(title,content)=>shown={title,content}};
vm.runInNewContext(scores,empty);empty.openScores(value);assert.equal(shown.title,'SCORES MI GRUPO');assert.match(shown.content,/NO PERTENECES A NINGÚN GRUPO/);assert.equal(JSON.stringify(value),before);
const leave=source.slice(source.indexOf('  async function leaveGroup(value)'),source.indexOf('  function openScores(value)'));
for(const ok of [true,false]){
 const round={...JSON.parse(before),personalEventId:'group',liveGroupLabel:'PLAYERS',tournament:{name:'GROUP'}},players=JSON.stringify(round.players),timer=JSON.stringify(round.timer),selection={personal:true,id:'group',eventKind:'private',roundId:'card'},store=new Map([['gsc-tournament-connect-selection-v1',JSON.stringify(selection)]]);let disconnected=0,persisted=0;
 const context={round:null,ACTIVE:'active',KEY:'legacy',URL,read:key=>key==='gsc-tournament-connect-selection-v1'?JSON.parse(store.get(key)||'null'):null,saved:()=>null,show:(title,content)=>shown={title,content},status(){},error:String,root:{GSCPersonalEvents:{request:async(action,payload)=>{assert.equal(action,'leave');assert.equal(payload.eventId,'group');return{ok,code:'NETWORK_ERROR'}},message:String,sync:async()=>({ok:true})},GSCLiveControl:{disconnectPrivateRound:async(r,detached)=>{assert.equal(r,round);assert.equal(detached,true);disconnected++;return{ok:true}}},localStorage:{removeItem:key=>store.delete(key)},GSCPrivateGroupLeft:()=>persisted++}};
 vm.runInNewContext(leave,context);const result=await context.leaveGroup(round);assert.equal(result.ok,ok);assert.equal(JSON.stringify(round.players),players);assert.equal(JSON.stringify(round.timer),timer);
 if(ok){assert.equal(store.has('gsc-tournament-connect-selection-v1'),false);assert.equal(round.personalEventId,undefined);assert.equal(disconnected,1);assert.equal(persisted,1)}else{assert.equal(store.has('gsc-tournament-connect-selection-v1'),true);assert.equal(round.personalEventId,'group');assert.equal(disconnected,0)}
}
const footer=app.slice(app.indexOf('<div class="round-actions"><button id="privateGroupScoresButton"'),app.indexOf('</div>',app.indexOf('<div class="round-actions"><button id="privateGroupScoresButton"')));
assert.match(footer,/INGRESAR A<br>GRUPO<\/button><button[^>]*id="leaveCurrentPrivateGroup"[^>]*>SALIR DEL<br>GRUPO/);
console.log('PASS R155 no synthetic local group; exact empty message; adjacent join/leave; leave preserves card scores/timer; network failure preserves membership for retry.');
