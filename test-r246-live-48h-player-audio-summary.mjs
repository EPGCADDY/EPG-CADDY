import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('live.html','utf8');
assert.match(html,/<script src="\/device-closures\.js"><\/script>\s*<script src="\/scores-ui\.js"><\/script>/,'Live shared card must load the same device-closures voice before scores-ui');

const nodes=new Map();
function playerNode(){
  return {
    dataset:{scorePlayer:'0'},
    closest(){return null},
    focus(){},
    set onclick(value){this._onclick=value},
    get onclick(){return this._onclick},
    set ondblclick(value){this._ondblclick=value},
    get ondblclick(){return this._ondblclick},
    set onkeydown(value){this._onkeydown=value},
    get onkeydown(){return this._onkeydown}
  };
}
const playerTitle=playerNode();
const get=id=>{
  if(!nodes.has(id))nodes.set(id,{firstElementChild:{innerHTML:''},innerHTML:'',textContent:'',hidden:false,className:'',classList:{remove(){},add(){}},addEventListener(){},querySelectorAll(){return [playerTitle]}});
  return nodes.get(id);
};
const token='c'.repeat(44);
const stream={id:'stream-48h',groupLabel:'GRUPO 48H',snapshot:{mode:'general',status:'active',course:'EL PULTÉ',playedAt:'2026-10-09T11:00:00-06:00',courseHoles:[{hole:1,par:4},{hole:2,par:4}],players:[{id:'p1',name:'Chinito',holes:[{hole:1,gross:4,net:4,relativeToPar:0},{hole:2,gross:4,net:3,relativeToPar:-1}],totals:{gross:8,net:7,relativeToPar:-1}}]}};

let bindRowsPayload=null;
const spoken=[];
let cancelCount=0;
const context={
  URL,URLSearchParams,console,Date,setTimeout(){return 1},clearTimeout(){},
  location:{hash:'#stream='+token,href:'https://lab.example/live.html',origin:'https://lab.example'},
  document:{getElementById:get,addEventListener(){},activeElement:null,body:{appendChild(){}}},
  addEventListener(){},
  fetch:async()=>({ok:true,status:200,json:async()=>({ok:true,stream,serverAt:'2026-10-09T17:00:00Z'})}),
  GSCDeviceClosures:{speak(text){spoken.push(text);return new Promise(()=>{})},cancel(){cancelCount++}}
};
vm.runInNewContext(fs.readFileSync('scores-ui.js','utf8'),context);
context.GSCScoresUI={
  ...context.GSCScoresUI,
  bindRows(target,rows){
    bindRowsPayload=rows;
    context.GSCScoresUI.__realBindRows(target,rows);
  },
  __realBindRows:context.GSCScoresUI.bindRows
};
vm.runInNewContext(fs.readFileSync('live-view.js','utf8'),context);
await new Promise(resolve=>setImmediate(resolve));

assert.equal(bindRowsPayload.length,1,'Live 48h shared card must bind one audio row per player');
assert.match(bindRowsPayload[0].audioText,/CHINITO\. Hasta el hoyo 2, va gross 8, neto 7, 1 bajo par\./,'Audio must dictate only the selected player accumulated score through the current hole');

playerTitle.onclick({preventDefault(){},target:playerTitle});
assert.deepEqual(spoken,['CHINITO. Hasta el hoyo 2, va gross 8, neto 7, 1 bajo par.'],'Single click on player name must start the individual accumulated audio');
assert.equal(cancelCount,1,'Starting a player audio must cancel any previous device speech first');
playerTitle.onclick({preventDefault(){},target:playerTitle});
assert.equal(spoken.length,1,'Second click on the same player must stop instead of restarting duplicate audio');
assert.equal(cancelCount,2,'Second click must cancel the active player audio');

console.log('PASS R246: Live 48h habla acumulado individual por jugador con un clic y lo detiene con otro clic.');
