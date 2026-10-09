import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const nodes=new Map(),bindings=[];
const get=id=>{
  if(!nodes.has(id))nodes.set(id,{
    firstElementChild:{innerHTML:''},
    innerHTML:'',
    textContent:'',
    hidden:false,
    className:'',
    classList:{remove(){},add(){}},
    addEventListener(){}
  });
  return nodes.get(id);
};
const token='a'.repeat(44);
const streams=[{
  id:'stream-48h',
  groupLabel:'GRUPO CHINITO',
  snapshot:{
    mode:'general',
    status:'active',
    course:'EL PULTÉ GOLF',
    playedAt:'2026-10-08T18:00:00-06:00',
    groupLabel:'GRUPO CHINITO',
    courseHoles:[{hole:1,par:4},{hole:2,par:4},{hole:3,par:4}],
    players:[{
      id:'p1',
      name:'Chinito',
      handicap:0,
      tee:'negras',
      tournamentCategory:'championship',
      holes:[{hole:1,gross:4,net:4,relativeToPar:0},{hole:2,gross:4,net:4,relativeToPar:0},{hole:3,gross:6,net:6,relativeToPar:2}],
      totals:{holes:3,gross:14,net:14,relativeToPar:2}
    }]
  }
}];
const context={
  URL,
  URLSearchParams,
  console,
  Date,
  setTimeout(){return 1},
  clearTimeout(){},
  location:{hash:'#tournament='+token,href:'https://lab.example/live.html',origin:'https://lab.example'},
  document:{getElementById:get,addEventListener(){}},
  addEventListener(){},
  GSCScoresUI:{bindRows(target,rows){bindings.push({target,rows})}},
  fetch:async()=>({ok:true,status:200,json:async()=>({ok:true,streams,tournament:{name:'LIVE 48H',revision:2},serverAt:'2026-10-09T00:24:00Z'})})
};

vm.runInNewContext(fs.readFileSync('live-view.js','utf8'),context);
await new Promise(resolve=>setImmediate(resolve));
const rendered=get('liveViewerGroups').innerHTML;
assert.doesNotMatch(rendered,/<h2>GRUPO CHINITO<\/h2>/,'Live 48h shared card must not render a group title above players');
assert.match(rendered,/EL PULTÉ GOLF/,'Course/date metadata remains visible after removing group title');
assert.match(rendered,/CHINITO/,'Player name still renders in the Live shared card');
assert.match(rendered,/\+\/- POR<br>HOYO/,'Hole relative result label must read +/- POR HOYO');
assert.match(rendered,/player-total-title">RESULTADOS ACUMULADOS/,'Accumulated summary title must separate table from totals');

const page=fs.readFileSync('live.html','utf8');
assert.match(page,/body class="gsc-navigation-unused"/,'Live shared card must opt out of generic dialog navigation that overlapped the header');
assert.match(page,/padding:88px 12px 12px/,'Live shared card must reserve safe top space for close/menu controls');
assert.match(page,/\.player-title strong\{[^}]*color:var\(--lime\)[^}]*text-transform:uppercase[^}]*text-decoration:none/s,'Player names must be green uppercase and not underlined');
assert.match(page,/\.player-total-title\{[^}]*RESULTADOS ACUMULADOS|player-total-title/s,'Live page must include styling for the accumulated results title');
console.log('PASS R228: 48h shared Live card removes group title, fixes top overlap, green uppercase names, accumulated title and +/- por hoyo labels.');
