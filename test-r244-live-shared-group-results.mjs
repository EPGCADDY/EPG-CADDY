import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const nodes=new Map();
const get=id=>{
  if(!nodes.has(id))nodes.set(id,{firstElementChild:{innerHTML:''},innerHTML:'',textContent:'',hidden:false,className:'',classList:{remove(){},add(){}},addEventListener(){}});
  return nodes.get(id);
};
const token='b'.repeat(44);
const players=[
  {id:'p1',name:'Chinito',holes:[{hole:1,gross:4,net:4,relativeToPar:0},{hole:2,gross:4,net:3,relativeToPar:-1}],totals:{holes:2,gross:8,net:7,relativeToPar:-1}},
  {id:'p2',name:'Roberto',holes:[{hole:1,gross:5,net:4,relativeToPar:0},{hole:2,gross:6,net:5,relativeToPar:1}],totals:{holes:2,gross:11,net:9,relativeToPar:1}}
];
const stream={id:'stream-group',groupLabel:'GRUPO CHINITO',snapshot:{mode:'general',status:'active',course:'EL PULTÉ',playedAt:'2026-10-09T11:00:00-06:00',courseHoles:[{hole:1,par:4},{hole:2,par:4}],players}};
const context={URL,URLSearchParams,console,Date,setTimeout(){return 1},clearTimeout(){},location:{hash:'#tournament='+token,href:'https://lab.example/live.html',origin:'https://lab.example'},document:{getElementById:get,addEventListener(){}},addEventListener(){},GSCScoresUI:{bindRows(){}},fetch:async()=>({ok:true,status:200,json:async()=>({ok:true,streams:[stream],tournament:{name:'LIVE 48H',revision:1},serverAt:'2026-10-09T17:00:00Z'})})};

vm.runInNewContext(fs.readFileSync('live-view.js','utf8'),context);
await new Promise(resolve=>setImmediate(resolve));
const rendered=get('liveViewerGroups').innerHTML;

assert.match(rendered,/RESULTADOS DEL GRUPO/,'Live shared card must include the group cumulative results block at the bottom');
assert.doesNotMatch(rendered,/RESULTADOS ACUMULADOS/,'Live shared card must keep accumulated results only in the group footer');
assert.match(rendered,/<th>NOMBRE<\/th><th>HOYO<\/th><th>GROSS<\/th><th>NETO<\/th><th>\+\/-<\/th>/,'Group results must use the requested columns');
assert.match(rendered,/filled under">-1<\/td>/,'Live shared per-hole negative +/- must be green/under');
assert.match(rendered,/filled over">\+1<\/td>/,'Live shared per-hole positive +/- must be red/over');
assert.match(rendered,/CHINITO[\s\S]*<td>2<\/td>[\s\S]*<td>8<\/td>[\s\S]*net-total">7<\/td>[\s\S]*under">-1<\/td>/,'First player cumulative row must show accumulated under-par result');
assert.match(rendered,/ROBERTO[\s\S]*<td>2<\/td>[\s\S]*<td>11<\/td>[\s\S]*net-total">9<\/td>[\s\S]*over">\+1<\/td>/,'Second player cumulative row must show accumulated over-par result');

const adminUi=fs.readFileSync('event-administration-ui.js','utf8');
assert.match(adminUi,/function guestGroupResultsTable\(snapshot\)/,'Organizer 48h Live card must render the same group results table');
assert.match(adminUi,/RESULTADOS DEL GRUPO/,'Organizer 48h Live card must include group cumulative results');

console.log('PASS R244: Live compartido muestra RESULTADOS DEL GRUPO acumulados por jugador al final de la tarjeta.');
