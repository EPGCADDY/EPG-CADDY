import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';
const hub=createRequire(import.meta.url)('./live-hub.js');
const source=fs.readFileSync('live-hub.js','utf8');
const player={id:'p1',name:'UNO'},other={id:'p2',name:'DOS'},stream={id:'g1',snapshot:{players:[player,other]}};
const selected=hub.uniqueFavoritePlayers([
 {item:{kind:'group',key:'g1:group'},stream,players:[player,other]},
 {item:{kind:'player',key:'g1:p1'},stream,players:[player]}
]);
assert.deepEqual(selected.flatMap(x=>x.players.map(p=>p.id)),['p1','p2']);
assert.equal(selected[0].item.key,'g1:p1');
assert.equal(hub.uniqueFavoritePlayers([{item:{kind:'player'},stream:null,players:[]}]).length,1,'Un enlace no disponible sigue visible para poder quitarlo');
const classes=new Set(['hub-search-mode','hub-favorites-mode']);
let rendered=0;
const context={root:{document:{body:{classList:{remove:(...names)=>names.forEach(x=>classes.delete(x))}}}},clearTimeout(){},timer:null,renderAll(){rendered++},setStatus(){}};
vm.runInNewContext(source.slice(source.indexOf('  function showTournamentPortal(){'),source.indexOf('  function renderAll(){'))+';showTournamentPortal()',context);
assert.equal(classes.size,0,'Regresar al portal limpia los modos que ocultaban los torneos');assert.equal(rendered,1);
const streams=hub.demoTournamentStreams();
assert.equal(hub.buildLeaderboard(streams,false).length,67,'Ranking general de favoritos considera todos los jugadores');
const html=fs.readFileSync('live-hub.html','utf8');
assert.match(html,/body:not\(\.public-display\) \.hub \.hidden\{display:none!important\}/);
assert.doesNotMatch(html,/body:not\(\.public-display\) #hubState,/,'No ocultar el estado junto a elementos decorativos');
assert.match(html,/ADJUNTAR RONDA EN VIVO/);
const live=fs.readFileSync('live-control.js','utf8');
assert.doesNotMatch(live,/async function quickShareGroup\(\)\{\s*openLivePanel\(\)/,'Compartir nativo no debe abrir administración antes de compartir');
console.log('PASS torneo: regreso portal, favoritos únicos, ranking completo, mensajes y compartir visibles');
