import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync('index-grupal.html','utf8');
const controls=html.match(/<div class="round-actions">(<button id="privateGroupScoresButton"[\s\S]*?)<\/div>/)[1];
assert(controls.indexOf('privateGroupScoresButton')<controls.indexOf('roundTournamentScoresButton'));
assert(controls.indexOf('roundTournamentScoresButton')<controls.indexOf('joinCurrentPrivateGroup'));
assert.match(controls,/aria-label="INGRESAR A GRUPO">INGRESAR A<br>GRUPO/);
const personal=fs.readFileSync('personal-events.js','utf8');const source=personal.slice(personal.indexOf(' async function joinTournament('),personal.indexOf(' async function viewDirectoryEvent('));
for(const creator of [false,true]){
 const round={id:'started',configured:true,mode:'general',course:'EL PULTÉ GOLF',players:[{id:'p1',name:'LATE',holes:{1:{gross:5}}}],timer:{elapsed:3600}},before=JSON.stringify(round),requests=[],panels=[],states=[];let joined=0,closed=0;
 const input={value:'',focus(){}},submit={disabled:false},eventButton={dataset:{event:'selected'}},eventList={innerHTML:''};
 function dialog(title,content){const panel={title,content,querySelector:selector=>selector==='[data-event-list]'?eventList:selector==='input'?input:submit,querySelectorAll:()=>[eventButton]};panels.push(panel);return panel}
 const ctx={JSON,dialog,escape:String,close:()=>closed++,status:(panel,result)=>states.push(result),remember(){},sync:async()=>{},request:async(action,payload)=>{requests.push({action,payload});if(action==='directory')return{ok:true,events:[{id:'selected',name:'SELECTED GROUP'},{id:'other',name:'OTHER GROUP'}]};if(action==='join-code')return payload.joinCode==='VALIDCODE1'?{ok:true,eventId:'selected'}:{ok:false,code:'LIVE_JOIN_CODE_INVALID'};throw Error('Unexpected bypass '+action)},root:{GSCLiveControl:{buildLiveSnapshot:()=>({mode:'general',course:round.course,players:round.players,groupLabel:'MY PLAYERS'})},localStorage:{getItem:()=>creator?JSON.stringify({creator:true,id:'selected',joinCode:'VALIDCODE1'}):null}}};
 vm.runInNewContext(source,ctx);await ctx.joinTournament(round,async()=>{joined++;return true},'private');assert.equal(panels[0].title,'GRUPOS PARTICULARES');assert.match(eventList.innerHTML,/SELECTED GROUP/);assert.match(eventList.innerHTML,/OTHER GROUP/);
 await eventButton.onclick();assert.equal(panels[1].title,'INGRESE EL CÓDIGO');assert.match(panels[1].content,/SELECTED GROUP/);assert.equal(input.value,'');assert.equal(joined,0);assert.deepEqual(requests.map(x=>x.action),['directory']);
 input.value='WRONGCODE1';await submit.onclick();assert.equal(joined,0);assert.equal(states.at(-1).code,'LIVE_JOIN_CODE_INVALID');assert.equal(closed,0);
 input.value='VALIDCODE1';await submit.onclick();assert.equal(joined,1);assert.equal(closed,1);assert.equal(submit.disabled,false);assert.equal(JSON.stringify(round),before);const payload=requests.at(-1).payload;assert.equal(payload.eventId,'selected');assert.equal(payload.eventKind,'private');assert.equal(payload.course,round.course);assert.equal(payload.mode,'general');assert.equal(payload.players,round.players);
}
console.log('PASS R150: Scores side by side before two-line INGRESAR A GRUPO; directory first, selected group always requests code including creator; invalid code cannot join; valid code binds selected group with prior holes/timer untouched.');
